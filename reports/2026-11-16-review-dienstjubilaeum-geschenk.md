# Review-Bericht: Dienstjubiläum Geschenk

- **Titel:** Dienstjubiläum Geschenk: Staffelung, Budget und Ablauf für HR-Teams
- **Slug:** `dienstjubilaeum-geschenk` (Branch `blog/dienstjubilaeum-geschenk`, Commit 717a8bc)
- **Ziel-Keyword:** Dienstjubiläum Geschenk (sekundär: Jubiläumsgeschenk Mitarbeiter, Dienstjubiläum Staffelung)
- **Zusammenfassung:**
  1. Erklärt, welche Dienstjubiläen in Österreich begünstigt sind (10/20/25/30/35/40/45/50) und den Unterschied zwischen Jubiläumsgeld und Jubiläumsgeschenk.
  2. Gibt ein Staffelungs-Raster (als Denkgerüst gekennzeichnet), Auswahlkriterien und einen Sechs-Schritte-Ablauf für HR.
  3. Steuerdetails bewusst kurz, mit Verweis auf den Steuerfrei-Beitrag, um Kannibalisierung zu vermeiden.

## Vorschau
```
./scripts/review.sh dienstjubilaeum-geschenk
```
→ http://localhost:8080/blog/dienstjubilaeum-geschenk

## Fact-Check-Tabelle

| Aussage im Beitrag | Quelle | Sicherheit |
|---|---|---|
| Begünstigte Dienstjubiläen: 10, 20, 25, 30, 35, 40, 45, 50 Jahre | WKO (Stand 01.01.2026): https://www.wko.at/service/arbeitsrecht-sozialrecht/Jubilaeumsgelder,-Jubilaeumsgeschenke,-Sachzuwendungen-an.html und https://www.wko.at/entlohnung/jubilaeumgsgeschenke-sozialrechtlich | hoch (zwei WKO-Seiten + Steuerfrei-Beitrag stimmen überein) |
| Sachzuwendung bis 186 € pro Dienstnehmer und Kalenderjahr frei von Lohnsteuer, SV, DB/DZ/KommSt (wenn Bedingungen erfüllt) | dieselben WKO-Seiten | hoch |
| 5-jähriges Jubiläum: 186 € beitragspflichtig | WKO sozialrechtlich (wörtlich: „Beitragspflicht besteht hingegen für eine Sachzuwendung in Höhe von € 186,00 aus Anlass eines erst fünfjährigen Jubiläums“) | hoch |
| 15. Dienstjahr steht nicht auf der WKO-Liste | dieselbe Liste; der Beitrag sagt nur „steht nicht auf der Liste“, keine weitergehende Aussage | hoch (bewusst vorsichtig formuliert) |
| Dienst- und Firmenjubiläum im selben Jahr: Betrag nur einmal | WKO (s. o.) | hoch |
| Jubiläumsgeld ist Geldleistung, beitragspflichtig, als Sonderzahlung abgerechnet | WKO sozialrechtlich | hoch |
| Rechtsgrundlage für Jubiläumsgeld üblicherweise Kollektivvertrag; auch Betriebsvereinbarung/Einzelvertrag möglich; freiwillig gewährt = Jubiläumsgeschenk | WKO: https://www.wko.at/entlohnung/jubilaeumsgelder-jubilaeumsgeschenke-sachzuwendungen (Stand 01.01.2026) | hoch (Abruf: „Rechtsgrundlage … sind üblicherweise die Kollektivverträge“) |
| Sachzuwendung: z. B. Uhren, nicht in Geld einlösbare Gutscheine | WKO Jubiläumsgelder-Seite | hoch |
| Separater Betrag von 186 € für Betriebsveranstaltungs-Sachzuwendungen (z. B. Weihnachtsgeschenke), zusätzlich zum Jubiläumsbetrag | WKO sozialrechtlich + Steuerfrei-Beitrag | hoch |
| Betrag gilt pro Kalenderjahr, daher Übergabe im jeweiligen Jahr | WKO („pro Dienstnehmer und Kalenderjahr“); Folgerung daraus ist meine | mittel-hoch (Schlussfolgerung, nicht wörtlich) |
| 30–60 € für ein wertiges Jubiläums-/Weihnachtsgeschenk, 4–6 Wochen ab Freigabe | eigener Beitrag `mitarbeitergeschenke-planen` (Erfahrungswerte des Teams) | mittel – im Beitrag als „aus unseren Kampagnen, im Planungsleitfaden“ gekennzeichnet; bitte bestätigen, dass die Werte noch gelten |
| Staffelungs-Raster (10/20–25/30–50 Jahre) | keine Quelle: eigener Vorschlag, im Text als „Vorschlag als Denkgerüst, keine Marktstatistik“ markiert | n. a. (redaktionell) |

