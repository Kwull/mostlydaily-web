# Polish guides: critic (opus, 2026-11-16)

Scope: the 134 entries in `i18n/pl.json` with status "drafted" (10 guide pages and the guides index), judged against `i18n/en.json`. Every entry was back-translated first. The reviewed home and support pages, the glossary, `pl.notes.md`, the app's pl strings (`lookup.py`) and Apple's pl terms (`apple_terms.py`) were the references. There was no in-place sheet.

Result: 17 findings, 0 major, 17 minor. The other entries are ok.

Checked and clean on every entry:
- Markup: the tags and attributes are identical to the English, including hrefs and classes. Quote counts match, and in-text quotes are straight.
- Owner rule: no em or en dashes and no typographic quotes („ ” « » ‘ ’).
- App words match the app: Nie pokazuj innym, Czysty dzień, Odhacz, Odpocznij dziś, Mało energii, Podróż, Urlop, Inne, Przerwa, Następne, Dziś i tydzień, Kalendarz miesięczny, Ten tydzień, Kim się stajesz, Robić mniej, Synchronizuj zapisy przez iCloud, Twój dzień, Eksport i import, Usuń wszystkie dane, Pomysły z Apple Health, Towarzystwo, Relaks, "Czyste dni w tym tygodniu: 3 z 4", "Jutro nowy dzień.", Zamykać pierścienie, pierścień Ruch, Wychodzić na powietrze, W łóżku do 23:00, Zapisywać, jak się czuję, and "Prywatny nawyk" / "prywatny nawyk". The Siri phrases match the app's Shortcuts phrases. "Mniej" and "Rzucić" are both in the pl do-less word list (`QuickAdd+DoLess.swift`).
- Apple words: Ekran główny, Ekran blokady, Tryb czuwania, Centrum sterowania, Skróty, Zdrowie, Nastrój (State of Mind), minuty ćwiczeń, minuty uważności, godziny stania, Dodaj widżet, Edytuj, barwiony. The one exception is Control Center controls (findings 1 to 3).
- Consistency with the reviewed pages: Przeważnie / Często / Czasami / Na starcie, "Bez dwóch pominięć z rzędu", seria and zwykła seria, nawyk ograniczania, czysty / lekki / cięższy dzień, plan Za darmo, Premium, "Tracker nawyków bez zerowania serii", "pełnoprawne dni", "robisz swoje", and the self-tracking line, which matches the FAQ word for word.
- Tone: informal "ty" throughout, no guilt words, no medical or recovery claims, no book titles.

Search and titles: the titles and H1s use what pl speakers search for: "tracker nawyków" (in 4 titles), "widżety nawyków na iPhonie", "jak ograniczyć ...", "Apple Health". They stay natural, and each keeps " · Mostly Daily". "drinki" sits a little off the store keyword "alkohol" / "mniej pić", but the English says drinks and the reviewed home link already uses "Jak ograniczyć drinki, cukier albo czas przed ekranem", so it stays. The one weak title is the guides index (finding 15).

Native feel: the guides mostly read like Polish articles, not like translated English. The findings below are the places where the English shows through.

## Findings

### 1. 630b002418 (iphone-habit-widgets, lead): minor, apple-term
- Back: "Mostly Daily has widgets for the Home Screen, Lock Screen and StandBy mode, and buttons for Control Center. ..."
- Problem: Apple's pl word for a Control Center control is "narzędzie" ("Dodaj narzędzie", ControlCenterUI CONTROL_CENTER_ADD_A_CONTROL), not "przycisk". The app has no noun of its own for it, so Apple's word wins.
- Proposed: `Mostly Daily ma widżety na ekran główny, ekran blokady i tryb czuwania oraz narzędzia do Centrum sterowania. Jedno dotknięcie odhacza nawyk bez otwierania aplikacji, a drugie to cofa.`

