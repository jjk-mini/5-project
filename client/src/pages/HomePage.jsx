import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeModernIcon,
  SunIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  CakeIcon,
  GiftIcon,
  WifiIcon,
  TruckIcon,
  PaperAirplaneIcon,
  StarIcon,
  UsersIcon,
  TrophyIcon,
  ClockIcon,
  ArrowRightIcon,
  HeartIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export const FEATURES = [
  { icon: HomeModernIcon, title: "Quality Rooms", desc: "A perfect blend of comfort and elegance, designed to provide a relaxing retreat for our guests." },
  { icon: SunIcon, title: "Private Beach", desc: "Relax on our exclusive private beach, where soft sand and calm waters offer the perfect escape." },
  { icon: BuildingOffice2Icon, title: "Best Accommodation", desc: "Thoughtfully designed rooms equipped with modern amenities and elegant decor." },
  { icon: SparklesIcon, title: "Wellness & Spa", desc: "Rejuvenate your mind and body at our serene wellness spa in a tranquil setting." },
  { icon: CakeIcon, title: "Restaurants & Bars", desc: "Savour exquisite cuisine or unwind with a drink at our world-class restaurant and bar." },
  { icon: GiftIcon, title: "Special Offers", desc: "Exclusive deals and packages to dine, shop, and make your stay memorable on a limited basis." },
];

