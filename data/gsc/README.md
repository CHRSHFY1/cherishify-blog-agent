# Search-Console-Exports

Der Agent liest bei jedem Lauf die **neuesten CSV-Dateien** in diesem Ordner und nutzt sie für die Themenwahl
(welche Suchanfragen schon Impressionen, aber kaum Klicks haben, welche Seiten bei Position 8–20 stehen).
Liegt nichts hier, steht das im Themenbericht — die Auswahl beruht dann nur auf Web-Recherche.

## Export (ca. 3 Minuten)
1. https://search.google.com/search-console → Property `cherishify.eu` wählen.
2. **Leistung → Suchergebnisse**, Zeitraum **„Letzte 3 Monate“** (oder länger, wenn verfügbar).
3. Oben rechts **Exportieren → CSV herunterladen**. Das ergibt eine ZIP mit mehreren CSVs.
4. ZIP entpacken und mindestens **Suchanfragen.csv** und **Seiten.csv** hier ablegen, mit Datum vorne:
   `2026-11-29-Suchanfragen.csv`, `2026-11-29-Seiten.csv`.

Alle 4–8 Wochen wiederholen (spätestens am Sonntag vor einem Montag-Lauf). Alte Dateien können liegen bleiben.
