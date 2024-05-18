#!/bin/bash

set -euo pipefail

export CI=true

echo "[[ running webapp unit tests ]]"
npm run test -w apps/web

echo "[[ all good! ]]"
