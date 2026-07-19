import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XMarkIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PhotoIcon,
  ArrowUpRightIcon,
  SparklesIcon,
  CameraIcon
} from "@heroicons/react/24/outline";
import { COLORS, FONTS, BORDER_RADIUS } from "../constants/theme";

const CATEGORIES = [
  { id: "All", label: "All", icon: PhotoIcon },
  { id: "Rooms & Suites", label: "Rooms & Suites" },
  { id: "Dining", label: "Dining" },
  { id: "Spa & Pool", label: "Spa & Pool" },
  { id: "Exterior", label: "Exterior" },
  { id: "Events", label: "Events" },
];

const IMAGES = [
  { 
    id: 1, 
    category: "Rooms & Suites", 
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80", 
    alt: "Suite bedroom",
    title: "Royal Suite",
    description: "Luxurious king bedroom with city views"
  },
  { 
    id: 2, 
    category: "Rooms & Suites", 
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80", 
    alt: "Deluxe room",
    title: "Deluxe Room",
    description: "Modern comfort with elegant furnishings"
  },
  { 
    id: 3, 
    category: "Dining", 
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80", 
    alt: "Signature restaurant",
    title: "Signature Restaurant",
    description: "Fine dining with panoramic views"
  },
  { 
    id: 4, 
    category: "Dining", 
    src: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=900&q=80", 
    alt: "Rooftop bar",
    title: "Sky Lounge",
    description: "Rooftop bar with signature cocktails"
  },
  { 
    id: 5, 
    category: "Spa & Pool", 
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80", 
    alt: "Spa treatment room",
    title: "Serenity Spa",
    description: "Rejuvenating treatments in a peaceful setting"
  },
  { 
    id: 6, 
    category: "Spa & Pool", 
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80", 
    alt: "Rooftop pool",
    title: "Infinity Pool",
    description: "Rooftop pool with breathtaking views"
  },
  { 
    id: 7, 
    category: "Exterior", 
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80", 
    alt: "Hotel exterior at dusk",
    title: "Hotel Exterior",
    description: "Grand entrance at golden hour"
  },
  { 
    id: 8, 
    category: "Exterior", 
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80", 
    alt: "Hotel entrance",
    title: "Grand Entrance",
    description: "Welcoming lobby with timeless elegance"
  },
  { 
    id: 9, 
    category: "Events", 
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80", 
    alt: "Ballroom event setup",
    title: "Grand Ballroom",
    description: "Elegant events in a magnificent setting"
  },
  { 
    id: 10, 
    category: "Rooms & Suites", 
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80", 
    alt: "Standard room",
    title: "Executive Room",
    description: "Comfortable workspace with luxury amenities"
  },
  { 
    id: 11, 
    category: "Dining", 
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80", 
    alt: "Fine dining table setting",
    title: "Private Dining",
    description: "Intimate dining experiences with personalized service"
  },
  { 
    id: 12, 
    category: "Events", 
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80", 
    alt: "Wedding reception",
    title: "Wedding Celebrations",
    description: "Dream weddings in our elegant venues"
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredImages =
    activeCategory === "All" ? IMAGES : IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };
  
  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const showPrev = () =>
    setSelectedIndex((i) => (i === 0 ? filteredImages.length - 1 : i - 1));
  const showNext = () =>
    setSelectedIndex((i) => (i === filteredImages.length - 1 ? 0 : i + 1));

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleKeyDown = (e) => {
    if (selectedIndex !== null) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const uniqueCategories = [...new Set(IMAGES.map(img => img.category))];

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: FONTS.BODY, background: COLORS.BACKGROUND }}
    >
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image with Enhanced Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80')`,
            transform: "scale(1.05)",
          }}
        />
        
        {/* Gradient Overlay - Enhanced */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(31,26,23,0.92) 0%, rgba(31,26,23,0.6) 40%, rgba(31,26,23,0.3) 70%, rgba(31,26,23,0.1) 100%),
              linear-gradient(to bottom, rgba(31,26,23,0.3) 0%, transparent 30%, transparent 70%, rgba(31,26,23,0.6) 100%)
            `
          }}
        />

        {/* Decorative Accent Lines */}
        <div className="absolute top-0 left-0 w-1/3 h-px" style={{ background: `linear-gradient(to right, ${COLORS.ACCENT}, transparent)` }} />
        <div className="absolute bottom-0 right-0 w-1/4 h-px" style={{ background: `linear-gradient(to left, ${COLORS.ACCENT}, transparent)` }} />

        {/* Content Container */}
        <div className="relative z-10 w-full container mx-auto px-6 md:px-12">
          <div className="flex flex-col items-start max-w-3xl">
            {/* Breadcrumb / Category Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs uppercase tracking-[0.15em]"
                style={{ 
                  background: `rgba(212, 168, 130, 0.15)`,
                  color: COLORS.ACCENT,
                  fontFamily: FONTS.BODY,
                  border: `1px solid rgba(212, 168, 130, 0.15)`,
                  backdropFilter: "blur(10px)"
                }}
              >
                <CameraIcon className="w-3.5 h-3.5" />
                Visual Stories
              </span>
              <span className="w-px h-4" style={{ background: `rgba(248,246,243,0.2)` }} />
              <span className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>
                Gallery
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-light leading-[1.1] mb-4"
              style={{ 
                fontFamily: FONTS.HEADING,
                color: COLORS.CREAM,
                letterSpacing: "-0.03em"
              }}
            >
              Our <br className="sm:hidden" />
              <span style={{ color: COLORS.ACCENT }}>Gallery</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg font-light max-w-xl mb-8"
              style={{ 
                color: "rgba(248,246,243,0.75)",
                fontFamily: FONTS.BODY,
                lineHeight: 1.8
              }}
            >
              Explore the elegance and beauty of LuxuryStay through our curated collection of spaces and moments.
            </motion.p>

            {/* Stats & CTA Row - Enhanced Alignment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 md:gap-10"
            >
              {/* Stats Group */}
              <div className="flex items-center gap-6 md:gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ background: `rgba(212, 168, 130, 0.15)` }}
                  >
                    <PhotoIcon className="w-5 h-5" style={{ color: COLORS.ACCENT }} />
                  </div>
                  <div>
                    <p className="text-xl font-light" style={{ color: COLORS.CREAM }}>
                      {IMAGES.length}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>
                      Photos
                    </p>
                  </div>
                </div>

                <div className="w-px h-10" style={{ background: "rgba(248,246,243,0.15)" }} />

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ background: `rgba(212, 168, 130, 0.15)` }}
                  >
                    <SparklesIcon className="w-5 h-5" style={{ color: COLORS.ACCENT }} />
                  </div>
                  <div>
                    <p className="text-xl font-light" style={{ color: COLORS.CREAM }}>
                      {uniqueCategories.length}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "rgba(248,246,243,0.5)" }}>
                      Categories
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-8 hidden md:block" style={{ background: "rgba(248,246,243,0.15)" }} />

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300"
                style={{
                  color: COLORS.CREAM,
                  border: `1px solid rgba(248,246,243,0.2)`,
                  borderRadius: "100px",
                  background: "rgba(248,246,243,0.05)",
                  fontFamily: FONTS.BODY,
                  backdropFilter: "blur(10px)"
                }}
                onClick={() => document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Gallery
                <ArrowUpRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(248,246,243,0.3)" }}>
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

      {/* Filter Chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="sticky top-0 z-20 backdrop-blur-md border-b"
        style={{ 
          background: `rgba(248, 246, 243, 0.8)`,
          borderColor: COLORS.BORDER
        }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-2 py-4">
            {CATEGORIES.map((cat) => {
              const active = cat.id === activeCategory;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative px-5 py-2 text-xs font-medium transition-all duration-300"
                  style={{
                    fontFamily: FONTS.BODY,
                    borderRadius: "100px",
                    background: active ? COLORS.PRIMARY : "transparent",
                    color: active ? COLORS.CREAM : COLORS.TEXT_SECONDARY,
                    border: `1px solid ${active ? COLORS.PRIMARY : COLORS.BORDER}`,
                    boxShadow: active ? `0 4px 12px rgba(92,26,43,0.2)` : "none",
                  }}
                >
                  {cat.label}
                  {active && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full"
                      style={{ 
                        background: COLORS.PRIMARY,
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Masonry Gallery */}
      <section id="gallery-grid" className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredImages.map((img, i) => {
              const size = i % 3 === 0 ? "large" : i % 2 === 0 ? "medium" : "small";
              const isHovered = hoveredIndex === i;
              
              return (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
                  className="relative group cursor-pointer"
                  style={{
                    gridColumn: size === "large" ? "span 2" : "span 1",
                    gridRow: size === "large" ? "span 2" : "span 1",
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => openLightbox(i)}
                >
                  <div 
                    className="relative overflow-hidden h-full"
                    style={{ 
                      borderRadius: BORDER_RADIUS.MEDIUM,
                      aspectRatio: size === "large" ? "4/3" : "1/1",
                      background: COLORS.SURFACE
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-all duration-700"
                      style={{
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        filter: isHovered ? "brightness(0.7)" : "brightness(1)",
                      }}
                    />

                    {/* Overlay */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        background: `linear-gradient(to top, rgba(31,26,23,0.8) 0%, transparent 60%)`
                      }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <h3 
                          className="text-white text-sm md:text-base font-medium mb-1"
                          style={{ fontFamily: FONTS.HEADING }}
                        >
                          {img.title || img.category}
                        </h3>
                        <p 
                          className="text-white/70 text-xs md:text-sm"
                          style={{ fontFamily: FONTS.BODY }}
                        >
                          {img.category}
                        </p>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-1 mt-2"
                          style={{ color: COLORS.ACCENT }}
                        >
                          <span className="text-xs">View</span>
                          <ArrowUpRightIcon className="w-3 h-3" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span 
                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full backdrop-blur-sm"
                        style={{
                          background: "rgba(31,26,23,0.6)",
                          color: COLORS.CREAM,
                          fontFamily: FONTS.BODY,
                          border: "1px solid rgba(255,255,255,0.1)"
                        }}
                      >
                        {img.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <PhotoIcon className="w-12 h-12 mx-auto" style={{ color: COLORS.BORDER }} />
              <p className="mt-4 text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
                No images in this category
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox - Minimal & Elegant */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(10,8,7,0.92)" }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              whileHover={{ background: "rgba(255,255,255,0.1)" }}
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 md:left-8 p-2 rounded-full transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              whileHover={{ background: "rgba(255,255,255,0.1)" }}
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 md:right-8 p-2 rounded-full transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              whileHover={{ background: "rgba(255,255,255,0.1)" }}
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </motion.button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedIndex].src}
                alt={filteredImages[selectedIndex].alt}
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 rounded-b-lg"
                style={{
                  background: "linear-gradient(to top, rgba(10,8,7,0.9) 0%, transparent 100%)"
                }}
              >
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                  {filteredImages[selectedIndex].category}
                </p>
                <h3 className="text-white text-lg font-light">
                  {filteredImages[selectedIndex].title || "Untitled"}
                </h3>
                <p className="text-white/50 text-sm mt-1">
                  {filteredImages[selectedIndex].description || ""}
                </p>
                <p className="text-white/30 text-xs mt-2">
                  {selectedIndex + 1} / {filteredImages.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}