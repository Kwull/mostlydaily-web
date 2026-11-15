# ru adjudicator rulings (website)

Adjudicator: Fable, fresh context, 16 Nov 2026. Inputs: i18n/review/ru-critic.md (19 findings), i18n/en.json, i18n/ru.json, the app's ru strings (lookup.py), glossary, docs/appstore/metadata-ru.md.

Result: 19 accepted (11 with the critic's text, 8 with a changed text), 0 rejected. All 223 segments set to reviewed. `python3 tools/i18n.py check ru`: 0 problems.

| id | Decision | Final text (changed part) | Reason |
|---|---|---|---|
| e030ad6544 | accept | Premium: темы (Графит входит в бесплатный план; Полночь, Океан, Слива и Ледник входят в Premium) и значки приложения | The ru app shows the themes as Графит, Полночь, Океан, Слива, Ледник. A reader has to find the same word in the theme picker. Same ruling as es. Differs from the task's keep-untranslated list, see the open point below. |
| 1bae0e7c22 | accept | ...Графит, Полночь, Океан, Слива и Ледник. ... Графит входит в бесплатный план ... приложение переключится на Графит, а твой выбор вернётся вместе с Premium. | Same theme names; "переключится на" says what happens. |
| 708afa517d | accept | Четыре уровня. &quot;В основном&quot; - высший. | Bare "В основном" reads as the adverb. The app quotes the level in this sentence; straight quotes on the site. |
| 5c0ad99add | accept | &quot;В основном&quot; - уже достаточно. | Same. |
| sim.all_done | accept | Все дни отмечены. "В основном" - высший уровень, выше ничего нет. | Same; days are "отмечены", habits are "сделаны". Plain quotes, it is a script string. |
| 12f89ab9eb | accept | ...а высший уровень называется &quot;В основном&quot;. Без аккаунта и слежки. | Level name marked so the search snippet reads cleanly. |
| fed841d923 | accept | Цель: &quot;В основном&quot;. | Same. |
| 71d7a8ec96 | accept | Начало, Иногда, Часто, В основном. Выше уровня &quot;В основном&quot; ничего нет, поэтому и терять нечего. | "Выше В основном" does not parse. The list of four stays unquoted. |
| sim.two_in_row_still | accept | ...а твой уровень по-прежнему: {level}. | The colon keeps {level} a label, as in sim.two_in_row. |
| 02a9c1a6ee | accept | Почему Mostly (first link; the rest unchanged) | "Почему В основном" reads as "why mostly" in a menu. The app uses Mostly as the short brand ("Как работает Mostly"); es does the same. |
| 19a87c6f18 | accept | Почему Mostly (first link; the rest unchanged) | Same, mobile menu. |
| 660abaf4b2 | accept | ...Mostly Daily показывает, как часто у тебя получается, и никогда не требует 100 %. | "Делать привычку" is a calque. |
| c2c032e641 | accept, own text | Apple Health может отмечать за тебя шаги, тренировки, сон, воду и не только. (rest unchanged) | The finding is right: the draft reads as Health logging steps. The critic's "привычки на шаги" is clumsy and "сам" gives Apple Health a gender; "отмечать за тебя" says it plainly. |
| 08a55d5010 | accept | <b>&quot;Дальше&quot;, а потом мозаика</b>Следующая открытая привычка, а когда всё сделано, твоя мозаика | The widget is "Дальше" in the app and in the alt text above it. |
| c3747825d7 | accept | Сложи или разложи телефон, и приложение останется на том же экране. (rest unchanged) | "Ты останешься на том же месте" reads as standing still. |
| 3eda3bf54a | accept | Когда ты складываешь или раскладываешь телефон, приложение остаётся на том же экране. (rest unchanged) | Same. |
| 9c33cbb201 | accept, own text | Бесплатно: челлендж сезона, пока он открыт (за 7 дней до начала месяца и по 14-е число), и его картинка, которой можно поделиться | The draft's range was garbled. "По 14-е число" instead of the critic's "до 14-го": the 14th is included. |
| 2b21c71c12 | accept, own text | К челленджу сезона можно присоединиться бесплатно: за 7 дней до начала его месяца и по 14-е число. (rest unchanged) | Same range, same inclusive "по". |
| 6e44bdb251 | accept | ...&quot;Итоги&quot; спрашивают о каждой идентичности (человек, который читает; человек, который двигается): это всё ещё тот, кем ты хочешь стать? Оставить, Изменить или Отпустить, ... (rest unchanged) | "Всё ещё ли" is not Russian; the app asks "Всё ещё тот, кем хочешь стать?". |

## Not settled

- Theme names. The task brief lists theme names as kept in English; the ru app translates them and es was reviewed with the app's names, so ru follows the app. If the owner wants English theme names on the site, change e030ad6544 and 1bae0e7c22 back (and es with them).
- JSON-LD "name" is "Mostly Daily: Habit Calendar" in the template for every locale. For ru it should be "Mostly Daily: Мягкие привычки". It is in the build script, outside the segments, so it was left alone.
- The level name stays bare where it sits in a list or after "уровень" (for example "на уровне Часто или В основном", "уровень 85, В основном") and inside <b> in the footer line. The critic did not flag these and they read as names there.
