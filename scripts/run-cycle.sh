#!/usr/bin/env bash
# Ein vollständiger Agent-Zyklus: Recherche → Themenauswahl → Entwurf auf eigenem Branch.
#
#   ./scripts/run-cycle.sh [--scheduled] [--with-local-changes] [--budget=<USD>]
#
#   --scheduled            für launchd: überspringt den Lauf, wenn der letzte < 13 Tage her ist
#   --with-local-changes   uncommittete Änderungen des Website-Repos (Autoren-Feature) in den
#                          Worktree übernehmen — nur nötig, bis das Feature in main gemergt ist
#   --budget=<USD>         Kostenobergrenze für den Lauf (Standard 6)
#
# Der Agent darf nur: Dateien lesen, im Web recherchieren, Reports schreiben und im Worktree
# genau einen Beitrag anlegen. Kein Push, kein Merge, kein Build, kein Upload.
set -euo pipefail
source "$(dirname "$0")/config.sh"

scheduled=0; budget=6
for arg in "$@"; do
  case "$arg" in
    --scheduled) scheduled=1 ;;
    --with-local-changes) export OVERLAY_LOCAL_CHANGES=1 ;;
    --budget=*) budget="${arg#--budget=}" ;;
    *) die "Unbekannte Option: $arg" ;;
  esac
done

cd "$AGENT_ROOT"
mkdir -p logs reports state

if [ "$scheduled" = 1 ] && [ -f state/last-run ]; then
  last=$(cat state/last-run)
  age_days=$(( ( $(date +%s) - $(date -j -f %F "$last" +%s) ) / 86400 ))
  if [ "$age_days" -lt 13 ]; then
    echo "Letzter Lauf vor $age_days Tagen ($last) — übersprungen."
    exit 0
  fi
fi

CLAUDE="$(find_claude)"
[ -n "$CLAUDE" ] && [ -x "$CLAUDE" ] || die "Claude-Binary nicht gefunden. Installation: curl -fsSL https://claude.ai/install.sh | bash"

# Schreibgeschützter Schnappschuss der Live-Seite für den Agenten (statt Zugriff aufs Website-Repo)
snap="$AGENT_ROOT/state/site-snapshot"
rm -rf "$snap"; mkdir -p "$snap/posts"
cp "$SITE_REPO"/src/content/blog/posts/*.ts "$snap/posts/"
grep -oE '<loc>[^<]+</loc>' "$SITE_REPO/public/sitemap.xml" | sed -E 's#</?loc>##g' > "$snap/live-routes.txt"

DATE="$(date +%F)"
log="logs/$DATE-cycle.log"
prompt="$(sed -e "s|{{DATE}}|$DATE|g" -e "s|{{AGENT_ROOT}}|$AGENT_ROOT|g" -e "s|{{SITE_REPO}}|$SITE_REPO|g" prompts/cycle.md)"

tools="Read,Glob,Grep,WebSearch,WebFetch,Write,Edit"
tools="$tools,Bash(./scripts/prepare-worktree.sh:*),Bash(./scripts/check-post.sh:*),Bash(./scripts/commit-draft.sh:*),Bash(ls:*)"

echo "Zyklus startet ($DATE) — Log: $log"
set +e
"$CLAUDE" -p "$prompt" \
  --allowedTools "$tools" \
  --add-dir "$AGENT_ROOT/worktrees" \
  --max-budget-usd "$budget" \
  --no-session-persistence 2>&1 | tee "$log"
code=${PIPESTATUS[0]}
set -e

[ "$code" = 0 ] && date +%F > state/last-run
echo; echo "Fertig (Exit $code). Reports: $(ls reports/ | grep "^$DATE" | tr '\n' ' ')"
exit "$code"