export const ROOMS = [
  { id: 1, type: "Standard", roomNo: "Room 101", price: "Rs. 8,000", guests: 2, amenities: 3, badge: null, img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80" },
  { id: 2, type: "Deluxe", roomNo: "Room 201", price: "Rs. 14,000", guests: 3, amenities: 4, badge: "Popular", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80" },
  { id: 3, type: "Suite", roomNo: "Room 301", price: "Rs. 22,000", guests: 3, amenities: 4, badge: null, img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80" },
  { id: 4, type: "Executive", roomNo: "Room 401", price: "Rs. 36,000", guests: 4, amenities: 5, badge: null, img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80" },
  { id: 5, type: "Presidential", roomNo: "Room 501", price: "Rs. 50,000", guests: 4, amenities: 5, badge: "Premium", img: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80" },
];

export const TESTIMONIALS = [
  { name: "Sara Ahmed", text: "A wonderful experience from start to finish. The ambiance was perfect, and the staff was attentive to every detail.", stars: 5, avatar: "SA" },
  { name: "Ali Hassan", text: "Absolutely breathtaking. The Royal Suite exceeded all expectations — impeccable service and stunning views.", stars: 5, avatar: "AH" },
  { name: "Zara Khan", text: "From check-in to checkout, every moment was perfect. Truly world class hospitality.", stars: 5, avatar: "ZK" },
];

export const AMENITIES = [
  { icon: WifiIcon, title: "Free WiFi", desc: "High-speed internet throughout the property" },
  { icon: SparklesIcon, title: "Spa & Fitness", desc: "Rejuvenate with our full service spa and gym" },
  { icon: SunIcon, title: "Rooftop Pool", desc: "Swim in the pool with stunning city views" },
  { icon: CakeIcon, title: "Fine Dining", desc: "World class cuisine served at our restaurant" },
  { icon: TruckIcon, title: "Valet Parking", desc: "Complimentary valet and secure parking" },
  { icon: PaperAirplaneIcon, title: "Airport Transfer", desc: "Complimentary pickup and drop service" },
];

const STATS = [
  { icon: UsersIcon, value: "50k+", label: "Happy Guests" },
  { icon: TrophyIcon, value: "18", label: "Awards Won" },
  { icon: StarIcon, value: "4.9", label: "Average Rating" },
  { icon: ClockIcon, value: "24/7", label: "Service Available" },
];

export const sectionLabel = {
  color: COLORS.ACCENT,
  fontFamily: FONTS.BODY,
};

export const sectionLine = {
  background: COLORS.ACCENT,
};

export const sectionTitle = {
  fontFamily: FONTS.HEADING,
  color: COLORS.TEXT_PRIMARY,
};

export const sectionSub = {
  fontFamily: FONTS.BODY,
  color: COLORS.TEXT_SECONDARY,
};

export const btnPrimary = {
  background: COLORS.PRIMARY,
  color: COLORS.CREAM,
  fontFamily: FONTS.BODY,
};

export const btnOutline = {
  color: COLORS.CREAM,
  border: "1px solid rgba(248,249,250,0.35)",
  fontFamily: FONTS.BODY,
};

const btnPrimaryClass = "inline-block cursor-pointer rounded-md border-none px-[26px] py-3 text-[13px] font-medium no-underline";
const btnOutlineClass = "inline-block cursor-pointer rounded-md bg-transparent px-[26px] py-3 text-[13px] no-underline";

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    checkIn: "", checkOut: "", adults: "1 Adult", rooms: "1 Room",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((t) => (t + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: FONTS.BODY, background: COLORS.BACKGROUND, color: COLORS.TEXT_PRIMARY }}
    >

      {/* Simple Hero Section - Static */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')`,
            transform: "scale(1.05)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(31,26,23,0.92) 0%, rgba(31,26,23,0.6) 50%, rgba(31,26,23,0.3) 80%, rgba(31,26,23,0.1) 100%),
              linear-gradient(to bottom, rgba(31,26,23,0.3) 0%, transparent 30%, transparent 60%, rgba(31,26,23,0.6) 100%)
            `
          }}
        />

        <div className="absolute top-0 left-0 w-2/5 h-px" style={{ background: `linear-gradient(to right, ${COLORS.ACCENT}, transparent)` }} />
        <div className="absolute bottom-0 right-0 w-1/4 h-px" style={{ background: `linear-gradient(to left, ${COLORS.ACCENT}, transparent)` }} />

        <div className="relative z-10 w-full container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="inline-flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-[0.15em] rounded-full"
                style={{
                  color: COLORS.ACCENT,
                  fontFamily: FONTS.BODY,
                  background: `rgba(212, 168, 130, 0.15)`,
                  border: `1px solid rgba(212, 168, 130, 0.2)`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <span className="h-px w-4" style={{ background: COLORS.ACCENT }} />
                Elegance Redefined
                <span className="h-px w-4" style={{ background: COLORS.ACCENT }} />
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 mb-4 text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15]"
              style={{
                fontFamily: FONTS.HEADING,
                color: COLORS.CREAM,
                letterSpacing: "-0.03em",
                textShadow: "0 2px 20px rgba(0,0,0,0.2)"
              }}
            >
              Experience <br />
              <span style={{ color: COLORS.ACCENT }}>Unparalleled Luxury</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-base md:text-lg font-light leading-[1.8]"
              style={{
                color: "rgba(248,246,243,0.85)",
                textShadow: "0 1px 12px rgba(0,0,0,0.15)"
              }}
            >
              Immerse yourself in a world where luxury meets comfort. Every detail is crafted to provide an unforgettable experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/rooms"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: COLORS.ACCENT,
                  color: COLORS.PRIMARY,
                  boxShadow: `0 4px 24px rgba(212, 168, 130, 0.3)`,
                }}
              >
                Explore Rooms
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:bg-white/10"
                style={{
                  color: COLORS.CREAM,
                  border: `1px solid rgba(248,246,243,0.2)`,
                }}
              >
                Contact Us
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-2xl font-light" style={{ color: COLORS.CREAM }}>120+</p>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>Rooms</p>
                </div>
                <div className="w-px h-10" style={{ background: "rgba(248,246,243,0.15)" }} />
                <div>
                  <p className="text-2xl font-light" style={{ color: COLORS.CREAM }}>4.9★</p>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>Rating</p>
                </div>
                <div className="w-px h-10" style={{ background: "rgba(248,246,243,0.15)" }} />
                <div>
                  <p className="text-2xl font-light" style={{ color: COLORS.ACCENT }}>24/7</p>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>Service</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(248,246,243,0.2)" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8"
            style={{ background: `linear-gradient(to bottom, ${COLORS.ACCENT}, transparent)` }}
          />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 md:py-20 sm:px-8 md:px-[60px] relative overflow-hidden" style={{ background: COLORS.PRIMARY }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${COLORS.ACCENT} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="relative mx-auto max-w-[1000px]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `rgba(212, 168, 130, 0.12)` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: COLORS.ACCENT }} />
                  </div>
                  <p className="mt-0 mb-1 text-3xl md:text-4xl font-light" style={{ fontFamily: FONTS.HEADING, color: COLORS.CREAM }}>
                    {stat.value}
                  </p>
                  <p className="mt-0 text-xs uppercase tracking-[0.1em]" style={{ color: "rgba(248,246,243,0.6)", fontFamily: FONTS.BODY }}>
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Section - Enhanced */}
      <section id="about" className="px-4 py-16 md:py-24 sm:px-8 md:px-12 lg:px-[60px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-[60px]">
            <motion.div {...fadeUp} className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=400&q=80"
                  alt="Hotel room"
                  className="h-[220px] w-full object-cover"
                  style={{ borderRadius: BORDER_RADIUS.LARGE }}
                />
                <img
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=400&q=80"
                  alt="Hotel room"
                  className="h-[160px] w-full object-cover"
                  style={{ borderRadius: BORDER_RADIUS.LARGE }}
                />
              </div>
              <div className="space-y-3 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=400&q=80"
                  alt="Hotel room"
                  className="h-[160px] w-full object-cover"
                  style={{ borderRadius: BORDER_RADIUS.LARGE }}
                />
                <img
                  src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80"
                  alt="Hotel room"
                  className="h-[220px] w-full object-cover"
                  style={{ borderRadius: BORDER_RADIUS.LARGE }}
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
                <span className="h-px w-5" style={sectionLine} />
                About Us
              </p>
              <h2 className="mt-0 mb-4 text-3xl md:text-4xl font-light leading-[1.2]" style={sectionTitle}>
                Most Safe & Rated Hotel<br />
                <span className="font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>In Karachi</span>
              </h2>
              <p className="mt-0 mb-4 text-[14px] leading-[1.8]" style={sectionSub}>
                Welcome to our premier hotel in Karachi, where luxury meets comfort. Our dedicated
                staff provides exceptional service, and convenient location in the heart of the city.
              </p>
              <p className="mt-0 mb-6 text-[14px] leading-[1.8]" style={sectionSub}>
                Our commitment to excellence extends to every aspect of your stay. From our attentive
                staff to our world-class amenities, we are dedicated to making your visit unforgettable.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Luxurious Rooms with Modern Amenities",
                  "24/7 Concierge Service and Room Service",
                  "Exclusive Access to Fitness Center and Spa",
                  "Complimentary High-Speed WiFi Throughout the Hotel",
                  "Prime Location with Easy Access to Major Attractions",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{ background: `rgba(212, 168, 130, 0.1)`, border: `1px solid rgba(212, 168, 130, 0.15)` }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: COLORS.ACCENT }} />
                    </div>
                    <span className="text-[13px] leading-[1.6]" style={{ color: COLORS.TEXT_PRIMARY, fontFamily: FONTS.BODY }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: COLORS.PRIMARY,
                  color: COLORS.CREAM,
                  boxShadow: `0 4px 24px rgba(92,26,43,0.3)`,
                }}
              >
                Discover More
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="px-4 py-16 md:py-24 sm:px-8 md:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-12 text-center">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            What We Offer
            <span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={sectionTitle}>
            Hotel Features
          </h2>
          <p className="max-w-2xl mx-auto text-sm" style={sectionSub}>
            Discover the exceptional amenities and services that make your stay unforgettable.
          </p>
        </motion.div>

        <div className="mx-auto max-w-[1100px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: COLORS.BACKGROUND,
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.LARGE,
                  boxShadow: SHADOWS.CARD,
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `rgba(212, 168, 130, 0.1)` }}
                >
                  <Icon className="h-7 w-7" style={{ color: COLORS.ACCENT }} />
                </div>
                <h3 className="mt-0 mb-2 text-[16px] font-medium" style={sectionTitle}>{f.title}</h3>
                <p className="mt-0 text-xs leading-[1.8]" style={{ color: COLORS.TEXT_SECONDARY }}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Seaside Resort Section - Enhanced */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="min-h-[300px] md:min-h-[450px]"
          style={{ background: `url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80') center/cover` }}
        />

        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-[50px] lg:py-[60px]" style={{ background: COLORS.SURFACE }}>
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            Seaside Resort
          </p>
          <h2 className="mt-0 mb-3 text-3xl font-light" style={sectionTitle}>
            Jewel of the Adriatic
          </h2>
          <p className="mt-0 mb-3 text-[14px] leading-[1.8]" style={sectionSub}>
            Nestled in our exquisite luxury resort setting, find total comfort in a truly content
            setting. Our fine-line hotel boasts resort channels, world-class amenities, and
            outstanding service.
          </p>
          <p className="mt-0 mb-6 text-[14px] leading-[1.8]" style={sectionSub}>
            Discover the ultimate retreat at our luxurious resort, where relaxation and adventure
            seamlessly blend in a stunning natural setting.
          </p>
          <button
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 w-fit"
            style={{
              background: COLORS.PRIMARY,
              color: COLORS.CREAM,
              boxShadow: `0 4px 24px rgba(92,26,43,0.3)`,
            }}
          >
            Discover More
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Extra Services Section - Enhanced */}
      <section className="px-4 py-16 md:py-24 sm:px-8 md:px-12 lg:px-[60px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.5fr] md:gap-12">
            <motion.div {...fadeUp}>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
                <span className="h-px w-5" style={sectionLine} />
                Best Prices
              </p>
              <h2 className="mt-0 mb-3 text-3xl font-light" style={sectionTitle}>
                Extra Services
              </h2>
              <p className="text-[14px] leading-[1.8]" style={sectionSub}>
                At our hotel, we provide you with not only premier accommodation but also a range of additional
                services designed to enhance your stay, from daily room cleaning to exclusive hotel packages.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Room Cleaning",
                  badge: "Daily",
                  points: [
                    "Daily room cleaning to maintain a fresh and tidy environment",
                    "Schedule your cleaning service at a time that suits your stay",
                    "Professionally friendly cleaning products for your health and safety",
                  ],
                },
                {
                  title: "Drinks Included",
                  badge: "Daily",
                  points: [
                    "A selection of complimentary drinks delivered to your room daily",
                    "Take your drink preferences to our pool bar — included in stay",
                    "Unlimited access to your in-room minibar, refreshed daily",
                  ],
                },
              ].map((service) => (
                <motion.div
                  key={service.title}
                  {...fadeUp}
                  className="p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: COLORS.SURFACE,
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: BORDER_RADIUS.LARGE,
                    boxShadow: SHADOWS.CARD,
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="mt-0 text-[16px] font-medium" style={sectionTitle}>{service.title}</h3>
                    <span
                      className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full"
                      style={{ background: `rgba(212, 168, 130, 0.1)`, color: COLORS.ACCENT }}
                    >
                      {service.badge}
                    </span>
                  </div>
                  {service.points.map((p) => (
                    <div key={p} className="mb-2 flex gap-2 items-start">
                      <span className="flex-shrink-0 text-xs mt-0.5" style={{ color: COLORS.ACCENT }}>✓</span>
                      <span className="text-xs leading-[1.6]" style={{ color: COLORS.TEXT_SECONDARY }}>{p}</span>
                    </div>
                  ))}
                  <button
                    className="w-full mt-3 py-2.5 text-xs font-semibold rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      background: COLORS.PRIMARY,
                      color: COLORS.CREAM,
                    }}
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="px-4 py-16 md:py-24 text-center sm:px-8 md:px-12 lg:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-12">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            Testimonials
            <span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={sectionTitle}>
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="mx-auto max-w-[700px]">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold text-white"
              style={{ background: COLORS.PRIMARY }}
            >
              {TESTIMONIALS[activeTestimonial].avatar}
            </div>

            <div className="mb-4 text-lg tracking-[3px]" style={{ color: COLORS.ACCENT }}>
              {"★".repeat(TESTIMONIALS[activeTestimonial].stars)}
            </div>

            <p className="mt-0 mb-5 text-lg italic leading-[1.8]" style={sectionTitle}>
              "{TESTIMONIALS[activeTestimonial].text}"
            </p>

            <p className="text-[14px] font-medium" style={{ fontFamily: FONTS.BODY, color: COLORS.PRIMARY }}>
              — {TESTIMONIALS[activeTestimonial].name}
            </p>
          </motion.div>

          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  height: "8px",
                  width: i === activeTestimonial ? "24px" : "8px",
                  background: i === activeTestimonial ? COLORS.ACCENT : COLORS.BORDER,
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Book A Room Section - Enhanced */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-6 py-12 sm:px-10 lg:px-[50px] lg:py-[60px]" style={{ background: COLORS.BACKGROUND }}>
          <motion.div {...fadeUp}>
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
              <span className="h-px w-5" style={sectionLine} />
              Make Appointment
            </p>
            <h2 className="mt-0 mb-8 text-3xl font-light" style={sectionTitle}>
              Book A Room
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>Check In Date</label>
              <input
                type="date"
                className="w-full px-3 py-2.5 text-[13px] outline-none transition-all duration-300"
                style={{
                  border: `2px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  color: COLORS.TEXT_PRIMARY,
                  background: COLORS.SURFACE,
                  fontFamily: FONTS.BODY,
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = COLORS.ACCENT}
                onBlur={(e) => e.currentTarget.style.borderColor = COLORS.BORDER}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>Check Out Date</label>
              <input
                type="date"
                className="w-full px-3 py-2.5 text-[13px] outline-none transition-all duration-300"
                style={{
                  border: `2px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  color: COLORS.TEXT_PRIMARY,
                  background: COLORS.SURFACE,
                  fontFamily: FONTS.BODY,
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = COLORS.ACCENT}
                onBlur={(e) => e.currentTarget.style.borderColor = COLORS.BORDER}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>Adults</label>
              <select
                className="w-full px-3 py-2.5 text-[13px] outline-none transition-all duration-300"
                style={{
                  border: `2px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  color: COLORS.TEXT_PRIMARY,
                  background: COLORS.SURFACE,
                  fontFamily: FONTS.BODY,
                  cursor: "pointer",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = COLORS.ACCENT}
                onBlur={(e) => e.currentTarget.style.borderColor = COLORS.BORDER}
              >
                {["1 Adult", "2 Adults", "3 Adults", "4 Adults"].map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>Rooms</label>
              <select
                className="w-full px-3 py-2.5 text-[13px] outline-none transition-all duration-300"
                style={{
                  border: `2px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  color: COLORS.TEXT_PRIMARY,
                  background: COLORS.SURFACE,
                  fontFamily: FONTS.BODY,
                  cursor: "pointer",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = COLORS.ACCENT}
                onBlur={(e) => e.currentTarget.style.borderColor = COLORS.BORDER}
              >
                {["1 Room", "2 Rooms", "3 Rooms"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <button
            className="w-full mt-6 py-3.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: COLORS.PRIMARY,
              color: COLORS.CREAM,
              boxShadow: `0 4px 24px rgba(92,26,43,0.3)`,
            }}
          >
            Book Room Now
          </button>
        </div>

        <div
          className="min-h-[300px] md:min-h-[450px]"
          style={{ background: `url('https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80') center/cover` }}
        />
      </section>

      {/* Amenities Section - Enhanced */}
      <section className="px-4 py-16 md:py-24 sm:px-8 md:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-12 text-center">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            What We Provide
            <span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={sectionTitle}>
            Hotel Amenities
          </h2>
          <p className="max-w-2xl mx-auto text-sm" style={sectionSub}>
            Experience world-class amenities designed to make your stay truly exceptional.
          </p>
        </motion.div>

        <div className="mx-auto max-w-[1100px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: COLORS.BACKGROUND,
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.LARGE,
                  boxShadow: SHADOWS.CARD,
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `rgba(212, 168, 130, 0.1)` }}
                >
                  <Icon className="h-7 w-7" style={{ color: COLORS.ACCENT }} />
                </div>
                <h3 className="mt-0 mb-2 text-[16px] font-medium" style={sectionTitle}>{a.title}</h3>
                <p className="mt-0 text-xs leading-[1.8]" style={{ color: COLORS.TEXT_SECONDARY }}>{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 md:py-28 sm:px-8 md:px-12 lg:px-[60px] relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY} 0%, #3B2F28 100%)`,
          }}
        />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${COLORS.ACCENT} 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px" style={{ background: `linear-gradient(to right, transparent, ${COLORS.ACCENT}, transparent)` }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px" style={{ background: `linear-gradient(to right, transparent, ${COLORS.ACCENT}, transparent)` }} />

        <motion.div {...fadeUp} className="relative mx-auto max-w-[800px] text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 rounded-full animate-ping" style={{ 
              background: `rgba(212, 168, 130, 0.2)`,
              animationDuration: '2s'
            }} />
            <div
              className="relative inline-flex items-center justify-center w-20 h-20 rounded-full"
              style={{
                background: `rgba(212, 168, 130, 0.15)`,
                border: `2px solid rgba(212, 168, 130, 0.2)`,
              }}
            >
              <HeartIcon className="w-10 h-10" style={{ color: COLORS.ACCENT }} />
            </div>
          </div>

          <h2
            className="text-3xl md:text-5xl font-light"
            style={{
              fontFamily: FONTS.HEADING,
              color: COLORS.CREAM,
              letterSpacing: "-0.02em",
            }}
          >
            Experience Luxury Like Never Before
          </h2>

          <p
            className="max-w-2xl mx-auto mt-4 text-base leading-relaxed"
            style={{ color: "rgba(248,246,243,0.75)" }}
          >
            Discover elegant accommodations, exceptional hospitality and unforgettable moments.
            Whether you're traveling for business or leisure, LuxuryStay promises comfort beyond expectations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 group"
              style={{
                background: COLORS.ACCENT,
                color: COLORS.PRIMARY,
                boxShadow: `0 4px 24px rgba(212, 168, 130, 0.3)`,
              }}
            >
              Book Your Stay
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:bg-white/10"
              style={{
                color: COLORS.CREAM,
                border: `1px solid rgba(248,246,243,0.2)`,
              }}
            >
              <PlayIcon className="w-5 h-5" />
              Explore Services
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}