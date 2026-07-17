// ServiceCard.jsx — hotel service tile (Breakfast, Room Service, Laundry, Spa...).
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../../constants/theme";

function ServiceCard({ icon: Icon, name, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left w-full p-5 transition-all duration-200 hover:-translate-y-1"
      style={{
        background: COLORS.SURFACE,
        border: `1px solid ${COLORS.BORDER}`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
      }}
    >
      <div
        className="flex items-center justify-center w-11 h-11 mb-4 transition-transform duration-200 group-hover:scale-110"
        style={{ borderRadius: BORDER_RADIUS.MEDIUM, background: "rgba(200,169,106,0.15)" }}
      >
        <Icon size={20} color={COLORS.ACCENT} />
      </div>
      <p className="text-sm font-bold" style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}>
        {name}
      </p>
      <p className="text-xs mt-1" style={{ color: COLORS.TEXT_SECONDARY }}>
        {subtitle}
      </p>
    </button>
  );
}

export default ServiceCard;
