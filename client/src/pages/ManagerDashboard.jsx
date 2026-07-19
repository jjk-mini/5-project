import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AsideBar from "../components/AsideBar";

import {
  COLORS,
  FONTS,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";

import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wrench,
  DollarSign,
  BedDouble,
  ArrowRight,
  ClipboardList,
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

// import bookingApi from "../api/bookingApi";
import staffApi from "../api/staffApi";
// import maintenanceApi from "../api/maintenanceApi";

const weeklyOccupancy = [
  { day: "Mon", occupancy: 68 },
  { day: "Tue", occupancy: 74 },
  { day: "Wed", occupancy: 79 },
  { day: "Thu", occupancy: 83 },
  { day: "Fri", occupancy: 91 },
  { day: "Sat", occupancy: 96 },
  { day: "Sun", occupancy: 84 },
];

const roomStatus = [
  { name: "Occupied", value: 42 },
  { name: "Available", value: 21 },
  { name: "Cleaning", value: 9 },
  { name: "Maintenance", value: 4 },
];

const ROOM_STATUS_COLORS = [
  COLORS.PRIMARY,
  COLORS.ACCENT,
  COLORS.INFO,
  COLORS.WARNING,
];

const tint = (hex, alpha = "1A") => `${hex}${alpha}`;

function ManagerDashboard() {
  const [stats, setStats] = useState({
    staff: 0,
    bookings: 0,
    maintenance: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [recentMaintenance, setRecentMaintenance] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const bookingsRes = await bookingApi.getAllBookings();
      const staffRes = await staffApi.getAllStaff();
      const maintenanceRes =
        await maintenanceApi.getAllMaintenance();

      const bookings = bookingsRes.data || bookingsRes;
      const staff = staffRes.data || staffRes;
      const maintenance =
        maintenanceRes.data || maintenanceRes;

      setStats({
        staff: staff.length,
        bookings: bookings.length,
        maintenance: maintenance.filter(
          (m) => m.status !== "Resolved"
        ).length,
        revenue: bookings.reduce(
          (sum, item) => sum + (item.totalAmount || 0),
          0
        ),
      });

      setRecentBookings(bookings.slice(0, 5));
      setRecentMaintenance(maintenance.slice(0, 5));
    } catch (err) {
      console.log(err);
    }
  };

  const cardStyle = {
    background: COLORS.SURFACE,
    border: `1px solid ${COLORS.BORDER}`,
    borderRadius: BORDER_RADIUS.LARGE,
    boxShadow: SHADOWS.CARD,
  };

  const headingFont = {
    fontFamily: FONTS.HEADING,
  };

  const dashboardCards = [
    {
      label: "Total Staff",
      value: stats.staff,
      icon: Users,
      color: COLORS.INFO,
    },
    {
      label: "Bookings",
      value: stats.bookings,
      icon: CalendarCheck,
      color: COLORS.SUCCESS,
    },
    {
      label: "Maintenance",
      value: stats.maintenance,
      icon: Wrench,
      color: COLORS.WARNING,
    },
    {
      label: "Revenue",
      value: `$${stats.revenue}`,
      icon: DollarSign,
      color: COLORS.PRIMARY,
    },
  ];

  const quickActions = [
    {
      label: "Staff",
      icon: Users,
      path: "/admin/staff-management",
    },
    {
      label: "Bookings",
      icon: CalendarCheck,
      path: "/admin/bookings",
    },
    {
      label: "Maintenance",
      icon: Wrench,
      path: "/housekeeping/maintenance",
    },
    {
      label: "Profile",
      icon: ClipboardList,
      path: "/manager/profile",
    },
  ];

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: COLORS.BACKGROUND,
        fontFamily: FONTS.BODY,
      }}
    >
      <AsideBar />

      <main className="flex-1 p-8">

        {/* Header */}

        <div
          className="p-8 mb-8"
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
          }}
        >
          <div className="flex items-center gap-4">

            <div
              className="p-4"
              style={{
                background: COLORS.ACCENT,
                borderRadius: BORDER_RADIUS.LARGE,
              }}
            >
              <LayoutDashboard
                size={34}
                color={COLORS.PRIMARY}
              />
            </div>

            <div>
              <h1
                className="text-4xl font-bold text-white"
                style={headingFont}
              >
                Manager Dashboard
              </h1>

              <p
                className="mt-2"
                style={{ color: COLORS.ACCENT }}
              >
                Monitor staff, bookings and hotel operations.
              </p>
            </div>

          </div>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {dashboardCards.map(
            ({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="p-6"
                style={cardStyle}
              >
                <div
                  className="inline-flex items-center justify-center w-11 h-11"
                  style={{
                    background: tint(color),
                    borderRadius:
                      BORDER_RADIUS.MEDIUM,
                  }}
                >
                  <Icon size={22} color={color} />
                </div>

                <h2
                  className="text-3xl font-bold mt-5"
                  style={{
                    color: COLORS.TEXT_PRIMARY,
                    ...headingFont,
                  }}
                >
                  {value}
                </h2>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color: COLORS.TEXT_SECONDARY,
                  }}
                >
                  {label}
                </p>
              </div>
            )
          )}
        </div>
                {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

          {/* Weekly Occupancy */}
          <div
            className="p-6"
            style={cardStyle}
          >
            <h2
              className="text-lg font-bold mb-6"
              style={{
                color: COLORS.TEXT_PRIMARY,
                ...headingFont,
              }}
            >
              Weekly Occupancy
            </h2>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyOccupancy}>

                <defs>
                  <linearGradient
                    id="occupancyFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={COLORS.ACCENT}
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor={COLORS.ACCENT}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={COLORS.BORDER}
                />

                <XAxis
                  dataKey="day"
                  stroke={COLORS.TEXT_SECONDARY}
                />

                <YAxis
                  stroke={COLORS.TEXT_SECONDARY}
                />

                <Tooltip />

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

          {/* Room Status */}
          <div
            className="p-6"
            style={cardStyle}
          >
            <h2
              className="text-lg font-bold mb-6"
              style={{
                color: COLORS.TEXT_PRIMARY,
                ...headingFont,
              }}
            >
              Room Status
            </h2>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>

                <Pie
                  data={roomStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                >
                  {roomStatus.map((item, index) => (
                    <Cell
                      key={index}
                      fill={
                        ROOM_STATUS_COLORS[
                          index %
                            ROOM_STATUS_COLORS.length
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Legend />

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* Bottom Section */}

        <div className="grid xl:grid-cols-3 gap-6 mt-6">

          {/* Quick Actions */}

          <div
            className="p-6"
            style={cardStyle}
          >
            <h2
              className="text-lg font-bold mb-5"
              style={{
                color: COLORS.TEXT_PRIMARY,
                ...headingFont,
              }}
            >
              Quick Actions
            </h2>

            <div className="space-y-3">

              {quickActions.map(
                ({ label, icon: Icon, path }) => (

                  <Link
                    key={label}
                    to={path}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
                  >

                    <div className="flex items-center gap-3">

                      <Icon
                        size={20}
                        color={COLORS.PRIMARY}
                      />

                      <span
                        style={{
                          color: COLORS.TEXT_PRIMARY,
                        }}
                      >
                        {label}
                      </span>

                    </div>

                    <ArrowRight
                      size={18}
                      color={COLORS.MUTED}
                    />

                  </Link>

                )
              )}

            </div>

          </div>

          {/* Recent Maintenance */}

          <div
            className="xl:col-span-2 p-6"
            style={cardStyle}
          >
            <div className="flex justify-between items-center mb-5">

              <h2
                className="text-lg font-bold"
                style={{
                  color: COLORS.TEXT_PRIMARY,
                  ...headingFont,
                }}
              >
                Recent Maintenance Requests
              </h2>

              <Link
                to="/housekeeping/maintenance"
                style={{
                  color: COLORS.PRIMARY,
                  fontWeight: 600,
                }}
              >
                View All
              </Link>

            </div>
                        {recentMaintenance.length === 0 ? (

              <div className="text-center py-10">
                <p
                  style={{
                    color: COLORS.TEXT_SECONDARY,
                  }}
                >
                  No maintenance requests found.
                </p>
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr
                      style={{
                        borderBottom: `1px solid ${COLORS.BORDER}`,
                      }}
                    >
                      <th className="text-left py-3">Room</th>
                      <th className="text-left py-3">Issue</th>
                      <th className="text-left py-3">Priority</th>
                      <th className="text-left py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentMaintenance.map((item) => (

                      <tr
                        key={item._id}
                        style={{
                          borderBottom: `1px solid ${COLORS.BORDER}`,
                        }}
                      >
                        <td className="py-4">
                          {item.room?.roomNumber || "-"}
                        </td>

                        <td>{item.issue}</td>

                        <td>
                          <span
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                              background:
                                item.priority === "High"
                                  ? "#FDECEC"
                                  : item.priority === "Medium"
                                  ? "#FFF4DD"
                                  : "#EDF8F1",
                              color:
                                item.priority === "High"
                                  ? COLORS.ERROR
                                  : item.priority === "Medium"
                                  ? COLORS.WARNING
                                  : COLORS.SUCCESS,
                            }}
                          >
                            {item.priority}
                          </span>
                        </td>

                        <td>
                          <span
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                              background:
                                item.status === "Resolved"
                                  ? "#EDF8F1"
                                  : item.status === "In Progress"
                                  ? "#FFF4DD"
                                  : "#FDECEC",
                              color:
                                item.status === "Resolved"
                                  ? COLORS.SUCCESS
                                  : item.status === "In Progress"
                                  ? COLORS.WARNING
                                  : COLORS.ERROR,
                            }}
                          >
                            {item.status}
                          </span>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

        {/* Recent Bookings */}

        <div
          className="mt-6 p-6"
          style={cardStyle}
        >

          <div className="flex justify-between items-center mb-5">

            <h2
              className="text-lg font-bold"
              style={{
                color: COLORS.TEXT_PRIMARY,
                ...headingFont,
              }}
            >
              Recent Bookings
            </h2>

            <Link
              to="/admin/bookings"
              style={{
                color: COLORS.PRIMARY,
                fontWeight: 600,
              }}
            >
              View All
            </Link>

          </div>

          {recentBookings.length === 0 ? (

            <div className="text-center py-10">

              <p
                style={{
                  color: COLORS.TEXT_SECONDARY,
                }}
              >
                No bookings found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr
                    style={{
                      borderBottom: `1px solid ${COLORS.BORDER}`,
                    }}
                  >
                    <th className="text-left py-3">Guest</th>
                    <th className="text-left py-3">Room</th>
                    <th className="text-left py-3">Check In</th>
                    <th className="text-left py-3">Status</th>
                  </tr>

                </thead>

                <tbody>

                  {recentBookings.map((booking) => (

                    <tr
                      key={booking._id}
                      style={{
                        borderBottom: `1px solid ${COLORS.BORDER}`,
                      }}
                    >
                      <td className="py-4">
                        {booking.user?.name || "-"}
                      </td>

                      <td>
                        {booking.room?.roomNumber || "-"}
                      </td>

                      <td>
                        {booking.checkIn
                          ? new Date(
                              booking.checkIn
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>

                        <span
                          className="px-3 py-1 rounded-full text-xs"
                          style={{
                            background: "#EDF8F1",
                            color: COLORS.SUCCESS,
                          }}
                        >
                          {booking.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>

  );
}

export default ManagerDashboard;