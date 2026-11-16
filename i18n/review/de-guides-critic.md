# de critic: mostlydaily.com guides (guides/*.html)

Critic: Opus, fresh context, 16 Nov 2026. Inputs: i18n/en.json, the 134 `drafted` entries in i18n/de.json (the 223
`reviewed` home and support entries used as the term reference), glossary, de.notes.md, docs/appstore/metadata-de.md,
app strings via tools/l10n/lookup.py, Apple terms via tools/l10n/apple_terms.py.

Mechanical checks (all 134): tag multiset, hrefs and classes identical to the English; `&quot;` counts match; no em or
en dashes; no typographic quotes. The only entity difference is 82a9651319 (English `&#x27;` apostrophe, none needed in
German): fine.

App words checked and right: Weniger tun, Leckereien, Privat halten, "etwas Privates", "Privat", Heute ruhen, Wenig
Energie, Reise, Urlaub, Anderes, Auszeit, Klarer Tag (control), Abhaken, Als Nächstes, Heute und Woche, Monatskalender,
Diese Woche, Wer du wirst, Ideen aus Apple Health, Meine Ringe schließen, Rausgehen, Bis 23:00 im Bett, Festhalten, wie
es mir geht, Gemütszustand, Zeit im Tageslicht, Trainingsminuten, Minuten der Achtsamkeit, Stehstunden, Trainings, Jedes
Training, Mit anderen, Abschalten, "Klare Tage diese Woche: 3 von 4", "Morgen ist ein neuer Tag.", Protokolle über
iCloud synchronisieren, Dein Tag, Export und Import, Alle Daten löschen, Willkommen zurück, "Nie zweimal in Folge
verpasst", "Heute Ruhetag für Lesen in Mostly Daily", "Hake Lesen in Mostly Daily ab", Widget hinzufügen, Bearbeiten,
getönt / transparent and StandBy as on the reviewed home page. Guide titles and link texts match the reviewed home
cards and footer ("Warum ein verpasster Tag deiner Gewohnheit nicht schadet", "Gewohnheitstracker ohne Serien", "Wie
du bei Getränken, Zucker oder Bildschirmzeit kürzertrittst", "Ratgeber"). The disclaimer matches the reviewed FAQ and
the store text; no medical, treatment or recovery claims, no book title.

Overall: the guides read like German articles, du throughout, plain and calm. Search: titles carry
"Gewohnheitstracker", "Habit Tracker", "weniger trinken", "Gewohnheits-Widgets", "ohne Account", "Krankheitstage"
naturally. One major finding (workout and distance names), the rest is wording.

Counts: 14 findings, 1 major, 13 minor.

---

## 6a99b30c40 (major)
- back: "A habit you build can follow steps, exercise minutes, mindful minutes, workouts, walking and running distance,
  cycling, swimming, sleep hours, stand hours or water. For workouts you choose the kind, for example running, yoga or
  swimming, or any workout. ..."
- problem: two app-term breaks. (1) The run workout is "Joggen" in the app (de notes, Apple Health by outcome: "Lauf"
  and "laufen" appear nowhere as the sport) and in the reviewed support segment c2c032e641 ("etwa Joggen, Yoga oder
  Schwimmen"); the draft says "Laufen". (2) The Health sources are distances: the app says "Radfahrstrecke" and
  "Schwimmstrecke" (and "Geh-, Lauf-, Rad- und Schwimmstrecke" in the Health permission text); "Radfahren, Schwimmen"
  names the activities.
- proposed: `Eine Gewohnheit, die du aufbaust, kann Schritten, Trainingsminuten, Minuten der Achtsamkeit, Trainings, der Geh- und Laufstrecke, der Rad- oder Schwimmstrecke, Schlafstunden, Stehstunden oder Wasser folgen. Bei Trainings wählst du die Art, etwa Joggen, Yoga oder Schwimmen, oder jedes Training. Die App zeigt nur Quellen, die zum Ziel passen: Eine Gewohnheit in Minuten kann Trainingsminuten oder einem Training folgen, und eine Gewohnheit in Schritten kann Schritten folgen.`

## 336fb2cf89 (minor)
- back: "... your habits sync through your own private iCloud, health data stays on your iPhone and in Apple Health ..."
- problem: consistency. The same page's meta description (d3fe75053d) and the reviewed home (8370881db2) say
  "Health-Daten"; here it is "Gesundheitsdaten".
- proposed: `Mostly Daily hat keinen Account, keine Anmeldung und keinen Server. Deine Gewohnheiten werden über dein eigenes privates iCloud synchronisiert, Health-Daten bleiben auf deinem iPhone und in Apple Health, und es gibt keine Nutzungsanalyse und keine Werbung.`

## 04a311a651 (minor)
- back: "On the Lock Screen there is a round day ring with done of due (?), a rectangle ... and a line above the clock like
  "2/5 · Read". ..."
- problem: naturalness. "mit erledigt von fällig" is a word-for-word calque and does not parse in German. "wie" before
  the example reads as a comparison; "etwa" is the usual word.
- proposed: `Auf dem Sperrbildschirm gibt es einen runden Tagesring, der zeigt, wie viel von dem Fälligen erledigt ist, ein Rechteck mit deiner nächsten offenen Gewohnheit und eine Zeile über der Uhr, etwa "2/5 · Lesen". Das runde Widget Gewohnheit hakt eine Gewohnheit ab, ohne das iPhone zu entsperren. In StandBy verlieren die Widgets ihren Hintergrund und die Namen werden größer, damit du sie vom Bett aus lesen kannst.`

## 78a751eec5 (minor)
- back: "... A week with the flu then looks like seven times failed, and two weeks at the sea look as if you gave up. ..."
- problem: naturalness. "sieht aus wie sieben Mal gescheitert" is broken grammar (and "siebenmal" is one word).
- proposed: `Die meisten Gewohnheitstracker kennen zwei Zustände, erledigt und nicht erledigt. Eine Woche mit Grippe sieht dann aus wie sieben gescheiterte Tage, und zwei Wochen am Meer sehen aus, als hättest du aufgegeben. Du brauchst einen Weg, der App zu sagen, dass dieser Tag nicht zählt.`

## 0140323135 (minor)
- back: "Add Check in to Control Center for a habit you build, or Clear day for a habit you want less of ..."
- problem: naturalness. "Füg dem Kontrollzentrum Abhaken hinzu für eine Gewohnheit ..." puts "hinzu" in the middle;
  the trailing phrase reads translated. Split the two cases.
- proposed: `Für eine Gewohnheit, die du aufbaust, fügst du dem Kontrollzentrum Abhaken hinzu, für eine Gewohnheit, von der du weniger willst, Klarer Tag (bei Klarer Tag musst du zuerst entsperren). Siri versteht "Hake Lesen in Mostly Daily ab" und "Heute Ruhetag für Lesen in Mostly Daily", und keiner der Kurzbefehle öffnet die App.`

## 6401f6ea8d (minor)
- back: "... On a difficult day it counts fully. ..."
- problem: consistency with the app. The two-minute version is "für volle Tage" in the app and the store text
  ("An vollen Tagen werde ich ...", de notes); "an einem schweren Tag" leans toward a hard, heavy day.
- proposed: `Jede Gewohnheit kann eine Zwei-Minuten-Version haben: eine Seite lesen, die Schuhe anziehen, einen Zahn mit Zahnseide reinigen. An einem vollen Tag zählt sie ganz. Sie hält Auslöser und Handlung zusammen.`

## 9382de0459 (minor)
- back: "Four more check off wellbeing habits: Close my rings (or only the ring Move [nominative]) ... (an entry at State of
  Mind). ..."
- problem: wording. Inside "Meine Ringe schließen (oder nur ...)" the ring is the object, so accusative "den Ring
  Bewegen". "ein Eintrag bei Gemütszustand" is clumsy; the app says "Gemütszustand-Einträge".
- proposed: `Vier weitere haken Gewohnheiten fürs Wohlbefinden ab: Meine Ringe schließen (oder nur den Ring Bewegen), Rausgehen (Zeit im Tageslicht), Bis 23:00 im Bett (aus deinen Schlafdaten) und Festhalten, wie es mir geht (ein Gemütszustand-Eintrag). Die App sieht nur, ob der Tag gezählt hat. Sie zeigt nie Kalorien, Ringwerte oder was du als Stimmung eingetragen hast.`

## e168af1557 (minor)
- back: "... and each device fills them out (?) from its own Health. ..."
- problem: wording. "füllt sie aus" reads as "fills in a form"; the meaning is that each device adds them from its own
  Health.
- proposed: `Der Zugriff ist freiwillig und wird pro Gewohnheit abgefragt. Check-ins aus Apple Health bleiben auf dem iPhone und gehen nie in iCloud, und jedes Gerät trägt sie aus seinem eigenen Health ein. Apple Health funktioniert im kostenlosen Plan. Zu Getränken lies <a href="/guides/cut-back-with-a-calendar.html">wie du bei Getränken, Zucker oder Bildschirmzeit kürzertrittst</a>.`

## d02827c086 (minor)
- back: "... and the habit shows a counting per reason. She/It describes what happened and gives no advice."
- problem: wording. "eine Zählung pro Grund" is a calque, and "Sie" points back to "die Gewohnheit", which then
  "gives no advice". English "It" is the count.
- proposed: `Wenn der Tag fast vorbei ist, trägt ein Tippen auf die quadratische Taste einen klaren Tag ein, oder du gibst die Menge ein. Das Widget Gewohnheit und das Steuerelement Klarer Tag im Kontrollzentrum tun dasselbe, ohne die App zu öffnen. Du kannst einem Tag einen Grund geben, etwa Mit anderen oder Abschalten, und die Gewohnheit zeigt, wie oft jeder Grund vorkam. Das beschreibt nur, was war, und gibt keine Ratschläge.`

## 3731967e51, 237af1f5b0 (minor)
- back: "... rest and travel have a soft monthly budget ..." / "Rest and Travel share a soft budget of 4 days a month ..."
- problem: wording. "weiches Budget" is a calque of "soft budget"; German says a budget is "flexibel" or a limit is
  "kein festes Limit". The app itself avoids the word ("verbrauchen keine Ruhetage").
- proposed: 3731967e51 `In Mostly Daily sind Ruhetage, Tage mit wenig Energie und Reisetage echte Zustände. Sie helfen deiner Stufe nicht und schaden ihr nicht: Der Tag zählt einfach nicht als Gelegenheit für die Gewohnheit. Tage mit wenig Energie verbrauchen keine Ruhetage; für Ruhe und Reise gibt es ein flexibles Monatsbudget, damit Ruhe eine Entscheidung bleibt.`;
  237af1f5b0 `Ruhe und Reise teilen sich ein flexibles Budget von 4 Tagen im Monat pro Gewohnheit, das du von 0 bis 10 ändern kannst. Mehr zu nehmen ist in Ordnung: Das Menü zeigt, wie viele du genutzt hast, und ein zusätzlicher Ruhetag ist trotzdem ein Ruhetag, nie ein Aussetzer. Jede Woche, die mit der Gewohnheit bei Oft oder Meistens endet, bringt außerdem einen weiteren Ruhetag, und du kannst bis zu 4 ansparen.`

## c335d25e08 (minor)
- back: "... Choose the data (or dates), a reason ..."
- problem: wording. "die Daten" reads first as "data"; "den Zeitraum" is unambiguous.
- proposed: `Für mehr als ein, zwei Tage gehst du zu Einstellungen, Auszeit. Wähl den Zeitraum, einen Grund (Urlaub, Reise, Wenig Energie oder Anderes) und entweder alle Gewohnheiten oder nur einige. Erinnerungen bleiben still, diese Tage zählen nie als Aussetzer, und sie verbrauchen keine Ruhetage. Der Grund bleibt auf deinem iPhone.`

## ed56b37f04 (minor)
- back: "Settings, Export and import creates CSV files ... in every plan."
- problem: wording. "Einstellungen, Export und Import erstellt" reads as a list of three subjects with a singular verb.
- proposed: `In den Einstellungen erstellt Export und Import in jedem Plan CSV-Dateien deiner Gewohnheiten, Check-ins und Auszeiten. Premium sperrt deine Daten nie, und Alle Daten löschen entfernt deine Gewohnheiten, Check-ins und Auszeiten vom iPhone und aus iCloud. Alle Einzelheiten stehen in der <a href="/privacy.html">Datenschutzerklärung</a>.`

## 0e6cf54535 (minor)
- back: "... and when you come back, you are briefly welcomed. ..."
- problem: wording. "wirst du kurz willkommen geheißen" is stiff and formal for this voice; the store text says "ein
  ruhiges Willkommen".
- proposed: `Du fährst in den Urlaub? Leg eine Auszeit für alle Gewohnheiten auf einmal fest oder nur für die, die du auswählst, und gib ihr einen Grund: Urlaub, Wenig Energie oder Anderes. Erinnerungen bleiben still, nichts zählt als verpasst, und wenn du zurückkommst, gibt es ein kurzes Willkommen. Es gibt keine Liste dessen, was du nicht getan hast.`

## 50dff26f05 (minor)
- back: "Habit tracker without streak: habit tracker without series · Mostly Daily"
- problem: search and naturalness. The title says the same thing twice in two languages with a colon between, which
  reads as keyword stuffing. Keep both search words, but as one phrase with the English in brackets, and lead with the
  H1's words.
- proposed: `Gewohnheitstracker ohne Serien (Habit Tracker ohne Streak) · Mostly Daily`

## 54f0c2829f, 76b717a632 (minor)
- back: "Short texts about the building of habits that last ..."
- problem: search and naturalness. "über den Aufbau von Gewohnheiten" is nominal; "Gewohnheiten aufbauen" is the
  phrase people type and reads more naturally.
- proposed: 54f0c2829f `Kurze Texte dazu, wie du Gewohnheiten aufbaust, die bleiben, vom Team hinter Mostly Daily.`;
  76b717a632 `Kurze Texte dazu, wie du Gewohnheiten aufbaust, die bleiben.`

---

Not filed: H1 524f019e29 and card eedbc4bea8 ("Wie du bei Getränken, Zucker oder Bildschirmzeit kürzertrittst") read a
little stiff, but the reviewed footer 2619303cab uses the same words, and the page `<title>` ("Weniger trinken, weniger
Zucker, weniger Bildschirmzeit") already carries the search words, so they stay for consistency.
