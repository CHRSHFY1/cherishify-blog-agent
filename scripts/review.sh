#!/usr/bin/env bash
# Startet die lokale Vorschau eines Entwurfs: http://localhost:8080/blog/<slug>
#   ./scripts/review.sh <slug>
set -euo pipefail
source "$(dirname "$0")/config.sh"

slug="${1:-}"
wt="$AGENT_ROOT/worktrees/$slug"
[ -n "$slug" ] && [ -d "$wt" ] || die "Worktree für '$slug' nicht gefunden. Vorhanden: $(ls "$AGENT_ROOT/worktrees" 2>/dev/null | tr '\n' ' ')"

echo "Vorschau: http://localhost:8080/blog/$slug   (Strg+C zum Beenden)"
cd "$wt"
exec npm run dev
