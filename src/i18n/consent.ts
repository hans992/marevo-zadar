import type { Locale } from "./index";

export type ConsentCopy = {
  title: string;
  body: string;
  note: string;
  accept: string;
  reject: string;
  keep: string;
  preferences: string;
  on: string;
  off: string;
};

const consentCopy: Record<Locale, ConsentCopy> = {
  en: {
    title: "Analytics on this site",
    body: "We would like to count page views with Vercel Web Analytics. It is cookieless: nothing is written to your device and no identifier follows you between visits. It never sees your name, your email address or the message you write to an operator.",
    note: "You can change this at any time from the footer.",
    accept: "Accept analytics",
    reject: "Reject",
    keep: "Keep current setting",
    preferences: "Analytics preferences",
    on: "on",
    off: "off",
  },
  hr: {
    title: "Analitika na ovoj stranici",
    body: "Željeli bismo brojati posjete stranicama pomoću Vercel Web Analyticsa. Ne koristi kolačiće: ništa se ne zapisuje na vaš uređaj i nijedan identifikator vas ne prati između posjeta. Nikada ne vidi vaše ime, adresu e-pošte ni poruku koju pišete operateru.",
    note: "Ovo možete promijeniti u svakom trenutku u podnožju stranice.",
    accept: "Prihvaćam analitiku",
    reject: "Odbijam",
    keep: "Zadrži postavku",
    preferences: "Postavke analitike",
    on: "uključena",
    off: "isključena",
  },
  sl: {
    title: "Analitika na tem spletnem mestu",
    body: "Radi bi šteli oglede strani z orodjem Vercel Web Analytics. Ne uporablja piškotkov: na vašo napravo se ne zapiše nič in noben identifikator vam ne sledi med obiski. Nikoli ne vidi vašega imena, e-poštnega naslova ali sporočila, ki ga pišete ponudniku.",
    note: "To lahko kadar koli spremenite v nogi strani.",
    accept: "Sprejmi analitiko",
    reject: "Zavrni",
    keep: "Ohrani nastavitev",
    preferences: "Nastavitve analitike",
    on: "vklopljena",
    off: "izklopljena",
  },
  de: {
    title: "Analyse auf dieser Website",
    body: "Wir möchten Seitenaufrufe mit Vercel Web Analytics zählen. Das geschieht ohne Cookies: Auf Ihrem Gerät wird nichts gespeichert, und keine Kennung folgt Ihnen zwischen Besuchen. Ihr Name, Ihre E-Mail-Adresse und Ihre Nachricht an einen Anbieter werden dabei nie erfasst.",
    note: "Sie können das jederzeit im Fußbereich ändern.",
    accept: "Analyse akzeptieren",
    reject: "Ablehnen",
    keep: "Einstellung beibehalten",
    preferences: "Analyse-Einstellungen",
    on: "aktiv",
    off: "inaktiv",
  },
  pl: {
    title: "Analityka na tej stronie",
    body: "Chcielibyśmy liczyć wyświetlenia stron za pomocą Vercel Web Analytics. Działa bez ciasteczek: nic nie jest zapisywane na Twoim urządzeniu i żaden identyfikator nie śledzi Cię między wizytami. Nigdy nie widzi Twojego imienia, adresu e-mail ani wiadomości do operatora.",
    note: "Możesz to zmienić w każdej chwili w stopce.",
    accept: "Akceptuję analitykę",
    reject: "Odrzuć",
    keep: "Zachowaj ustawienie",
    preferences: "Ustawienia analityki",
    on: "włączona",
    off: "wyłączona",
  },
  hu: {
    title: "Analitika ezen az oldalon",
    body: "Szeretnénk megszámolni az oldalletöltéseket a Vercel Web Analytics segítségével. Ez sütik nélkül működik: semmi nem kerül az eszközére, és semmilyen azonosító nem követi Önt a látogatások között. Soha nem látja a nevét, az e-mail-címét vagy a szolgáltatónak írt üzenetét.",
    note: "Ezt bármikor módosíthatja a láblécben.",
    accept: "Analitika elfogadása",
    reject: "Elutasítom",
    keep: "Beállítás megtartása",
    preferences: "Analitikai beállítások",
    on: "bekapcsolva",
    off: "kikapcsolva",
  },
  sk: {
    title: "Analytika na tejto stránke",
    body: "Radi by sme počítali zobrazenia stránok pomocou Vercel Web Analytics. Funguje bez súborov cookie: do vášho zariadenia sa nič nezapisuje a žiadny identifikátor vás nesleduje medzi návštevami. Nikdy nevidí vaše meno, e-mail ani správu pre prevádzkovateľa.",
    note: "Toto môžete kedykoľvek zmeniť v pätičke.",
    accept: "Prijať analytiku",
    reject: "Odmietnuť",
    keep: "Ponechať nastavenie",
    preferences: "Nastavenia analytiky",
    on: "zapnutá",
    off: "vypnutá",
  },
  cs: {
    title: "Analytika na těchto stránkách",
    body: "Rádi bychom počítali zobrazení stránek pomocí Vercel Web Analytics. Funguje bez cookies: do vašeho zařízení se nic nezapisuje a žádný identifikátor vás nesleduje mezi návštěvami. Nikdy nevidí vaše jméno, e-mail ani zprávu pro provozovatele.",
    note: "Toto můžete kdykoli změnit v patičce.",
    accept: "Přijmout analytiku",
    reject: "Odmítnout",
    keep: "Ponechat nastavení",
    preferences: "Nastavení analytiky",
    on: "zapnutá",
    off: "vypnutá",
  },
  fr: {
    title: "Mesure d'audience sur ce site",
    body: "Nous aimerions compter les pages vues avec Vercel Web Analytics. Cela fonctionne sans cookie : rien n'est écrit sur votre appareil et aucun identifiant ne vous suit d'une visite à l'autre. Votre nom, votre adresse e-mail et votre message à un opérateur ne sont jamais concernés.",
    note: "Vous pouvez modifier ce choix à tout moment depuis le pied de page.",
    accept: "Accepter la mesure",
    reject: "Refuser",
    keep: "Conserver le réglage",
    preferences: "Préférences de mesure",
    on: "activée",
    off: "désactivée",
  },
  es: {
    title: "Analítica en este sitio",
    body: "Nos gustaría contar las páginas vistas con Vercel Web Analytics. Funciona sin cookies: no se escribe nada en tu dispositivo y ningún identificador te sigue entre visitas. Nunca ve tu nombre, tu correo ni el mensaje que escribes a un operador.",
    note: "Puedes cambiarlo en cualquier momento desde el pie de página.",
    accept: "Aceptar analítica",
    reject: "Rechazar",
    keep: "Mantener ajuste",
    preferences: "Preferencias de analítica",
    on: "activada",
    off: "desactivada",
  },
};

export const getConsentCopy = (locale: Locale) => consentCopy[locale];
