import type { Experience } from "@/data/inventory";
import { categories, destinations, faqs, reviews } from "@/data/inventory";
import type { Locale } from "./index";

type ExperienceCopy = {
  titles: Record<string, string>;
  summaries: Record<string, string>;
  detail: string;
  departure: string;
  departureText: string;
  explore: string;
  exploreText: string;
  swim: string;
  swimText: string;
  lunch: string;
  lunchText: string;
  return: string;
  returnText: string;
  included: string[];
  notIncluded: string[];
  privateBoat: string;
  sharedBoat: string;
  rentalBoat: string;
  operatorRole: string;
  operatorBlurb: string;
  meeting: string;
  extras: string[];
};

const titles = (values: string[]) =>
  Object.fromEntries(
    [
      "kornati-private-escape",
      "dugi-otok-sakarun",
      "hidden-bays-ugljan",
      "sunset-sailing-zadar",
      "rib-with-skipper",
      "telascica-sea-cliffs",
    ].map((slug, index) => [slug, values[index] ?? slug]),
  );

const summaries = titles;

const experienceCopy: Record<Locale, ExperienceCopy> = {
  en: {
    titles: titles([
      "Kornati Private Escape",
      "Dugi Otok & Sakarun",
      "Hidden Bays of Ugljan",
      "Sunset Sailing from Zadar",
      "Rent a RIB with Skipper",
      "Telašćica & Sea Cliffs",
    ]),
    summaries: summaries([
      "A slow private day among the bare islands and clear bays of Kornati.",
      "White pebbles, shallow turquoise water and a relaxed day on Dugi Otok.",
      "Quiet coves, olive terraces and fishing villages just across from Zadar.",
      "Sail past Zadar as the waterfront turns gold, with wine and a local crew.",
      "Build your own route around Zadar with a fast RIB and local skipper.",
      "Dramatic cliffs, the warm salt lake Mir and protected Telašćica bay.",
    ]),
    detail:
      "The route is adapted to your group and to conditions at sea. Your local skipper chooses the calmest bays and keeps enough time for swimming, shade and an unhurried day.",
    departure: "Meet and depart",
    departureText: "Welcome, safety briefing and a look at the route with your skipper.",
    explore: "Explore the islands",
    exploreText: "Cruise toward the destination and discover the coast from the sea.",
    swim: "Swim stop",
    swimText: "Time for swimming and snorkelling in a sheltered bay.",
    lunch: "Lunch and free time",
    lunchText: "Relax at anchor or visit a local konoba when the route allows.",
    return: "Return to Zadar",
    returnText: "An easy cruise back to the departure point.",
    included: [
      "Boat for the booked route",
      "Licensed local skipper",
      "Fuel for the standard route",
      "Safety and snorkel equipment",
      "Water and ice",
    ],
    notIncluded: [
      "Food and additional drinks",
      "Park or mooring fees where applicable",
      "Gratuity",
    ],
    privateBoat: "Private motorboat",
    sharedBoat: "Sailing yacht",
    rentalBoat: "RIB motorboat",
    operatorRole: "Local skipper & host",
    operatorBlurb:
      "A local operator who knows the Zadar channels, islands and quiet bays, and personally confirms every request.",
    meeting: "The exact pier and arrival instructions are sent with your confirmation.",
    extras: ["Shade", "Swim ladder", "Snorkel gear", "Cooler", "Safety equipment"],
  },
  hr: {
    titles: titles([
      "Privatni bijeg u Kornate",
      "Dugi Otok i Sakarun",
      "Skrivene uvale Ugljana",
      "Jedrenje u zalazak sunca iz Zadra",
      "Najam RIB-a sa skiperom",
      "Telašćica i morske litice",
    ]),
    summaries: summaries([
      "Polagan privatni dan među kamenim otocima i kristalnim uvalama Kornata.",
      "Bijeli obluci, plitko tirkizno more i opušten dan na Dugom otoku.",
      "Mirne uvale, maslinici i ribarska mjesta odmah preko puta Zadra.",
      "Jedrite uz Zadar dok riva postaje zlatna, uz vino i lokalnu posadu.",
      "Složite vlastitu rutu oko Zadra brzim RIB-om i lokalnim skiperom.",
      "Dramatične litice, toplo slano jezero Mir i zaštićena uvala Telašćice.",
    ]),
    detail:
      "Ruta se prilagođava vašoj grupi i uvjetima na moru. Lokalni skiper bira najmirnije uvale i ostavlja dovoljno vremena za kupanje, hlad i opušten dan.",
    departure: "Susret i polazak",
    departureText: "Dobrodošlica, kratke sigurnosne upute i pregled rute sa skiperom.",
    explore: "Istraživanje otoka",
    exploreText: "Plovidba prema odredištu i upoznavanje obale s mora.",
    swim: "Stanka za kupanje",
    swimText: "Vrijeme za kupanje i ronjenje u zaštićenoj uvali.",
    lunch: "Ručak i slobodno vrijeme",
    lunchText: "Odmorite se na sidru ili posjetite lokalnu konobu kada ruta dopušta.",
    return: "Povratak u Zadar",
    returnText: "Lagana plovidba natrag do mjesta polaska.",
    included: [
      "Brod za ugovorenu rutu",
      "Licencirani lokalni skiper",
      "Gorivo za standardnu rutu",
      "Sigurnosna oprema i oprema za ronjenje",
      "Voda i led",
    ],
    notIncluded: ["Hrana i dodatna pića", "Ulaznice za park ili vez kada su potrebni", "Napojnica"],
    privateBoat: "Privatni motorni brod",
    sharedBoat: "Jedrilica",
    rentalBoat: "RIB motorni brod",
    operatorRole: "Lokalni skiper i domaćin",
    operatorBlurb:
      "Lokalni operater koji poznaje zadarske kanale, otoke i mirne uvale te osobno potvrđuje svaki upit.",
    meeting: "Točan gat i upute za dolazak stižu s potvrdom.",
    extras: ["Hlad", "Ljestve za kupanje", "Oprema za ronjenje", "Hladnjak", "Sigurnosna oprema"],
  },
  sl: {
    titles: titles([
      "Zasebni pobeg na Kornate",
      "Dugi Otok in Sakarun",
      "Skriti zalivi Ugljana",
      "Jadranje ob sončnem zahodu iz Zadra",
      "Najem RIB-a s skiperjem",
      "Telašćica in morske pečine",
    ]),
    summaries: summaries([
      "Počasen zasebni dan med kamnitimi otoki in kristalnimi zalivi Kornatov.",
      "Beli prodniki, plitvo turkizno morje in sproščen dan na Dugem otoku.",
      "Mirni zalivi, oljčni nasadi in ribiške vasi tik nasproti Zadra.",
      "Jadrajte mimo Zadra, ko obala postane zlata, z vinom in lokalno posadko.",
      "Sestavite svojo pot okoli Zadra s hitrim RIB-om in lokalnim skiperjem.",
      "Dramatične pečine, toplo slano jezero Mir in zaščiten zaliv Telašćice.",
    ]),
    detail:
      "Pot se prilagodi vaši skupini in razmeram na morju. Lokalni skiper izbere najmirnejše zalive ter pusti dovolj časa za plavanje, senco in sproščen dan.",
    departure: "Srečanje in odhod",
    departureText: "Dobrodošlica, kratka varnostna navodila in pregled poti s skiperjem.",
    explore: "Raziskovanje otokov",
    exploreText: "Plovba proti cilju in odkrivanje obale z morja.",
    swim: "Postanek za kopanje",
    swimText: "Čas za plavanje in snorkljanje v zavetnem zalivu.",
    lunch: "Kosilo in prosti čas",
    lunchText: "Sprostite se na sidru ali obiščite lokalno konobo, kadar pot to omogoča.",
    return: "Povratek v Zadar",
    returnText: "Mirna plovba nazaj do izhodišča.",
    included: [
      "Plovilo za dogovorjeno pot",
      "Licencirani lokalni skiper",
      "Gorivo za standardno pot",
      "Varnostna oprema in oprema za snorkljanje",
      "Voda in led",
    ],
    notIncluded: ["Hrana in dodatne pijače", "Vstopnine ali pristojbine za privez", "Napitnina"],
    privateBoat: "Zasebno motorno plovilo",
    sharedBoat: "Jadrnica",
    rentalBoat: "Motorni RIB",
    operatorRole: "Lokalni skiper in gostitelj",
    operatorBlurb:
      "Lokalni ponudnik, ki pozna zadarske kanale, otoke in mirne zalive ter osebno potrdi vsako povpraševanje.",
    meeting: "Točen pomol in navodila za prihod prejmete s potrditvijo.",
    extras: [
      "Senca",
      "Lestev za kopanje",
      "Oprema za snorkljanje",
      "Hladilnik",
      "Varnostna oprema",
    ],
  },
  de: {
    titles: titles([
      "Private Auszeit in den Kornaten",
      "Dugi Otok & Sakarun",
      "Versteckte Buchten von Ugljan",
      "Segeln bei Sonnenuntergang ab Zadar",
      "RIB mit Skipper mieten",
      "Telašćica & Meeresklippen",
    ]),
    summaries: summaries([
      "Ein ruhiger privater Tag zwischen den kargen Inseln und klaren Buchten der Kornaten.",
      "Weiße Kiesel, flaches türkisfarbenes Wasser und ein entspannter Tag auf Dugi Otok.",
      "Ruhige Buchten, Olivenhaine und Fischerdörfer direkt gegenüber von Zadar.",
      "Segeln Sie an Zadar vorbei, während die Uferpromenade golden wird – mit Wein und lokaler Crew.",
      "Gestalten Sie Ihre eigene Route rund um Zadar mit einem schnellen RIB und lokalem Skipper.",
      "Dramatische Klippen, der warme Salzsee Mir und die geschützte Bucht Telašćica.",
    ]),
    detail:
      "Die Route wird an Ihre Gruppe und die Bedingungen auf See angepasst. Ihr lokaler Skipper wählt die ruhigsten Buchten und plant genug Zeit zum Schwimmen, für Schatten und einen entspannten Tag ein.",
    departure: "Treffen und Abfahrt",
    departureText: "Begrüßung, kurze Sicherheitseinweisung und Routenbesprechung mit dem Skipper.",
    explore: "Inseln entdecken",
    exploreText: "Fahrt zum Ziel und Entdeckung der Küste vom Meer aus.",
    swim: "Badestopp",
    swimText: "Zeit zum Schwimmen und Schnorcheln in einer geschützten Bucht.",
    lunch: "Mittagessen und Freizeit",
    lunchText:
      "Entspannen Sie vor Anker oder besuchen Sie eine lokale Konoba, wenn die Route es erlaubt.",
    return: "Rückkehr nach Zadar",
    returnText: "Entspannte Rückfahrt zum Ausgangspunkt.",
    included: [
      "Boot für die gebuchte Route",
      "Lizenzierter lokaler Skipper",
      "Kraftstoff für die Standardroute",
      "Sicherheits- und Schnorchelausrüstung",
      "Wasser und Eis",
    ],
    notIncluded: [
      "Essen und zusätzliche Getränke",
      "Park- oder Liegegebühren, falls erforderlich",
      "Trinkgeld",
    ],
    privateBoat: "Privates Motorboot",
    sharedBoat: "Segelyacht",
    rentalBoat: "RIB-Motorboot",
    operatorRole: "Lokaler Skipper & Gastgeber",
    operatorBlurb:
      "Ein lokaler Anbieter, der Zadars Kanäle, Inseln und ruhige Buchten kennt und jede Anfrage persönlich bestätigt.",
    meeting: "Den genauen Steg und die Anreisehinweise erhalten Sie mit der Bestätigung.",
    extras: [
      "Sonnenschutz",
      "Badeleiter",
      "Schnorchelausrüstung",
      "Kühlbox",
      "Sicherheitsausrüstung",
    ],
  },
  pl: {
    titles: titles([
      "Prywatna wyprawa na Kornati",
      "Dugi Otok i Sakarun",
      "Ukryte zatoki Ugljanu",
      "Rejs o zachodzie słońca z Zadaru",
      "Wynajem RIB-a ze skipperem",
      "Telašćica i morskie klify",
    ]),
    summaries: summaries([
      "Spokojny prywatny dzień wśród skalistych wysp i czystych zatok Kornati.",
      "Białe kamyki, płytka turkusowa woda i relaksujący dzień na Dugi Otok.",
      "Ciche zatoki, gaje oliwne i rybackie wioski tuż naprzeciwko Zadaru.",
      "Rejs obok Zadaru, gdy nabrzeże nabiera złotego koloru, z winem i lokalną załogą.",
      "Ułóż własną trasę wokół Zadaru szybkim RIB-em z lokalnym skipperem.",
      "Dramatyczne klify, ciepłe słone jezioro Mir i chroniona zatoka Telašćica.",
    ]),
    detail:
      "Trasa jest dopasowana do grupy i warunków na morzu. Lokalny skipper wybiera najspokojniejsze zatoki i zostawia dużo czasu na kąpiel, cień i niespieszny dzień.",
    departure: "Spotkanie i wypłynięcie",
    departureText: "Powitanie, krótkie zasady bezpieczeństwa i omówienie trasy ze skipperem.",
    explore: "Odkrywanie wysp",
    exploreText: "Rejs do celu i poznawanie wybrzeża od strony morza.",
    swim: "Przystanek na kąpiel",
    swimText: "Czas na pływanie i snorkeling w osłoniętej zatoce.",
    lunch: "Lunch i czas wolny",
    lunchText: "Odpoczynek na kotwicy lub wizyta w lokalnej konobie, jeśli trasa na to pozwala.",
    return: "Powrót do Zadaru",
    returnText: "Spokojny rejs z powrotem do miejsca wypłynięcia.",
    included: [
      "Łódź na uzgodnioną trasę",
      "Licencjonowany lokalny skipper",
      "Paliwo na standardową trasę",
      "Sprzęt bezpieczeństwa i do snorkelingu",
      "Woda i lód",
    ],
    notIncluded: ["Jedzenie i dodatkowe napoje", "Opłaty parkowe lub cumownicze", "Napiwek"],
    privateBoat: "Prywatna łódź motorowa",
    sharedBoat: "Jacht żaglowy",
    rentalBoat: "Motorowy RIB",
    operatorRole: "Lokalny skipper i gospodarz",
    operatorBlurb:
      "Lokalny operator, który zna zadarskie kanały, wyspy i spokojne zatoki oraz osobiście potwierdza każde zapytanie.",
    meeting: "Dokładny pomost i instrukcje dojścia otrzymasz w potwierdzeniu.",
    extras: [
      "Zadaszenie",
      "Drabinka kąpielowa",
      "Sprzęt do snorkelingu",
      "Lodówka",
      "Wyposażenie bezpieczeństwa",
    ],
  },
  hu: {
    titles: titles([
      "Privát kirándulás a Kornati-szigetekre",
      "Dugi Otok és Sakarun",
      "Ugljan rejtett öblei",
      "Naplementés vitorlázás Zadarból",
      "RIB-bérlés skipperrel",
      "Telašćica és a tengeri sziklák",
    ]),
    summaries: summaries([
      "Nyugodt privát nap a Kornati kopár szigetei és tiszta öblei között.",
      "Fehér kavicsok, sekély türkiz víz és pihentető nap Dugi Otokon.",
      "Csendes öblök, olajfaligetek és halászfalvak Zadarral szemben.",
      "Vitorlázzon el Zadar mellett, miközben a part aranyszínűvé válik, borral és helyi legénységgel.",
      "Állítsa össze saját útvonalát Zadar körül egy gyors RIB-bel és helyi skipperrel.",
      "Látványos sziklák, a meleg Mir sós tó és Telašćica védett öble.",
    ]),
    detail:
      "Az útvonalat a csoporthoz és a tengeri viszonyokhoz igazítjuk. A helyi skipper a legnyugodtabb öblöket választja, és bőven hagy időt úszásra, árnyékra és pihenésre.",
    departure: "Találkozás és indulás",
    departureText: "Üdvözlés, rövid biztonsági tájékoztató és az útvonal áttekintése a skipperrel.",
    explore: "A szigetek felfedezése",
    exploreText: "Hajózás a cél felé és a part megismerése a tenger felől.",
    swim: "Úszószünet",
    swimText: "Idő úszásra és sznorkelezésre egy védett öbölben.",
    lunch: "Ebéd és szabadidő",
    lunchText: "Pihenjen horgonyon, vagy látogasson el egy helyi konobába, ha az útvonal engedi.",
    return: "Visszatérés Zadarba",
    returnText: "Nyugodt hajózás vissza az indulási pontra.",
    included: [
      "Hajó a lefoglalt útvonalra",
      "Engedéllyel rendelkező helyi skipper",
      "Üzemanyag a standard útvonalra",
      "Biztonsági és sznorkelfelszerelés",
      "Víz és jég",
    ],
    notIncluded: ["Étel és további italok", "Park- vagy kikötési díjak", "Borravaló"],
    privateBoat: "Privát motorcsónak",
    sharedBoat: "Vitorlás jacht",
    rentalBoat: "RIB motorcsónak",
    operatorRole: "Helyi skipper és házigazda",
    operatorBlurb:
      "Helyi szolgáltató, aki ismeri Zadar csatornáit, szigeteit és csendes öbleit, és személyesen igazol vissza minden kérelmet.",
    meeting: "A pontos mólót és az érkezési útmutatót a visszaigazolással küldjük.",
    extras: [
      "Árnyékolás",
      "Fürdőlétra",
      "Sznorkelfelszerelés",
      "Hűtőláda",
      "Biztonsági felszerelés",
    ],
  },
  sk: {
    titles: titles([
      "Súkromný únik na Kornati",
      "Dugi Otok a Sakarun",
      "Skryté zátoky Ugljanu",
      "Plavba pri západe slnka zo Zadaru",
      "Prenájom RIB-u so skipperom",
      "Telašćica a morské útesy",
    ]),
    summaries: summaries([
      "Pokojný súkromný deň medzi skalnatými ostrovmi a čistými zátokami Kornati.",
      "Biele okruhliaky, plytká tyrkysová voda a oddychový deň na Dugi Otok.",
      "Tiché zátoky, olivové háje a rybárske dedinky priamo oproti Zadaru.",
      "Plavba popri Zadare, keď sa pobrežie sfarbí dozlatista, s vínom a miestnou posádkou.",
      "Vytvorte si vlastnú trasu okolo Zadaru s rýchlym RIB-om a miestnym skipperom.",
      "Dramatické útesy, teplé slané jazero Mir a chránená zátoka Telašćica.",
    ]),
    detail:
      "Trasa sa prispôsobí vašej skupine a podmienkam na mori. Miestny skipper vyberie najpokojnejšie zátoky a nechá dosť času na plávanie, tieň a pohodový deň.",
    departure: "Stretnutie a odchod",
    departureText: "Privítanie, krátke bezpečnostné pokyny a prehľad trasy so skipperom.",
    explore: "Objavovanie ostrovov",
    exploreText: "Plavba k cieľu a spoznávanie pobrežia z mora.",
    swim: "Zastávka na kúpanie",
    swimText: "Čas na plávanie a šnorchlovanie v chránenej zátoke.",
    lunch: "Obed a voľný čas",
    lunchText: "Oddych na kotve alebo návšteva miestnej konoby, ak to trasa umožňuje.",
    return: "Návrat do Zadaru",
    returnText: "Pokojná plavba späť na miesto odchodu.",
    included: [
      "Loď na dohodnutú trasu",
      "Licencovaný miestny skipper",
      "Palivo na štandardnú trasu",
      "Bezpečnostná a šnorchlovacia výbava",
      "Voda a ľad",
    ],
    notIncluded: ["Jedlo a ďalšie nápoje", "Poplatky za park alebo kotvenie", "Prepitné"],
    privateBoat: "Súkromný motorový čln",
    sharedBoat: "Plachetnica",
    rentalBoat: "Motorový RIB",
    operatorRole: "Miestny skipper a hostiteľ",
    operatorBlurb:
      "Miestny prevádzkovateľ, ktorý pozná zadarské kanály, ostrovy a pokojné zátoky a osobne potvrdzuje každý dopyt.",
    meeting: "Presné mólo a pokyny k príchodu dostanete s potvrdením.",
    extras: [
      "Tieň",
      "Rebrík na kúpanie",
      "Šnorchlovacia výbava",
      "Chladiaci box",
      "Bezpečnostná výbava",
    ],
  },
  cs: {
    titles: titles([
      "Soukromý únik na Kornati",
      "Dugi Otok a Sakarun",
      "Skryté zátoky Ugljanu",
      "Plavba při západu slunce ze Zadaru",
      "Pronájem RIBu se skipperem",
      "Telašćica a mořské útesy",
    ]),
    summaries: summaries([
      "Klidný soukromý den mezi skalnatými ostrovy a čistými zátokami Kornati.",
      "Bílé oblázky, mělká tyrkysová voda a pohodový den na Dugi Otok.",
      "Tiché zátoky, olivové háje a rybářské vesnice přímo naproti Zadaru.",
      "Plavba kolem Zadaru, když se pobřeží zbarví dozlatova, s vínem a místní posádkou.",
      "Vytvořte si vlastní trasu kolem Zadaru s rychlým RIBem a místním skipperem.",
      "Dramatické útesy, teplé slané jezero Mir a chráněná zátoka Telašćica.",
    ]),
    detail:
      "Trasa se přizpůsobí vaší skupině a podmínkám na moři. Místní skipper vybere nejklidnější zátoky a nechá dost času na plavání, stín a pohodový den.",
    departure: "Setkání a odjezd",
    departureText: "Přivítání, krátké bezpečnostní pokyny a přehled trasy se skipperem.",
    explore: "Objevování ostrovů",
    exploreText: "Plavba k cíli a poznávání pobřeží z moře.",
    swim: "Zastávka na koupání",
    swimText: "Čas na plavání a šnorchlování v chráněné zátoce.",
    lunch: "Oběd a volný čas",
    lunchText: "Odpočinek na kotvě nebo návštěva místní konoby, pokud to trasa umožňuje.",
    return: "Návrat do Zadaru",
    returnText: "Klidná plavba zpět na místo odjezdu.",
    included: [
      "Loď pro dohodnutou trasu",
      "Licencovaný místní skipper",
      "Palivo pro standardní trasu",
      "Bezpečnostní a šnorchlovací vybavení",
      "Voda a led",
    ],
    notIncluded: ["Jídlo a další nápoje", "Poplatky za park nebo kotvení", "Spropitné"],
    privateBoat: "Soukromý motorový člun",
    sharedBoat: "Plachetnice",
    rentalBoat: "Motorový RIB",
    operatorRole: "Místní skipper a hostitel",
    operatorBlurb:
      "Místní provozovatel, který zná zadarské kanály, ostrovy a klidné zátoky a osobně potvrzuje každou poptávku.",
    meeting: "Přesné molo a pokyny k příjezdu obdržíte s potvrzením.",
    extras: [
      "Stín",
      "Žebřík na koupání",
      "Šnorchlovací vybavení",
      "Chladicí box",
      "Bezpečnostní vybavení",
    ],
  },
  fr: {
    titles: titles([
      "Escapade privée dans les Kornati",
      "Dugi Otok et Sakarun",
      "Criques secrètes d'Ugljan",
      "Voile au coucher du soleil depuis Zadar",
      "Location de RIB avec skipper",
      "Telašćica et falaises marines",
    ]),
    summaries: summaries([
      "Une journée privée paisible entre les îles rocheuses et les criques limpides des Kornati.",
      "Galets blancs, eau turquoise peu profonde et journée détendue sur Dugi Otok.",
      "Criques calmes, oliveraies et villages de pêcheurs juste en face de Zadar.",
      "Naviguez devant Zadar quand le front de mer devient doré, avec du vin et un équipage local.",
      "Composez votre propre itinéraire autour de Zadar avec un RIB rapide et un skipper local.",
      "Falaises spectaculaires, lac salé chaud de Mir et baie protégée de Telašćica.",
    ]),
    detail:
      "L'itinéraire s'adapte à votre groupe et aux conditions en mer. Votre skipper local choisit les criques les plus calmes et prévoit assez de temps pour nager, profiter de l'ombre et vivre une journée sans hâte.",
    departure: "Accueil et départ",
    departureText:
      "Bienvenue, bref rappel de sécurité et présentation de l'itinéraire avec le skipper.",
    explore: "Découverte des îles",
    exploreText: "Navigation vers la destination et découverte de la côte depuis la mer.",
    swim: "Pause baignade",
    swimText: "Temps libre pour nager et faire du snorkeling dans une crique abritée.",
    lunch: "Déjeuner et temps libre",
    lunchText: "Détente au mouillage ou visite d'une konoba locale lorsque l'itinéraire le permet.",
    return: "Retour à Zadar",
    returnText: "Navigation tranquille jusqu'au point de départ.",
    included: [
      "Bateau pour l'itinéraire réservé",
      "Skipper local titulaire d'une licence",
      "Carburant pour l'itinéraire standard",
      "Équipement de sécurité et de snorkeling",
      "Eau et glace",
    ],
    notIncluded: ["Repas et boissons supplémentaires", "Frais de parc ou d'amarrage", "Pourboire"],
    privateBoat: "Bateau à moteur privé",
    sharedBoat: "Voilier",
    rentalBoat: "RIB à moteur",
    operatorRole: "Skipper local et hôte",
    operatorBlurb:
      "Un opérateur local qui connaît les chenaux, les îles et les criques tranquilles de Zadar et confirme personnellement chaque demande.",
    meeting: "Le ponton exact et les indications d'arrivée sont envoyés avec votre confirmation.",
    extras: [
      "Ombre",
      "Échelle de bain",
      "Équipement de snorkeling",
      "Glacière",
      "Équipement de sécurité",
    ],
  },
  es: {
    titles: titles([
      "Escapada privada por Kornati",
      "Dugi Otok y Sakarun",
      "Calas secretas de Ugljan",
      "Navegación al atardecer desde Zadar",
      "Alquiler de RIB con patrón",
      "Telašćica y acantilados marinos",
    ]),
    summaries: summaries([
      "Un día privado y tranquilo entre las islas rocosas y las calas transparentes de Kornati.",
      "Guijarros blancos, agua turquesa poco profunda y un día relajado en Dugi Otok.",
      "Calas tranquilas, olivares y pueblos pesqueros justo enfrente de Zadar.",
      "Navega junto a Zadar mientras el paseo marítimo se vuelve dorado, con vino y tripulación local.",
      "Crea tu propia ruta por Zadar con una RIB rápida y un patrón local.",
      "Acantilados espectaculares, el cálido lago salado Mir y la bahía protegida de Telašćica.",
    ]),
    detail:
      "La ruta se adapta a tu grupo y a las condiciones del mar. El patrón local elige las calas más tranquilas y deja tiempo suficiente para nadar, descansar a la sombra y disfrutar sin prisas.",
    departure: "Encuentro y salida",
    departureText: "Bienvenida, breve explicación de seguridad y repaso de la ruta con el patrón.",
    explore: "Explorar las islas",
    exploreText: "Navegación hacia el destino y descubrimiento de la costa desde el mar.",
    swim: "Parada para nadar",
    swimText: "Tiempo para nadar y hacer snorkel en una cala protegida.",
    lunch: "Almuerzo y tiempo libre",
    lunchText: "Descansa fondeado o visita una konoba local cuando la ruta lo permita.",
    return: "Regreso a Zadar",
    returnText: "Navegación tranquila de vuelta al punto de salida.",
    included: [
      "Barco para la ruta reservada",
      "Patrón local con licencia",
      "Combustible para la ruta estándar",
      "Equipo de seguridad y snorkel",
      "Agua y hielo",
    ],
    notIncluded: ["Comida y bebidas adicionales", "Tasas de parque o amarre", "Propina"],
    privateBoat: "Barco a motor privado",
    sharedBoat: "Velero",
    rentalBoat: "RIB a motor",
    operatorRole: "Patrón local y anfitrión",
    operatorBlurb:
      "Un operador local que conoce los canales, islas y calas tranquilas de Zadar y confirma personalmente cada solicitud.",
    meeting: "El muelle exacto y las indicaciones se envían con la confirmación.",
    extras: ["Sombra", "Escalera de baño", "Equipo de snorkel", "Nevera", "Equipo de seguridad"],
  },
};

