import { useEffect, useState } from "react";
import AsideBar from "../components/AsideBar";
import reportApi from "../api/reportApi";
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../constants/theme";

import {
DollarSign,
ClipboardList,
Percent,
AlertTriangle,
Download,
BarChart2,
} from "lucide-react";

import {
ResponsiveContainer,
BarChart,
Bar,
LineChart,
Line,
CartesianGrid,
Tooltip,
XAxis,
YAxis,
} from "recharts";

// -----------------------------------------------------
// Helpers
// -----------------------------------------------------

const fmtMoney = (n = 0) => `$${Number(n).toLocaleString()}`;

// -----------------------------------------------------
// Small Building Blocks
// -----------------------------------------------------

function StatCard({ icon, label, value, sub, subColor }) {
return (
<div
style={{
background: COLORS.SURFACE,
borderRadius: BORDER_RADIUS.LARGE,
boxShadow: SHADOWS.CARD,
border: `1px solid ${COLORS.BORDER}`,
padding: "24px",
}}
>
<div
style={{
width: 48,
height: 48,
borderRadius: BORDER_RADIUS.MEDIUM,
background: COLORS.CREAM,
display: "flex",
alignItems: "center",
justifyContent: "center",
}}
>
{icon} </div>


  <p
    style={{
      marginTop: 18,
      color: COLORS.TEXT_SECONDARY,
      fontFamily: FONTS.BODY,
      fontSize: 14,
    }}
  >
    {label}
  </p>

  <h2
    style={{
      marginTop: 6,
      fontFamily: FONTS.HEADING,
      fontSize: 30,
      fontWeight: 700,
      color: COLORS.TEXT_PRIMARY,
    }}
  >
    {value}
  </h2>

  {sub && (
    <p
      style={{
        marginTop: 6,
        fontSize: 13,
        fontFamily: FONTS.BODY,
        color: subColor || COLORS.TEXT_SECONDARY,
      }}
    >
      {sub}
    </p>
  )}
</div>

);
}

