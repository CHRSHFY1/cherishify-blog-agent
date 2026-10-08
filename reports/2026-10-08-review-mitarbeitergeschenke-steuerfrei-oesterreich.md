# Review: Mitarbeitergeschenke steuerfrei in Österreich: Was 2026 gilt

- **Slug:** `mitarbeitergeschenke-steuerfrei-oesterreich` · Branch `blog/mitarbeitergeschenke-steuerfrei-oesterreich` (Commit 3b77a0c)
- **Ziel-Keyword:** Mitarbeitergeschenke steuerfrei Österreich (sekundär: Sachzuwendungen Mitarbeiter 186 Euro, Weihnachtsgeschenk Mitarbeiter steuerfrei, Mitarbeiterprämie 2026)
- **Umfang:** 1.368 Wörter, 8 H2, FAQ mit 5 Fragen, 6 interne Links
- **Kurzfassung:**
  1. Erklärt die drei getrennten Beträge aus § 3 Abs 1 Z 13 EStG (365 € Veranstaltung, 186 € Sachzuwendung dabei, 186 € Jubiläum) mit Rechenbeispiel.
  2. Stellt die Mitarbeiterprämie 2026 richtig: nur noch bis 500 € (Juli–Dezember), nur Lohnsteuer befreit.
  3. Trennt geltendes Recht von der WK-OÖ-Forderung nach 250 € und endet mit Jahresend-Checkliste und Gesprächs-CTA.

## Vorschau
```
./scripts/review.sh mitarbeitergeschenke-steuerfrei-oesterreich
```
→ http://localhost:8080/blog/mitarbeitergeschenke-steuerfrei-oesterreich

Hinweis: `prepare-worktree.sh` hat lokale (uncommittete) Änderungen des Website-Repos in den Worktree übernommen (OVERLAY_LOCAL_CHANGES war aktiv). Committet wurden nur die erlaubten Dateien (Post + Registry-Eintrag).

## Faktencheck

