import AsideBar from "./AsideBar";
import Navbar from "./Navbar";
import { COLORS, FONTS } from "../constants/theme";
import { SIDEBAR_WIDTH } from "../constants/layout";

const DashboardLayout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.BACKGROUND,
        fontFamily: FONTS.BODY,
      }}
    >
      <AsideBar />

      <div
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <main
          style={{
            padding: "32px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;