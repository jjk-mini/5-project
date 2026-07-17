import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { COLORS, FONTS, BORDER_RADIUS } from "../constants/theme";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CATEGORIES = ["All", "Rooms & Suites", "Dining", "Spa & Pool", "Exterior", "Events"];

const IMAGES = [
  { id: 1, category: "Rooms & Suites", src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80", alt: "Suite bedroom" },
  { id: 2, category: "Rooms & Suites", src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80", alt: "Deluxe room" },
  { id: 3, category: "Dining", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80", alt: "Signature restaurant" },
  { id: 4, category: "Dining", src: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=900&q=80", alt: "Rooftop bar" },
  { id: 5, category: "Spa & Pool", src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80", alt: "Spa treatment room" },
  { id: 6, category: "Spa & Pool", src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80", alt: "Rooftop pool" },
  { id: 7, category: "Exterior", src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80", alt: "Hotel exterior at dusk" },
  { id: 8, category: "Exterior", src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80", alt: "Hotel entrance" },
  { id: 9, category: "Events", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80", alt: "Ballroom event setup" },
  { id: 10, category: "Rooms & Suites", src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80", alt: "Standard room" },
  { id: 11, category: "Dining", src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80", alt: "Fine dining table setting" },
  { id: 12, category: "Events", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80", alt: "Wedding reception" },
];

const sectionLabel = { color: COLORS.ACCENT, fontFamily: FONTS.BODY };
const sectionLine = { background: COLORS.ACCENT };
const sectionTitle = { fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY };

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredImages =
    activeCategory === "All" ? IMAGES : IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const showPrev = () =>
    setSelectedIndex((i) => (i === 0 ? filteredImages.length - 1 : i - 1));
  const showNext = () =>
    setSelectedIndex((i) => (i === filteredImages.length - 1 ? 0 : i + 1));

  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: FONTS.BODY, background: COLORS.BACKGROUND, color: COLORS.TEXT_PRIMARY }}
    >
      {/* hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(31,26,23,0.85) 40%, rgba(31,26,23,0.45) 100%),
                         url('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-[1] max-w-[680px] px-6 py-16 sm:px-10 md:px-[60px] md:py-20">
          <motion.div {...fadeUp}>
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em]" style={sectionLabel}>
              <span className="h-px w-5" style={sectionLine} />
              A Closer Look
            </p>
            <h1
              className="m-0 mb-4 text-[clamp(32px,5vw,52px)] font-semibold leading-[1.2]"
              style={{ fontFamily: FONTS.HEADING, color: COLORS.CREAM }}
            >
              Our Gallery
            </h1>
            <p className="m-0 max-w-[480px] text-sm font-light leading-[1.8]" style={{ color: "rgba(248,246,243,0.75)" }}>
              A glimpse into the spaces, moments, and details that make a
              stay at LuxuryStay unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* filter tabs */}
      <section className="px-4 pt-10 sm:px-8 md:px-[60px]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="cursor-pointer whitespace-nowrap px-4 py-2 text-xs font-medium transition-colors"
                style={{
                  fontFamily: FONTS.BODY,
                  borderRadius: BORDER_RADIUS.PILL,
                  background: active ? COLORS.PRIMARY : COLORS.SURFACE,
                  color: active ? COLORS.CREAM : COLORS.TEXT_SECONDARY,
                  border: `0.5px solid ${active ? COLORS.PRIMARY : COLORS.BORDER}`,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* gallery grid */}
      <section className="px-4 py-12 sm:px-8 md:px-[60px]">
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {filteredImages.map((img, i) => (
            <motion.button
              key={img.id}
              {...fadeUp}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              onClick={() => openLightbox(i)}
              className={`group relative cursor-pointer overflow-hidden border-none p-0 ${
                i % 5 === 0 ? "col-span-2 row-span-2 h-[280px] sm:h-[380px]" : "h-[160px] sm:h-[220px]"
              }`}
              style={{ borderRadius: BORDER_RADIUS.MEDIUM }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(to top, rgba(31,26,23,0.55), transparent 60%)" }}
              />
              <span
                className="absolute bottom-2.5 left-3 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ color: COLORS.CREAM, fontFamily: FONTS.BODY }}
              >
                {img.category}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(18,18,18,0.9)" }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: "rgba(248,246,243,0.1)" }}
              aria-label="Close gallery"
            >
              <XMarkIcon className="h-6 w-6" style={{ color: COLORS.CREAM }} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full sm:left-6"
              style={{ background: "rgba(248,246,243,0.1)" }}
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6" style={{ color: COLORS.CREAM }} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[80vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedIndex].src}
                alt={filteredImages[selectedIndex].alt}
                className="max-h-[80vh] max-w-[90vw] object-contain"
                style={{ borderRadius: BORDER_RADIUS.MEDIUM }}
              />
              <p className="mt-3 text-center text-xs" style={{ color: "rgba(248,246,243,0.7)", fontFamily: FONTS.BODY }}>
                {filteredImages[selectedIndex].category}
              </p>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-full sm:right-6"
              style={{ background: "rgba(248,246,243,0.1)" }}
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6" style={{ color: COLORS.CREAM }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
