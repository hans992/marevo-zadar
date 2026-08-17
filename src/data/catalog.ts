export type Category = "Private tour" | "Rental" | "Shared trip";

export type Experience = {
  slug: string;
  title: string;
  category: Category;
  tags: ("private" | "rental" | "half-day" | "sunset" | "full-day")[];
  duration: string;
  durationHours: number;
  capacity: number;
  rating: number;
  reviews: number;
  price: number;
  priceUnit: "total" | "person";
  location: string;
  badge?: string;
  summary: string;
  description: string[];
  images: string[];
  boat: { name: string; type: string; length: string; engine: string; extras: string[] };
  operator: {
    name: string;
    role: string;
    since: string;
    blurb: string;
    avatar: string;
    replies: string;
  };
  itinerary: { time: string; title: string; text: string }[];
  included: string[];
  notIncluded: string[];
  meeting: string;
};

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * Location-checked Adriatic photography.
 *
 * These IDs come from photos explicitly tagged by their photographers as
 * Zadar, Kornati or Telašćica. Keeping the regional set named prevents a
 * generic tropical or Nordic stock image from quietly entering the most
 * trust-sensitive marketplace surfaces.
 */
const adriatic = {
  kornati: "1656251903367-d54e287a9a8c",
  zadarBoat: "1784395104615-bb32d5b691ac",
  zadarSunsetBoats: "1656251904340-532a27e9eb44",
  zadarSunsetSail: "1666021532118-d5d963873931",
  zadarHarbour: "1744996999291-84081fe12f05",
  telascicaCliffs: "1570695336380-47a1c55728fd",
  telascicaView: "1662918445754-fce8aad7b689",
} as const;

// Neutral boat editorial used where the experience, rather than a landmark,
// is the visual subject. It avoids implying that a generic coast is a named bay.
const editorialBoat = "1523496922380-91d5afba98a3";

const adriaticGallery = [
  adriatic.zadarBoat,
  adriatic.kornati,
  adriatic.telascicaCliffs,
  adriatic.zadarSunsetBoats,
] as const;

