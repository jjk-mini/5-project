// LuxuryStay Hospitality — Guest Services Data

export const categories = [
  "All Services",
  "Food & Drinks",
  "Laundry",
  "Spa & Wellness",
  "Housekeeping",
  "Room Service",
  "Transport",
];

export const services = [
  // ---------- Laundry ----------
  {
    id: "svc-001",
    name: "Same-Day Dry Cleaning",
    category: "Laundry",
    description:
      "Premium garment care for suits and delicate fabrics, returned meticulously pressed and folded.",
    price: 45,
    rating: 4.8,
    duration: "4 hours",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },
  {
    id: "svc-002",
    name: "Shoe Polishing Service",
    category: "Laundry",
    description:
      "Traditional spit-shine and conditioning for leather goods by our master concierge staff.",
    price: 25,
    rating: 4.7,
    duration: "2 hours",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },
  {
    id: "svc-003",
    name: "Express Ironing",
    category: "Laundry",
    description:
      "Up to 3 items ironed and returned immediately for last-minute meetings or dinners.",
    price: 30,
    rating: 4.5,
    duration: "30 mins",
    availability: "busy",
    image:
      "https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },

  // ---------- Food & Drinks ----------
  {
    id: "svc-004",
    name: "Vintage Champagne & Caviar",
    category: "Food & Drinks",
    description:
      "Dom Pérignon pairing with 30g of Imperial Beluga Caviar, blinis, and crème fraiche.",
    price: 320,
    rating: 5,
    duration: "20 mins",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
    curated: true,
  },
  {
    id: "svc-005",
    name: "Truffle Lobster Risotto",
    category: "Food & Drinks",
    description:
      "Creamy carnaroli rice with butter-poached lobster, shaved black truffle, and aged parmesan.",
    price: 85,
    rating: 4.9,
    duration: "45 mins",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
    curated: true,
  },
  {
    id: "svc-006",
    name: "Artisan Cheese Board",
    category: "Food & Drinks",
    description:
      "A curated selection of aged European cheeses with honeycomb, figs, and toasted walnut bread.",
    price: 60,
    rating: 4.6,
    duration: "25 mins",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },

  // ---------- Spa & Wellness ----------
  {
    id: "svc-007",
    name: "Signature Deep Tissue Massage",
    category: "Spa & Wellness",
    description:
      "A 60-minute therapeutic massage performed in-suite by our resident wellness therapist.",
    price: 150,
    rating: 4.9,
    duration: "60 mins",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },
  {
    id: "svc-008",
    name: "Private Steam & Sauna Session",
    category: "Spa & Wellness",
    description:
      "Reserve exclusive access to the wellness suite's steam room and cedar sauna.",
    price: 90,
    rating: 4.7,
    duration: "45 mins",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },

  // ---------- Housekeeping ----------
  {
    id: "svc-009",
    name: "Turndown & Refresh",
    category: "Housekeeping",
    description:
      "Evening turndown service with fresh linens, ambient lighting, and a bedside amenity.",
    price: 20,
    rating: 4.8,
    duration: "20 mins",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },
  {
    id: "svc-010",
    name: "Deep Suite Refresh",
    category: "Housekeeping",
    description:
      "A thorough mid-stay cleaning and restocking of all in-room amenities.",
    price: 35,
    rating: 4.6,
    duration: "50 mins",
    availability: "busy",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },

  // ---------- Room Service ----------
  {
    id: "svc-011",
    name: "Continental Breakfast in Suite",
    category: "Room Service",
    description:
      "Freshly baked pastries, seasonal fruit, and artisan coffee delivered each morning.",
    price: 40,
    rating: 4.8,
    duration: "30 mins",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },
  {
    id: "svc-012",
    name: "Midnight Dessert Tray",
    category: "Room Service",
    description:
      "A late-night selection of house-made chocolates, petit fours, and dessert wine.",
    price: 55,
    rating: 4.7,
    duration: "30 mins",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },

  // ---------- Transport ----------
  {
    id: "svc-013",
    name: "Chauffeur to Airport",
    category: "Transport",
    description:
      "Mercedes S-Class transfer to the local international airport. Includes luggage assistance.",
    price: 150,
    rating: 5,
    duration: "Schedule Now",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop",
    curated: true,
  },
  {
    id: "svc-014",
    name: "Private City Tour",
    category: "Transport",
    description:
      "A half-day chauffeured tour of the city's landmarks with a personal guide.",
    price: 220,
    rating: 4.8,
    duration: "4 hours",
    availability: "available",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop",
    curated: false,
  },
];

export const faqs = [
  {
    id: "faq-001",
    question: "How long does room service usually take?",
    answer:
      "Most room service orders are delivered within 30-45 minutes. You can check the estimated delivery time on each service card. For expedited requests, please contact the concierge directly.",
  },
  {
    id: "faq-002",
    question: "Can I schedule a service in advance?",
    answer:
      "Yes. Most services can be scheduled ahead of time for a preferred date and time. Simply add a note in the special instructions field when placing your order, or contact the concierge to arrange a fixed appointment.",
  },
  {
    id: "faq-003",
    question: "Are gratuities included in the final price?",
    answer:
      "A 10% service charge is automatically applied to every order to cover gratuities for our staff. No additional tipping is required, though it is always welcome for exceptional service.",
  },
  {
    id: "faq-004",
    question: "What are the hours for the Spa & Wellness center?",
    answer:
      "The Spa & Wellness center is open daily from 7:00 AM to 9:00 PM. In-suite spa services can be booked outside of these hours by special arrangement with the concierge.",
  },
  {
    id: "faq-005",
    question: "Is there a cancellation fee for booked services?",
    answer:
      "Services cancelled more than 2 hours before the scheduled time incur no fee. Cancellations within 2 hours of the appointment may be subject to a 25% cancellation charge.",
  },
];