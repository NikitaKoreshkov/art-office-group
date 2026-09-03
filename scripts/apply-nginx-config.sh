#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-art-office.kz}"
DEPLOY_DIR="${1:-/tmp/art-office-deploy}"
NGINX_SITE="/etc/nginx/sites-available/${DOMAIN}"
CERT="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
SUDO="${SUDO:-sudo}"

pick_config() {
  if ${SUDO} test -f "${CERT}"; then
    echo "${DEPLOY_DIR}/nginx-art-office.ssl.conf"
  else
    echo "${DEPLOY_DIR}/nginx-art-office.conf"
  fi
}

CONFIG="$(pick_config)"
${SUDO} cp "${CONFIG}" "${NGINX_SITE}"
${SUDO} ln -sf "${NGINX_SITE}" "/etc/nginx/sites-enabled/${DOMAIN}"
${SUDO} rm -f /etc/nginx/sites-enabled/default
${SUDO} nginx -t
${SUDO} systemctl reload nginx

echo "Applied nginx config: $(basename "${CONFIG}")"
