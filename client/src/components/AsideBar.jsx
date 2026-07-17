import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTS } from "../constants/theme";
import { ROLES } from "../constants/roles";
import { SIDEBAR_WIDTH } from "../constants/layout";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  UserCog,
  CreditCard,
  BarChart2,
  Settings,
  ClipboardList,
  ClipboardCheck,
  Wrench,
  Hotel,
  LogOut,
} from "lucide-react";

// Role-based menus — this is now the single place that owns staff
// navigation (it used to live in Navbar.jsx as NAV_LINKS).
const SIDEBAR_LINKS = {
  [ROLES.ADMIN]: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Staff", icon: UserCog, path: "/admin/staff" },
    { name: "Rooms", icon: BedDouble, path: "/admin/rooms" },
    { name: "Reports", icon: BarChart2, path: "/admin/reports" },
        { name: "Profile", icon: BarChart2, path: "/profile" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ],
  [ROLES.MANAGER]: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Staff", icon: UserCog, path: "/admin/staff" },
    { name: "Rooms", icon: BedDouble, path: "/admin/rooms" },
    { name: "Reports", icon: BarChart2, path: "/admin/reports" },
  ],
  [ROLES.RECEPTIONIST]: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/receptionist/dashboard" },
    { name: "Rooms", icon: BedDouble, path: "/receptionist/rooms" },
    { name: "Bookings", icon: CalendarCheck, path: "/receptionist/bookings" },
    { name: "Check In/Out", icon: ClipboardCheck, path: "/receptionist/checkinout" },
    { name: "Billing", icon: CreditCard, path: "/receptionist/billing" },
  ],
  [ROLES.HOUSEKEEPING]: [
    { name: "My Tasks", icon: ClipboardList, path: "/housekeeping/dashboard" },
    { name: "Maintenance", icon: Wrench, path: "/housekeeping/maintenance" },
  ],
};

// Display-only helper — not new state, just formats the existing `user`
// object for the "signed in as" chip above Logout.
const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

function AsideBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = SIDEBAR_LINKS[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      // hidden on small screens for now — see note on mobile handling
      className="hidden lg:flex h-screen sticky top-0 flex-col shadow-2xl relative"
      style={{ width: `${SIDEBAR_WIDTH}px`, background: COLORS.PRIMARY, color: COLORS.CREAM }}
    >
      {/* Brass edge trim — the sidebar's one hairline of "hardware" detail */}
      <div
        className="absolute top-0 right-0 h-full w-px"
        style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.ACCENT}55 15%, ${COLORS.ACCENT}55 85%, transparent)` }}
      />

      {/* Crest + wordmark */}
      <div className="px-7 py-7">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: COLORS.ACCENT, boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.35)` }}
          >
            <Hotel style={{ color: COLORS.PRIMARY }} size={22} />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-wide leading-none" style={{ fontFamily: FONTS.HEADING }}>
              LuxuryStay
            </h1>
            <p
              className="text-[11px] mt-1 tracking-wide"
              style={{ color: COLORS.ACCENT, fontFamily: FONTS.BODY }}
            >
              Hotel Management
            </p>
          </div>
        </div>
      </div>

      {/* Hairline divider — brass, not the generic white/10 line */}
      <div className="mx-7 h-px" style={{ background: `${COLORS.ACCENT}40` }} />

      {/* Menu */}
      <nav className="flex-1 px-4 pt-7 pb-4 overflow-y-auto">
        <p
          className="px-3 text-[10.5px] uppercase mb-3"
          style={{ color: "rgba(249,249,249,0.4)", fontFamily: FONTS.BODY, letterSpacing: "0.16em" }}
        >
          Main Menu
        </p>

        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 pl-4 pr-3.5 py-2.5 rounded-lg transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                      isActive ? "" : "hover:bg-white/[0.06]"
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? `${COLORS.ACCENT}1F` : "transparent",
                    color: isActive ? COLORS.CREAM : "rgba(249,249,249,0.75)",
                    fontFamily: FONTS.BODY,
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {/* Signature element — the brass "key-tab": grows in on the
                          active item instead of a full-pill fill */}
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full transition-all duration-300"
                        style={{
                          height: isActive ? "60%" : "0%",
                          background: COLORS.ACCENT,
                        }}
                      />
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-colors duration-200"
                        style={{ background: isActive ? COLORS.ACCENT : "transparent" }}
                      >
                        <Icon size={17} style={{ color: isActive ? COLORS.PRIMARY : "inherit" }} />
                      </span>
                      <span className={`text-[13.5px] ${isActive ? "font-semibold" : "font-medium"}`}>
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Signed in as */}
      <div className="mx-5 mb-2 mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3 px-2 pb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold"
            style={{ background: COLORS.ACCENT, color: COLORS.PRIMARY, fontFamily: FONTS.BODY }}
          >
            {getInitials(user?.name) || "?"}
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-medium truncate" style={{ fontFamily: FONTS.BODY }}>
              {user?.name || "Staff member"}
            </p>
            <p
              className="text-[11px] capitalize truncate"
              style={{ color: "rgba(249,249,249,0.5)", fontFamily: FONTS.BODY }}
            >
              {user?.role || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:brightness-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          style={{ background: COLORS.ACCENT, color: COLORS.PRIMARY, fontFamily: FONTS.BODY }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default AsideBar;
