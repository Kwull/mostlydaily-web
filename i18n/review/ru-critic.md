# ru critic review (website)

Critic: Opus, fresh context, 16 Nov 2026. Inputs: i18n/en.json, i18n/ru.json (223 segments, all drafted), glossary (term table, Run, Limit log reasons), docs/localization/notes/ru.notes.md, docs/appstore/metadata-ru.md.

Mechanical checks, all clean: tag multiset per segment (alt/aria-label values aside), {placeholders}, HTML entities, plural keys (sim.misses and sim.days have one/few/many/other and agree for 1, 2, 5), no em/en dashes, no curly or angle quotes.

App terms checked against the ru catalog and apple_terms: level names (Начало, Иногда, Часто, В основном), Сегодня/Итоги/Настройки, Привычки, Дальше, Готово, На этой неделе, Календарь месяца, Сегодня и неделя, Кем ты становишься, Меньше/Больше, Хочешь что-то сократить?, Поставить привычку на паузу…, На паузе, Настрой своё пространство, Компания/Расслабление, Записать, Отметить, Чистый день, Отметить всё, Закрыть вчерашний день, День заканчивается в, О приложении, Как работает Mostly, Экспорт и импорт, Удалить все данные, Другие планы, Ежемесячно/Навсегда, Использовать Apple Health, Синхронизировать записи через iCloud, Идеи из Apple Health, Не сейчас, Закрывать кольца, Выходить на улицу, Записывать, как я себя чувствую, кольцо "Подвижность", Часы с разминкой, workout types (Велосипед, Силовая тренировка, ВИИТ, Пеший туризм), demo habits (Читать 10 страниц, Чистить зубы нитью) and identities, Оставить/Изменить/Отпустить; Apple: экран "Домой", экран блокировки, режим ожидания, Пункт управления, Изменить виджет, Добавить виджет, Настроить, Семейный доступ, Здоровье > Доступ > Приложения. The do-less name words in the copy (меньше, реже, без, бросить) match QuickAdd+DoLess.swift. The "Today's reminder goes" line (185) was checked against reminders-and-notifications "Reminders after Apple Health completes a day": "снимается" is right.

Search: home title and og:title start with "Mostly Daily: Мягкие привычки" and carry the subtitle phrase; the meta description opens with "Трекер привычек для iPhone"; eyebrows carry "Трекер привычек для iPhone", "Трекер привычек без давления", "Виджеты привычек для iPhone", "Бесплатный трекер привычек"; JSON-LD keywords have 8 real ru phrases. Reads like native Russian product copy overall; the main native-reader snag is the level word "В основном" used bare as a sentence subject, where it reads as the adverb "mostly" (the app quotes it there: «В основном» — высший уровень). Outside the segments: the JSON-LD "name" stays "Mostly Daily: Habit Calendar" in the template; for ru it should be the store name "Mostly Daily: Мягкие привычки" (build script, not a translation).

Counts: 19 findings, 5 major, 14 minor.

## e030ad6544 (major)
- Back: "Premium: themes (Graphite is in the free plan; Midnight, Ocean, Plum and Glacier are in Premium) and app icons"
- Problem: wrong app term. The ru app translates the theme names (Графит, Полночь, Океан, Слива, Ледник); a reader will not find "Graphite" in the app. The task's keep-untranslated list says theme names, but the rule "the app's own words win" applies, and the es review followed the app the same way. Adjudicator to confirm.
- Proposed: "Premium: темы (Графит входит в бесплатный план; Полночь, Океан, Слива и Ледник входят в Premium) и значки приложения"

## 1bae0e7c22 (major)
- Back: "Five looks for the app and widgets: Graphite, Midnight, Ocean, Plum and Glacier. ..."
- Problem: same as e030ad6544 (theme names as the app shows them). Also "приложение использует Graphite" is flat; "переключится на" says what happens.
- Proposed: "Пять вариантов оформления приложения и виджетов: Графит, Полночь, Океан, Слива и Ледник. Тема меняет фон, карточки, кнопки и оттенок, а цвета твоих привычек не трогает. Графит входит в бесплатный план, остальные четыре входят в Premium. Если Premium закончится, приложение переключится на Графит, а твой выбор вернётся вместе с Premium."

