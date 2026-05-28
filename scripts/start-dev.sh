#!/usr/bin/env bash
set -e

PORT="${PORT:-3000}"
HOST="0.0.0.0"

echo "[start-dev] Starting Next.js on $HOST:$PORT..."

exec next dev -H "$HOST" -p "$PORT"