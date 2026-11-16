# uk critic: Mostly Daily website guides (guides/*.html)

Critic: Opus, 16 Nov 2026, fresh context. Judged the 134 segments of `i18n/uk.json` with status "drafted" against
`i18n/en.json`, the reviewed home and support segments, the glossary, `docs/localization/notes/uk.notes.md`, the app's
uk strings (`tools/l10n/lookup.py`), Apple's uk terms (`tools/l10n/apple_terms.py`) and the keyword rationale in
`docs/appstore/metadata-uk.md`. No in-place sheet.

**Counts: 32 findings, 7 major, 25 minor.** The other 105 segments are fine as drafted.

## Checks that passed
- Tags and attributes: every segment has the same tag multiset as the English; hrefs unchanged.
- No em or en dashes, no typographic quotes; quotes inside HTML segments are `&quot;`.
- Consistent with the reviewed pages: Трекер звичок без суворих серій, рівні постійності, Без двох пропусків поспіль,
  звичка-обмеження, чисті / легкі / важчі дні, дні відпочинку, мало сил, перерва, безкоштовний план, Premium, режим
  Очікування, Початковий екран, замкнений екран, Центр керування, віджети з відтінком і прозорі, Поради, the guide link
  titles (Чому один пропущений день не руйнує звичку, Дні відпочинку - частина плану, Як зменшити напої, цукор чи час
  перед екраном, Віджети звичок на iPhone, Де що зберігається), the self-tracking disclaimer.
- App words match: Менше, Відмітити, Чистий день, Відпочити сьогодні, Мало сил, Подорож, Відпустка, Інше, Далі,
  Сьогодні і тиждень, Календар місяця, Цей тиждень, Ким ти стаєш, Не показувати іншим, Приватна звичка, Синхронізувати
  записи через iCloud, Експорт та імпорт, Видалити всі дані, Ідеї з Apple Health, Змикати кільця, Виходити на вулицю,
  У ліжку до 23:00, Записувати, як я почуваюся, Компанія, Розслаблення, смаколики, Чистих днів цього тижня: 3 з 4,
  З поверненням, Siri phrases (Відміть ${habit} у ..., Відпочинок сьогодні: ${habit} у ...), do-less words Менше / Кинути.
- Apple terms: хвилини вправ, хвилини усвідомленості, години стояння, час надворі вдень, настрій, Швидкі команди,
  Додати віджет.
- No medical or recovery claims, no book titles. Titles keep " · Mostly Daily". Titles and H1s carry the uk search
  words where the English has them (трекер звичок, віджети звичок, звички, дні відпочинку, Apple Health).

## Major

### d5ce9953a7 (apple-health-habits, meta description, also the JSON-LD description)
- Back: "Connect a habit to Apple Health, and Mostly Daily will check it off when the day reaches your goal: steps,
  workouts, sleep, water and more."
- Problem: the apostrophe is written as the entity `&#x27;`. The build (`tools/i18n.py`) uses the same segment id for
  the JSON-LD "description", which is plain text, so search engines get a literal "Під&#x27;єднай". Use a plain `'`
  (safe inside content="..."). Also "коли день досягне твоєї цілі" is a calque ("when the day reaches your goal").
- Proposed: `Під'єднай звичку до Apple Health, і Mostly Daily відмічатиме її в дні, коли ти досягаєш цілі: кроки, тренування, сон, вода та інше.`

### d3fe75053d (private-habit-tracker, meta description, also the JSON-LD description)
- Back: "Mostly Daily has no account, server or analytics. Habits sync through your own iCloud; health data stays on
  your iPhone."
- Problem: `здоров&#x27;я` goes into the JSON-LD as a literal entity, same as above.
- Proposed: `У Mostly Daily немає облікового запису, сервера й аналітики. Звички синхронізуються через твій власний iCloud; дані про здоров'я лишаються на твоєму iPhone.`

### 59cbdd5af0 (cut-back-with-a-calendar, "Drinks and Apple Health")
- Back: "Drinks can be kept (as a ledger) in Apple Health. The app reads drinks logged by other apps and saves there
  the ones you log..."
- Problem: uk notes rule `keep-in-health-zberihaty`: keeping drinks in Apple Health is "зберігати", never "вести";
  the app's switch is "Зберігати напої в Apple Health".
