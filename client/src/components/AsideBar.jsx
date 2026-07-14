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
      className="hidden lg:flex h-screen sticky top-0 flex-col shadow-2xl"
      style={{ width: `${SIDEBAR_WIDTH}px`, background: COLORS.PRIMARY, color: COLORS.CREAM }}
    >

      {/* Logo */}
      <div className="p-7 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl" style={{ background: COLORS.ACCENT }}>
            <Hotel style={{ color: COLORS.PRIMARY }} size={26} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-wide" style={{ fontFamily: FONTS.HEADING }}>
              LuxuryStay
            </h1>
            <p className="text-xs" style={{ color: COLORS.ACCENT, fontFamily: FONTS.BODY }}>
              Hotel Management
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-5 py-8 overflow-y-auto">
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "rgba(243,229,216,0.5)", fontFamily: FONTS.BODY }}
        >
          Main Menu
        </p>

        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive ? "shadow-lg" : "hover:bg-white/10 hover:translate-x-1"
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? COLORS.ACCENT : "transparent",
                    color: isActive ? COLORS.PRIMARY : COLORS.CREAM,
                    fontFamily: FONTS.BODY,
                  })}
                >
                  <Icon size={20} />
                  <span className="text-[14px] font-medium">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold transition-all duration-200 hover:brightness-110 hover:shadow-lg"
          style={{ background: COLORS.ACCENT, color: COLORS.PRIMARY, fontFamily: FONTS.BODY }}
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default AsideBar;