export function localizeExperience(experience: Experience, locale: Locale): Experience {
  if (locale === "en") return experience;
  const c = experienceCopy[locale];
  const itinerary = experience.itinerary.map((step, index) => {
    const isLast = index === experience.itinerary.length - 1;
    const isLunch =
      /lunch|konoba/i.test(step.title) || index === Math.floor(experience.itinerary.length / 2);
    const isSwim = /swim|cove|beach|lake/i.test(step.title);
    const item: [string, string] =
      index === 0
        ? [c.departure, c.departureText]
        : isLast
          ? [c.return, c.returnText]
          : isLunch
            ? [c.lunch, c.lunchText]
            : isSwim
              ? [c.swim, c.swimText]
              : [c.explore, c.exploreText];
    return {
      ...step,
      time: /^\d/.test(step.time) ? step.time : String(index + 1).padStart(2, "0"),
      title: item[0],
      text: item[1],
    };
  });
  const boatType =
    experience.category === "Shared trip"
      ? c.sharedBoat
      : experience.category === "Rental"
        ? c.rentalBoat
        : c.privateBoat;
  return {
    ...experience,
    title: c.titles[experience.slug] ?? experience.title,
    summary: c.summaries[experience.slug] ?? experience.summary,
    location: experience.location.replace("Departs Zadar", "Zadar"),
    description: [c.summaries[experience.slug] ?? experience.summary, c.detail],
    itinerary,
    included: c.included,
    notIncluded: c.notIncluded,
    meeting: c.meeting,
    boat: {
      ...experience.boat,
      type: boatType,
      engine: experience.boat.engine.match(/\d+\s*hp/i)?.[0] ?? "Diesel",
      extras: c.extras,
    },
    operator: {
      ...experience.operator,
      role: c.operatorRole,
      since: "",
      replies: "",
      blurb: c.operatorBlurb,
    },
  };
}

