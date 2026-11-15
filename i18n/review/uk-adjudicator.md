# uk adjudicator: Mostly Daily website (index.html, support.html, assets/site.js)

Adjudicator: Fable, 16 Nov 2026, fresh context. Decided the 22 findings in `uk-critic.md` (21 segments; c33ba5fcb8
has two). Accepted 22, rejected 0. In 11 of them the final text differs from the critic's proposal (noted below).
All 223 entries are `reviewed`; `python3 tools/i18n.py check uk` reports 0 problems.

Theme names: confirmed, the app's uk strings translate them (Графіт, Ніч, Океан, Слива, Льодовик), so the draft stays.

| Id | Decision | Final text (changed part) | Reason |
|---|---|---|---|
| 936ad5fad8 | accept | Теми й іконки застосунку | The app's own string for "Themes and app icons". |
| e030ad6544 | accept | ... входять у Premium) та іконки застосунку | App word is "іконки застосунку". |
| 927428b06f | accept | Трекер звичок без суворих серій | The draft said "without pressure". "Серія" is the app's word for the run, so streaks are "суворі серії", as in the rest of the page. |
| f72800165b | accept | ...>трекер звичок без суворих серій</a>... | Follows the eyebrow; the link goes to the streaks guide. |
| 200de3647e | accept, own text | Mostly Daily: Пропусти день. Прогрес на місці. Два знімки екрана &quot;Сьогодні&quot; у світлому й темному оформленні. | Screen name quoted so it does not read as "today". "Оформлення" is Apple's uk word for light and dark; "тема" in the app means the colour themes. `&quot;` because the segment lands in an attribute. |
| 02a9c1a6ee | accept, own text | <a href="/#why">Чому Mostly</a>... | "Чому Здебільшого" makes no sense as a label. The app keeps the short name in "Як працює Mostly", and it is shorter in the nav than "Чому Mostly Daily". |
| 19a87c6f18 | accept, own text | <a href="/#why">Чому Mostly</a>... | Same as 02a9c1a6ee. |
| ba4129ea0a | accept, own text | ... замкнений екран, режим Очікування, Центр керування і Siri. | Apple's uk name is "Очікування". Kept "режим" before it: the bare word in a list reads as "waiting". |
| c33ba5fcb8 (StandBy) | accept, own text | <b>Замкнений екран і режим Очікування</b> | Same. |
| c33ba5fcb8 (Tinted) | accept | Віджети з відтінком і прозорі віджети лишаються розбірливими. | Apple's uk word for Tinted is "з відтінком". |
| 15c470d321 | accept, own text | Віджети всюди: Початковий екран, замкнений екран, режим Очікування, Центр керування, Siri | Same as ba4129ea0a. |
| 10c854931f | accept, own text | Віджети для Початкового екрана, замкненого екрана, режиму Очікування і Центру керування, що відмічають одним дотиком | Same; the critic's shorter "для" construction taken. |
| a656c9711e | accept | Віджети Далі: Чистити зуби ниткою, потім Читати 10 сторінок, потім Готово з мозаїкою | The widget's "All done" label in uk is "Готово". |
| c3747825d7 | accept, own text | Складаєш чи розкладаєш iPhone, а застосунок лишається на тому самому місці. | The calque read like a reserved seat. "Відкриється" in the critic's text suggests the app reopens; it stays where it was. |
| 3eda3bf54a | accept, own text | Коли складаєш чи розкладаєш iPhone, застосунок лишається на тому самому місці. | Same. |
| 8a32797c56 | accept | <b>Дані лишаються твоїми.</b>... | "Назавжди" is the Lifetime plan name on the same page. |
| 522e09e8bf | accept, own text | Рівні, правило &quot;Без двох пропусків поспіль&quot;, відпочинок і перерви | Critic's wording, with `&quot;` as in every other HTML segment of the draft. |
| 9ab4e55fab | accept, own text | Усі минулі підсумки тижнів, місяців і років та огляди ідентичності | The critic's fix still repeats "огляди". This is the app's Premium row ("Усі минулі підсумки тижнів, місяців і років") plus the identity reviews. |
| 766221beb1 | accept | ... і два нагадування для кожної звички | "Два часи" is not said of clock times. |
| f336acebcd | accept | ... ніж лічильник днів від останнього разу. | "Відтоді" had nothing to refer to. |
| 2b21c71c12 | accept | Дні відпочинку і перерв ніколи не йдуть тобі в мінус | "Рахуються проти тебе" is a calque. |
| 543ef84fcd | accept | трекер звичок, habit tracker, щоденні звички, корисні звички, календар звичок, щоденник звичок, віджет звичок, трекер алкоголю | Covers the Limit side of the English list; the store keyword field has "алкоголь". Eight phrases, no repeat. |

## Not settled
- StandBy: Apple's Settings label is "Очікування"; the site now says "режим Очікування". If the app later gets its own
  uk string for StandBy, the site should follow it.
- The raw quotes in the JSON-LD segments 62589643ef and e214ef1d09 were not flagged and are left as drafted.
