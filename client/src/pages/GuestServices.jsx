import { useState, useEffect, useRef, useMemo } from "react";
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../constants/theme";
import { serviceApi } from "../api/serviceApi";
import { orderApi } from "../api/orderApi";
import {
  Search,
  Clock,
  Star,
  Plus,
  Minus,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Receipt,
  Info,
} from "lucide-react";

const CATEGORIES = [
  "All Services",
  "Food & Drinks",
  "Laundry",
  "Spa & Wellness",
  "Housekeeping",
  "Room Service",
  "Transport",
];

const SERVICE_CHARGE_RATE = 0.10;
const TAX_RATE = 0.08;

const FAQS = [
  {
    q: "How long does room service usually take?",
    a: "Most room service orders are delivered within 30-45 minutes. You can check the estimated delivery time on each service card. For expedited requests, please contact the concierge directly.",
  },
  {
    q: "Can I schedule a service in advance?",
    a: "Yes — for services marked \"Schedule Now\", you'll be able to choose a preferred time after adding them to your selections. Same-day services are fulfilled in the order they're received.",
  },
  {
    q: "Are gratuities included in the final price?",
    a: "A 10% service charge is automatically added to every order and covers gratuity for the staff fulfilling your request, so no additional tipping is required.",
  },
  {
    q: "What are the hours for the Spa & Wellness center?",
    a: "The Spa & Wellness center is open daily from 7:00 AM to 9:00 PM. In-suite treatments can be scheduled outside these hours on request, subject to therapist availability.",
  },
  {
    q: "Is there a cancellation fee for booked services?",
    a: "Orders can be cancelled free of charge before they're confirmed by staff. Once a service is in progress or delivered, it can no longer be cancelled or refunded.",
  },
];

const currency = (n) => `$${n.toFixed(2)}`;

