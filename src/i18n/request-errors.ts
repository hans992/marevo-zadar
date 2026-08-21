import type { Locale } from "./index";

/**
 * The live Request-to-Book path fails on the server, before any component has a
 * locale to work with, and a server function can only carry an Error message
 * back across the boundary. So the server throws a stable machine code and this
 * table turns it into copy the guest can actually read — otherwise a Croatian
 * guest gets an English sentence in the middle of an otherwise Croatian flow.
 *
 * Codes may carry one argument after a colon, e.g. `capacity_exceeded:8`.
 */
export const requestErrorCodes = [
  "capacity_exceeded",
  "not_accepting",
  "rate_limited",
  "duplicate",
  "unavailable",
] as const;

export type RequestErrorCode = (typeof requestErrorCodes)[number];

export function requestError(code: RequestErrorCode, argument?: string | number): string {
  return argument === undefined ? code : `${code}:${argument}`;
}

// The capacity line is written as "label: number" in every language on purpose.
// Slavic and Hungarian noun cases change with the count, and a marketplace boat
// can legitimately take 1, 3 or 12 guests — this phrasing stays correct for all
// of them without a plural table per language.
const copy: Record<Locale, Record<RequestErrorCode, string>> = {
  en: {
    capacity_exceeded: "Maximum guests on this boat: {max}.",
    not_accepting: "This trip is not accepting requests right now.",
    rate_limited: "Too many requests in the last hour. Please try again later.",
    duplicate: "We have already received this request.",
    unavailable: "We could not send your request. Please try again in a moment.",
  },
  hr: {
    capacity_exceeded: "Najveći broj gostiju na ovom brodu: {max}.",
    not_accepting: "Ovaj izlet trenutačno ne prima upite.",
    rate_limited: "Previše upita u posljednjih sat vremena. Pokušajte kasnije.",
    duplicate: "Ovaj upit smo već zaprimili.",
    unavailable: "Upit nije poslan. Pokušajte ponovno za koji trenutak.",
  },
  sl: {
    capacity_exceeded: "Največje število gostov na tem plovilu: {max}.",
    not_accepting: "Ta izlet trenutno ne sprejema povpraševanj.",
    rate_limited: "Preveč povpraševanj v zadnji uri. Poskusite pozneje.",
    duplicate: "To povpraševanje smo že prejeli.",
    unavailable: "Povpraševanja ni bilo mogoče poslati. Poskusite znova čez trenutek.",
  },
  de: {
    capacity_exceeded: "Maximale Gästezahl auf diesem Boot: {max}.",
    not_accepting: "Für diesen Ausflug werden derzeit keine Anfragen angenommen.",
    rate_limited: "Zu viele Anfragen in der letzten Stunde. Bitte versuchen Sie es später erneut.",
    duplicate: "Diese Anfrage haben wir bereits erhalten.",
    unavailable: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es gleich erneut.",
  },
  pl: {
    capacity_exceeded: "Maksymalna liczba gości na tej łodzi: {max}.",
    not_accepting: "Ta wycieczka obecnie nie przyjmuje zapytań.",
    rate_limited: "Zbyt wiele zapytań w ciągu ostatniej godziny. Spróbuj później.",
    duplicate: "To zapytanie już do nas dotarło.",
    unavailable: "Nie udało się wysłać zapytania. Spróbuj ponownie za chwilę.",
  },
  hu: {
    capacity_exceeded: "A hajón utazó vendégek maximális száma: {max}.",
    not_accepting: "Erre a programra jelenleg nem fogadunk kérést.",
    rate_limited: "Túl sok kérés érkezett az elmúlt órában. Kérjük, próbálja később.",
    duplicate: "Ezt a kérést már megkaptuk.",
    unavailable: "A kérést nem sikerült elküldeni. Kérjük, próbálja újra egy pillanat múlva.",
  },
  sk: {
    capacity_exceeded: "Maximálny počet hostí na tejto lodi: {max}.",
    not_accepting: "Tento výlet momentálne neprijíma požiadavky.",
    rate_limited: "Príliš veľa požiadaviek za poslednú hodinu. Skúste to neskôr.",
    duplicate: "Túto požiadavku sme už prijali.",
    unavailable: "Požiadavku sa nepodarilo odoslať. Skúste to o chvíľu znova.",
  },
  cs: {
    capacity_exceeded: "Maximální počet hostů na této lodi: {max}.",
    not_accepting: "Tento výlet momentálně nepřijímá poptávky.",
    rate_limited: "Příliš mnoho poptávek za poslední hodinu. Zkuste to prosím později.",
    duplicate: "Tuto poptávku jsme už obdrželi.",
    unavailable: "Poptávku se nepodařilo odeslat. Zkuste to prosím za chvíli znovu.",
  },
  fr: {
    capacity_exceeded: "Nombre maximum de voyageurs sur ce bateau : {max}.",
    not_accepting: "Cette sortie n'accepte pas de demandes pour le moment.",
    rate_limited: "Trop de demandes au cours de la dernière heure. Réessayez plus tard.",
    duplicate: "Nous avons déjà reçu cette demande.",
    unavailable: "Votre demande n'a pas pu être envoyée. Réessayez dans un instant.",
  },
  es: {
    capacity_exceeded: "Número máximo de viajeros en este barco: {max}.",
    not_accepting: "Esta salida no acepta solicitudes en este momento.",
    rate_limited: "Demasiadas solicitudes en la última hora. Inténtalo más tarde.",
    duplicate: "Ya hemos recibido esta solicitud.",
    unavailable: "No hemos podido enviar tu solicitud. Inténtalo de nuevo en un momento.",
  },
};

function isRequestErrorCode(value: string): value is RequestErrorCode {
  return (requestErrorCodes as readonly string[]).includes(value);
}

/**
 * Turns whatever came back from the server into readable copy. Anything that is
 * not a known code — a network failure, a framework error — falls back rather
 * than showing the guest an internal string.
 */
export function localizeRequestError(message: string, locale: Locale, fallback: string): string {
  const separator = message.indexOf(":");
  const code = separator === -1 ? message : message.slice(0, separator);
  const argument = separator === -1 ? "" : message.slice(separator + 1);

  if (!isRequestErrorCode(code)) return fallback;
  return copy[locale][code].replace("{max}", argument);
}
