import React from "react";
import { ReceiptText } from "lucide-react";
import { COLORS } from "../constants/theme";

const BillingDetails = ({ booking }) => {
  const lines =
    booking?.chargeLines?.length > 0
      ? booking.chargeLines
      : null;

  const taxLabel =
    booking?.taxRate != null
      ? `Tax (${Math.round(Number(booking.taxRate) * 100)}%)`
      : "Tax";

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
      <div className="flex items-center gap-2 mb-5">
        <ReceiptText size={22} style={{ color: COLORS.PRIMARY }} />
        <h2
          className="text-xl sm:text-2xl font-bold"
          style={{ color: COLORS.PRIMARY }}
        >
          Billing Details
        </h2>
      </div>

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

      <div className="space-y-2 py-4">
        {lines ? (
          lines.map((line, index) => (
            <div
              key={`${line.label}-${index}`}
              className={`grid grid-cols-[2fr_1fr] items-center py-2 ${
                index < lines.length - 1 ? "border-b" : ""
              }`}
              style={{ borderColor: COLORS.BORDER }}
            >
              <p style={{ color: COLORS.TEXT_SECONDARY }}>{line.label}</p>
              <p
                className="text-right font-semibold"
                style={{ color: COLORS.TEXT_PRIMARY }}
              >
                PKR {line.amount}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
            No charge items found.
          </p>
        )}
      </div>

      <div
        className="mt-4 rounded-2xl border p-4"
        style={{
          backgroundColor: COLORS.BACKGROUND,
          borderColor: COLORS.BORDER,
        }}
      >
        <div className="flex justify-between py-2">
          <span style={{ color: COLORS.TEXT_SECONDARY }}>Subtotal</span>
          <span className="font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
            PKR {booking?.subtotal ?? "—"}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span style={{ color: COLORS.TEXT_SECONDARY }}>{taxLabel}</span>
          <span className="font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
            PKR {booking?.tax ?? "—"}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span style={{ color: COLORS.TEXT_SECONDARY }}>Discount</span>
          <span className="font-semibold" style={{ color: COLORS.SUCCESS }}>
            - PKR {booking?.discount ?? "0"}
          </span>
        </div>

        <hr className="my-3" style={{ borderColor: COLORS.BORDER }} />

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
            PKR {booking?.grandTotal ?? "—"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;