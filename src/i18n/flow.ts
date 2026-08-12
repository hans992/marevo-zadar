import type { Locale } from "./index";

type FlowCopy = {
  exampleRequest: string;
  chips: string[];
  steps: { title: string; text: string }[];
  operatorPromise: string;
  operatorStats: [string, string][];
  operatorImageAlt: string;
  operatorPoints: { title: string; text: string }[];
};

const en: FlowCopy = {
  exampleRequest:
    "We are 6 people in Zadar tomorrow. We want a private boat, lots of swimming, somewhere quiet, maximum €700.",
  chips: ["6 guests", "Private", "Quiet coves", "Under €700", "Tomorrow"],
  steps: [
    {
      title: "Choose your day",
      text: "Pick a trip, date and group size, then tell the skipper what matters to you.",
    },
    {
      title: "Operator confirms",
      text: "The owner checks the boat, crew and forecast, then replies — usually within 30 minutes.",
    },
    {
      title: "Pay securely",
      text: "You only pay after the boat is confirmed. Free cancellation applies on selected trips.",
    },
  ],
  operatorPromise:
    "No fleet resellers, no last-minute substitutions and no boat you have not seen in the photographs.",
  operatorStats: [
    ["Zadar-first", "focused marketplace"],
    ["Request-first", "no stale calendars"],
    ["Human", "trip support"],
  ],
  operatorImageAlt: "Local skipper aboard a boat near Dugi Otok",
  operatorPoints: [
    {
      title: "Direct, qualified requests",
      text: "Real dates and group sizes sent directly to you — no cold lead lists.",
    },
    {
      title: "You confirm every booking",
      text: "Nothing is sold until you confirm the boat is available.",
    },
    {
      title: "Simple pricing",
      text: "A transparent commercial model agreed before your listing goes live.",
    },
    {
      title: "Blackout dates",
      text: "Start simply and block unavailable dates whenever you need to.",
    },
  ],
};

