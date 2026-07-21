import { formatCurrency, formatDate } from '../utils/billing';

function Field({ label, value }) {
  return (
    <div>
      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">{label}</p>
      <p className="mt-1 font-body text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

export default function SelectedBookingDetails({ booking, breakdown }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft animate-fadeIn">
      <h3 className="font-display text-lg font-semibold text-ink">Selected Booking Details</h3>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        <Field label="Booking ID" value={<span className="font-mono">{booking.displayId || booking.id}</span>} />
        <Field label="Guest Name" value={booking.guestName} />
        <Field label="Room Number" value={booking.roomNumber} />
        <Field label="Room Type" value={booking.roomType} />
        <Field label="Check-In" value={formatDate(booking.checkIn)} />
        <Field label="Check-Out" value={formatDate(booking.checkOut)} />
        <Field label="Stay Duration" value={`${breakdown.nights} night${breakdown.nights > 1 ? 's' : ''}`} />
        <Field label="Guests" value={booking.guestsCount ?? '—'} />
        <Field label="Rate / Night" value={formatCurrency(booking.ratePerNight)} />
        <Field label="Subtotal" value={formatCurrency(breakdown.subtotal)} />
      </div>
    </section>
  );
}