# de critic: mostlydaily.com website (index.html, support.html, assets/site.js)

Critic: Opus, fresh context. Inputs: i18n/en.json, i18n/de.json (223 segments, all `drafted`), glossary, de.notes.md,
docs/appstore/metadata-de.md, app strings via tools/l10n/lookup.py, Apple terms via tools/l10n/apple_terms.py.

Mechanical checks (all 223 segments): tag multiset, hrefs, classes and attributes identical to the English; {n},
{level}, {day}, {state} kept; plural keys have one + other; no em/en dashes; no typographic quotes. The only markup
difference is c3747825d7 (two extra `&quot;` pairs, see below).

Overall: reads like a German product site, du throughout, app terms right (Anfang/Manchmal/Oft/Meistens, Lauf, Nie
zweimal in Folge verpasst, Ruhetag, Wenig Energie, Auszeit, Rückblick, Fokusmodus, Weniger tun, Eintragen, Alle
abhaken, Gestern abschließen, Als Nächstes, Diese Woche, Heute und Woche, Monatskalender, Dein Umfeld, Designs und
App-Symbole, Jährlich/Monatlich/Lebenslang, Andere Pläne, Apple Account, Abonnements, Familienfreigabe, Home-Bildschirm,
Sperrbildschirm, Kontrollzentrum, Widget bearbeiten, Widget hinzufügen, Anpassen, Teilen, Minuten der Achtsamkeit,
Stehstunden, Trainings, workout types). Search: the home `<title>`/og:title starts with "Mostly Daily: Sanfte
Routinen", the meta description leads with "Gewohnheitstracker", eyebrows carry "Habit Tracker fürs iPhone",
"Gewohnheitstracker ohne Serien", "Gewohnheits-Widgets fürs iPhone", "Kostenloser Habit Tracker". A de speaker
searching for a habit tracker would find and trust it once the four major findings are fixed.

Counts: 20 findings (one entry covers three ids), 4 major, 16 minor.

---

## f72800165b (major)
- back: "Read more: ... why a missed day isn't wearing anything to a habit (?) ..."
- problem: meaning/naturalness. The idiom is "jemandem nichts anhaben können" (cannot harm). "einer Gewohnheit nichts
  anhat" without "kann" reads as "has nothing on" (is not wearing anything): wrong and a little comic, in a link that
  names a guide.
- proposed: `Mehr dazu: <a href="/guides/habit-tracker-without-streaks.html">ein Gewohnheitstracker ohne Serien</a>, <a href="/guides/one-missed-day.html">warum ein verpasster Tag deiner Gewohnheit nicht schadet</a>, <a href="/guides/rest-days.html">Ruhetage</a> und <a href="/guides/sick-and-travel-days.html">Krankheitstage und Reisen</a>.`

## f336acebcd (major)
- back: "Why a missed day isn't wearing anything to a habit (?) / The day after is what counts. ..."
- problem: same broken idiom in the guide card title (a heading people click).
- proposed: replace only the first `<b>`: `<b>Warum ein verpasster Tag deiner Gewohnheit nicht schadet</b>` (rest of the segment unchanged).

## 27d1c0c043 (major)
- back: "... (steps, sport, mindful minutes, sleep, stand hours, water, workouts, drinks) ..."
- problem: wrong Health type. English "exercise" here is Apple's exercise minutes; the app's de source row says
  "Trainingsminuten" (HealthKit EXERCISE_MINUTE: Trainingsminuten). "Sport" is a different, vague word.
- proposed: `Wenn du eine Gewohnheit anlegst, die Apple Health nutzen kann (Schritte, Trainingsminuten, Minuten der Achtsamkeit, Schlaf, Stehstunden, Wasser, Trainings, Getränke), ist &quot;Apple Health nutzen&quot; an; das System fragt einmal beim Sichern. Check-ins, die aus Health kommen, bleiben auf diesem iPhone. Einstellungen &gt; Apple Health listet auf, was gelesen und gesichert wird; den Zugriff verwaltest du in der Health-App &gt; Teilen &gt; Apps &gt; Mostly Daily.`

## 2ae54a5895 (major)
- back: "Today's reminder only comes once Apple Health has completed the day, so a workout still syncing gets no early nudge."
- problem: meaning reversed. "Today's reminder goes" means it is withdrawn: spec reminders-and-notifications
  "Reminders after Apple Health completes a day" (a habit Health completed today gets no further reminder). The de says
  the reminder only arrives after the day is complete.
