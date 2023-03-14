import gmail from "../images/icons8-gmail-logo-48.png";
import outlook from "../images/outlook.png";
import wp from "../images/wp-poczta.png";
import onet from "../images/onet.png";
import interia from "../images/interia.png";
import yahoo from "../images/icons8-yahoo-mail-app-48.png";
import protonmail from "../images/icons8-protonmail-48.png";
import thunder from "../images/thunderbird.png";
import inna from "../images/icons8-envelope-48.png";

const mailData = [
    {id:1, mailName: 'Gmail', imgSrc: gmail, link: 'https://support.google.com/mail/answer/8395?hl=pl&co=GENIE.Platform%3DDesktop', info: [
           'Otwórz Gmaila.',
            'W prawym górnym rogu kliknij Ustawienia a potem > Zobacz wszystkie ustawienia.',
            'W sekcji „Podpis” wpisz tekst podpisu. Jeśli chcesz, możesz sformatować wiadomość, dodając obraz lub zmieniając styl tekstu.',
            'U dołu strony kliknij Zapisz zmiany.'
       ]},
    {id:2, mailName: 'Outlook', imgSrc: outlook, link: 'https://support.microsoft.com/pl-pl/office/tworzenie-i-dodawanie-podpisu-do-wiadomo%C5%9Bci-8ee5d4f4-68fd-464a-a1c1-0e1c80bb27f2', info: [
            'Otwórz nową wiadomość e-mail.',
            'W menu Wiadomość wybierz pozycję Podpis > Podpisy.',
            'W obszarze Wybierz podpis do edycji wybierz pozycję Nowy i w oknie dialogowym Nowy podpis wpisz nazwę podpisu.',
            'W obszarze Edytuj podpis zredaguj podpis. Możesz zmieniać czcionki, kolory i rozmiary czcionek, ' +
            'a także wyrównanie tekstu. Jeśli chcesz utworzyć bardziej niezawodny podpis z punktorami, tabelami ' +
            'lub obramowaniami, sformatuj tekst w programie Word, a następnie skopiuj i wklej podpis w polu Edytuj ' +
            'podpis . Możesz również użyć jednego z naszych wstępnie zaprojektowanych szablonów podpisu . Pobierz ' +
            'szablony w programie Word, dostosuj je przy użyciu swoich informacji osobistych, a następnie skopiuj je ' +
            'i wklej w polu Edytuj podpis.',
            'W obszarze Wybierz podpis domyślny ustaw następujące opcje dotyczące podpisu: \n' +
            'W polu listy rozwijanej Konto e-mail wybierz konto e-mail do skojarzenia z podpisem. Dla różnych kont e-mail możesz mieć różne podpisy.' +
            'Jeśli chcesz, aby podpis był domyślnie dodawany do wszystkich nowych wiadomości, w polu listy rozwijanej Nowe wiadomości wybierz jeden z podpisów. ' +
            'Jeśli nie chcesz automatycznie dodawać podpisu do nowych wiadomości, wybierz pozycję (brak).' +
            'Jeśli chcesz, aby podpis był wyświetlany w wiadomościach, na które odpowiadasz i które przesyłasz dalej, z ' +
            'listy rozwijanej Odpowiedzi/wiadomości przesłane dalej wybierz jeden ze swoich podpisów.',
            'Wybierz przycisk OK , aby zapisać nowy podpis i powrócić do wiadomości. Program Outlook nie dodaje nowego podpisu do wiadomości otwartej w kroku 1,' +
            ' nawet jeśli wybrano zastosowanie podpisu do wszystkich nowych wiadomości.' +
            ' Do tej jednej wiadomości musisz dodać podpis ręcznie. Wszystkie przyszłe wiadomości będą automatycznie dodawane do podpisu.'
        ]},
    {id:3, mailName: 'WP poczta', imgSrc: wp, link: 'https://pomoc.wp.pl/jak-ustawic-sygnature', info: [
        'Aby ustawić sygnaturę kliknij zakładkę Opcje, następnie wybierz zakładkę Adresy i Sygnatury.',
            'Kliknij w przycisk "Dodaj nową sygnaturę"',
            'Wpisz nazwę i wypełnij treść, która będzie dołączana do wysyłanej wiadomości',
            'Sygnaturę należy dodawać każdorazowo do pisanej wiadomości.\n' +
            '\n' +
            'Klikając na opcje w mailu, a następnie: Wybierz sygnaturę'
        ]},
    {id:4, mailName: 'Onet poczta', imgSrc: onet, link: 'https://pomoc.poczta.onet.pl/baza-wiedzy/podpisy/', info: [
        'Zaloguj się do Onet Poczta',
            'Przejdź do sekcji Ustawienia (lewa strona ekranu, koło zębate).',
            'Na górze ekranu wybierz Podpisy.',
            'Na dole ekranu kliknij Dodaj podpis.',
            '(Możesz dodać 3 podpisy do wiadomości. Po zapisaniu pierwszy podpis będzie podpisem domyślnym. ' +
            'Jeśli masz więcej podpisów możesz wskazać który ma być domyślnie dodawany do każdej wiadomości.)'

        ]},
    {id:5, mailName: 'Interia', imgSrc: interia, link: 'https://pomoc.poczta.interia.pl/news-jak-ustawic-podpis-w-wysylanych-wiadomosciach,nId,2136278', info: [
        'Aby włączyć Podpis na swoim koncie wystarczy w nowej wiadomości z rozwijanego menu Podpis wybrać nowy podpis',
            'i uzupełnić pola nazwa i tekst podpisu:',
            'To co wpiszesz w polu tekst będzie się od tego momentu donmyślnie pojawiać jako Twój podpis w wysyłanych wiadomościach.',
            'Od tej pory do każdej Twojej wiadomości pod treścią dołączony będzie tekst, który wpisałaś/wpisałeś.\n' +
            '\n' +
            'Jeśli korzystasz z kilku podpisów zamiennie, masz możliwość przełączenia ich w momencie pisania wiadomości.'
        ]},
    {id:6, mailName: 'Yahoo!', imgSrc: yahoo, link: 'https://pol.go-travels.com/81025-set-up-yahoo-email-signature-1174491-8504098', info: [
        'Otwórz pocztę Yahoo.',
            'Kliknij Ustawieniai kona w prawym górnym rogu ekranu.',
            'Z menu kliknij Więcej Ustawienia.',
            'W lewym menu kliknij Pisanie wiadomości e-mail.',
            'W sekcji Pisanie wiadomości e-mail po prawej stronie menu, w obszarze Podpisuj, zlokalizuj konto Yahoo Mail, ' +
            'do którego chcesz dodać podpis, i kliknij przełącznik po jego prawej stronie. Ta czynność otwiera pod nią pole tekstowe.',
            'W polu tekstowym wprowadź podpis wiadomości e-mail, który chcesz dołączyć do wiadomości e-mail wysyłanych z tego konta.',
            'Po zakończeniu wprowadzania podpisu i zadowoleniu z jego wyglądu kliknij Wróć do skrzynki odbiorczejw lewym górnym rogu.' +
            ' Twój podpis jest zapisywany automatycznie, więc nie ma przycisku zapisu, który musisz nacisnąć.'

        ]},
    {id:7, mailName: 'ProtonMail', imgSrc: protonmail, link: 'https://cloudo3.com/pl/internet/protonmail-jak-dodac-w%C5%82asny-podpis/33300444', info: [
        'Aby zmienić swój podpis w aplikacji mobilnej, musisz najpierw dotknąć ikony menu burgera w lewym górnym rogu, a następnie dotknąć „Ustawienia”.',
            'W ustawieniach dotknij nazwy swojego konta u góry, a następnie dotknij "Wyświetlana nazwa i podpis".',
            'W polu „Podpis” wprowadź tekst, który chcesz automatycznie dołączyć na końcu wiadomości, a następnie dotknij suwaka w pozycji włączonej.',
            'Na stronie proces jest zasadniczo taki sam jak w aplikacji mobilnej. Kliknij „Ustawienia” na górnym pasku, a następnie wpisz pole „Podpis”, ' +
            'które można znaleźć w lewej górnej części domyślnej zakładki „Konto”. ' +
            'Po wprowadzeniu zmian, które chcesz w swoim podpisie, kliknij „Zapisz”, aby zapisać zmianę.'
        ]},
    {id:8, mailName: 'ThunderBird', imgSrc: thunder, link: 'https://domenomania.pl/centrum-wiedzy/jak-ustawic-automatyczny-podpis-w-mozilla-thunderbird', info: [
            'Aby dodać podpis do wiadomości w Mozilla Thunderbird, uruchom program pocztowy.',
            'Po uruchomieniu, kliknij na klawiaturze przycisk Alt. W górnej części okna programu pojawi się dodatkowe menu. ' +
            'Wybierz z niego zakładkę Narzędzia, a następnie Konfiguracja kont.W Mozilla Thunderbird przejdź do Narzędzia - Konfiguracja kont',
            'Teraz w zakładce głównej w polu Sygnaturka, wpisz treść swojego podpisu, a następnie kliknij przycisk OK.',
            'Jeśli chcesz użyć tagów HTML zaznacz opcję Używaj HTML.',
            'Jeśli zaś posiadasz stopkę przygotowaną w zewnętrznym pliku tekstowym lub w pliku HTML zaznacz opcję Używaj treści z pliku, a następnie kliknij przycisk Wybierz, ' +
            'aby wskazać jego lokalizację. Potem kliknij przycisk OK.',
            'To wszystko! Od teraz do wysyłanych przez Ciebie wiadomości będzie dołączana sygnaturka.',
        ]},
    {id:9, mailName: 'Inna', imgSrc: inna, link: 'https://www.google.com/', info: [
        'Dla innych poczt niż wymienione użyć Google.'
        ]},
];
export default mailData;