// // One-time seed script — populates the service catalog shown in the
// // reference screenshot so the page has real data to render immediately.
// //
// // Run with: node utils/seedServices.js
// // (from inside your server/ folder, with MONGO_URI set in .env)

// require("dotenv").config();
// const mongoose = require("mongoose");
// const Service = require("../models/Service");

// const SAMPLE_SERVICES = [
//   {
//     name: "Same-Day Dry Cleaning",
//     description: "Premium garment care for suits and delicate fabrics, returned meticulously pressed the same day.",
//     category: "Laundry",
//     price: 45,
//     rating: 4.8,
//     eta: "4 hours",
//     status: "available",
//     curated: false,
//     image: "https://images.unsplash.com/photo-1610557892470-55d587bef7f3?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Shoe Polishing Service",
//     description: "Traditional spit-shine and conditioning for leather goods by our master cobbler.",
//     category: "Laundry",
//     price: 25,
//     rating: 4.7,
//     eta: "2 hours",
//     status: "available",
//     curated: false,
//     image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Express Ironing",
//     description: "Up to 3 items ironed and returned immediately for last-minute meetings.",
//     category: "Laundry",
//     price: 30,
//     rating: 4.5,
//     eta: "30 mins",
//     status: "unavailable",
//     curated: false,
//     image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Vintage Champagne & Caviar",
//     description: "Dom Pérignon pairing with 30g of Imperial Beluga Caviar, blinis, and crème fraîche.",
//     category: "Food & Drinks",
//     price: 320,
//     rating: 5,
//     eta: "20 mins",
//     status: "available",
//     curated: true,
//     image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Chauffeur to Airport",
//     description: "Mercedes S-Class transfer to the local international airport. Includes luggage assistance.",
//     category: "Transport",
//     price: 150,
//     rating: 5,
//     eta: "Schedule Now",
//     status: "available",
//     curated: true,
//     image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Truffle Lobster Risotto",
//     description: "Creamy carnaroli rice with butter-poached lobster, shaved black truffle, and aged parmesan.",
//     category: "Food & Drinks",
//     price: 85,
//     rating: 5,
//     eta: "45 mins",
//     status: "available",
//     curated: true,
//     image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "In-Room Massage",
//     description: "60-minute deep tissue or Swedish massage performed by a licensed therapist in your suite.",
//     category: "Spa & Wellness",
//     price: 140,
//     rating: 4.9,
//     eta: "Schedule Now",
//     status: "available",
//     curated: false,
//     image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Extra Turndown Service",
//     description: "A second nightly turndown with fresh linens, chocolates, and ambient lighting setup.",
//     category: "Housekeeping",
//     price: 20,
//     rating: 4.6,
//     eta: "1 hour",
//     status: "available",
//     curated: false,
//     image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Continental Breakfast in Suite",
//     description: "Pastries, fresh fruit, yogurt, and your choice of coffee or tea, delivered to your room.",
//     category: "Room Service",
//     price: 35,
//     rating: 4.7,
//     eta: "30 mins",
//     status: "available",
//     curated: false,
//     image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// const run = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Connected to MongoDB");

//     await Service.deleteMany({});
//     console.log("Cleared existing services");

//     const created = await Service.insertMany(SAMPLE_SERVICES);
//     console.log(`Seeded ${created.length} services`);

//     process.exit(0);
//   } catch (err) {
//     console.error("Seed failed:", err.message);
//     process.exit(1);
//   }
// };

// run();