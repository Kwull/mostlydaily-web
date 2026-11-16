# ru guides: critic (Opus, 16 Nov 2026)

Judged: the 134 entries in `i18n/ru.json` with status "drafted" (guides/*.html), against `i18n/en.json`. Reference: the
reviewed home and support entries, the glossary, `notes/ru.notes.md`, `lookup.py` (app ru strings) and `apple_terms.py`.

Result: 101 ok, 33 flagged (14 major, 19 minor).

Checked and clean across all 134: tags and attributes match the English exactly; no em or en dashes; no curly or angle
quotes; the guide English uses plain `"` in text (no `&quot;`), and the drafts do the same. App words match the app:
widget names (Привычка, Дальше, Сегодня, Сегодня и неделя, Календарь месяца, На этой неделе, Кем ты становишься),
controls (Отметить, Чистый день), Не показывать другим / Личная привычка / личная привычка, Мало сил / Поездка /
Отдых сегодня / Отпуск / Другое / Перерыв, Компания / Расслабление, Экспорт и импорт, Удалить все данные,
Синхронизировать записи через iCloud, Идеи из Apple Health, Закрывать кольца, Выходить на улицу, В постели к 23:00,
Записывать, как я себя чувствую, кольцо "Подвижность", С возвращением, Твой день, "Чистых дней на этой неделе: 3 из 4",
"Завтра новый день.", the Siri phrases (Отметить ${habit} / Отдых сегодня: ${habit}), and the Limit name prefixes
"Меньше" / "Бросить" (both in `QuickAdd+DoLess.swift` for ru). Apple words: Пункт управления, режим ожидания,
Быстрые команды, Изменить, Добавить виджет. Level names, "Без двух пропусков подряд", привычка-ограничение, чистый /
лёгкий / более тяжёлый день, бесплатный план and Premium match the reviewed pages. No medical or recovery claims added.

Overall the guides read as Russian articles, not as translated English; the weak spots are the word "срыв", the
guide title "не вредит", and a few places that say "Здоровье" where the reviewed pages say "Apple Health".

## Major

### 50dff26f05 (habit-tracker-without-streaks, title)
- Back: "A habit tracker without resetting streaks · Mostly Daily"
- Problem: consistency. The page H1 "A habit tracker without streaks" has no guide segment of its own: it shares id
  927428b06f with the reviewed home eyebrow, so the ru H1 renders "Трекер привычек без давления" while this title and the
  index link say "без обнуления серий". Title and H1 of one page should carry the same words, and "без давления" is the
  reviewed and keyword-field phrase. Proposed text joins both. Coordinator note: the extractor should give the guide H1 its
  own id if a different H1 is wanted.
- Proposed: `Трекер привычек без давления и обнуления серий · Mostly Daily`

### e8572022ae (guides index, link to the same guide)
- Back: "A habit tracker without resetting streaks"
- Problem: same as 50dff26f05; the link should match the page's title.
- Proposed: `<a href="/guides/habit-tracker-without-streaks.html">Трекер привычек без давления и обнуления серий</a>`

### 82a9651319 (one-missed-day, title)
- Back: "Why one missed day doesn't harm a habit · Mostly Daily"
- Problem: meaning. The English says it doesn't break the habit; the guide itself says a miss is a small dip, so "не
  вредит" (does no harm) claims more than the English and contradicts the meta description. "не ломает привычку" is the
  plain match and what people type ("пропустил день, привычка сломалась").
- Proposed: `Почему один пропущенный день не ломает привычку · Mostly Daily`

### cabf005747 (one-missed-day, H1)
- Back: "Why one missed day doesn't harm a habit"
- Problem: as 82a9651319.
- Proposed: `Почему один пропущенный день не ломает привычку`

### 49ec981503 (guides index, link)
- Back: "Why one missed day doesn't harm a habit"
- Problem: as 82a9651319.
- Proposed: `<a href="/guides/one-missed-day.html">Почему один пропущенный день не ломает привычку</a>`

### 3b6ffaf33c (habit-tracker-without-streaks, run paragraph)
- Back: "... More about this in the guide why one missed day doesn't harm a habit."
- Problem: the link text repeats the "не вредит" title; keep it in step with 82a9651319.
- Proposed: `Рядом с уровнем стоит серия "Без двух пропусков подряд": дни с тех пор, как у тебя последний раз было два пропуска подряд. При одном пропуске серия продолжается. Два пропуска подряд её завершают, и новая начинается со следующей отметки. Подробнее об этом в гайде <a href="/guides/one-missed-day.html">почему один пропущенный день не ломает привычку</a>.`

### f57532a7ab (cut-back-with-a-calendar, Read the calendar)
- Back: "... Days with nothing logged stay empty and are never counted as a relapse. ..."
- Problem: tone. "срыв" is the usual Russian word for a relapse (the glossary's never-use list) and sounds like losing
  control. The English "slip" is light. "промах" keeps it small.
- Proposed: `Каждый день получает плитку: зелёную для чистого дня, янтарную с одной точкой для лёгкого, коралловую с двумя точками для более тяжёлого и луну для дня отдыха. Дни без записей остаются пустыми и никогда не считаются промахом. Карточка на экране "Сегодня" говорит, как идёт неделя, например "Чистых дней на этой неделе: 3 из 4". Лёгкий день означает только то, что день не был чистым, а после более тяжёлого дня приложение говорит: "Завтра новый день."`

### 993e0898b8 (habits-you-want-less-of, lead)
- Back: "... With a 'days since' counter one relapse looks like losing everything. ..."
- Problem: tone, "срыв" as in f57532a7ab.
- Proposed: `Напитки, сахар, экранное время. Со счётчиком "дней с последнего раза" один промах выглядит так, будто потеряно всё. Календарь чистых дней показывает правду.`

### 1d4ec38aea (habits-you-want-less-of, first paragraph)
- Back: "... How long you have been holding out says less. A counter ... hides everything that was before the relapse ..."
- Problem: tone. "срыва" as above, and "сколько ты уже держишься" (how long you have been holding out) is the language of
  abstinence and willpower; the English only says how long you have gone without it.
- Proposed: `Когда хочешь чего-то меньше, полезнее всего смотреть, как выглядят недели. Сколько дней прошло без этого, говорит меньше. Счётчик, который прыгает обратно к нулю, прячет всё, что было до промаха: чистые вечера, лёгкие дни, удачные недели.`

### c8fbe64cd3 (habits-you-want-less-of, H2)
- Back: "A relapse is information"
- Problem: tone, "срыв" as in f57532a7ab; as a heading it is the most visible one.
- Proposed: `Промах - это информация`

### e168af1557 (apple-health-habits, data stays on the iPhone)
- Back: "... each device fills them in from its own Zdorovye (Health). ..."
- Problem: consistency. The reviewed support answer says the same thing with "из своего Apple Health"; the site names the
  source "Apple Health" everywhere, and "из своего Здоровья" also reads as "from its own health".
- Proposed: `Доступ необязателен и запрашивается для каждой привычки отдельно. Отметки из Apple Health остаются на iPhone и никогда не попадают в iCloud, а каждое устройство заполняет их из своего Apple Health. Apple Health работает и в бесплатном плане. О напитках читай в гайде <a href="/guides/cut-back-with-a-calendar.html">как сократить напитки, сахар или экранное время</a>.`

### 2a1aaafe4b (private-habit-tracker, where each thing is kept)
- Back: "... and each device reads its own Zdorovye (Health). ..."
- Problem: consistency, as e168af1557; the reviewed support paragraph this mirrors says Apple Health.
- Proposed: `Привычки, отметки, которые ты ставишь вручную, и перерывы синхронизируются через твой личный iCloud, поэтому на новом iPhone они появятся снова. Разработчик не может их прочитать. Отметки из Apple Health остаются на iPhone, и каждое устройство читает свой Apple Health. Записи напитков остаются в Apple Health или на iPhone и никогда не попадают в iCloud. Записи других привычек-ограничений тоже остаются на iPhone, пока ты не включишь "Синхронизировать записи через iCloud" для этой привычки. Причина перерыва и список "Твой день" никогда не покидают устройство.`

### 1dddcabedf (private-habit-tracker, privacy label)
- Back: "... In the App Store, on the privacy label of Mostly Daily it says 'Data collection is not conducted'."
- Problem: Apple term. The App Store in Russian shows the section "Конфиденциальность приложения" with "Данные не
  собираются"; "этикетка конфиденциальности" and "Сбор данных не ведётся" are not Apple's words, so a reader can't find
  them on the store page. (apple_terms.py has no App Store strings; confirm once on the ru storefront page.)
- Proposed: `Трекер привычек знает о тебе многое, например когда ты спишь и как часто пьёшь. Это хорошая причина не держать его данные на сервере компании. В App Store в разделе "Конфиденциальность приложения" у Mostly Daily написано "Данные не собираются".`

### 449a0d5582 (sick-and-travel-days, one day)
- Back: "... The day is skipped/missed: it doesn't count for the habit or against it. ..."
- Problem: meaning. "День пропускается" uses the same root as "пропуск" (a miss), right after the page says these days
  are not misses. Say the day is not counted.
- Proposed: `Коснись привычки на экране "Сегодня" и удерживай, затем выбери "Отдых сегодня", "Мало сил" или "Поездка". Такой день не учитывается: он не идёт привычке ни в плюс, ни в минус. "Мало сил" подходит для дней, когда ты болеешь или совсем без сил, и пользоваться им можно так часто, как нужно.`

## Minor

### d5ce9953a7 (apple-health-habits, meta description)
- Back: "... will check it off itself when the day gets to your goal ..."
- Problem: "когда день дойдёт до твоей цели" is a calque of "the day reaches your goal".
- Proposed: `Свяжи привычку с Apple Health, и трекер привычек Mostly Daily отметит её сам, когда цель на день будет выполнена: шаги, тренировки, сон, вода и не только.`

### edad9b1640 (apple-health-habits, lead)
- Back: "... when the day gets to your goal: 8000 steps ..."
- Problem: same calque as d5ce9953a7.
- Proposed: `Свяжи привычку с Apple Health, и Mostly Daily отметит её сам, когда цель на день будет выполнена: 8000 шагов, 30 минут упражнений, пробежка, 7 часов сна, 2 литра воды.`

### 93b214a418 (apple-health-habits, how the check-in happens)
- Back: "... when new data appears in Zdorovye ... checks off the days that got to the goal ..."
- Problem: "в Здоровье" next to "Apple Health" everywhere else (see e168af1557), and "дни, которые дошли до цели" is the same
  calque.
- Proposed: `Когда ты открываешь приложение, а также в фоне, когда в Apple Health появляются новые данные, Mostly Daily читает последнюю неделю по каждой связанной привычке и отмечает дни, в которые цель достигнута. Если цель в количестве или минутах выполнена частично, день всё равно считается сделанным. То, что ты записываешь вручную, важнее: день отдыха, который ты ставишь, остаётся днём отдыха.`

### 53c9dbba22 (apple-health-habits, H2)
- Back: "Data of Zdorovye stays on the iPhone"
- Problem: "Данные Здоровья" reads as "data of Health" with an odd capital; the site says Apple Health.
- Proposed: `Данные Apple Health остаются на iPhone`

### 5335acb957 (cut-back-with-a-calendar, clear day)
- Back: "A clear day is a day without a single time. Four such days a week already a real change ... A week with three clear days still counts as three."
- Problem: "день без единого раза" is unclear (a single time of what?); the second sentence needs the dash of a Russian
  "X - это Y" sentence; "засчитывается как три" is a calque.
- Proposed: `Чистый день - это день, когда счёт равен нулю. Четыре таких дня в неделю - уже настоящая перемена, и за месяц её видно в календаре. Неделя с тремя чистыми днями всё равно даёт три.`

### d02827c086 (cut-back-with-a-calendar, log it once)
- Back: "... You can add one reason to the day ..."
- Problem: grammar: "к дню" is written "ко дню".
- Proposed: `Когда день почти закончился, одно касание квадратной кнопки записывает чистый день, или ты вводишь количество. Виджет "Привычка" и элемент управления "Чистый день" в Пункте управления делают то же самое без открытия приложения. Ко дню можно добавить одну причину, например Компания или Расслабление, и привычка покажет счёт по каждой причине. Она описывает, что было, и не даёт советов.`

### 6715b8f0fb (habit-tracker-without-streaks, H2)
- Back: "Why day streaks get in the way"
- Problem: "мешают" is weaker than "backfire" (they work against what you want).
- Proposed: `Почему серии дней подряд работают против тебя`

### 0a551b7ada (guides index, description)
- Back: "Why day streaks get in the way, and what to count instead."
- Problem: keep in step with 6715b8f0fb.
- Proposed: `Почему серии дней подряд работают против тебя и что считать вместо них.`

### 046e668b21 (habits-you-want-less-of, a slip is information)
- Back: "... Where were you (masc.) and with whom? ..."
- Problem: "Где ты был" is masculine; the app avoids gendered past tense (ru notes).
- Proposed: `Более тяжёлый день не отменяет чистые дни вокруг него. Посмотри на календарь: что было иначе? Где это было и с кем? По этой закономерности легче выбрать следующую небольшую перемену.`

### 78a751eec5 (sick-and-travel-days, two states)
- Back: "... and two weeks at the sea like you (masc.) gave up everything."
- Problem: "ты всё бросил" is masculine (ru notes); also the comparison needs a dash where the verb is left out.
- Proposed: `Большинство трекеров привычек знают два состояния: сделано и не сделано. Тогда неделя с гриппом выглядит как семь провалов, а две недели на море - как будто привычка заброшена. Нужен способ сказать приложению, что этот день не в счёт.`

### ed56b37f04 (private-habit-tracker, take it with you)
- Back: "Settings, 'Export and import' creates CSV files ..."
- Problem: "Настройки, "Экспорт и импорт" создаёт" is not a Russian sentence; the reviewed pages write the path as
  "в меню Настройки &gt; ...".
- Proposed: `В меню Настройки &gt; "Экспорт и импорт" можно в любом плане сохранить привычки, отметки и перерывы в файлы CSV. Premium никогда не блокирует твои данные, а "Удалить все данные" удаляет привычки, отметки и перерывы с iPhone и из iCloud. Все подробности есть в <a href="/privacy.html">политике конфиденциальности</a>.`

### c335d25e08 (sick-and-travel-days, time off)
- Back: "If you need more than a day or two, open Settings, 'Time off'. ..."
- Problem: same path style as ed56b37f04.
- Proposed: `Если нужно больше одного-двух дней, открой Настройки &gt; "Перерыв". Выбери даты, причину (Отпуск, Поездка, Мало сил или Другое) и все привычки или только некоторые. Напоминания замолкают, эти дни никогда не считаются пропуском и не тратят твои дни отдыха. Причина остаётся на твоём iPhone.`

### 767f01488d (rest-days, first paragraph)
- Back: "... Illnesses, trips, a busy week at work and public holidays happen every year ..."
- Problem: "holidays" here is time away (the guide titles say "отпуск"); "праздники" means public holidays.
- Proposed: `Привычка, которая работает, только когда всё идёт хорошо, не проживёт и года. Болезни, поездки, загруженная неделя на работе и отпуска бывают каждый год, и план, который считает их провалами, учит сдаваться.`

### 4b755ef33c (guides index, cut-back description)
- Back: "Count clear days in the week in a colour calendar."
- Problem: "в неделе в" stacks two prepositions; "за неделю" reads better.
- Proposed: `Считай чистые дни за неделю в цветном календаре.`

### 6fa7b06f32 (one-missed-day, the day after)
- Back: "... the question is: 'What the smallest I can do today?'"
- Problem: "Что самое маленькое я могу сделать" is clumsy.
- Proposed: `Поэтому серия в Mostly Daily называется "Без двух пропусков подряд". При одном пропуске серия продолжается. Два пропуска подряд мягко её завершают, и новая начинается со следующей отметки. После пропущенного дня вопрос такой: "Какой самый маленький шаг я могу сделать сегодня?"`

### 190dd014e5 (one-missed-day, first paragraph)
- Back: "Habits form from repetition, over weeks and months. ..."
- Problem: the comma split reads like translated English.
- Proposed: `Привычки складываются из повторений за недели и месяцы. Один пробел в этом повторении почти ничего не меняет: привычка остаётся тем, что ты по умолчанию делаешь в этот момент, в этом месте, после этого сигнала. Всё меняется, когда один пропуск превращается в два, потом в три, и сигнал перестаёт вести к действию.`

### 54f0c2829f (guides index, meta description)
- Back: "Short texts about how to build habits that stay for a long time, from the makers of the habit tracker Mostly Daily."
- Problem: "тексты" is flat; Russian readers and search say "статьи". Shorter too.
- Proposed: `Короткие статьи о том, как формировать привычки надолго, от создателей трекера привычек Mostly Daily.`

### 76b717a632 (guides index, lead)
- Back: "Short texts about how to build habits that stay for a long time."
- Problem: as 54f0c2829f.
- Proposed: `Короткие статьи о том, как формировать привычки надолго.`

### e11835ca92 (habits-you-want-less-of, title)
- Back: "Habits you want less of · Mostly Daily"
- Problem: search. The title has no word a Russian searcher types; the page is about the calendar of clear days, which the
  meta description already names. Adding it is not new content.
- Proposed: `Привычки, которых хочешь меньше: календарь чистых дней · Mostly Daily`

## Search (titles and descriptions)
Good as drafted: "трекер привычек" in the private, sick-days and streaks titles and in two meta descriptions; "виджеты
привычек на iPhone"; "Apple Health"; "алкоголь" in the cut-back title (in the keyword field, and drinks on this page are
alcohol). The meta descriptions are natural and not stuffed. Only the two titles above (streaks, habits you want less of)
and the "не вредит" title needed a change.
