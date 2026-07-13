import { useEffect,useState } from "react";
import AsideBar from "../components/AsideBar";
import { Link } from "react-router-dom";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";
import {
  LayoutDashboard,
  ChevronDown,
  Percent,
  DollarSign,
  BedDouble,
  CalendarCheck,
  CreditCard,
  ClipboardList,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const weeklyOccupancy = [
  { day: "Mon", occupancy: 68 },
  { day: "Tue", occupancy: 74 },
  { day: "Wed", occupancy: 79 },
  { day: "Thu", occupancy: 83 },
  { day: "Fri", occupancy: 90 },
  { day: "Sat", occupancy: 95 },
  { day: "Sun", occupancy: 82 },
];

const roomStatus = [
  { name: "Occupied", value: 42 },
  { name: "Available", value: 21 },
  { name: "Cleaning", value: 9 },
  { name: "Maintenance", value: 4 },
];

const ROOM_STATUS_COLORS = [COLORS.PRIMARY, COLORS.ACCENT, COLORS.INFO, COLORS.WARNING];


const quickActions = [
  { label: "Open Billing", icon: CreditCard, path: "/billing" },
  { label: "View Bookings", icon: ClipboardList, path: "/bookings" },
  { label: "Check Rooms", icon: BedDouble, path: "/rooms" },
  { label: "View Reports", icon: BarChart3, path: "/reports" },
];


const mapActivityItem = (item) => {
  const statusColorMap = {
    pending: COLORS.WARNING,
    confirmed: COLORS.INFO,
    "checked-in": COLORS.SUCCESS,
    "checked-out": COLORS.MUTED,
    cancelled: COLORS.ERROR,
  };
  const tagRaw = item.type || item.action || item.status || "Update";
  const tag = tagRaw.charAt(0).toUpperCase() + tagRaw.slice(1).replace(/-/g, " ");
  return {
    time: item.time
      || (item.createdAt
        ? new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "—"),
    tag,
    tagColor: statusColorMap[item.status] || COLORS.PRIMARY,
    name: item.guest?.name || item.guestName || "Guest",
    room: item.room?.roomNumber ? `Rm ${item.room.roomNumber}` : (item.roomNumber ? `Rm ${item.roomNumber}` : "—"),
  };
};

// Small helper: turns a hex color into a translucent tint for icon/tag
// backgrounds (e.g. "#185FA5" -> "#185FA51A" ~ 10% opacity).
const tint = (hex, alpha = "1A") => `${hex}${alpha}`;

function AdminDashboard() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
const [recentActivity, setRecentActivity] = useState([]);
const [activityLoading, setActivityLoading] = useState(true);

useEffect(() => {
  const fetchActivity = async () => {
    setActivityLoading(true);
    try {
      const res = await bookingApi.getTodayActivity();
      setRecentActivity(res.data.activity || res.data.bookings || res.data || []);
    } catch {
      setRecentActivity([]);
    } finally {
      setActivityLoading(false);
    }
  };
  fetchActivity();
}, []);

  const dashboardOptions = [
    { label: "Admin Dashboard", path: "/" },
    { label: "Housekeeping Dashboard", path: "/housekeeping-dashboard" },
    { label: "Staff Management Dashboard", path: "/staff-management" },
  ];

  const stats = [
    { label: "Occupancy", value: "82%", icon: Percent, color: COLORS.INFO },
    { label: "Revenue", value: "$3240", icon: DollarSign, color: COLORS.SUCCESS },
    { label: "Total Rooms", value: "7", icon: BedDouble, color: COLORS.PRIMARY },
    { label: "Bookings Today", value: "24", icon: CalendarCheck, color: COLORS.WARNING },
  ];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Shared card look, driven entirely by theme tokens
  const cardStyle = {
    backgroundColor: COLORS.SURFACE,
    border: `1px solid ${COLORS.BORDER}`,
    boxShadow: SHADOWS.CARD,
    borderRadius: BORDER_RADIUS.LARGE,
  };

  const headingFont = { fontFamily: FONTS.HEADING };

  return (
    <>
      {/* dashboard start*/}
      <div
        className="flex flex-col md:flex-row min-h-screen"
        style={{ backgroundColor: COLORS.BACKGROUND, fontFamily: FONTS.BODY, color: COLORS.TEXT_PRIMARY }}
      >
        <AsideBar />
        {/* aside end */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">

          {/* Header */}
          <div
            className="p-6 sm:p-8"
            style={{
              background: `linear-gradient(to right, ${COLORS.PRIMARY}, ${COLORS.DARK})`,
              borderRadius: BORDER_RADIUS.LARGE,
              boxShadow: SHADOWS.CARD,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

              <div>
                <p className="text-sm font-medium" style={{ color: `${COLORS.CREAM}CC` }}>
                  Good morning,
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1" style={headingFont}>
                  Admin User
                </h1>
                <div className="flex items-center gap-3 mt-3">
                  <span
                    className="text-xs font-semibold px-3 py-1"
                    style={{ color: COLORS.PRIMARY, backgroundColor: COLORS.ACCENT, borderRadius: BORDER_RADIUS.PILL }}
                  >
                    Admin
                  </span>
                  <span className="text-sm" style={{ color: `${COLORS.CREAM}B3` }}>
                    {today}
                  </span>
                </div>
              </div>

              {/* Dropdown start */}
              <div className="relative w-full sm:w-72">
                <button
                  type="button"
                  onClick={() => setIsDashboardOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between gap-2 font-semibold px-5 py-3 transition-colors focus:outline-none"
                  style={{
                    backgroundColor: COLORS.SURFACE,
                    color: COLORS.PRIMARY,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    boxShadow: SHADOWS.DROPDOWN,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard size={18} />
                    Select Dashboard
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${isDashboardOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDashboardOpen && (
                  <ul
                    className="absolute right-0 z-10 mt-2 w-full overflow-hidden"
                    style={{
                      backgroundColor: COLORS.SURFACE,
                      border: `1px solid ${COLORS.BORDER}`,
                      borderRadius: BORDER_RADIUS.MEDIUM,
                      boxShadow: SHADOWS.DROPDOWN,
                    }}
                  >
                    {dashboardOptions.map((option) => (
                      <li key={option.path}>
                        <Link
                          to={option.path}
                          onClick={() => setIsDashboardOpen(false)}
                          className="block w-full text-left px-4 py-3 font-medium transition-colors"
                          style={{ color: COLORS.PRIMARY }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = tint(COLORS.ACCENT, "33"))}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          {option.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Dropdown end */}

            </div>
          </div>

          {/* Card start */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="p-6" style={cardStyle}>
                <div
                  className="inline-flex items-center justify-center w-11 h-11"
                  style={{ backgroundColor: tint(color), borderRadius: BORDER_RADIUS.MEDIUM }}
                >
                  <Icon size={22} style={{ color }} />
                </div>

                <h1 className="text-3xl font-bold mt-5" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                  {value}
                </h1>

                <p className="mt-1 text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
                  {label}
                </p>
              </div>
            ))}
            {/* card end */}

          </div>

          {/* Charts start */}
          <div className="grid xl:grid-cols-2 gap-6">

            {/* Occupancy trend (Area chart) */}
            <div className="p-6" style={cardStyle}>
              <h2 className="text-lg font-bold mb-6" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                Weekly Occupancy Trend
              </h2>

              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={weeklyOccupancy}>
                  <defs>
                    <linearGradient id="occupancyFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.ACCENT} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={COLORS.ACCENT} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.BORDER} />
                  <XAxis dataKey="day" stroke={COLORS.TEXT_SECONDARY} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={COLORS.TEXT_SECONDARY} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: BORDER_RADIUS.SMALL,
                      borderColor: COLORS.ACCENT,
                      fontFamily: FONTS.BODY,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke={COLORS.PRIMARY}
                    strokeWidth={3}
                    fill="url(#occupancyFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Room status (Donut chart) */}
            <div className="p-6" style={cardStyle}>
              <h2 className="text-lg font-bold mb-6" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                Room Status Breakdown
              </h2>

              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={roomStatus}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {roomStatus.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={ROOM_STATUS_COLORS[index % ROOM_STATUS_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: BORDER_RADIUS.SMALL,
                      borderColor: COLORS.ACCENT,
                      fontFamily: FONTS.BODY,
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
          {/* Charts end */}

          {/* Quick Actions + Recent Activity start */}
          <div className="grid xl:grid-cols-3 gap-6">

            {/* Quick Actions */}
            <div className="p-6" style={cardStyle}>
              <h2 className="text-lg font-bold mb-4" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                Quick Actions
              </h2>

              <ul>
                {quickActions.map(({ label, icon: Icon, path }, index) => (
                  <li
                    key={label}
                    style={index !== 0 ? { borderTop: `1px solid ${COLORS.BORDER}` } : undefined}
                  >
                    <Link to={path} className="flex items-center justify-between py-3 group">
                      <span className="flex items-center gap-3 text-sm font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                        <Icon size={18} style={{ color: COLORS.PRIMARY }} />
                        {label}
                      </span>
                      <ArrowRight
                        size={16}
                        style={{ color: COLORS.MUTED }}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Activity */}
            <div className="p-6 xl:col-span-2" style={cardStyle}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                  Recent Activity
                </h2>
                <span className="text-xs" style={{ color: COLORS.MUTED }}>Today</span>
              </div>

              <ul>
                {recentActivity.map((entry, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-3 text-sm"
                    style={index !== 0 ? { borderTop: `1px solid ${COLORS.BORDER}` } : undefined}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-12 shrink-0" style={{ color: COLORS.MUTED }}>{entry.time}</span>
                      <span
                        className="px-2.5 py-1 text-xs font-semibold"
                        style={{ color: entry.tagColor, backgroundColor: tint(entry.tagColor), borderRadius: BORDER_RADIUS.PILL }}
                      >
                        {entry.tag}
                      </span>
                      <span className="font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>{entry.name}</span>
                    </div>
                    <span style={{ color: COLORS.MUTED }}>{entry.room}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
          {/* Quick Actions + Recent Activity end */}

        </main>

      </div>

    </>
  );
}

export default AdminDashboard;