- Proposed: `Напої можна зберігати в Apple Health. Застосунок читає напої, записані іншими застосунками, а ті, які записуєш ти, додає туди. Записи напоїв лишаються в Apple Health і на твоєму iPhone, ніколи не в iCloud. Більше читай у пораді <a href="/guides/habits-you-want-less-of.html">звички, яких хочеш менше</a>.`

### 6a5d9609db (habits-you-want-less-of, "Your data stays yours")
- Back: "If you keep a ledger of drinks in Apple Health, they stay in Apple Health and on your phone..."
- Problem: same rule, "ведеш" for drinks in Apple Health.
- Proposed: `Якщо ти зберігаєш напої в Apple Health, вони лишаються в Apple Health і на твоєму телефоні, ніколи не в iCloud. Mostly Daily призначений для самостійного відстеження. Він не дає медичних порад і не є лікуванням чи програмою одужання. Якщо тебе турбує здоров'я або вживання алкоголю, поговори з фахівцем.`

### 9382de0459 (apple-health-habits, "What a habit can follow")
- Back: "Four more sources check off wellbeing habits: Close rings (or just the ring of Movement), Go outside (time
  outdoors in daylight), In bed by 23:00 (from sleep data) and Write down how I feel (a mood entry)..."
- Problem: the Move ring is Apple's and the app's кільце "Рух" (the app string is Кільце "Рух"), not "кільце Руху".
  The four template names are infinitives standing bare in a list ("Змикати кільця (або ...), Виходити на вулицю"),
  which reads as instructions; quote them as the other guides quote UI names.
- Proposed: `Ще чотири джерела відмічають звички для самопочуття: &quot;Змикати кільця&quot; (або лише кільце &quot;Рух&quot;), &quot;Виходити на вулицю&quot; (час надворі вдень), &quot;У ліжку до 23:00&quot; (за даними сну) і &quot;Записувати, як я почуваюся&quot; (запис настрою). Застосунок бачить лише те, чи день зараховано. Він ніколи не показує калорії, значення кілець чи те, який настрій записано.`

### 6401f6ea8d (one-missed-day, "Make the smallest version count")
- Back: "Every habit can have a two-minute version: to read (once, finished) one page, to put shoes on, to floss one
  tooth. On a heavy day it counts fully. It keeps the link between cue and action."
- Problem: two-minute versions are imperfective in the app and by the uk back-review rule `imperfective-after-budu`
  ("Читати одну сторінку", "Чистити ниткою один зуб"); the draft uses perfective. "Hard days" is "складні дні" in the
  app (notes u469); "важкий день" leans toward the "heavier day" word of Limit habits.
- Proposed: `Кожна звичка може мати двохвилинну версію: читати одну сторінку, взуватися, чистити ниткою один зуб. У складний день вона зараховується повністю. Вона тримає зв'язок між сигналом і дією.`

### 1569756f9b (habit-tracker-without-streaks, "Why streaks backfire")
- Back: "...People do a hasty version at midnight just so the run lives... When the run breaks, the drop from 120 to 0
  says these 120 days don't count. They count..."
- Problem: the streak is called plain "серія" here, which is the app's word for the forgiving run. Two paragraphs later
  the guide says "Поруч із рівнем є серія", so the reader can't tell the bad streak from the run. The guide and the
  reviewed pages call the streak "сувора серія"; keep it so (or say "лічильник"). Tense also: "didn't count. They
  did" is past.
- Proposed: `За кілька тижнів мета зміщується з самої звички на захист числа. Люди похапцем роблять щось опівночі, аби лише не обнулити лічильник, або відмічають те, чого не робили. Коли сувора серія обривається, падіння зі 120 до 0 каже, що ці 120 днів не рахувалися. Вони рахувалися, і звичка здебільшого лишається на місці.`

## Minor

### edad9b1640 (apple-health-habits, lead)
- Back: "...will check it off when the day reaches your goal: 8000 steps..."
- Problem: same calque as d5ce9953a7; keep the two in step.
- Proposed: `Під'єднай звичку до Apple Health, і Mostly Daily відмічатиме її в дні, коли ти досягаєш цілі: 8000 кроків, 30 хвилин вправ, пробіжка, 7 годин сну, 2 літри води.`

