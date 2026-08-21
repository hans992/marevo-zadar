import type { Locale } from "./index";

export type PolicySection = { heading: string; body: string[] };
export type PolicyContent = { title: string; intro: string; sections: PolicySection[] };

/**
 * Labels every locale needs, even where the policy body itself is not translated.
 */
export const legalLabels: Record<
  Locale,
  {
    privacy: string;
    readPolicy: string;
    lastUpdated: string;
    englishOnly: string;
  }
> = {
  en: {
    privacy: "Privacy",
    readPolicy: "Read the privacy policy",
    lastUpdated: "Last updated",
    englishOnly: "",
  },
  hr: {
    privacy: "Privatnost",
    readPolicy: "Pročitajte pravila privatnosti",
    lastUpdated: "Zadnja izmjena",
    englishOnly: "",
  },
  sl: {
    privacy: "Zasebnost",
    readPolicy: "Preberite pravilnik o zasebnosti",
    lastUpdated: "Zadnja sprememba",
    englishOnly: "Ta pravilnik je za zdaj na voljo v angleščini in hrvaščini.",
  },
  de: {
    privacy: "Datenschutz",
    readPolicy: "Datenschutzerklärung lesen",
    lastUpdated: "Zuletzt aktualisiert",
    englishOnly: "Diese Erklärung liegt derzeit auf Englisch und Kroatisch vor.",
  },
  pl: {
    privacy: "Prywatność",
    readPolicy: "Przeczytaj politykę prywatności",
    lastUpdated: "Ostatnia aktualizacja",
    englishOnly: "Ta polityka jest obecnie dostępna po angielsku i chorwacku.",
  },
  hu: {
    privacy: "Adatvédelem",
    readPolicy: "Olvassa el az adatvédelmi tájékoztatót",
    lastUpdated: "Utolsó módosítás",
    englishOnly: "Ez a tájékoztató jelenleg angol és horvát nyelven érhető el.",
  },
  sk: {
    privacy: "Ochrana údajov",
    readPolicy: "Prečítajte si zásady ochrany údajov",
    lastUpdated: "Posledná aktualizácia",
    englishOnly: "Tieto zásady sú zatiaľ dostupné v angličtine a chorvátčine.",
  },
  cs: {
    privacy: "Ochrana údajů",
    readPolicy: "Přečtěte si zásady ochrany údajů",
    lastUpdated: "Poslední aktualizace",
    englishOnly: "Tyto zásady jsou zatím dostupné v angličtině a chorvatštině.",
  },
  fr: {
    privacy: "Confidentialité",
    readPolicy: "Lire la politique de confidentialité",
    lastUpdated: "Dernière mise à jour",
    englishOnly: "Cette politique est actuellement disponible en anglais et en croate.",
  },
  es: {
    privacy: "Privacidad",
    readPolicy: "Lee la política de privacidad",
    lastUpdated: "Última actualización",
    englishOnly: "Esta política está disponible por ahora en inglés y croata.",
  },
};

const en: PolicyContent = {
  title: "Privacy policy",
  intro:
    "This policy explains what Adriatic by Boat does with the personal data you give us when you send a request to book, and what you can ask us to do about it.",
  sections: [
    {
      heading: "Who we are",
      body: [
        "Adriatic by Boat is a marketplace for boat rentals and island experiences operating from Zadar, Croatia. We decide why and how the data described here is used, which makes us the controller under the General Data Protection Regulation.",
        "You can reach us about anything on this page at hello@adriaticbyboat.com.",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "When you send a request to book, we store your name, your email address, your phone number if you choose to give one, and any message you write to the operator. We also store the trip, date and number of guests you selected, the price we quoted you at that moment, the time you gave consent, and the version of this policy you agreed to.",
        "We do not ask for or store payment details. No payment is taken through this site.",
      ],
    },
    {
      heading: "Why we use it, and on what basis",
      body: [
        "We use your request for one purpose: to pass it to the operator who runs the boat you chose, so that they can answer you. That is a step taken at your request before entering into a contract, which is our legal basis under Article 6(1)(b) of the GDPR, together with the consent you give in the request form.",
        "We do not use your contact details for marketing, and we do not sell them.",
      ],
    },
    {
      heading: "Who else sees it",
      body: [
        "The operator you sent the request to receives your name, contact details, message and trip details, because they cannot answer you otherwise.",
        "Our hosting and database providers process the data on our behalf and only on our instructions. They do not use it for their own purposes.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "We keep booking requests for 24 months after they are sent, so that we and the operator can deal with questions and disputes about a trip. After that they are deleted.",
        "If you ask us to delete your request sooner, we will, unless we are required to keep it in order to defend a legal claim.",
      ],
    },
    {
      heading: "Measurement",
      body: [
        "We measure how the site is used so that we know which pages and trips are worth keeping. That measurement is aggregate: it records things like which destination and price band were searched, and never your name, email address, phone number or message.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask us for a copy of your data, ask us to correct it, ask us to delete it, ask us to restrict or stop using it, or ask for it in a portable form. You can withdraw the consent you gave in the request form at any time, which does not affect anything we did before you withdrew it.",
        "Write to hello@adriaticbyboat.com and we will answer within one month.",
        "If you believe we have handled your data badly, you can complain to the Croatian Personal Data Protection Agency (Agencija za zaštitu osobnih podataka, azop.hr), or to the supervisory authority in the country where you live.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "When we change this policy we publish a new version, and we record alongside your request which version you agreed to, so that it is always clear what you were told at the time.",
      ],
    },
  ],
};

