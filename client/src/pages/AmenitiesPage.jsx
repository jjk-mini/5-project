import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  WifiIcon,
  SparklesIcon,
  SunIcon,
  CakeIcon,
  TruckIcon,
  PaperAirplaneIcon,
  BriefcaseIcon,
  UserGroupIcon,
  MusicalNoteIcon,
  ShieldCheckIcon,
  SwatchIcon,
  PhoneIcon,
  ArrowRightIcon,
  HeartIcon,
  PlayIcon,
  StarIcon,
  UsersIcon,
  TrophyIcon,
  ClockIcon,
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

const AMENITIES = [
  { icon: WifiIcon, title: "Free WiFi", desc: "High-speed internet throughout the property, including every guest room and public space." },
  { icon: SparklesIcon, title: "Spa & Fitness", desc: "A full-service spa and 24-hour fitness center staffed with certified wellness trainers." },
  { icon: SunIcon, title: "Rooftop Pool", desc: "Swim year-round in our heated infinity pool with panoramic views of the city skyline." },
  { icon: CakeIcon, title: "Fine Dining", desc: "Three signature restaurants and a rooftop bar, each led by an award-winning chef." },
  { icon: TruckIcon, title: "Valet Parking", desc: "Complimentary valet parking with secure, monitored underground garage access." },
  { icon: PaperAirplaneIcon, title: "Airport Transfer", desc: "Private chauffeured pickup and drop-off in our fleet of luxury vehicles." },
];

const sectionLabel = { color: COLORS.ACCENT, fontFamily: FONTS.BODY };
const sectionLine = { background: COLORS.ACCENT };
const sectionTitle = { fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY };
const sectionSub = { fontFamily: FONTS.BODY, color: COLORS.TEXT_SECONDARY };

const btnPrimaryClass =
  "inline-block cursor-pointer rounded-md border-none px-[26px] py-3 text-[13px] font-medium no-underline";
const btnPrimary = { background: COLORS.PRIMARY, color: COLORS.CREAM, fontFamily: FONTS.BODY };