### 6a99b30c40 (apple-health-habits)
- Back: "...For workouts you choose the type, such as running, yoga or swimming... sources that suit (colloquial) the goal..."
- Problem: "як-от біг, йога чи плавання" stands in apposition to the accusative "вид", so it needs "йогу" (the reviewed
  support text has "біг, йогу чи плавання"). "пасують" is slangy for a guide; "підходять".
- Proposed: `Звичка, яку формуєш, може стежити за кроками, хвилинами вправ, хвилинами усвідомленості, тренуваннями, відстанню ходьби й бігу, їздою на велосипеді, плаванням, годинами сну, годинами стояння або водою. Для тренувань ти вибираєш вид, як-от біг, йогу чи плавання, або будь-яке тренування. Застосунок показує лише джерела, які підходять до цілі: звичка у хвилинах може стежити за вправами або тренуванням, а звичка у кроках - за кроками.`

### 93b214a418 (apple-health-habits, "How the check-in happens")
- Back: "...reads the last week for each habit and checks off the days that reached the goal..."
- Problem: "читає останній тиждень" and "дні, які досягли цілі" are calques; days don't reach goals in uk.
- Proposed: `Коли ти відкриваєш застосунок, а також у фоновому режимі, коли в Apple Health з'являються нові дані, Mostly Daily читає дані за останній тиждень для кожної під'єднаної звички і відмічає дні, коли ціль досягнуто. Частина цілі за кількістю чи часом теж зараховується як зроблене. Усе, що ти записуєш вручну, має перевагу: день відпочинку, який ти ставиш, лишається днем відпочинку.`

### 6e271beca6 (cut-back-with-a-calendar, meta description, also JSON-LD)
- Back: "...and look at the month as at a colour calendar."
- Problem: "дивися на місяць як на кольоровий календар" is a word-for-word calque.
- Proposed: `Рахуй чисті дні. Постав ціль, наприклад 4 чисті дні на тиждень, щовечора записуй кількість і дивись на весь місяць у кольоровому календарі.`

### 3805835023 (cut-back-with-a-calendar, lead)
- Back and problem: as 6e271beca6.
- Proposed: `Рахуй чисті дні. Постав ціль, наприклад 4 чисті дні на тиждень, щовечора записуй кількість і дивись на весь місяць у кольоровому календарі.`

### 5335acb957 (cut-back-with-a-calendar)
- Back: "...A week with three clear days is still counted as three."
- Problem: "зараховується як три" leaves "three what" hanging.
- Proposed: `Чистий день - це день, коли не було нічого. Чотири такі дні на тиждень - це справжня зміна, і за місяць її видно в календарі. Тиждень із трьома чистими днями - це все одно три чисті дні.`

### f57532a7ab (cut-back-with-a-calendar, "Read the calendar")
- Back: "...coral with two dots for a heavier one, and a month (or moon) for a rest day."
- Problem: "місяць" means both moon and month; in a calendar guide it reads "a month for a rest day". "півмісяць" is
  unambiguous.
- Proposed: `Кожен день отримує плитку: зелену для чистого дня, бурштинову з однією крапкою для легкого, коралову з двома крапками для важчого і півмісяць для дня відпочинку. Дні без записів лишаються порожніми й ніколи не вважаються збоєм. Картка на екрані &quot;Сьогодні&quot; показує, як іде тиждень, наприклад &quot;Чистих днів цього тижня: 3 з 4&quot;. Легкий день означає лише те, що день не був чистим, а після важчого дня застосунок каже: &quot;Завтра - новий день.&quot;`

### 948ae017e3 (habits-you-want-less-of, "A picture of the month")
- Back: "...You choose a goal of clear days a week..."
- Problem: "ціль чистих днів на тиждень" is a stiff noun chain.
- Proposed: `У Mostly Daily звичка-обмеження має кольоровий календар. Чистий день зелений. Легкий день бурштиновий, важчий день кораловий, і кожен має маленьку позначку, тож календар можна читати, не покладаючись на колір. Ти вибираєш, скільки чистих днів на тиждень хочеш мати, а календар показує, як іде місяць. Тут немає червоного і немає оцінок: важчі дні - частина картини.`

