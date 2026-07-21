import BillingStatusBadge from './BillingStatusBadge';
import { formatCurrency, formatDate } from '../utils/billing';

function Row({ label, value, muted = false, strong = false }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="font-body text-[13px] text-white/60">{label}</span>
      <span
        className={`font-mono text-[13px] ${strong ? 'font-semibold text-white' : 'text-white/90'} ${
          muted ? 'text-white/50' : ''
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function BillingSummary({ booking, breakdown }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 shadow-lift animate-fadeIn">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 rounded-full border border-gold/20"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-light">
            Billing Summary
          </p>
          <p className="mt-1 font-mono text-sm text-white/80">{booking.displayId || booking.id}</p>
          <h3 className="mt-0.5 font-display text-xl font-semibold text-white">{booking.guestName}</h3>
        </div>
        <BillingStatusBadge status={booking.paymentStatus} inverted />
      </div>

      <div className="relative my-4 border-t border-white/15" />

      <div className="relative grid grid-cols-2 gap-x-4 gap-y-1 border-b border-white/15 pb-3 font-body text-[13px]">
        <Row label="Room Number" value={booking.roomNumber} />
        <Row label="Stay Duration" value={`${breakdown.nights} night${breakdown.nights > 1 ? 's' : ''}`} />
        <Row label="Check-In" value={formatDate(booking.checkIn)} />
        <Row label="Check-Out" value={formatDate(booking.checkOut)} />
      </div>

      <div className="relative mt-3 space-y-0.5">
        <Row label="Subtotal" value={formatCurrency(breakdown.subtotal)} />
        <Row label={`Tax${breakdown.taxRateLabel ? ` (${breakdown.taxRateLabel})` : ''}`} value={formatCurrency(breakdown.tax)} />
        {breakdown.discount > 0 && <Row label="Discount" value={`- ${formatCurrency(breakdown.discount)}`} muted />}
      </div>

      <div className="relative mt-4 flex items-center justify-between border-t border-white/20 pt-4">
        <span className="font-body text-sm font-semibold uppercase tracking-wide text-white/80">Grand Total</span>
        <span className="font-display text-2xl font-bold text-white">{formatCurrency(breakdown.grandTotal)}</span>
      </div>
    </div>
  );
}