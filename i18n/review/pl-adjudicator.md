# pl adjudicator decisions (website)

Adjudicator: Fable, fresh context, 16 Nov 2026. Findings: 20 over 27 segments (3 major, 17 minor). By segment: accepted 26 (23 with the critic's text, 2 with a third text: af1f727ed8, 52264cf7f6; 1 in part: 1bae0e7c22), rejected 1 (e030ad6544). By finding: 19 accepted, 1 accepted for one segment and rejected for the other (e030ad6544, 1bae0e7c22). All 223 segments set to reviewed; `python3 tools/i18n.py check pl` reports 0 problems.

## 4f8f184e06
- Decision: accept
- Final: `Dodajesz taki nawyk? Wybierz &quot;Robić mniej&quot; u góry arkusza nowego nawyku albo zacznij nazwę od &quot;Mniej&quot; lub &quot;Rzucić&quot;`
- Reason: "Przestać" is not in the app's Polish do-less words (QuickAdd+DoLess.swift), "Rzucić" is, so the tip now works.

## 60d8e238e5
- Decision: accept
- Final: `Nawyk, którego chcesz mniej, na przykład drinki, cukier albo czas przed ekranem. Wieczorem wpisujesz ilość i dostajesz kolorowy kalendarz czystych, lekkich i cięższych dni, z celem czystych dni w tygodniu. Wpisując ilość, możesz dodać jedno opcjonalne słowo o tym, o co chodziło, na przykład Towarzystwo albo Relaks. Nawyk pokazuje potem, jak często każde się pojawiało, bez żadnych rad. Żeby zacząć, dotknij + i wybierz &quot;Robić mniej&quot; u góry (domyślnie jest &quot;Robić więcej&quot;). Nazwa zaczynająca się od słowa takiego jak mniej, rzadziej, rzucić albo ograniczyć wybiera to za ciebie, a wrócisz jednym dotknięciem. Jeśli nie masz jeszcze takiego nawyku, Nawyki pokazują też małą notkę &quot;Chcesz robić czegoś mniej?&quot;, którą możesz zamknąć. Plan Za darmo obejmuje jeden nawyk ograniczania.`
- Reason: Same: the words named are all in the app's list (mniej, rzadziej, rzucić, ograniczyć).

## 2ae54a5895
- Decision: accept
- Final: `Gdy tworzysz nawyk, wybierasz, jak ma się sam odhaczać, według tego, co robisz: robić 6000 kroków, ruszać się 20 minut, biegać, pokonywać 3 km (2 mile) pieszo lub biegiem, robić jogę, trenować, medytować, spać, pić wodę albo stać. Wpisanie nazwy takiej jak &quot;Poranny bieg&quot; albo &quot;Pływanie&quot; podpowiada to ustawienie, są też szablony Biegać, Joga, Siłownia, Pływać i Jeździć na rowerze. Jest za darmo. Nic się nie łączy, dopóki arkusz Zdrowia nie zapyta przy zapisywaniu. Nawyk treningowy może śledzić jeden rodzaj treningu (Spacer, Bieganie, Jazda na rowerze, Pływanie, Joga, Trening siłowy, HIIT, Pilates, Taniec, Wędrówka albo Wioślarstwo) albo dowolny trening. Przy biegach, jazdach i pływaniu możesz liczyć dystans, w km albo milach. Po treningu na Apple Watch nawyk odhacza się sam, a widżety aktualizują się bez otwierania aplikacji. Dzisiejsze przypomnienie znika, gdy Apple Health zaliczy dzień, więc trening, który jeszcze się synchronizuje, nie dostaje przypomnienia za wcześnie. Dzień pokazuje, co się policzyło. Ta lista jest przechowywana tylko na tym telefonie, a dane zdrowotne nigdy nie trafiają do iCloud.`
- Reason: The list now uses the app's Apple Health outcome words (robić 6000 kroków, biegać, pokonywać 3 km pieszo lub biegiem, robić jogę); "Jest za darmo." for the calque "To jest darmowe.".

## 793f86be94
- Decision: accept
- Final: `<b>Pomysły z Apple Health.</b> W szybkim dodawaniu i w Ustawienia &gt; Apple Health &quot;Pomysły z Apple Health&quot; patrzą na ostatnie 30 dni w Apple Health, tylko na twoim iPhonie, i proponują do trzech nawyków, które już masz, każdy z celem na start trochę poniżej twojego zwykłego poziomu. Mogą też zaproponować, żeby nawyk, który odhaczasz ręcznie, odhaczał się sam. Działają tylko wtedy, gdy ich dotkniesz, po jednym krótkim wyjaśnieniu i jednym arkuszu Zdrowia. Nic nie jest przechowywane, a &quot;Nie teraz&quot; zawsze jest w porządku. Jest za darmo. Cztery nawyki dla dobrego samopoczucia też mogą odhaczać się same: <i>Zamykać pierścienie</i> (wszystkie trzy pierścienie albo tylko Ruch), <i>Wychodzić na powietrze</i> (czas w świetle dziennym), <i>W łóżku do 23:00</i> (godzina, o której kładziesz się spać, z danych o śnie; godzinę ustawiasz samodzielnie) i <i>Zapisywać, jak się czuję</i>. Przy tym ostatnim aplikacja zauważa tylko, że tego dnia jest zapisany nastrój albo emocja. To, co zostało zapisane, nigdy nie jest odczytywane, pokazywane ani przechowywane. Zawsze możesz odhaczyć nawyk samodzielnie.`
- Reason: "Jest za darmo.", same as 2ae54a5895.

## 190ab1dde1
- Decision: accept
- Final: `Mostly Daily: Łagodne nawyki · tracker nawyków na iPhone'a`
- Reason: 58 characters, so search results show the whole title; it starts with the store name and "Łagodne" carries "forgiving". The meta description still says "który wybacza".

## 02a9c1a6ee
- Decision: accept
- Final: `<a href="/#why">Dlaczego Mostly Daily</a><a href="/#widgets">Widżety</a><a href="/#private">Prywatność</a><a href="/#pricing">Cennik</a><a href="/guides/">Poradniki</a><a href="/support.html">Pomoc</a>`
- Reason: "Dlaczego Przeważnie" means nothing in a menu before the reader knows the level names; the app name does.

## 19a87c6f18
- Decision: accept
- Final: `<a href="/#why">Dlaczego Mostly Daily</a><a href="/#widgets">Widżety</a><a href="/#private">Prywatność</a><a href="/#pricing">Cennik</a><a href="/#faq">Pytania</a><a href="/guides/">Poradniki</a><a href="/support.html">Pomoc</a>`
- Reason: Same as 02a9c1a6ee (menu with Pytania).

## 29eff42050
- Decision: accept
- Final: `Jedno pominięcie, nic się nie zeruje. Poziom spada o kilka punktów, a seria trwa dalej.`
- Reason: A score "spada"; "opada" is said of water or dust.

## sim.one_miss
- Decision: accept
- Final: `Jedno pominięcie, nic się nie zeruje. Poziom spada o kilka punktów, a seria trwa dalej.`
- Reason: Same text as 29eff42050.

## bb313fdbee
- Decision: accept
- Final: `Nic się nie zeruje. Poziom trochę spada i równie szybko wraca, gdy znów coś odhaczysz. Twoja seria &quot;Bez dwóch pominięć z rzędu&quot; kończy się dopiero po dwóch pominięciach z rzędu.`
- Reason: "spada", same as 29eff42050.

## 62589643ef
- Decision: accept
- Final: `Nic się nie zeruje. Poziom trochę spada i równie szybko wraca, gdy znów coś odhaczysz. Twoja seria "Bez dwóch pominięć z rzędu" kończy się dopiero po dwóch pominięciach z rzędu.`
- Reason: Same text as bb313fdbee with plain quotes (JSON-LD).

## 2f4148b1a8
- Decision: accept
- Final: `Nie pomijaj dwa razy z rzędu.`
- Reason: The heading needs its verb, like the English instruction.

## 9296e3ffb6
- Decision: accept
- Final: `Tak albo nie, liczba albo minuty. Na dni, gdy brakuje czasu, miej wersję dwuminutową, liczy się w pełni. Gdy krok od kilku tygodni jest rutyną, aplikacja proponuje następny. Nic nie zmienia się samo.`
- Reason: "zajęte dni" is understood, but "dni, gdy brakuje czasu" is what the two-minute version is for and reads better.

## 472d65a2e1
- Decision: accept
- Final: `Drinki, cukier, czas przed ekranem. Wieczorem wpisz ilość, a dostaniesz kolorowy kalendarz: dni czyste, lekkie, cięższe. Ustaw cel czystych dni w tygodniu. Bez oceniania. Kalendarz tylko pokazuje, jak jest.`
- Reason: "pokazuje obraz" reads as showing an image; "pokazuje, jak jest" says it plainly.

## af1f727ed8
- Decision: accept (third text)
- Final: `Tylko do własnych zapisków. Bez porad medycznych.`
- Reason: The finding is right: "śledzenie" is the word of the privacy promise "Bez śledzenia" on the same page. The critic's "do zapisywania dla siebie" is still clumsy; "własne zapiski" says self-tracking in plain Polish.

## 52264cf7f6
- Decision: accept (third text)
- Final: `Nie. Mostly Daily służy do prowadzenia własnych zapisków i nie daje porad medycznych. Jeśli martwisz się o zdrowie albo picie, porozmawiaj ze specjalistą.`
- Reason: Same as af1f727ed8; without the critic's added "tylko", which the English does not have.

## 2ded02388a
- Decision: accept
- Final: `<i class="dot" style="background:var(--green)"></i><span><b>Co tydzień Podsumowania opisują twój tydzień życzliwymi słowami</b>nawyk po nawyku, z następnym małym krokiem.</span>`
- Reason: "opowiadają twój tydzień" is a calque; "opisują ... życzliwymi słowami" matches "in kind words".

## 94d0f633c8
- Decision: accept
- Final: `<i class="dot" style="background:var(--orange)"></i><span><b>Raz na kwartał: czy to nadal ktoś, kim chcesz się stawać?</b>Zostaw, Dostosuj albo Odpuść. Odpuszczenie tylko przenosi nawyki do archiwum.</span>`
- Reason: Same wording as 6e44bdb251 ("to nadal ktoś, kim chcesz się stawać"); "archiwizuje" needed an object.

## 766221beb1
- Decision: accept
- Final: `Więcej widżetów, w tym bardzo duży widżet Dziś i tydzień, oraz dwie godziny przypomnień na nawyk`
- Reason: With "widżet" the app's widget name "Dziś i tydzień" stands alone.

## e030ad6544
- Decision: reject
- Final: `Premium: motywy (Graphite jest w zestawie; Midnight, Ocean, Plum i Glacier to Premium) i ikony aplikacji`
- Reason: The app says "Grafit jest w zestawie" in the theme picker footer; the site keeps the app's words. Draft kept.

## 1bae0e7c22
- Decision: accept in part
- Final: `Pięć wersji wyglądu aplikacji i jej widżetów: Graphite, Midnight, Ocean, Plum i Glacier. Motyw zmienia tło, karty, przyciski i odcień, nigdy kolory twoich nawyków. Graphite jest w zestawie, a pozostałe cztery są częścią Premium. Jeśli Premium się skończy, aplikacja używa motywu Graphite, a twój wybór wraca razem z Premium.`
- Reason: "Pięć wersji wyglądu" taken for the calque "Pięć wyglądów". "Graphite jest w zestawie" kept, as in the app (see e030ad6544).

## c3747825d7
- Decision: accept
- Final: `Na wewnętrznym ekranie iPhone Duo ekran Dziś pokazuje obok listy drugi panel: Ten tydzień albo nawyk, którego dotkniesz. Szczegóły nawyków i nawyków ograniczania, Podsumowania i Ustawienia otwierają się obok siebie. W pionie Dziś i ekrany z kalendarzem mają jedną kolumnę. Złóż albo rozłóż telefon, a zostaniesz w tym samym miejscu. Zewnętrzny ekran działa jak na każdym iPhonie.`
- Reason: A display works "jak na każdym iPhonie", not like a phone.

## 3eda3bf54a
- Decision: accept
- Final: `Tak. Na wewnętrznym ekranie iPhone Duo ekran Dziś pokazuje obok listy drugi panel: Ten tydzień albo nawyk, którego dotkniesz. Szczegóły nawyków i nawyków ograniczania, Podsumowania i Ustawienia mają w poziomie dwa panele. W pionie Dziś i ekrany z kalendarzem mają jedną kolumnę. Gdy składasz albo rozkładasz telefon, zostajesz w tym samym miejscu. Zewnętrzny ekran działa jak na każdym iPhonie. W twoich nawykach, planach i cenach nic się nie zmienia.`
- Reason: Same as c3747825d7.

## 39a533dfa4
- Decision: accept
- Final: `Planowanie do 4 kroków naprzód; pełna biblioteka wyzwań`
- Reason: "Plan" reads as a pricing plan in this list; the app says "Planowanie kolejnych kroków", and the row above is also a verbal noun.

## c33ba5fcb8
- Decision: accept
- Final: `<b>Ekran blokady i tryb czuwania</b>Dzień nad zegarem, co dalej i jeden nawyk, który odhaczysz bez odblokowywania. Widżety barwione i przezroczyste zostają czytelne.`
- Reason: "co dalej" for the calque "co następne".

## dde5af2f87
- Decision: accept
- Final: `Nawyki ograniczania drinków, cukru i czasu przed ekranem z kalendarzem czystych dni`
- Reason: Genitive after "nawyki ograniczania"; "dla" was a calque of "for".

## 543ef84fcd
- Decision: accept
- Final: `tracker nawyków, śledzenie nawyków, aplikacja do nawyków, codzienne nawyki, kalendarz nawyków, widżet nawyków, zdrowe nawyki, mniej pić, iPhone`
- Reason: "kalendarz czystych dni" is the app's own term, nobody searches it; "aplikacja do nawyków" is a real query. Eight Polish phrases plus iPhone.
