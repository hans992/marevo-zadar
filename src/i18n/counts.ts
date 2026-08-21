import type { Locale } from "./index";

/**
 * Counted phrases, built per language rather than by gluing a number to a noun.
 *
 * "{n} {noun} {preposition} {n} {noun}" cannot be assembled from parts here.
 * Slavic languages need a third form for 2–4 and change the ending again after
 * a preposition — "6 brodova za 4 gosta" but "3 broda za 2 gosta" — and
 * Hungarian puts the postposition last and never pluralises after a numeral.
 * So each locale gets the whole phrase.
 */

/** Polish, Slovak and Czech pick the 2–4 form by the last digit, except in the teens. */
function slavicFew(count: number): boolean {
  const last = count % 10;
  const lastTwo = count % 100;
  return last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14);
}

function boats(count: number, locale: Locale): string {
  switch (locale) {
    case "hr":
      return `${count} ${count === 1 ? "brod" : count >= 2 && count <= 4 ? "broda" : "brodova"}`;
    case "sl":
      return `${count} ${count === 1 ? "plovilo" : count === 2 ? "plovili" : count <= 4 ? "plovila" : "plovil"}`;
    case "de":
      return `${count} ${count === 1 ? "Boot" : "Boote"}`;
    case "pl":
      return `${count} ${count === 1 ? "łódź" : slavicFew(count) ? "łodzie" : "łodzi"}`;
    case "hu":
      // Hungarian never pluralises a noun that already carries a numeral.
      return `${count} hajó`;
    case "sk":
      return `${count} ${count === 1 ? "loď" : slavicFew(count) ? "lode" : "lodí"}`;
    case "cs":
      return `${count} ${count === 1 ? "loď" : slavicFew(count) ? "lodě" : "lodí"}`;
    case "fr":
      return `${count} ${count === 1 ? "bateau" : "bateaux"}`;
    case "es":
      return `${count} ${count === 1 ? "barco" : "barcos"}`;
    default:
      return `${count} ${count === 1 ? "boat" : "boats"}`;
  }
}

/** "for N guests" — the noun takes the case the preposition governs. */
function forGuests(count: number, locale: Locale): string {
  switch (locale) {
    case "hr":
      return `za ${count} ${count <= 4 ? "gosta" : "gostiju"}`;
    case "sl":
      return `za ${count} ${count === 1 ? "gosta" : count === 2 ? "gosta" : count <= 4 ? "goste" : "gostov"}`;
    case "de":
      return `für ${count} ${count === 1 ? "Gast" : "Gäste"}`;
    case "pl":
      return `dla ${count} ${count === 1 ? "gościa" : "gości"}`;
    case "hu":
      return `${count} fő részére`;
    case "sk":
      return `pre ${count} ${count === 1 ? "hosťa" : "hostí"}`;
    case "cs":
      return `pro ${count} ${count === 1 ? "hosta" : slavicFew(count) ? "hosty" : "hostů"}`;
    case "fr":
      return `pour ${count} ${count === 1 ? "voyageur" : "voyageurs"}`;
    case "es":
      return `para ${count} ${count === 1 ? "viajero" : "viajeros"}`;
    default:
      return `for ${count} ${count === 1 ? "guest" : "guests"}`;
  }
}

/** The line above the search results: "6 boats for 4 guests". */
export function resultsSummary(boatCount: number, guestCount: number, locale: Locale): string {
  return `${boats(boatCount, locale)} ${forGuests(guestCount, locale)}`;
}

/** The mobile filter drawer's confirm button: "Show 6 boats". */
export function showBoatsLabel(count: number, locale: Locale): string {
  const counted = boats(count, locale);
  switch (locale) {
    case "hr":
      return `Prikaži ${counted}`;
    case "sl":
      return `Prikaži ${counted}`;
    case "de":
      return `${counted} anzeigen`;
    case "pl":
      return `Pokaż ${counted}`;
    case "hu":
      // Nominalised, which is how Hungarian buttons read and which sidesteps
      // the accusative the verb form would need.
      return `${counted} megjelenítése`;
    case "sk":
      return `Zobraziť ${counted}`;
    case "cs":
      return `Zobrazit ${counted}`;
    case "fr":
      return `Afficher ${counted}`;
    case "es":
      return `Mostrar ${counted}`;
    default:
      return `Show ${counted}`;
  }
}