export default function GuestServices() {
  const [services, setServices] = useState([]);
  const [curated, setCurated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState("All Services");
  const [searchTerm, setSearchTerm] = useState("");
  const [cardQty, setCardQty] = useState({}); // { [serviceId]: number } — per-card stepper before Add

  const [cart, setCart] = useState([]); // [{ serviceId, name, image, price, quantity }]
  const [instructions, setInstructions] = useState("");
  const [placing, setPlacing] = useState(false);
  const [placeError, setPlaceError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const [openFaq, setOpenFaq] = useState(0);

  const catScrollRef = useRef(null);
  const curatedScrollRef = useRef(null);

  // Fetch the main catalog whenever category/search changes
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await serviceApi.getAll({
          category: activeCategory,
          search: searchTerm || undefined,
        });
        setServices(res.data || []);
      } catch {
        setError("Couldn't load services. Make sure your backend server is running.");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchServices, searchTerm ? 300 : 0);
    return () => clearTimeout(debounce);
  }, [activeCategory, searchTerm]);

  // Curated carousel fetched once
  useEffect(() => {
    const fetchCurated = async () => {
      try {
        const res = await serviceApi.getAll({ curated: true });
        setCurated(res.data || []);
      } catch {
        setCurated([]);
      }
    };
    fetchCurated();
  }, []);

  const getQty = (id) => cardQty[id] || 1;
  const setQty = (id, value) => setCardQty((prev) => ({ ...prev, [id]: Math.max(1, value) }));

  const addToCart = (service) => {
    const qty = getQty(service._id);
    setCart((prev) => {
      const existing = prev.find((i) => i.serviceId === service._id);
      if (existing) {
        return prev.map((i) =>
          i.serviceId === service._id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, {
        serviceId: service._id,
        name: service.name,
        image: service.image,
        price: service.price,
        quantity: qty,
      }];
    });
    setQty(service._id, 1);
  };

  const updateCartQty = (serviceId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.serviceId === serviceId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (serviceId) => {
    setCart((prev) => prev.filter((i) => i.serviceId !== serviceId));
  };

  const { subtotal, serviceCharge, taxes, total } = useMemo(() => {
    const sub = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const sc = sub * SERVICE_CHARGE_RATE;
    const tax = sub * TAX_RATE;
    return { subtotal: sub, serviceCharge: sc, taxes: tax, total: sub + sc + tax };
  }, [cart]);

  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setPlacing(true);
    setPlaceError("");
    try {
      const res = await orderApi.create({
        items: cart.map((i) => ({ serviceId: i.serviceId, quantity: i.quantity })),
        specialInstructions: instructions,
      });
      setPlacedOrder(res.data);
      setCart([]);
      setInstructions("");
    } catch (err) {
      setPlaceError(err.response?.data?.message || "Couldn't place your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  const scrollCats = (dir) => {
    catScrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };
  const scrollCurated = (dir) => {
    curatedScrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div style={{ background: COLORS.BACKGROUND, fontFamily: FONTS.BODY, color: COLORS.TEXT_PRIMARY }}>

      {/* ── HERO ── */}
      <section className="relative px-4">
        <div
          className="relative overflow-hidden text-center px-6 py-20 sm:py-28"
          style={{
            background: `linear-gradient(to bottom, ${COLORS.DARK}CC, ${COLORS.PRIMARY}E6), url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80') center/cover`,
          }}
        >
          <p
            className="text-xs sm:text-sm font-medium uppercase mb-4"
            style={{ color: COLORS.ACCENT, letterSpacing: "0.25em", fontFamily: FONTS.BODY }}
          >
            Welcome to Excellence
          </p>
          <h1
            className="text-4xl sm:text-6xl mb-4"
            style={{ fontFamily: FONTS.HEADING, color: COLORS.CREAM }}
          >
            At Your <em style={{ color: COLORS.ACCENT, fontStyle: "italic" }}>Service</em>
          </h1>
          <div className="w-14 h-px mx-auto mb-6" style={{ background: COLORS.ACCENT }} />
          <p
            className="max-w-xl mx-auto text-sm sm:text-base"
            style={{ color: `${COLORS.CREAM}CC`, lineHeight: 1.8 }}
          >
            Discover curated experiences, dining, and amenities designed to elevate your stay.
            Order directly to your suite.
          </p>
        </div>

        {/* Search + category pills — floating card, overlaps hero bottom edge */}
        <div
          className="relative z-10 -mt-10 sm:-mt-12 max-w-4xl mx-auto p-4 sm:p-6"
          style={{ background: COLORS.SURFACE, borderRadius: BORDER_RADIUS.LARGE, boxShadow: SHADOWS.CARD }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 mb-4"
            style={{ border: `1px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.MEDIUM, background: COLORS.BACKGROUND }}
          >
            <Search size={18} style={{ color: COLORS.MUTED }} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for services, food, amenities..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: COLORS.TEXT_PRIMARY, fontFamily: FONTS.BODY }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCats(-1)}
              aria-label="Scroll categories left"
              className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
              style={{ border: `1px solid ${COLORS.BORDER}`, color: COLORS.TEXT_SECONDARY }}
            >
              <ChevronLeft size={14} />
            </button>

            <div ref={catScrollRef} className="flex gap-2 overflow-x-auto scroll-smooth" style={{ scrollbarWidth: "thin" }}>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors"
                    style={{
                      background: isActive ? COLORS.PRIMARY : COLORS.BACKGROUND,
                      color: isActive ? COLORS.CREAM : COLORS.TEXT_SECONDARY,
                      border: `1px solid ${isActive ? COLORS.PRIMARY : COLORS.BORDER}`,
                      borderRadius: BORDER_RADIUS.PILL,
                      fontFamily: FONTS.BODY,
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollCats(1)}
              aria-label="Scroll categories right"
              className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
              style={{ border: `1px solid ${COLORS.BORDER}`, color: COLORS.TEXT_SECONDARY }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── MAIN: catalog + cart sidebar ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Catalog */}
          <div>
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="text-2xl sm:text-3xl" style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}>
                {activeCategory}
              </h2>
              <span
                className="text-xs font-medium px-2.5 py-1"
                style={{ background: `${COLORS.ACCENT}33`, color: COLORS.TEXT_SECONDARY, borderRadius: BORDER_RADIUS.PILL }}
              >
                {services.length} Result{services.length !== 1 ? "s" : ""}
              </span>
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="animate-pulse" style={{ background: COLORS.SURFACE, borderRadius: BORDER_RADIUS.LARGE, border: `1px solid ${COLORS.BORDER}` }}>
                    <div className="h-40" style={{ background: COLORS.BORDER, borderRadius: `${BORDER_RADIUS.LARGE} ${BORDER_RADIUS.LARGE} 0 0` }} />
                    <div className="p-4 space-y-2">
                      <div className="h-4 w-2/3 rounded" style={{ background: COLORS.BORDER }} />
                      <div className="h-3 w-full rounded" style={{ background: COLORS.BORDER }} />
                      <div className="h-3 w-4/5 rounded" style={{ background: COLORS.BORDER }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16 px-6" style={{ background: COLORS.SURFACE, borderRadius: BORDER_RADIUS.LARGE, border: `1px solid ${COLORS.BORDER}` }}>
                <p className="font-medium" style={{ color: COLORS.ERROR }}>{error}</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-16 px-6" style={{ background: COLORS.SURFACE, borderRadius: BORDER_RADIUS.LARGE, border: `1px solid ${COLORS.BORDER}` }}>
                <p className="font-medium" style={{ color: COLORS.TEXT_SECONDARY }}>
                  No services match "{searchTerm || activeCategory}".
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {services.map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    qty={getQty(service._id)}
                    onQtyChange={(v) => setQty(service._id, v)}
                    onAdd={() => addToCart(service)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart sidebar */}
          <aside
            className="lg:sticky lg:top-6 p-5"
            style={{ background: COLORS.SURFACE, borderRadius: BORDER_RADIUS.LARGE, boxShadow: SHADOWS.CARD, border: `1px solid ${COLORS.BORDER}` }}
          >
            <div className="flex items-center gap-2.5 mb-1">
              <div
                className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                style={{ background: `${COLORS.ACCENT}33`, borderRadius: BORDER_RADIUS.SMALL }}
              >
                <Receipt size={16} style={{ color: COLORS.PRIMARY }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}>
                Your Selections
              </h3>
            </div>
            <p className="text-xs mb-4" style={{ color: COLORS.TEXT_SECONDARY }}>
              {itemCount} item{itemCount !== 1 ? "s" : ""} selected
            </p>

            {placedOrder ? (
              <div className="text-center py-8">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `${COLORS.SUCCESS}1F` }}
                >
                  <Receipt size={20} style={{ color: COLORS.SUCCESS }} />
                </div>
                <p className="font-semibold mb-1" style={{ color: COLORS.TEXT_PRIMARY }}>Order placed!</p>
                <p className="text-xs mb-4" style={{ color: COLORS.TEXT_SECONDARY }}>
                  Total {currency(placedOrder.total)} · Staff have been notified.
                </p>
                <button
                  onClick={() => setPlacedOrder(null)}
                  className="text-sm font-medium px-4 py-2"
                  style={{ background: COLORS.PRIMARY, color: COLORS.CREAM, borderRadius: BORDER_RADIUS.MEDIUM }}
                >
                  Order more
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
                  Nothing selected yet. Add a service to get started.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-[280px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.serviceId} className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover flex-shrink-0"
                        style={{ borderRadius: BORDER_RADIUS.SMALL }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-tight" style={{ color: COLORS.TEXT_PRIMARY }}>
                            {item.name}
                          </p>
                          <button onClick={() => removeFromCart(item.serviceId)} aria-label={`Remove ${item.name}`}>
                            <X size={14} style={{ color: COLORS.MUTED }} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQty(item.serviceId, -1)}
                              className="w-5 h-5 flex items-center justify-center"
                              style={{ background: COLORS.BACKGROUND, borderRadius: BORDER_RADIUS.SMALL, color: COLORS.TEXT_SECONDARY }}
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-xs w-4 text-center" style={{ color: COLORS.TEXT_PRIMARY }}>{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.serviceId, 1)}
                              className="w-5 h-5 flex items-center justify-center"
                              style={{ background: COLORS.BACKGROUND, borderRadius: BORDER_RADIUS.SMALL, color: COLORS.TEXT_SECONDARY }}
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
                            {currency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-[11px] uppercase font-medium mb-1.5" style={{ color: COLORS.TEXT_SECONDARY, letterSpacing: "0.08em" }}>
                    Special Instructions
                  </p>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Any dietary requirements or specific notes for the staff..."
                    rows={2}
                    className="w-full text-sm p-2.5 outline-none resize-none"
                    style={{ border: `1px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.SMALL, fontFamily: FONTS.BODY, color: COLORS.TEXT_PRIMARY }}
                  />
                </div>

                <div className="pt-3 space-y-1.5 text-sm" style={{ borderTop: `1px solid ${COLORS.BORDER}` }}>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.TEXT_SECONDARY }}>Subtotal</span>
                    <span style={{ color: COLORS.TEXT_PRIMARY }}>{currency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.TEXT_SECONDARY }}>Service Charge (10%)</span>
                    <span style={{ color: COLORS.TEXT_PRIMARY }}>{currency(serviceCharge)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.TEXT_SECONDARY }}>Taxes (8%)</span>
                    <span style={{ color: COLORS.TEXT_PRIMARY }}>{currency(taxes)}</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-1 text-base font-semibold" style={{ borderTop: `1px solid ${COLORS.BORDER}`, color: COLORS.TEXT_PRIMARY }}>
                    <span>Grand Total</span>
                    <span>{currency(total)}</span>
                  </div>
                </div>

                {placeError && (
                  <p className="text-xs mt-3" style={{ color: COLORS.ERROR }}>{placeError}</p>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setCart([])}
                    className="flex-1 text-sm font-medium py-2.5"
                    style={{ border: `1px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.MEDIUM, color: COLORS.TEXT_SECONDARY }}
                  >
                    Clear
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="flex-[2] text-sm font-medium py-2.5"
                    style={{
                      background: COLORS.PRIMARY, color: COLORS.CREAM,
                      borderRadius: BORDER_RADIUS.MEDIUM,
                      opacity: placing ? 0.7 : 1,
                    }}
                  >
                    {placing ? "Placing..." : "Place Order"}
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>

      {/* ── CURATED FOR YOU ── */}
      {curated.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-14">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl" style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}>
                  Curated for You
                </h2>
                <p className="text-sm mt-1" style={{ color: COLORS.TEXT_SECONDARY }}>
                  Exclusive recommendations to elevate your stay.
                </p>
              </div>
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => scrollCurated(-1)}
                  aria-label="Scroll left"
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ border: `1px solid ${COLORS.BORDER}`, color: COLORS.TEXT_SECONDARY }}
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={() => scrollCurated(1)}
                  aria-label="Scroll right"
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ border: `1px solid ${COLORS.BORDER}`, color: COLORS.TEXT_SECONDARY }}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            <div ref={curatedScrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: "thin" }}>
              {curated.map((service) => (
                <div key={service._id} className="flex-shrink-0 w-[280px]">
                  <ServiceCard
                    service={service}
                    qty={getQty(service._id)}
                    onQtyChange={(v) => setQty(service._id, v)}
                    onAdd={() => addToCart(service)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-2xl sm:text-3xl" style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}>
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-px mx-auto mt-3" style={{ background: COLORS.ACCENT }} />
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={faq.q}
                style={{ background: COLORS.SURFACE, border: `1px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.MEDIUM }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    style={{ color: COLORS.ACCENT, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm" style={{ color: COLORS.TEXT_SECONDARY, lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ── Service card — reused by both the main grid and the curated carousel ──
function ServiceCard({ service, qty, onQtyChange, onAdd }) {
  const isAvailable = service.status === "available";

  return (
    <div
      className="overflow-hidden h-full flex flex-col"
      style={{ background: COLORS.SURFACE, border: `1px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.LARGE }}
    >
      <div className="relative h-40">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
        <span
          className="absolute top-2.5 left-2.5 text-xs font-semibold px-2.5 py-1"
          style={{ background: COLORS.SURFACE, color: COLORS.TEXT_PRIMARY, borderRadius: BORDER_RADIUS.PILL }}
        >
          ${service.price.toFixed(2)}
        </span>
        <span
          className="absolute top-2.5 right-2.5 text-[10px] font-semibold px-2.5 py-1 text-white"
          style={{
            background: isAvailable ? COLORS.SUCCESS : COLORS.ERROR,
            borderRadius: BORDER_RADIUS.PILL,
          }}
        >
          {isAvailable ? "Available" : "Currently Busy"}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm font-semibold leading-snug" style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}>
            {service.name}
          </h3>
          <span className="flex items-center gap-1 text-xs flex-shrink-0" style={{ color: COLORS.WARNING }}>
            <Star size={12} fill={COLORS.WARNING} strokeWidth={0} />
            {service.rating}
          </span>
        </div>

        <p className="text-xs mb-3 flex-1" style={{ color: COLORS.TEXT_SECONDARY, lineHeight: 1.6 }}>
          {service.description}
        </p>

        <p className="flex items-center gap-1.5 text-[11px] mb-3.5" style={{ color: COLORS.TEXT_SECONDARY }}>
          <Clock size={12} />
          {service.eta}
          <span className="mx-0.5">·</span>
          <span className="uppercase tracking-wide" style={{ color: COLORS.MUTED }}>{service.category}</span>
        </p>

        {isAvailable ? (
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onQtyChange(qty - 1)}
                className="w-6 h-6 flex items-center justify-center"
                style={{ background: COLORS.BACKGROUND, borderRadius: BORDER_RADIUS.SMALL, color: COLORS.TEXT_SECONDARY }}
              >
                <Minus size={12} />
              </button>
              <span className="text-sm w-4 text-center" style={{ color: COLORS.TEXT_PRIMARY }}>{qty}</span>
              <button
                onClick={() => onQtyChange(qty + 1)}
                className="w-6 h-6 flex items-center justify-center"
                style={{ background: COLORS.BACKGROUND, borderRadius: BORDER_RADIUS.SMALL, color: COLORS.TEXT_SECONDARY }}
              >
                <Plus size={12} />
              </button>
            </div>
            <button
              onClick={onAdd}
              className="text-xs font-semibold px-4 py-2"
              style={{ background: COLORS.PRIMARY, color: COLORS.CREAM, borderRadius: BORDER_RADIUS.PILL }}
            >
              Add
            </button>
          </div>
        ) : (
          <button
            disabled
            className="mt-auto flex items-center justify-center gap-1.5 text-xs font-medium py-2.5"
            style={{ background: COLORS.BACKGROUND, color: COLORS.TEXT_SECONDARY, borderRadius: BORDER_RADIUS.PILL, cursor: "not-allowed" }}
          >
            <Info size={13} />
            Unavailable Right Now
          </button>
        )}
      </div>
    </div>
  );
}
