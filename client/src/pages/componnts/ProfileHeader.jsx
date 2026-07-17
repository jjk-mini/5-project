// ProfileHeader.jsx — clean profile card replacing the old gradient hero.
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../../constants/theme";

function ProfileHeader({ name, initials, tier, memberSince, activeBookings }) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6"
      style={{
        background: COLORS.SURFACE,
        border: `1px solid ${COLORS.BORDER}`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
      }}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div
          className="flex items-center justify-center shrink-0 w-14 h-14 rounded-full text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${COLORS.ACCENT}, #E4C98A)`,
            color: COLORS.PRIMARY,
            fontFamily: FONTS.HEADING,
          }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <h1
            className="text-lg sm:text-xl font-bold truncate"
            style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
          >
            {name}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.TEXT_SECONDARY }}>
            {tier} Member since {memberSince}
          </p>
        </div>
      </div>

      <span
        className="text-xs sm:text-sm font-bold px-4 py-2 shrink-0"
        style={{
          borderRadius: BORDER_RADIUS.PILL,
          background: "rgba(43,108,176,0.12)",
          color: COLORS.INFO,
        }}
      >
        {activeBookings} Active Bookings
      </span>
    </div>
  );
}

export default ProfileHeader;
