// Utility — calculate room rate x nights + extras + tax
const DEFAULT_TAX_RATE = 0.1; // 10%

/**
 * Build the itemized charge list + totals for a booking's bill.
 * @param {Object} booking - populated booking (needs nights, totalAmount, room.price)
 * @param {Array}  extraCharges - optional additional charge lines [{ label, quantity, amount }]
 * @param {Number} discountAmount - flat discount to subtract from subtotal
 * @param {Number} taxRate - defaults to 10%
 */
const buildBillingAmounts = ({
  booking,
  extraCharges = [],
  discountAmount = 0,
  taxRate = DEFAULT_TAX_RATE,
}) => {
  const roomCharge = {
    label: `Room Charges (${booking.room?.type || "Room"} x ${booking.nights} night${
      booking.nights !== 1 ? "s" : ""
    })`,
    quantity: booking.nights,
    amount: booking.totalAmount,
  };

  const charges = [roomCharge, ...extraCharges];

  const subtotal = charges.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const safeDiscount = Math.min(Number(discountAmount || 0), subtotal);
  const taxableAmount = subtotal - safeDiscount;
  const taxAmount = Math.round(taxableAmount * taxRate * 100) / 100;
  const totalAmount = Math.round((taxableAmount + taxAmount) * 100) / 100;

  return {
    charges,
    subtotal,
    taxRate,
    taxAmount,
    discountAmount: safeDiscount,
    totalAmount,
  };
};

// Simple sequential-looking invoice number: INV-<year>-<last 6 of bookingId>-<random 3>
const generateInvoiceNumber = (bookingId) => {
  const year = new Date().getFullYear();
  const short = String(bookingId).slice(-6).toUpperCase();
  const rand = Math.floor(100 + Math.random() * 900);
  return `INV-${year}-${short}${rand}`;
};

module.exports = { buildBillingAmounts, generateInvoiceNumber, DEFAULT_TAX_RATE };
