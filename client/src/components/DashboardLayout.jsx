import AsideBar from "./AsideBar";
import { COLORS, FONTS } from "../constants/theme";

const DashboardLayout = ({ children }) => {
  return (
    <div
      className="flex min-h-screen"
      style={{
        background: COLORS.BACKGROUND,
        fontFamily: FONTS.BODY,
      }}
    >
      <AsideBar />

      <main className="flex-1 overflow-x-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;