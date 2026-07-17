// ActivityItem.jsx — single row in the Recent Activity list.
import { COLORS, FONTS, BORDER_RADIUS } from "../../constants/theme";

function ActivityItem({ icon: Icon, title, time }) {
  return (
    <div
      className="flex items-center gap-4 p-3.5"
      style={{ background: COLORS.CREAM, borderRadius: BORDER_RADIUS.MEDIUM }}
    >
      <div
        className="flex items-center justify-center w-10 h-10 shrink-0"
        style={{ borderRadius: BORDER_RADIUS.SMALL, background: "rgba(200,169,106,0.15)" }}
      >
        <Icon size={18} color={COLORS.ACCENT} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: COLORS.TEXT_PRIMARY }}>
          {title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: COLORS.TEXT_SECONDARY }}>
          {time}
        </p>
      </div>
    </div>
  );
}

export default ActivityItem;
