// StatisticCard.jsx — small read-only stat tile (Member ID, Loyalty Tier, etc.)
import { COLORS, FONTS, BORDER_RADIUS } from "../../constants/theme";

function StatisticCard({ icon: Icon, label, value }) {
  return (
    <div
      className="p-4"
      style={{
        background: COLORS.CREAM,
        border: `1px solid ${COLORS.BORDER}`,
        borderRadius: BORDER_RADIUS.MEDIUM,
      }}
    >
      {Icon && (
        <div
          className="flex items-center justify-center w-9 h-9 mb-3"
          style={{ borderRadius: BORDER_RADIUS.SMALL, background: "rgba(200,169,106,0.15)" }}
        >
          <Icon size={16} color={COLORS.ACCENT} />
        </div>
      )}
      <p className="text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
        {label}
      </p>
      <p
        className="text-base font-bold mt-1 truncate"
        style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
      >
        {value}
      </p>
    </div>
  );
}

export default StatisticCard;
