// ProfileSection.jsx — generic titled card wrapper used across the
// Profile Info tab (Personal Information, Preferences, Security Summary...).
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../../constants/theme";

function ProfileSection({ title, icon: Icon, action, children }) {
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
        <div className="flex items-center gap-2">
          {Icon && <Icon size={18} color={COLORS.ACCENT} />}
          <h2
            className="text-base sm:text-lg font-bold"
            style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
          >
            {title}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export default ProfileSection;
