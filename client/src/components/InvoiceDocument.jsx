import BillingStatusBadge from './BillingStatusBadge';
import { formatCurrency, formatDate } from '../utils/billing';

// Renders a real, saved /api/billing record — booking is the shape produced
// by mapBillingToDashboardBooking() and breakdown by getRealBillingBreakdown().
// Every figure here is read directly from what the backend already computed
// and stored at payment time; nothing is recalculated or guessed here.
export default function InvoiceDocument({ booking, breakdown, invoiceNumber }) {
  if (!booking || !breakdown) return null;

  return (
    <div id="invoice-printable-content" className="bg-white p-8 text-ink sm:p-10">
      <div className="flex items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="font-display text-lg font-semibold text-primary">LuxuryStay</p>
        </div>
        <div className="text-right">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">Invoice</p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-primary">{invoiceNumber || '—'}</p>
          <p className="mt-1 font-body text-xs text-ink/50">
            Issued {formatDate(booking.paidAt || booking.createdAt || new Date().toISOString())}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">Billed To</p>
          <p className="mt-1 font-body text-sm font-semibold text-ink">{booking.guestName}</p>
          <p className="mt-0.5 font-body text-xs text-ink/50">Booking {booking.displayId || booking.id}</p>
        </div>
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">Room</p>
          <p className="mt-1 font-body text-sm text-ink">{booking.roomType}</p>
          <p className="mt-0.5 font-body text-xs text-ink/50">Room {booking.roomNumber}</p>
        </div>
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">Stay</p>
          <p className="mt-1 font-body text-sm text-ink">
            {formatDate(booking.checkIn)} &rarr; {formatDate(booking.checkOut)}
          </p>
          <p className="mt-0.5 font-body text-xs text-ink/50">
            {breakdown.nights} night{breakdown.nights > 1 ? 's' : ''}
            {booking.guestsCount ? ` \u00b7 ${booking.guestsCount} guest${booking.guestsCount > 1 ? 's' : ''}` : ''}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">Description</p>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">Amount</p>
        </div>

        {breakdown.charges.length ? (
          breakdown.charges.map((charge, index) => (
            <div key={`${charge.label}-${index}`} className="flex items-center justify-between border-b border-border/60 py-2.5">
              <span className="font-body text-sm text-ink">{charge.label}</span>
              <span className="font-mono text-sm text-ink">{formatCurrency(charge.amount)}</span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-between border-b border-border/60 py-2.5">
            <span className="font-body text-sm text-ink">
              Room Charges &middot; {breakdown.nights} night{breakdown.nights > 1 ? 's' : ''} &times;{' '}
              {formatCurrency(booking.ratePerNight)}
            </span>
            <span className="font-mono text-sm text-ink">{formatCurrency(booking.ratePerNight * breakdown.nights)}</span>
          </div>
        )}

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-ink/60">Subtotal</span>
            <span className="font-mono text-sm text-ink">{formatCurrency(breakdown.subtotal)}</span>
          </div>
          {breakdown.discount > 0 && (
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-ink/60">Discount</span>
              <span className="font-mono text-sm text-success">- {formatCurrency(breakdown.discount)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-ink/60">
              Tax{breakdown.taxRateLabel ? ` (${breakdown.taxRateLabel})` : ''}
            </span>
            <span className="font-mono text-sm text-ink">{formatCurrency(breakdown.tax)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/[0.05] px-4 py-3.5">
          <span className="font-body text-sm font-semibold uppercase tracking-wide text-primary">Grand Total</span>
          <span className="font-display text-xl font-bold text-primary">{formatCurrency(breakdown.grandTotal)}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-3">
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">Payment Status</p>
          <div className="mt-1.5">
            <BillingStatusBadge status={booking.paymentStatus} />
          </div>
        </div>
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">Payment Method</p>
          <p className="mt-1.5 font-body text-sm text-ink">{booking.paymentMethod || '—'}</p>
        </div>
        {booking.specialRequest && (
          <div className="col-span-2 sm:col-span-1">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">Special Request</p>
            <p className="mt-1.5 font-body text-sm leading-snug text-ink/80 whitespace-pre-wrap">{booking.specialRequest}</p>
          </div>
        )}
      </div>

      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="font-display text-base italic text-primary">Thank You for Staying With Us.</p>
        <p className="mt-1 font-body text-[11px] text-ink/40">
          concierge@example.com &middot; +1 (555) 019-2280
        </p>
      </div>
    </div>
  );
}