### 2. d02827c086 (cut-back-with-a-calendar, "Log it once"): minor, apple-term + naturalness
- Back: "... The Habit widget and the Clear day button in Control Center do the same ... It (he) describes what happened and advises nothing."
- Problem: (a) "przycisk" should be Apple's "narzędzie", as in finding 1. (b) In "Opisuje on" the "on" could point at the habit or at the counter. It reads stiff, and the reader has to work out what it refers to.
- Proposed: `Gdy dzień prawie się kończy, jedno dotknięcie kwadratowego przycisku zapisuje czysty dzień albo wpisujesz ilość. Widżet Nawyk i narzędzie Czysty dzień w Centrum sterowania robią to samo bez otwierania aplikacji. Do dnia możesz dodać jeden powód, na przykład Towarzystwo albo Relaks, a nawyk pokazuje licznik dla każdego powodu. Licznik tylko opisuje, co się działo, i niczego nie doradza.`

### 3. 6b31d23f40 (iphone-habit-widgets, "Private habits stay private"): minor, apple-term
- Back: "... every widget, button and notification will show 'Private habit' with a plain symbol ..."
- Problem: "przycisk" for the English "control". This is the same Apple term as in finding 1.
- Proposed: `Nawyk ograniczania nigdy nie jest pokazywany z nazwy na ekranie blokady, widać go jako "prywatny nawyk". Włącz Nie pokazuj innym przy dowolnym nawyku, a każdy widżet, narzędzie w Centrum sterowania i powiadomienie pokaże "Prywatny nawyk" z prostym symbolem. W aplikacji nadal widzisz prawdziwą nazwę.`

### 4. 237af1f5b0 (sick-and-travel-days, budget): minor, naturalness (close to meaning)
- Back: "Rest and Travel have a shared soft limit of 4 days a month per habit, which [habit] you can change from 0 to 10. ..."
- Problem: "który" agrees with the nearest masculine noun, "nawyk", so the clause first reads as "a habit you can change from 0 to 10". What you change is the limit.
- Proposed: `Odpoczynek i Podróż mają wspólny miękki limit: 4 dni w miesiącu na nawyk. Możesz go zmienić w zakresie od 0 do 10. Przekroczenie go jest w porządku: menu pokazuje, ile dni wykorzystano, a dodatkowy dzień odpoczynku to nadal dzień odpoczynku, nigdy pominięcie. Każdy tydzień, który kończy się z nawykiem na poziomie Często albo Przeważnie, daje też jeden dodatkowy dzień odpoczynku, a odłożyć możesz najwyżej 4.`

### 5. b2ea29eaeb and 8db819328d (sick-and-travel-days, meta description and lead): minor, naturalness
- Back: "Mark the day as Low energy or Travel or set time off for a whole trip. ..."
- Problem: "Mało energii albo Podróż albo ustaw" chains two "albo" at different levels: a choice between two states, then a choice between two actions. Polish readers stumble on it. Use "lub" for the inner choice.
- Proposed b2ea29eaeb: `Oznacz dzień jako Mało energii lub Podróż albo ustaw przerwę na cały wyjazd. Te dni to nie pominięcia i nie obniżają poziomu.`
- Proposed 8db819328d: `W Mostly Daily oznaczasz dzień jako Mało energii lub Podróż albo ustawiasz przerwę na cały wyjazd. Te dni to nie pominięcia i nie obniżają poziomu.`

### 6. 190dd014e5 (one-missed-day, intro paragraph): minor, naturalness
- Back: "... barely changes the design/formula ... The formula changes when one miss gets 'made into two' ..."
- Problem: for a pattern of behaviour Polish says "wzorzec" (or "schemat"). "Wzór" is a formula or a design. "jedno pominięcie robi się dwoma" is not idiomatic.
- Proposed: `Nawyki powstają z powtarzania przez tygodnie i miesiące. Jedna luka w tym powtarzaniu prawie nie zmienia wzorca: nawyk nadal jest tym, co domyślnie robisz w danej chwili, w danym miejscu, po danym sygnale. Wzorzec zmienia się wtedy, gdy jedno pominięcie zamienia się w dwa, potem w trzy, a sygnał przestaje prowadzić do działania.`

