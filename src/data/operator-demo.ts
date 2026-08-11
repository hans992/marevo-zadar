export type DemoRequestStatus = "new" | "accepted" | "declined";

export type DemoBookingRequest = {
  id: string;
  guest: string;
  initials: string;
  country: string;
  experience: string;
  date: string;
  guests: number;
  amount: number;
  received: string;
  note: string;
  status: DemoRequestStatus;
};

export const demoBookingRequests: DemoBookingRequest[] = [
  {
    id: "MRV-7K2F",
    guest: "Sophie Martin",
    initials: "SM",
    country: "France",
    experience: "Kornati Private Escape",
    date: "14 Aug 2026",
    guests: 6,
    amount: 690,
    received: "12 min ago",
    note: "Two families with small children. They prefer longer swim stops and a quiet lunch bay.",
    status: "new",
  },
  {
    id: "MRV-4P9A",
    guest: "Daniel Weber",
    initials: "DW",
    country: "Germany",
    experience: "Sunset Sailing from Zadar",
    date: "16 Aug 2026",
    guests: 4,
    amount: 220,
    received: "28 min ago",
    note: "Anniversary trip. Asked whether a bottle of sparkling wine can be arranged.",
    status: "new",
  },
  {
    id: "MRV-2M8C",
    guest: "Aoife Brennan",
    initials: "AB",
    country: "Ireland",
    experience: "Hidden Bays of Ugljan",
    date: "18 Aug 2026",
    guests: 3,
    amount: 390,
    received: "1 hr ago",
    note: "Late flight at 20:30. They need to be back in Zadar by 16:30.",
    status: "new",
  },
  {
    id: "MRV-9D3R",
    guest: "Emma Clarke",
    initials: "EC",
    country: "United Kingdom",
    experience: "Telašćica & Sea Cliffs",
    date: "20 Aug 2026",
    guests: 7,
    amount: 720,
    received: "3 hrs ago",
    note: "One guest is not a confident swimmer and would like an extra life jacket.",
    status: "accepted",
  },
];

export const demoFleet = [
  {
    name: "Merica",
    type: "Cabin motorboat",
    capacity: 8,
    experience: "Kornati Private Escape",
    nextTrip: "14 Aug · 08:30",
    status: "Ready",
  },
  {
    name: "Kaštel",
    type: "Cabin motorboat",
    capacity: 8,
    experience: "Telašćica & Sea Cliffs",
    nextTrip: "20 Aug · 08:30",
    status: "Ready",
  },
  {
    name: "Ika",
    type: "RIB",
    capacity: 8,
    experience: "Custom private rental",
    nextTrip: "No booking",
    status: "Maintenance",
  },
];

export const demoAvailability = [
  { day: "Wed", date: "12", state: "available", trips: 0 },
  { day: "Thu", date: "13", state: "available", trips: 1 },
  { day: "Fri", date: "14", state: "busy", trips: 2 },
  { day: "Sat", date: "15", state: "busy", trips: 2 },
  { day: "Sun", date: "16", state: "partial", trips: 1 },
  { day: "Mon", date: "17", state: "blocked", trips: 0 },
  { day: "Tue", date: "18", state: "available", trips: 1 },
] as const;
