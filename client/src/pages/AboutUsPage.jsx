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
} from "@heroicons/react/24/outline";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const STORY_POINTS = [
  "Three decades of uninterrupted five-star service",
  "Every suite designed by award-winning interior architects",
  "A team trained to anticipate, not just respond",
  "Locally rooted hospitality with an international standard",
];

const VALUES = [
  { icon: HeartIcon, title: "Genuine Care", desc: "Every interaction is guided by warmth, not scripts. Our staff remember names, preferences, and the small details that matter." },
  { icon: ShieldCheckIcon, title: "Uncompromising Quality", desc: "From linens to cuisine, nothing leaves our doors until it meets a standard we'd be proud to put our name on." },
  { icon: SparklesIcon, title: "Timeless Elegance", desc: "We favor craftsmanship over trend, building spaces and experiences that feel as considered in ten years as they do today." },
  { icon: GlobeAltIcon, title: "Rooted Hospitality", desc: "We celebrate the culture and character of our city, bringing it into every menu, room, and welcome." },
];

const STATS = [
  { icon: BuildingOffice2Icon, value: "120+", label: "Rooms & Suites" },
  { icon: UsersIcon, value: "50k+", label: "Guests Welcomed" },
  { icon: TrophyIcon, value: "18", label: "Hospitality Awards" },
  { icon: StarIcon, value: "4.9", label: "Average Guest Rating" },
];

