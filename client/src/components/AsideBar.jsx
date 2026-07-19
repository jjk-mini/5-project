import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { COLORS, FONTS } from "../constants/theme";
import { ROLES } from "../constants/roles";
import { SIDEBAR_WIDTH } from "../constants/layout";
import Logo from "../assets/Logo.png";

import {
  CircleUserRound,
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  UserCog,
  CreditCard,
  BarChart2,
  ClipboardList,
  ClipboardCheck,
  Wrench,
  LogOut,
  ConciergeBell,
} from "lucide-react";

const SIDEBAR_LINKS = {
  [ROLES.ADMIN]: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Staff", icon: UserCog, path: "/admin/staff-management" },
    { name: "Maintenance", icon: Wrench, path: "/housekeeping/maintenance" },
    { name: "Requests", icon: ClipboardList, path: "/housekeeping/dashboard" },
    { name: "Rooms", icon: BedDouble, path: "/admin/rooms" },
    { name: "Services", icon: ConciergeBell, path: "/admin/services" },
    { name: "Bookings", icon: CalendarCheck, path: "/admin/bookings" },
    { name: "Reports", icon: BarChart2, path: "/admin/reports" },
    { name: "Profile", icon: CircleUserRound, path: "/profile" },
  ],

  [ROLES.MANAGER]: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/manager/dashboard" },
    { name: "Staff", icon: UserCog, path: "/admin/staff-management" },
    { name: "Maintenance", icon: Wrench, path: "/housekeeping/maintenance" },
    { name: "Requests", icon: ClipboardList, path: "/housekeeping/dashboard" },
    // { name: "Rooms", icon: BedDouble, path: "/admin/rooms" },
    // { name: "Services", icon: ConciergeBell, path: "/admin/services" },
    { name: "Bookings", icon: CalendarCheck, path: "/admin/bookings" },
    // { name: "Reports", icon: BarChart2, path: "/admin/reports" },
    { name: "Profile", icon: CircleUserRound, path: "/profile" },
    
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
      className="hidden lg:flex flex-col sticky top-0"
      style={{
        width: SIDEBAR_WIDTH,
        height: "100vh",
        background: COLORS.PRIMARY,
        color: COLORS.CREAM,
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="LuxuryStay Logo"
            className="w-12 h-12 object-contain"
          />

          <div>
            <h1
              className="text-xl font-semibold leading-none"
              style={{ fontFamily: FONTS.HEADING }}
            >
              LuxuryStay
            </h1>

            <p
              className="text-xs mt-1"
              style={{
                color: COLORS.ACCENT,
                fontFamily: FONTS.BODY,
              }}
            >
              Hotel Management
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-5 py-5">
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{
            color: "rgba(243,229,216,0.55)",
            fontFamily: FONTS.BODY,
          }}
        >
          Main Menu
        </p>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? ""
                        : "hover:bg-white/10 hover:translate-x-1"
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? COLORS.ACCENT : "transparent",
                    color: isActive ? COLORS.PRIMARY : COLORS.CREAM,
                    fontFamily: FONTS.BODY,
                  })}
                >
                  <Icon size={20} />

                  <span className="text-sm font-medium">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout */}
      <div className="mt-auto p-5 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 hover:brightness-110"
          style={{
            background: COLORS.ACCENT,
            color: COLORS.PRIMARY,
            fontFamily: FONTS.BODY,
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AsideBar;