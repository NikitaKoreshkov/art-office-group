#!/usr/bin/env bash
set -euo pipefail

DOMAIN="art-office.kz"
NGINX_SITE="/etc/nginx/sites-available/${DOMAIN}"

export DEBIAN_FRONTEND=noninteractive
SUDO="sudo"

apt-get update -qq 2>/dev/null || ${SUDO} apt-get update -qq
${SUDO} apt-get install -y -qq nginx certbot python3-certbot-nginx ufw curl postgresql postgresql-contrib

if ! ${SUDO} swapon --show | grep -q /swapfile; then
  ${SUDO} fallocate -l 2G /swapfile 2>/dev/null || ${SUDO} dd if=/dev/zero of=/swapfile bs=1M count=2048 status=none
  ${SUDO} chmod 600 /swapfile
  ${SUDO} mkswap /swapfile
  ${SUDO} swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | ${SUDO} tee -a /etc/fstab >/dev/null
fi

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | ${SUDO} bash -
  ${SUDO} apt-get install -y -qq nodejs
fi

# Remove legacy static site if it was deployed earlier.
if [[ -d "/var/www/${DOMAIN}" ]]; then
  ${SUDO} rm -rf "/var/www/${DOMAIN}"
  echo "Removed legacy static files at /var/www/${DOMAIN}"
fi

bash /tmp/art-office-deploy/apply-nginx-config.sh /tmp/art-office-deploy

${SUDO} systemctl enable nginx
${SUDO} systemctl restart nginx

${SUDO} ufw allow OpenSSH
${SUDO} ufw allow "Nginx Full"
${SUDO} ufw --force enable

if [[ ! -d "/etc/letsencrypt/live/${DOMAIN}" ]]; then
  ${SUDO} certbot --nginx \
    -d "${DOMAIN}" \
    -d "www.${DOMAIN}" \
    --non-interactive \
    --agree-tos \
    --email "info@${DOMAIN}" \
    --redirect || true
fi

bash /tmp/art-office-deploy/apply-nginx-config.sh /tmp/art-office-deploy

${SUDO} systemctl reload nginx

DB_NAME="artoffice"
DB_USER="artoffice"
DB_PASS="${POSTGRES_PASSWORD:-artoffice_prod_change_me}"

if ! ${SUDO} -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'" | grep -q 1; then
  ${SUDO} -u postgres psql -c "CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';"
fi

if ! ${SUDO} -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1; then
  ${SUDO} -u postgres psql -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"
fi

echo "Server setup complete for ${DOMAIN}"