const hr: PolicyContent = {
  title: "Pravila privatnosti",
  intro:
    "Ova pravila objašnjavaju što Adriatic by Boat radi s osobnim podacima koje nam date kada pošaljete upit za rezervaciju i što od nas u vezi s njima možete tražiti.",
  sections: [
    {
      heading: "Tko smo mi",
      body: [
        "Adriatic by Boat je marketplace za najam brodova i otočne doživljaje koji posluje iz Zadra. Mi odlučujemo zašto se i kako obrađuju podaci opisani na ovoj stranici, što nas čini voditeljem obrade prema Općoj uredbi o zaštiti podataka.",
        "Za sve s ove stranice javite nam se na hello@adriaticbyboat.com.",
      ],
    },
    {
      heading: "Koje podatke prikupljamo",
      body: [
        "Kada pošaljete upit za rezervaciju, spremamo vaše ime, adresu e-pošte, broj telefona ako ga odlučite ostaviti i poruku koju napišete operateru. Spremamo i izlet, datum i broj gostiju koje ste odabrali, cijenu koju smo vam u tom trenutku ponudili, vrijeme kada ste dali privolu i verziju ovih pravila na koju ste pristali.",
        "Ne tražimo niti spremamo podatke o plaćanju. Preko ove stranice ništa se ne naplaćuje.",
      ],
    },
    {
      heading: "Zašto ih koristimo i na kojoj osnovi",
      body: [
        "Vaš upit koristimo za jednu svrhu: da ga proslijedimo operateru koji vodi odabrani brod kako bi vam mogao odgovoriti. To je radnja poduzeta na vaš zahtjev prije sklapanja ugovora, što je naša pravna osnova prema članku 6. stavku 1. točki (b) Opće uredbe, zajedno s privolom koju dajete u obrascu.",
        "Vaše kontaktne podatke ne koristimo za marketing i ne prodajemo ih.",
      ],
    },
    {
      heading: "Tko ih još vidi",
      body: [
        "Operater kojemu ste poslali upit dobiva vaše ime, kontaktne podatke, poruku i podatke o izletu, jer vam inače ne može odgovoriti.",
        "Naši pružatelji usluga smještaja i baze podataka obrađuju podatke u naše ime i samo po našim uputama. Ne koriste ih za vlastite svrhe.",
      ],
    },
    {
      heading: "Koliko dugo ih čuvamo",
      body: [
        "Upite za rezervaciju čuvamo 24 mjeseca od slanja, kako bismo mi i operater mogli riješiti pitanja i prigovore vezane uz izlet. Nakon toga se brišu.",
        "Ako zatražite ranije brisanje svojeg upita, obrisat ćemo ga, osim ako smo ga dužni zadržati radi obrane pravnog zahtjeva.",
      ],
    },
    {
      heading: "Mjerenje",
      body: [
        "Mjerimo kako se stranica koristi da znamo koje stranice i izleti imaju smisla. To je mjerenje skupno: bilježi stvari poput toga koja je destinacija i koji cjenovni razred pretraživan, a nikada vaše ime, e-poštu, telefon ili poruku.",
      ],
    },
    {
      heading: "Vaša prava",
      body: [
        "Možete od nas tražiti presliku svojih podataka, njihov ispravak, brisanje, ograničenje ili prestanak obrade te prijenos podataka u prenosivom obliku. Privolu danu u obrascu možete povući u svakom trenutku, što ne utječe na ono što smo učinili prije povlačenja.",
        "Pišite na hello@adriaticbyboat.com i odgovorit ćemo u roku od mjesec dana.",
        "Ako smatrate da smo loše postupali s vašim podacima, možete se obratiti Agenciji za zaštitu osobnih podataka (azop.hr) ili nadzornom tijelu u državi u kojoj živite.",
      ],
    },
    {
      heading: "Izmjene ovih pravila",
      body: [
        "Kada izmijenimo ova pravila, objavljujemo novu verziju i uz vaš upit bilježimo na koju ste verziju pristali, kako bi uvijek bilo jasno što vam je tada rečeno.",
      ],
    },
  ],
};

/**
 * The policy body exists in English and Croatian — the default locale, and the
 * language of the country the business operates from. The other eight locales
 * are served the English text with a translated notice saying so, which is at
 * least honest about what the reader is getting. Machine-translating a document
 * people rely on for their legal rights would not be.
 */
export function getPolicy(locale: Locale): PolicyContent {
  return locale === "hr" ? hr : en;
}
