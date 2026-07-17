// Reports & Analytics — LuxuryStay Hospitality
// Restyled to use theme.js (Espresso / Champagne Gold / Warm Ivory)
import { useState } from "react";
import AsideBar from "../components/AsideBar"; // adjust path if needed
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../constants/theme"; // adjust path if needed

import {
  DollarSign,
  ClipboardList,
  Percent,
  AlertTriangle,
  Download,
  ChevronDown,
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

// ---- Sample data (swap for API data) ----------------------------------

const monthlyData = [
  { month: "Jan", revenue: 52400, bookings: 38, occupancy: 62 },
  { month: "Feb", revenue: 61200, bookings: 44, occupancy: 68 },
  { month: "Mar", revenue: 74800, bookings: 55, occupancy: 75 },
  { month: "Apr", revenue: 68300, bookings: 50, occupancy: 71 },
  { month: "May", revenue: 79100, bookings: 59, occupancy: 80 },
  { month: "Jun", revenue: 91500, bookings: 67, occupancy: 88 },
  { month: "Jul", revenue: 98200, bookings: 72, occupancy: 93, current: true },
  { month: "Aug", revenue: 95600, bookings: 70, occupancy: 91 },
  { month: "Sep", revenue: 83400, bookings: 61, occupancy: 82 },
  { month: "Oct", revenue: 77800, bookings: 57, occupancy: 77 },
  { month: "Nov", revenue: 66200, bookings: 48, occupancy: 69 },
  { month: "Dec", revenue: 84000, bookings: 62, occupancy: 85 },
];

const totalRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0);
const totalBookings = monthlyData.reduce((s, m) => s + m.bookings, 0);
const avgOccupancy = Math.round(
  monthlyData.reduce((s, m) => s + m.occupancy, 0) / monthlyData.length
);

const roomRevenue = [
  { type: "Presidential Suite", amount: 142000, pct: 18 },
  { type: "Executive Suite", amount: 198000, pct: 25 },
  { type: "Suite", amount: 176000, pct: 22 },
  { type: "Deluxe King", amount: 124000, pct: 16 },
  { type: "Deluxe Double", amount: 86000, pct: 11 },
  { type: "Standard Twin", amount: 62000, pct: 8 },
];

const extraCharges = [
  { label: "Room Service", amount: 12400, count: 84 },
  { label: "Food & Beverages", amount: 21800, count: 142 },
  { label: "Laundry", amount: 4200, count: 67 },
  { label: "Mini Bar", amount: 8600, count: 110 },
  { label: "Other Charges", amount: 3100, count: 38 },
];
const totalExtra = extraCharges.reduce((s, c) => s + c.amount, 0);
const maxExtra = Math.max(...extraCharges.map((c) => c.amount));

const invoices = [
  { id: "INV-1001", guest: "James Morrison", room: "#101", type: "Deluxe King", amount: 940, status: "Paid", date: "Jul 1, 2026" },
  { id: "INV-1002", guest: "Sarah Chen", room: "#204", type: "Suite", amount: 1920, status: "Unpaid", date: "Jun 30, 2026" },
  { id: "INV-1003", guest: "Robert Klein", room: "#315", type: "Standard Twin", amount: 242, status: "Paid", date: "Jun 30, 2026" },
  { id: "INV-1004", guest: "Amara Osei", room: "#412", type: "Executive Suite", amount: 2970, status: "Paid", date: "Jun 29, 2026" },
  { id: "INV-1005", guest: "Lucas Fernández", room: "#509", type: "Deluxe Double", amount: 352, status: "Unpaid", date: "Jul 1, 2026" },
  { id: "INV-1006", guest: "Mei Tanaka", room: "#301", type: "Suite", amount: 1408, status: "Paid", date: "Jun 28, 2026" },
  { id: "INV-1007", guest: "Carlos Ruiz", room: "#118", type: "Deluxe King", amount: 720, status: "Paid", date: "Jun 27, 2026" },
];

const fmtMoney = (n) => `$${n.toLocaleString()}`;

