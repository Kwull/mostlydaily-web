# de adjudicator: mostlydaily.com guides (16 Nov 2026)

Adjudicator: Fable, fresh context. Inputs: i18n/en.json, i18n/de.json, i18n/review/de-guides-critic.md, the app's de
strings (tools/l10n/lookup.py), de.notes.md, docs/appstore/metadata-de.md, the reviewed home and support segments.

Findings: 14 entries covering 17 ids. Accepted: 17 ids (13 with the critic's text, 4 with a third text). Rejected: 0.
All 134 guide segments are now `reviewed` (357 of 357); `python3 tools/i18n.py check de` reports 0 problems.

| Id | Ruling | Final text (changed part) | Reason |
|---|---|---|---|
| 6a99b30c40 | accept, third text | ... der Geh- und Laufstrecke, der Radfahrstrecke, der Schwimmstrecke, Schlafstunden ...; etwa Joggen, Yoga oder Schwimmen | the app's source names are Radfahrstrecke and Schwimmstrecke, written out instead of the critic's "Rad- oder Schwimmstrecke"; the sport is Joggen in the app and in reviewed c2c032e641 |
| 336fb2cf89 | accept | Health-Daten bleiben auf deinem iPhone und in Apple Health | same word as the page's meta description and reviewed 8370881db2 |
| 04a311a651 | accept, third text | einen runden Tagesring, der zeigt, wie viele fällige Gewohnheiten erledigt sind, ... eine Zeile über der Uhr, etwa "2/5 · Lesen" | "mit erledigt von fällig" does not parse; "fällige Gewohnheiten" is plainer than the critic's "von dem Fälligen" and matches reviewed 8b10ea4a4b |
| 78a751eec5 | accept | sieht dann aus wie sieben gescheiterte Tage | broken grammar in the draft; the word describes other trackers, as the English "seven failures" does, and is not said to the reader |
| 0140323135 | accept | Für eine Gewohnheit, die du aufbaust, fügst du dem Kontrollzentrum Abhaken hinzu, für eine Gewohnheit, von der du weniger willst, Klarer Tag (...) | the draft's word order read translated |
| 6401f6ea8d | accept, third text | An einem vollen Tag zählt sie genauso viel. | the app's de for "On hard days the two-minute version counts fully" is "An vollen Tagen zählt die Zwei-Minuten-Version genauso viel"; the app's words win over the critic's "zählt sie ganz" |
| 9382de0459 | accept | (oder nur den Ring Bewegen) ... (ein Gemütszustand-Eintrag) | accusative after "schließen"; the app says Gemütszustand-Einträge |
| e168af1557 | accept | jedes Gerät trägt sie aus seinem eigenen Health ein | "füllt sie" has no object that fits |
| d02827c086 | accept, third text | die Gewohnheit zeigt, wie oft jeder Grund vorkam. Das beschreibt, was war, und gibt keine Ratschläge. | "Zählung pro Grund" is a calque and "Sie" pointed at the habit; the critic's "nur" is not in the English |
| 3731967e51 | accept | ein flexibles Monatsbudget | "weiches Budget" is a calque |
| 237af1f5b0 | accept | ein flexibles Budget von 4 Tagen im Monat | same |
| c335d25e08 | accept | Wähl den Zeitraum, einen Grund ... | "die Daten" reads as data |
| ed56b37f04 | accept | In den Einstellungen erstellt Export und Import in jedem Plan CSV-Dateien ... | the draft read as three subjects with a singular verb |
| 0e6cf54535 | accept | wenn du zurückkommst, gibt es ein kurzes Willkommen | "willkommen geheißen" is too formal for this voice |
| 50dff26f05 | accept | Gewohnheitstracker ohne Serien (Habit Tracker ohne Streak) · Mostly Daily | leads with the H1's words and the store keyword Gewohnheitstracker, keeps the English search phrase once, no colon pair |
| 54f0c2829f | accept | Kurze Texte dazu, wie du Gewohnheiten aufbaust, die bleiben, vom Team hinter Mostly Daily. | verbal phrase, the words people type |
| 76b717a632 | accept | Kurze Texte dazu, wie du Gewohnheiten aufbaust, die bleiben. | same |

Not settled: none.
