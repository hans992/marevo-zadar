import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Euro,
  Inbox,
  LayoutDashboard,
  MessageSquareText,
  MoreHorizontal,
  Ship,
  Users,
  X,
} from "lucide-react";
import { Logo } from "@/components/marevo/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  demoAvailability,
  demoBookingRequests,
  demoFleet,
  type DemoBookingRequest,
  type DemoRequestStatus,
} from "@/data/operator-demo";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { guestNoun, localizedPath, useI18n } from "@/i18n";
import {
  getOperatorCopy,
  localizedOperatorValue,
  operatorDate,
  operatorRelativeTime,
  operatorStatus,
} from "@/i18n/operator";
import { experiences } from "@/data/inventory";
import { localizeExperience } from "@/i18n/content";

export const Route = createFileRoute("/operator")({
  head: () => ({
    meta: [
      { title: "Operator workspace demo — MAREVO" },
      {
        name: "description",
        content: "Presentation preview of the future MAREVO operator workspace.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: OperatorWorkspace,
});

const statusStyles: Record<DemoRequestStatus, string> = {
  new: "border-sun/40 bg-sun/15 text-ink",
  accepted: "border-sea/20 bg-sea/10 text-sea",
  declined: "border-border bg-secondary text-muted-foreground",
};

export function OperatorWorkspace() {
  const { locale } = useI18n();
  const c = getOperatorCopy(locale);
  const [requests, setRequests] = useState(demoBookingRequests);

  const newCount = requests.filter((request) => request.status === "new").length;
  const acceptedValue = requests
    .filter((request) => request.status === "accepted")
    .reduce((sum, request) => sum + request.amount, 0);

  const stats = useMemo(
    () => [
      {
        label: c.newRequests,
        value: String(newCount),
        detail: c.awaitingReply,
        icon: Inbox,
        tone: "bg-sun/15 text-ink",
      },
      {
        label: c.confirmedMonth,
        value: "12",
        detail: c.moreThanJuly,
        icon: Check,
        tone: "bg-sea/10 text-sea",
      },
      {
        label: c.bookingValue,
        value: `€${(8_460 + acceptedValue).toLocaleString("en")}`,
        detail: c.confirmedRequests,
        icon: Euro,
        tone: "bg-sky/15 text-sea",
      },
      {
        label: c.averageResponse,
        value: c.minutes,
        detail: c.faster,
        icon: Clock3,
        tone: "bg-secondary text-ink",
      },
    ],
    [acceptedValue, c, newCount],
  );

  function setRequestStatus(id: string, status: DemoRequestStatus) {
    if (status === "accepted" || status === "declined") {
      trackEvent("operator_demo_request_updated", { action: status });
    }
    setRequests((current) =>
      current.map((request) => (request.id === id ? { ...request, status } : request)),
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-ink">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link to={localizedPath("/", locale) as never} aria-label={c.marketplace}>
              <Logo />
            </Link>
            <div className="hidden h-6 w-px bg-border sm:block" />
            <Badge
              variant="outline"
              className="hidden border-sun/50 bg-sun/10 font-medium sm:inline-flex"
            >
              {c.demoWorkspace}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to={localizedPath("/", locale) as never}>
                {c.viewMarketplace} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-ink text-xs font-semibold text-background">
              LK
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[220px_1fr]">
        <aside className="hidden min-h-[calc(100vh-4rem)] border-r border-ink/10 bg-background/60 px-4 py-6 lg:block">
          <p className="px-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {c.operator}
          </p>
          <nav className="mt-3 space-y-1" aria-label={c.workspace}>
            {[
              { label: c.overview, icon: LayoutDashboard, active: true },
              { label: c.requests, icon: Inbox, count: newCount },
              { label: c.bookings, icon: CalendarDays },
              { label: c.boats, icon: Ship },
              { label: c.experiences, icon: Anchor },
            ].map((item) => (
              <button
                key={item.label}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition",
                  item.active
                    ? "bg-ink text-background"
                    : "text-ink/65 hover:bg-secondary hover:text-ink",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {item.count ? (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1 text-[10px] font-bold text-ink">
                    {item.count}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-xl border border-sea/15 bg-sea/5 p-4">
            <p className="text-xs font-semibold text-sea">{c.presentationMode}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {c.presentationNote}
            </p>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-[1120px]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-sun/50 bg-sun/10 font-medium sm:hidden"
                  >
                    {c.demoWorkspace}
                  </Badge>
                </div>
                <p className="eyebrow mt-3 text-sea sm:mt-0">
                  {new Intl.DateTimeFormat(locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }).format(new Date("2026-08-12T12:00:00Z"))}
                </p>
                <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                  {c.greeting}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">{c.intro}</p>
              </div>
              <Button variant="ink">
                <CalendarDays className="h-4 w-4" /> {c.blockDates}
              </Button>
            </div>

            <section
              className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
              aria-label={c.summary}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-ink/10 bg-background p-4 shadow-[0_8px_30px_rgba(8,42,53,0.04)]"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                    <span className={cn("grid h-8 w-8 place-items-center rounded-lg", stat.tone)}>
                      <stat.icon className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-3 font-display text-2xl font-medium">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.detail}</p>
                </div>
              ))}
            </section>

            <Tabs defaultValue="requests" className="mt-8">
              <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-none border-b border-ink/10 bg-transparent p-0">
                <TabsTrigger
                  value="requests"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-sea data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {c.requests}
                  {newCount ? (
                    <span className="ml-2 rounded-full bg-sun px-1.5 py-0.5 text-[10px] text-ink">
                      {newCount}
                    </span>
                  ) : null}
                </TabsTrigger>
                <TabsTrigger
                  value="availability"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-sea data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {c.availability}
                </TabsTrigger>
                <TabsTrigger
                  value="fleet"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-sea data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {c.fleetExperiences}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="requests" className="mt-5">
                <div className="overflow-hidden rounded-xl border border-ink/10 bg-background">
                  <div className="flex items-center justify-between border-b border-ink/10 px-4 py-4 sm:px-5">
                    <div>
                      <h2 className="font-display text-xl font-medium">{c.incomingRequests}</h2>
                      <p className="mt-0.5 text-xs text-muted-foreground">{c.newestFirst}</p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label={c.requestOptions}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="divide-y divide-ink/10">
                    {requests.map((request) => (
                      <RequestRow key={request.id} request={request} onStatus={setRequestStatus} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="availability" className="mt-5">
                <div className="rounded-xl border border-ink/10 bg-background p-4 sm:p-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="font-display text-xl font-medium">12–18 August</h2>
                      <p className="mt-1 text-xs text-muted-foreground">{c.schedule}</p>
                    </div>
                    <div className="flex gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <i className="h-2 w-2 rounded-full bg-sea" /> {c.available}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="h-2 w-2 rounded-full bg-sun" /> {c.trips}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="h-2 w-2 rounded-full bg-ink/25" /> {c.blocked}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                    {demoAvailability.map((day) => (
                      <div
                        key={day.date}
                        className={cn(
                          "min-h-28 rounded-lg border p-3",
                          day.state === "busy" && "border-sun/50 bg-sun/10",
                          day.state === "blocked" &&
                            "border-ink/10 bg-secondary/80 text-muted-foreground",
                          day.state === "available" && "border-sea/15 bg-sea/5",
                          day.state === "partial" && "border-border bg-background",
                        )}
                      >
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          {new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
                            new Date(`2026-08-${day.date}T12:00:00Z`),
                          )}
                        </p>
                        <p className="mt-1 font-display text-2xl">{day.date}</p>
                        <p className="mt-4 text-xs font-medium">
                          {day.state === "blocked"
                            ? c.maintenance
                            : day.trips
                              ? `${day.trips} ${day.trips === 1 ? c.trip : c.trips.toLocaleLowerCase(locale)}`
                              : c.open}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-3 rounded-lg border border-ink/10 bg-[#f4f3ef] p-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-background">
                      <CalendarDays className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{c.maintenanceBlackout}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {new Intl.DateTimeFormat(locale, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        }).format(new Date("2026-08-17T12:00:00Z"))}{" "}
                        · {c.allDay}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fleet" className="mt-5">
                <div className="grid gap-4 lg:grid-cols-3">
                  {demoFleet.map((boat) => (
                    <article
                      key={boat.name}
                      className="rounded-xl border border-ink/10 bg-background p-5"
                    >
                      <div className="flex items-start justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-sea/10 text-sea">
                          <Ship className="h-5 w-5" />
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            boat.status === "Ready"
                              ? "border-sea/20 bg-sea/5 text-sea"
                              : "border-sun/40 bg-sun/10 text-ink"
                          }
                        >
                          {localizedOperatorValue(boat.status, c)}
                        </Badge>
                      </div>
                      <h2 className="mt-4 font-display text-2xl font-medium">{boat.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {localizedOperatorValue(boat.type, c)} · {c.upTo} {boat.capacity}
                      </p>
                      <div className="mt-5 space-y-3 border-t border-ink/10 pt-4 text-xs">
                        <div>
                          <p className="text-muted-foreground">{c.primaryExperience}</p>
                          <p className="mt-0.5 font-medium">
                            {experiences.find((experience) => experience.title === boat.experience)
                              ? localizeExperience(
                                  experiences.find(
                                    (experience) => experience.title === boat.experience,
                                  )!,
                                  locale,
                                ).title
                              : localizedOperatorValue(boat.experience, c)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{c.nextDeparture}</p>
                          <p className="mt-0.5 font-medium">
                            {localizedOperatorValue(boat.nextTrip, c)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-5 w-full">
                        {c.manageListing}
                      </Button>
                    </article>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

function RequestRow({
  request,
  onStatus,
}: {
  request: DemoBookingRequest;
  onStatus: (id: string, status: DemoRequestStatus) => void;
}) {
  const { locale } = useI18n();
  const c = getOperatorCopy(locale);
  return (
    <article className="p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold">
          {request.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium">{request.guest}</h3>
                <Badge variant="outline" className={cn("capitalize", statusStyles[request.status])}>
                  {operatorStatus(request.status, c)}
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {localizedOperatorValue(request.country, c)} · {request.id} ·{" "}
                {operatorRelativeTime(request.received, locale)}
              </p>
            </div>
            <p className="font-display text-xl font-medium">€{request.amount}</p>
          </div>

          <div className="mt-4 grid gap-3 rounded-lg bg-[#f4f3ef] p-3 text-xs sm:grid-cols-3">
            <div>
              <p className="text-muted-foreground">{c.experience}</p>
              <p className="mt-0.5 font-medium">
                {experiences.find((experience) => experience.title === request.experience)
                  ? localizeExperience(
                      experiences.find((experience) => experience.title === request.experience)!,
                      locale,
                    ).title
                  : request.experience}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">{c.preferredDate}</p>
              <p className="mt-0.5 font-medium">{operatorDate(request.date, locale)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">{c.guests}</p>
              <p className="mt-0.5 font-medium">
                {request.guests} {guestNoun(request.guests, locale)}
              </p>
            </div>
          </div>

          <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <MessageSquareText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sea" />
            {request.note}
          </p>

          {request.status === "new" ? (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button size="sm" variant="ink" onClick={() => onStatus(request.id, "accepted")}>
                <Check className="h-3.5 w-3.5" /> {c.acceptRequest}
              </Button>
              <Button size="sm" variant="outline" onClick={() => onStatus(request.id, "declined")}>
                <X className="h-3.5 w-3.5" /> {c.decline}
              </Button>
              <Button size="sm" variant="ghost" className="sm:ml-auto">
                <Users className="h-3.5 w-3.5" /> {c.guestDetails}
              </Button>
            </div>
          ) : (
            <p className="mt-4 text-xs font-medium text-muted-foreground">{c.localUpdate}</p>
          )}
        </div>
      </div>
    </article>
  );
}
