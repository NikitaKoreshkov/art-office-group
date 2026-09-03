#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "${ROOT_DIR}"

if [[ ! -f .env.local ]]; then
  cp .env.example .env.local
  echo "Created .env.local from .env.example"
fi

echo "==> Starting PostgreSQL (Docker)"
docker compose -p art-office up -d

echo "==> Waiting for PostgreSQL"
for i in {1..30}; do
  if docker compose -p art-office exec -T postgres pg_isready -U artoffice -d artoffice >/dev/null 2>&1; then
    break
  fi
  sleep 1
  if [[ "$i" -eq 30 ]]; then
    echo "PostgreSQL did not become ready in time"
    exit 1
  fi
done

echo "==> Running migrations"
npm run db:migrate

echo "==> Seeding database"
npm run db:seed

echo ""
echo "Setup complete."
echo "  Site:  http://localhost:3000"
echo "  Admin: http://localhost:3000/admin"
echo "  DB:    postgresql://artoffice:***@localhost:5434/artoffice"
