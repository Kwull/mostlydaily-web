# de adjudicator: mostlydaily.com website (16 Nov 2026)

Adjudicator: Fable, fresh context. Inputs: i18n/en.json, i18n/de.json, i18n/review/de-critic.md, the app's de strings
(tools/l10n/lookup.py), the glossary, docs/appstore/metadata-de.md, spec reminders-and-notifications.

Findings: 20 entries covering 23 ids. Accepted: 22 ids (19 with the critic's text, 3 with a third text). Rejected: 1 id.
All 223 segments are now `reviewed`; `python3 tools/i18n.py check de` reports 0 problems.

| Id | Ruling | Final text (changed part) | Reason |
|---|---|---|---|
| f72800165b | accept | warum ein verpasster Tag deiner Gewohnheit nicht schadet | "nichts anhat" without "kann" is a broken idiom |
| f336acebcd | accept | Warum ein verpasster Tag deiner Gewohnheit nicht schadet | same idiom in the guide card title |
| 27d1c0c043 | accept | (Schritte, Trainingsminuten, Minuten der Achtsamkeit, ...) | the app's de for "Exercise minutes" is Trainingsminuten |
| 2ae54a5895 | accept | Sobald Apple Health den Tag abgehakt hat, fällt die Erinnerung für heute weg, und für ein Training, das noch synchronisiert, kommt kein zu früher Anstoß. | the draft reversed the meaning; the spec (Reminders after Apple Health completes a day) says the reminder is removed |
| 12f89ab9eb | accept | ..., ein Ruhetag ist ein echter Tag, ... | "Ruhe" is not a day; the app and the store say Ruhetag |
| d9b596e8b7 | accept | ..., ein Ruhetag ist ein echter Tag, ... | same |
| b0a3c90d0f | accept | Ein Ruhetag ist ein echter Tag. | same |
| 01ccce99c7 | accept, third text | eine einfache Serie würde <b data-streak>3 Tage</b> zeigen | the conditional is needed; "einfache" stays because it is closer to "plain" than "normale" |
| d536a16975 | accept | Fang winzig an. Geh einen Schritt weiter, wenn es dir leichtfällt. | "leichtfällt" is one word |
| c3747825d7 | accept | Heute without quotes, twice | markup must match the English and 3eda3bf54a |
| d9a6bf5660 | accept, third text | Mit jedem Check-in kommt eine Kachel in der Farbe der Gewohnheit dazu. | "legt eine Kachel" needed a place; the critic's "in dein Mosaik" adds a word the English does not have |
| fdc7eb4f86 | accept | Wer du wirst, vier Mosaike: Jemand, der liest; Jemand, der sich jeden Tag bewegt; Jemand, der bewusst trinkt; Ein ruhiger Mensch | "für Jemand" was the wrong case; the colon keeps the app's nominative identity names |
| 9501454f3b | accept | Kein Server, kein Account, keine Nutzungsanalyse. | "Analyse" alone does not mean analytics |
| 6ed4225869 | accept | Ja. Kein Server, keine Nutzungsanalyse, kein Tracking. | same |
| 874d78699c | reject | Unbegrenzte Gewohnheiten, 5 im Fokus (draft kept) | this is the app's own de string for "Unlimited habits, %lld in focus at a time"; the app's words win |
| 1e37d42e3c | accept | Wäre eine neue Gewohnheit eine zu viel, zeigt das Formular einen Hinweis, bevor du sie hinzufügst, und bietet ... | "darüber läge" had no antecedent |
| e214ef1d09 | accept | same sentence, plain text | JSON-LD copy of 1e37d42e3c |
| 52264cf7f6 | accept | ... um deine Gesundheit oder deinen Alkoholkonsum machst ... | "dein Trinken" is awkward; the new phrase is neutral and makes no claim |
| c9b7e8e6ba | accept | Nutzungsbedingungen | the app's de for "Terms of use"; the link opens the terms page |
| 63a8f8821f | accept | Er füllt sich sofort, ohne dass du die App öffnest. | matches the wording used elsewhere on the site |
| 2b21c71c12 | accept | ... läuft eine begonnene Challenge bis zum Ende ... | "läuft eine laufende" repeated the verb |
| 543ef84fcd | accept, third text | Habit Tracker, Gewohnheitstracker, Gewohnheitskalender, Habit Tracker ohne Streak, Routinen App, Gewohnheiten Widget iPhone, Alkohol Tracker, weniger trinken | Gewohnheitskalender added for the English "habit calendar"; it replaces "Gewohnheiten Tracker", a near copy of Gewohnheitstracker; "Routinen App" stays because "Routinen" has search volume in metadata-de.md |

Not settled: none.