### 7029e1b514 (habit-tracker-without-streaks, meta description, also JSON-LD)
- Back: "...Each habit has a level, from Starting(nom.) to Mostly..."
- Problem: "від Початок" is ungrammatical (after "від" the genitive is needed). Quotes can't be used: this text is in a
  meta attribute and in JSON-LD.
- Proposed: `У Mostly Daily немає лічильника суворих серій. Кожна звичка має рівень, від Початку до Здебільшого, і один пропущений день ніколи нічого не обнуляє.`

### d576b900f6 (habit-tracker-without-streaks, intro)
- Back: "...and many people quit on exactly that day."
- Problem: "кидають" needs an object in uk; bare it sounds unfinished (or like quitting smoking).
- Proposed: `Сувора серія рахує дні поспіль, тож один пропущений день повертає її до нуля. Такий день зазвичай приходить тоді, коли життя і так нелегке: застуда або дитина, яка не спала всю ніч. Наступного ранку застосунок каже, що ти починаєш спочатку, і саме цього дня багато хто все кидає.`

### 13f3db0404 (habit-tracker-without-streaks)
- Back: "...how often you do your thing over the last several months..."
- Problem: "кілька місяців" means several, the English says a couple; "робиш своє" is a loose idiom for "showed up".
- Proposed: `Кожна звичка має рівень постійності, який залежить від того, як часто ти виконуєш її за останні пару місяців: Початок, Іноді, Часто і Здебільшого. Здебільшого - найвищий рівень, і 100% не потрібні ніколи. Пропуск після доброго місяця коштує кілька пунктів, і вони повертаються так само швидко, як зникли.`

### cf689f7ec7 (one-missed-day, "Consistency counts")
- Back: "Each habit has a level that depends on the last several months..."
- Problem: same "кілька" for "a couple".
- Proposed: `Рівень кожної звички рахується за останні пару місяців. Пропуск після доброго місяця коштує кілька пунктів; ти й далі на рівні Здебільшого. Рівень повертається так само швидко, як знизився. 100% не потрібні ніколи.`

### 1d4ec38aea (habits-you-want-less-of)
- Back: "...How much time passed without it says less. A counter that jumps back to zero..."
- Problem: the second sentence has a clause as subject and reads translated; "стрибає назад до нуля" is a calque.
- Proposed: `Коли хочеш чогось менше, корисно дивитися, якими виходять тижні. Кількість днів без цього говорить менше. Лічильник, який скидається до нуля, ховає все, що було до збою: чисті вечори, легкі дні, тижні, які пройшли добре.`

### f0663ae9d7 (habits-you-want-less-of, H2)
- Back: "Log in the evening, and quickly"
- Problem: the comma before "і" and the dangling adverb read like a fragment.
- Proposed: `Записуй увечері, і хай це буде швидко`

### 54f0c2829f (guides/index, meta description)
- Back: "Short texts about how to build habits that last long, from the authors of Mostly Daily."
- Problem: "від авторів" at the end attaches to "звички", not to the texts.
- Proposed: `Короткі тексти від авторів Mostly Daily про те, як формувати звички, що тримаються довго.`

### 6fa7b06f32 (one-missed-day)
- Back: "...the question is: 'What smallest can I do today?'"
- Problem: "Що найменше я можу зробити" is not idiomatic.
- Proposed: `Тому серія в Mostly Daily називається &quot;Без двох пропусків поспіль&quot;. Один пропуск серію не зупиняє. Два пропуски поспіль м'яко завершують її, а нова починається з наступної відмітки. Після пропущеного дня питання таке: &quot;Який найменший крок я можу зробити сьогодні?&quot;`

### aa0160e20d (one-missed-day, H2)
- Back: "Let the smallest version be counted"
- Problem: "Нехай ... зараховується" is a calque of "make X count".
- Proposed: `Найменша версія теж зараховується`

### 190dd014e5 (one-missed-day)
- Back: "...what you do by default (as a setting) at that moment..."
- Problem: "типово" is the software word for a default setting; for behaviour it is "зазвичай".
- Proposed: `Звички формуються з повторення протягом тижнів і місяців. Одна прогалина в цьому повторенні майже не змінює картину: звичка й далі лишається тим, що ти зазвичай робиш у цю мить, у цьому місці, після цього сигналу. Картина змінюється, коли один пропуск стає двома, потім трьома, і сигнал перестає вести до дії.`

