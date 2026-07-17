// BookingCard.jsx — compact "Viewing" / "Upcoming" booking summary card.
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../../constants/theme";

function BookingCard({ status, room, location, meta, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-full p-5 transition-shadow duration-200 hover:shadow-md"
      style={{
        background: COLORS.SURFACE,
        border: `1px solid ${active ? COLORS.ACCENT : COLORS.BORDER}`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: active ? SHADOWS.DROPDOWN : SHADOWS.CARD,
      }}
    >
      <span
        className="inline-block text-xs font-bold px-3 py-1 mb-3"
        style={{
          borderRadius: BORDER_RADIUS.PILL,
          background: active ? "rgba(200,169,106,0.18)" : COLORS.CREAM,
          color: active ? COLORS.ACCENT : COLORS.TEXT_SECONDARY,
          border: `1px solid ${active ? "rgba(200,169,106,0.35)" : COLORS.BORDER}`,
        }}
      >
        {status}
      </span>
      <h3
        className="text-base font-bold"
        style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
      >
        {room} &middot; {location}
      </h3>
      <p className="text-sm mt-1" style={{ color: COLORS.TEXT_SECONDARY }}>
        {meta}
      </p>
    </button>
  );
}

export default BookingCard;
