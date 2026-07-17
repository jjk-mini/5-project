// TabButton.jsx — single tab in the profile tab bar.
import { COLORS, FONTS, BORDER_RADIUS } from "../../constants/theme";

function TabButton({ label, icon: Icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold shrink-0 whitespace-nowrap transition-all duration-200"
      style={{
        fontFamily: FONTS.BODY,
        borderRadius: BORDER_RADIUS.MEDIUM,
        color: active ? COLORS.CREAM : COLORS.TEXT_SECONDARY,
        background: active ? COLORS.PRIMARY : "transparent",
      }}
    >
      {Icon && <Icon size={15} />}
      {label}
    </button>
  );
}

export default TabButton;