| # | Aussage im Beitrag | Quelle | Sicherheit |
|---|---|---|---|
| 1 | Gesetzestext: 365 € Betriebsveranstaltung, dabei empfangene Sachzuwendungen 186 €, Jubiläums-Sachzuwendungen 186 € jährlich (§ 3 Abs 1 Z 13 EStG) | RIS, EStG § 3: https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570&Paragraf=3 (Wortlaut per Abruf bestätigt; Fassung „Stand 08.10.2026“ laut Seite) | hoch |
| 2 | Bargeld nie begünstigt; Gutscheine/Geschenkmünzen nur, wenn nicht in Bargeld ablösbar | WKO https://www.wko.at/service/arbeitsrecht-sozialrecht/Jubilaeumsgelder,-Jubilaeumsgeschenke,-Sachzuwendungen-an.html · Hofer Leitinger https://www.hoferleitinger.at/news/dienstnehmergeschenke/ | hoch |
| 3 | Eine reine Geschenkübergabe kann als Betriebsveranstaltung genügen | Hofer Leitinger (Zitat: „Es genügt bereits, wenn die Übergabe der Geschenke der eigentliche Anlass und Inhalt der Veranstaltung ist“); entspricht der BMF-Auslegung (LStR), die ich nicht im Volltext prüfen konnte | mittel |
| 4 | Höchstgrenze 372 € (186 + 186) für beide Sachzuwendungs-Töpfe | WKO (Stand 01.01.2026), siehe #2 | mittel–hoch |
| 5 | Jubiläumsjahre: Dienst 10/20/25/30/35/40/45/50; Firma 10/20/25/30/40/50/60/70/75/80/90/100+; 5 und 15 Jahre nicht begünstigt; ein Betrag von 186 € auch bei zusammenfallenden Jubiläen | WKO (siehe #2, nennt 5 Jahre) · Hofer Leitinger (nennt 15 Jahre) · icon.at https://www.icon.at/news/detail/lohnsteuer-steuerliche-behandlung-von-jubilaeumsgeschenken | hoch |
| 6 | Jubiläumsgeschenk muss nicht bei einer Veranstaltung übergeben werden | icon.at (siehe #5) | hoch |
| 7 | Überschreiten der Grenze → gesamter Betrag abgabenpflichtig (im Text ausdrücklich nur als WKO-Aussage zu Jubiläumsgeschenken formuliert) | WKO (siehe #2) | mittel – für die 186 € bei Betriebsveranstaltungen nicht separat belegt |
| 8 | Mitarbeiterprämie 2026: bis 500 €, nur Juli–Dezember 2026; 2025 waren es 1.000 € | BKS https://www.wt-bks.at/blog/mitarbeiterpraemie-2026-steuerfreier-bonus-nur-noch-eur-50000/ · KPMG https://kpmg.com/at/de/media/newsletter/tax-news/2026/05/tpn-begutachtungsentwurf-zur-mitarbeiterpraemie-2026.html · icon.at https://www.icon.at/news/detail/lohnverrechnung-aenderungen-durch-das-budgetbegleitgesetz-2027-2028-21-07-2026 | hoch |
| 9 | Rechtsgrundlage Budgetmaßnahmengesetz 2026, BGBl. I Nr. 43/2026, kundgemacht 30.06.2026 | BKS (siehe #8); PwC-Titel „Budgetmaßnahmengesetz 2026 kundgemacht“: https://www.pwc.at/de/insights/pwc-steuernachrichten/budgetbegleitgesetz-2027-2028-im-nationalrat-beschlossen-budgetmassnahmengesetz-2026-kundgemacht.html (Seite selbst per Abruf nicht lesbar, 403) | mittel–hoch – **Datum und BGBl-Nr. bitte im RIS gegenprüfen** |
| 10 | Bedingungen Prämie: lohngestaltende Vorschrift, zusätzlich, nur Lohnsteuer befreit (SV/Lohnnebenkosten bleiben), Kombination mit Gewinnbeteiligung max. 3.000 € | BKS, KPMG, icon.at (siehe #8) | hoch |
| 11 | WK OÖ beschloss am 09.06.2026 die Forderung nach 250 € + Valorisierung; kein geltendes Recht | https://www.wko.at/ooe/news/5.13-erhoehung-der-steuerfreien-pauschale-fuer-mitarbeitergesche | hoch (Forderung), hoch (nicht Gesetz: kein Gesetzesverweis gefunden) |
| 12 | „Vier bis sechs Wochen von Freigabe bis Zustellung“ | eigener Erfahrungswert, steht so im bestehenden Beitrag `mitarbeitergeschenke-planen`; im Text als „in unseren Kampagnen“ gekennzeichnet | Erfahrungswert |
| 13 | Sachzuwendung darf keine individuelle Leistungsprämie sein, sondern wird aus einem Anlass gewährt | nur aus Suchergebnis-Zusammenfassung der BMF-Richtlinien (findok), PDF nicht lesbar | mittel – bitte mit Steuerberatung prüfen |
| 14 | Beispielrechnung (120 € Veranstaltung + 150 € Geschenk; 200 €) | **erfundenes, als „vereinfachtes Beispiel“ gekennzeichnetes Rechenbeispiel**, kein Faktum | – |

## Braucht Ihre Entscheidung
1. **Bestehender Beitrag `mitarbeitergeschenke-planen` (Abschnitt 3) – bitte prüfen lassen.** Dort steht: „Die 186 € sind eine Jahresgrenze über alle Sachgeschenke, nicht pro Anlass“ und „Wer zu Ostern schon etwas verschenkt hat, hat zu Weihnachten weniger Spielraum“. Nach § 3 Abs 1 Z 13 EStG gibt es aber zwei getrennte 186-€-Beträge (Veranstaltung und Jubiläum), und die Begünstigung hängt am Anlass „Betriebsveranstaltung“. Ich habe den alten Beitrag **nicht** geändert (nicht erlaubt). Der neue Beitrag verlinkt dorthin; die Aussagen widersprechen sich teilweise. Empfehlung: den Abschnitt in einem eigenen Update korrigieren oder auf den neuen Beitrag verweisen.
2. **Geburtstags-/Hochzeitsgeschenke:** Quellen widersprechen sich (eine Steuerseite nennt 186 € „pro Anlass“, die Zusammenfassung der BMF-Richtlinien nennt Geschenke zu persönlichen Anlässen als nicht begünstigt). Ich habe das Thema bewusst weggelassen. Bei Bedarf Steuerberatung fragen und ggf. ergänzen.
3. **Beschluss „gesamter Betrag steuerpflichtig bei Überschreitung“:** belegt nur für Jubiläumsgeschenke (WKO). Im Text entsprechend vorsichtig formuliert („kann“).
4. **Keine GSC-Daten:** `data/gsc/` war leer, daher keine Keyword-Validierung mit eigenen Daten.
5. **Wettbewerber-Aussagen** (givve nennt die 500 € nicht; Pluxee ohne Dokumentationshinweise) stammen aus Abrufzusammenfassungen. Sie werden im Beitrag nicht genannt und dienten nur der Lückenanalyse.
6. **Hinweis am Rande:** Die Wettbewerbsrecherche zeigte, dass einzelne Ratgeber 2026 noch eine Mitarbeiterprämie von 1.000 € nennen. Das ist laut oben genannten Quellen überholt, der Beitrag sagt das, ohne Namen zu nennen.
7. **Veröffentlichungsdatum** ist auf 2026-10-08 gesetzt. Bitte beim Freigeben ggf. anpassen. Kein `updatedDate` gesetzt.

## Hero-Bild-Brief
Aktuell Platzhalter `/og-image.jpg`. Gewünscht: 1200×630, WebP (+ JPEG als `socialImage`). Motiv: ein sorgfältig verpacktes Geschenk mit handgeschriebener Karte auf einem aufgeräumten Schreibtisch, daneben ein Notizblock. Warmes Seitenlicht, Farben nur aus Deep Cocoa `#2E1F0F`, Warm Gold `#B8883A`, Cream `#FDFAF5` (max. 3). Keine Münzen, keine Steuerformulare, kein Textoverlay. Bevorzugt eigenes Kampagnenfoto. Alt-Text ist bereits gesetzt: „Verpacktes Mitarbeitergeschenk mit handgeschriebener Karte auf einem Schreibtisch in warmen Gold- und Cremetönen“. Dateien nach `public/blog/` und dann `heroImage`/`socialImage` im Post anpassen.

## Interne Links
- `/mehrwert` (Präferenz-Abfrage)
- `/blog/mitarbeitergeschenke-planen` (Jubiläum/Planung)
- `/blog/mitarbeitergeschenke-weihnachten-2026` (Zeitplan)
- `/preise`, `/markenkatalog`, `/kontakt` (CTA)

## Checker-Ausgabe (`./scripts/check-post.sh`)
```
PASS In src/content/blog/index.ts registriert
PASS Slug stimmt mit Dateiname überein
PASS SEO-Titel 52 Zeichen (≤ 60)
PASS Meta-Description 154 Zeichen (140–155)
PASS Excerpt-Länge ok
PASS publicationDate im ISO-Format
PASS Autor: Martin Pell (Person)
PASS draft ist nicht true (Beitrag im Review sichtbar)
PASS Tags gesetzt
PASS heroImage + heroImageAlt gesetzt
PASS heroImage existiert (/og-image.jpg)
PASS 1368 Wörter
PASS 8 H2-Abschnitte
PASS Kein H1 im Inhalt (Seite setzt den H1 selbst)
PASS FAQ-Abschnitt vorhanden
PASS 6 verschiedene interne Links
PASS Alle internen Links zeigen auf existierende Routen
PASS Link auf /kontakt oder /preise vorhanden
PASS Keine verbotenen Buzzwords
PASS Keine Platzhaltertexte

0 FAIL, 0 WARN, 20 PASS — 1368 Wörter, 8 H2, 6 interne Links
ESLint: PASS · TypeScript (Blog-Dateien): PASS
```
(Beim ersten Lauf schlug die Meta-Description mit 156 Zeichen fehl; gekürzt auf 154, danach alle Prüfungen bestanden.)