- proposed: replace the sentence "Die Erinnerung für heute kommt erst, ... kein zu früher Anstoß." with
  `Sobald Apple Health den Tag abgehakt hat, fällt die Erinnerung für heute weg, und für ein Training, das noch synchronisiert, kommt kein zu früher Anstoß.` (rest of the segment unchanged).

## 12f89ab9eb, d9b596e8b7, b0a3c90d0f (minor)
- back: "... rest is a real day ..." / h3 "Rest is a real day."
- problem: "Ruhe ist ein echter Tag" says "calm/quiet is a real day": Ruhe is not a day. The app and the store say Ruhetag.
- proposed: 12f89ab9eb `Ein Gewohnheitstracker fürs iPhone, der verzeiht. Ein verpasster Tag setzt nichts zurück, ein Ruhetag ist ein echter Tag, und Meistens ist die höchste Stufe. Kein Account, kein Tracking.`;
  d9b596e8b7 `Ein Gewohnheitstracker fürs iPhone, der verzeiht. Ein verpasster Tag setzt nichts zurück, ein Ruhetag ist ein echter Tag, und <b>Meistens</b> ist die höchste Stufe.`;
  b0a3c90d0f `Ein Ruhetag ist ein echter Tag.`

## 01ccce99c7 (minor)
- back: "Never missed twice 67 days · a simple streak shows 3 days"
- problem: English is hypothetical ("would say"); de states it as fact, which reads as if the app also shows a streak.
- proposed: `Nie zweimal in Folge verpasst <b data-run>67 Tage</b> &middot; eine normale Serie würde <b data-streak>3 Tage</b> zeigen` (sim.days fills data-streak with "{n} Tag/Tage" in the accusative, which fits).

## d536a16975 (minor)
- back: "Start tiny. Go a step further when it comes easy."
- problem: spelling: "leichtfällt" is one word (leichtfallen); without "dir" it reads impersonal.
- proposed: `Fang winzig an. Geh einen Schritt weiter, wenn es dir leichtfällt.`

## c3747825d7 (minor)
- back: OK in meaning.
- problem: adds `&quot;` around Heute twice, which the English does not have; the same text on support.html
  (3eda3bf54a) has no quotes. Keep markup identical.
- proposed: same text with `Heute` unquoted: `Auf dem inneren Display des iPhone Duo zeigt Heute neben deiner Liste einen zweiten Bereich: Diese Woche oder die Gewohnheit, auf die du tippst. Die Details von Gewohnheiten und Limit-Gewohnheiten, der Rückblick und die Einstellungen öffnen sich nebeneinander. Im Hochformat sind Heute und die Kalenderansichten einspaltig. Beim Auf- und Zuklappen bleibst du, wo du warst. Das äußere Display funktioniert wie bei jedem iPhone.`

## d9a6bf5660 (minor)
- back: "Each check-in lays a tile in the habit's colour." (lays it where?)
- problem: "legt eine Kachel" needs a place; reads unfinished.
- proposed: `Jemand, der liest. Jemand, der sich bewegt. Jeder Check-in legt eine Kachel in der Farbe der Gewohnheit in dein Mosaik. Kacheln werden nie weggenommen: Ein verpasster Tag hinterlässt kein Loch, denn eine Kachel ist etwas, das du getan hast.`

## fdc7eb4f86 (minor)
- back: "Who you're becoming: four mosaics for Somebody who reads; ..."
- problem: grammar: "für Jemand" needs the accusative (jemanden) and a capital J mid-sentence. The identity names are
  nominative app strings, so use a colon frame (glossary, identity strings).
- proposed: `Wer du wirst, vier Mosaike: Jemand, der liest; Jemand, der sich jeden Tag bewegt; Jemand, der bewusst trinkt; Ein ruhiger Mensch`

## 9501454f3b (minor)
- back: "No server, no account, no analysis. ..."
- problem: "keine Analyse" means no analysis; "analytics" is usage tracking.
- proposed: `Kein Server, kein Account, keine Nutzungsanalyse. Deine Gewohnheiten werden über dein eigenes iCloud synchronisiert. Exportiere alles als CSV, in jedem Plan; lösche alles mit einem Tippen.`

## 6ed4225869 (minor)
- back: "Yes. No server, no analysis, no tracking. ..."
- problem: same as 9501454f3b.
- proposed: `Ja. Kein Server, keine Nutzungsanalyse, kein Tracking. Check-ins aus Apple Health und die Getränke, die du einträgst, bleiben auf deinem iPhone und kommen nie in iCloud.`

