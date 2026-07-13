import {
  COLORS,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";

const DashboardCard = ({ children, className = "" }) => {
  return (
    <div
      className={`p-6 ${className}`}
      style={{
        background: COLORS.SURFACE,
        border: `1px solid ${COLORS.BORDER}`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
      }}
    >
      {children}
    </div>
  );
};

export default DashboardCard;