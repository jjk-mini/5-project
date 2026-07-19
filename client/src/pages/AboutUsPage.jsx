import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
  StarIcon,
  BuildingOffice2Icon,
  UsersIcon,
  TrophyIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  ClockIcon,
  UserGroupIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";
import { AwardIcon, QuoteIcon } from "lucide-react";
import { HashLink } from 'react-router-hash-link';

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
  transition: { duration: 0.6 },
};

const STORY_POINTS = [
  { icon: ClockIcon, text: "Three decades of uninterrupted five-star service" },
  { icon: AwardIcon, text: "Every suite designed by award-winning interior architects" },
  { icon: UserGroupIcon, text: "A team trained to anticipate, not just respond" },
  { icon: GlobeAltIcon, text: "Locally rooted hospitality with an international standard" },
];

const VALUES = [
  { 
    icon: HeartIcon, 
    title: "Genuine Care", 
    desc: "Every interaction is guided by warmth, not scripts. Our staff remember names, preferences, and the small details that matter.",
  },
  { 
    icon: ShieldCheckIcon, 
    title: "Uncompromising Quality", 
    desc: "From linens to cuisine, nothing leaves our doors until it meets a standard we'd be proud to put our name on.",
  },
  { 
    icon: SparklesIcon, 
    title: "Timeless Elegance", 
    desc: "We favor craftsmanship over trend, building spaces and experiences that feel as considered in ten years as they do today.",
  },
  { 
    icon: GlobeAltIcon, 
    title: "Rooted Hospitality", 
    desc: "We celebrate the culture and character of our city, bringing it into every menu, room, and welcome.",
  },
];

const STATS = [
  { icon: BuildingOffice2Icon, value: "120+", label: "Rooms & Suites" },
  { icon: UsersIcon, value: "50k+", label: "Guests Welcomed" },
  { icon: TrophyIcon, value: "18", label: "Hospitality Awards" },
  { icon: StarIcon, value: "4.9", label: "Average Guest Rating" },
];

const LEADERSHIP = [
  { 
    name: "Amara Sheikh", 
    role: "General Manager", 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "20+ years of luxury hospitality experience"
  },
  { 
    name: "Farhan Qureshi", 
    role: "Executive Chef", 
    img: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&w=400&q=80",
    bio: "Michelin-starred culinary expertise"
  },
  { 
    name: "Layla Rehman", 
    role: "Director of Guest Experience", 
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate about creating memorable stays"
  },
];

const TESTIMONIALS = [
  {
    quote: "The attention to detail is extraordinary. Every staff member made us feel like family.",
    author: "Sarah & Michael Thompson",
    location: "London, UK"
  },
  {
    quote: "LuxuryStay redefines what luxury means. It's not about opulence—it's about feeling truly cared for.",
    author: "Dr. James Park",
    location: "Seoul, South Korea"
  }
];

const sectionLabel = { color: COLORS.ACCENT, fontFamily: FONTS.BODY };
const sectionLine = { background: COLORS.ACCENT };
const sectionTitle = { fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY };
const sectionSub = { fontFamily: FONTS.BODY, color: COLORS.TEXT_SECONDARY };

const btnPrimaryClass =
  "inline-flex items-center gap-2 cursor-pointer rounded-full border-none px-[28px] py-3.5 text-[13px] font-medium no-underline transition-all duration-300";
const btnPrimary = { 
  background: COLORS.PRIMARY, 
  color: COLORS.CREAM, 
  fontFamily: FONTS.BODY,
  boxShadow: `0 4px 16px rgba(92,26,43,0.25)`,
};