const copy: Record<Locale, FlowCopy> = {
  en,
  hr: {
    exampleRequest:
      "Sutra nas je šestero u Zadru. Želimo privatni brod, puno kupanja, mirno mjesto i budžet do 700 €.",
    chips: ["6 gostiju", "Privatno", "Mirne uvale", "Do 700 €", "Sutra"],
    steps: [
      {
        title: "Odaberite svoj dan",
        text: "Odaberite izlet, datum i broj gostiju pa recite skiperu što vam je važno.",
      },
      {
        title: "Operater potvrđuje",
        text: "Vlasnik provjerava brod, posadu i prognozu pa odgovara — obično unutar 30 minuta.",
      },
      {
        title: "Platite sigurno",
        text: "Plaćate tek nakon potvrde broda. Za odabrane izlete vrijedi besplatno otkazivanje.",
      },
    ],
    operatorPromise:
      "Bez preprodavača flota, zamjena u zadnji čas i brodova koje niste vidjeli na fotografijama.",
    operatorStats: [
      ["Prvo Zadar", "specijalizirani marketplace"],
      ["Prvo upit", "bez zastarjelih kalendara"],
      ["Ljudska", "podrška za izlet"],
    ],
    operatorImageAlt: "Lokalni skiper na brodu kod Dugog otoka",
    operatorPoints: [
      {
        title: "Izravni, kvalitetni upiti",
        text: "Stvarni datumi i veličine grupa stižu izravno vama — bez hladnih lista kontakata.",
      },
      {
        title: "Vi potvrđujete svaku rezervaciju",
        text: "Ništa se ne prodaje dok ne potvrdite da je brod slobodan.",
      },
      {
        title: "Jednostavne cijene",
        text: "Transparentan poslovni model dogovoren prije objave ponude.",
      },
      {
        title: "Nedostupni datumi",
        text: "Počnite jednostavno i blokirajte datume kada god zatreba.",
      },
    ],
  },
  sl: {
    exampleRequest:
      "Jutri nas je šest v Zadru. Želimo zasebno plovilo, veliko kopanja, miren kraj in največ 700 €.",
    chips: ["6 gostov", "Zasebno", "Mirni zalivi", "Do 700 €", "Jutri"],
    steps: [
      {
        title: "Izberite svoj dan",
        text: "Izberite izlet, datum in velikost skupine ter povejte skiperju, kaj vam je pomembno.",
      },
      {
        title: "Ponudnik potrdi",
        text: "Lastnik preveri plovilo, posadko in napoved ter običajno odgovori v 30 minutah.",
      },
      {
        title: "Varno plačilo",
        text: "Plačate šele po potrditvi plovila. Za izbrane izlete velja brezplačna odpoved.",
      },
    ],
    operatorPromise:
      "Brez preprodajalcev flot, menjav v zadnjem trenutku in plovil, ki jih niste videli na fotografijah.",
    operatorStats: [
      ["Najprej Zadar", "specializirana tržnica"],
      ["Najprej povpraševanje", "brez zastarelih koledarjev"],
      ["Človeška", "podpora za izlet"],
    ],
    operatorImageAlt: "Lokalni skiper na plovilu pri Dugem otoku",
    operatorPoints: [
      {
        title: "Neposredna kakovostna povpraševanja",
        text: "Resnični datumi in velikosti skupin neposredno za vas — brez hladnih seznamov.",
      },
      {
        title: "Potrdite vsako rezervacijo",
        text: "Nič ni prodano, dokler ne potrdite, da je plovilo prosto.",
      },
      {
        title: "Preproste cene",
        text: "Pregleden poslovni model, dogovorjen pred objavo ponudbe.",
      },
      {
        title: "Nerazpoložljivi datumi",
        text: "Začnite preprosto in po potrebi blokirajte datume.",
      },
    ],
  },
  de: {
    exampleRequest:
      "Wir sind morgen zu sechst in Zadar. Wir möchten ein privates Boot, viel schwimmen, einen ruhigen Ort und maximal 700 € ausgeben.",
    chips: ["6 Gäste", "Privat", "Ruhige Buchten", "Unter 700 €", "Morgen"],
    steps: [
      {
        title: "Tag auswählen",
        text: "Wählen Sie Tour, Datum und Gruppengröße und nennen Sie dem Skipper Ihre Wünsche.",
      },
      {
        title: "Anbieter bestätigt",
        text: "Der Eigentümer prüft Boot, Crew und Wetter und antwortet meist innerhalb von 30 Minuten.",
      },
      {
        title: "Sicher bezahlen",
        text: "Sie zahlen erst nach Bestätigung des Bootes. Für ausgewählte Touren gilt kostenlose Stornierung.",
      },
    ],
    operatorPromise:
      "Keine Flottenvermittler, keine kurzfristigen Ersatzboote und kein Boot, das Sie nicht auf den Fotos gesehen haben.",
    operatorStats: [
      ["Zadar zuerst", "spezialisierter Marktplatz"],
      ["Anfrage zuerst", "keine veralteten Kalender"],
      ["Persönlich", "Unterstützung zur Tour"],
    ],
    operatorImageAlt: "Lokaler Skipper auf einem Boot bei Dugi Otok",
    operatorPoints: [
      {
        title: "Direkte, qualifizierte Anfragen",
        text: "Echte Daten und Gruppengrößen direkt an Sie — keine kalten Kontaktlisten.",
      },
      {
        title: "Sie bestätigen jede Buchung",
        text: "Nichts wird verkauft, bevor Sie die Verfügbarkeit bestätigen.",
      },
      {
        title: "Einfache Preisgestaltung",
        text: "Ein transparentes Modell, das vor der Veröffentlichung vereinbart wird.",
      },
      {
        title: "Sperrtermine",
        text: "Starten Sie einfach und sperren Sie nicht verfügbare Tage jederzeit.",
      },
    ],
  },
  pl: {
    exampleRequest:
      "Jutro jest nas sześcioro w Zadarze. Chcemy prywatną łódź, dużo pływania, spokojne miejsce i budżet do 700 €.",
    chips: ["6 gości", "Prywatnie", "Ciche zatoki", "Do 700 €", "Jutro"],
    steps: [
      {
        title: "Wybierz dzień",
        text: "Wybierz wycieczkę, datę i wielkość grupy, a następnie opisz skipperowi swoje potrzeby.",
      },
      {
        title: "Operator potwierdza",
        text: "Właściciel sprawdza łódź, załogę i prognozę, a zwykle odpowiada w ciągu 30 minut.",
      },
      {
        title: "Zapłać bezpiecznie",
        text: "Płacisz dopiero po potwierdzeniu łodzi. Wybrane wycieczki mają bezpłatne anulowanie.",
      },
    ],
    operatorPromise:
      "Bez pośredników flotowych, zamian w ostatniej chwili i łodzi, których nie widziałeś na zdjęciach.",
    operatorStats: [
      ["Najpierw Zadar", "wyspecjalizowany marketplace"],
      ["Najpierw zapytanie", "bez nieaktualnych kalendarzy"],
      ["Ludzka", "pomoc przy wycieczce"],
    ],
    operatorImageAlt: "Lokalny skipper na łodzi przy Dugi Otok",
    operatorPoints: [
      {
        title: "Bezpośrednie, wartościowe zapytania",
        text: "Prawdziwe daty i liczby gości prosto do ciebie — bez zimnych baz kontaktów.",
      },
      {
        title: "Potwierdzasz każdą rezerwację",
        text: "Nic nie jest sprzedawane, dopóki nie potwierdzisz dostępności.",
      },
      { title: "Proste ceny", text: "Przejrzysty model uzgodniony przed publikacją oferty." },
      {
        title: "Niedostępne terminy",
        text: "Zacznij prosto i blokuj terminy, kiedy potrzebujesz.",
      },
    ],
  },
  hu: {
    exampleRequest:
      "Holnap hatan leszünk Zadarban. Privát hajót, sok úszást, csendes helyet szeretnénk, legfeljebb 700 €-ért.",
    chips: ["6 vendég", "Privát", "Csendes öblök", "700 € alatt", "Holnap"],
    steps: [
      {
        title: "Válassza ki a napot",
        text: "Válasszon túrát, dátumot és csoportméretet, majd írja meg a skippernek, mi fontos.",
      },
      {
        title: "A szolgáltató visszaigazol",
        text: "A tulajdonos ellenőrzi a hajót, a személyzetet és az előrejelzést, majd általában 30 percen belül válaszol.",
      },
      {
        title: "Fizessen biztonságosan",
        text: "Csak a hajó visszaigazolása után fizet. Egyes túrák ingyen lemondhatók.",
      },
    ],
    operatorPromise:
      "Nincsenek flottaközvetítők, utolsó pillanatos cserék vagy a képeken nem látott hajók.",
    operatorStats: [
      ["Zadar az első", "specializált piactér"],
      ["Kérelem az első", "nincs elavult naptár"],
      ["Emberi", "túratámogatás"],
    ],
    operatorImageAlt: "Helyi skipper egy hajón Dugi Otok közelében",
    operatorPoints: [
      {
        title: "Közvetlen, minőségi kérelmek",
        text: "Valós dátumok és csoportméretek közvetlenül Önhöz — hideg listák nélkül.",
      },
      {
        title: "Minden foglalást Ön igazol vissza",
        text: "Semmit nem adunk el, amíg nem erősíti meg az elérhetőséget.",
      },
      {
        title: "Egyszerű árképzés",
        text: "Átlátható modell, amelyet a hirdetés előtt egyeztetünk.",
      },
      {
        title: "Tiltott dátumok",
        text: "Induljon egyszerűen, és bármikor blokkolja a nem elérhető napokat.",
      },
    ],
  },
  sk: {
    exampleRequest:
      "Zajtra nás bude šesť v Zadare. Chceme súkromnú loď, veľa plávania, pokojné miesto a rozpočet do 700 €.",
    chips: ["6 hostí", "Súkromne", "Tiché zátoky", "Do 700 €", "Zajtra"],
    steps: [
      {
        title: "Vyberte si deň",
        text: "Vyberte výlet, dátum a veľkosť skupiny a napíšte skipperovi, čo je pre vás dôležité.",
      },
      {
        title: "Prevádzkovateľ potvrdí",
        text: "Majiteľ preverí loď, posádku a predpoveď a zvyčajne odpovie do 30 minút.",
      },
      {
        title: "Zaplaťte bezpečne",
        text: "Platíte až po potvrdení lode. Na vybrané výlety platí bezplatné zrušenie.",
      },
    ],
    operatorPromise:
      "Bez sprostredkovateľov flotíl, výmen na poslednú chvíľu a lodí, ktoré ste nevideli na fotografiách.",
    operatorStats: [
      ["Najprv Zadar", "špecializované trhovisko"],
      ["Najprv dopyt", "bez zastaraných kalendárov"],
      ["Ľudská", "podpora výletu"],
    ],
    operatorImageAlt: "Miestny skipper na lodi pri Dugi Otok",
    operatorPoints: [
      {
        title: "Priame, kvalitné dopyty",
        text: "Skutočné dátumy a veľkosti skupín priamo pre vás — bez studených zoznamov.",
      },
      {
        title: "Potvrdzujete každú rezerváciu",
        text: "Nič sa nepredá, kým nepotvrdíte dostupnosť.",
      },
      { title: "Jednoduché ceny", text: "Transparentný model dohodnutý pred zverejnením ponuky." },
      { title: "Nedostupné dátumy", text: "Začnite jednoducho a podľa potreby blokujte termíny." },
    ],
  },
  cs: {
    exampleRequest:
      "Zítra nás bude šest v Zadaru. Chceme soukromou loď, hodně plavání, klidné místo a rozpočet do 700 €.",
    chips: ["6 hostů", "Soukromě", "Tiché zátoky", "Do 700 €", "Zítra"],
    steps: [
      {
        title: "Vyberte si den",
        text: "Vyberte výlet, datum a velikost skupiny a napište skipperovi, co je pro vás důležité.",
      },
      {
        title: "Provozovatel potvrdí",
        text: "Majitel ověří loď, posádku a předpověď a obvykle odpoví do 30 minut.",
      },
      {
        title: "Zaplaťte bezpečně",
        text: "Platíte až po potvrzení lodi. U vybraných výletů platí bezplatné zrušení.",
      },
    ],
    operatorPromise:
      "Bez zprostředkovatelů flotil, výměn na poslední chvíli a lodí, které jste neviděli na fotografiích.",
    operatorStats: [
      ["Nejdřív Zadar", "specializované tržiště"],
      ["Nejdřív poptávka", "bez zastaralých kalendářů"],
      ["Lidská", "podpora výletu"],
    ],
    operatorImageAlt: "Místní skipper na lodi u Dugi Otok",
    operatorPoints: [
      {
        title: "Přímé, kvalitní poptávky",
        text: "Skutečná data a velikosti skupin přímo pro vás — bez studených seznamů.",
      },
      {
        title: "Potvrzujete každou rezervaci",
        text: "Nic se neprodá, dokud nepotvrdíte dostupnost.",
      },
      { title: "Jednoduché ceny", text: "Transparentní model dohodnutý před zveřejněním nabídky." },
      { title: "Nedostupné termíny", text: "Začněte jednoduše a podle potřeby blokujte termíny." },
    ],
  },
  fr: {
    exampleRequest:
      "Nous sommes six à Zadar demain. Nous voulons un bateau privé, beaucoup de baignade, un endroit calme et un budget maximal de 700 €.",
    chips: ["6 personnes", "Privé", "Criques calmes", "Moins de 700 €", "Demain"],
    steps: [
      {
        title: "Choisissez votre journée",
        text: "Choisissez la sortie, la date et la taille du groupe, puis précisez vos envies au skipper.",
      },
      {
        title: "L'opérateur confirme",
        text: "Le propriétaire vérifie le bateau, l'équipage et la météo, puis répond généralement sous 30 minutes.",
      },
      {
        title: "Payez en sécurité",
        text: "Vous payez seulement après confirmation du bateau. Certaines sorties sont annulables gratuitement.",
      },
    ],
    operatorPromise:
      "Aucun revendeur de flotte, aucun remplacement de dernière minute et aucun bateau absent des photos.",
    operatorStats: [
      ["Zadar d'abord", "place de marché spécialisée"],
      ["Demande d'abord", "pas de calendrier obsolète"],
      ["Humaine", "assistance pour la sortie"],
    ],
    operatorImageAlt: "Skipper local sur un bateau près de Dugi Otok",
    operatorPoints: [
      {
        title: "Demandes directes et qualifiées",
        text: "Dates et tailles de groupe réelles directement pour vous — sans listes froides.",
      },
      {
        title: "Vous confirmez chaque réservation",
        text: "Rien n'est vendu avant votre confirmation de disponibilité.",
      },
      {
        title: "Tarification simple",
        text: "Un modèle transparent convenu avant la publication de l'offre.",
      },
      {
        title: "Dates indisponibles",
        text: "Commencez simplement et bloquez les dates selon vos besoins.",
      },
    ],
  },
  es: {
    exampleRequest:
      "Mañana somos seis en Zadar. Queremos un barco privado, nadar mucho, un lugar tranquilo y un presupuesto máximo de 700 €.",
    chips: ["6 personas", "Privado", "Calas tranquilas", "Hasta 700 €", "Mañana"],
    steps: [
      {
        title: "Elige tu día",
        text: "Elige la excursión, la fecha y el tamaño del grupo, y cuéntale al patrón qué te importa.",
      },
      {
        title: "El operador confirma",
        text: "El propietario revisa el barco, la tripulación y la previsión, y normalmente responde en 30 minutos.",
      },
      {
        title: "Paga con seguridad",
        text: "Solo pagas después de confirmar el barco. Algunas salidas permiten cancelación gratuita.",
      },
    ],
    operatorPromise:
      "Sin revendedores de flotas, cambios de última hora ni barcos que no hayas visto en las fotos.",
    operatorStats: [
      ["Zadar primero", "marketplace especializado"],
      ["Solicitud primero", "sin calendarios obsoletos"],
      ["Humana", "asistencia para la excursión"],
    ],
    operatorImageAlt: "Patrón local en un barco cerca de Dugi Otok",
    operatorPoints: [
      {
        title: "Solicitudes directas y cualificadas",
        text: "Fechas y tamaños de grupo reales directamente para ti — sin listas frías.",
      },
      {
        title: "Confirmas cada reserva",
        text: "No se vende nada hasta que confirmas la disponibilidad.",
      },
      {
        title: "Precios sencillos",
        text: "Un modelo transparente acordado antes de publicar la oferta.",
      },
      {
        title: "Fechas no disponibles",
        text: "Empieza de forma sencilla y bloquea fechas cuando lo necesites.",
      },
    ],
  },
};

export const useFlowCopy = (locale: Locale) => copy[locale];
