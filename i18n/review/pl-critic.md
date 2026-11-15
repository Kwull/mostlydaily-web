# Polish website translation: critic findings

Critic: Opus, fresh context, 16 Nov 2026. Inputs: i18n/en.json, i18n/pl.json (223 segments, all drafted).
Scripted checks over all segments: tag multisets, attributes and {placeholders} match the English; no em or en dashes, no curly or Polish quotes; plural keys sim.misses and sim.days have one, few, many, other. App names were checked with tools/l10n/lookup.py and Apple names with apple_terms.py (Ekran główny, Ekran blokady, Tryb czuwania, Centrum sterowania, Edytuj widżet, Dostosuj, Chmura rodzinna, Udostępnianie: all as Apple has them). Level names, Never missed twice, Focus mode, Reflect, widget names, plan names and identity names match the app. Home title starts with the store name; eyebrows and the meta description carry "tracker nawyków" naturally. Segments not listed are ok.

Findings: 20 (3 major, 17 minor).

## 4f8f184e06
- severity: major
- kind: meaning
- back: Adding such a habit? Pick "Do less" at the top of the new-habit sheet or start the name with "Less" or "Stop".
- problem: The app picks "Do less" for Polish names that start with one of: mniej, rzadziej, bez, nie, zero, rzucić, rzucam, ograniczyć, ogranicz, unikać (Packages/MostlyKit/Sources/MostlyCore/QuickAdd+DoLess.swift:17). "Przestać" is not in the list, so a reader who follows this tip gets a Build habit. Use a word the app knows.
- proposed `4f8f184e06`: Dodajesz taki nawyk? Wybierz &quot;Robić mniej&quot; u góry arkusza nowego nawyku albo zacznij nazwę od &quot;Mniej&quot; lub &quot;Rzucić&quot;

## 60d8e238e5
- severity: major
- kind: meaning
- back: ... A name starting with a word like less, stop or quit picks it for you ...
- problem: Same as 4f8f184e06: "przestać" does not trigger Do less in the app. The app list has mniej, rzadziej (fewer), rzucić (quit), ograniczyć; use those. Rest of the segment is fine.
- proposed `60d8e238e5`: Nawyk, którego chcesz mniej, na przykład drinki, cukier albo czas przed ekranem. Wieczorem wpisujesz ilość i dostajesz kolorowy kalendarz czystych, lekkich i cięższych dni, z celem czystych dni w tygodniu. Wpisując ilość, możesz dodać jedno opcjonalne słowo o tym, o co chodziło, na przykład Towarzystwo albo Relaks. Nawyk pokazuje potem, jak często każde się pojawiało, bez żadnych rad. Żeby zacząć, dotknij + i wybierz &quot;Robić mniej&quot; u góry (domyślnie jest &quot;Robić więcej&quot;). Nazwa zaczynająca się od słowa takiego jak mniej, rzadziej, rzucić albo ograniczyć wybiera to za ciebie, a wrócisz jednym dotknięciem. Jeśli nie masz jeszcze takiego nawyku, Nawyki pokazują też małą notkę &quot;Chcesz robić czegoś mniej?&quot;, którą możesz zamknąć. Plan Za darmo obejmuje jeden nawyk ograniczania.

## 2ae54a5895
- severity: major
- kind: glossary (app terms)
- back: When you create a habit, you choose how it checks itself off by what you do: walk 6000 steps, move 20 minutes, go running a bit, walk or run 3 km (2 miles), practise yoga, train, meditate, sleep, drink water or stand. ... This is free. ...
- problem: The list repeats the options of the Apple Health outcome picker, and the app words differ: app pl has "robić %lld kroków" (walk N steps), "biegać" (go for a run), "pokonywać %lld km pieszo lub biegiem" (walk or run N km), "robić jogę" (do yoga). The draft has "przejść 6000 kroków", "pobiegać", "przejść albo przebiec 3 km", "ćwiczyć jogę", so the site and the picker do not match. Also "To jest darmowe." is a calque of "It is free."; a Polish site says "Jest za darmo." or "To nic nie kosztuje."
- proposed `2ae54a5895`: Gdy tworzysz nawyk, wybierasz, jak ma się sam odhaczać, według tego, co robisz: robić 6000 kroków, ruszać się 20 minut, biegać, pokonywać 3 km (2 mile) pieszo lub biegiem, robić jogę, trenować, medytować, spać, pić wodę albo stać. Wpisanie nazwy takiej jak &quot;Poranny bieg&quot; albo &quot;Pływanie&quot; podpowiada to ustawienie, są też szablony Biegać, Joga, Siłownia, Pływać i Jeździć na rowerze. Jest za darmo. Nic się nie łączy, dopóki arkusz Zdrowia nie zapyta przy zapisywaniu. Nawyk treningowy może śledzić jeden rodzaj treningu (Spacer, Bieganie, Jazda na rowerze, Pływanie, Joga, Trening siłowy, HIIT, Pilates, Taniec, Wędrówka albo Wioślarstwo) albo dowolny trening. Przy biegach, jazdach i pływaniu możesz liczyć dystans, w km albo milach. Po treningu na Apple Watch nawyk odhacza się sam, a widżety aktualizują się bez otwierania aplikacji. Dzisiejsze przypomnienie znika, gdy Apple Health zaliczy dzień, więc trening, który jeszcze się synchronizuje, nie dostaje przypomnienia za wcześnie. Dzień pokazuje, co się policzyło. Ta lista jest przechowywana tylko na tym telefonie, a dane zdrowotne nigdy nie trafiają do iCloud.

