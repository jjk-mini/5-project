import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { motion, AnimatePresence  } from "framer-motion";
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
} from "@heroicons/react/24/outline";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";
// import { setMargin } from "recharts/types/state/layoutSlice";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";



export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};



export const FEATURES = [
  { icon: HomeModernIcon, title: "Quality Rooms", desc: "A perfect blend of comfort and elegance, designed to provide a relaxing retreat for our guests." },
  { icon: SunIcon, title: "Private Beach", desc: "Relax on our exclusive private beach, where soft sand and calm waters offer the perfect escape." },
  { icon: BuildingOffice2Icon, title: "Best Accommodation", desc: "Thoughtfully designed rooms equipped with modern amenities and elegant decor." },
  { icon: SparklesIcon, title: "Wellness & Spa", desc: "Rejuvenate your mind and body at our serene wellness spa in a tranquil setting." },
  { icon: CakeIcon, title: "Restaurants & Bars", desc: "Savour exquisite cuisine or unwind with a drink at our world-class restaurant and bar." },
  { icon: GiftIcon, title: "Special Offers", desc: "Exclusive deals and packages to dine, shop, and make your stay memorable on a limited basis." },
];

export const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Elegance Redefined",
    title: "Experience Unparalleled Luxury",
    text: "Immerse yourself in a world where luxury meets comfort. Every detail is crafted to provide an unforgettable experience.",
  },
  {
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Refined Sophistication",
    title: "Indulge in Opulence",
    text: "Step into a realm of exquisite design and superior service. Your perfect escape awaits.",
  },
  {
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Ultimate Comfort",
    title: "Luxury Beyond Compare",
    text: "Experience the pinnacle of luxury living with our world-class amenities and services tailored just for you.",
  },
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



// Theme values (colors, fonts, shadows, radii) live in theme.js and are runtime
// JS values, so they're applied via inline `style` where Tailwind's static
// class scanner can't pick them up. Everything else (layout, spacing,
// typography scale, flex/grid) is expressed with Tailwind utility classes.

export const sectionLabel = {
  color: COLORS.ACCENT,
  fontFamily: FONTS.BODY,
};

export const sectionLine = {
  background: COLORS.ACCENT,
};

export const sectionTitle = {
  fontFamily: FONTS.HEADING,
  color: COLORS.DARK,
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
  const [slide, setSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    checkIn: "", checkOut: "", adults: "1 Adult", rooms: "1 Room",
  });

 useEffect(() => {
  const timer = setInterval(() => {
    setSlide((s) => (s + 1) % heroSlides.length);
  }, 6000);

  return () => clearInterval(timer);
}, []);

