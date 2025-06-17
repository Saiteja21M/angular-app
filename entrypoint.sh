#!/bin/sh
set -e
sed -i "s|__API_URL__|${BE_HOST}|g" /app/src/environments/environment.prod.ts
exec "$@"