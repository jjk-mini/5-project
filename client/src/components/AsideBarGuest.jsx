import {
  LayoutDashboard,
  User,
  BellRing,
  MessageSquare,
  CreditCard,
  LogOut,
  Hotel,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

function AsideBarGuest() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      name: "Services",
      icon: BellRing,
      path: "/service-request",
    },
    {
      name: "Feedback",
      icon: MessageSquare,
      path: "/feedback",
    },
    {
      name: "Invoice",
      icon: CreditCard,
      path: "/invoice",
    },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-[#5C1A2B] text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-3">

          <div className="bg-[#D9B26F] p-3 rounded-xl">
            <Hotel
              size={28}
              className="text-[#5C1A2B]"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              LuxuryStay
            </h1>

            <p className="text-sm text-[#D9B26F]">
              Guest Portal
            </p>
          </div>

        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-5 py-8">

        <p className="text-xs uppercase tracking-widest text-gray-300 mb-5">
          Guest Menu
        </p>

        <ul className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 px-5 py-3 rounded-xl cursor-pointer transition-all duration-300
                  ${
                    location.pathname === item.path
                      ? "bg-[#D9B26F] text-[#5C1A2B] shadow-lg scale-105"
                      : "hover:bg-white/10 hover:translate-x-2"
                  }
                `}
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.name}
                </span>

              </li>
            );

          })}

        </ul>

      </div>

      {/* Logout */}
      <div className="p-5 border-t border-white/10">

        <button
          onClick={() => navigate("/logout")}
          className="w-full flex items-center justify-center gap-3 bg-[#D9B26F] text-[#5C1A2B] py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300 hover:shadow-lg"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default AsideBarGuest;