export default function AmenitiesPage() {
  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: FONTS.BODY, background: COLORS.BACKGROUND, color: COLORS.TEXT_PRIMARY }}
    >
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80')`,
            transform: "scale(1.05)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(31,26,23,0.95) 0%, rgba(31,26,23,0.7) 40%, rgba(31,26,23,0.4) 70%, rgba(31,26,23,0.15) 100%),
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
                Every Detail, Considered
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
              Amenities Made<br />
              <span style={{ color: COLORS.ACCENT }}>For Your Comfort</span>
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
              From sunrise swims to midnight room service, every amenity at
              LuxuryStay is designed around one goal — your complete comfort.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-2xl font-light" style={{ color: COLORS.CREAM }}>
                    {AMENITIES.length}
                  </p>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>
                    Amenities
                  </p>
                </div>
                <div className="w-px h-10" style={{ background: "rgba(248,246,243,0.15)" }} />
                <div>
                  <p className="text-2xl font-light" style={{ color: COLORS.CREAM }}>
                    12
                  </p>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>
                    Categories
                  </p>
                </div>
                <div className="w-px h-10" style={{ background: "rgba(248,246,243,0.15)" }} />
                <div>
                  <p className="text-2xl font-light" style={{ color: COLORS.ACCENT }}>
                    24/7
                  </p>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>
                    Availability
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="#amenities"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: COLORS.ACCENT,
                  color: COLORS.PRIMARY,
                  boxShadow: `0 4px 24px rgba(212, 168, 130, 0.3)`,
                }}
              >
                View All Amenities
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

      {/* Featured Amenity 1 — Spa & Wellness */}
      <section className="relative py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-[60px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden h-[350px] md:h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80" 
                alt="Spa & Wellness"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-sm text-white">
                  ✦ Wellness
                </span>
              </div>
            </div>
            <div>
              <motion.div {...fadeUp}>
                <div className="inline-flex items-center gap-2 mb-3">
                  <SparklesIcon className="w-5 h-5" style={{ color: COLORS.ACCENT }} />
                  <span className="text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
                    Wellness & Spa
                  </span>
                </div>
                <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={sectionTitle}>
                  A Sanctuary for<br />Mind and Body
                </h2>
                <p className="mt-0 mb-4 text-[14px] leading-[1.8]" style={sectionSub}>
                  Our spa offers a full menu of massages, facials, and body
                  treatments performed by certified therapists in a calm,
                  candlelit setting.
                </p>
                <p className="mt-0 mb-6 text-[14px] leading-[1.8]" style={sectionSub}>
                  Pair your treatment with access to the steam room, sauna, and
                  a 24-hour fitness center equipped with the latest technology.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      background: COLORS.PRIMARY,
                      color: COLORS.CREAM,
                      boxShadow: `0 4px 24px rgba(92,26,43,0.3)`,
                    }}
                  >
                    Book A Treatment
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <div className="flex items-center gap-3 text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" style={{ color: COLORS.ACCENT }} />
                      7AM - 9PM
                    </span>
                    <span className="w-px h-4" style={{ background: COLORS.BORDER }} />
                    <span className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4" style={{ color: COLORS.ACCENT }} />
                      4.9 Rating
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Amenity 2 — Rooftop & Dining */}
      <section className="relative py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <motion.div {...fadeUp}>
                <div className="inline-flex items-center gap-2 mb-3">
                  <SunIcon className="w-5 h-5" style={{ color: COLORS.ACCENT }} />
                  <span className="text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
                    Rooftop & Dining
                  </span>
                </div>
                <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={sectionTitle}>
                  Sunset Views,<br />Signature Flavors
                </h2>
                <p className="mt-0 mb-4 text-[14px] leading-[1.8]" style={sectionSub}>
                  Take a dip in our heated rooftop infinity pool before settling
                  in for dinner at one of our three signature restaurants.
                </p>
                <p className="mt-0 mb-6 text-[14px] leading-[1.8]" style={sectionSub}>
                  Our chefs work with local producers to bring a menu that
                  changes with the seasons, served against the backdrop of the
                  city skyline.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      background: COLORS.PRIMARY,
                      color: COLORS.CREAM,
                      boxShadow: `0 4px 24px rgba(92,26,43,0.3)`,
                    }}
                  >
                    Reserve A Table
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <div className="flex items-center gap-3 text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
                    <span className="flex items-center gap-1">
                      <SunIcon className="w-4 h-4" style={{ color: COLORS.ACCENT }} />
                      Sunset View
                    </span>
                    <span className="w-px h-4" style={{ background: COLORS.BORDER }} />
                    <span className="flex items-center gap-1">
                      <CakeIcon className="w-4 h-4" style={{ color: COLORS.ACCENT }} />
                      3 Restaurants
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="order-1 md:order-2 relative rounded-2xl overflow-hidden h-[350px] md:h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80" 
                alt="Rooftop & Dining"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-sm text-white">
                  ✦ Rooftop
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Amenity 3 — Business & Events */}
      <section className="relative py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-[60px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden h-[350px] md:h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80" 
                alt="Business & Events"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-sm text-white">
                  ✦ Events
                </span>
              </div>
            </div>
            <div>
              <motion.div {...fadeUp}>
                <div className="inline-flex items-center gap-2 mb-3">
                  <BriefcaseIcon className="w-5 h-5" style={{ color: COLORS.ACCENT }} />
                  <span className="text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
                    Business & Events
                  </span>
                </div>
                <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={sectionTitle}>
                  Work & Celebrate<br />In Style
                </h2>
                <p className="mt-0 mb-4 text-[14px] leading-[1.8]" style={sectionSub}>
                  Our fully equipped business center and versatile event spaces
                  are designed to host everything from corporate meetings to
                  elegant celebrations.
                </p>
                <p className="mt-0 mb-6 text-[14px] leading-[1.8]" style={sectionSub}>
                  With state-of-the-art technology, dedicated event planners,
                  and customizable catering, every occasion is seamless and
                  unforgettable.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      background: COLORS.PRIMARY,
                      color: COLORS.CREAM,
                      boxShadow: `0 4px 24px rgba(92,26,43,0.3)`,
                    }}
                  >
                    Plan An Event
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <div className="flex items-center gap-3 text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
                    <span className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" style={{ color: COLORS.ACCENT }} />
                      Up to 200 Guests
                    </span>
                    <span className="w-px h-4" style={{ background: COLORS.BORDER }} />
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" style={{ color: COLORS.ACCENT }} />
                      24/7 Support
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Amenities Grid */}
      <section id="amenities" className="px-4 py-16 md:py-24 sm:px-8 md:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-12 text-center">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            Everything You Need
            <span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={sectionTitle}>
            All Our Amenities
          </h2>
          <p className="max-w-2xl mx-auto text-sm" style={sectionSub}>
            Every detail designed to make your stay unforgettable.
          </p>
        </motion.div>

        <div className="mx-auto max-w-[1100px] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
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
            Ready For A Stay Like No Other?
          </h2>

          <p
            className="max-w-2xl mx-auto mt-4 text-base leading-relaxed"
            style={{ color: "rgba(248,246,243,0.75)" }}
          >
            Every amenity, every detail, every moment — designed around you.
            Book your room and experience it firsthand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to="/rooms"
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