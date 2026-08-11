import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { ListYourBoatDialog } from "./ListYourBoatDialog";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: string; search?: Record<string, string>; hash?: string };

const linkProps = (item: NavItem) => ({
  to: item.to,
  ...(item.search ? { search: item.search as never } : {}),
  ...(item.hash ? { hash: item.hash } : {}),
});

const nav: NavItem[] = [
  { label: "Experiences", to: "/search" },
  { label: "Destinations", to: "/", hash: "destinations" },
  { label: "Rent a boat", to: "/search", search: { type: "rental" } },
];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        solid ? "border-b border-border bg-background/95 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[74px]">
        <Link to="/" aria-label="MAREVO home" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun">
          <Logo tone={solid ? "ink" : "light"} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              {...linkProps(item)}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                solid ? "text-ink/75 hover:bg-secondary hover:text-ink" : "text-background/85 hover:bg-background/10 hover:text-background",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ListYourBoatDialog>
            <button
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                solid ? "text-ink/75 hover:bg-secondary hover:text-ink" : "text-background/85 hover:bg-background/10 hover:text-background",
              )}
            >
              List your boat
            </button>
          </ListYourBoatDialog>
          <Link
            to="/"
            hash="faq"
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors",
              solid ? "text-ink/75 hover:bg-secondary hover:text-ink" : "text-background/85 hover:bg-background/10 hover:text-background",
            )}
          >
            Help
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <span
            aria-label="Language and currency: English, Euro"
            className={cn(
              "hidden items-center gap-1.5 px-3 py-2 text-sm sm:inline-flex",
              solid ? "text-ink/75" : "text-background/85",
            )}
          >
            <Globe className="h-4 w-4" aria-hidden="true" /> EN · €
          </span>

          <Button asChild variant={solid ? "ink" : "light"} size="sm" className="hidden h-9 px-4 sm:inline-flex">
            <Link to="/search">Find boats</Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className={cn("lg:hidden", solid ? "text-ink" : "text-background hover:bg-background/10 hover:text-background")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm border-l border-border bg-background p-0 [&>button]:hidden">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo />
                <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav aria-label="Mobile" className="flex flex-col px-3 py-3">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    {...linkProps(item)}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-3 font-display text-xl text-ink transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
                <ListYourBoatDialog>
                  <button className="rounded-md px-3 py-3 text-left font-display text-xl text-ink transition-colors hover:bg-secondary">
                    List your boat
                  </button>
                </ListYourBoatDialog>
                <Link
                  to="/"
                  hash="faq"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 font-display text-xl text-ink transition-colors hover:bg-secondary"
                >
                  Help
                </Link>
              </nav>
              <div className="border-t border-border px-5 py-5">
                <Button asChild variant="sun" size="lg" className="w-full">
                  <Link to="/search" onClick={() => setMenuOpen(false)}>
                    Find boats
                  </Link>
                </Button>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" aria-hidden="true" /> English · EUR
                </span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