export default function AboutUsPage() {
  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: FONTS.BODY, background: COLORS.BACKGROUND, color: COLORS.TEXT_PRIMARY }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
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
              linear-gradient(to bottom, rgba(31,26,23,0.2) 0%, transparent 40%, transparent 60%, rgba(31,26,23,0.4) 100%)
            `
          }}
        />
        
        <div className="absolute top-0 left-0 w-2/5 h-px" style={{ background: `linear-gradient(to right, ${COLORS.ACCENT}, transparent)` }} />
        <div className="absolute bottom-0 right-0 w-1/4 h-px" style={{ background: `linear-gradient(to left, ${COLORS.ACCENT}, transparent)` }} />

        <div className="relative z-[1] w-full container mx-auto px-6 md:px-12">
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
                  background: `rgba(212, 168, 130, 0.12)`,
                  border: `1px solid rgba(212, 168, 130, 0.15)`,
                  backdropFilter: "blur(10px)"
                }}
              >
                <span className="h-px w-4" style={sectionLine} />
                Our Story
                <span className="h-px w-4" style={sectionLine} />
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 mb-4 text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1]"
              style={{ 
                fontFamily: FONTS.HEADING, 
                color: COLORS.CREAM,
                letterSpacing: "-0.03em"
              }}
            >
              Three Decades of<br />
              <span style={{ color: COLORS.ACCENT }}>Quiet Excellence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-base font-light leading-[1.8]"
              style={{ color: "rgba(248,246,243,0.8)" }}
            >
              LuxuryStay was built on a simple belief: true luxury isn't about
              grandeur, it's about being truly seen and cared for.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex items-center gap-4"
            >
              <HashLink 
  to="#values" 
  className={`${btnPrimaryClass}`} 
  style={btnPrimary}
  smooth
>
  Discover Our Values
  <ArrowRightIcon className="w-4 h-4" />
</HashLink>
              <span className="text-xs" style={{ color: "rgba(248,246,243,0.3)" }}>
                or scroll to explore
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
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

      {/* Our Story Section */}
      <section className="px-4 py-16 md:py-24 sm:px-8 md:px-12 lg:px-[60px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-[60px]">
            <motion.div {...fadeUp} className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80"
                  alt="Hotel lobby"
                  className="h-[220px] w-full object-cover"
                  style={{ borderRadius: BORDER_RADIUS.LARGE }}
                />
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80"
                  alt="Restaurant"
                  className="h-[160px] w-full object-cover"
                  style={{ borderRadius: BORDER_RADIUS.LARGE }}
                />
              </div>
              <div className="space-y-3 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=400&q=80"
                  alt="Hotel suite"
                  className="h-[160px] w-full object-cover"
                  style={{ borderRadius: BORDER_RADIUS.LARGE }}
                />
                <img
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=80"
                  alt="Spa"
                  className="h-[220px] w-full object-cover"
                  style={{ borderRadius: BORDER_RADIUS.LARGE }}
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
                <span className="h-px w-5" style={sectionLine} />
                Who We Are
              </p>
              <h2 className="mt-0 mb-4 text-3xl md:text-4xl font-light leading-[1.2]" style={sectionTitle}>
                A Legacy Built on<br />
                <span className="font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>Genuine Hospitality</span>
              </h2>
              <p className="mt-0 mb-4 text-[14px] leading-[1.8]" style={sectionSub}>
                What began as a single property has grown into one of the
                city's most trusted names in luxury hospitality — without ever
                losing the personal touch that started it all.
              </p>
              <p className="mt-0 mb-6 text-[14px] leading-[1.8]" style={sectionSub}>
                Today, LuxuryStay welcomes travelers from around the world,
                offering an experience shaped by craftsmanship, warmth, and an
                obsessive attention to detail.
              </p>

              <div className="space-y-3 mb-8">
                {STORY_POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div key={point.text} className="flex items-start gap-3">
                      <div
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full mt-0.5"
                        style={{ 
                          background: `rgba(212, 168, 130, 0.1)`,
                          border: `1px solid rgba(212, 168, 130, 0.15)`
                        }}
                      >
                        <Icon className="h-4 w-4" style={{ color: COLORS.ACCENT }} />
                      </div>
                      <span className="text-[13px] leading-[1.6]" style={{ color: COLORS.TEXT_PRIMARY, fontFamily: FONTS.BODY }}>
                        {point.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Link to="/rooms" className={`${btnPrimaryClass}`} style={btnPrimary}>
                Explore Our Rooms
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
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

      {/* Values Section */}
      <section id="values" className="px-4 py-16 md:py-24 sm:px-8 md:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-12 text-center">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            What Drives Us
            <span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={sectionTitle}>
            Our Values
          </h2>
          <p className="max-w-2xl mx-auto text-sm" style={sectionSub}>
            Four principles that guide everything we do, every day.
          </p>
        </motion.div>

        <div className="mx-auto max-w-[1100px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  background: COLORS.BACKGROUND, 
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.LARGE,
                  boxShadow: SHADOWS.CARD
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `rgba(212, 168, 130, 0.1)` }}
                >
                  <Icon className="h-7 w-7" style={{ color: COLORS.ACCENT }} />
                </div>
                <h3 className="mt-0 mb-2 text-[16px] font-medium" style={sectionTitle}>{v.title}</h3>
                <p className="mt-0 text-xs leading-[1.8]" style={{ color: COLORS.TEXT_SECONDARY }}>{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section - Darkened Background */}
      <section className="px-4 py-16 md:py-20 sm:px-8 md:px-[60px]" style={{ background: COLORS.PRIMARY }}>
        <div className="mx-auto max-w-[900px]">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={{ color: COLORS.ACCENT, fontFamily: FONTS.BODY }}>
              <span className="h-px w-5" style={{ background: COLORS.ACCENT }} />
              Guest Voices
              <span className="h-px w-5" style={{ background: COLORS.ACCENT }} />
            </p>
            <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={{ fontFamily: FONTS.HEADING, color: COLORS.CREAM }}>
              What Our Guests Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="p-8 transition-all duration-300 hover:shadow-xl"
                style={{
                  background: `rgba(248,246,243,0.06)`,
                  border: `1px solid rgba(248,246,243,0.08)`,
                  borderRadius: BORDER_RADIUS.LARGE,
                  backdropFilter: "blur(10px)"
                }}
              >
                <QuoteIcon className="w-8 h-8 mb-4" style={{ color: COLORS.ACCENT, opacity: 0.4 }} />
                <p className="mt-0 mb-4 text-sm leading-[1.8]" style={{ color: COLORS.CREAM }}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="mt-0 mb-0 text-sm font-medium" style={{ color: COLORS.CREAM }}>
                    {testimonial.author}
                  </p>
                  <p className="mt-0 text-xs" style={{ color: "rgba(248,246,243,0.5)" }}>
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="px-4 py-16 md:py-24 sm:px-8 md:px-12 lg:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-12 text-center">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] mb-4" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            Meet The Team
            <span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="mt-0 mb-3 text-3xl md:text-4xl font-light" style={sectionTitle}>
            The People Behind Your Stay
          </h2>
          <p className="max-w-2xl mx-auto text-sm" style={sectionSub}>
            Dedicated professionals who make every moment extraordinary.
          </p>
        </motion.div>

        <div className="mx-auto max-w-[1000px] grid grid-cols-1 gap-6 sm:grid-cols-3">
          {LEADERSHIP.map((person, i) => (
            <motion.div
              key={person.name}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: COLORS.BACKGROUND,
                border: `1px solid ${COLORS.BORDER}`,
                borderRadius: BORDER_RADIUS.LARGE,
                boxShadow: SHADOWS.CARD
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={person.img} 
                  alt={person.name} 
                  className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, rgba(31,26,23,0.4), transparent)` }}
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="mt-0 mb-1 text-[16px] font-medium" style={sectionTitle}>{person.name}</h3>
                <p className="mt-0 mb-2 text-xs" style={{ color: COLORS.TEXT_SECONDARY, fontFamily: FONTS.BODY }}>{person.role}</p>
                <p className="mt-0 text-[11px]" style={{ color: COLORS.TEXT_SECONDARY, opacity: 0.7 }}>{person.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Changed Background */}
      <section className="relative px-4 py-20 md:py-28 sm:px-8 md:px-[60px] overflow-hidden" style={{ 
        background: `linear-gradient(135deg, ${COLORS.BACKGROUND} 0%, ${COLORS.SURFACE} 100%)`,
        borderTop: `1px solid ${COLORS.BORDER}`,
        borderBottom: `1px solid ${COLORS.BORDER}`,
      }}>
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${COLORS.ACCENT} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        <motion.div {...fadeUp} className="relative mx-auto max-w-[650px] text-center">
          {/* Icon with ring */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 rounded-full animate-ping" style={{ 
              background: `rgba(212, 168, 130, 0.15)`,
              animationDuration: '2s'
            }} />
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full"
              style={{ 
                background: `rgba(212, 168, 130, 0.1)`,
                border: `2px solid rgba(212, 168, 130, 0.15)`
              }}
            >
              <HeartIcon className="w-10 h-10" style={{ color: COLORS.ACCENT }} />
            </div>
          </div>
          
          <h2 className="mt-0 mb-4 text-3xl md:text-4xl font-light" style={{ 
            fontFamily: FONTS.HEADING, 
            color: COLORS.TEXT_PRIMARY,
            letterSpacing: "-0.02em"
          }}>
            Come Experience It Yourself
          </h2>
          
          <p className="mt-0 mb-8 text-[15px] font-light leading-[1.8] max-w-xl mx-auto" style={{ 
            color: COLORS.TEXT_SECONDARY,
            fontFamily: FONTS.BODY
          }}>
            Words only carry a story so far. We'd love to welcome you in
            person and show you what three decades of care actually feels like.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/rooms" 
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 group"
              style={{ 
                background: COLORS.PRIMARY, 
                color: COLORS.CREAM, 
                fontFamily: FONTS.BODY,
                boxShadow: `0 4px 24px rgba(92,26,43,0.25)`,
              }}
            >
              Book Your Stay
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 hover:bg-black/5"
              style={{ 
                color: COLORS.TEXT_PRIMARY, 
                fontFamily: FONTS.BODY,
                border: `1px solid ${COLORS.BORDER}`,
              }}
            >
              <PlayIcon className="w-4 h-4" />
              View Gallery
            </Link>
          </div>
          
          <p className="mt-6 text-xs" style={{ color: COLORS.TEXT_SECONDARY, opacity: 0.5 }}>
            Join thousands of satisfied guests
          </p>
        </motion.div>
      </section>
    </div>
  );
}