### 7. 046e668b21 (habits-you-want-less-of, "A slip is information"): minor, naturalness
- Back: "... This formula helps you choose the next small change."
- Problem: "wzór" again, as in finding 6.
- Proposed: `Cięższy dzień nie przekreśla czystych dni wokół niego. Spójrz na kalendarz: co było inaczej? Gdzie i z kim? Ten wzorzec pomaga wybrać następną małą zmianę.`

### 8. 1569756f9b (habit-tracker-without-streaks, "Why streaks backfire"): minor, naturalness
- Back: "... They did, and the habit for the most part still is."
- Problem: "a nawyk w większości nadal jest" is a word-for-word calque of "is still mostly there", and "jest" has no complement.
- Proposed: `Po kilku tygodniach cel przesuwa się z robienia nawyku na pilnowanie liczby. Ludzie robią pospieszną wersję o północy, byle seria trwała, albo odhaczają coś, czego nie zrobili. Gdy seria się kończy, spadek ze 120 do 0 mówi, że te 120 dni się nie liczyło. Liczyło się, a nawyk wciąż w dużej mierze jest na miejscu.`

### 9. 311a34cf50 (cut-back-with-a-calendar, "Set it up as a Limit habit"): minor, naturalness
- Back: "... use minutes for one app or one kind of using, for example of social media ..."
- Problem: "jednego rodzaju korzystania" has no object and does not sit well with "mediów społecznościowych".
- Proposed: `W Mostly Daily dodaj nawyk i wybierz "Robić mniej" u góry albo zacznij nazwę od "Mniej" lub "Rzucić". Wybierz jednostkę (drinki, przysmaki, minuty albo własne słowo), ile jeszcze liczy się jako lekki dzień (domyślnie 2) i do ilu czystych dni w tygodniu dążysz (domyślnie 4). Przy czasie przed ekranem licz minuty w jednej aplikacji albo w jednym rodzaju aplikacji, na przykład w mediach społecznościowych, i wpisuj je samodzielnie.`

### 10. 9382de0459 (apple-health-habits, wellbeing sources): minor, naturalness
- Back: "... The app sees only whether the day 'passed itself'. ..."
- Problem: "czy dzień się zaliczył" is a reflexive use of "zaliczyć" that sounds like slang. The neutral form is passive.
- Proposed: `Cztery kolejne źródła odhaczają nawyki dla dobrego samopoczucia: Zamykać pierścienie (albo tylko pierścień Ruch), Wychodzić na powietrze (czas w świetle dziennym), W łóżku do 23:00 (z danych o śnie) i Zapisywać, jak się czuję (wpis w funkcji Nastrój). Aplikacja widzi tylko, czy dzień został zaliczony. Nigdy nie pokazuje kalorii, wartości pierścieni ani tego, co zostało zapisane jako nastrój.`

### 11. f57532a7ab (cut-back-with-a-calendar, "Read the calendar"): minor, glossary
- Back: "Each day has its field: ..."
- Problem: the glossary word for tile is "kafelek", and the reviewed home page uses "kafelek" for tiles. "pole" reads as a form field.
- Proposed: `Każdy dzień ma swój kafelek: zielony to czysty dzień, bursztynowy z jedną kropką to lekki, koralowy z dwiema kropkami to cięższy, a księżyc to dzień odpoczynku. Dni bez wpisu zostają puste i nigdy nie liczą się jako potknięcie. Karta na ekranie Dziś mówi, jak idzie tydzień, na przykład "Czyste dni w tym tygodniu: 3 z 4". Lekki dzień znaczy tylko tyle, że nie był to czysty dzień, a po cięższym dniu aplikacja mówi "Jutro nowy dzień."`

