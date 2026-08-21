/**
 * Fails when a locale ships the English string.
 *
 * The operator copy is assembled as `{ ...en, ...dictionaries[locale] }` with a
 * `Partial<Copy>` override, so any key nobody translated silently falls back to
 * English and nothing complains. That is how "up to" reached nine locales, and
 * how Slovenian shipped "trip", "people" and "France" — the last of which reads
 * in Slovenian as a man's given name rather than the country.
 *
 * Values that are legitimately the same in two languages are listed below, by
 * key and locale, so that each one is a decision somebody made on purpose.
 */
import { locales, messages, type Locale } from "../src/i18n";
// These three are plain lookups despite the name — they call no hook and take a
// locale, not context. Aliased so the rules-of-hooks lint does not read a call
// from this script as a hook call outside a component.
import { usePublicCopy as publicCopy } from "../src/i18n/public";
import { useMiscCopy as miscCopy } from "../src/i18n/misc";
import { useFlowCopy as flowCopy } from "../src/i18n/flow";
import { getOperatorCopy } from "../src/i18n/operator";
import { getStatusCopy } from "../src/i18n/status";
import { getConsentCopy } from "../src/i18n/consent";
import { legalLabels } from "../src/i18n/legal";
import { getSeoCopy } from "../src/lib/seo";

/** key → locales where matching English is intended. "*" means every locale. */
const sameAsEnglish: Record<string, readonly Locale[] | "*"> = {
  // Brand name plus a word every one of these languages has borrowed anyway.
  "operator.marketplace": "*",
  // A unit, not a word.
  "operator.minutes": "*",
  // Real words in these languages that happen to match the English.
  "public.optional": ["de"],
  "public.skipperOptional": ["de"],
  "public.reference": ["cs"],
  "public.type": ["fr"],
  "public.date": ["fr"],
  "misc.destinations": ["fr"],
  "nav.nav.destinations": ["fr"],
  "nav.footer.destinations": ["fr"],
  "nav.search.date": ["fr"],
  "operator.operator": ["pl"],
  // The country really is spelled the same in French.
  "operator.countryFrance": ["fr"],
};

function flatten(namespace: string, value: unknown, path = "", out: Record<string, string> = {}) {
  if (typeof value === "string") {
    out[path ? `${namespace}.${path}` : namespace] = value;
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(namespace, item, `${path}[${index}]`, out));
    return out;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      flatten(namespace, child, path ? `${path}.${key}` : key, out);
    }
  }
  return out;
}

function copyFor(locale: Locale): Record<string, string> {
  return {
    ...flatten("public", publicCopy(locale)),
    ...flatten("misc", miscCopy(locale)),
    ...flatten("flow", flowCopy(locale)),
    ...flatten("operator", getOperatorCopy(locale)),
    ...flatten("status", getStatusCopy(locale)),
    ...flatten("consent", getConsentCopy(locale)),
    ...flatten("legal", legalLabels[locale]),
    ...flatten("seo", getSeoCopy(locale)),
    ...flatten("nav", messages[locale]),
  };
}

const english = copyFor("en");
const issues: string[] = [];

for (const locale of locales) {
  if (locale === "en") continue;
  const translated = copyFor(locale);

  for (const [key, value] of Object.entries(english)) {
    if (value.length < 2) continue;
    if (translated[key] !== value) continue;

    const allowed = sameAsEnglish[key];
    if (allowed === "*" || allowed?.includes(locale)) continue;

    issues.push(`${locale}: ${key} is still the English string ${JSON.stringify(value)}`);
  }
}

if (issues.length) {
  console.error("Translation validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  console.error(
    "\nTranslate the key for that locale, or add it to sameAsEnglish in this script " +
      "if the two languages genuinely share the word.",
  );
  process.exit(1);
}

console.log(`Validated ${Object.keys(english).length} keys across ${locales.length} locales.`);