## 708afa517d (major)
- Back: "Four levels. Mostly the highest." (h3)
- Problem: bare "В основном" as the subject reads as the adverb "mostly", so the heading says "mostly the highest". The app writes the level in quotes in this exact sentence («В основном» — высший уровень); on the site, straight quotes.
- Proposed: "Четыре уровня. &quot;В основном&quot; - высший."

## 5c0ad99add (major)
- Back: "Mostly - already enough." (h2, reads as "basically, that's enough already")
- Problem: same adverb reading; the closing slogan loses its point. App: «В основном» — это более чем достаточно.
- Proposed: "&quot;В основном&quot; - уже достаточно."

## sim.all_done (major)
- Back: "All days are done. Mostly the highest level, there is nothing above."
- Problem: same adverb reading of the level; also days are not "сделаны" (habits are), "отмечены" is what a reader expects.
- Proposed: "Все дни отмечены. \"В основном\" - высший уровень, выше ничего нет."

## 12f89ab9eb (minor)
- Back: "...and the top level is called Mostly. No account and no tracking."
- Problem: level name unmarked at the end of the sentence ("называется В основном" reads as "is called, mostly"). Search snippet, so it should read cleanly.
- Proposed: "Трекер привычек для iPhone, который прощает. Один пропуск ничего не обнуляет, отдых считается полноценным днём, а высший уровень называется &quot;В основном&quot;. Без аккаунта и слежки."

## fed841d923 (minor)
- Back: "Goal: Mostly."
- Problem: same; with quotes the heading reads as the level name.
- Proposed: "Цель: &quot;В основном&quot;."

## 71d7a8ec96 (minor)
- Back: "Starting, Sometimes, Often, Mostly. Above mostly there is nothing, so nothing to lose."
- Problem: "Выше В основном" is ungrammatical-looking (preposition-like "выше" + adverb). Name the level.
- Proposed: "Начало, Иногда, Часто, В основном. Выше уровня &quot;В основном&quot; ничего нет, поэтому и терять нечего."

## sim.two_in_row_still (minor)
- Back: "...and your level is still Mostly/Often."
- Problem: "по-прежнему {level}" with {level} = "В основном" gives "уровень по-прежнему в основном" (adverb reading). A colon keeps it a label, as in sim.two_in_row.
- Proposed: "Два пропуска подряд мягко завершают серию. Новая начинается на следующий день, а твой уровень по-прежнему: {level}."

## 02a9c1a6ee (minor)
- Back: "Why mostly" (nav link).
- Problem: "Почему В основном" reads as "why mostly" in a menu. The app uses "Mostly" as the short brand in "Как работает Mostly".
- Proposed: `<a href="/#why">Почему Mostly</a><a href="/#widgets">Виджеты</a><a href="/#private">Приватность</a><a href="/#pricing">Цены</a><a href="/guides/">Гайды</a><a href="/support.html">Поддержка</a>`

## 19a87c6f18 (minor)
- Same as 02a9c1a6ee (mobile menu).
- Proposed: `<a href="/#why">Почему Mostly</a><a href="/#widgets">Виджеты</a><a href="/#private">Приватность</a><a href="/#pricing">Цены</a><a href="/#faq">Вопросы</a><a href="/guides/">Гайды</a><a href="/support.html">Поддержка</a>`

## 660abaf4b2 (minor)
- Back: "...Mostly Daily shows how often you do the habit, and never demands 100%."
- Problem: "делаешь привычку" is a calque; Russian does not "do a habit".
- Proposed: "Обычные трекеры считают дни подряд до первого пропуска. Mostly Daily показывает, как часто у тебя получается, и никогда не требует 100 %."

## c2c032e641 (minor)
- Back: "Apple Health can record steps, workouts, sleep, water and more. ..."
- Problem: "отмечать шаги" reads as Health logging steps, which it always does; the English means Health checks off habits for steps, workouts and so on.
- Proposed: "Apple Health может сам отмечать привычки на шаги, тренировки, сон, воду и не только. Выбери, что ты делаешь, например бег, йогу или плавание, и привычка отметится сама. Можно считать и дистанцию, в км или милях. &quot;Идеи из Apple Health&quot; смотрят на твои последние 30 дней и предлагают привычки, которые у тебя уже есть, а четыре привычки для самочувствия отмечаются сами: Закрывать кольца, Выходить на улицу, В постели к 23:00 и Записывать, как я себя чувствую"

