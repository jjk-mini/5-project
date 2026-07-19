import React from "react";
import { COLORS } from "../constants/theme";

const BillingBanner = ({ booking }) => {
  return (
    <div className="w-full px-1 sm:px-2 lg:px-3 pt-4 sm:pt-6">
      <div
        className="
          relative
          w-full
          h-[220px]
         sm:h-[260px]
         md:h-[320px]
          lg:h-[360px]
          rounded-3xl
          overflow-hidden
          shadow-2xl
        "
      >
        {/* Background Image */}
        <img
          src={booking?.room?.images?.[0] || booking?.image}
          alt={booking?.room?.name || "Hotel Room"}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: COLORS.DARK,
            opacity: 0.5,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-10">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: COLORS.SURFACE }}
          >
            Billing & Invoice
          </h1>

          <p
            className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg"
            style={{ color: COLORS.CREAM }}
          >
            Thank you for choosing{" "}
            <span
              className="font-semibold"
              style={{ color: COLORS.ACCENT }}
            >
              {booking?.hotelName || "Royal Palace Hotel & Resort"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillingBanner;