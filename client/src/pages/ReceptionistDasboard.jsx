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
  BedDouble,
  CalendarCheck,
  CheckCircle,
  ArrowRight,
  ClipboardCheck,
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

import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../api/roomApi";
import bookingApi from "../api/bookingApi";

const weeklyOccupancy = [
  { day: "Mon", occupancy: 68 },
  { day: "Tue", occupancy: 72 },
  { day: "Wed", occupancy: 78 },
  { day: "Thu", occupancy: 83 },
  { day: "Fri", occupancy: 90 },
  { day: "Sat", occupancy: 95 },
  { day: "Sun", occupancy: 86 },
];

const ROOM_STATUS_COLORS = [
  COLORS.PRIMARY,
  COLORS.ACCENT,
  COLORS.INFO,
  COLORS.WARNING,
];

const tint = (hex, alpha = "1A") => `${hex}${alpha}`;

function ReceptionistDashboard() {

  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookings: 0,
    checkins: 0,
  });

  const [roomStatus, setRoomStatus] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const roomsRes = await getAllRooms();
      const bookingsRes = await bookingApi.getAllBookings();

      const roomData = roomsRes.data || roomsRes;
      const bookingData = bookingsRes.data || bookingsRes;

      setRooms(roomData);
      setBookings(bookingData);

      const available =
        roomData.filter(
          (room) =>
            room.status === "Available"
        ).length;

      const occupied =
        roomData.filter(
          (room) =>
            room.status === "Occupied"
        ).length;

      const cleaning =
        roomData.filter(
          (room) =>
            room.status === "Cleaning"
        ).length;

      const maintenance =
        roomData.filter(
          (room) =>
            room.status === "Maintenance"
        ).length;

      const today = new Date().toDateString();

      const todayCheckins =
        bookingData.filter(
          (booking) =>
            booking.checkIn &&
            new Date(
              booking.checkIn
            ).toDateString() === today
        ).length;

      setStats({
        totalRooms: roomData.length,
        availableRooms: available,
        bookings: bookingData.length,
        checkins: todayCheckins,
      });

      setRoomStatus([
        {
          name: "Occupied",
          value: occupied,
        },
        {
          name: "Available",
          value: available,
        },
        {
          name: "Cleaning",
          value: cleaning,
        },
        {
          name: "Maintenance",
          value: maintenance,
        },
      ]);

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
      label: "Total Rooms",
      value: stats.totalRooms,
      icon: BedDouble,
      color: COLORS.PRIMARY,
    },
    {
      label: "Bookings",
      value: stats.bookings,
      icon: CalendarCheck,
      color: COLORS.SUCCESS,
    },
    {
      label: "Available",
      value: stats.availableRooms,
      icon: CheckCircle,
      color: COLORS.INFO,
    },
    {
      label: "Today's Check-ins",
      value: stats.checkins,
      icon: ClipboardCheck,
      color: COLORS.WARNING,
    },
  ];

  const quickActions = [
    {
      label: "Rooms",
      icon: BedDouble,
      path: "/receptionist/rooms",
    },
    {
      label: "Bookings",
      icon: CalendarCheck,
      path: "/receptionist/bookings",
    },
    {
      label: "Check In / Out",
      icon: ClipboardCheck,
      path: "/receptionist/checkinout",
    },
    {
      label: "Profile",
      icon: LayoutDashboard,
      path: "/receptionist/profile",
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
                Receptionist Dashboard
              </h1>

              <p
                className="mt-2"
                style={{
                  color: COLORS.ACCENT,
                }}
              >
                Manage guest bookings, room availability and check-ins.
              </p>

            </div>

          </div>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {dashboardCards.map(
            ({
              label,
              value,
              icon: Icon,
              color,
            }) => (

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
                  <Icon
                    size={22}
                    color={color}
                  />
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
                    color:
                      COLORS.TEXT_SECONDARY,
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
                ({
                  label,
                  icon: Icon,
                  path,
                }) => (

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

          {/* Today's Bookings */}

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
                Today's Bookings
              </h2>

              <Link
                to="/receptionist/bookings"
                style={{
                  color: COLORS.PRIMARY,
                  fontWeight: 600,
                }}
              >
                View All
              </Link>

            </div>

            {bookings.length === 0 ? (

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

                    {bookings.slice(0,5).map((booking) => (

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

        </div>
                {/* Available Rooms */}

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
              Available Rooms
            </h2>

            <Link
              to="/receptionist/rooms"
              style={{
                color: COLORS.PRIMARY,
                fontWeight: 600,
              }}
            >
              View All
            </Link>

          </div>

          {rooms.length === 0 ? (

            <div className="text-center py-10">

              <p
                style={{
                  color: COLORS.TEXT_SECONDARY,
                }}
              >
                No rooms found.
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
                    <th className="text-left py-3">Type</th>
                    <th className="text-left py-3">Price</th>
                    <th className="text-left py-3">Status</th>
                  </tr>

                </thead>

                <tbody>

                  {rooms
                    .filter(
                      (room) =>
                        room.status === "Available"
                    )
                    .slice(0, 5)
                    .map((room) => (

                      <tr
                        key={room._id}
                        style={{
                          borderBottom: `1px solid ${COLORS.BORDER}`,
                        }}
                      >

                        <td className="py-4">
                          {room.roomNumber}
                        </td>

                        <td>
                          {room.type}
                        </td>

                        <td>
                          ${room.price}
                        </td>

                        <td>

                          <span
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                              background: "#EDF8F1",
                              color: COLORS.SUCCESS,
                            }}
                          >
                            {room.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* Recent Check-ins */}

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
              Recent Check-ins
            </h2>

          </div>

          {bookings.length === 0 ? (

            <div className="text-center py-10">

              <p
                style={{
                  color: COLORS.TEXT_SECONDARY,
                }}
              >
                No recent check-ins.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {bookings
                .slice(0, 5)
                .map((booking) => (

                  <div
                    key={booking._id}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{
                      background: COLORS.BACKGROUND,
                      border: `1px solid ${COLORS.BORDER}`,
                    }}
                  >

                    <div>

                      <h3
                        className="font-semibold"
                        style={{
                          color: COLORS.TEXT_PRIMARY,
                        }}
                      >
                        {booking.user?.name || "Guest"}
                      </h3>

                      <p
                        className="text-sm mt-1"
                        style={{
                          color: COLORS.TEXT_SECONDARY,
                        }}
                      >
                        Room {booking.room?.roomNumber || "-"}
                      </p>

                    </div>

                    <div className="text-right">

                      <span
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: "#EDF8F1",
                          color: COLORS.SUCCESS,
                        }}
                      >
                        {booking.status}
                      </span>

                      <p
                        className="text-xs mt-2"
                        style={{
                          color: COLORS.TEXT_SECONDARY,
                        }}
                      >
                        {booking.checkIn
                          ? new Date(
                              booking.checkIn
                            ).toLocaleDateString()
                          : "-"}
                      </p>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

      </main>

    </div>

  );

}

export default ReceptionistDashboard;