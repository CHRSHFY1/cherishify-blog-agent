# Blog-Playbook — CHERISHIFY

Arbeitsanweisung für den zweiwöchentlichen Blog-Agenten (und für jeden, der einen Beitrag schreibt).
Ziel: Sichtbarkeit bei Google und in KI-Suchen (GEO) für Corporate Gifting / Mitarbeitergeschenke im DACH-Raum, Schwerpunkt Österreich.

## 1. Ablauf pro Zyklus (alle 2 Wochen)

1. **Recherche** — aktuelle Themen, saisonale Anlässe, Fragen von HR-Teams, Keyword-Chancen (siehe Abschnitt 5). Ergebnis: **3 priorisierte Themenvorschläge** mit Ziel-Keyword, Suchintention, Winkel und Begründung („warum jetzt“) in `reports/<datum>-topics.md`.
2. **Entwurf** — der Agent schreibt den Beitrag zum Top-Thema in einem eigenen Worktree auf dem Branch `blog/<slug>` des Website-Repos (nicht auf `main`) und legt `reports/<datum>-review-<slug>.md` an.
3. **Review durch Martin** — `./scripts/review.sh <slug>` startet die Vorschau unter `http://localhost:8080/blog/<slug>`. Freigeben, Änderungen anfordern oder ablehnen. Bis zur Freigabe wird **nichts** auf `main` gemergt und **nichts** hochgeladen.
4. **Nach Freigabe** — Branch `blog/<slug>` im Website-Repo nach `main` mergen, dann `./scripts/publish.sh <slug>` (Build + `out/blog-update.zip`).
5. **Upload** — ZIP in Hostinger File Manager nach `/public_html` laden → Rechtsklick → „Extract“. Danach `./scripts/mark-deployed.sh`.
6. **Nachbereitung** — URL in der Google Search Console zur Indexierung einreichen. Nach 4–8 Wochen Performance prüfen, Beitrag ggf. aktualisieren.

> Warum Branch statt `draft: true`? Entwürfe (`draft: true`) werden aus Registry, Sitemap und Prerender ausgeblendet — auch lokal. Zum Review muss der Beitrag sichtbar sein, deshalb getrennter Branch.

## 2. Neuen Beitrag anlegen (technisch)

1. Datei `src/content/blog/posts/<slug>.ts` anlegen — Vorlage: `mitarbeitergeschenke-planen.ts`.
2. In `src/content/blog/index.ts` importieren und in `posts` eintragen.
3. Autor: `author: AUTHORS.martinPell` (Import aus `../authors`). Das erzeugt Autorenbox + Person-Schema.
4. Bilder nach `public/blog/` (Hero 1200×630 als WebP; für `socialImage` zusätzlich JPEG). `heroImageAlt` immer setzen.
5. Route, Sitemap-Eintrag, Prerendering und SEO-Tags entstehen automatisch.

Pflichtfelder: `title`, `slug`, `excerpt`, `publicationDate`, `author`, `category`, `tags`, `seoTitle` (≤ 60 Zeichen), `metaDescription` (140–155 Zeichen), `heroImage`, `heroImageAlt`, `content`.

## 3. Qualitätsregeln für Inhalte

**Struktur**
- Slug ohne Jahreszahl bei Evergreen-Themen (Jahr nur, wenn der Beitrag wirklich jährlich neu geschrieben wird).
- Ein Ziel-Keyword im H1, im ersten Absatz, in `seoTitle` und `metaDescription` — natürlich, nie gestopft.
- Erster Absatz beantwortet die Kernfrage in 2–3 Sätzen (für Google-Snippets und KI-Antworten).
- H2/H3 als echte Fragen oder klare Aussagen; Länge typischerweise 1.200–2.000 Wörter, so lang wie nötig, nicht länger.
- FAQ-Abschnitt am Ende (3–5 echte Fragen von HR-Teams).
- Interne Links: mindestens 3, u. a. auf `/preise`, `/mehrwert`, `/markenkatalog`, `/kontakt` oder verwandte Beiträge. Linktexte beschreibend, nie „hier klicken“.
- Eine klare Handlungsaufforderung am Ende (Gespräch vereinbaren).

