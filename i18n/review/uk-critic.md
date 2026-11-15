# uk critic: Mostly Daily website (index.html, support.html, assets/site.js)

Critic: Opus, 16 Nov 2026, fresh context. Judged all 223 segments of `i18n/uk.json` against `i18n/en.json`, the
glossary, `docs/localization/notes/uk.notes.md`, the app's uk strings (`tools/l10n/lookup.py`) and Apple's uk terms
(`tools/l10n/apple_terms.py`). No in-place sheet.

**Counts: 22 findings, 3 major, 19 minor.** The other segments are fine as drafted.

## Checks that passed (no entry needed)
- Markup: every segment has the same tag multiset as the English; hrefs, classes, `aria-hidden`, entities unchanged.
- Placeholders `{n}`, `{level}`, `{day}`, `{state}` kept. Plural keys `sim.misses`, `sim.days` have one/few/many/other
  and agree for 1, 2, 5, 21, 22, 25.
- Owner rule: no em or en dashes (spaced hyphen used), no typographic quotes; only `&quot;` / `"`. The quotes the
  draft adds around UI names ("Сьогодні", "Підсумки") are normal uk practice and add no tags.
- App words match: levels (Початок, Іноді, Часто, Здебільшого), Формувати / Менше / Більше, Компанія, Розслаблення,
  Налаштуй свій простір, Твій день, Поставити звичку на паузу…, На паузі, Відмітити все, Закрити вчорашній день,
  Інші плани, Як працює Mostly, Експорт та імпорт, Видалити всі дані, Використовувати Apple Health, Більше параметрів,
  Хочеш чогось менше?, Ідеї з Apple Health, Не зараз, Записати, Далі, Сьогодні і тиждень, Календар місяця, Цей
  тиждень, Ким ти стаєш, Змикати кільця, Виходити на вулицю, Записувати, як я почуваюся, Велосипед, Силові тренування,
  Ходьба, Танці, Ясніший січень, Залишити / Змінити / Відпустити, челендж.
- Apple words match: Початковий екран, замкнений екран, Центр керування, Сімейний доступ, Параметри (the iOS app),
  Підписки, обліковий запис Apple, Додати віджет, Редагувати віджет, Здоров'я > Поширення > Програми, хвилини вправ,
  хвилини усвідомленості, години стояння, час надворі вдень.
- Limit name prefixes in 4f8f184e06 / 60d8e238e5 ("менше", "рідше", "без", "кинути") are the words
  `MostlyCore/QuickAdd+DoLess.swift` detects for uk.
- Theme names are translated (Графіт, Ніч, Океан, Слива, Льодовик). The brief lists theme names as untranslated, but
  the app's uk strings translate them and the app's words win, so the draft is right. Not a finding; the adjudicator
  may want to confirm.
- Search: the home `<title>` starts with "Mostly Daily: Лагідні звички"; the meta description opens with "Трекер
  звичок для iPhone"; eyebrows carry "Трекер звичок для iPhone", "Віджети звичок для iPhone", "Безкоштовний трекер
  звичок". Reads like a native product page. A uk searcher for "трекер звичок" would find and trust it.
- Content: no medical, treatment or recovery claims; no book title or quotes; informal ти throughout.

---

## Major

### 936ad5fad8 (index, Premium list) - major, app term
- **EN:** Themes and app icons
- **UK:** Теми і піктограми застосунку
- **Back:** Themes and app pictograms
- **Problem:** The app says «Іконка застосунку» / «Іконки застосунку» (Premium icon picker, paywall line). A Premium
  user looks for that word in Settings.
- **Proposed:** `Теми й іконки застосунку`

### e030ad6544 (index, line by line) - major, app term
- **EN:** Premium: themes (Graphite is included; Midnight, Ocean, Plum and Glacier are Premium) and app icons
- **UK:** Premium: теми (Графіт доступний завжди; Ніч, Океан, Слива і Льодовик входять у Premium) і піктограми застосунку
- **Back:** ... and app pictograms
- **Problem:** Same as above; the app word is «іконки застосунку».
- **Proposed:** `Premium: теми (Графіт доступний завжди; Ніч, Океан, Слива і Льодовик входять у Premium) та іконки застосунку`

### 927428b06f (index, #why eyebrow) - major, meaning
- **EN:** A habit tracker without streaks
- **UK:** Трекер звичок без тиску
- **Back:** A habit tracker without pressure
- **Problem:** Says something else: "without pressure", not "without streaks". The section is about streaks vs
  levels, and the draft says it that way elsewhere: 660abaf4b2 «Застосунки із суворими серіями», 1a45573c44 «замість
  суворих серій». "Трекер звичок" stays for search either way.
