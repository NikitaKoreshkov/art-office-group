#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "${ROOT_DIR}"

if [[ ! -f .env.local ]]; then
  cp .env.example .env.local
fi

if command -v docker >/dev/null 2>&1; then
  docker compose -p art-office up -d >/dev/null 2>&1 || true
  for i in {1..15}; do
    if docker compose -p art-office exec -T postgres pg_isready -U artoffice -d artoffice >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done
fi

npm run db:migrate >/dev/null 2>&1 || {
  echo "Warning: PostgreSQL is not available. Start it with: npm run setup"
}