**Glaubwürdigkeit (E-E-A-T / GEO)**
- Konkrete Zahlen, Beispiele, Erfahrungen aus echten Kampagnen — keine austauschbaren Allgemeinplätze.
- Jede Rechts-/Steuerangabe mit Quelle prüfen (Österreich: § 3 EStG, Stand des Jahres nennen) und den Hinweis „ersetzt keine Steuerberatung“ behalten.
- Keine erfundenen Studien, Kundenzitate, Kennzahlen oder Preise. Wenn eine Zahl nicht belegt ist, weglassen oder als Erfahrungswert kennzeichnen.
- Kein Kopieren von Wettbewerbern; Wettbewerberseiten dienen nur zur Lückenanalyse.

**Markenstimme** (Brand Guidelines)
- Warm, präzise, vertrauensvoll — wie ein erfahrener Concierge: diskret, kompetent, persönlich.
- Anrede: „Sie“. Deutsch (de-AT), Gendern mit Doppelpunkt wie in den bestehenden Beiträgen.
- Nie technisch-kühl oder aufdringlich; keine Buzzwords („disruptiv“, „KI-driven“, „maximiert Ihre Metrics“).
- Kernbotschaften: Wertschätzung als Strategie · Effizienz mit Wärme · Mehr Lächeln & Zeit, weniger Abfall · einfach, nachhaltig, wirkungsvoll.
- Zielgruppe: HR, People & Culture, Employer Branding, Office Management und Leadership in Unternehmen mit 50–2.000 Mitarbeitenden.
- Anlässe: Geburtstage, Jubiläen, Onboarding, Weihnachten, Recognition-Kampagnen, standortübergreifende Initiativen, Events.

**Visuals**
- Markenfarben: Deep Cocoa `#2E1F0F`, Cocoa Medium `#5A3E28`, Warm Gold `#B8883A`, Champagne `#EDE0CB`, Cream `#FDFAF5`. Höchstens 3 Farben pro Seite.
- Schriften: Cormorant Garamond (Überschriften), DM Sans (Text).
- Ein Hero-Bild pro Beitrag, bei Bedarf 1–2 Inhaltsgrafiken (z. B. Checkliste, Zeitplan, Budget-Übersicht). Bevorzugt eigene Produkt-/Kampagnenfotos.

## 4. Taktung und Pflege

- Rhythmus: alle 2 Wochen ein Beitrag; wenn kein Thema die Qualitätsschwelle erreicht, wird ausgesetzt statt aufgefüllt.
- Saison-Beiträge 2–3 Monate vor dem Anlass veröffentlichen (Weihnachten: August–Oktober).
- Beiträge **nicht löschen**. Evergreen aktualisieren (`updatedDate` setzen, Inhalt prüfen). Veraltetes zusammenführen oder verbessern; wenn eine URL doch entfällt: 301-Weiterleitung in `public/.htaccess`.
- Alle 3 Monate: Leistungsreview (Impressionen, Klicks, Position, Anfragen) und Aktualisierungsliste.

## 5. Recherche-Quellen

- **Google Search Console** (Suchanfragen, Impressionen, Positionen) — wichtigste Datenquelle.
- Google Trends, „Ähnliche Fragen“ / Autovervollständigung, aktuelle HR- und Steuer-News (Österreich/DACH).
- Wettbewerber-Blogs zur Themen- und Lückenanalyse:
  - Direkt (DACH): MYBRIDGET (AT), GIVEAJOY (DE), big little things (DE)
  - Referenz (international): Reachdesk, Giftpack, Snappy Gifts
  - Keyword-Rivalen bei Steuer-/Benefit-Themen: Edenred, LOFINO, corplife, givve
- Eigene Daten: Kundenfragen, Vertriebsgespräche, Kampagnen-Learnings.

## 6. Sprache

Aktuell **nur Deutsch (de-AT)**. Englische Beiträge sind vorerst nicht vorgesehen; bei einer späteren Einführung bräuchten Beiträge eigene Seiten mit hreflang-Verknüpfung.
