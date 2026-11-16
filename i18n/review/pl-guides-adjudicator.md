# Polish guides: adjudicator (fable, 2026-11-16)

Scope: the 17 findings (19 entries) in `i18n/review/pl-guides-critic.md`, decided against `i18n/en.json` and the draft in `i18n/pl.json`. References: the reviewed home and support entries in `pl.json`, the app's pl strings (`lookup.py`), Apple's pl terms (`apple_terms.py`), the glossary.

Result: 17 findings accepted (11 with the critic's text, 6 with a third text), 0 rejected. 19 entries changed. All 134 drafted entries are now "reviewed". `python3 tools/i18n.py check pl`: 357 segments, 0 problems.

## 1. 630b002418
- Decision: accept
- Final: `Mostly Daily ma widżety na ekran główny, ekran blokady i tryb czuwania oraz narzędzia do Centrum sterowania. Jedno dotknięcie odhacza nawyk bez otwierania aplikacji, a drugie to cofa.`
- Reason: Apple's pl word for a Control Center control is "narzędzie" (ControlCenterUI "Dodaj narzędzie"). The app has no noun of its own, so Apple's word wins.

## 2. d02827c086
- Decision: accept in part
- Final: `Gdy dzień prawie się kończy, jedno dotknięcie kwadratowego przycisku zapisuje czysty dzień albo wpisujesz ilość. Widżet Nawyk i narzędzie Czysty dzień w Centrum sterowania robią to samo bez otwierania aplikacji. Do dnia możesz dodać jeden powód, na przykład Towarzystwo albo Relaks, a nawyk pokazuje licznik dla każdego powodu. Licznik opisuje, co się wydarzyło, i niczego nie doradza.`
- Reason: "narzędzie" as in finding 1, and "Licznik" for the unclear "on". The critic's "tylko" is not in the English, and "co się wydarzyło" from the draft is closer to "what happened".

## 3. 6b31d23f40
- Decision: accept in part
- Final: `Nawyk ograniczania nigdy nie jest pokazywany z nazwy na ekranie blokady, widać go jako "prywatny nawyk". Włącz Nie pokazuj innym przy dowolnym nawyku, a wszystkie widżety, narzędzia w Centrum sterowania i powiadomienia pokażą "Prywatny nawyk" z prostym symbolem. W aplikacji nadal widzisz prawdziwą nazwę.`
- Reason: "narzędzie" as in finding 1. Plural, because "każdy" does not agree with the neuter "narzędzie" and "powiadomienie" that follow it.

## 4. 237af1f5b0
- Decision: accept in part
- Final: `Odpoczynek i Podróż mają wspólny miękki limit: 4 dni w miesiącu na nawyk. Możesz go zmienić w zakresie od 0 do 10. Przekroczenie limitu jest w porządku: menu pokazuje, ile dni wykorzystano, a dodatkowy dzień odpoczynku to nadal dzień odpoczynku, nigdy pominięcie. Każdy tydzień, który kończy się z nawykiem na poziomie Często albo Przeważnie, daje też jeden dodatkowy dzień odpoczynku, a odłożyć możesz najwyżej 4.`
- Reason: The split stops "który" from attaching to "nawyk". "Przekroczenie limitu" instead of a second "go" in a row.

## 5. b2ea29eaeb, 8db819328d
- Decision: accept
- Final b2ea29eaeb: `Oznacz dzień jako Mało energii lub Podróż albo ustaw przerwę na cały wyjazd. Te dni to nie pominięcia i nie obniżają poziomu.`
- Final 8db819328d: `W Mostly Daily oznaczasz dzień jako Mało energii lub Podróż albo ustawiasz przerwę na cały wyjazd. Te dni to nie pominięcia i nie obniżają poziomu.`
- Reason: "lub" for the inner choice keeps the two levels of choice apart.

## 6. 190dd014e5
- Decision: accept
- Final: `Nawyki powstają z powtarzania przez tygodnie i miesiące. Jedna luka w tym powtarzaniu prawie nie zmienia wzorca: nawyk nadal jest tym, co domyślnie robisz w danej chwili, w danym miejscu, po danym sygnale. Wzorzec zmienia się wtedy, gdy jedno pominięcie zamienia się w dwa, potem w trzy, a sygnał przestaje prowadzić do działania.`
- Reason: A pattern of behaviour is "wzorzec"; "wzór" is a formula or a design. "robi się dwoma" is not Polish. The reviewed home page keeps "wzór" for the tap pattern of the demo, which is a different thing.

## 7. 046e668b21
- Decision: accept
- Final: `Cięższy dzień nie przekreśla czystych dni wokół niego. Spójrz na kalendarz: co było inaczej? Gdzie i z kim? Ten wzorzec pomaga wybrać następną małą zmianę.`
- Reason: Same word as in finding 6.

## 8. 1569756f9b
- Decision: accept in part
- Final: `Po kilku tygodniach cel przesuwa się z robienia nawyku na pilnowanie liczby. Ludzie robią pospieszną wersję o północy, byle seria trwała, albo odhaczają coś, czego nie zrobili. Gdy seria się kończy, spadek ze 120 do 0 mówi, że te 120 dni się nie liczyło. Liczyło się, a nawyk w dużej mierze nadal trwa.`
- Reason: The draft's bare "jest" was a calque. "nadal trwa" is shorter than the critic's "jest na miejscu", which reads as "is appropriate" in Polish.

## 9. 311a34cf50
- Decision: accept in part
- Final: `W Mostly Daily dodaj nawyk i wybierz "Robić mniej" u góry albo zacznij nazwę od "Mniej" lub "Rzucić". Wybierz jednostkę (drinki, przysmaki, minuty albo własne słowo), ile jeszcze liczy się jako lekki dzień (domyślnie 2) i do ilu czystych dni w tygodniu dążysz (domyślnie 4). Przy czasie przed ekranem licz minuty w jednej aplikacji albo przy jednym rodzaju aktywności, na przykład w mediach społecznościowych, i wpisuj je samodzielnie.`
- Reason: "korzystania" without an object was the problem. The critic's "rodzaj aplikacji" narrows "one kind of use" to apps; "rodzaj aktywności" keeps the English meaning.

## 10. 9382de0459
- Decision: accept
- Final: `Cztery kolejne źródła odhaczają nawyki dla dobrego samopoczucia: Zamykać pierścienie (albo tylko pierścień Ruch), Wychodzić na powietrze (czas w świetle dziennym), W łóżku do 23:00 (z danych o śnie) i Zapisywać, jak się czuję (wpis w funkcji Nastrój). Aplikacja widzi tylko, czy dzień został zaliczony. Nigdy nie pokazuje kalorii, wartości pierścieni ani tego, co zostało zapisane jako nastrój.`
- Reason: "się zaliczył" is slang. The reviewed support page says "Apple Health zaliczy dzień", so the passive matches.

## 11. f57532a7ab
- Decision: accept
- Final: `Każdy dzień ma swój kafelek: zielony to czysty dzień, bursztynowy z jedną kropką to lekki, koralowy z dwiema kropkami to cięższy, a księżyc to dzień odpoczynku. Dni bez wpisu zostają puste i nigdy nie liczą się jako potknięcie. Karta na ekranie Dziś mówi, jak idzie tydzień, na przykład "Czyste dni w tym tygodniu: 3 z 4". Lekki dzień znaczy tylko tyle, że nie był to czysty dzień, a po cięższym dniu aplikacja mówi "Jutro nowy dzień."`
- Reason: The glossary word for tile is "kafelek" and the reviewed home page uses it.

## 12. ed56b37f04
- Decision: accept
- Final: `Eksport i import w Ustawieniach tworzy pliki CSV z twoimi nawykami, wpisami i przerwami w każdym planie. Premium nigdy nie blokuje twoich danych, a Usuń wszystkie dane usuwa twoje nawyki, wpisy i przerwy z iPhone'a i z iCloud. Wszystkie szczegóły są w <a href="/privacy.html">polityce prywatności</a>.`
- Reason: The comma path read as a list of two subjects with a singular verb.

## 13. 767f01488d
- Decision: accept in part
- Final: `Nawyk, który działa tylko wtedy, gdy wszystko idzie dobrze, nie przetrwa roku. Choroba, podróż, intensywny tydzień w pracy i urlop zdarzają się każdego roku, a plan, który liczy je jako porażki, uczy rezygnowania.`
- Reason: "pracowity tydzień w pracy" repeats itself. "intensywny" is the plain word; the critic's "gorący" is a figure of speech the English does not have.

## 14. 3f2dea0461
- Decision: accept
- Final: `Jeśli nie otwierasz aplikacji przez 3 dni albo dłużej, aplikacja mówi "Witaj ponownie" i prosi o wybranie jednego nawyku na dziś, w wersji dwuminutowej, jeśli ją ma. Nie ma listy pominięć. Więcej w poradniku <a href="/guides/rest-days.html">dni odpoczynku są częścią planu</a>.`
- Reason: "wita cię ona" was stiff. "Witaj ponownie" is the app's screen title (lookup.py "Welcome back").

## 15. 21b7613830
- Decision: accept
- Final: `Poradniki o nawykach · Mostly Daily`
- Reason: "nawyki" is the head word of the pl keyword field, and the page is a list of guides about habits, so the title says nothing new.

## 16. d5ce9953a7, edad9b1640
- Decision: accept
- Final d5ce9953a7: `Połącz nawyk z Apple Health, a Mostly Daily odhaczy go, gdy danego dnia osiągniesz cel: kroki, treningi, sen, woda i więcej.`
- Final edad9b1640: `Połącz nawyk z Apple Health, a Mostly Daily odhaczy go, gdy danego dnia osiągniesz cel: 8000 kroków, 30 minut ćwiczeń, bieg, 7 godzin snu, 2 litry wody.`
- Reason: In Polish a person reaches a goal, a day does not.

## 17. 6a99b30c40
- Decision: accept
- Final: `Nawyk, który budujesz, może śledzić kroki, minuty ćwiczeń, minuty uważności, treningi, dystans marszu i biegu, jazdę na rowerze, pływanie, godziny snu, godziny stania albo wodę. Przy treningach wybierasz rodzaj, na przykład bieg, jogę lub pływanie, albo dowolny trening. Aplikacja pokazuje tylko źródła, które pasują do celu: nawyk w minutach może śledzić ćwiczenia albo trening, a nawyk w krokach może śledzić kroki.`
- Reason: "lub" inside the example list stops the "albo ... albo" reading.

## Not settled
None. Three drafted entries not flagged by the critic still describe Control Center without a noun for the control (45951fea36, 96032a55e2, 0140323135), so they need no change for finding 1.
