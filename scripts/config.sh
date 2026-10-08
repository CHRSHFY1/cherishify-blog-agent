#!/usr/bin/env bash
# Gemeinsame Konfiguration — von den anderen Skripten per `source` geladen.

AGENT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_REPO="${SITE_REPO:-$HOME/cherishify-design-lab}"

# Claude-Binary finden: erst PATH, sonst die neueste VS-Code-Extension.
# (Der Extension-Pfad ändert sich bei jedem Update; stabil wäre die Standalone-
# Installation: curl -fsSL https://claude.ai/install.sh | bash)
find_claude() {
  if [ -n "${CLAUDE_BIN:-}" ] && [ -x "$CLAUDE_BIN" ]; then echo "$CLAUDE_BIN"; return; fi
  if command -v claude >/dev/null 2>&1; then command -v claude; return; fi
  if [ -x "$HOME/.local/bin/claude" ]; then echo "$HOME/.local/bin/claude"; return; fi
  ls -d "$HOME"/.vscode/extensions/anthropic.claude-code-*-darwin-arm64/resources/native-binary/claude 2>/dev/null | sort -V | tail -1
}

die() { echo "FEHLER: $*" >&2; exit 1; }

[ -d "$SITE_REPO/.git" ] || die "Website-Repo nicht gefunden: $SITE_REPO (SITE_REPO setzen)"
# bun/node für Build-Skripte auch in launchd-Umgebung auffindbar machen
export PATH="$HOME/.bun/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"
