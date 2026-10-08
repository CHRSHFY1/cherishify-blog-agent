#!/usr/bin/env bash
# Nach der Freigabe: Build der Website (main) + Delta-ZIP für Hostinger erzeugen.
#   ./scripts/publish.sh <slug>
#
# Voraussetzung: Der freigegebene Beitrag ist im Website-Repo auf `main` gemergt.
# Dieses Skript lädt NICHTS hoch und pusht NICHTS.
set -euo pipefail
source "$(dirname "$0")/config.sh"

slug="${1:-}"
[ -n "$slug" ] || die "Usage: publish.sh <slug>"

branch="$(git -C "$SITE_REPO" branch --show-current)"
[ "$branch" = "main" ] || die "Website-Repo steht auf '$branch' — bitte auf main wechseln (Beitrag vorher mergen)."
[ -f "$SITE_REPO/src/content/blog/posts/$slug.ts" ] || die "src/content/blog/posts/$slug.ts fehlt auf main — Branch blog/$slug noch nicht gemergt?"
grep -q "posts/$slug\"" "$SITE_REPO/src/content/blog/index.ts" || die "Beitrag ist nicht in index.ts registriert."

echo "== Build (ca. 2–3 Min.) =="
( cd "$SITE_REPO" && npm run build )

echo; echo "== Delta-ZIP =="
node "$AGENT_ROOT/scripts/deploy-delta.mjs" zip --site "$SITE_REPO"

cat <<EOF

Hinweis: Der Build aktualisiert public/sitemap.xml im Website-Repo (neuer Beitrag).
Diese Änderung im Website-Repo mit committen, damit Repo und Live-Stand übereinstimmen.

Danach: ZIP hochladen → ./scripts/mark-deployed.sh → Search Console: URL https://cherishify.eu/blog/$slug prüfen & Indexierung beantragen.
EOF
