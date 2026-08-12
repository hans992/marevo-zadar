import type { Locale } from "./index";

type StatusCopy = {
  notFound: string;
  notFoundText: string;
  goHome: string;
  loadError: string;
  loadErrorText: string;
  tryAgain: string;
};

const copy: Record<Locale, StatusCopy> = {
  en: {
    notFound: "Page not found",
    notFoundText: "The page you are looking for does not exist or has been moved.",
    goHome: "Go home",
    loadError: "This page did not load",
    loadErrorText: "Something went wrong. Try again or return to the homepage.",
    tryAgain: "Try again",
  },
  hr: {
    notFound: "Stranica nije pronađena",
    notFoundText: "Stranica koju tražite ne postoji ili je premještena.",
    goHome: "Na početnu",
    loadError: "Stranica se nije učitala",
    loadErrorText: "Došlo je do pogreške. Pokušajte ponovno ili se vratite na početnu.",
    tryAgain: "Pokušaj ponovno",
  },
  sl: {
    notFound: "Strani ni mogoče najti",
    notFoundText: "Stran ne obstaja ali je bila premaknjena.",
    goHome: "Na začetno stran",
    loadError: "Stran se ni naložila",
    loadErrorText: "Prišlo je do napake. Poskusite znova ali se vrnite na začetno stran.",
    tryAgain: "Poskusi znova",
  },
  de: {
    notFound: "Seite nicht gefunden",
    notFoundText: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    goHome: "Zur Startseite",
    loadError: "Diese Seite wurde nicht geladen",
    loadErrorText:
      "Etwas ist schiefgegangen. Versuchen Sie es erneut oder kehren Sie zur Startseite zurück.",
    tryAgain: "Erneut versuchen",
  },
  pl: {
    notFound: "Nie znaleziono strony",
    notFoundText: "Strona nie istnieje lub została przeniesiona.",
    goHome: "Strona główna",
    loadError: "Nie udało się wczytać strony",
    loadErrorText: "Wystąpił błąd. Spróbuj ponownie lub wróć na stronę główną.",
    tryAgain: "Spróbuj ponownie",
  },
  hu: {
    notFound: "Az oldal nem található",
    notFoundText: "A keresett oldal nem létezik vagy áthelyezték.",
    goHome: "Vissza a kezdőlapra",
    loadError: "Az oldal nem töltődött be",
    loadErrorText: "Hiba történt. Próbálja újra, vagy térjen vissza a kezdőlapra.",
    tryAgain: "Újrapróbálás",
  },
  sk: {
    notFound: "Stránka sa nenašla",
    notFoundText: "Hľadaná stránka neexistuje alebo bola presunutá.",
    goHome: "Na domovskú stránku",
    loadError: "Stránka sa nenačítala",
    loadErrorText: "Nastala chyba. Skúste to znova alebo sa vráťte domov.",
    tryAgain: "Skúsiť znova",
  },
  cs: {
    notFound: "Stránka nebyla nalezena",
    notFoundText: "Hledaná stránka neexistuje nebo byla přesunuta.",
    goHome: "Na domovskou stránku",
    loadError: "Stránka se nenačetla",
    loadErrorText: "Nastala chyba. Zkuste to znovu nebo se vraťte domů.",
    tryAgain: "Zkusit znovu",
  },
  fr: {
    notFound: "Page introuvable",
    notFoundText: "La page demandée n'existe pas ou a été déplacée.",
    goHome: "Retour à l'accueil",
    loadError: "Cette page ne s'est pas chargée",
    loadErrorText: "Une erreur est survenue. Réessayez ou revenez à l'accueil.",
    tryAgain: "Réessayer",
  },
  es: {
    notFound: "Página no encontrada",
    notFoundText: "La página no existe o se ha trasladado.",
    goHome: "Volver al inicio",
    loadError: "La página no se ha cargado",
    loadErrorText: "Algo ha salido mal. Inténtalo de nuevo o vuelve al inicio.",
    tryAgain: "Intentar de nuevo",
  },
};

export const getStatusCopy = (locale: Locale) => copy[locale];