## 874d78699c (minor)
- back: "Unlimited habits, 5 in focus"
- problem: drops "at a time", which is the point of Focus mode (the FAQ says "gleichzeitig").
- proposed: `Unbegrenzte Gewohnheiten, 5 gleichzeitig im Fokus`

## 1e37d42e3c (minor)
- back: "... If a new habit would lie above it, a note in the form says that before you add it ..."
- problem: "darüber läge" has no clear antecedent and "sagt ... das" is clunky.
- proposed: `Der kostenlose Plan hat 3 Gewohnheiten. Premium hat unbegrenzte Gewohnheiten, und der Fokusmodus hält 5 gleichzeitig im Fokus. Wäre eine neue Gewohnheit eine zu viel, zeigt das Formular einen Hinweis, bevor du sie hinzufügst, und bietet &quot;Gewohnheit pausieren…&quot; an. Wähl eine zum Pausieren: Verlauf und Stufe bleiben erhalten, sie wartet unter Pausiert, und du kannst sie jederzeit fortsetzen. Nichts wird gelöscht.`

## e214ef1d09 (minor)
- problem: JSON-LD copy of 1e37d42e3c, same fix, plain text with straight quotes.
- proposed: `Der kostenlose Plan hat 3 Gewohnheiten. Premium hat unbegrenzte Gewohnheiten, und der Fokusmodus hält 5 gleichzeitig im Fokus. Wäre eine neue Gewohnheit eine zu viel, zeigt das Formular einen Hinweis, bevor du sie hinzufügst, und bietet "Gewohnheit pausieren…" an. Wähl eine zum Pausieren: Verlauf und Stufe bleiben erhalten, sie wartet unter Pausiert, und du kannst sie jederzeit fortsetzen. Nichts wird gelöscht.`

## 52264cf7f6 (minor)
- back: "... worried about your health or your drinking ..."
- problem: "dein Trinken" is awkward in German; the usual neutral phrase is "deinen Alkoholkonsum". Not a medical claim.
- proposed: `Nein. Mostly Daily ist zur Selbstbeobachtung da und gibt keinen medizinischen Rat. Wenn du dir Sorgen um deine Gesundheit oder deinen Alkoholkonsum machst, sprich bitte mit einer Fachperson.`

## c9b7e8e6ba (minor)
- back: "Guides / Support / Privacy / Conditions / ..."
- problem: "Bedingungen" alone is not the usual footer link; German sites say "Nutzungsbedingungen".
- proposed: `<a href="/guides/">Ratgeber</a><a href="/support.html">Support</a><a href="/privacy.html">Datenschutz</a><a href="/terms.html">Nutzungsbedingungen</a><a href="mailto:contact@mostlydaily.com">contact@mostlydaily.com</a>`

## 63a8f8821f (minor)
- back: "... it fills at once, without the app popping open ..."
- problem: "ohne dass die App aufgeht" is colloquial and slightly off; the site elsewhere says "ohne die App zu öffnen".
- proposed: replace "Er füllt sich sofort, ohne dass die App aufgeht." with `Er füllt sich sofort, ohne dass du die App öffnest.` (rest unchanged).

## 2b21c71c12 (minor)
- back: "... a running challenge runs to its end ..."
- problem: "läuft eine laufende Challenge" repeats the verb; reads translated.
- proposed: replace the last sentence with `Wenn Premium endet, läuft eine begonnene Challenge bis zum Ende, und abgeschlossene bleiben lesbar.`

## 543ef84fcd (minor, search)
- back: "habit tracker, habit tracker (de), habits tracker, habit tracker without streak, routines app, habits widget iPhone, alcohol tracker, drink less"
- problem: 8 real phrases, good. The English leads with "habit calendar" (the brand idea) and de has no calendar
  phrase; "Gewohnheitskalender" is a real de search phrase and fits the page. "Habit Tracker ohne Streak" mixes
  languages; de users who search that way exist, so keep it.
- proposed: `Habit Tracker, Gewohnheitstracker, Gewohnheiten Tracker, Habit Tracker ohne Streak, Gewohnheitskalender, Gewohnheiten Widget iPhone, Alkohol Tracker, weniger trinken`
  (drops "Routinen App", which the store name "Sanfte Routinen" already covers).
