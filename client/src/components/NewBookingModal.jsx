import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { COLORS, FONTS } from "../constants/theme";
import bookingApi from "../api/bookingApi";

const ROOM_TYPES = [
  "Standard Twin",
  "Deluxe King",
  "Deluxe Double",
  "Suite",
  "Executive Suite",
  "Presidential Suite",
];

const BOOKING_SOURCES = ["Walk In", "Phone", "Website", "OTA (Booking.com / Expedia)", "Travel Agent"];

const EMPTY_FORM = {
  guestName: "",
  numberOfGuests: 1,
  email: "",
  phone: "",
  roomNumber: "",
  roomType: ROOM_TYPES[1],
  ratePerNight: "",
  bookingSource: BOOKING_SOURCES[0],
  checkIn: "",
  checkOut: "",
  notes: "",
};

// Shared input styling — Tailwind handles layout/spacing/responsiveness,
// inline color values come from the theme so it stays on-brand.
const fieldStyle = {
  fontFamily: FONTS.BODY,
  color: COLORS.TEXT_PRIMARY,
  borderColor: COLORS.BORDER,
  backgroundColor: COLORS.SURFACE,
};

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: COLORS.TEXT_SECONDARY }}
      >
        {label}
        {required && <span style={{ color: COLORS.ERROR }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full min-h-11 rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2";

export default function NewBookingModal({ isOpen, onClose, onBookingCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const firstFieldRef = useRef(null);
  const dialogRef = useRef(null);

  // Lock background scroll + focus first field + close on Escape while open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset the form each time the modal is freshly opened
  useEffect(() => {
    if (isOpen) setForm(EMPTY_FORM);
  }, [isOpen]);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const start = new Date(form.checkIn);
    const end = new Date(form.checkOut);
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [form.checkIn, form.checkOut]);

  const total = nights * (Number(form.ratePerNight) || 0);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.guestName.trim() || !form.roomNumber.trim() || !form.checkIn || !form.checkOut) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (nights <= 0) {
      toast.error("Check-out must be after check-in");
      return;
    }

    setSubmitting(true);
    try {
      await bookingApi.create({
        guestName: form.guestName.trim(),
        numberOfGuests: Number(form.numberOfGuests) || 1,
        email: form.email.trim(),
        phone: form.phone.trim(),
        roomNumber: form.roomNumber.trim(),
        roomType: form.roomType,
        ratePerNight: Number(form.ratePerNight) || 0,
        bookingSource: form.bookingSource,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        nights,
        totalAmount: total,
        notes: form.notes.trim(),
      });
      toast.success("Booking created");
      onBookingCreated?.();
      onClose?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-booking-title"
        className="flex w-full sm:w-[95%] md:w-[90%] lg:w-212.5 max-w-212.5 max-h-[90vh] flex-col overflow-hidden rounded-2xl shadow-2xl"
        style={{ backgroundColor: COLORS.SURFACE, fontFamily: FONTS.BODY }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between gap-4 px-5 py-4 sm:px-8 sm:py-6"
          style={{ backgroundColor: COLORS.PRIMARY }}
        >
          <div>
            <h2
              id="new-booking-title"
              className="text-lg sm:text-xl font-bold text-white"
              style={{ fontFamily: FONTS.HEADING }}
            >
              New Booking
            </h2>
            <p className="mt-1 text-xs sm:text-sm" style={{ color: `${COLORS.CREAM}CC` }}>
              Create a new hotel reservation
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body (scrollable) */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6 space-y-6 sm:space-y-8">

            {/* Guest Information */}
            <section>
              <h3
                className="mb-3 text-xs font-bold uppercase tracking-wider"
                style={{ color: COLORS.PRIMARY }}
              >
                Guest Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <Field label="Guest Name" required>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    value={form.guestName}
                    onChange={handleChange("guestName")}
                    placeholder="Full name"
                    required
                    className={inputClass}
                    style={fieldStyle}
                  />
                </Field>

                <Field label="Number of Guests">
                  <input
                    type="number"
                    min={1}
                    value={form.numberOfGuests}
                    onChange={handleChange("numberOfGuests")}
                    className={inputClass}
                    style={fieldStyle}
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="guest@email.com"
                    className={inputClass}
                    style={fieldStyle}
                  />
                </Field>

                <Field label="Phone">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="+1-555-0000"
                    className={inputClass}
                    style={fieldStyle}
                  />
                </Field>
              </div>
            </section>

            {/* Room Details */}
            <section>
              <h3
                className="mb-3 text-xs font-bold uppercase tracking-wider"
                style={{ color: COLORS.PRIMARY }}
              >
                Room Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <Field label="Room Number" required>
                  <input
                    type="text"
                    value={form.roomNumber}
                    onChange={handleChange("roomNumber")}
                    placeholder="e.g. 101"
                    required
                    className={inputClass}
                    style={fieldStyle}
                  />
                </Field>

                <Field label="Room Type">
                  <select
                    value={form.roomType}
                    onChange={handleChange("roomType")}
                    className={`${inputClass} cursor-pointer`}
                    style={fieldStyle}
                  >
                    {ROOM_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Rate per Night ($)" required>
                  <input
                    type="number"
                    min={0}
                    value={form.ratePerNight}
                    onChange={handleChange("ratePerNight")}
                    placeholder="180"
                    required
                    className={inputClass}
                    style={fieldStyle}
                  />
                </Field>

                <Field label="Booking Source">
                  <select
                    value={form.bookingSource}
                    onChange={handleChange("bookingSource")}
                    className={`${inputClass} cursor-pointer`}
                    style={fieldStyle}
                  >
                    {BOOKING_SOURCES.map((source) => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </section>

            {/* Stay Dates */}
            <section>
              <h3
                className="mb-3 text-xs font-bold uppercase tracking-wider"
                style={{ color: COLORS.PRIMARY }}
              >
                Stay Dates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <Field label="Check-In" required>
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={handleChange("checkIn")}
                    required
                    className={inputClass}
                    style={fieldStyle}
                  />
                </Field>

                <Field label="Check-Out" required>
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={handleChange("checkOut")}
                    required
                    className={inputClass}
                    style={fieldStyle}
                  />
                </Field>

                <Field label="Duration">
                  <div
                    className={`${inputClass} flex items-center font-semibold`}
                    style={{ ...fieldStyle, color: COLORS.PRIMARY, backgroundColor: `${COLORS.ACCENT}1A` }}
                  >
                    {nights > 0
                      ? `${nights} Night${nights !== 1 ? "s" : ""} — Rs. ${total.toLocaleString()}`
                      : "— Night — Rs. 0"}
                  </div>
                </Field>
              </div>
            </section>

            {/* Notes */}
            <section>
              <Field label="Special Requests / Notes">
                <textarea
                  value={form.notes}
                  onChange={handleChange("notes")}
                  placeholder="Any special requests or notes..."
                  rows={3}
                  className="w-full resize-none rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
                  style={fieldStyle}
                />
              </Field>
            </section>

          </div>

          {/* Footer */}
          <div
            className="flex flex-col-reverse gap-3 border-t px-5 py-4 sm:flex-row sm:justify-end sm:px-8 sm:py-5"
            style={{ borderColor: COLORS.BORDER, backgroundColor: COLORS.SURFACE }}
          >
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 w-full rounded-full border px-6 text-sm font-semibold transition-colors sm:w-auto"
              style={{ borderColor: COLORS.BORDER, color: COLORS.TEXT_PRIMARY }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="min-h-11 w-full rounded-full px-6 text-sm font-semibold text-white transition-opacity disabled:opacity-60 sm:w-auto"
              style={{ backgroundColor: COLORS.PRIMARY }}
            >
              {submitting ? "Creating..." : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