// ---- Small building blocks ---------------------------------------------

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
        {icon}
      </div>
      <p style={{ marginTop: 18, color: COLORS.TEXT_SECONDARY, fontFamily: FONTS.BODY, fontSize: 14 }}>
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
        <p style={{ marginTop: 6, fontSize: 13, fontFamily: FONTS.BODY, color: subColor || COLORS.TEXT_SECONDARY }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function ProgressRow({ label, sublabel, amount, pct, barColor }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: FONTS.BODY, fontWeight: 600, color: COLORS.TEXT_PRIMARY, fontSize: 15 }}>
          {label}
        </span>
        <span style={{ fontFamily: FONTS.BODY, fontWeight: 700, color: COLORS.TEXT_PRIMARY, fontSize: 15 }}>
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
            width: `${pct}%`,
            height: "100%",
            background: barColor || COLORS.ACCENT,
            borderRadius: BORDER_RADIUS.PILL,
          }}
        />
      </div>
      {sublabel && (
        <p style={{ marginTop: 6, fontSize: 12, color: COLORS.MUTED, fontFamily: FONTS.BODY }}>{sublabel}</p>
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
        background: paid ? "rgba(47,107,79,0.1)" : "rgba(194,138,46,0.12)",
      }}
    >
      {status}
    </span>
  );
}

// ---- Page ----------------------------------------------------------------