- **Proposed:** `Трекер звичок без суворих серій`

## Minor

### f72800165b (index, Read more links) - minor, consistency with the eyebrow
- **UK (part):** `<a href="/guides/habit-tracker-without-streaks.html">трекер звичок без тиску</a>`
- **Back:** a habit tracker without pressure
- **Problem:** Links to the "without streaks" guide; follow the eyebrow fix.
- **Proposed:** `Читай далі: <a href="/guides/habit-tracker-without-streaks.html">трекер звичок без суворих серій</a>, <a href="/guides/one-missed-day.html">чому один пропущений день не руйнує звичку</a>, <a href="/guides/rest-days.html">дні відпочинку</a> і <a href="/guides/sick-and-travel-days.html">дні хвороби й подорожей</a>.`

### 200de3647e (index, share text) - minor, naturalness
- **UK:** Mostly Daily: Пропусти день. Прогрес на місці. Два знімки екрана Сьогодні із застосунку, світлий і темний.
- **Back:** ... Two screenshots today from the app, light and dark.
- **Problem:** Unquoted «Сьогодні» after «знімки екрана» reads as the adverb "today"; «світлий і темний» has no noun.
  Elsewhere the draft quotes screen names.
- **Proposed:** `Mostly Daily: Пропусти день. Прогрес на місці. Два знімки екрана "Сьогодні": у світлій і темній темі.`

### 02a9c1a6ee (index, top nav) - minor, naturalness
- **UK (part):** `<a href="/#why">Чому Здебільшого</a>`
- **Back:** "Why for-the-most-part"
- **Problem:** As a standalone nav item the level word reads as the adverb and the label makes no sense.
- **Proposed:** `<a href="/#why">Чому Mostly Daily</a><a href="/#widgets">Віджети</a><a href="/#private">Приватність</a><a href="/#pricing">Ціни</a><a href="/guides/">Поради</a><a href="/support.html">Підтримка</a>`

### 19a87c6f18 (index, menu nav) - minor, naturalness
- **Problem:** Same as 02a9c1a6ee.
- **Proposed:** `<a href="/#why">Чому Mostly Daily</a><a href="/#widgets">Віджети</a><a href="/#private">Приватність</a><a href="/#pricing">Ціни</a><a href="/#faq">Запитання</a><a href="/guides/">Поради</a><a href="/support.html">Підтримка</a>`

### ba4129ea0a (index, widgets sub) - minor, apple-term
- **UK (part):** ... замкнений екран, режим очікування, Центр керування і Siri.
- **Back:** ... standby mode ...
- **Problem:** Apple's uk name for StandBy is «Очікування» (`Preferences/Localizable:StandBy`). In a list of named
  surfaces it should be the name, like «Центр керування».
- **Proposed:** `Один дотик до кільця, і звичку відмічено; другий дотик скасовує відмітку. Початковий екран, замкнений екран, Очікування, Центр керування і Siri.`

### c33ba5fcb8 (index, Lock Screen and StandBy) - minor, apple-term (StandBy)
- **UK (part):** `<b>Замкнений екран і режим очікування</b>`
- **Problem:** StandBy = «Очікування», as above.
- **Proposed (covers both c33ba5fcb8 findings):** `<b>Замкнений екран і Очікування</b>День над годинником, що далі, і одна звичка, яку можна відмітити без розблокування. Віджети з відтінком і прозорі віджети лишаються розбірливими.`

### c33ba5fcb8 (same segment) - minor, apple-term (Tinted)
- **UK (part):** Тоновані й прозорі віджети лишаються розбірливими.
- **Back:** Toned and transparent widgets stay legible.
- **Problem:** Apple's uk word for the Tinted look is «з відтінком» (`DisplayAndBrightnessSettingsExtension:tinted`);
  «тоновані» is a car-window word. Fix in the proposal above.

### 15c470d321 (index, Free list) - minor, apple-term
- **UK:** Віджети всюди: Початковий екран, замкнений екран, режим очікування, Центр керування, Siri
- **Proposed:** `Віджети всюди: Початковий екран, замкнений екран, Очікування, Центр керування, Siri`

### 10c854931f (index, JSON-LD) - minor, apple-term
- **UK:** Віджети на Початковому екрані, замкненому екрані, в режимі очікування і в Центрі керування, що відмічають одним дотиком
- **Proposed:** `Віджети для Початкового екрана, замкненого екрана, Очікування і Центру керування, що відмічають одним дотиком`

