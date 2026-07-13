import { COLORS, FONTS } from "../constants/theme";

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1
        className="text-3xl font-bold"
        style={{
          color: COLORS.PRIMARY,
          fontFamily: FONTS.HEADING,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className="mt-2"
          style={{
            color: COLORS.TEXT_SECONDARY,
            fontFamily: FONTS.BODY,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default DashboardHeader;