export const experiences: Experience[] = [
  {
    slug: "kornati-private-escape",
    title: "Kornati Private Escape",
    category: "Private tour",
    tags: ["private", "full-day"],
    duration: "Full day · 8 hours",
    durationHours: 8,
    capacity: 8,
    rating: 4.9,
    reviews: 128,
    price: 690,
    priceUnit: "total",
    location: "Departs Zadar · Gaženica marina",
    badge: "Local favourite",
    summary:
      "Eighty-nine islands, almost no roads and water so clear it looks shallow. A slow, private day through the Kornati archipelago.",
    description: [
      "The Kornati archipelago is the emptiest stretch of the Adriatic — bare limestone islands, stone huts, salt-white bays and very little else. We take it slowly: three or four swim stops, a long lunch anchored in a quiet cove, and no fixed schedule beyond the weather.",
      "The boat is yours for the day, so the route bends around what your group actually wants. Longer swims, more shade, an extra stop at a fisherman's konoba — Luka will read the sea in the morning and suggest the best version of the day.",
    ],
    images: [
      img(adriatic.zadarBoat),
      img(adriatic.kornati),
      img(adriatic.telascicaCliffs),
      img(adriatic.zadarSunsetBoats),
      img(adriatic.telascicaView),
    ],
    boat: {
      name: "Merica",
      type: "Cabin motorboat",
      length: "8.5 m",
      engine: "300 hp outboard",
      extras: [
        "Bimini shade",
        "Freshwater shower",
        "Cooler with ice",
        "Snorkel gear",
        "Bluetooth speaker",
      ],
    },
    operator: {
      name: "Luka",
      role: "Owner & skipper",
      since: "Skippering since 2011",
      blurb:
        "Born in Zadar, fishing the Kornati since he could walk. Luka runs two boats with his brother and answers every message himself.",
      avatar: img("1500648767791-00dcc994a43e", 300),
      replies: "usually replies within 30 minutes",
    },
    itinerary: [
      {
        time: "08:30",
        title: "Meet at the pier",
        text: "Coffee, a short safety briefing and a look at the day's route on the chart.",
      },
      {
        time: "09:30",
        title: "Into the archipelago",
        text: "Cruise past Ugljan and Pašman and into the open Kornati channels.",
      },
      {
        time: "11:00",
        title: "First swim stop",
        text: "A sheltered bay with no ferry traffic — around an hour in the water.",
      },
      {
        time: "13:00",
        title: "Lunch at anchor",
        text: "Optional stop at a family konoba, or eat aboard in the shade.",
      },
      {
        time: "15:00",
        title: "Second and third swims",
        text: "Quiet coves chosen for the wind on the day.",
      },
      {
        time: "17:30",
        title: "Back to Zadar",
        text: "Slow cruise home, usually with the light going gold.",
      },
    ],
    included: [
      "Private boat for your group",
      "Licensed local skipper",
      "Fuel for the full route",
      "Snorkel gear and towels",
      "Cooler with water and ice",
      "Kornati park photography stops",
    ],
    notIncluded: [
      "Kornati National Park entrance fee (paid aboard)",
      "Food and drinks",
      "Konoba lunch",
      "Gratuity",
    ],
    meeting: "Gaženica marina, pier C — 10 minutes by taxi from Zadar old town.",
  },
  {
    slug: "dugi-otok-sakarun",
    title: "Dugi Otok & Sakarun",
    category: "Private tour",
    tags: ["private", "full-day"],
    duration: "Full day · 8 hours",
    durationHours: 8,
    capacity: 10,
    rating: 4.8,
    reviews: 96,
    price: 760,
    priceUnit: "total",
    location: "Departs Zadar · Vela luka pier",
    badge: "Best for families",
    summary:
      "White pebbles, shallow turquoise water and a long lazy afternoon on the Adriatic's most photographed beach.",
    description: [
      "Sakarun is the closest thing the northern Adriatic has to a Caribbean beach: 800 metres of white pebble and water that stays waist-deep far out. It is perfect for children, and best reached by sea before the day-trip catamarans arrive.",
      "The rest of the day is spent along Dugi Otok's western coves and, if the sea allows, a look at the cliffs on the far side of the island.",
    ],
    images: [
      img(adriatic.telascicaView),
      img(adriatic.zadarBoat),
      img(adriatic.kornati),
      img(adriatic.zadarSunsetBoats),
      img(adriatic.telascicaCliffs),
    ],
    boat: {
      name: "Bura",
      type: "Open motorboat",
      length: "9.2 m",
      engine: "350 hp outboard",
      extras: ["Large sun deck", "Bimini shade", "Boarding ladder", "Child life jackets", "Cooler"],
    },
    operator: {
      name: "Ivana",
      role: "Skipper & guide",
      since: "Skippering since 2014",
      blurb:
        "Ivana grew up in Sali on Dugi Otok and knows exactly which bay is calm on which wind.",
      avatar: img("1494790108377-be9c29b29330", 300),
      replies: "usually replies within an hour",
    },
    itinerary: [
      {
        time: "09:00",
        title: "Departure from Zadar",
        text: "Straight across the channel, roughly 45 minutes of cruising.",
      },
      {
        time: "10:00",
        title: "Sakarun beach",
        text: "Anchor in the bay and swim before the crowds.",
      },
      {
        time: "12:30",
        title: "Lunch stop in Božava",
        text: "Small harbour village with two good restaurants.",
      },
      {
        time: "15:00",
        title: "Western coves",
        text: "Two more swim stops away from the main beaches.",
      },
      { time: "17:00", title: "Return", text: "Back in Zadar by early evening." },
    ],
    included: [
      "Private boat",
      "Licensed skipper",
      "Fuel",
      "Snorkel gear",
      "Child life jackets",
      "Water and ice",
    ],
    notIncluded: ["Lunch and drinks", "Mooring fees in Božava", "Gratuity"],
    meeting: "Vela luka pier, Zadar — a 5 minute walk from the Sea Organ.",
  },
  {
    slug: "hidden-bays-ugljan",
    title: "Hidden Bays of Ugljan",
    category: "Private tour",
    tags: ["private", "half-day"],
    duration: "Half day · 4 hours",
    durationHours: 4,
    capacity: 7,
    rating: 4.9,
    reviews: 74,
    price: 390,
    priceUnit: "total",
    location: "Departs Zadar · Old town riva",
    badge: "Great half day",
    summary:
      "The island Zadar swims at. Olive groves, tiny fishing hamlets and coves you can have to yourselves on a weekday morning.",
    description: [
      "Ugljan sits fifteen minutes from the old town and most visitors never set foot on it. That is exactly why it works: a short crossing, then two or three quiet bays with nothing but olive terraces above the waterline.",
      "A good option if you have a late flight, small children, or simply do not want to commit a whole day to the sea.",
    ],
    images: [
      img(editorialBoat),
      img(adriatic.zadarBoat),
      img(adriatic.kornati),
      img(adriatic.zadarSunsetBoats),
    ],
    boat: {
      name: "Mala",
      type: "Traditional wooden boat",
      length: "7 m",
      engine: "115 hp",
      extras: ["Sun canopy", "Snorkel gear", "Cooler", "Swim ladder"],
    },
    operator: {
      name: "Marin",
      role: "Owner & skipper",
      since: "Skippering since 2009",
      blurb:
        "Marin restored his grandfather's wooden gajeta and runs short trips around Ugljan year round.",
      avatar: img("1519085360753-af0119f7cbe7", 300),
      replies: "usually replies within 30 minutes",
    },
    itinerary: [
      { time: "09:30", title: "Leave the riva", text: "Short crossing to the Ugljan shore." },
      { time: "10:15", title: "First cove", text: "Swimming, snorkelling and shade." },
      {
        time: "12:00",
        title: "Fishing hamlet",
        text: "Coffee ashore in a village of twelve houses.",
      },
      { time: "13:15", title: "Back to Zadar", text: "In time for a late lunch in town." },
    ],
    included: ["Private wooden boat", "Local skipper", "Fuel", "Snorkel gear", "Water"],
    notIncluded: ["Food and drinks", "Gratuity"],
    meeting: "Zadar old town riva, in front of the Kalelarga steps.",
  },
  {
    slug: "sunset-sailing-zadar",
    title: "Sunset Sailing from Zadar",
    category: "Shared trip",
    tags: ["sunset", "half-day"],
    duration: "2.5 hours",
    durationHours: 2.5,
    capacity: 12,
    rating: 4.9,
    reviews: 214,
    price: 55,
    priceUnit: "person",
    location: "Departs Zadar · Marina Foša",
    badge: "Sells out fast",
    summary:
      "Alfred Hitchcock called it the world's most beautiful sunset. Seen from a sailing boat, with the engine off, he had a point.",
    description: [
      "A shared evening sail with a maximum of twelve guests. We leave the harbour an hour and a half before sunset, cut the engine outside the channel and sail slowly along the Zadar waterfront as the light drops.",
      "A glass of local wine and a plate of Pag cheese are included. It is calm, unhurried and deliberately not a party boat.",
    ],
    images: [
      img(adriatic.zadarSunsetSail),
      img(adriatic.zadarSunsetBoats),
      img(adriatic.zadarBoat),
      img(adriatic.zadarHarbour),
    ],
    boat: {
      name: "Levant",
      type: "Sailing yacht",
      length: "12 m",
      engine: "Sail with auxiliary diesel",
      extras: ["Cockpit seating", "Blankets", "Onboard toilet", "Sound system"],
    },
    operator: {
      name: "Toni",
      role: "Skipper",
      since: "Sailing since 2007",
      blurb:
        "Toni has raced the Adriatic for fifteen years and now spends his evenings showing people the quiet version of it.",
      avatar: img("1507003211169-0a1dd7228f2d", 300),
      replies: "usually replies within 30 minutes",
    },
    itinerary: [
      { time: "18:30", title: "Board at Marina Foša", text: "Welcome drink and a short briefing." },
      {
        time: "19:00",
        title: "Sails up",
        text: "Engine off outside the harbour, sailing along the peninsula.",
      },
      { time: "20:15", title: "Sunset", text: "Anchored or drifting, depending on the wind." },
      {
        time: "21:00",
        title: "Back ashore",
        text: "Return to the marina, five minutes from the old town.",
      },
    ],
    included: [
      "Shared sailing trip (max 12 guests)",
      "Licensed skipper and crew",
      "Glass of local wine",
      "Pag cheese and olives",
      "Blankets",
    ],
    notIncluded: ["Extra drinks", "Hotel transfer", "Gratuity"],
    meeting: "Marina Foša, pier A — beside the Land Gate.",
  },
  {
    slug: "rib-with-skipper",
    title: "Rent a RIB with Skipper",
    category: "Rental",
    tags: ["rental", "private"],
    duration: "Flexible · 3 to 8 hours",
    durationHours: 4,
    capacity: 8,
    rating: 4.8,
    reviews: 61,
    price: 420,
    priceUnit: "total",
    location: "Departs Zadar · Borik marina",
    badge: "Build your own day",
    summary:
      "A fast, comfortable RIB and a skipper who knows the coast. Tell him what you like and the route writes itself.",
    description: [
      "No fixed itinerary. Pick a start time and a length of day, then build the route with your skipper over coffee: islands, beach bars, a lunch stop, or three hours of pure swimming.",
      "The RIB handles chop far better than a small motorboat, which matters on a windy afternoon in the Zadar channel.",
    ],
    images: [...adriaticGallery.map((id) => img(id))],
    boat: {
      name: "Ika",
      type: "RIB",
      length: "7.5 m",
      engine: "250 hp outboard",
      extras: ["Bimini shade", "Dry bags", "Snorkel gear", "Bluetooth speaker", "Cooler"],
    },
    operator: {
      name: "Duje",
      role: "Owner & skipper",
      since: "Skippering since 2016",
      blurb:
        "Duje runs a small two-RIB operation from Borik and is happiest on a route nobody asked for before.",
      avatar: img("1522075469751-3a6694fb2f61", 300),
      replies: "usually replies within 30 minutes",
    },
    itinerary: [
      {
        time: "Start",
        title: "Plan it together",
        text: "Fifteen minutes with your skipper to shape the day.",
      },
      {
        time: "Middle",
        title: "Your route",
        text: "Islands, coves, beach bars or a long lunch — your call.",
      },
      {
        time: "End",
        title: "Back when you like",
        text: "Return time is set by you within the booked hours.",
      },
    ],
    included: [
      "RIB with licensed skipper",
      "Fuel for a standard route",
      "Snorkel gear",
      "Cooler with ice",
      "Dry bags",
    ],
    notIncluded: ["Extra fuel for long routes", "National park fees", "Food and drinks"],
    meeting: "Borik marina, Zadar — bus 8 or 10 minutes by taxi from the old town.",
  },
  {
    slug: "telascica-sea-cliffs",
    title: "Telašćica & Sea Cliffs",
    category: "Private tour",
    tags: ["private", "full-day"],
    duration: "Full day · 8 hours",
    durationHours: 8,
    capacity: 8,
    rating: 4.9,
    reviews: 88,
    price: 720,
    priceUnit: "total",
    location: "Departs Zadar · Gaženica marina",
    badge: "Dramatic scenery",
    summary:
      "Cliffs falling 160 metres into the sea, a salt lake warm enough to float in, and a bay shaped like a fjord.",
    description: [
      "Telašćica nature park is the southern end of Dugi Otok: a deep protected bay on one side, sheer stone cliffs on the other and the salt lake Mir in between.",
      "The day mixes a proper walk ashore with three swim stops, so it suits groups that want more than sunbathing.",
    ],
    images: [
      img(adriatic.telascicaCliffs),
      img(adriatic.telascicaView),
      img(adriatic.kornati),
      img(adriatic.zadarBoat),
    ],
    boat: {
      name: "Kaštel",
      type: "Cabin motorboat",
      length: "8.8 m",
      engine: "300 hp outboard",
      extras: ["Bimini shade", "Freshwater shower", "Snorkel gear", "Cooler", "Cabin with toilet"],
    },
    operator: {
      name: "Luka",
      role: "Owner & skipper",
      since: "Skippering since 2011",
      blurb: "Second boat of the family fleet, usually skippered by Luka or his brother Ante.",
      avatar: img("1500648767791-00dcc994a43e", 300),
      replies: "usually replies within 30 minutes",
    },
    itinerary: [
      { time: "08:30", title: "Meet and depart", text: "Briefing and a coffee at the pier." },
      {
        time: "10:00",
        title: "Sea cliffs",
        text: "Cruise beneath the 160 m stone wall of Dugi Otok.",
      },
      {
        time: "11:00",
        title: "Lake Mir",
        text: "Short walk ashore and a float in the warm salt lake.",
      },
      {
        time: "13:00",
        title: "Lunch in the bay",
        text: "Anchor in Telašćica or stop at a konoba.",
      },
      { time: "15:00", title: "Swim stops", text: "Two quiet coves on the way back." },
      { time: "17:30", title: "Return to Zadar", text: "Golden hour on the channel." },
    ],
    included: ["Private boat", "Licensed skipper", "Fuel", "Snorkel gear", "Water and ice"],
    notIncluded: ["Telašćica park fee (paid aboard)", "Food and drinks", "Gratuity"],
    meeting: "Gaženica marina, pier C.",
  },
];