### a656c9711e (index, widget alt) - minor, app term
- **UK (part):** потім Усе зроблено з мозаїкою
- **Problem:** The Next up widget's all-done label in uk is «Готово» (widget catalog `All done`), not «Усе зроблено».
- **Proposed:** `Віджети Далі: Чистити зуби ниткою, потім Читати 10 сторінок, потім Готово з мозаїкою`

### c3747825d7 (index, iPhone Duo) - minor, naturalness
- **UK (part):** Складаєш чи розкладаєш, і твоє місце зберігається.
- **Back:** You fold or unfold, and your place is saved.
- **Problem:** Calque of "keep your place"; «твоє місце зберігається» reads like a reserved seat.
- **Proposed (replace that sentence only):** `Якщо скласти чи розкласти iPhone, застосунок відкриється на тому самому місці.`

### 3eda3bf54a (support, iPhone Duo) - minor, naturalness
- **UK (part):** Коли складаєш чи розкладаєш iPhone, твоє місце зберігається.
- **Problem:** Same calque.
- **Proposed (replace that sentence only):** `Якщо скласти чи розкласти iPhone, застосунок відкриється на тому самому місці.`

### 8a32797c56 (index, private list) - minor, naturalness
- **UK (part):** `<b>Твої назавжди.</b>`
- **Back:** Yours forever.
- **Problem:** On the same page «назавжди» is the Lifetime plan name (28e8110625, ac261683e8), so a bold «назавжди»
  just before pricing reads like a plan promise. "Yours to keep" is about owning your data.
- **Proposed:** `<b>Дані лишаються твоїми.</b>Експорт у CSV будь-коли, на будь-якому плані. Premium ніколи не блокує твої дані.`

### 522e09e8bf (index, Free list) - minor, naturalness
- **UK:** Рівні, без двох пропусків поспіль, відпочинок і перерви
- **Back:** Levels, without two misses in a row, rest and breaks
- **Problem:** In a feature list the label reads as an adverbial phrase, not a feature.
- **Proposed:** `Рівні, правило "Без двох пропусків поспіль", відпочинок і перерви`

### 9ab4e55fab (index, Premium list) - minor, naturalness
- **UK:** Усі минулі підсумки тижня, огляди й огляди ідентичності
- **Back:** All past weekly reflections, reviews and identity reviews
- **Problem:** «огляди й огляди» repeats the word and reads like an error.
- **Proposed:** `Усі минулі підсумки тижня, огляди та щоквартальні огляди ідентичності`

### 766221beb1 (index, Premium list) - minor, naturalness
- **UK (part):** і два часи нагадування на звичку
- **Back:** and two reminder "times" (eras) per habit
- **Problem:** «часи» as the plural of a clock time sounds odd in uk.
- **Proposed:** `Більше віджетів, зокрема дуже великий &quot;Сьогодні і тиждень&quot;, і два нагадування для кожної звички`

### f336acebcd (index, guide rows) - minor, naturalness
- **UK (part):** `<small>Чому календар чистих днів працює краще, ніж лічильник днів відтоді.</small>`
- **Back:** ... than a counter of days since then.
- **Problem:** «відтоді» has no antecedent; the sentence feels cut off.
- **Proposed (that `<small>` only, rest unchanged):** `<small>Чому календар чистих днів працює краще, ніж лічильник днів від останнього разу.</small>`

### 2b21c71c12 (support, challenges) - minor, naturalness
- **UK (part):** Дні відпочинку і перерв ніколи не рахуються проти тебе
- **Back:** Rest and break days are never counted against you
- **Problem:** Calque of "count against you".
- **Proposed (that clause only):** `Дні відпочинку і перерв ніколи не йдуть тобі в мінус`

### 543ef84fcd (index, JSON-LD keywords) - minor, search
- **UK:** трекер звичок, habit tracker, щоденні звички, корисні звички, календар звичок, щоденник звичок, віджет звичок, трекер звичок для iPhone
- **Problem:** Eight real phrases, good. But none covers the Limit side the English lists ("drink tracker, clear days
  calendar"), and «трекер звичок для iPhone» repeats the first phrase. The store keyword field carries «алкоголь».
- **Proposed:** `трекер звичок, habit tracker, щоденні звички, корисні звички, календар звичок, щоденник звичок, віджет звичок, трекер алкоголю`