## 793f86be94
- severity: minor
- kind: naturalness
- back: ... "Not now" is always fine. This is free. ...
- problem: "To jest darmowe." is word-for-word English; native copy says "Jest za darmo." (same fix as in 2ae54a5895).
- proposed `793f86be94`: <b>Pomysły z Apple Health.</b> W szybkim dodawaniu i w Ustawienia &gt; Apple Health &quot;Pomysły z Apple Health&quot; patrzą na ostatnie 30 dni w Apple Health, tylko na twoim iPhonie, i proponują do trzech nawyków, które już masz, każdy z celem na start trochę poniżej twojego zwykłego poziomu. Mogą też zaproponować, żeby nawyk, który odhaczasz ręcznie, odhaczał się sam. Działają tylko wtedy, gdy ich dotkniesz, po jednym krótkim wyjaśnieniu i jednym arkuszu Zdrowia. Nic nie jest przechowywane, a &quot;Nie teraz&quot; zawsze jest w porządku. Jest za darmo. Cztery nawyki dla dobrego samopoczucia też mogą odhaczać się same: <i>Zamykać pierścienie</i> (wszystkie trzy pierścienie albo tylko Ruch), <i>Wychodzić na powietrze</i> (czas w świetle dziennym), <i>W łóżku do 23:00</i> (godzina, o której kładziesz się spać, z danych o śnie; godzinę ustawiasz samodzielnie) i <i>Zapisywać, jak się czuję</i>. Przy tym ostatnim aplikacja zauważa tylko, że tego dnia jest zapisany nastrój albo emocja. To, co zostało zapisane, nigdy nie jest odczytywane, pokazywane ani przechowywane. Zawsze możesz odhaczyć nawyk samodzielnie.

## 190ab1dde1
- severity: minor
- kind: search
- back: Mostly Daily: Gentle habits · habit tracker for iPhone that forgives
- problem: About 74 characters; Google shows about 60, so the result is cut inside the last clause ("który wyb..."). Start with the store name is right. Drop the clause; "Łagodne" already says forgiving, and "tracker nawyków na iPhone'a" (the search phrase) stays visible.
- proposed `190ab1dde1`: Mostly Daily: Łagodne nawyki · tracker nawyków na iPhone'a

## 02a9c1a6ee, 19a87c6f18
- severity: minor
- kind: naturalness
- back: Why Mostly (as in "why for the most part")
- problem: In English "Why Mostly" reads as the app name. In Polish the nav link "Dlaczego Przeważnie" is just "why mostly", which means nothing in a menu before the reader knows the level names. Name the app instead.
- proposed `02a9c1a6ee`: <a href="/#why">Dlaczego Mostly Daily</a><a href="/#widgets">Widżety</a><a href="/#private">Prywatność</a><a href="/#pricing">Cennik</a><a href="/guides/">Poradniki</a><a href="/support.html">Pomoc</a>
- proposed `19a87c6f18`: <a href="/#why">Dlaczego Mostly Daily</a><a href="/#widgets">Widżety</a><a href="/#private">Prywatność</a><a href="/#pricing">Cennik</a><a href="/#faq">Pytania</a><a href="/guides/">Poradniki</a><a href="/support.html">Pomoc</a>