function ReportsPage() {
  const [metric, setMetric] = useState("revenue"); // revenue | occupancy | bookings
  const [period, setPeriod] = useState("Year");

  const metricLabel = { revenue: "Revenue", occupancy: "Occupancy", bookings: "Bookings" };
  const peakMonth = monthlyData.reduce((a, b) => (b.revenue > a.revenue ? b : a));
  const bestOccMonth = monthlyData.reduce((a, b) => (b.occupancy > a.occupancy ? b : a));

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.BACKGROUND, fontFamily: FONTS.BODY }}>
      <AsideBar />

      <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {/* Breadcrumb */}
        <p style={{ fontSize: 13, color: COLORS.TEXT_SECONDARY, marginBottom: 10 }}>
          Dashboard <span style={{ color: COLORS.MUTED }}>›</span>{" "}
          <span style={{ color: COLORS.TEXT_PRIMARY, fontWeight: 600 }}>Reports</span>
        </p>

        {/* Header — filled banner, matching the app's signature header style */}
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY} 0%, #2E2620 100%)`,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
            padding: "32px 36px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div>
            <h1 style={{ fontFamily: FONTS.HEADING, fontSize: 34, fontWeight: 700, color: COLORS.CREAM }}>
              Reports & Analytics
            </h1>
            <p style={{ marginTop: 8, color: COLORS.ACCENT, fontSize: 15 }}>
              Revenue trends, occupancy rates, and billing performance
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: BORDER_RADIUS.MEDIUM,
                padding: "8px 14px",
                color: COLORS.CREAM,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              2026 <ChevronDown size={16} color={COLORS.ACCENT} />
            </div>

            <div
              style={{
                display: "flex",
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
                    color: period === p ? COLORS.PRIMARY : COLORS.CREAM,
                    background: period === p ? COLORS.ACCENT : "transparent",
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
                padding: "10px 18px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 24 }}>
          <StatCard
            icon={<DollarSign color={COLORS.ACCENT} size={24} />}
            label="Annual Revenue"
            value={fmtMoney(totalRevenue)}
            sub="2026 total"
            subColor={COLORS.SUCCESS}
          />
          <StatCard
            icon={<ClipboardList color={COLORS.ACCENT} size={24} />}
            label="Total Bookings"
            value={totalBookings}
            sub={`Avg ${Math.round(totalBookings / 12)}/month`}
            subColor={COLORS.INFO}
          />
          <StatCard
            icon={<Percent color={COLORS.ACCENT} size={24} />}
            label="Avg Occupancy"
            value={`${avgOccupancy}%`}
            sub="Across all room types"
            subColor={COLORS.ACCENT}
          />
          <StatCard
            icon={<AlertTriangle color={COLORS.WARNING} size={24} />}
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
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 22, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                Performance Overview
              </h2>
              <p style={{ color: COLORS.TEXT_SECONDARY, fontSize: 13, marginTop: 4 }}>Monthly data for 2026</p>
            </div>
            <div style={{ display: "flex", background: COLORS.CREAM, borderRadius: BORDER_RADIUS.MEDIUM, padding: 4 }}>
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
                    color: metric === m ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY,
                    background: metric === m ? COLORS.SURFACE : "transparent",
                    boxShadow: metric === m ? SHADOWS.DROPDOWN : "none",
                  }}
                >
                  {metricLabel[m]}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            {metric === "occupancy" ? (
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.BORDER} />
                <XAxis dataKey="month" stroke={COLORS.TEXT_SECONDARY} fontSize={12} />
                <YAxis stroke={COLORS.TEXT_SECONDARY} fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.BORDER}` }} />
                <Line type="monotone" dataKey="occupancy" stroke={COLORS.ACCENT} strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            ) : (
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.BORDER} />
                <XAxis dataKey="month" stroke={COLORS.TEXT_SECONDARY} fontSize={12} />
                <YAxis stroke={COLORS.TEXT_SECONDARY} fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.BORDER}` }} />
                <Bar dataKey={metric} radius={[8, 8, 0, 0]}>
                  {monthlyData.map((d, i) => (
                    <Bar key={i} dataKey={metric} fill={d.current ? COLORS.ACCENT : COLORS.PRIMARY} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
              marginTop: 20,
              paddingTop: 20,
              borderTop: `1px solid ${COLORS.BORDER}`,
              textAlign: "center",
            }}
          >
            <div>
              <p style={{ fontSize: 12, color: COLORS.TEXT_SECONDARY, letterSpacing: 0.5 }}>PEAK MONTH</p>
              <p style={{ fontWeight: 700, color: COLORS.TEXT_PRIMARY, marginTop: 4 }}>
                {peakMonth.month} (highest revenue)
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: COLORS.TEXT_SECONDARY, letterSpacing: 0.5 }}>BEST OCCUPANCY</p>
              <p style={{ fontWeight: 700, color: COLORS.TEXT_PRIMARY, marginTop: 4 }}>
                {bestOccMonth.month} ({bestOccMonth.occupancy}%)
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: COLORS.TEXT_SECONDARY, letterSpacing: 0.5 }}>TOTAL BOOKINGS</p>
              <p style={{ fontWeight: 700, color: COLORS.TEXT_PRIMARY, marginTop: 4 }}>{totalBookings} guest nights</p>
            </div>
          </div>
        </div>

        {/* Room revenue + extra charges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, marginBottom: 24 }}>
          <div
            style={{
              background: COLORS.SURFACE,
              borderRadius: BORDER_RADIUS.LARGE,
              boxShadow: SHADOWS.CARD,
              border: `1px solid ${COLORS.BORDER}`,
              padding: 24,
            }}
          >
            <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 20, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
              Revenue by Room Type
            </h2>
            <p style={{ color: COLORS.TEXT_SECONDARY, fontSize: 13, marginTop: 4, marginBottom: 20 }}>
              Breakdown of income per category
            </p>
            {roomRevenue.map((r) => (
              <ProgressRow
                key={r.type}
                label={r.type}
                amount={r.amount}
                pct={r.pct * 4}
                sublabel={`${r.pct}% of total revenue`}
              />
            ))}
          </div>

          <div
            style={{
              background: COLORS.SURFACE,
              borderRadius: BORDER_RADIUS.LARGE,
              boxShadow: SHADOWS.CARD,
              border: `1px solid ${COLORS.BORDER}`,
              padding: 24,
            }}
          >
            <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 20, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
              Extra Charges Breakdown
            </h2>
            <p style={{ color: COLORS.TEXT_SECONDARY, fontSize: 13, marginTop: 4, marginBottom: 20 }}>
              Revenue from additional services
            </p>
            {extraCharges.map((c) => (
              <ProgressRow
                key={c.label}
                label={c.label}
                amount={c.amount}
                pct={(c.amount / maxExtra) * 100}
                sublabel={`${c.count} transactions`}
                barColor={COLORS.PRIMARY}
              />
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 16,
                marginTop: 4,
                borderTop: `1px solid ${COLORS.BORDER}`,
              }}
            >
              <span style={{ fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>Total Extra Revenue</span>
              <span style={{ fontWeight: 700, color: COLORS.ACCENT }}>{fmtMoney(totalExtra)}</span>
            </div>
          </div>
        </div>

        {/* Monthly summary table */}
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
          <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 22, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
            Monthly Summary Table
          </h2>
          <p style={{ color: COLORS.TEXT_SECONDARY, fontSize: 13, marginTop: 4, marginBottom: 16 }}>
            All 12 months for 2026
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: COLORS.PRIMARY }}>
                {["Month", "Revenue", "Bookings", "Occupancy", "Avg/Booking", "vs. Prior"].map((h) => (
                  <th
                    key={h}
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
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m, i) => {
                const prior = i > 0 ? monthlyData[i - 1].revenue : null;
                const change = prior ? (((m.revenue - prior) / prior) * 100).toFixed(1) : null;
                return (
                  <tr
                    key={m.month}
                    style={{
                      background: m.current ? COLORS.CREAM : "transparent",
                      borderBottom: `1px solid ${COLORS.BORDER}`,
                    }}
                  >
                    <td style={{ padding: "12px 14px", fontWeight: 600, color: COLORS.TEXT_PRIMARY }}>
                      {m.month}
                      {m.current && (
                        <span
                          style={{
                            marginLeft: 8,
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: BORDER_RADIUS.PILL,
                            background: COLORS.PRIMARY,
                            color: COLORS.CREAM,
                          }}
                        >
                          Current
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                      {fmtMoney(m.revenue)}
                    </td>
                    <td style={{ padding: "12px 14px", color: COLORS.TEXT_SECONDARY }}>{m.bookings}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 70, height: 5, borderRadius: 4, background: COLORS.BORDER }}>
                          <div
                            style={{
                              width: `${m.occupancy}%`,
                              height: "100%",
                              borderRadius: 4,
                              background: COLORS.ACCENT,
                            }}
                          />
                        </div>
                        <span style={{ color: COLORS.TEXT_SECONDARY, fontSize: 13 }}>{m.occupancy}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 14px", color: COLORS.TEXT_SECONDARY }}>
                      ${Math.round(m.revenue / m.bookings)}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 600, color: change === null ? COLORS.MUTED : change < 0 ? COLORS.ERROR : COLORS.SUCCESS }}>
                      {change === null ? "—" : `${change > 0 ? "↑" : "↓"} ${Math.abs(change)}%`}
                    </td>
                  </tr>
                );
              })}
              <tr style={{ fontWeight: 700 }}>
                <td style={{ padding: "12px 14px", color: COLORS.TEXT_PRIMARY }}>Total / Avg</td>
                <td style={{ padding: "12px 14px", color: COLORS.ACCENT }}>{fmtMoney(totalRevenue)}</td>
                <td style={{ padding: "12px 14px", color: COLORS.TEXT_PRIMARY }}>{totalBookings}</td>
                <td style={{ padding: "12px 14px", color: COLORS.TEXT_PRIMARY }}>{avgOccupancy}%</td>
                <td style={{ padding: "12px 14px", color: COLORS.TEXT_PRIMARY }}>
                  ${Math.round(totalRevenue / totalBookings)}
                </td>
                <td style={{ padding: "12px 14px", color: COLORS.MUTED }}>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recent invoices */}
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <div>
              <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 22, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                Recent Invoices
              </h2>
              <p style={{ color: COLORS.TEXT_SECONDARY, fontSize: 13, marginTop: 4 }}>
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

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginTop: 16 }}>
            <thead>
              <tr>
                {["Invoice", "Guest", "Room", "Room Type", "Amount", "Status", "Date"].map((h) => (
                  <th
                    key={h}
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
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: `1px solid ${COLORS.BORDER}` }}>
                  <td style={{ padding: "12px 14px", fontWeight: 700, color: COLORS.ACCENT }}>{inv.id}</td>
                  <td style={{ padding: "12px 14px", color: COLORS.TEXT_PRIMARY }}>{inv.guest}</td>
                  <td style={{ padding: "12px 14px", color: COLORS.TEXT_SECONDARY }}>{inv.room}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: BORDER_RADIUS.PILL,
                        background: COLORS.CREAM,
                        color: COLORS.PRIMARY,
                      }}
                    >
                      {inv.type}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                    {fmtMoney(inv.amount)}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <StatusPill status={inv.status} />
                  </td>
                  <td style={{ padding: "12px 14px", color: COLORS.TEXT_SECONDARY }}>{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ReportsPage;
