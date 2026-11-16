# ru guides: adjudicator (Fable, 16 Nov 2026)

Decided the 33 findings in `ru-guides-critic.md` against `i18n/en.json` and the draft. Accepted 29 (26 with the critic's
text, 3 with my own), rejected 4. All 134 drafted guide entries are now `reviewed`. `python3 tools/i18n.py check ru`:
357 segments, 0 problems. No reviewed home or support entry was changed.

## Accepted

| Id | Was | Now | Why |
|---|---|---|---|
| 50dff26f05 | Трекер привычек без обнуления серий · Mostly Daily | Трекер привычек без давления и обнуления серий · Mostly Daily | The H1 renders "Трекер привычек без давления" (shared reviewed id 927428b06f) and that is the subtitle search phrase; the new title still holds the words of the reviewed home link. |
| e8572022ae | ...Трекер привычек без обнуления серий | ...Трекер привычек без давления и обнуления серий | In step with the page title. |
| f57532a7ab | никогда не считаются срывом | никогда не считаются промахом | "срыв" is the Russian word for relapse, on the glossary's never-use list. |
| 993e0898b8 | один срыв выглядит так | один промах выглядит так | Same. |
| 1d4ec38aea | То, сколько ты уже держишься ... до срыва | То, сколько дней прошло без этого ... до промаха | Same; "держишься" is willpower talk the English does not have. My text keeps "То," so the clause reads as a subject. |
| c8fbe64cd3 | Срыв - это информация | Промах - это информация | Same. |
| e168af1557 | из своего Здоровья | из своего Apple Health | The reviewed support answer c2c62c977d says "из своего Apple Health". |
| 2a1aaafe4b | читает своё Здоровье | читает свой Apple Health | Same. |
| 93b214a418 | в Здоровье ... дни, которые дошли до цели | в Apple Health ... дни, в которые цель достигнута | Same name as the rest of the site; a day does not walk to a goal in Russian. |
| 53c9dbba22 | Данные Здоровья остаются на iPhone | Данные Apple Health остаются на iPhone | Same name. |
| 1dddcabedf | на этикетке конфиденциальности Mostly Daily написано "Сбор данных не ведётся" | в разделе "Конфиденциальность приложения" у Mostly Daily написано "Сбор данных не ведётся" | Section name is Apple's (seen on the ru store page). I kept the draft's "Сбор данных не ведётся": that is the card the ru App Store shows for Data Not Collected as far as I know, and the critic's "Данные не собираются" was a guess too. See Not settled. |
| 449a0d5582 | День пропускается | Такой день не учитывается | "пропускается" shares its root with "пропуск" right where the page says the day is not a miss. |
| d5ce9953a7 | когда день дойдёт до твоей цели | когда цель на день будет выполнена | Calque. |
| edad9b1640 | когда день дойдёт до твоей цели | когда цель на день будет выполнена | Calque. |
| 5335acb957 | день без единого раза ... засчитывается как три | день, когда не было ничего ... - это всё равно три чистых дня | The draft was unclear; the critic's "счёт равен нулю" reads like a formula. My text says it the plain way, as uk and pl do. |
| d02827c086 | К дню | Ко дню | Grammar. |
| 6715b8f0fb | Почему серии дней подряд мешают | Почему серии дней подряд работают против тебя | "backfire" is stronger than "get in the way". |
| 0a551b7ada | ...мешают и что считать вместо них. | ...работают против тебя и что считать вместо них. | In step with the H2. |
| 046e668b21 | Где ты был и с кем? | Где это было и с кем? | No gendered past tense (ru notes). |
| 78a751eec5 | как будто ты всё бросил | - как будто привычка заброшена | Same; the hyphen marks the dropped verb. |
| ed56b37f04 | Настройки, "Экспорт и импорт" создаёт файлы CSV... | В меню Настройки &gt; "Экспорт и импорт" можно в любом плане сохранить... | The draft was not a sentence; the reviewed pages write paths with &gt;. |
| c335d25e08 | открой Настройки, "Перерыв" | открой Настройки &gt; "Перерыв" | Same path style. |
| 767f01488d | праздники | отпуска | "holidays" here is time away; de, uk and pl read it the same way. |
| 4b755ef33c | в неделе в цветном календаре | за неделю в цветном календаре | Two "в" in a row. |
| 6fa7b06f32 | "Что самое маленькое я могу сделать сегодня?" | "Какой самый маленький шаг я могу сделать сегодня?" | Clumsy. |
| 190dd014e5 | из повторения, неделями и месяцами | из повторений за недели и месяцы | Reads as Russian. |
| 54f0c2829f | Короткие тексты ... привычки, которые остаются надолго | Короткие статьи ... привычки надолго | "статьи" is the word people read and search with; shorter. |
| 76b717a632 | same | same | Same. |
| e11835ca92 | Привычки, которых хочешь меньше · Mostly Daily | Привычки, которых хочешь меньше: календарь чистых дней · Mostly Daily | Puts a searched word (календарь, in the keyword field) in the title; the reviewed home link already calls this guide "Почему календарь чистых дней работает лучше". |

## Rejected

| Id | Kept | Why |
|---|---|---|
| 82a9651319 | Почему один пропущенный день привычке не вредит · Mostly Daily | The reviewed home page links to this guide twice with exactly these words (f336acebcd, f72800165b), and reviewed entries stay. "не ломает" would also bring a word of the glossary's "broke" family into a title. |
| cabf005747 | Почему один пропущенный день привычке не вредит | Same. |
| 49ec981503 | the same link text | Same. |
| 3b6ffaf33c | the draft | The only change proposed was that link text. |

## Not settled
- 1dddcabedf: I could not load the card text from the ru App Store page. Look once at Mostly Daily's page on the ru storefront and
  confirm the card reads "Сбор данных не ведётся" (Apple prints it without ё); if it reads otherwise, quote it as shown.
- One-missed-day title: if the owner prefers "не ломает привычку", change it in the guide (82a9651319, cabf005747, 49ec981503,
  3b6ffaf33c) and in the reviewed home entries f336acebcd and f72800165b in one pass.
- Streaks guide: the H1 shares id 927428b06f with the home eyebrow, so it renders "Трекер привычек без давления". If the guide
  should have its own H1, the extractor has to give it its own id (code work in `tools/i18n.py`).
- Reviewed support entry 27d1c0c043 still says "Отметки из Здоровья"; the guides now say Apple Health everywhere. Not touched.