### 12. ed56b37f04 (private-habit-tracker, "Take it with you"): minor, naturalness
- Back: "Settings, Export and import creates CSV files ..."
- Problem: in Polish "Ustawienia, Eksport i import tworzy" reads as a list ("Settings, Export and Import create"). The English comma path does not carry over. Naming the screen first fixes it, and the text stays plain.
- Proposed: `Eksport i import w Ustawieniach tworzy pliki CSV z twoimi nawykami, wpisami i przerwami w każdym planie. Premium nigdy nie blokuje twoich danych, a Usuń wszystkie dane usuwa twoje nawyki, wpisy i przerwy z iPhone'a i z iCloud. Wszystkie szczegóły są w <a href="/privacy.html">polityce prywatności</a>.`

### 13. 767f01488d (rest-days, intro): minor, naturalness
- Back: "... illness, travel, a busy week at work at work ..."
- Problem: "pracowity tydzień w pracy" repeats itself ("pracowity" already means "full of work").
- Proposed: `Nawyk, który działa tylko wtedy, gdy wszystko idzie dobrze, nie przetrwa roku. Choroba, podróż, gorący tydzień w pracy i urlop zdarzają się każdego roku, a plan, który liczy je jako porażki, uczy rezygnowania.`

### 14. 3f2dea0461 (sick-and-travel-days, "Coming back"): minor, naturalness
- Back: "If you don't open the app for 3 days or more, it (she) greets you again ..."
- Problem: "wita cię ona ponownie" is stiff (the "ona" is redundant) and misses the app's screen name "Witaj ponownie".
- Proposed: `Jeśli nie otwierasz aplikacji przez 3 dni albo dłużej, aplikacja mówi "Witaj ponownie" i prosi o wybranie jednego nawyku na dziś, w wersji dwuminutowej, jeśli ją ma. Nie ma listy pominięć. Więcej w poradniku <a href="/guides/rest-days.html">dni odpoczynku są częścią planu</a>.`

### 15. 21b7613830 (guides/index, title): minor, search
- Back: "Guides · Mostly Daily"
- Problem: "Poradniki" alone tells search nothing about the topic. Pl searchers look for "nawyki" / "nawyków", and "o nawykach" is natural and adds nothing the page does not say.
- Proposed: `Poradniki o nawykach · Mostly Daily`

### 16. d5ce9953a7 and edad9b1640 (apple-health-habits, meta description and lead): minor, naturalness
- Back: "... Mostly Daily checks it off when the day reaches your goal ..."
- Problem: "gdy dzień osiągnie twój cel" is a calque. In Polish a person reaches a goal, not a day.
- Proposed d5ce9953a7: `Połącz nawyk z Apple Health, a Mostly Daily odhaczy go, gdy danego dnia osiągniesz cel: kroki, treningi, sen, woda i więcej.`
- Proposed edad9b1640: `Połącz nawyk z Apple Health, a Mostly Daily odhaczy go, gdy danego dnia osiągniesz cel: 8000 kroków, 30 minut ćwiczeń, bieg, 7 godzin snu, 2 litry wody.`

### 17. 6a99b30c40 (apple-health-habits, "What a habit can follow"): minor, naturalness
- Back: "... For workouts you choose the type, for example running, yoga or else swimming, or else any workout. ..."
- Problem: "albo pływanie, albo dowolny trening" reads as the correlative "albo ... albo" (either ... or) and merges the two levels of choice. Use "lub" inside the example list.
- Proposed: `Nawyk, który budujesz, może śledzić kroki, minuty ćwiczeń, minuty uważności, treningi, dystans marszu i biegu, jazdę na rowerze, pływanie, godziny snu, godziny stania albo wodę. Przy treningach wybierasz rodzaj, na przykład bieg, jogę lub pływanie, albo dowolny trening. Aplikacja pokazuje tylko źródła, które pasują do celu: nawyk w minutach może śledzić ćwiczenia albo trening, a nawyk w krokach może śledzić kroki.`