useEffect(() => {
  const timer = setInterval(() => {
    setActiveTestimonial((t) => (t + 1) % TESTIMONIALS.length);
  }, 5000);

  return () => clearInterval(timer);
}, []);

  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: FONTS.BODY, background: COLORS.BACKGROUND, color: COLORS.TEXT_BODY }}
    >



      {/* hero section */}
     <section className="relative h-[90vh] overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.div
      key={slide}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(11,11,11,0.55), rgba(11,11,11,0.55)), url(${heroSlides[slide].image})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-center px-4"
      >
        <p className="text-primary-300 uppercase tracking-[6px] text-sm mb-4">
          {heroSlides[slide].eyebrow}
        </p>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
          {heroSlides[slide].title}
        </h1>

        <p className="text-white/80 max-w-xl mx-auto mb-8">
          {heroSlides[slide].text}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/rooms" className="btn-primary">
            Explore Rooms
          </Link>

          <Link
            to="/contact"
            className="btn-outline !text-white !border-white"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>

  {/* Previous */}
  <button
    onClick={() =>
      setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)
    }
    className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10 hover:text-primary-300 transition-colors"
    aria-label="Previous Slide"
  >
    <HiChevronLeft />
  </button>

  {/* Next */}
  <button
    onClick={() =>
      setSlide((s) => (s + 1) % heroSlides.length)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10 hover:text-primary-300 transition-colors"
    aria-label="Next Slide"
  >
    <HiChevronRight />
  </button>

  {/* Dots */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
    {heroSlides.map((_, i) => (
      <button
        key={i}
        onClick={() => setSlide(i)}
        className={`w-2.5 h-2.5 rounded-full transition-all ${
          i === slide
            ? "bg-primary-400 w-6"
            : "bg-white/50"
        }`}
        aria-label={`Go to Slide ${i + 1}`}
      />
    ))}
  </div>
</section>



      {/* bookingform */}
      {/* <section className="px-4 sm:px-6 md:px-10" style={{ background: COLORS.SURFACE, boxShadow: SHADOWS.CARD }}>
        <div
          className="flex flex-wrap items-center gap-4 py-5"
          style={{ borderBottom: `0.5px solid ${COLORS.BORDER}` }}
        >

          <div className="min-w-[140px] flex-1">
            <label className="mb-1 block text-[10px] uppercase tracking-[0.06em]" style={{ color: COLORS.TEXT_SECONDARY }}>
              Check In
            </label>
            <input
              type="date"
              value={bookingForm.checkIn}
              onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
              className="w-full px-2.5 py-2 text-[13px] outline-none"
              style={{ border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.SM, color: COLORS.TEXT_BODY, background: COLORS.BACKGROUND, fontFamily: FONTS.BODY }}
            />
          </div>

          <div className="min-w-[140px] flex-1">
            <label className="mb-1 block text-[10px] uppercase tracking-[0.06em]" style={{ color: COLORS.TEXT_SECONDARY }}>
              Check Out
            </label>
            <input
              type="date"
              value={bookingForm.checkOut}
              onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
              className="w-full px-2.5 py-2 text-[13px] outline-none"
              style={{ border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.SM, color: COLORS.TEXT_BODY, background: COLORS.BACKGROUND, fontFamily: FONTS.BODY }}
            />
          </div>

          <div className="min-w-[120px] flex-1">
            <label className="mb-1 block text-[10px] uppercase tracking-[0.06em]" style={{ color: COLORS.TEXT_SECONDARY }}>
              Adults
            </label>
            <select
              value={bookingForm.adults}
              onChange={(e) => setBookingForm({ ...bookingForm, adults: e.target.value })}
              className="w-full px-2.5 py-2 text-[13px] outline-none"
              style={{ border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.SM, color: COLORS.TEXT_BODY, background: COLORS.BACKGROUND, fontFamily: FONTS.BODY }}
            >
              {["1 Adult", "2 Adults", "3 Adults", "4 Adults"].map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>

          <div className="min-w-[120px] flex-1">
            <label className="mb-1 block text-[10px] uppercase tracking-[0.06em]" style={{ color: COLORS.TEXT_SECONDARY }}>
              Rooms
            </label>
            <select
              value={bookingForm.rooms}
              onChange={(e) => setBookingForm({ ...bookingForm, rooms: e.target.value })}
              className="w-full px-2.5 py-2 text-[13px] outline-none"
              style={{ border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.SM, color: COLORS.TEXT_BODY, background: COLORS.BACKGROUND, fontFamily: FONTS.BODY }}
            >
              {["1 Room", "2 Rooms", "3 Rooms"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div className="pt-3.5">
            <button className={`${btnPrimaryClass} whitespace-nowrap`} style={btnPrimary}>
              Check Availability
            </button>
          </div>
        </div>
      </section> */}


      {/* about us */}
      <section id="about" className="px-4 py-14 sm:px-8 md:px-12 lg:px-[60px] lg:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-[60px]">

          <motion.div {...fadeUp} className="grid grid-cols-2 gap-2.5">
            <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=400&q=80"
              alt="Hotel room" className="h-[200px] w-full object-cover" style={{ borderRadius: BORDER_RADIUS.LG }} />
            <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=400&q=80"
              alt="Hotel room" className="mt-6 h-[200px] w-full object-cover" style={{ borderRadius: BORDER_RADIUS.LG }} />
            <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=400&q=80"
              alt="Hotel room" className="h-40 w-full object-cover" style={{ borderRadius: BORDER_RADIUS.LG }} />
            <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80"
              alt="Hotel room" className="mt-6 h-40 w-full object-cover" style={{ borderRadius: BORDER_RADIUS.LG }} />
          </motion.div>

          <motion.div {...fadeUp}>
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
              <span className="h-px w-5" style={sectionLine} />About Us
            </p>
            <h2 className="m-0 mb-2.5 text-[28px] font-semibold" style={sectionTitle}>Most Safe & Rated Hotel<br />In Karachi</h2>
            <p className="m-0 mb-5 text-[13px] font-light leading-[1.8]" style={sectionSub}>
              Welcome to our premier hotel in Karachi, where luxury meets comfort. Our dedicated
              staff provides exceptional service, and convenient location in the heart of the city.
            </p>
            <p className="m-0 mb-6 text-[13px] font-light leading-[1.8]" style={sectionSub}>
              Our commitment to excellence extends to every aspect of your stay. From our attentive
              staff to our world-class amenities, we are dedicated to making your visit unforgettable.
            </p>
            {[
              "Luxurious Rooms with Modern Amenities",
              "24/7 Concierge Service and Room Service",
              "Exclusive Access to Fitness Center and Spa",
              "Complimentary High-Speed WiFi Throughout the Hotel",
              "Prime Location with Easy Access to Major Attractions",
            ].map((point) => (
              <div key={point} className="mb-2.5 flex items-center gap-2.5">
                <div
                  className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: COLORS.BROWN_100, border: `0.5px solid ${COLORS.SECONDARY}` }}
                >
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: COLORS.ACCENT }} />
                </div>
                <span className="text-[13px]" style={{ color: COLORS.TEXT_BODY, fontFamily: FONTS.BODY }}>{point}</span>
              </div>
            ))}
            <Link
              to="/about"
              className={`${btnPrimaryClass} mt-6`}
              style={btnPrimary}
            >
              Discover More
            </Link>
          </motion.div>
        </div>
      </section>


      {/* featurs */}
      <section className="px-4 py-14 sm:px-8 md:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-10 text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />What We Offer<span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="m-0 mb-2.5 text-[28px] font-semibold" style={sectionTitle}>Hotel Features</h2>
        </motion.div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="px-5 py-6 text-center"
                style={{ background: COLORS.BACKGROUND, border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.LG }}
              >
                <Icon className="mx-auto mb-3 h-7 w-7" style={{ color: COLORS.ACCENT }} />
                <h3 className="m-0 mb-2 text-[15px]" style={sectionTitle}>{f.title}</h3>
                <p className="m-0 text-xs leading-[1.7]" style={{ color: COLORS.TEXT_SECONDARY }}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>





      <section className="grid grid-cols-1 md:grid-cols-2 md:min-h-[400px] m-4">
        <div
          className="min-h-[260px] md:min-h-[400px] "
          style={{ background: `url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80') center/cover`, }}
        />

        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-[50px] lg:py-[60px]" style={{ background: COLORS.SURFACE }}>
          <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />Seaside Resort & Resort
          </p>
          <h2 className="m-0 mb-2.5 text-2xl font-semibold" style={sectionTitle}>Jewel of<br />the Adriatic</h2>
          <p className="m-0 mb-3.5 text-[13px] font-light leading-[1.8]" style={sectionSub}>
            Nestled in our exquisite luxury resort setting, find total comfort in a truly content
            setting. Our fine-line hotel boasts resort channels, world-class amenities, and
            outstanding service.
          </p>
          <p className="m-0 mb-7 text-[13px] font-light leading-[1.8]" style={sectionSub}>
            Discover the ultimate retreat at our luxurious resort, where relaxation and adventure
            seamlessly blend in a stunning natural setting.
          </p>
          <button className={btnPrimaryClass} style={btnPrimary}>Discover More</button>
        </div>
      </section>


      <section className="px-4 py-14 sm:px-8 md:px-12 lg:px-[60px] lg:py-20" style={{ background: COLORS.BACKGROUND }}>
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.5fr] md:gap-12">

          <motion.div {...fadeUp}>
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
              <span className="h-px w-5" style={sectionLine} />Best Prices
            </p>
            <h2 className="m-0 mb-2.5 text-[26px] font-semibold" style={sectionTitle}>Extra Services</h2>
            <p className="text-[13px] font-light leading-[1.8]" style={sectionSub}>
              At our hotel, we provide you with not only premier accommodation but also a range of additional
              services designed to enhance your stay, from daily room cleaning to exclusive hotel packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {[
              {
                title: "Room Cleaning",
                badge: "Daily",
                points: ["Daily room cleaning to maintain a fresh and tidy environment", "Schedule your cleaning service at a time that suits your stay", "Professionally friendly cleaning products for your health and safety"],
              },
              {
                title: "Drinks Included",

                badge: "Daily",
                points: ["A selection of complimentary drinks delivered to your room daily", "Take your drink preferences to our pool bar — included in stay", "Unlimited access to your in-room minibar, refreshed daily"],
              },
            ].map((service) => (
              <motion.div
                key={service.title}
                {...fadeUp}
                className="p-5"
                style={{ background: COLORS.SURFACE, border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.LG, boxShadow: SHADOWS.CARD }}
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <h3 className="m-0 text-[15px]" style={sectionTitle}>{service.title}</h3>
                  <span
                    className="px-2 py-0.5 text-[10px]"
                    style={{ background: COLORS.BROWN_100, color: COLORS.PRIMARY, borderRadius: BORDER_RADIUS.PILL, fontFamily: FONTS.BODY }}
                  >
                    {service.badge}
                  </span>
                </div>
                <p className="m-0 mb-3 text-[22px] font-semibold" style={{ fontFamily: FONTS.HEADING, color: COLORS.ACCENT }}>{service.price}</p>
                {service.points.map((p) => (
                  <div key={p} className="mb-2 flex gap-2">
                    <span className="flex-shrink-0 text-xs" style={{ color: COLORS.ACCENT }}>✓</span>
                    <span className="text-xs leading-[1.6]" style={{ color: COLORS.TEXT_SECONDARY }}>{p}</span>
                  </div>
                ))}
                <button className={`${btnPrimaryClass} mt-3 w-full py-2.5 text-center text-xs`} style={btnPrimary}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* testimonial */}
      <section className="px-4 py-14 text-center sm:px-8 md:px-12 lg:px-[60px] lg:py-20" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp}>
          <p className="mb-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />Testimonials<span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="m-0 mb-12 text-[28px] font-semibold" style={sectionTitle}>What Our Clients Say</h2>
        </motion.div>

        <div className="mx-auto max-w-[600px]">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white"
            style={{ background: COLORS.ACCENT }}
          >
            {TESTIMONIALS[activeTestimonial].avatar}
          </div>

          <div className="mb-4 text-base tracking-[3px]" style={{ color: COLORS.ACCENT }}>
            {"★".repeat(TESTIMONIALS[activeTestimonial].stars)}
          </div>

          <p className="m-0 mb-5 text-lg italic leading-[1.7]" style={sectionTitle}>
            "{TESTIMONIALS[activeTestimonial].text}"
          </p>

          <p className="text-[13px] font-medium" style={{ fontFamily: FONTS.BODY, color: COLORS.PRIMARY }}>
            — {TESTIMONIALS[activeTestimonial].name}
          </p>


          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 cursor-pointer rounded p-0 transition-all duration-300 ${i === activeTestimonial ? "w-5" : "w-2"}`}
                style={{ background: i === activeTestimonial ? COLORS.ACCENT : COLORS.BORDER, border: "none" }}
              />
            ))}
          </div>
        </div>
      </section>


      {/* book */}
      <section className="grid grid-cols-1 md:grid-cols-2">

        <div className="px-6 py-12 sm:px-10 lg:px-[50px] lg:py-[60px]" style={{ background: COLORS.BACKGROUND }}>
          <motion.div {...fadeUp}>
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
              <span className="h-px w-5" style={sectionLine} />Make Appointment
            </p>
            <h2 className="m-0 mb-8 text-[28px] font-semibold" style={sectionTitle}>Book A Room</h2>
          </motion.div>

          <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>Check In Date</label>
              <input
                type="date"
                className="w-full px-3 py-2.5 text-[13px] outline-none"
                style={{ border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.MD, color: COLORS.TEXT_BODY, background: COLORS.SURFACE, fontFamily: FONTS.BODY }}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>Check Out Date</label>
              <input
                type="date"
                className="w-full px-3 py-2.5 text-[13px] outline-none"
                style={{ border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.MD, color: COLORS.TEXT_BODY, background: COLORS.SURFACE, fontFamily: FONTS.BODY }}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>Adults</label>
              <select
                className="w-full px-3 py-2.5 text-[13px] outline-none"
                style={{ border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.MD, color: COLORS.TEXT_BODY, background: COLORS.SURFACE, fontFamily: FONTS.BODY }}
              >
                {["1 Adult", "2 Adults", "3 Adults", "4 Adults"].map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>Rooms</label>
              <select
                className="w-full px-3 py-2.5 text-[13px] outline-none"
                style={{ border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.MD, color: COLORS.TEXT_BODY, background: COLORS.SURFACE, fontFamily: FONTS.BODY }}
              >
                {["1 Room", "2 Rooms", "3 Rooms"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <button className={`${btnPrimaryClass} mt-2 w-full py-3.5 text-center text-sm`} style={btnPrimary}>
            Book Room Now
          </button>
        </div>

        <div
          className="min-h-[260px] md:min-h-[400px]"
          style={{ background: `url('https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80') center/cover` }}
        />
      </section>


      {/* amenities */}
      <section className="px-4 py-14 sm:px-8 md:px-[60px]" style={{ background: COLORS.SURFACE }}>
        <motion.div {...fadeUp} className="mb-10 text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
            <span className="h-px w-5" style={sectionLine} />What We Provide<span className="h-px w-5" style={sectionLine} />
          </p>
          <h2 className="m-0 mb-2.5 text-[28px] font-semibold" style={sectionTitle}>Hotel Amenities</h2>
        </motion.div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="px-5 py-6 text-center"
                style={{ background: COLORS.BACKGROUND, border: `0.5px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.LG }}
              >
                <Icon className="mx-auto mb-3 h-7 w-7" style={{ color: COLORS.ACCENT }} />
                <h3 className="m-0 mb-2 text-[15px]" style={sectionTitle}>{a.title}</h3>
                <p className="m-0 text-xs leading-[1.7]" style={{ color: COLORS.TEXT_SECONDARY }}>{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}