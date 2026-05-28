#!/usr/bin/env bash
# Start Next.js dev and immediately warm it up so Replit's TCP port probe succeeds.
# Next.js 16 Turbopack opens the TCP socket lazily on first HTTP request, which
# causes Replit's waitForPort check to time out. This script breaks the deadlock.
set -e

PORT="${PORT:-3000}"

# Start Next.js in background
next dev -p "$PORT" &
NEXT_PID=$!

# Poll until the socket opens, then trigger the first compile via HTTP.
# Once curl connects, the TCP port is open and Replit's probe will succeed.
echo "[start-dev] Waiting for Next.js to open port $PORT..."
for i in $(seq 1 90); do
  sleep 1
  if curl -sf --max-time 1 "http://127.0.0.1:$PORT/" > /dev/null 2>&1; then
    echo "[start-dev] Port $PORT is open and responding."
    break
  fi
  # Check if next.js died
  if ! kill -0 "$NEXT_PID" 2>/dev/null; then
    echo "[start-dev] Next.js process exited unexpectedly."
    exit 1
  fi
done

# Stay alive — keep the workflow process running alongside next.js
wait "$NEXT_PID"