### b2ea29eaeb (sick-and-travel-days, meta description, also JSON-LD)
- Back: "Mark the day as Little strength or Travel or set a break for the whole trip..."
- Problem: unquoted state names after "як" read as broken grammar; "або ... чи" mixed. Quotes can't be used here (meta
  attribute and JSON-LD), so name the states in words. The app's button is "Додати перерву".
- Proposed: `Познач день як день, коли мало сил, або як день подорожі, чи додай перерву на всю поїздку. Такі дні не вважаються пропусками і не знижують твій рівень.`

### 8db819328d (sick-and-travel-days, lead)
- Back: as b2ea29eaeb.
- Problem: same; in HTML the state names can be quoted like the rest of the guide.
- Proposed: `У Mostly Daily ти позначаєш день як &quot;Мало сил&quot; або &quot;Подорож&quot; чи додаєш перерву на всю поїздку. Такі дні не вважаються пропусками і не знижують твій рівень.`

### d8be74849c (rest-days, meta description, also JSON-LD)
- Back: "Rest days, travel days and days with little strength, these are real days..."
- Problem: a long compound subject before "це" needs a dash in uk; the owner rule makes it a spaced hyphen.
- Proposed: `Дні відпочинку, подорожей і дні, коли мало сил, - це справжні дні. Запланований відпочинок тримає звички роками.`

### 449a0d5582 (sick-and-travel-days)
- Back: "...'Little strength' is meant for days when you are ill or have no strength..."
- Problem: "Мало сил ... не маєш сил" says the same thing twice; "призначено" is bureaucratic.
- Proposed: `Торкнися й утримуй звичку на екрані &quot;Сьогодні&quot; і вибери &quot;Відпочити сьогодні&quot;, &quot;Мало сил&quot; або &quot;Подорож&quot;. День не береться до уваги: він не рахується ні на користь звички, ні проти неї. &quot;Мало сил&quot; - для днів, коли ти хворієш або геть втомлений, і користуватися ним можна так часто, як потрібно.`

### 0e6cf54535 (rest-days, "Plan time off")
- Back: "Going on vacation? Put a break for all habits at once..."
- Problem: the app's action is "Додати перерву"; "Постав перерву" is off.
- Proposed: `Їдеш у відпустку? Додай перерву для всіх звичок одразу або лише для вибраних і вкажи причину: Відпустка, Мало сил або Інше. Нагадування замовкають, ніщо не вважається пропущеним, а після повернення на тебе чекає коротке привітання. Списку того, що не зроблено, немає.`

### ed56b37f04 (private-habit-tracker, "Take it with you")
- Back: "...'Delete all data' tidies away your habits..."
- Problem: "прибирає" is "tidies away"; the app's confirmation says "видалить".
- Proposed: `Розділ &quot;Експорт та імпорт&quot; у Налаштуваннях створює файли CSV із твоїми звичками, відмітками й перервами на будь-якому плані. Premium ніколи не блокує твої дані, а &quot;Видалити всі дані&quot; видаляє твої звички, відмітки й перерви з iPhone та з iCloud. Усі подробиці є в <a href="/privacy.html">політиці конфіденційності</a>.`

### d3fe75053d (private-habit-tracker, meta description: search)
- Back: as above.
- Problem: uk speakers search for apps "без реєстрації" far more than "без облікового запису"; the meta description
  can carry it once without changing meaning (no account means no sign-up). Title and H1 stay as drafted, matching
  the reviewed "Без облікового запису". Apply together with the major fix above.
- Proposed: `У Mostly Daily немає облікового запису і реєстрації, сервера й аналітики. Звички синхронізуються через твій власний iCloud; дані про здоров'я лишаються на твоєму iPhone.`

### 3cfc73e20d (cut-back-with-a-calendar, title; also 524f019e29 H1 and eedbc4bea8 index link)
- Back: "How to reduce drinks, sugar or time in front of the screen"
- Problem: "зменшити напої" reads like making drinks smaller and is weak for search ("скоротити" fits all three
  nouns). The reviewed home link 2619303cab uses the same words, so change only if that link changes with it;
  otherwise keep the drafted text. Adjudicator's call.
- Proposed (only together with 2619303cab): `Як скоротити напої, цукор чи час перед екраном · Mostly Daily`
