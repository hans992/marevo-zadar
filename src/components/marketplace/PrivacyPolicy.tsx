import { Header } from "./Header";
import { Footer } from "./Footer";
import { useI18n } from "@/i18n";
import { getPolicy, legalLabels } from "@/i18n/legal";
import { PRIVACY_VERSION } from "@/lib/brand";

export function PrivacyPolicy() {
  const { locale } = useI18n();
  const policy = getPolicy(locale);
  const labels = legalLabels[locale];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-[74px]">
        <article className="mx-auto max-w-[680px] px-5 py-16 sm:px-8">
          <h1 className="font-display text-4xl font-medium tracking-tight text-foreground">
            {policy.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {labels.lastUpdated}: {PRIVACY_VERSION}
          </p>

          {labels.englishOnly ? (
            <p className="mt-6 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
              {labels.englishOnly}
            </p>
          ) : null}

          <p className="mt-8 text-base leading-relaxed text-foreground">{policy.intro}</p>

          {policy.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-display text-xl font-medium text-foreground">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </div>
  );
}
