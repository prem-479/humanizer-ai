#!/usr/bin/env bash
set -e

echo "Node: $(node -v)"
echo "NPM: $(npm -v)"

if [ ! -d "node_modules" ]; then
  echo "node_modules missing. Run npm install."
  exit 1
fi

if [ ! -f "node_modules/.bin/vite" ]; then
  echo "Vite not installed locally."
  exit 1
fi

echo "Environment OK"