const LEADERSHIP = [
  { name: "Amara Sheikh", role: "General Manager", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
  { name: "Farhan Qureshi", role: "Executive Chef", img: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&w=400&q=80" },
  { name: "Layla Rehman", role: "Director of Guest Experience", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
];

const sectionLabel = { color: COLORS.ACCENT, fontFamily: FONTS.BODY };
const sectionLine = { background: COLORS.ACCENT };
const sectionTitle = { fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY };
const sectionSub = { fontFamily: FONTS.BODY, color: COLORS.TEXT_SECONDARY };

const btnPrimaryClass =
  "inline-block cursor-pointer rounded-md border-none px-[26px] py-3 text-[13px] font-medium no-underline";
const btnPrimary = { background: COLORS.PRIMARY, color: COLORS.CREAM, fontFamily: FONTS.BODY };

export default function AboutUsPage() {
  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: FONTS.BODY, background: COLORS.BACKGROUND, color: COLORS.TEXT_PRIMARY }}
    >
      {/* hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(31,26,23,0.85) 40%, rgba(31,26,23,0.45) 100%),
                         url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-[1] max-w-[680px] px-6 py-16 sm:px-10 md:px-[60px] md:py-20">
          <motion.div {...fadeUp}>
            <p
              className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]"
              style={sectionLabel}
            >
              <span className="h-px w-5" style={sectionLine} />
              Our Story
            </p>
            <h1
              className="m-0 mb-4 text-[clamp(32px,5vw,52px)] font-semibold leading-[1.2]"
              style={{ fontFamily: FONTS.HEADING, color: COLORS.CREAM }}
            >
              Three Decades of<br />Quiet Excellence
            </h1>
            <p className="m-0 max-w-[480px] text-sm font-light leading-[1.8]" style={{ color: "rgba(248,246,243,0.75)" }}>
              LuxuryStay was built on a simple belief: true luxury isn't about
              grandeur, it's about being truly seen and cared for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* our story */}
      <section className="px-4 py-14 sm:px-8 md:px-12 lg:px-[60px] lg:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-[60px]">
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80"
              alt="Hotel lobby"
              className="h-[200px] w-full object-cover"
              style={{ borderRadius: BORDER_RADIUS.LARGE }}
            />
            <img
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=400&q=80"
              alt="Hotel suite"
              className="mt-6 h-[200px] w-full object-cover"
              style={{ borderRadius: BORDER_RADIUS.LARGE }}
            />
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80"
              alt="Restaurant"
              className="h-40 w-full object-cover"
              style={{ borderRadius: BORDER_RADIUS.LARGE }}
            />
            <img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=80"
              alt="Spa"
              className="mt-6 h-40 w-full object-cover"
              style={{ borderRadius: BORDER_RADIUS.LARGE }}
            />
          </motion.div>

          <motion.div {...fadeUp}>
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
              <span className="h-px w-5" style={sectionLine} />
              Who We Are
            </p>
            <h2 className="m-0 mb-2.5 text-[28px] font-semibold" style={sectionTitle}>
              A Legacy Built on<br />Genuine Hospitality
            </h2>
            <p className="m-0 mb-5 text-[13px] font-light leading-[1.8]" style={sectionSub}>
              What began as a single property has grown into one of the
              city's most trusted names in luxury hospitality — without ever
              losing the personal touch that started it all.
            </p>
            <p className="m-0 mb-6 text-[13px] font-light leading-[1.8]" style={sectionSub}>
              Today, LuxuryStay welcomes travelers from around the world,
              offering an experience shaped by craftsmanship, warmth, and an
              obsessive attention to detail.
            </p>
            {STORY_POINTS.map((point) => (
              <div key={point} className="mb-2.5 flex items-center gap-2.5">
                <div
                  className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: COLORS.BACKGROUND, border: `0.5px solid ${COLORS.ACCENT}` }}
                >
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: COLORS.ACCENT }} />
                </div>
                <span className="text-[13px]" style={{ color: COLORS.TEXT_PRIMARY, fontFamily: FONTS.BODY }}>
                  {point}
                </span>
              </div>
            ))}
            <Link to="/rooms" className={`${btnPrimaryClass} mt-6`} style={btnPrimary}>
              Explore Our Rooms
            </Link>
          </motion.div>
        </div>
      </section>

      {/* stats */}
      <section className="px-4 py-14 sm:px-8 md:px-[60px]" style={{ background: COLORS.PRIMARY }}>
        <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <Icon className="mx-auto mb-3 h-6 w-6" style={{ color: COLORS.ACCENT }} />
                <p className="m-0 mb-1 text-2xl font-semibold" style={{ fontFamily: FONTS.HEADING, color: COLORS.CREAM }}>
                  {stat.value}
                </p>
                <p className="m-0 text-xs" style={{ color: "rgba(248,246,243,0.7)", fontFamily: FONTS.BODY }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* values */}
      <section className="px-4 py-14 sm:px-8 md:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-10 text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            What Drives Us
            <span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="m-0 mb-2.5 text-[28px] font-semibold" style={sectionTitle}>
            Our Values
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="px-5 py-6 text-center"
                style={{ background: COLORS.BACKGROUND, border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.LARGE }}
              >
                <Icon className="mx-auto mb-3 h-7 w-7" style={{ color: COLORS.ACCENT }} />
                <h3 className="m-0 mb-2 text-[15px]" style={sectionTitle}>{v.title}</h3>
                <p className="m-0 text-xs leading-[1.7]" style={{ color: COLORS.TEXT_SECONDARY }}>{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* leadership */}
      <section className="px-4 py-14 sm:px-8 md:px-12 lg:px-[60px] lg:py-20">
        <motion.div {...fadeUp} className="mb-10 text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            Meet The Team
            <span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="m-0 mb-2.5 text-[28px] font-semibold" style={sectionTitle}>
            The People Behind Your Stay
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 sm:grid-cols-3">
          {LEADERSHIP.map((person, i) => (
            <motion.div
              key={person.name}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="overflow-hidden text-center"
              style={{ background: COLORS.SURFACE, border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.LARGE, boxShadow: SHADOWS.CARD }}
            >
              <img src={person.img} alt={person.name} className="h-[220px] w-full object-cover" />
              <div className="p-4">
                <h3 className="m-0 mb-1 text-[15px]" style={sectionTitle}>{person.name}</h3>
                <p className="m-0 text-xs" style={{ color: COLORS.TEXT_SECONDARY, fontFamily: FONTS.BODY }}>{person.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="px-4 py-16 text-center sm:px-8 md:px-[60px]" style={{ background: COLORS.PRIMARY }}>
        <motion.div {...fadeUp} className="mx-auto max-w-[560px]">
          <h2 className="m-0 mb-3 text-2xl font-semibold" style={{ fontFamily: FONTS.HEADING, color: COLORS.CREAM }}>
            Come Experience It Yourself
          </h2>
          <p className="m-0 mb-7 text-[13px] font-light leading-[1.8]" style={{ color: "rgba(248,246,243,0.7)" }}>
            Words only carry a story so far. We'd love to welcome you in
            person and show you what three decades of care actually feels like.
          </p>
          <Link to="/rooms" className={btnPrimaryClass} style={{ background: COLORS.ACCENT, color: COLORS.CREAM, fontFamily: FONTS.BODY }}>
            Book Your Stay
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
