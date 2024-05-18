#!/bin/bash

set -euo pipefail

export CI=true

echo "[[ linting web ]]"
npm  run lint -w apps/web

echo "[[ linting e2e ]]"
npm run lint -w apps/e2e

echo "[[ all good! ]]"
