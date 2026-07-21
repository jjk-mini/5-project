// Fallback tax rate used only by the legacy local-only breakdown helper
// below (kept for any code path still constructing a booking client-side).
// The real dashboard/guest billing flows never use this — they read
// booking.taxRate straight from the saved /api/billing record instead
// (see getRealBillingBreakdown).
const TAX_RATE = 0.08;

export function getNights(checkIn, checkOut) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diff = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 1);
}

export function getExtraChargesTotal(extraCharges = []) {
  return extraCharges.reduce((sum, c) => sum + Number(c.amount || 0), 0);
}

export function getBillingBreakdown(booking) {
  if (!booking) return null;
  const nights = getNights(booking.checkIn, booking.checkOut);
  const roomCharges = nights * booking.ratePerNight;
  const extraChargesTotal = getExtraChargesTotal(booking.extraCharges);
  const taxableAmount = roomCharges + extraChargesTotal - (booking.discount || 0);
  const tax = Math.max(taxableAmount, 0) * TAX_RATE;
  const grandTotal = Math.max(taxableAmount, 0) + tax;

  return {
    nights,
    roomCharges,
    extraChargesTotal,
    tax,
    discount: booking.discount || 0,
    grandTotal,
  };
}

// Builds the breakdown used by the Billing Management dashboard from a
// REAL populated /api/billing record (see billingViewModel.mapBillingToDashboardBooking).
// Every number here is taken directly from what the backend already computed
// and stored — nothing is recalculated on the frontend, so it always matches
// what was actually saved when the guest paid.
export function getRealBillingBreakdown(booking) {
  if (!booking) return null;
  return {
    nights: getNights(booking.checkIn, booking.checkOut),
    charges: Array.isArray(booking.charges) ? booking.charges : [],
    subtotal: booking.subtotal || 0,
    tax: booking.taxAmount || 0,
    taxRateLabel:
      booking.taxRate != null ? `${Math.round(Number(booking.taxRate) * 100)}%` : "",
    discount: booking.discount || 0,
    grandTotal: booking.grandTotal || 0,
  };
}

// Formats an amount as PKR, matching the currency used everywhere else in
// the app (guest Billing page, PaymentForm, Invoice PDF). No "$" anywhere.
export function formatCurrency(amount) {
  const n = Number(amount || 0);
  return `PKR ${n.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}