function ProgressRow({
label,
sublabel,
amount,
pct,
barColor,
}) {
return (
<div style={{ marginBottom: 20 }}>
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "baseline",
}}
>
<span
style={{
fontFamily: FONTS.BODY,
fontWeight: 600,
color: COLORS.TEXT_PRIMARY,
fontSize: 15,
}}
>
{label} </span>

    <span
      style={{
        fontFamily: FONTS.BODY,
        fontWeight: 700,
        color: COLORS.TEXT_PRIMARY,
        fontSize: 15,
      }}
    >
      {fmtMoney(amount)}
    </span>
  </div>

  <div
    style={{
      marginTop: 8,
      height: 6,
      borderRadius: BORDER_RADIUS.PILL,
      background: COLORS.BORDER,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${Math.min(pct, 100)}%`,
        height: "100%",
        background: barColor || COLORS.ACCENT,
        borderRadius: BORDER_RADIUS.PILL,
      }}
    />
  </div>

  {sublabel && (
    <p
      style={{
        marginTop: 6,
        fontSize: 12,
        color: COLORS.MUTED,
        fontFamily: FONTS.BODY,
      }}
    >
      {sublabel}
    </p>
  )}
</div>

);
}

function StatusPill({ status }) {
const paid = status === "Paid";

return (
<span
style={{
fontFamily: FONTS.BODY,
fontSize: 12,
fontWeight: 600,
padding: "4px 12px",
borderRadius: BORDER_RADIUS.PILL,
color: paid ? COLORS.SUCCESS : COLORS.WARNING,
background: paid
? "rgba(47,107,79,0.1)"
: "rgba(194,138,46,0.12)",
}}
>
{status} </span>
);
}

// -----------------------------------------------------
// Reports Page
// -----------------------------------------------------

function ReportsPage() {
const [metric, setMetric] = useState("revenue");
const [period, setPeriod] = useState("Year");

const [dashboardData, setDashboardData] = useState(null);
const [roomRevenueData, setRoomRevenueData] = useState([]);
const [extraChargesData, setExtraChargesData] = useState([]);
const [monthlyReportData, setMonthlyReportData] = useState([]);
const [invoicesData, setInvoicesData] = useState([]);

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

// -----------------------------------------------------
// Fetch Reports Data
// -----------------------------------------------------

useEffect(() => {
const fetchAllReports = async () => {
try {
setLoading(true);
setError("");

const [
      dashboard,
      roomRevenue,
      extraCharges,
      monthlyReport,
      invoices,
    ] = await Promise.all([
      reportApi.getDashboardStats(),
      reportApi.getRevenueByRoomType(),
      reportApi.getExtraCharges(),
      reportApi.getMonthlyReport(),
      reportApi.getInvoices(),
    ]);

    setDashboardData(dashboard.data);

    setRoomRevenueData(
      roomRevenue.data?.roomRevenue || []
    );

    setExtraChargesData(
      extraCharges.data?.extraCharges || []
    );

    setMonthlyReportData(
      monthlyReport.data?.monthlyData || []
    );

    setInvoicesData(
      invoices.data?.billings || []
    );
  } catch (err) {
    console.error("Error fetching reports:", err);
    setError("Failed to load reports. Please try again.");
  } finally {
    setLoading(false);
  }
};

fetchAllReports();

}, []);

// -----------------------------------------------------
// Dashboard Stats
// -----------------------------------------------------

const stats = dashboardData?.stats || {
occupancyRate: 0,
revenueToday: 0,
totalRooms: 0,
bookingsToday: 0,
};

// -----------------------------------------------------
// Monthly Data
// -----------------------------------------------------

const monthlyData =
monthlyReportData.length > 0
? monthlyReportData
: [
{
month: "—",
revenue: 0,
bookings: 0,
occupancy: 0,
},
];

const totalRevenue = monthlyData.reduce(
(sum, month) => sum + Number(month.revenue || 0),
0
);

const totalBookings = monthlyData.reduce(
(sum, month) => sum + Number(month.bookings || 0),
0
);

const avgOccupancy = Math.round(
monthlyData.reduce(
(sum, month) => sum + Number(month.occupancy || 0),
0
) / monthlyData.length
);

const peakMonth = monthlyData.reduce((a, b) =>
b.revenue > a.revenue ? b : a
);

const bestOccMonth = monthlyData.reduce((a, b) =>
b.occupancy > a.occupancy ? b : a
);

// -----------------------------------------------------
// Room Revenue
// -----------------------------------------------------

const maxRoomRevenue = Math.max(
...roomRevenueData.map((room) => Number(room.amount || 0)),
1
);

const roomRevenue = roomRevenueData.map((room) => ({
type: room.type,
amount: room.amount,
pct: (Number(room.amount || 0) / maxRoomRevenue) * 100,
actualPct: room.pct,
}));

// -----------------------------------------------------
// Extra Charges
// -----------------------------------------------------

const extraCharges = extraChargesData;

const totalExtra = extraCharges.reduce(
(sum, charge) => sum + Number(charge.amount || 0),
0
);

const maxExtra = Math.max(
...extraCharges.map((charge) => Number(charge.amount || 0)),
1
);

// -----------------------------------------------------
// Invoices
// -----------------------------------------------------

const invoices = invoicesData.map((billing) => ({
id: billing.invoiceNumber || "—",

guest:
  billing.guest?.name ||
  billing.booking?.guest?.name ||
  "—",

room: billing.booking?.room
  ? `#${billing.booking.room.roomNumber}`
  : "—",

type:
  billing.booking?.room?.type ||
  "—",

amount: billing.totalAmount || 0,

status:
  billing.paymentStatus === "paid"
    ? "Paid"
    : "Unpaid",

date: billing.createdAt
  ? new Date(billing.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    )
  : "—",

}));

const metricLabel = {
revenue: "Revenue",
occupancy: "Occupancy",
bookings: "Bookings",
};

// -----------------------------------------------------
// JSX
// -----------------------------------------------------

