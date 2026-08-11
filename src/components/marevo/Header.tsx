import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Logo } from "./Logo";
import { ListYourBoatDialog } from "./ListYourBoatDialog";
import { cn } from "@/lib/utils";
import {
  localeNames,
  locales,
  localizedPath,
  switchLocalePath,
  useI18n,
  type MessageKey,
} from "@/i18n";

type NavItem = { label: MessageKey; to: string; search?: Record<string, string>; hash?: string };

const linkProps = (item: NavItem, locale: ReturnType<typeof useI18n>["locale"]) => ({
  to: localizedPath(item.to, locale) as never,
  ...(item.search ? { search: item.search as never } : {}),
  ...(item.hash ? { hash: item.hash } : {}),
});

const nav: NavItem[] = [
  { label: "nav.experiences", to: "/search" },
  { label: "nav.destinations", to: "/", hash: "destinations" },
  { label: "nav.rentBoat", to: "/search", search: { type: "rental" } },
];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, t } = useI18n();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const searchStr = useRouterState({ select: (state) => state.location.searchStr });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[74px]">
        <Link
          to={localizedPath("/", locale) as never}
          aria-label="MAREVO home"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun"
        >
          <Logo tone={solid ? "ink" : "light"} />
        </Link>

        <nav aria-label={t("nav.main")} className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              {...linkProps(item, locale)}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                solid
                  ? "text-ink/75 hover:bg-secondary hover:text-ink"
                  : "text-background/85 hover:bg-background/10 hover:text-background",
              )}
            >
              {t(item.label)}
            </Link>
          ))}
          <ListYourBoatDialog>
            <button
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                solid
                  ? "text-ink/75 hover:bg-secondary hover:text-ink"
                  : "text-background/85 hover:bg-background/10 hover:text-background",
              )}
            >
              {t("nav.listBoat")}
            </button>
          </ListYourBoatDialog>
          <Link
            to={localizedPath("/", locale) as never}
            hash="faq"
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors",
              solid
                ? "text-ink/75 hover:bg-secondary hover:text-ink"
                : "text-background/85 hover:bg-background/10 hover:text-background",
            )}
          >
            {t("nav.help")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label={t("language.change")}
                className={cn(
                  "hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors sm:inline-flex",
                  solid
                    ? "text-ink/75 hover:bg-secondary hover:text-ink"
                    : "text-background/85 hover:bg-background/10 hover:text-background",
                )}
              >
                <Globe className="h-4 w-4" aria-hidden="true" /> {locale.toUpperCase()} · €
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-52 p-1.5">
              <div className="grid gap-0.5">
                {locales.map((code) => (
                  <a
                    key={code}
                    href={`${switchLocalePath(pathname, code)}${searchStr}`}
                    hrefLang={code}
                    lang={code}
                    aria-current={locale === code ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary",
                      locale === code && "bg-secondary font-medium",
                    )}
                  >
                    {localeNames[code]}
                    <span className="text-xs text-muted-foreground">{code.toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button
            asChild
            variant={solid ? "ink" : "light"}
            size="sm"
            className="hidden h-9 px-4 sm:inline-flex"
          >
            <Link to={localizedPath("/search", locale) as never}>{t("nav.findBoats")}</Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("nav.openMenu")}
                className={cn(
                  "lg:hidden",
                  solid
                    ? "text-ink"
                    : "text-background hover:bg-background/10 hover:text-background",
                )}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[86vw] max-w-sm border-l border-border bg-background p-0 [&>button]:hidden"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("nav.closeMenu")}
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav aria-label={t("nav.mobile")} className="flex flex-col px-3 py-3">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    {...linkProps(item, locale)}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-3 font-display text-xl text-ink transition-colors hover:bg-secondary"
                  >
                    {t(item.label)}
                  </Link>
                ))}
                <ListYourBoatDialog>
                  <button className="rounded-md px-3 py-3 text-left font-display text-xl text-ink transition-colors hover:bg-secondary">
                    {t("nav.listBoat")}
                  </button>
                </ListYourBoatDialog>
                <Link
                  to={localizedPath("/", locale) as never}
                  hash="faq"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 font-display text-xl text-ink transition-colors hover:bg-secondary"
                >
                  {t("nav.help")}
                </Link>
              </nav>
              <div className="border-t border-border px-5 py-5">
                <Button asChild variant="sun" size="lg" className="w-full">
                  <Link
                    to={localizedPath("/search", locale) as never}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t("nav.findBoats")}
                  </Link>
                </Button>
                <div className="mt-4 grid grid-cols-2 gap-1">
                  {locales.map((code) => (
                    <a
                      key={code}
                      href={switchLocalePath(pathname, code)}
                      hrefLang={code}
                      lang={code}
                      className={cn(
                        "rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-ink",
                        locale === code && "bg-secondary font-medium text-ink",
                      )}
                    >
                      {localeNames[code]}
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