Nicht verwendet, da nicht belegbar: Betragsstaffeln aus US-/DE-Blogs (z. B. 250–500 € nach 10 Jahren), Aussagen zu Betriebsübung/Gleichbehandlung (keine klare österreichische Quelle gefunden), Studien zur Wirkung von Jubiläumsgeschenken.

## Offene Punkte für Martin
1. **Hero-Bild:** Platzhalter `/og-image.jpg`. Das finale Bild muss noch entstehen (siehe Briefing).
2. **Veröffentlichungsdatum:** `publicationDate` ist 2026-11-16 (Entwurfsdatum). Bitte beim Freigeben anpassen.
3. **Überschneidung mit dem Steuerfrei-Beitrag:** Jubiläumsjahre und 186 € stehen dort schon. Hier sind sie kürzer und mit Verweis auf den anderen Beitrag. Entscheiden: Reicht das, oder soll der Abschnitt „Welche Dienstjubiläen sind steuerlich begünstigt?“ noch weiter gekürzt werden?
4. **Zeitgeschenke und Zwischenjahre:** Der Beitrag rät, zusätzliche freie Tage und Geschenke zu nicht begünstigten Jahren mit Lohnverrechnung/Arbeitsrecht zu klären. Falls Sie dazu eine eigene Haltung haben, hier ergänzen.
5. **Überschreiten der 186 €:** Die WKO-Seite sagt dazu nichts Ausdrückliches (Abruf), deshalb steht im Beitrag nur „mit der Lohnverrechnung klären“. Der Steuerfrei-Beitrag sagt, dann sei der gesamte Betrag abgabenpflichtig, mit Bezug auf die WKO. Ich habe das hier nicht wiederholt. Bitte beide Beiträge auf Konsistenz prüfen.
6. **Leistungsversprechen:** Der Schluss verspricht Kuratierung, Personalisierung und Lieferung an jede Adresse; „Beschaffung, Verpackung und Zustellung übernehmen wir“ stützt sich auf den Dashboard-Beitrag. Bitte bestätigen, dass das für Jubiläumsgeschenke einzeln (kleine Stückzahlen) so angeboten wird.
7. **Jubiläumsjahre ab 2027:** Das Budgetbegleitgesetz 2027/28 erwähnt laut KPMG-Übersicht weder 186 € noch Jubiläumsgeschenke. Ich habe das nicht als „unverändert 2027“ behauptet. Beitrag steht auf „Stand November 2026“.
8. **GSC-Daten fehlen** (`data/gsc/` leer), die Themenwahl beruht nicht auf Suchdaten.

## Hero-Bild-Briefing
- Format: 1200×630 WebP + JPEG-Fallback (`socialImage`), unter `public/blog/dienstjubilaeum-geschenk-hero.webp` / `-og.jpg`.
- Motiv: Ein persönlich verpacktes Geschenk mit handgeschriebener Glückwunschkarte auf einem Schreibtisch, warmes Licht, ruhiger Hintergrund. Gold-/Creme-Töne passend zu Warm Gold `#B8883A` und Champagne `#EDE0CB`. Bevorzugt eigenes Produktfoto.
- Keine Personen mit erkennbaren Gesichtern, kein Text im Bild, kein Stockfoto-Look.
- Alt-Text steht bereits im Beitrag: „Persönlich verpacktes Jubiläumsgeschenk mit handgeschriebener Glückwunschkarte auf einem Schreibtisch in warmen Gold- und Cremetönen“. Bei anderem Motiv anpassen.

## Verwendete interne Links
- `/blog/mitarbeitergeschenke-steuerfrei-oesterreich`
- `/blog/mitarbeitergeschenke-planen`
- `/blog/mitarbeitergeschenke-weihnachten-2026`
- `/blog/cherishify-dashboard-launch`
- `/preise`
- `/markenkatalog`
- `/kontakt`

## Checker-Ausgabe (`./scripts/check-post.sh dienstjubilaeum-geschenk`)
```
0 FAIL, 0 WARN, 20 PASS — 1320 Wörter, 7 H2, 7 interne Links
PASS ESLint
PASS Typen
```
(Erster Durchlauf: 1 FAIL, Meta-Description 158 Zeichen. Gekürzt auf 140 Zeichen, danach alles PASS.)

Hinweis zum Commit: `commit-draft.sh` meldete Commit 717a8bc auf `blog/dienstjubilaeum-geschenk`. Ich habe den Inhalt des Commits nicht separat nachgeprüft (die Prüfung wurde nicht freigegeben). Bitte kurz mit `git -C worktrees/dienstjubilaeum-geschenk show --stat HEAD` bestätigen, dass nur Post-Datei und `index.ts` enthalten sind.
