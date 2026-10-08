#!/usr/bin/env bash
# Legt für einen Beitrag einen isolierten Arbeitsordner (git worktree) des Website-Repos an.
# Das Working-Tree des Website-Repos bleibt dabei unberührt.
#
#   ./scripts/prepare-worktree.sh <slug>
#
# Umgebungsvariablen:
#   BASE_REF=main               Ausgangspunkt des Branches (Standard: main)
#   OVERLAY_LOCAL_CHANGES=1     uncommittete Änderungen des Website-Repos mitkopieren
#                               (nur nötig, solange das Autoren-Feature nicht in main ist)
set -euo pipefail
source "$(dirname "$0")/config.sh"

slug="${1:-}"
[[ "$slug" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]] || die "Slug fehlt oder ist ungültig (nur a-z, 0-9, Bindestriche): '$slug'"

branch="blog/$slug"
wt="$AGENT_ROOT/worktrees/$slug"
base="${BASE_REF:-main}"

[ -e "$wt" ] && die "Worktree existiert bereits: $wt"
git -C "$SITE_REPO" rev-parse --verify --quiet "$branch" >/dev/null && die "Branch $branch existiert bereits"

mkdir -p "$AGENT_ROOT/worktrees"
git -C "$SITE_REPO" worktree add -q -b "$branch" "$wt" "$base"
ln -s "$SITE_REPO/node_modules" "$wt/node_modules"

if [ "${OVERLAY_LOCAL_CHANGES:-0}" = "1" ]; then
  # geänderte, getrackte Dateien
  git -C "$SITE_REPO" diff HEAD --binary | git -C "$wt" apply
  # neue, nicht ignorierte Dateien
  git -C "$SITE_REPO" ls-files --others --exclude-standard | while IFS= read -r f; do
    mkdir -p "$wt/$(dirname "$f")"
    cp "$SITE_REPO/$f" "$wt/$f"
  done
  echo "Lokale Änderungen des Website-Repos in den Worktree übernommen (nicht committet)."
fi

echo "Worktree bereit: $wt (Branch $branch, Basis $base)"
