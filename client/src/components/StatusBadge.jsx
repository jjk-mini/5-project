import { ROOM_STATUS, ROOM_STATUS_LABELS } from "../constants/roomStatus";
import { FONTS, COLORS } from "../constants/theme";

const STATUS_STYLES = {
  [ROOM_STATUS.AVAILABLE]: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: COLORS.SUCCESS,
  },
  [ROOM_STATUS.OCCUPIED]: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: COLORS.INFO,
  },
  [ROOM_STATUS.CLEANING]: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: COLORS.WARNING,
  },
  [ROOM_STATUS.MAINTENANCE]: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: COLORS.ERROR,
  },
};

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || {
    bg: "bg-gray-100",
    border: "border-gray-200",
    text: COLORS.TEXT_SECONDARY,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap rounded-full border ${style.bg} ${style.border}`}
      style={{
        color: style.text,
        fontFamily: FONTS.BODY,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: style.text }}
      />
      {ROOM_STATUS_LABELS[status] || status}
    </span>
  );
};

export default StatusBadge;