## 29eff42050, sim.one_miss, bb313fdbee, 62589643ef
- severity: minor
- kind: naturalness
- back: Your level sinks/droops a few points ...
- problem: "Poziom opada" is said of water or fatigue; for a score that goes down Polish says "spada". Use "spada" in all four (they must stay the same text as each other).
- proposed `29eff42050`: Jedno pominięcie, nic się nie zeruje. Poziom spada o kilka punktów, a seria trwa dalej.
- proposed `sim.one_miss`: Jedno pominięcie, nic się nie zeruje. Poziom spada o kilka punktów, a seria trwa dalej.
- proposed `bb313fdbee`: Nic się nie zeruje. Poziom trochę spada i równie szybko wraca, gdy znów coś odhaczysz. Twoja seria &quot;Bez dwóch pominięć z rzędu&quot; kończy się dopiero po dwóch pominięciach z rzędu.
- proposed `62589643ef`: Nic się nie zeruje. Poziom trochę spada i równie szybko wraca, gdy znów coś odhaczysz. Twoja seria "Bez dwóch pominięć z rzędu" kończy się dopiero po dwóch pominięciach z rzędu.

## 2f4148b1a8
- severity: minor
- kind: naturalness
- back: Never twice in a row.
- problem: A heading with no verb; a reader does not know what should never happen twice until the paragraph below. The English is an instruction ("Never miss twice").
- proposed `2f4148b1a8`: Nie pomijaj dwa razy z rzędu.

## 9296e3ffb6
- severity: minor
- kind: naturalness
- back: ... Keep a two-minute version for occupied days ...
- problem: "zajęte dni" is a calque of "busy days" (zajęty = taken, e.g. a seat). Polish says "pracowite dni" or "dni, gdy brakuje czasu".
- proposed `9296e3ffb6`: Tak albo nie, liczba albo minuty. Na dni, gdy brakuje czasu, miej wersję dwuminutową, liczy się w pełni. Gdy krok od kilku tygodni jest rutyną, aplikacja proponuje następny. Nic nie zmienia się samo.

## 472d65a2e1
- severity: minor
- kind: naturalness
- back: ... No judging. The calendar only shows the image.
- problem: "pokazuje obraz" is the English idiom word for word; in Polish it sounds like a picture is displayed. Say what it shows.
- proposed `472d65a2e1`: Drinki, cukier, czas przed ekranem. Wieczorem wpisz ilość, a dostaniesz kolorowy kalendarz: dni czyste, lekkie, cięższe. Ustaw cel czystych dni w tygodniu. Bez oceniania. Kalendarz tylko pokazuje, jak jest.

## af1f727ed8, 52264cf7f6
- severity: minor
- kind: naturalness
- back: Only for tracking for yourself. No medical advice.
- problem: The same page says "Bez śledzenia" (no tracking) three times as a privacy promise, so "do śledzenia dla siebie" puts the bad word on the feature; "dla siebie" after it is also clumsy. Use "zapisywać" (log), which the app uses for Limit logs.
- proposed `af1f727ed8`: Tylko do zapisywania dla siebie. Bez porad medycznych.
- proposed `52264cf7f6`: Nie. Mostly Daily służy tylko do zapisywania dla siebie i nie daje porad medycznych. Jeśli martwisz się o zdrowie albo picie, porozmawiaj ze specjalistą.

## 2ded02388a
- severity: minor
- kind: naturalness
- back: Each week Reflect narrates your week kindly
- problem: "opowiadają twój tydzień" is a calque of "tells your week". Polish: describe it in kind words.
- proposed `2ded02388a`: <i class="dot" style="background:var(--green)"></i><span><b>Co tydzień Podsumowania opisują twój tydzień życzliwymi słowami</b>nawyk po nawyku, z następnym małym krokiem.</span>

## 94d0f633c8
- severity: minor
- kind: naturalness
- back: Once a quarter: do you still want to such a person become? ... Letting go only archives.
- problem: Word order "chcesz się taką osobą stawać" is awkward, and "archiwizuje" has no object. Align with 6e44bdb251 ("to nadal ktoś, kim chcesz się stawać").
- proposed `94d0f633c8`: <i class="dot" style="background:var(--orange)"></i><span><b>Raz na kwartał: czy to nadal ktoś, kim chcesz się stawać?</b>Zostaw, Dostosuj albo Odpuść. Odpuszczenie tylko przenosi nawyki do archiwum.</span>

