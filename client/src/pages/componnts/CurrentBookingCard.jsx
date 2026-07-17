// CurrentBookingCard.jsx — full-width current booking card with details,
// a "Confirmed" status badge and a stay-progress bar.
import { CheckCircle2 } from "lucide-react";
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../../constants/theme";

function CurrentBookingCard({ room, guests, checkIn, checkOut, dayOfStay, totalDays }) {
  const progressPct = Math.min(100, Math.round((dayOfStay / totalDays) * 100));
  const daysLeft = Math.max(0, totalDays - dayOfStay);

  const details = [
    { label: "Room", value: room },
    { label: "Guests", value: guests },
    { label: "Check in", value: checkIn },
    { label: "Check out", value: checkOut },
  ];

  return (
    <div
      className="p-5 sm:p-6"
      style={{
        background: COLORS.SURFACE,
        border: `1px solid ${COLORS.BORDER}`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2
          className="text-lg font-bold"
          style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
        >
          Current Booking
        </h2>
        <span
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5"
          style={{
            borderRadius: BORDER_RADIUS.PILL,
            background: "rgba(47,107,79,0.12)",
            color: COLORS.SUCCESS,
          }}
        >
          <CheckCircle2 size={14} /> Confirmed
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {details.map((item) => (
          <div key={item.label}>
            <p className="text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
              {item.label}
            </p>
            <p
              className="text-sm font-bold mt-1"
              style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
            Stay Progress
          </p>
          <p className="text-xs font-semibold" style={{ color: COLORS.ACCENT }}>
            {daysLeft} {daysLeft === 1 ? "day" : "days"} remaining
          </p>
        </div>
        <div
          className="h-2 w-full overflow-hidden"
          style={{ borderRadius: BORDER_RADIUS.PILL, background: COLORS.BORDER }}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progressPct}%`,
              borderRadius: BORDER_RADIUS.PILL,
              background: `linear-gradient(90deg, ${COLORS.ACCENT}, #E4C98A)`,
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: COLORS.TEXT_SECONDARY }}>
          Day {dayOfStay} of {totalDays}
        </p>
      </div>
    </div>
  );
}

export default CurrentBookingCard;
