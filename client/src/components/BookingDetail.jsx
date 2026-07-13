import React from "react";
import { COLORS } from "../constants/theme";
import {
  CalendarDays,
  Bed,
  User,
  Hash,
  Moon,
} from "lucide-react";

const BookingDetails = ({ booking }) => {
  return (
    <div
      className="
        w-full
        rounded-3xl
        mt-6
        p-5
        sm:p-6
        lg:p-8
        border
        transition-all
        duration-300
      "
      style={{
        backgroundColor: COLORS.SURFACE,
        borderColor: COLORS.BORDER,
        boxShadow: COLORS.CARD,
      }}
    >
      {/* Heading */}
      <h2
        className="text-lg sm:text-xl lg:text-2xl font-bold mb-6"
        style={{ color: COLORS.PRIMARY }}
      >
        Booking Details
      </h2>

      {/* Top Section */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b"
        style={{ borderColor: COLORS.BORDER }}
      >
        {/* Booking ID */}
        <div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            <Hash size={17} />
            <span>Booking ID</span>
          </div>

          <p
            className="font-semibold mt-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {booking?.bookingId || "RPBKG-2025-001548"}
          </p>
        </div>

        {/* Guest */}
        <div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            <User size={17} />
            <span>Guest Name</span>
          </div>

          <p
            className="font-semibold mt-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {booking?.guestName ||
              booking?.user?.username ||
              "Muhammad Ahmed"}
          </p>
        </div>

        {/* Room Number */}
        <div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            <Bed size={17} />
            <span>Room Number</span>
          </div>

          <p
            className="font-semibold mt-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {booking?.roomNumber || "305"}
          </p>
        </div>

        {/* Room Type */}
        <div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            <Bed size={17} />
            <span>Room Type</span>
          </div>

          <p
            className="font-semibold mt-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {booking?.roomType ||
              booking?.room?.roomType ||
              "Deluxe King Room"}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {/* Check In */}
        <div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            <CalendarDays size={17} />
            <span>Check-in Date</span>
          </div>

          <p
            className="font-semibold mt-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {booking?.checkInDate || "12 May 2025"}
          </p>

          <p
            className="text-sm mt-1"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            {booking?.checkInTime || "02:00 PM"}
          </p>
        </div>

        {/* Check Out */}
        <div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            <CalendarDays size={17} />
            <span>Check-out Date</span>
          </div>

          <p
            className="font-semibold mt-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {booking?.checkOutDate || "16 May 2025"}
          </p>

          <p
            className="text-sm mt-1"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            {booking?.checkOutTime || "11:00 AM"}
          </p>
        </div>

        {/* Nights */}
        <div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            <Moon size={17} />
            <span>Number of Nights</span>
          </div>

          <p
            className="font-semibold mt-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {booking?.totalNights || "4 Nights"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;