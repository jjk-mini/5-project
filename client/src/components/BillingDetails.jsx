import React from "react";
import { ReceiptText } from "lucide-react";
import { COLORS } from "../constants/theme";

const BillingDetails = ({ booking }) => {
  return (
    <div
      className="
        w-full
        rounded-3xl
        p-5
        sm:p-6
        border
        shadow-[0_8px_30px_rgba(0,0,0,0.12),0_-4px_20px_rgba(0,0,0,0.06)]
      "
      style={{
        backgroundColor: COLORS.SURFACE,
        borderColor: COLORS.BORDER,
      }}
    >
      {/* Heading */}
      <div className="flex items-center gap-2 mb-5">
        <ReceiptText
          size={22}
          style={{ color: COLORS.PRIMARY }}
        />
        <h2
          className="text-xl sm:text-2xl font-bold"
          style={{ color: COLORS.PRIMARY }}
        >
          Billing Details
        </h2>
      </div>

      {/* Billing Items Heading */}
      <div
        className="border-y py-3"
        style={{ borderColor: COLORS.BORDER }}
      >
        <div
          className="grid grid-cols-[2fr_1fr] items-center font-bold text-base"
          style={{ color: COLORS.TEXT_PRIMARY }}
        >
          <p>Description</p>
          <p className="text-right">Amount (PKR)</p>
        </div>
      </div>

      {/* Billing Items */}
      <div className="space-y-2 py-4">
        <div
          className="grid grid-cols-[2fr_1fr] items-center py-2 border-b"
          style={{ borderColor: COLORS.BORDER }}
        >
          <p style={{ color: COLORS.TEXT_SECONDARY }}>
            Room Charges ({booking?.roomType || "Deluxe King Room"})
          </p>
          <p
            className="text-right font-semibold"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            PKR {booking?.roomCharges || "40,000"}
          </p>
        </div>

        <div
          className="grid grid-cols-[2fr_1fr] items-center py-2 border-b"
          style={{ borderColor: COLORS.BORDER }}
        >
          <p style={{ color: COLORS.TEXT_SECONDARY }}>
            Room Service
          </p>
          <p
            className="text-right font-semibold"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            PKR {booking?.roomService || "3,600"}
          </p>
        </div>

        <div
          className="grid grid-cols-[2fr_1fr] items-center py-2 border-b"
          style={{ borderColor: COLORS.BORDER }}
        >
          <p style={{ color: COLORS.TEXT_SECONDARY }}>
            Laundry Service
          </p>
          <p
            className="text-right font-semibold"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            PKR {booking?.laundry || "1,800"}
          </p>
        </div>

        <div
          className="grid grid-cols-[2fr_1fr] items-center py-2 border-b"
          style={{ borderColor: COLORS.BORDER }}
        >
          <p style={{ color: COLORS.TEXT_SECONDARY }}>
            Food & Beverages
          </p>
          <p
            className="text-right font-semibold"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            PKR {booking?.food || "4,200"}
          </p>
        </div>

        <div className="grid grid-cols-[2fr_1fr] items-center py-2">
          <p style={{ color: COLORS.TEXT_SECONDARY }}>
            Airport Pickup
          </p>
          <p
            className="text-right font-semibold"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            PKR {booking?.airportPickup || "2,500"}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div
        className="mt-4 rounded-2xl border p-4"
        style={{
          backgroundColor: COLORS.BACKGROUND,
          borderColor: COLORS.BORDER,
        }}
      >
        <div className="flex justify-between py-2">
          <span style={{ color: COLORS.TEXT_SECONDARY }}>
            Subtotal
          </span>
          <span
            className="font-semibold"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            PKR {booking?.subtotal || "52,100"}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span style={{ color: COLORS.TEXT_SECONDARY }}>
            Tax (10%)
          </span>
          <span
            className="font-semibold"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            PKR {booking?.tax || "5,210"}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span style={{ color: COLORS.TEXT_SECONDARY }}>
            Discount
          </span>
          <span
            className="font-semibold"
            style={{ color: COLORS.SUCCESS }}
          >
            - PKR {booking?.discount || "2,000"}
          </span>
        </div>

        <hr
          className="my-3"
          style={{ borderColor: COLORS.BORDER }}
        />

        <div className="flex justify-between items-center">
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{ color: COLORS.PRIMARY }}
          >
            Grand Total
          </h2>

          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: COLORS.PRIMARY }}
          >
            PKR {booking?.grandTotal || "55,310"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;