## 08a55d5010 (minor)
- Back: "What's next, and then the mosaic"
- Problem: the caption names the widget, which is "Дальше" in the app and in the alt right above (a656c9711e).
- Proposed: "<b>&quot;Дальше&quot;, а потом мозаика</b>Следующая открытая привычка, а когда всё сделано, твоя мозаика"

## c3747825d7 (minor)
- Back: "...Fold or unfold the phone and you will stay in the same place. ..."
- Problem: "ты останешься на том же месте" reads physically (you stay where you stand). The meaning is that the app keeps your screen.
- Proposed: "На внутреннем дисплее iPhone Duo экран &quot;Сегодня&quot; показывает рядом со списком вторую панель: &quot;На этой неделе&quot; или привычку, которой ты коснёшься. Детали привычек и привычек-ограничений, &quot;Итоги&quot; и &quot;Настройки&quot; открываются рядом. В вертикальной ориентации &quot;Сегодня&quot; и экраны с календарём идут в одну колонку. Сложи или разложи телефон, и приложение останется на том же экране. Внешний дисплей работает как на любом iPhone."

## 3eda3bf54a (minor)
- Same issue as c3747825d7.
- Proposed: "Да. На внутреннем дисплее iPhone Duo экран &quot;Сегодня&quot; показывает рядом со списком вторую панель: &quot;На этой неделе&quot; или привычку, которой ты коснёшься. Детали привычек и привычек-ограничений, &quot;Итоги&quot; и &quot;Настройки&quot; в горизонтальной ориентации показывают две панели. В вертикальной ориентации &quot;Сегодня&quot; и экраны с календарём идут в одну колонку. Когда ты складываешь или раскладываешь телефон, приложение остаётся на том же экране. Внешний дисплей работает как на любом iPhone. В твоих привычках, планах и ценах ничего не меняется."

## 9c33cbb201 (minor)
- Back: "Free: the season's challenge, while it is open (from 7 days to the start of the month to the 14th), ..."
- Problem: "с 7 дней до начала месяца по 14-е число" is garbled; Russian says "за 7 дней до ... и до 14-го".
- Proposed: "Бесплатно: челлендж сезона, пока он открыт (за 7 дней до начала месяца и до 14-го числа), и его картинка, которой можно поделиться"

## 2b21c71c12 (minor)
- Back: "...You can join the season's challenge free from 7 days to the start of its month to the 14th. ..."
- Problem: same garbled date range as 9c33cbb201.
- Proposed: "Короткие необязательные челленджи с финишной чертой, например Ясный январь. Присоединиться можно с привычкой, которая у тебя уже есть, или с новой. Цель: большинство дней, каждый день не нужен. Дни отдыха и перерывов никогда не идут в минус, а если выйти, привычка и её история останутся. К челленджу сезона можно присоединиться бесплатно: за 7 дней до начала его месяца и до 14-го числа. Premium добавляет библиотеку из 10 челленджей, которые можно начать в любое время, каждый на 28 дней. Если Premium закончится, начатый челлендж дойдёт до конца, а завершённые можно будет просматривать."

## 6e44bdb251 (minor)
- Back: "...Reflect asks about each identity (...), whether still it is who you want to become: ..."
- Problem: "всё ещё ли это тот" is ungrammatical (the particle "ли" cannot follow "всё ещё" like this). Use the app's own question ("Всё ещё тот, кем хочешь стать?").
- Proposed: "В начале каждого квартала &quot;Итоги&quot; спрашивают о каждой идентичности (человек, который читает; человек, который двигается): это всё ещё тот, кем ты хочешь стать? Оставить, Изменить или Отпустить, плюс необязательная заметка в одну строку. &quot;Отпустить&quot; отправляет её привычки в архив и сохраняет всю их историю. Обзор только что закончившегося квартала бесплатный. Прошлые обзоры открываются в Premium, но твои заметки всегда можно прочитать."
