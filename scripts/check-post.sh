#!/usr/bin/env bash
# Prüft einen Entwurf: Struktur/SEO (check-post.mts) + ESLint + Typen der Post-Datei.
#   ./scripts/check-post.sh <slug>
set -uo pipefail
source "$(dirname "$0")/config.sh"

slug="${1:-}"
wt="$AGENT_ROOT/worktrees/$slug"
[ -n "$slug" ] && [ -d "$wt" ] || die "Worktree für '$slug' nicht gefunden — erst ./scripts/prepare-worktree.sh ausführen"

status=0
echo "== Struktur & SEO =="
bunx tsx "$AGENT_ROOT/scripts/check-post.mts" "$wt" "$slug" || status=1

echo; echo "== ESLint =="
( cd "$wt" && npx eslint "src/content/blog/posts/$slug.ts" src/content/blog/index.ts ) && echo "PASS ESLint" || { echo "FAIL ESLint"; status=1; }

echo; echo "== TypeScript (nur Blog-Dateien) =="
tsc_out="$(cd "$wt" && npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep -E "content/blog/(posts/$slug|index|authors|types)" || true)"
if [ -z "$tsc_out" ]; then echo "PASS Typen"; else echo "$tsc_out"; echo "FAIL Typen"; status=1; fi

exit $status
