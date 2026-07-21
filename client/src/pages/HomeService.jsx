import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
  TrophyIcon,
  ArrowRightIcon,
  ClockIcon,
  AwardIcon,
  PlayIcon,
  Wifi,
  Coffee,
  Utensils,
  Dumbbell,
  ParkingCircle,
  Bath,
  Tv,
  Mountain,
} from "lucide-react";
import ServiceBanner from "../components/ServiceBanner";
import ServiceCard from "../components/ServiceCard";
import services from "../data/homeservices";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";

import { ToastContainer } from "react-toastify";

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

const SERVICES_STATS = [
  { icon: UsersIcon, value: "50k+", label: "Happy Guests" },
  { icon: TrophyIcon, value: "18", label: "Awards Won" },
  { icon: StarIcon, value: "4.9", label: "Average Rating" },
  { icon: ClockIcon, value: "24/7", label: "Service Available" },
];

const FEATURES = [
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
    desc: "Stay connected with complimentary high-speed internet throughout the property.",
  },
  {
    icon: Coffee,
    title: "Premium Dining",
    desc: "Enjoy world-class cuisine prepared by our award-winning chefs.",
  },
  {
    icon: Utensils,
    title: "24/7 Room Service",
    desc: "Order delicious meals and refreshments anytime, day or night.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    desc: "Stay fit with our state-of-the-art gym facilities and wellness programs.",
  },
  {
    icon: Bath,
    title: "Luxury Spa",
    desc: "Rejuvenate with premium spa treatments and wellness therapies.",
  },
  {
    icon: ParkingCircle,
    title: "Valet Parking",
    desc: "Professional valet service to make your arrival and departure seamless.",
  },
];

const Services = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: COLORS.BACKGROUND,
        fontFamily: FONTS.BODY,
      }}
    >
      <ToastContainer position="top-right" />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80')`,
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
                Premium Services
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
              Explore Our <br />
              <span style={{ color: COLORS.ACCENT }}>Luxury Services</span>
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
              LuxuryStay provides exceptional comfort and personalized services to ensure
              every guest enjoys a memorable experience.
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
                    {services.length}
                  </p>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>
                    Services
                  </p>
                </div>
                <div className="w-px h-10" style={{ background: "rgba(248,246,243,0.15)" }} />
                <div>
                  <p className="text-2xl font-light" style={{ color: COLORS.CREAM }}>
                    6
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
            {SERVICES_STATS.map((stat, i) => {
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

      {/* Services Grid Section */}
      <section id="services" className="py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-[60px]"
        style={{ background: COLORS.BACKGROUND }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: COLORS.ACCENT }}
            >
              ✦ Premium Services
            </span>
            <h2
              className="text-3xl md:text-4xl font-light mt-3"
              style={{
                fontFamily: FONTS.HEADING,
                color: COLORS.PRIMARY,
                letterSpacing: "-0.02em",
              }}
            >
              Explore Our Luxury Services
            </h2>
            <p className="max-w-2xl mx-auto mt-3 text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
              LuxuryStay provides exceptional comfort and personalized services to ensure
              every guest enjoys a memorable experience.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                {...fadeUp}
                transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-8 md:px-12 lg:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: COLORS.ACCENT }}
            >
              ✦ Why Choose Us
            </span>
            <h2
              className="text-3xl md:text-4xl font-light mt-3"
              style={{
                fontFamily: FONTS.HEADING,
                color: COLORS.PRIMARY,
                letterSpacing: "-0.02em",
              }}
            >
              World-Class Amenities
            </h2>
            <p className="max-w-2xl mx-auto mt-3 text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
              Every detail is thoughtfully designed to deliver exceptional comfort and
              unforgettable experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group p-6 transition-all duration-500 hover:-translate-y-2"
                  style={{
                    background: COLORS.BACKGROUND,
                    borderRadius: BORDER_RADIUS.LARGE,
                    border: `1px solid ${COLORS.BORDER}`,
                    boxShadow: SHADOWS.CARD,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full mb-4 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `rgba(212, 168, 130, 0.1)`,
                    }}
                  >
                    <Icon size={24} style={{ color: COLORS.ACCENT }} />
                  </div>
                  <h3
                    className="text-lg font-semibold"
                    style={{
                      fontFamily: FONTS.HEADING,
                      color: COLORS.PRIMARY,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORS.TEXT_SECONDARY }}>
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
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
              <SparklesIcon size={32} style={{ color: COLORS.ACCENT }} />
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
            Ready to Experience <br />Luxury Like Never Before?
          </h2>

          <p
            className="max-w-2xl mx-auto mt-4 text-base leading-relaxed"
            style={{ color: "rgba(248,246,243,0.75)" }}
          >
            Discover our premium services and enjoy an unforgettable stay at LuxuryStay.
            Book now and experience hospitality at its finest.
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
              <ArrowRightIcon
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:bg-white/10"
              style={{
                color: COLORS.CREAM,
                border: `1px solid rgba(248,246,243,0.2)`,
              }}
            >
              <PlayIcon size={20} />
              Explore Services
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;