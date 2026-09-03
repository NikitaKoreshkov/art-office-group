#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOMAIN="art-office.kz"
HOST="${DEPLOY_HOST:-194.238.41.22}"
USER="${DEPLOY_USER:-ubuntu}"
APP_DIR="/opt/art-office"
SSH_KEY="${DEPLOY_KEY:-$ROOT_DIR/art_office_deploy}"
SSH_PASSWORD="${DEPLOY_PASSWORD:-}"

ssh_cmd() {
  local ssh_args=(-o StrictHostKeyChecking=accept-new)
  if [[ -f "${SSH_KEY}" ]]; then
    ssh_args+=(-i "${SSH_KEY}")
  fi
  if [[ -n "${SSH_PASSWORD}" ]] && command -v sshpass >/dev/null 2>&1; then
    SSHPASS="${SSH_PASSWORD}" sshpass -e ssh "${ssh_args[@]}" "${USER}@${HOST}" "$@"
  else
    ssh "${ssh_args[@]}" "${USER}@${HOST}" "$@"
  fi
}

rsync_cmd() {
  local rsync_args=(-az --delete)
  if [[ -f "${SSH_KEY}" ]]; then
    rsync_args+=(-e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new")
  elif [[ -n "${SSH_PASSWORD}" ]] && command -v sshpass >/dev/null 2>&1; then
    rsync_args+=(-e "sshpass -e ssh -o StrictHostKeyChecking=accept-new")
    export SSHPASS="${SSH_PASSWORD}"
  fi
  rsync "${rsync_args[@]}" "$@"
}

echo "==> Building Next.js app (optimize + content sync via prebuild)"
cd "${ROOT_DIR}"
npm ci
npm run build

echo "==> Checking SSH access to ${USER}@${HOST}"
ssh_cmd "echo connected"

echo "==> Uploading nginx config, setup script and systemd unit"
ssh_cmd "mkdir -p /tmp/art-office-deploy"
scp ${SSH_KEY:+-i "${SSH_KEY}"} -o StrictHostKeyChecking=accept-new \
  "${ROOT_DIR}/scripts/nginx-art-office.conf" \
  "${ROOT_DIR}/scripts/nginx-art-office.ssl.conf" \
  "${ROOT_DIR}/scripts/apply-nginx-config.sh" \
  "${ROOT_DIR}/scripts/server-setup.sh" \
  "${ROOT_DIR}/scripts/art-office.service" \
  "${USER}@${HOST}:/tmp/art-office-deploy/"

echo "==> Running server setup (nginx, certbot, node)"
ssh_cmd "bash /tmp/art-office-deploy/server-setup.sh"

echo "==> Syncing application files"
ssh_cmd "mkdir -p ${APP_DIR}"
rsync_cmd \
  --exclude node_modules \
  --exclude .git \
  "${ROOT_DIR}/" "${USER}@${HOST}:${APP_DIR}/"

echo "==> Installing dependencies on server"
ssh_cmd "cd ${APP_DIR} && npm ci"

echo "==> Ensuring server .env"
ssh_cmd "bash -s" <<'REMOTE_ENV'
APP_DIR="/opt/art-office"
if [[ ! -f "${APP_DIR}/.env" ]]; then
  DB_PASS="${POSTGRES_PASSWORD:-artoffice_prod_change_me}"
  JWT_SECRET="$(openssl rand -hex 32 2>/dev/null || echo art-office-jwt-secret-change-me)"
  cat > "${APP_DIR}/.env" <<EOF
DATABASE_URL=postgresql://artoffice:${DB_PASS}@localhost:5432/artoffice
ADMIN_JWT_SECRET=${JWT_SECRET}
ADMIN_EMAIL=artoffice@gmail.com
ADMIN_PASSWORD=HxHYHGnp
EOF
  echo "Created ${APP_DIR}/.env"
else
  echo ".env already exists"
fi
REMOTE_ENV

echo "==> Syncing Resend settings to server .env"
if [[ -f "${ROOT_DIR}/.env.local" ]]; then
  RESEND_API_KEY="$(grep -E '^RESEND_API_KEY=' "${ROOT_DIR}/.env.local" | head -1 | cut -d= -f2- || true)"
  RESEND_FROM_EMAIL="$(grep -E '^RESEND_FROM_EMAIL=' "${ROOT_DIR}/.env.local" | head -1 | cut -d= -f2- || true)"
  CONTACT_NOTIFY_EMAIL="$(grep -E '^CONTACT_NOTIFY_EMAIL=' "${ROOT_DIR}/.env.local" | head -1 | cut -d= -f2- || true)"

  if [[ -n "${RESEND_API_KEY}" ]]; then
    ssh_cmd "bash -s" <<REMOTE_RESEND
APP_DIR="/opt/art-office"
ENV_FILE="\${APP_DIR}/.env"
touch "\${ENV_FILE}"
upsert() {
  local key="\$1"
  local val="\$2"
  if grep -q "^\${key}=" "\${ENV_FILE}"; then
    sed -i "s|^\${key}=.*|\${key}=\${val}|" "\${ENV_FILE}"
  else
    echo "\${key}=\${val}" >> "\${ENV_FILE}"
  fi
}
upsert RESEND_API_KEY "${RESEND_API_KEY}"
upsert RESEND_FROM_EMAIL "${RESEND_FROM_EMAIL:-onboarding@resend.dev}"
upsert CONTACT_NOTIFY_EMAIL "${CONTACT_NOTIFY_EMAIL:-info@art-office.kz}"
echo "Resend env synced"
REMOTE_RESEND
  fi
fi

if [[ "${DEPLOY_SEED_DB:-0}" == "1" ]]; then
  echo "==> Migrating and seeding PostgreSQL (DEPLOY_SEED_DB=1)"
  ssh_cmd "cd ${APP_DIR} && node scripts/seed-prod.mjs"
else
  echo "==> Skipping database (set DEPLOY_SEED_DB=1 to run seed-prod.mjs)"
fi

echo "==> Installing systemd service"
ssh_cmd "sudo cp /tmp/art-office-deploy/art-office.service /etc/systemd/system/art-office.service && sudo systemctl daemon-reload && sudo systemctl enable art-office && sudo systemctl restart art-office"

echo "==> Reloading nginx"
ssh_cmd "bash /tmp/art-office-deploy/apply-nginx-config.sh /tmp/art-office-deploy"

echo "Deploy complete:"
echo "  Site:  https://${DOMAIN}"
echo "  Admin: https://${DOMAIN}/admin"