type HomeData = {
  categories: typeof categories;
  destinations: typeof destinations;
  reviews: typeof reviews;
  faqs: typeof faqs;
};

const homeCopy: Record<
  Exclude<Locale, "en">,
  {
    categories: [string, string][];
    destinationTexts: string[];
    contexts: string[];
    reviewTexts: string[];
    countries: string[];
    dates: string[];
    faq: [string, string][];
  }
> = {
  hr: {
    categories: [
      ["Plivajte i usporite", "Uvale, hlad i bez žurbe"],
      ["Otkrijte otoke", "Kornati, Dugi Otok, Telašćica"],
      ["Neka bude privatno", "Samo vaša grupa i skiper"],
      ["Ulovite zalazak", "Dva i pol sata pod jedrima"],
    ],
    destinationTexts: [
      "Osamdeset devet kamenih otoka i najmirnije more u Hrvatskoj.",
      "Bijeli obluci Sakaruna i obala tihih zapadnih uvala.",
      "Maslinici, ribarska mjesta i zadarski otoci za kupanje.",
      "Morske litice, uvala poput fjorda i toplo slano jezero Mir.",
    ],
    contexts: [
      "1 h 15 min iz Zadra · Cijeli dan",
      "45 min iz Zadra · Cijeli dan",
      "15 min iz Zadra · Pola dana",
      "1 h iz Zadra · Cijeli dan",
    ],
    reviewTexts: [
      "Luka je zbog promjene vjetra prilagodio cijelu rutu i završili smo u uvali sa samo dva druga broda. Djeca su plivala šest sati. Vrijedilo je svakog eura.",
      "Ugašen motor, dvanaest ljudi, čaša vina i zadarska riva koja postaje narančasta. Rezervirali smo prve večeri i požalili što nismo išli dvaput.",
      "Imali smo kasni let i pola dana slobodno. Marin je odgovorio za deset minuta, dočekao nas na rivi i to je postao najbolji dio putovanja.",
    ],
    countries: ["Francuska", "Njemačka", "Irska"],
    dates: ["srpanj 2026.", "lipanj 2026.", "rujan 2025."],
    faq: [
      [
        "Je li skiper uključen?",
        "Da. Svaki brod na MAREVU uključuje licenciranog lokalnog skipera, osim ako je izričito navedeno da je riječ o najmu bez posade.",
      ],
      [
        "Je li gorivo uključeno u cijenu?",
        "Gorivo za standardnu rutu uključeno je u prikazanu cijenu. Svaki dodatni trošak za dužu rutu dogovara se prije polaska.",
      ],
      [
        "Što ako je vrijeme loše?",
        "Skiper donosi odluku večer prije ili ujutro. Ako more nije sigurno, nudimo drugi datum, zaštićenu rutu ili puni povrat.",
      ],
      [
        "Kakva su pravila otkazivanja?",
        "Većinu izleta možete besplatno otkazati do 48 sati prije polaska. Točni uvjeti prikazani su prije slanja upita.",
      ],
      [
        "Što trebam ponijeti?",
        "Kupaći kostim, ručnik, kremu za sunčanje, šešir i obuću s mekanim potplatom. Za hranu i piće provjerite opis ture.",
      ],
      [
        "Po čemu se upit razlikuje od instant rezervacije?",
        "Najprije šaljete datum i broj gostiju. Operater potvrđuje slobodan brod, a tek nakon toga slijedi plaćanje.",
      ],
    ],
  },
  sl: {
    categories: [
      ["Zaplavajte in upočasnite", "Zalivi, senca in brez naglice"],
      ["Odkrijte otoke", "Kornati, Dugi Otok, Telašćica"],
      ["Naj bo zasebno", "Samo vaša skupina in skiper"],
      ["Ujemite sončni zahod", "Dve uri in pol pod jadri"],
    ],
    destinationTexts: [
      "Devetinosemdeset kamnitih otokov in najmirnejše morje na Hrvaškem.",
      "Beli prodniki Sakaruna in obala tihih zahodnih zalivov.",
      "Oljčni nasadi, ribiške vasi in zadarski kopalni otoki.",
      "Morske pečine, fjordu podoben zaliv in toplo slano jezero Mir.",
    ],
    contexts: [
      "1 h 15 min iz Zadra · Ves dan",
      "45 min iz Zadra · Ves dan",
      "15 min iz Zadra · Pol dneva",
      "1 h iz Zadra · Ves dan",
    ],
    reviewTexts: [
      "Luka je zaradi vetra prilagodil pot in ves dan smo bili v zalivu le z dvema drugima ploviloma. Otroci so plavali šest ur. Vredno vsakega evra.",
      "Ugasnjen motor, dvanajst ljudi, kozarec vina in zadarska obala v oranžni barvi. Rezervirali smo prvi večer in žal nam je bilo, da nismo šli dvakrat.",
      "Imeli smo pozen let in pol dneva časa. Marin je odgovoril v desetih minutah, nas pričakal na rivi in izlet je postal najboljši del potovanja.",
    ],
    countries: ["Francija", "Nemčija", "Irska"],
    dates: ["julij 2026", "junij 2026", "september 2025"],
    faq: [
      [
        "Je skiper vključen?",
        "Da. Vsako plovilo na MAREVU vključuje licenciranega lokalnega skiperja, razen če je izrecno navedeno drugače.",
      ],
      [
        "Je gorivo vključeno v ceno?",
        "Gorivo za standardno pot je vključeno. Dodatni stroški daljše poti se dogovorijo pred odhodom.",
      ],
      [
        "Kaj se zgodi ob slabem vremenu?",
        "Skiper odloči večer prej ali zjutraj. Če morje ni varno, ponudimo drug datum, zavetno pot ali vračilo.",
      ],
      [
        "Kakšna je politika odpovedi?",
        "Večino izletov lahko brezplačno odpoveste do 48 ur pred odhodom. Točni pogoji so prikazani pred povpraševanjem.",
      ],
      [
        "Kaj naj vzamem s seboj?",
        "Kopalke, brisačo, kremo za sončenje, klobuk in čevlje z mehkim podplatom. Preverite opis izleta glede hrane in pijače.",
      ],
      [
        "Kako se povpraševanje razlikuje od takojšnje rezervacije?",
        "Najprej pošljete datum in število gostov. Ponudnik potrdi razpoložljivost, nato sledi plačilo.",
      ],
    ],
  },
  de: {
    categories: [
      ["Schwimmen & abschalten", "Buchten, Schatten und kein Zeitdruck"],
      ["Inseln entdecken", "Kornati, Dugi Otok, Telašćica"],
      ["Ganz privat", "Nur Ihre Gruppe und ein Skipper"],
      ["Dem Sonnenuntergang entgegen", "Zweieinhalb Stunden unter Segeln"],
    ],
    destinationTexts: [
      "Neunundachtzig karge Inseln und Kroatiens ruhigstes Wasser.",
      "Sakaruns weiße Kiesel und eine Küste voller stiller westlicher Buchten.",
      "Olivenhaine, Fischerdörfer und Zadars eigene Badeinseln.",
      "Meeresklippen, eine fjordähnliche Bucht und der warme Salzsee Mir.",
    ],
    contexts: [
      "1 Std. 15 Min. ab Zadar · Ganzer Tag",
      "45 Min. ab Zadar · Ganzer Tag",
      "15 Min. ab Zadar · Halber Tag",
      "1 Std. ab Zadar · Ganzer Tag",
    ],
    reviewTexts: [
      "Luka änderte wegen des Windes die ganze Route, und wir verbrachten den Tag in einer Bucht mit nur zwei anderen Booten. Unsere Kinder schwammen sechs Stunden. Jeden Euro wert.",
      "Motor aus, zwölf Menschen, ein Glas Wein und Zadars Uferpromenade in Orange. Wir buchten am ersten Abend und bereuten nur, es nicht zweimal gemacht zu haben.",
      "Wir hatten einen späten Flug und einen halben Tag Zeit. Marin antwortete in zehn Minuten, traf uns an der Riva und machte den Ausflug zum Höhepunkt der Reise.",
    ],
    countries: ["Frankreich", "Deutschland", "Irland"],
    dates: ["Juli 2026", "Juni 2026", "September 2025"],
    faq: [
      [
        "Ist ein Skipper inklusive?",
        "Ja. Jedes Boot auf Adriatic by Boat kommt mit einem lizenzierten lokalen Skipper, sofern nicht ausdrücklich etwas anderes angegeben ist.",
      ],
      [
        "Ist der Kraftstoff im Preis enthalten?",
        "Kraftstoff für die Standardroute ist inklusive. Zusätzliche Kosten für eine längere Route werden vor der Abfahrt vereinbart.",
      ],
      [
        "Was passiert bei schlechtem Wetter?",
        "Der Skipper entscheidet am Vorabend oder morgens. Bei unsicherer See gibt es einen Ersatztermin, eine geschützte Route oder eine Erstattung.",
      ],
      [
        "Welche Stornierungsbedingungen gelten?",
        "Die meisten Touren können bis 48 Stunden vor Abfahrt kostenlos storniert werden. Die genauen Bedingungen sehen Sie vor der Anfrage.",
      ],
      [
        "Was soll ich mitbringen?",
        "Badesachen, Handtuch, Sonnencreme, Hut und Schuhe mit weicher Sohle. Angaben zu Essen und Getränken finden Sie in der Tourbeschreibung.",
      ],
      [
        "Wie unterscheidet sich eine Anfrage von einer Sofortbuchung?",
        "Sie senden zuerst Datum und Gruppengröße. Der Anbieter bestätigt das freie Boot; erst danach erfolgt die Zahlung.",
      ],
    ],
  },
  pl: {
    categories: [
      ["Pływaj i zwolnij", "Zatoki, cień i zero pośpiechu"],
      ["Odkrywaj wyspy", "Kornati, Dugi Otok, Telašćica"],
      ["Tylko prywatnie", "Tylko twoja grupa i skipper"],
      ["Płyń za zachodem", "Dwie i pół godziny pod żaglami"],
    ],
    destinationTexts: [
      "Osiemdziesiąt dziewięć skalistych wysp i najspokojniejsze wody Chorwacji.",
      "Białe kamyki Sakaruna i wybrzeże cichych zachodnich zatok.",
      "Gaje oliwne, wioski rybackie i kąpielowe wyspy Zadaru.",
      "Morskie klify, zatoka jak fiord i ciepłe słone jezioro Mir.",
    ],
    contexts: [
      "1 godz. 15 min z Zadaru · Cały dzień",
      "45 min z Zadaru · Cały dzień",
      "15 min z Zadaru · Pół dnia",
      "1 godz. z Zadaru · Cały dzień",
    ],
    reviewTexts: [
      "Luka zmienił całą trasę z powodu wiatru i trafiliśmy do zatoki z zaledwie dwiema innymi łodziami. Dzieci pływały sześć godzin. Warto było każdej złotówki.",
      "Wyłączony silnik, dwanaście osób, kieliszek wina i pomarańczowe nabrzeże Zadaru. Zarezerwowaliśmy pierwszego wieczoru i żałowaliśmy tylko, że nie popłynęliśmy drugi raz.",
      "Mieliśmy późny lot i pół dnia wolnego. Marin odpowiedział w dziesięć minut, spotkał nas na nabrzeżu i wycieczka okazała się najlepszą częścią podróży.",
    ],
    countries: ["Francja", "Niemcy", "Irlandia"],
    dates: ["lipiec 2026", "czerwiec 2026", "wrzesień 2025"],
    faq: [
      [
        "Czy skipper jest w cenie?",
        "Tak. Każda łódź na Adriatic by Boat ma licencjonowanego lokalnego skippera, chyba że oferta wyraźnie mówi inaczej.",
      ],
      [
        "Czy paliwo jest w cenie?",
        "Paliwo na standardową trasę jest wliczone. Dodatkowy koszt dłuższej trasy jest uzgadniany przed wypłynięciem.",
      ],
      [
        "Co się dzieje przy złej pogodzie?",
        "Skipper podejmuje decyzję poprzedniego wieczoru lub rano. Oferujemy inny termin, osłoniętą trasę albo zwrot.",
      ],
      [
        "Jakie są zasady anulowania?",
        "Większość wycieczek można anulować bezpłatnie do 48 godzin przed wypłynięciem. Dokładne zasady są widoczne przed zapytaniem.",
      ],
      [
        "Co zabrać?",
        "Strój kąpielowy, ręcznik, krem przeciwsłoneczny, kapelusz i buty z miękką podeszwą. Informacje o jedzeniu są w opisie.",
      ],
      [
        "Czym zapytanie różni się od rezerwacji natychmiastowej?",
        "Najpierw wysyłasz datę i liczbę gości. Operator potwierdza dostępność łodzi, a dopiero potem płacisz.",
      ],
    ],
  },
  hu: {
    categories: [
      ["Ússzon és lassítson", "Öblök, árnyék és semmi sietség"],
      ["Fedezze fel a szigeteket", "Kornati, Dugi Otok, Telašćica"],
      ["Legyen privát", "Csak az Ön csoportja és a skipper"],
      ["Kövesse a naplementét", "Két és fél óra vitorlázás"],
    ],
    destinationTexts: [
      "Nyolcvankilenc kopár sziget és Horvátország legcsendesebb vizei.",
      "Sakarun fehér kavicsai és csendes nyugati öblök sora.",
      "Olajfaligetek, halászfalvak és Zadar saját fürdőszigetei.",
      "Tengeri sziklák, fjordszerű öböl és a meleg Mir sós tó.",
    ],
    contexts: [
      "1 óra 15 perc Zadarból · Egész nap",
      "45 perc Zadarból · Egész nap",
      "15 perc Zadarból · Fél nap",
      "1 óra Zadarból · Egész nap",
    ],
    reviewTexts: [
      "Luka a szél miatt átalakította az egész útvonalat, és egy öbölben kötöttünk ki, ahol csak két másik hajó volt. A gyerekek hat órát úsztak. Minden eurót megért.",
      "Leállított motor, tizenkét ember, egy pohár bor és narancsszínű zadari part. Az első estén foglaltuk, és csak azt bántuk, hogy nem mentünk kétszer.",
      "Késői járatunk volt, és maradt fél napunk. Marin tíz percen belül válaszolt, a riván találkozott velünk, és ez lett az út legjobb része.",
    ],
    countries: ["Franciaország", "Németország", "Írország"],
    dates: ["2026. július", "2026. június", "2025. szeptember"],
    faq: [
      [
        "A skipper benne van az árban?",
        "Igen. A Adriatic by Boat minden hajójához engedéllyel rendelkező helyi skipper tartozik, hacsak az ajánlat másként nem jelzi.",
      ],
      [
        "Az üzemanyag benne van az árban?",
        "A standard útvonal üzemanyaga benne van. A hosszabb út többletköltségét indulás előtt egyeztetik.",
      ],
      [
        "Mi történik rossz időben?",
        "A skipper előző este vagy reggel dönt. Nem biztonságos tenger esetén másik dátumot, védett útvonalat vagy visszatérítést kínálunk.",
      ],
      [
        "Mik a lemondási feltételek?",
        "A legtöbb túra indulás előtt 48 óráig ingyen lemondható. A pontos feltételek a kérelem előtt láthatók.",
      ],
      [
        "Mit vigyek magammal?",
        "Fürdőruhát, törölközőt, naptejet, kalapot és puha talpú cipőt. Az ételről és italról az ajánlat leírása tájékoztat.",
      ],
      [
        "Miben más a kérelem az azonnali foglalástól?",
        "Először elküldi a dátumot és a létszámot. A szolgáltató visszaigazolja a hajót, és csak ezután fizet.",
      ],
    ],
  },
  sk: {
    categories: [
      ["Plávajte a spomaľte", "Zátoky, tieň a žiadny zhon"],
      ["Objavte ostrovy", "Kornati, Dugi Otok, Telašćica"],
      ["Užite si súkromie", "Iba vaša skupina a skipper"],
      ["Nasledujte západ slnka", "Dve a pol hodiny pod plachtami"],
    ],
    destinationTexts: [
      "Osemdesiatdeväť skalnatých ostrovov a najpokojnejšie vody Chorvátska.",
      "Biele okruhliaky Sakarunu a pobrežie tichých západných zátok.",
      "Olivové háje, rybárske dedinky a zadarské ostrovy na kúpanie.",
      "Morské útesy, fjordovitá zátoka a teplé slané jazero Mir.",
    ],
    contexts: [
      "1 h 15 min zo Zadaru · Celý deň",
      "45 min zo Zadaru · Celý deň",
      "15 min zo Zadaru · Pol dňa",
      "1 h zo Zadaru · Celý deň",
    ],
    reviewTexts: [
      "Luka kvôli vetru zmenil celú trasu a skončili sme v zátoke iba s dvoma ďalšími loďami. Deti plávali šesť hodín. Stálo to za každé euro.",
      "Vypnutý motor, dvanásť ľudí, pohár vína a oranžové pobrežie Zadaru. Rezervovali sme prvý večer a ľutovali len to, že sme nešli dvakrát.",
      "Mali sme neskorý let a pol dňa času. Marin odpovedal do desiatich minút, stretol nás na rive a výlet bol najlepšou časťou cesty.",
    ],
    countries: ["Francúzsko", "Nemecko", "Írsko"],
    dates: ["júl 2026", "jún 2026", "september 2025"],
    faq: [
      [
        "Je skipper zahrnutý?",
        "Áno. Každá loď na Adriatic by Boat má licencovaného miestneho skippera, ak ponuka výslovne neuvádza inak.",
      ],
      [
        "Je palivo v cene?",
        "Palivo na štandardnú trasu je zahrnuté. Dodatočné náklady na dlhšiu trasu sa dohodnú pred odchodom.",
      ],
      [
        "Čo sa stane pri zlom počasí?",
        "Skipper rozhodne večer predtým alebo ráno. Ponúkneme iný termín, chránenú trasu alebo vrátenie peňazí.",
      ],
      [
        "Aké sú podmienky zrušenia?",
        "Väčšinu výletov možno bezplatne zrušiť do 48 hodín pred odchodom. Presné podmienky uvidíte pred dopytom.",
      ],
      [
        "Čo si mám priniesť?",
        "Plavky, uterák, opaľovací krém, klobúk a topánky s mäkkou podrážkou. Informácie o jedle nájdete v opise.",
      ],
      [
        "Ako sa dopyt líši od okamžitej rezervácie?",
        "Najprv pošlete dátum a počet hostí. Prevádzkovateľ potvrdí loď a až potom platíte.",
      ],
    ],
  },
  cs: {
    categories: [
      ["Plavte a zpomalte", "Zátoky, stín a žádný spěch"],
      ["Objevte ostrovy", "Kornati, Dugi Otok, Telašćica"],
      ["Užijte si soukromí", "Jen vaše skupina a skipper"],
      ["Vydejte se za západem", "Dvě a půl hodiny pod plachtami"],
    ],
    destinationTexts: [
      "Osmdesát devět skalnatých ostrovů a nejklidnější vody Chorvatska.",
      "Bílé oblázky Sakarunu a pobřeží tichých západních zátok.",
      "Olivové háje, rybářské vesnice a zadarské ostrovy ke koupání.",
      "Mořské útesy, fjordovitá zátoka a teplé slané jezero Mir.",
    ],
    contexts: [
      "1 h 15 min ze Zadaru · Celý den",
      "45 min ze Zadaru · Celý den",
      "15 min ze Zadaru · Půl dne",
      "1 h ze Zadaru · Celý den",
    ],
    reviewTexts: [
      "Luka kvůli větru změnil celou trasu a skončili jsme v zátoce jen se dvěma dalšími loděmi. Děti plavaly šest hodin. Stálo to za každé euro.",
      "Vypnutý motor, dvanáct lidí, sklenka vína a oranžové pobřeží Zadaru. Rezervovali jsme první večer a litovali jen toho, že jsme nejeli dvakrát.",
      "Měli jsme pozdní let a půl dne času. Marin odpověděl do deseti minut, setkal se s námi na rivě a výlet byl nejlepší částí cesty.",
    ],
    countries: ["Francie", "Německo", "Irsko"],
    dates: ["červenec 2026", "červen 2026", "září 2025"],
    faq: [
      [
        "Je skipper zahrnutý?",
        "Ano. Každá loď na Adriatic by Boat má licencovaného místního skippera, pokud nabídka výslovně neuvádí jinak.",
      ],
      [
        "Je palivo v ceně?",
        "Palivo pro standardní trasu je zahrnuto. Dodatečné náklady na delší trasu se dohodnou před odjezdem.",
      ],
      [
        "Co se stane při špatném počasí?",
        "Skipper rozhodne večer předem nebo ráno. Nabídneme jiný termín, chráněnou trasu nebo vrácení peněz.",
      ],
      [
        "Jaké jsou podmínky zrušení?",
        "Většinu výletů lze bezplatně zrušit do 48 hodin před odjezdem. Přesné podmínky uvidíte před poptávkou.",
      ],
      [
        "Co si mám vzít?",
        "Plavky, ručník, opalovací krém, klobouk a boty s měkkou podrážkou. Informace o jídle najdete v popisu.",
      ],
      [
        "Jak se poptávka liší od okamžité rezervace?",
        "Nejprve odešlete datum a počet hostů. Provozovatel potvrdí loď a teprve poté platíte.",
      ],
    ],
  },
  fr: {
    categories: [
      ["Nagez et ralentissez", "Des criques, de l'ombre et aucune urgence"],
      ["Découvrez les îles", "Kornati, Dugi Otok, Telašćica"],
      ["Restez entre vous", "Votre groupe et un skipper, rien de plus"],
      ["Suivez le coucher du soleil", "Deux heures et demie sous voile"],
    ],
    destinationTexts: [
      "Quatre-vingt-neuf îles rocheuses et les eaux les plus calmes de Croatie.",
      "Les galets blancs de Sakarun et une côte de criques occidentales paisibles.",
      "Oliveraies, villages de pêcheurs et îles de baignade de Zadar.",
      "Falaises marines, baie semblable à un fjord et lac salé chaud de Mir.",
    ],
    contexts: [
      "1 h 15 depuis Zadar · Journée entière",
      "45 min depuis Zadar · Journée entière",
      "15 min depuis Zadar · Demi-journée",
      "1 h depuis Zadar · Journée entière",
    ],
    reviewTexts: [
      "Luka a revu tout l'itinéraire à cause du vent et nous avons passé la journée dans une crique avec seulement deux autres bateaux. Les enfants ont nagé six heures. Chaque euro en valait la peine.",
      "Moteur coupé, douze personnes, un verre de vin et le front de mer de Zadar devenu orange. Nous avons réservé le premier soir et regretté de ne pas l'avoir fait deux fois.",
      "Nous avions un vol tardif et une demi-journée libre. Marin a répondu en dix minutes, nous a retrouvés sur la riva et la sortie est devenue le meilleur moment du voyage.",
    ],
    countries: ["France", "Allemagne", "Irlande"],
    dates: ["juillet 2026", "juin 2026", "septembre 2025"],
    faq: [
      [
        "Le skipper est-il inclus ?",
        "Oui. Chaque bateau sur Adriatic by Boat comprend un skipper local titulaire d'une licence, sauf indication explicite contraire.",
      ],
      [
        "Le carburant est-il inclus ?",
        "Le carburant de l'itinéraire standard est inclus. Tout supplément pour une route plus longue est convenu avant le départ.",
      ],
      [
        "Que se passe-t-il en cas de mauvais temps ?",
        "Le skipper décide la veille ou le matin. Nous proposons une autre date, un itinéraire abrité ou un remboursement.",
      ],
      [
        "Quelles sont les conditions d'annulation ?",
        "La plupart des sorties sont annulables gratuitement jusqu'à 48 heures avant le départ. Les conditions exactes sont affichées avant la demande.",
      ],
      [
        "Que dois-je apporter ?",
        "Maillot, serviette, crème solaire, chapeau et chaussures souples. Consultez la description pour les repas et boissons.",
      ],
      [
        "Quelle différence avec une réservation instantanée ?",
        "Vous envoyez d'abord la date et le nombre de personnes. L'opérateur confirme le bateau, puis seulement vous payez.",
      ],
    ],
  },
  es: {
    categories: [
      ["Nada y desconecta", "Calas, sombra y ninguna prisa"],
      ["Descubre las islas", "Kornati, Dugi Otok, Telašćica"],
      ["Hazlo privado", "Solo tu grupo y un patrón"],
      ["Persigue el atardecer", "Dos horas y media a vela"],
    ],
    destinationTexts: [
      "Ochenta y nueve islas rocosas y las aguas más tranquilas de Croacia.",
      "Los guijarros blancos de Sakarun y una costa de calas occidentales tranquilas.",
      "Olivares, pueblos pesqueros y las islas de baño de Zadar.",
      "Acantilados marinos, una bahía como un fiordo y el cálido lago salado Mir.",
    ],
    contexts: [
      "1 h 15 min desde Zadar · Día completo",
      "45 min desde Zadar · Día completo",
      "15 min desde Zadar · Medio día",
      "1 h desde Zadar · Día completo",
    ],
    reviewTexts: [
      "Luka cambió toda la ruta por el viento y acabamos en una cala con solo otros dos barcos. Los niños nadaron seis horas. Valió cada euro.",
      "Motor apagado, doce personas, una copa de vino y el paseo marítimo de Zadar volviéndose naranja. Reservamos la primera noche y lamentamos no hacerlo dos veces.",
      "Teníamos un vuelo tarde y medio día libre. Marin respondió en diez minutos, nos recibió en la riva y la excursión fue lo mejor del viaje.",
    ],
    countries: ["Francia", "Alemania", "Irlanda"],
    dates: ["julio de 2026", "junio de 2026", "septiembre de 2025"],
    faq: [
      [
        "¿Está incluido el patrón?",
        "Sí. Todos los barcos de Adriatic by Boat incluyen un patrón local con licencia, salvo que la oferta indique expresamente lo contrario.",
      ],
      [
        "¿Está incluido el combustible?",
        "El combustible para la ruta estándar está incluido. Cualquier coste extra por una ruta más larga se acuerda antes de salir.",
      ],
      [
        "¿Qué ocurre si hace mal tiempo?",
        "El patrón decide la tarde anterior o por la mañana. Ofrecemos otra fecha, una ruta protegida o un reembolso.",
      ],
      [
        "¿Cuál es la política de cancelación?",
        "La mayoría de las salidas se pueden cancelar gratis hasta 48 horas antes. Las condiciones exactas aparecen antes de enviar la solicitud.",
      ],
      [
        "¿Qué debo llevar?",
        "Bañador, toalla, protector solar, sombrero y calzado de suela blanda. Consulta la descripción para comida y bebidas.",
      ],
      [
        "¿En qué se diferencia de una reserva inmediata?",
        "Primero envías la fecha y el número de personas. El operador confirma el barco y solo entonces pagas.",
      ],
    ],
  },
};

export function getLocalizedHomeData(locale: Locale): HomeData {
  if (locale === "en") return { categories, destinations, reviews, faqs };
  const c = homeCopy[locale];
  return {
    categories: categories.map((item, index) => ({
      ...item,
      title: c.categories[index]?.[0] ?? item.title,
      text: c.categories[index]?.[1] ?? item.text,
    })),
    destinations: destinations.map((item, index) => ({
      ...item,
      context: c.contexts[index] ?? item.context,
      text: c.destinationTexts[index] ?? item.text,
    })),
    reviews: reviews.map((item, index) => {
      const slug =
        ["kornati-private-escape", "sunset-sailing-zadar", "hidden-bays-ugljan"][index] ?? "";
      return {
        ...item,
        country: c.countries[index] ?? item.country,
        date: c.dates[index] ?? item.date,
        text: c.reviewTexts[index] ?? item.text,
        trip: experienceCopy[locale].titles[slug] ?? item.trip,
      };
    }),
    faqs: faqs.map((item, index) => ({
      ...item,
      q: c.faq[index]?.[0] ?? item.q,
      a: c.faq[index]?.[1] ?? item.a,
    })),
  };
}