export const getExperience = (slug: string) => experiences.find((e) => e.slug === slug);

export const filters = [
  { id: "all", label: "All" },
  { id: "private", label: "Private tours" },
  { id: "rental", label: "Rentals" },
  { id: "half-day", label: "Half day" },
  { id: "sunset", label: "Sunset" },
] as const;

export type FilterId = (typeof filters)[number]["id"];

export const categories = [
  {
    title: "Swim & slow down",
    text: "Coves, shade and nowhere to be",
    filter: "all",
    image: img(adriatic.zadarBoat, 900),
  },
  {
    title: "See the islands",
    text: "Kornati, Dugi Otok, Telašćica",
    filter: "private",
    image: img(adriatic.kornati, 900),
  },
  {
    title: "Make it private",
    text: "Just your group and a skipper",
    filter: "private",
    image: img(editorialBoat, 900),
  },
  {
    title: "Chase the sunset",
    text: "Two and a half hours under sail",
    filter: "sunset",
    image: img(adriatic.zadarSunsetSail, 900),
  },
];

export const destinations = [
  {
    name: "Kornati",
    context: "1h 15m from Zadar · Full day",
    text: "Eighty-nine bare islands and the emptiest water in Croatia.",
    image: img(adriatic.kornati, 900),
  },
  {
    name: "Dugi Otok",
    context: "45m from Zadar · Full day",
    text: "Sakarun's white pebbles and a coastline of quiet western coves.",
    image: img(adriatic.telascicaView, 900),
  },
  {
    name: "Ugljan & Pašman",
    context: "15m from Zadar · Half day",
    text: "Olive terraces, fishing hamlets and the city's own swimming islands.",
    image: img(adriatic.zadarHarbour, 900),
  },
  {
    name: "Telašćica",
    context: "1h from Zadar · Full day",
    text: "Sea cliffs, a fjord-like bay and the warm salt lake Mir.",
    image: img(adriatic.telascicaCliffs, 900),
  },
];

