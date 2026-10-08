#!/usr/bin/env bash
# NACH dem erfolgreichen Upload ausführen: hält fest, was jetzt live ist.
set -euo pipefail
source "$(dirname "$0")/config.sh"

node "$AGENT_ROOT/scripts/deploy-delta.mjs" snapshot --site "$SITE_REPO"
cd "$AGENT_ROOT"
git add state/manifest.json
git diff --cached --quiet || git commit -q -m "state: Live-Stand nach Upload aktualisiert

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
echo "Manifest aktualisiert und committet."