return (
<div
style={{
display: "flex",
minHeight: "100vh",
background: COLORS.BACKGROUND,
fontFamily: FONTS.BODY,
}}
> <AsideBar />

  <main
    style={{
      flex: 1,
      padding: "32px",
      overflowY: "auto",
    }}
  >
    {/* Header */}

    <div
      className="mb-8 p-8"
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
            backgroundColor: COLORS.ACCENT,
            borderRadius: BORDER_RADIUS.LARGE,
          }}
        >
          <BarChart2
            size={35}
            style={{
              color: COLORS.PRIMARY,
            }}
          />
        </div>

        <div>
          <h1
            className="text-4xl font-bold"
            style={{
              color: "#fff",
              fontFamily: FONTS.HEADING,
            }}
          >
            Reports And Analytics
          </h1>

          <p
            className="mt-2"
            style={{
              color: COLORS.ACCENT,
              fontFamily: FONTS.BODY,
            }}
          >
            View your hotel's performance, revenue, occupancy, and billing analytics.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: BORDER_RADIUS.MEDIUM,
            overflow: "hidden",
          }}
        >
          {["Year", "Quarter", "Month"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: FONTS.BODY,
                color:
                  period === p
                    ? COLORS.PRIMARY
                    : COLORS.CREAM,
                background:
                  period === p
                    ? COLORS.ACCENT
                    : "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: COLORS.ACCENT,
            color: COLORS.PRIMARY,
            border: "none",
            borderRadius: BORDER_RADIUS.MEDIUM,
            padding: 10,
            fontWeight: 700,
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          <Download size={16} />
          Export Report
        </button>
      </div>
    </div>

    {/* Error */}

    {error && (
      <div
        style={{
          marginBottom: 16,
          padding: "10px 16px",
          borderRadius: BORDER_RADIUS.MEDIUM,
          background: "rgba(194,138,46,0.12)",
          color: COLORS.WARNING,
          fontSize: 13,
          fontFamily: FONTS.BODY,
        }}
      >
        {error}
      </div>
    )}

    {/* Stat Cards */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
        marginBottom: 24,
      }}
    >
      <StatCard
        icon={
          <DollarSign
            color={COLORS.ACCENT}
            size={24}
          />
        }
        label="Revenue Today"
        value={
          loading
            ? "…"
            : fmtMoney(stats.revenueToday)
        }
        sub="Today's total"
        subColor={COLORS.SUCCESS}
      />

      <StatCard
        icon={
          <ClipboardList
            color={COLORS.ACCENT}
            size={24}
          />
        }
        label="Bookings Today"
        value={
          loading
            ? "…"
            : stats.bookingsToday
        }
        sub={`${stats.totalRooms} total rooms`}
        subColor={COLORS.INFO}
      />

      <StatCard
        icon={
          <Percent
            color={COLORS.ACCENT}
            size={24}
          />
        }
        label="Occupancy Rate"
        value={
          loading
            ? "…"
            : `${stats.occupancyRate}%`
        }
        sub="Right now"
        subColor={COLORS.ACCENT}
      />

      <StatCard
        icon={
          <AlertTriangle
            color={COLORS.WARNING}
            size={24}
          />
        }
        label="Outstanding Bills"
        value="$2.3k"
        sub="Awaiting payment"
        subColor={COLORS.WARNING}
      />
    </div>

    {/* Performance Overview */}

    <div
      style={{
        background: COLORS.SURFACE,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
        border: `1px solid ${COLORS.BORDER}`,
        padding: 24,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: FONTS.HEADING,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.TEXT_PRIMARY,
            }}
          >
            Performance Overview
          </h2>

          <p
            style={{
              color: COLORS.TEXT_SECONDARY,
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Monthly data for 2026
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: COLORS.CREAM,
            borderRadius: BORDER_RADIUS.MEDIUM,
            padding: 4,
          }}
        >
          {["revenue", "occupancy", "bookings"].map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              style={{
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: FONTS.BODY,
                borderRadius: BORDER_RADIUS.SMALL,
                border: "none",
                cursor: "pointer",
                color:
                  metric === m
                    ? COLORS.PRIMARY
                    : COLORS.TEXT_SECONDARY,
                background:
                  metric === m
                    ? COLORS.SURFACE
                    : "transparent",
                boxShadow:
                  metric === m
                    ? SHADOWS.DROPDOWN
                    : "none",
              }}
            >
              {metricLabel[m]}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        {metric === "occupancy" ? (
          <LineChart data={monthlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={COLORS.BORDER}
            />

            <XAxis
              dataKey="month"
              stroke={COLORS.TEXT_SECONDARY}
              fontSize={12}
            />

            <YAxis
              stroke={COLORS.TEXT_SECONDARY}
              fontSize={12}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: `1px solid ${COLORS.BORDER}`,
              }}
            />

            <Line
              type="monotone"
              dataKey="occupancy"
              stroke={COLORS.ACCENT}
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        ) : (
          <BarChart data={monthlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={COLORS.BORDER}
            />

            <XAxis
              dataKey="month"
              stroke={COLORS.TEXT_SECONDARY}
              fontSize={12}
            />

            <YAxis
              stroke={COLORS.TEXT_SECONDARY}
              fontSize={12}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: `1px solid ${COLORS.BORDER}`,
              }}
            />

            <Bar
              dataKey={metric}
              fill={COLORS.PRIMARY}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginTop: 20,
          paddingTop: 20,
          borderTop: `1px solid ${COLORS.BORDER}`,
          textAlign: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              color: COLORS.TEXT_SECONDARY,
              letterSpacing: 0.5,
            }}
          >
            PEAK MONTH
          </p>

          <p
            style={{
              fontWeight: 700,
              color: COLORS.TEXT_PRIMARY,
              marginTop: 4,
            }}
          >
            {peakMonth.month}
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: 12,
              color: COLORS.TEXT_SECONDARY,
              letterSpacing: 0.5,
            }}
          >
            BEST OCCUPANCY
          </p>

          <p
            style={{
              fontWeight: 700,
              color: COLORS.TEXT_PRIMARY,
              marginTop: 4,
            }}
          >
            {bestOccMonth.month} (
            {bestOccMonth.occupancy}%)
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: 12,
              color: COLORS.TEXT_SECONDARY,
              letterSpacing: 0.5,
            }}
          >
            TOTAL BOOKINGS
          </p>

          <p
            style={{
              fontWeight: 700,
              color: COLORS.TEXT_PRIMARY,
              marginTop: 4,
            }}
          >
            {totalBookings}
          </p>
        </div>
      </div>
    </div>

    {/* Revenue By Room Type + Extra Charges */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(340px, 1fr))",
        gap: 24,
        marginBottom: 24,
      }}
    >
      {/* Room Revenue */}

      <div
        style={{
          background: COLORS.SURFACE,
          borderRadius: BORDER_RADIUS.LARGE,
          boxShadow: SHADOWS.CARD,
          border: `1px solid ${COLORS.BORDER}`,
          padding: 24,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.HEADING,
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.TEXT_PRIMARY,
          }}
        >
          Revenue by Room Type
        </h2>

        <p
          style={{
            color: COLORS.TEXT_SECONDARY,
            fontSize: 13,
            marginTop: 4,
            marginBottom: 20,
          }}
        >
          Breakdown of income per category
        </p>

        {roomRevenue.length === 0 ? (
          <p
            style={{
              color: COLORS.TEXT_SECONDARY,
              fontSize: 14,
            }}
          >
            No room revenue data available.
          </p>
        ) : (
          roomRevenue.map((room) => (
            <ProgressRow
              key={room.type}
              label={room.type}
              amount={room.amount}
              pct={room.pct}
              sublabel={`${room.actualPct || 0}% of total revenue`}
            />
          ))
        )}
      </div>

      {/* Extra Charges */}

      <div
        style={{
          background: COLORS.SURFACE,
          borderRadius: BORDER_RADIUS.LARGE,
          boxShadow: SHADOWS.CARD,
          border: `1px solid ${COLORS.BORDER}`,
          padding: 24,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.HEADING,
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.TEXT_PRIMARY,
          }}
        >
          Extra Charges Breakdown
        </h2>

        <p
          style={{
            color: COLORS.TEXT_SECONDARY,
            fontSize: 13,
            marginTop: 4,
            marginBottom: 20,
          }}
        >
          Revenue from additional services
        </p>

        {extraCharges.length === 0 ? (
          <p
            style={{
              color: COLORS.TEXT_SECONDARY,
              fontSize: 14,
            }}
          >
            No extra charges available.
          </p>
        ) : (
          extraCharges.map((charge) => (
            <ProgressRow
              key={charge.label}
              label={charge.label}
              amount={charge.amount}
              pct={
                (charge.amount / maxExtra) * 100
              }
              sublabel={`${charge.count} transactions`}
              barColor={COLORS.PRIMARY}
            />
          ))
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 16,
            marginTop: 4,
            borderTop: `1px solid ${COLORS.BORDER}`,
          }}
        >
          <span
            style={{
              fontWeight: 700,
              color: COLORS.TEXT_PRIMARY,
            }}
          >
            Total Extra Revenue
          </span>

          <span
            style={{
              fontWeight: 700,
              color: COLORS.ACCENT,
            }}
          >
            {fmtMoney(totalExtra)}
          </span>
        </div>
      </div>
    </div>

    {/* Monthly Summary Table */}

    <div
      style={{
        background: COLORS.SURFACE,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
        border: `1px solid ${COLORS.BORDER}`,
        padding: 24,
        marginBottom: 24,
        overflowX: "auto",
      }}
    >
      <h2
        style={{
          fontFamily: FONTS.HEADING,
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.TEXT_PRIMARY,
        }}
      >
        Monthly Summary Table
      </h2>

      <p
        style={{
          color: COLORS.TEXT_SECONDARY,
          fontSize: 13,
          marginTop: 4,
          marginBottom: 16,
        }}
      >
        All 12 months for 2026
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
        }}
      >
        <thead>
          <tr
            style={{
              background: COLORS.PRIMARY,
            }}
          >
            {[
              "Month",
              "Revenue",
              "Bookings",
              "Occupancy",
              "Avg/Booking",
              "vs. Prior",
            ].map((heading) => (
              <th
                key={heading}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  color: COLORS.CREAM,
                  fontSize: 11,
                  letterSpacing: 0.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {monthlyData.map((month, index) => {
            const prior =
              index > 0
                ? monthlyData[index - 1].revenue
                : null;

            const change =
              prior && prior !== 0
                ? (
                    ((month.revenue - prior) /
                      prior) *
                    100
                  ).toFixed(1)
                : null;

            return (
              <tr
                key={`${month.month}-${index}`}
                style={{
                  background: month.current
                    ? COLORS.CREAM
                    : "transparent",
                  borderBottom: `1px solid ${COLORS.BORDER}`,
                }}
              >
                <td
                  style={{
                    padding: "12px 14px",
                    fontWeight: 600,
                    color: COLORS.TEXT_PRIMARY,
                  }}
                >
                  {month.month}

                  {month.current && (
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius:
                          BORDER_RADIUS.PILL,
                        background: COLORS.PRIMARY,
                        color: COLORS.CREAM,
                      }}
                    >
                      Current
                    </span>
                  )}
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: COLORS.TEXT_PRIMARY,
                  }}
                >
                  {fmtMoney(month.revenue)}
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                    color: COLORS.TEXT_SECONDARY,
                  }}
                >
                  {month.bookings}
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 70,
                        height: 5,
                        borderRadius: 4,
                        background: COLORS.BORDER,
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(
                            month.occupancy,
                            100
                          )}%`,
                          height: "100%",
                          borderRadius: 4,
                          background: COLORS.ACCENT,
                        }}
                      />
                    </div>

                    <span
                      style={{
                        color: COLORS.TEXT_SECONDARY,
                        fontSize: 13,
                      }}
                    >
                      {month.occupancy}%
                    </span>
                  </div>
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                    color: COLORS.TEXT_SECONDARY,
                  }}
                >
                  {month.bookings
                    ? fmtMoney(
                        Math.round(
                          month.revenue /
                            month.bookings
                        )
                      )
                    : "$0"}
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                    fontWeight: 600,
                    color:
                      change === null
                        ? COLORS.MUTED
                        : change < 0
                        ? COLORS.ERROR
                        : COLORS.SUCCESS,
                  }}
                >
                  {change === null
                    ? "—"
                    : `${change > 0 ? "↑" : "↓"} ${Math.abs(
                        change
                      )}%`}
                </td>
              </tr>
            );
          })}

          <tr
            style={{
              fontWeight: 700,
            }}
          >
            <td
              style={{
                padding: "12px 14px",
                color: COLORS.TEXT_PRIMARY,
              }}
            >
              Total / Avg
            </td>

            <td
              style={{
                padding: "12px 14px",
                color: COLORS.ACCENT,
              }}
            >
              {fmtMoney(totalRevenue)}
            </td>

            <td
              style={{
                padding: "12px 14px",
                color: COLORS.TEXT_PRIMARY,
              }}
            >
              {totalBookings}
            </td>

            <td
              style={{
                padding: "12px 14px",
                color: COLORS.TEXT_PRIMARY,
              }}
            >
              {avgOccupancy}%
            </td>

            <td
              style={{
                padding: "12px 14px",
                color: COLORS.TEXT_PRIMARY,
              }}
            >
              {totalBookings
                ? fmtMoney(
                    Math.round(
                      totalRevenue /
                        totalBookings
                    )
                  )
                : "$0"}
            </td>

            <td
              style={{
                padding: "12px 14px",
                color: COLORS.MUTED,
              }}
            >
              —
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Recent Invoices */}

    <div
      style={{
        background: COLORS.SURFACE,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
        border: `1px solid ${COLORS.BORDER}`,
        padding: 24,
        overflowX: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: FONTS.HEADING,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.TEXT_PRIMARY,
            }}
          >
            Recent Invoices
          </h2>

          <p
            style={{
              color: COLORS.TEXT_SECONDARY,
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Latest billing activity across all bookings
          </p>
        </div>

        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: BORDER_RADIUS.PILL,
            background: COLORS.CREAM,
            color: COLORS.TEXT_SECONDARY,
          }}
        >
          {invoices.length} records
        </span>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
          marginTop: 16,
        }}
      >
        <thead>
          <tr>
            {[
              "Invoice",
              "Guest",
              "Room",
              "Room Type",
              "Amount",
              "Status",
              "Date",
            ].map((heading) => (
              <th
                key={heading}
                style={{
                  textAlign: "left",
                  padding: "8px 14px",
                  fontSize: 11,
                  letterSpacing: 0.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: COLORS.TEXT_SECONDARY,
                  borderBottom: `1px solid ${COLORS.BORDER}`,
                }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  padding: 24,
                  textAlign: "center",
                  color: COLORS.TEXT_SECONDARY,
                }}
              >
                No invoices available.
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr
                key={invoice.id}
                style={{
                  borderBottom: `1px solid ${COLORS.BORDER}`,
                }}
              >
                <td
                  style={{
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: COLORS.ACCENT,
                  }}
                >
                  {invoice.id}
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                    color: COLORS.TEXT_PRIMARY,
                  }}
                >
                  {invoice.guest}
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                    color: COLORS.TEXT_SECONDARY,
                  }}
                >
                  {invoice.room}
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius:
                        BORDER_RADIUS.PILL,
                      background: COLORS.CREAM,
                      color: COLORS.PRIMARY,
                    }}
                  >
                    {invoice.type}
                  </span>
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: COLORS.TEXT_PRIMARY,
                  }}
                >
                  {fmtMoney(invoice.amount)}
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                  }}
                >
                  <StatusPill
                    status={invoice.status}
                  />
                </td>

                <td
                  style={{
                    padding: "12px 14px",
                    color: COLORS.TEXT_SECONDARY,
                  }}
                >
                  {invoice.date}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </main>
</div>

);
}

export default ReportsPage;
