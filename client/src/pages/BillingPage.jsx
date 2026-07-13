import BillingBanner from "../components/BillingBanner";
import BookingDetails from "../components/BookingDetail";
import BillingDetails from "../components/BillingDetails";
import InvoicePaymentInfo from "../components/InvoicePaymentInfo";
import PaymentForm from "../components/PaymentForm";
import SpecialRequests from "../components/SpeacialRequest"; // 👈 Import

const Billing = () => {
  const booking = {
    hotelName: "Royal Palace Hotel & Resort",

    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",

    bookingId: "RPBKG-2025-001548",
    guestName: "Muhammad Ahmed",
    roomNumber: "305",
    roomType: "Deluxe King Room",
    checkInDate: "12 May 2025",
    checkOutDate: "16 May 2025",
    checkInTime: "02:00 PM",
    checkOutTime: "11:00 AM",
    totalNights: "4 Nights",

    roomCharges: "40,000",
    roomServiceQty: 6,
    roomService: "3,600",
    laundryQty: 3,
    laundry: "1,800",
    foodQty: 4,
    food: "4,200",
    pickupQty: 1,
    airportPickup: "2,500",

    subtotal: "52,100",
    tax: "5,210",
    discount: "2,000",
    grandTotal: "55,310",

    invoiceNumber: "INV-2025-5510",
    billingDate: "16 May 2025, 10:30 AM",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card (Visa)",
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_620px] gap-6 items-start">

        {/* Left Side */}
        <div className="w-full space-y-6">
          <BillingBanner booking={booking} />
          <BookingDetails booking={booking} />
          <BillingDetails booking={booking} />
          <InvoicePaymentInfo booking={booking} />
        </div>

        {/* Right Side */}
<div className="w-full xl:w-[620px] self-start flex flex-col gap-6 mt-5">
  <PaymentForm />
  <SpecialRequests />
</div>

      </div>
    </div>
  );
};

export default Billing;