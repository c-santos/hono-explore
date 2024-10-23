# !/bin/sh

set -x
set -e

docker compose down

docker compose up --detach

docker compose exec hono-explore npm run db:generate

docker compose exec hono-explore npm run db:migrate

docker compose exec hono-explore npm run db:seed

docker compose logs --follow
