// InfoCard.jsx — small card listing label/value rows (e.g. Stay Information).
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../../constants/theme";

function InfoCard({ title, icon: Icon, rows }) {
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
      <div className="flex items-center gap-2 mb-5">
        {Icon && <Icon size={17} color={COLORS.ACCENT} />}
        <h2
          className="text-base font-bold"
          style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
        >
          {title}
        </h2>
      </div>

      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <span className="text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
              {row.label}
            </span>
            <span
              className="text-sm font-semibold text-right"
              style={{ color: COLORS.TEXT_PRIMARY }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoCard;