## 766221beb1
- severity: minor
- kind: naturalness
- back: More widgets, including the very large Today and week, and two reminder times per habit
- problem: "bardzo duży Dziś i tydzień" makes the widget name read as an adjective on "Dziś"; add the noun so the app name stands alone.
- proposed `766221beb1`: Więcej widżetów, w tym bardzo duży widżet Dziś i tydzień, oraz dwie godziny przypomnień na nawyk

## e030ad6544, 1bae0e7c22
- severity: minor
- kind: naturalness
- back: Graphite comes in the set ... / Five looks of the app ...
- problem: "jest w zestawie" sounds like an item in a box; English "included" means free on every plan. "Pięć wyglądów" is a calque of "five looks".
- proposed `e030ad6544`: Premium: motywy (Graphite jest za darmo; Midnight, Ocean, Plum i Glacier to Premium) i ikony aplikacji
- proposed `1bae0e7c22`: Pięć wersji wyglądu aplikacji i jej widżetów: Graphite, Midnight, Ocean, Plum i Glacier. Motyw zmienia tło, karty, przyciski i odcień, nigdy kolory twoich nawyków. Graphite jest za darmo, a pozostałe cztery są częścią Premium. Jeśli Premium się skończy, aplikacja używa motywu Graphite, a twój wybór wraca razem z Premium.

## c3747825d7, 3eda3bf54a
- severity: minor
- kind: naturalness
- back: ... The outer screen works like every iPhone.
- problem: A screen "działa jak każdy iPhone" compares a display to a phone; Polish says it works as on any iPhone.
- proposed `c3747825d7`: Na wewnętrznym ekranie iPhone Duo ekran Dziś pokazuje obok listy drugi panel: Ten tydzień albo nawyk, którego dotkniesz. Szczegóły nawyków i nawyków ograniczania, Podsumowania i Ustawienia otwierają się obok siebie. W pionie Dziś i ekrany z kalendarzem mają jedną kolumnę. Złóż albo rozłóż telefon, a zostaniesz w tym samym miejscu. Zewnętrzny ekran działa jak na każdym iPhonie.
- proposed `3eda3bf54a`: Tak. Na wewnętrznym ekranie iPhone Duo ekran Dziś pokazuje obok listy drugi panel: Ten tydzień albo nawyk, którego dotkniesz. Szczegóły nawyków i nawyków ograniczania, Podsumowania i Ustawienia mają w poziomie dwa panele. W pionie Dziś i ekrany z kalendarzem mają jedną kolumnę. Gdy składasz albo rozkładasz telefon, zostajesz w tym samym miejscu. Zewnętrzny ekran działa jak na każdym iPhonie. W twoich nawykach, planach i cenach nic się nie zmienia.

## 39a533dfa4
- severity: minor
- kind: naturalness
- back: Plan (noun) up to 4 steps ahead; the full challenge library
- problem: In the pricing list "Plan" reads as the pricing plan noun. Use the verbal noun like the other rows ("Zmiana dowolnego...").
- proposed `39a533dfa4`: Planowanie do 4 kroków naprzód; pełna biblioteka wyzwań

## c33ba5fcb8
- severity: minor
- kind: naturalness
- back: ... The day above the clock, what next, and one habit ...
- problem: "co następne" is a calque of "what's next"; Polish says "co dalej" or "następny nawyk".
- proposed `c33ba5fcb8`: <b>Ekran blokady i tryb czuwania</b>Dzień nad zegarem, co dalej i jeden nawyk, który odhaczysz bez odblokowywania. Widżety barwione i przezroczyste zostają czytelne.

## dde5af2f87
- severity: minor
- kind: naturalness
- back: Limit habits for drinks, sugar and screen time with a calendar of clear days
- problem: "Nawyki ograniczania dla drinków" uses "dla" (for the benefit of); the genitive is natural: limiting drinks.
- proposed `dde5af2f87`: Nawyki ograniczania drinków, cukru i czasu przed ekranem z kalendarzem czystych dni

## 543ef84fcd
- severity: minor
- kind: search
- back: habit tracker, tracking habits, daily habits, habit calendar, habit widget, healthy habits, drink less, clear days calendar, iPhone
- problem: Eight Polish phrases plus iPhone; "kalendarz czystych dni" is the app's own term that nobody searches for. metadata-pl.md lists "nawyki", "rutyna" and "planer" as real search words; swap it for "aplikacja do nawyków" (the generic query) and keep 8 phrases.
- proposed `543ef84fcd`: tracker nawyków, śledzenie nawyków, aplikacja do nawyków, codzienne nawyki, kalendarz nawyków, widżet nawyków, zdrowe nawyki, mniej pić, iPhone
