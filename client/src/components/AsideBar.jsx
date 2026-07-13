import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Users,
  UserCog,
  CreditCard,
  BarChart2,
  Hotel,
  LogOut,
} from "lucide-react";

function AsideBar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Rooms", icon: BedDouble, path: "/receptionist/rooms" },
    { name: "Bookings", icon: CalendarCheck, path: "/receptionist/bookings" },
    
    { name: "Staff", icon: UserCog, path: "/staffmanagement" },
    { name: "Payments", icon: CreditCard, path: "/PaymentForm" },
    { name: "Reports", icon: BarChart2, path: "/admin/reports" },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-[#5C1A2B] text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-[#D9B26F] p-3 rounded-xl">
            <Hotel className="text-[#5C1A2B]" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">LuxuryStay</h1>
            <p className="text-sm text-[#D9B26F]">Hotel Management</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-5 py-8">
        <p className="text-xs uppercase text-gray-300 mb-4 tracking-widest">
          Main Menu
        </p>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? "bg-[#D9B26F] text-[#5C1A2B] shadow-lg scale-105"
                        : "hover:bg-white/10 hover:translate-x-2"
                    }`
                  }
                >
                  <Icon size={22} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-white/10">
        <button className="w-full flex items-center justify-center gap-3 bg-[#D9B26F] text-[#5C1A2B] py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300 hover:shadow-lg">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default AsideBar;
