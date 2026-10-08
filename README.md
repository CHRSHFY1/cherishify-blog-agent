# CHERISHIFY Blog-Agent

Zweiwöchentlicher Agent, der Themen für den CHERISHIFY-Blog recherchiert, einen Beitrag entwirft und ihn Martin Pell zur Freigabe vorlegt. Nach der Freigabe entsteht ein kleines ZIP für den Upload auf Hostinger.

**Dieses Repo enthält nur den Agenten** (Anweisungen, Recherche-Berichte, Skripte, Stand der Live-Seite). Die Website liegt unverändert in `cherishify-design-lab`. Der Agent schreibt dort ausschließlich in einem separaten Worktree auf dem Branch `blog/<slug>` — nie auf `main`.

## Ablauf

```
run-cycle.sh ──► Recherche ──► reports/<datum>-topics.md
                    │
                    └──► Worktree + Branch blog/<slug> ──► Entwurf ──► reports/<datum>-review-<slug>.md
                                                                             │
   Martin: review.sh <slug>  ◄───────────────────────────────────────────────┘
        │  freigeben / Änderungen
        ▼
   Branch nach main mergen ──► publish.sh <slug> ──► out/blog-update.zip
        │
        ▼
   ZIP in Hostinger entpacken ──► mark-deployed.sh ──► Search Console
```

## Befehle

| Befehl | Zweck |
|---|---|
| `./scripts/run-cycle.sh` | Einen Zyklus manuell starten (Recherche + Entwurf) |
| `./scripts/run-cycle.sh --scheduled` | Wie oben, aber überspringt, wenn der letzte Lauf < 13 Tage her ist (für den Zeitplan) |
| `./scripts/review.sh <slug>` | Vorschau des Entwurfs auf `localhost:8080` |
| `./scripts/check-post.sh <slug>` | Qualitäts-Check (SEO-Längen, Links, Markenregeln, Lint, Typen) |
| `./scripts/publish.sh <slug>` | Nach dem Merge: Build + Delta-ZIP |
| `./scripts/mark-deployed.sh` | Nach dem Upload: Live-Stand festhalten |

Optionen für `run-cycle.sh`: `--with-local-changes` (uncommittete Änderungen des Website-Repos in den Worktree übernehmen — nur nötig, solange das Autoren-Feature nicht in `main` ist), `--budget=<USD>`.

## Verzeichnisse

- `playbook/BLOG-PLAYBOOK.md` — Regeln, Markenstimme, Checkliste. **Hier steuerst du den Agenten.**
- `prompts/cycle.md` — Arbeitsanweisung für einen Lauf.
- `reports/` — Themen-Berichte und Review-Berichte je Lauf.
- `state/topics-log.md` — bereits behandelte Themen. `state/manifest.json` — Stand der Live-Seite (für das Delta-ZIP).
- `data/gsc/` — Search-Console-Exports (CSV, „Suchanfragen“) hier ablegen; der Agent nutzt die neuesten.
- `launchd/` — Vorlage für den Zeitplan (macOS).

## Sicherheitsgrenzen des Agenten

Der Agent läuft headless mit einer Positivliste: Lesen, Web-Recherche, Berichte schreiben und genau drei Skripte (`prepare-worktree`, `check-post`, `commit-draft`). Er kann nicht pushen, mergen, bauen oder hochladen, und `commit-draft.sh` committet nur den Beitrag, die Registry-Zeile und Bilder unter `public/blog/`.

## Voraussetzungen

- Website-Repo unter `~/cherishify-design-lab` (anderer Pfad: `SITE_REPO=...`), `npm install` dort erledigt.
- Claude Code CLI. Stabil installieren: `curl -fsSL https://claude.ai/install.sh | bash`. Ohne Installation nutzt `config.sh` die Binary der VS-Code-Extension (Pfad ändert sich bei Updates).
- `bun` (für `bunx tsx`), `node`, `zip`.
