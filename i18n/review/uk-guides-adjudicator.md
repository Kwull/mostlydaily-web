# uk adjudicator: Mostly Daily website guides (guides/*.html)

Adjudicator: Fable, 16 Nov 2026, fresh context. Decided the 32 findings in `uk-guides-critic.md` (31 segments;
d3fe75053d has two). Accepted 28, rejected 4. In 9 of the accepted ones the final text differs from the critic's
proposal (noted below). All 357 entries are `reviewed`; `python3 tools/i18n.py check uk` reports 0 problems.
No reviewed entry was changed.

| Id | Decision | Final text (changed part) | Reason |
|---|---|---|---|
| d5ce9953a7 | accept | Під'єднай звичку до Apple Health, і Mostly Daily відмічатиме її в дні, коли ти досягаєш цілі: ... | The entity `&#x27;` would land in the JSON-LD as literal text; a plain apostrophe is safe in the attribute. "Коли день досягне цілі" was a calque. |
| d3fe75053d (entity) | accept | ... дані про здоров'я лишаються на твоєму iPhone. | Same entity problem. |
| d3fe75053d (search) | reject | У Mostly Daily немає облікового запису, сервера й аналітики. ... | "Облікового запису і реєстрації" says one thing twice and adds a word the English does not have. The reviewed pages say "Без облікового запису", and "реєстрація" is not in the keyword rationale of `metadata-uk.md`. |
| 59cbdd5af0 | accept, own text | Напої можна зберігати в Apple Health. Застосунок читає напої, записані іншими застосунками, і зберігає там ті, які записуєш ти. | Notes rule `keep-in-health-zberihaty` and the app's switch "Зберігати напої в Apple Health". The second sentence stays as drafted: "saves" is "зберігає", the critic's "додає туди" was not needed. |
| 6a5d9609db | accept | Якщо ти зберігаєш напої в Apple Health, ... | Same rule. |
| 9382de0459 | accept | &quot;Змикати кільця&quot; (або лише кільце &quot;Рух&quot;), &quot;Виходити на вулицю&quot; ..., &quot;У ліжку до 23:00&quot; ... і &quot;Записувати, як я почуваюся&quot; ... | The app's string is Кільце "Рух". Bare infinitives in a list read as instructions; the other guides quote UI names. |
| 6401f6ea8d | accept | ... читати одну сторінку, взуватися, чистити ниткою один зуб. У складний день ... | Notes rule `imperfective-after-budu` (app: "Читати одну сторінку") and the app's "У складні дні". |
| 1569756f9b | accept, own text | ... мета зміщується із самої звички на захист числа. Люди опівночі роблять усе похапцем, аби лише число не обнулилося, ... Коли сувора серія обривається, ... ці 120 днів не рахувалися. Вони рахувалися, ... | "Серія" alone is the app's forgiving run, so the streak is "сувора серія" as on the reviewed pages. Past tense as in the English. The critic's "лічильник" brought in a second name for the number; "число" is the word the sentence already has. |
| edad9b1640 | accept | ... відмічатиме її в дні, коли ти досягаєш цілі: 8000 кроків, ... | In step with d5ce9953a7. |
| 6a99b30c40 | accept in part | ... як-от біг, йогу чи плавання, ... | Accusative after "вибираєш вид", as in the reviewed support text. "Пасують до цілі" stays: it is standard Ukrainian, and "підходять до" is the weaker choice. |
| 93b214a418 | accept | ... читає дані за останній тиждень ... і відмічає дні, коли ціль досягнуто. | Days do not reach goals in Ukrainian. |
| 6e271beca6 | accept, own text | ... щовечора записуй кількість і дивися на місяць у кольоровому календарі. | The calque "як на кольоровий календар" is gone. "Весь" from the critic's text is not in the English. |
| 3805835023 | accept, own text | Same text as 6e271beca6. | Same. |
| 5335acb957 | accept | Тиждень із трьома чистими днями - це все одно три чисті дні. | "Зараховується як три" left the noun hanging. |
| f57532a7ab | accept | ... і півмісяць для дня відпочинку. | "Місяць" in a calendar guide reads as "month". |
| 948ae017e3 | accept | Ти вибираєш, скільки чистих днів на тиждень хочеш мати, ... | The noun chain was stiff. |
| 7029e1b514 | accept | ... рівень, від Початку до Здебільшого, ... | Genitive after "від"; quotes are not possible in a meta attribute that is also JSON-LD. |
| d576b900f6 | accept, own text | ... і саме цього дня багато хто кидає звичку. | "Кидають" needs an object. "Звичку" says what is dropped; the critic's "все" says more than the English. |
| 13f3db0404 | reject | (draft kept) | "Пара місяців" for a non-pair is colloquial; "кілька місяців" is the usual Ukrainian for "a couple of months". "Як часто ти робиш своє" is the reviewed home page's wording for "how often you show up" (660abaf4b2), so it stays for consistency. |
| cf689f7ec7 | reject | (draft kept) | Same "кілька" ruling. |
| 1d4ec38aea | accept | ... корисно дивитися, якими виходять тижні. Кількість днів без цього говорить менше. Лічильник, який скидається до нуля, ... | The clause as subject and "стрибає назад" read translated. |
| f0663ae9d7 | accept | Записуй увечері, і хай це буде швидко | The draft read as a fragment. |
| 54f0c2829f | accept | Короткі тексти від авторів Mostly Daily про те, як формувати звички, що тримаються довго. | "Від авторів" at the end attached to the habits. |
| 6fa7b06f32 | accept | ... &quot;Який найменший крок я можу зробити сьогодні?&quot; | "Що найменше я можу зробити" is not idiomatic. |
| aa0160e20d | accept | Найменша версія теж зараховується | "Нехай ... зараховується" was a calque. |
| 190dd014e5 | accept | ... що ти зазвичай робиш у цю мить, ... | "Типово" is the word for a software default. |
| b2ea29eaeb | accept, own text | Познач день, коли мало сил або ти в подорожі, чи додай перерву на всю поїздку. ... | Unquoted state names after "як" read as broken grammar, and quotes are not possible here (meta attribute and JSON-LD). The critic's "як день, коли мало сил, або як день подорожі" was heavy; this says the same with the app's words "мало сил" and "Додати перерву". |
| 8db819328d | accept | У Mostly Daily ти позначаєш день як &quot;Мало сил&quot; або &quot;Подорож&quot; чи додаєш перерву на всю поїздку. ... | State names quoted as in the rest of the guide; the app's action is "Додати перерву". |
| d8be74849c | accept | Дні відпочинку, подорожей і дні, коли мало сил, - це справжні дні. ... | A long compound subject before "це" needs the hyphen. |
| 449a0d5582 | accept, own text | ... &quot;Мало сил&quot; - для днів, коли ти хворієш або дуже втомлюєшся, ... | The draft said the same thing twice. The critic's "геть втомлений" is masculine; the site addresses the reader without gender. |
| 0e6cf54535 | accept | Їдеш у відпустку? Додай перерву для всіх звичок одразу ... | The app's action is "Додати перерву". |
| ed56b37f04 | accept | ... &quot;Видалити всі дані&quot; видаляє твої звички, відмітки й перерви ... | "Прибирає" is "tidies away"; the button deletes. |
| 3cfc73e20d (with 524f019e29, eedbc4bea8) | reject | (draft kept) | The reviewed home link 2619303cab has the same title, and reviewed entries do not change in this pass. A guide title that differs from its link on the home page is worse than "зменшити". |

## Not settled
- "Як зменшити напої, цукор чи час перед екраном": "скоротити" would read better and fits all three nouns. It needs
  one change across 3cfc73e20d, 524f019e29, eedbc4bea8 and the reviewed home link 2619303cab. Recommendation: do it
  in the next pass that may touch reviewed entries.
- "Без реєстрації" as a search phrase for the private-tracker guide: not in the uk keyword rationale today. If the
  next ASO review finds demand for it, add it to the meta description then, replacing "облікового запису" in that
  one sentence, not next to it.
- 7029e1b514 declines the level name ("від Початку до Здебільшого"). It reads well, but it is the only place on the
  site where a level name is not in the nominative.
