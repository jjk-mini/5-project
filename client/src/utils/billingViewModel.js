const HOTEL_NAME = "LuxuryStay";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatMoney = (amount) => {
  const n = Number(amount);
  if (Number.isNaN(n)) return "0";
  return n.toLocaleString("en-PK");
};

const formatPaymentMethod = (method) => {
  if (!method) return "—";
  const map = {
    card: "Credit / Debit Card",
    cash: "Cash",
    "bank-transfer": "Bank Transfer",
  };
  return map[method] || method;
};

const formatPaymentStatus = (status) => {
  if (!status) return "Unpaid";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

/**
 * Maps a single populated /api/billing record to the shape the Billing
 * Management dashboard's components expect (BookingTable, BillingSummary,
 * SelectedBookingDetails, CostBreakdown, SpecialRequestCard, InvoiceDocument).
 * This is the ONLY place dashboard data comes from — no dummy/static data.
 */
export function mapBillingToDashboardBooking(billing) {
  const booking = billing.booking || {};
  const room = booking.room || {};
  const guest = booking.guest || billing.guest || {};

  return {
    // Real booking id — used for row selection, search, and "Booking {id}"
    // labels. The invoice's own number is kept separate (see below) so it
    // never gets confused with the booking identifier.
    id: booking._id,
    // Friendly display ID, e.g. "BK-1042". Falls back to the raw _id for
    // any booking created before this field existed.
    displayId: booking.bookingNumber || booking._id,
    billingId: billing._id,
    invoiceNumber: billing.invoiceNumber,

    guestName: guest.name || "Guest",
    guestEmail: guest.email || "",
    guestPhone: guest.phone || "",

    roomNumber: room.roomNumber || "—",
    roomType: room.type || "—",
    ratePerNight: room.price || 0,

    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    guestsCount: booking.guestsCount,
    bookingStatus: booking.status,

    paymentStatus: billing.paymentStatus === "paid" ? "Paid" : "Pending",
    paymentStatusRaw: billing.paymentStatus || "unpaid",
    paymentMethod: formatPaymentMethod(billing.paymentMethod),
    transactionId: billing.transactionId || "",
    paidAt: billing.paidAt,

    // Plain text only — no title/status/date fields, matching how it was
    // actually submitted at booking time.
    specialRequest: booking.specialRequests || "",

    charges: Array.isArray(billing.charges) ? billing.charges : [],
    subtotal: billing.subtotal || 0,
    taxAmount: billing.taxAmount || 0,
    taxRate: billing.taxRate,
    discount: billing.discountAmount || 0,
    grandTotal: billing.totalAmount || 0,

    createdAt: billing.createdAt,
  };
}

/**
 * Maps API billing (populated booking + guest) to the shape used by billing UI components.
 */
export function mapBillingToView(billing) {
  if (!billing) return null;

  const booking = billing.booking || {};
  const room = booking.room || {};
  const guest = booking.guest || billing.guest || {};

  const charges = Array.isArray(billing.charges) ? billing.charges : [];

  return {
    hotelName: HOTEL_NAME,
    image: room.image,
    room,

    bookingId: booking.bookingNumber || booking._id,
    guestName: guest.name,
    guestEmail: guest.email,
    guestPhone: guest.phone,

    roomNumber: room.roomNumber,
    roomType: room.type,
    roomName: room.type,

    checkInDate: formatDate(booking.checkIn),
    checkOutDate: formatDate(booking.checkOut),
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    totalNights: booking.nights
      ? `${booking.nights} Night${booking.nights !== 1 ? "s" : ""}`
      : "—",
    guestsCount: booking.guestsCount,
    pricePerNight: room.price != null ? formatMoney(room.price) : "—",
    bookingStatus: booking.status,

    specialRequests: booking.specialRequests || "",

    invoiceNumber: billing.invoiceNumber,
    billingDate: formatDateTime(billing.paidAt || billing.updatedAt || billing.createdAt),

    paymentStatus: formatPaymentStatus(billing.paymentStatus),
    paymentStatusRaw: billing.paymentStatus || "unpaid",
    paymentMethod: formatPaymentMethod(billing.paymentMethod),
    transactionId: billing.transactionId,
    paidAt: billing.paidAt,

    charges,
    chargeLines: charges.map((c) => ({
      label: c.label,
      amount: formatMoney(c.amount),
      rawAmount: c.amount,
    })),

    subtotal: formatMoney(billing.subtotal),
    subtotalRaw: billing.subtotal,
    tax: formatMoney(billing.taxAmount),
    taxAmountRaw: billing.taxAmount,
    taxRate: billing.taxRate,
    discount: formatMoney(billing.discountAmount),
    discountRaw: billing.discountAmount,
    grandTotal: formatMoney(billing.totalAmount),
    totalAmountRaw: billing.totalAmount,

    billingId: billing._id,
    bookingPaymentStatus: booking.paymentStatus,
  };
}