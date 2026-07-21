import { useEffect, useState } from "react";
import AsideBar from "../components/AsideBar";
import bookingApi from "../api/bookingApi";
import reportApi from "../api/reportApi";
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
  Wrench,
  Hammer,
  ShieldCheck,
  BriefcaseBusiness,
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

  const [dashboardStats, setDashboardStats] = useState(null);
  const [roomStatus, setRoomStatus] = useState([]);
  const [weeklyOccupancy, setWeeklyOccupancy] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      setActivityLoading(true);
      try {
        const res = await bookingApi.getTodayActivity();
        const { checkinsToday = [], checkoutsToday = [] } = res.data || {};
        const formatTime = (d) => (d ? new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "\u2014");
        const merged = [
          ...checkinsToday.map((b) => ({ ...b, status: b.status === "checked-in" ? "checked-in" : "confirmed", time: formatTime(b.checkIn), sortKey: b.checkIn })),
          ...checkoutsToday.map((b) => ({ ...b, status: "checked-out", time: formatTime(b.checkOut), sortKey: b.checkOut })),
        ]
          .sort((a, b) => new Date(b.sortKey) - new Date(a.sortKey))
          .map(mapActivityItem);
        setRecentActivity(merged);
      } catch {
        setRecentActivity([]);
      } finally {
        setActivityLoading(false);
      }
    };

    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const res = await reportApi.getDashboardStats();
        setDashboardStats(res.data.stats || null);
        setRoomStatus(res.data.roomStatus || []);
        setWeeklyOccupancy(res.data.weeklyOccupancy || []);
      } catch {
        setDashboardStats(null);
        setRoomStatus([]);
        setWeeklyOccupancy([]);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchActivity();
    fetchStats();
  }, []);

  const dashboardOptions = [
    { label: "Admin Dashboard", path: "/" },
    { label: "Housekeeping Dashboard", path: "/admin/housekeeping-dashboard" },
    { label: "Staff Management Dashboard", path: "/admin/staff-management" },
  ];

  const stats = [
    { label: "Occupancy", value: statsLoading ? "\u2014" : `${dashboardStats?.occupancyRate ?? 0}%`, icon: Percent, color: COLORS.INFO },
{
  label: "Revenue",
  value: statsLoading
    ? "—"
    : `PKR ${(dashboardStats?.revenueToday ?? 0).toLocaleString("en-PK")}`,
  icon: DollarSign,
  color: COLORS.SUCCESS
},    { label: "Total Rooms", value: statsLoading ? "\u2014" : `${dashboardStats?.totalRooms ?? 0}`, icon: BedDouble, color: COLORS.PRIMARY },
    { label: "Bookings Today", value: statsLoading ? "\u2014" : `${dashboardStats?.bookingsToday ?? 0}`, icon: CalendarCheck, color: COLORS.WARNING },
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

        <main className="flex-1 p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 w-full min-w-0">
          {/* Header */}

          <div
            className="mb-4 sm:mb-8 p-4 sm:p-6 lg:p-8"
            style={{
              background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
              borderRadius: BORDER_RADIUS.LARGE,
              boxShadow: SHADOWS.CARD,
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div
                className="p-3 sm:p-4 shrink-0"
                style={{
                  backgroundColor: COLORS.ACCENT,
                  borderRadius: BORDER_RADIUS.LARGE,
                }}
              >
                <LayoutDashboard
                  size={28}
                  className="sm:hidden"
                  style={{ color: COLORS.PRIMARY }}
                />
                <LayoutDashboard
                  size={35}
                  className="hidden sm:block"
                  style={{ color: COLORS.PRIMARY }}
                />
              </div>

              <div className="min-w-0">
                <h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words"
                  style={{
                    color: "#fff",
                    fontFamily: FONTS.HEADING,
                  }}
                >
                  Admin Dashboard
                </h1>

                <p
                  className="mt-2 text-sm sm:text-base"
                  style={{
                    color: COLORS.ACCENT,
                    fontFamily: FONTS.BODY,
                  }}
                >
                  Deliver exceptional guest experiences by keeping every room and facility in perfect condition.
                </p>
              </div>
            </div>
          </div>

          {/* Card start */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">

            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="p-4 sm:p-6" style={cardStyle}>
                <div
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11"
                  style={{ backgroundColor: tint(color), borderRadius: BORDER_RADIUS.MEDIUM }}
                >
                  <Icon size={20} className="sm:hidden" style={{ color }} />
                  <Icon size={22} className="hidden sm:block" style={{ color }} />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold mt-4 sm:mt-5" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                  {value}
                </h1>

                <p className="mt-1 text-xs sm:text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
                  {label}
                </p>
              </div>
            ))}
            {/* card end */}

          </div>

          {/* Charts start */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">

            {/* Occupancy trend (Area chart) */}
            <div className="p-4 sm:p-6 min-w-0" style={cardStyle}>
              <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-6" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                Weekly Occupancy Trend
              </h2>

              <ResponsiveContainer width="100%" height={220} className="sm:!h-[280px]">
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
            <div className="p-4 sm:p-6 min-w-0" style={cardStyle}>
              <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-6" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                Room Status Breakdown
              </h2>

              <ResponsiveContainer width="100%" height={220} className="sm:!h-[280px]">
                <PieChart>
                  <Pie
                    data={roomStatus}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
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
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
          {/* Charts end */}

          {/* Quick Actions + Recent Activity start */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">

            {/* Quick Actions */}
            <div className="p-4 sm:p-6" style={cardStyle}>
              <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                Quick Actions
              </h2>

              <ul>
                {quickActions.map(({ label, icon: Icon, path }, index) => (
                  <li
                    key={label}
                    style={index !== 0 ? { borderTop: `1px solid ${COLORS.BORDER}` } : undefined}
                  >
                    <Link to={path} className="flex items-center justify-between py-2.5 sm:py-3 group">
                      <span className="flex items-center gap-3 text-sm font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                        <Icon size={18} className="shrink-0" style={{ color: COLORS.PRIMARY }} />
                        {label}
                      </span>
                      <ArrowRight
                        size={16}
                        style={{ color: COLORS.MUTED }}
                        className="shrink-0 group-hover:translate-x-0.5 transition-transform"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Activity */}
            <div className="p-4 sm:p-6 xl:col-span-2 min-w-0" style={cardStyle}>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold" style={{ color: COLORS.TEXT_PRIMARY, ...headingFont }}>
                  Recent Activity
                </h2>
                <span className="text-xs" style={{ color: COLORS.MUTED }}>Today</span>
              </div>

              {!activityLoading && recentActivity.length === 0 && (
                <p className="py-6 text-sm text-center" style={{ color: COLORS.MUTED }}>
                  No check-ins or check-outs yet today.
                </p>
              )}

              <ul>
                {recentActivity.map((entry, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0 py-3 text-sm"
                    style={index !== 0 ? { borderTop: `1px solid ${COLORS.BORDER}` } : undefined}
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 min-w-0">
                      <span className="w-12 shrink-0" style={{ color: COLORS.MUTED }}>{entry.time}</span>
                      <span
                        className="px-2.5 py-1 text-xs font-semibold shrink-0"
                        style={{ color: entry.tagColor, backgroundColor: tint(entry.tagColor), borderRadius: BORDER_RADIUS.PILL }}
                      >
                        {entry.tag}
                      </span>
                      <span className="font-medium truncate" style={{ color: COLORS.TEXT_PRIMARY }}>{entry.name}</span>
                    </div>
                    <span className="shrink-0 pl-14 sm:pl-0" style={{ color: COLORS.MUTED }}>{entry.room}</span>
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