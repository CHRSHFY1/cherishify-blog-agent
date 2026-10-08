#!/usr/bin/env bash
# Committet einen Entwurf im Worktree — und zwar NUR die erlaubten Dateien.
#   ./scripts/commit-draft.sh <slug>
set -euo pipefail
source "$(dirname "$0")/config.sh"

slug="${1:-}"
wt="$AGENT_ROOT/worktrees/$slug"
[ -n "$slug" ] && [ -d "$wt" ] || die "Worktree für '$slug' nicht gefunden"

cd "$wt"
git add "src/content/blog/posts/$slug.ts" src/content/blog/index.ts
[ -d public/blog ] && git add public/blog

# Sicherheitsnetz: nichts außerhalb der erlaubten Pfade committen
allowed_re="^(src/content/blog/posts/$slug\.ts|src/content/blog/index\.ts|public/blog/.+)$"
bad="$(git diff --cached --name-only | grep -Ev "$allowed_re" || true)"
if [ -n "$bad" ]; then
  git reset -q
  die "Nicht erlaubte Dateien im Commit, abgebrochen:\n$bad"
fi
git diff --cached --quiet && die "Keine Änderungen zu committen"

title="$(grep -m1 -E '^\s*title:' "src/content/blog/posts/$slug.ts" | sed -E 's/^\s*title:\s*"?//; s/",?\s*$//')"
git commit -q -m "blog: $title (Entwurf zur Freigabe)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
echo "Committet auf Branch $(git branch --show-current): $(git log -1 --oneline)"