export const reviews = [
  {
    name: "Sophie",
    country: "France",
    trip: "Kornati Private Escape",
    date: "July 2026",
    text: "Luka reshaped the whole route because the wind turned, and we ended up in a bay with two other boats all day. Our kids swam for six hours. Worth every euro.",
  },
  {
    name: "Daniel",
    country: "Germany",
    trip: "Sunset Sailing from Zadar",
    date: "June 2026",
    text: "Engine off, twelve people, a glass of wine and the Zadar waterfront going orange. We booked it on our first evening and regretted not doing it twice.",
  },
  {
    name: "Aoife",
    country: "Ireland",
    trip: "Hidden Bays of Ugljan",
    date: "September 2025",
    text: "We had a late flight and half a day to spare. Marin answered within ten minutes, met us on the riva, and it turned out to be the best part of the trip.",
  },
];

export const faqs = [
  {
    q: "Is a skipper included?",
    a: "Yes. Every boat on Adriatic by Boat comes with a licensed local skipper unless a listing explicitly says bareboat. You do not need a boat licence, and the skipper handles navigation, anchoring and the route.",
  },
  {
    q: "Is fuel included in the price?",
    a: "Fuel for the standard route is included in the price you see. If your group wants to go significantly further — for example adding Kornati to a half-day rental — the skipper will agree any extra fuel cost with you before departure.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Skippers make the call the evening before or on the morning of your trip. If the sea is unsafe you are offered an alternative date, a shorter sheltered route, or a full refund. Nobody sails in a bura.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Most trips can be cancelled free of charge up to 48 hours before departure. The exact policy is shown on each listing before you send a request, and again in your confirmation.",
  },
  {
    q: "What should I bring?",
    a: "Swimwear, a towel, reef-safe sun cream, a hat and soft-soled shoes. Bring food and drinks if the trip does not include a restaurant stop — every boat has a cooler with ice.",
  },
  {
    q: "How is a request different from instant booking?",
    a: "Adriatic by Boat never sells a boat that might not be free. You send a request with your date and group size, the operator confirms the boat is available, and only then do you pay. Most replies arrive within 30 minutes.",
  },
];
