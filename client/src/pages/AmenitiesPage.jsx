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
} from "@heroicons/react/24/outline";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const AMENITIES = [
  { icon: WifiIcon, title: "Free WiFi", desc: "High-speed internet throughout the property, including every guest room and public space." },
  { icon: SparklesIcon, title: "Spa & Fitness", desc: "A full-service spa and 24-hour fitness center staffed with certified wellness trainers." },
  { icon: SunIcon, title: "Rooftop Pool", desc: "Swim year-round in our heated infinity pool with panoramic views of the city skyline." },
  { icon: CakeIcon, title: "Fine Dining", desc: "Three signature restaurants and a rooftop bar, each led by an award-winning chef." },
  { icon: TruckIcon, title: "Valet Parking", desc: "Complimentary valet parking with secure, monitored underground garage access." },
  { icon: PaperAirplaneIcon, title: "Airport Transfer", desc: "Private chauffeured pickup and drop-off in our fleet of luxury vehicles." },
  { icon: BriefcaseIcon, title: "Business Center", desc: "Fully equipped meeting rooms and a 24-hour business lounge with printing and video conferencing." },
  { icon: UserGroupIcon, title: "Kids' Club", desc: "Supervised activities and a dedicated play area so parents can relax without a second thought." },
  { icon: MusicalNoteIcon, title: "Live Lounge", desc: "Evening live music in our lobby lounge, paired with a curated selection of wines and cocktails." },
  { icon: ShieldCheckIcon, title: "24/7 Security", desc: "Round-the-clock security and keycard-controlled floor access for total peace of mind." },
  { icon: SwatchIcon, title: "Laundry & Pressing", desc: "Same-day laundry, dry cleaning, and pressing service available every day of the week." },
  { icon: PhoneIcon, title: "Concierge Desk", desc: "A dedicated concierge on call around the clock for reservations, tickets, and local recommendations." },
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
      {/* hero */}
      <section className="relative flex min-h-[55vh] items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(31,26,23,0.85) 40%, rgba(31,26,23,0.45) 100%),
                         url('https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-[1] max-w-[680px] px-6 py-16 sm:px-10 md:px-[60px] md:py-20">
          <motion.div {...fadeUp}>
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
              <span className="h-px w-5" style={sectionLine} />
              Every Detail, Considered
            </p>
            <h1
              className="m-0 mb-4 text-[clamp(32px,5vw,52px)] font-semibold leading-[1.2]"
              style={{ fontFamily: FONTS.HEADING, color: COLORS.CREAM }}
            >
              Amenities Made<br />For Your Comfort
            </h1>
            <p className="m-0 max-w-[480px] text-sm font-light leading-[1.8]" style={{ color: "rgba(248,246,243,0.75)" }}>
              From sunrise swims to midnight room service, every amenity at
              LuxuryStay is designed around one goal — your complete comfort.
            </p>
          </motion.div>
        </div>
      </section>
<br>
</br>
<br />
      {/* featured amenity 1 — spa */}
      <section className="grid grid-cols-1 md:grid-cols-2 md:min-h-[400px]">
        <div
          className="min-h-[260px] md:min-h-[400px]"
          style={{ background: `url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80') center/cover` }}
        />
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-[50px] lg:py-[60px]" style={{ background: COLORS.SURFACE }}>
          <motion.div {...fadeUp}>
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
              <span className="h-px w-5" style={sectionLine} />
              Wellness & Spa
            </p>
            <h2 className="m-0 mb-2.5 text-2xl font-semibold" style={sectionTitle}>
              A Sanctuary for<br />Mind and Body
            </h2>
            <p className="m-0 mb-3.5 text-[13px] font-light leading-[1.8]" style={sectionSub}>
              Our spa offers a full menu of massages, facials, and body
              treatments performed by certified therapists in a calm,
              candlelit setting.
            </p>
            <p className="m-0 mb-7 text-[13px] font-light leading-[1.8]" style={sectionSub}>
              Pair your treatment with access to the steam room, sauna, and
              a 24-hour fitness center equipped with the latest technology.
            </p>
            <Link to="/contact" className={btnPrimaryClass} style={btnPrimary}>
              Book A Treatment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* featured amenity 2 — dining/pool, alternate layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 md:min-h-[400px]">
        <div className="order-2 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-[50px] lg:py-[60px] md:order-1" style={{ background: COLORS.BACKGROUND }}>
          <motion.div {...fadeUp}>
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
              <span className="h-px w-5" style={sectionLine} />
              Rooftop & Dining
            </p>
            <h2 className="m-0 mb-2.5 text-2xl font-semibold" style={sectionTitle}>
              Sunset Views,<br />Signature Flavors
            </h2>
            <p className="m-0 mb-3.5 text-[13px] font-light leading-[1.8]" style={sectionSub}>
              Take a dip in our heated rooftop infinity pool before settling
              in for dinner at one of our three signature restaurants.
            </p>
            <p className="m-0 mb-7 text-[13px] font-light leading-[1.8]" style={sectionSub}>
              Our chefs work with local producers to bring a menu that
              changes with the seasons, served against the backdrop of the
              city skyline.
            </p>
            <Link to="/contact" className={btnPrimaryClass} style={btnPrimary}>
              Reserve A Table
            </Link>
          </motion.div>
        </div>
        <div
          className="order-1 min-h-[260px] md:order-2 md:min-h-[400px]"
          style={{ background: `url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80') center/cover` }}
        />
      </section>

      {/* full amenities grid */}
      <section className="px-4 py-14 sm:px-8 md:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-10 text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />
            Everything You Need
            <span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="m-0 mb-2.5 text-[28px] font-semibold" style={sectionTitle}>
            All Our Amenities
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="px-5 py-6 text-center"
                style={{ background: COLORS.BACKGROUND, border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.LARGE }}
              >
                <Icon className="mx-auto mb-3 h-7 w-7" style={{ color: COLORS.ACCENT }} />
                <h3 className="m-0 mb-2 text-[15px]" style={sectionTitle}>{a.title}</h3>
                <p className="m-0 text-xs leading-[1.7]" style={{ color: COLORS.TEXT_SECONDARY }}>{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* cta */}
      <section className="px-4 py-16 text-center sm:px-8 md:px-[60px]" style={{ background: COLORS.PRIMARY }}>
        <motion.div {...fadeUp} className="mx-auto max-w-[560px]">
          <h2 className="m-0 mb-3 text-2xl font-semibold" style={{ fontFamily: FONTS.HEADING, color: COLORS.CREAM }}>
            Ready For A Stay Like No Other?
          </h2>
          <p className="m-0 mb-7 text-[13px] font-light leading-[1.8]" style={{ color: "rgba(248,246,243,0.7)" }}>
            Every amenity, every detail, every moment — designed around you.
            Book your room and experience it firsthand.
          </p>
          <Link to="/rooms" className={btnPrimaryClass} style={{ background: COLORS.ACCENT, color: COLORS.CREAM, fontFamily: FONTS.BODY }}>
            Book Your Stay
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
