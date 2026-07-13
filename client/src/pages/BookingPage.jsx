import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { HiTrash, HiPencilAlt, HiSearch } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import StatusBadge from "../components/StatusBadge";
import bookingApi from "../api/bookingApi";
import { ROLES } from "../constants/roles";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";
import AsideBar from "../components/AsideBar";




// import getDashboardLinks from "../utils/dashboardLinks.jsx";

const STATUS_FLOW = ["pending", "confirmed", "checked-in", "checked-out", "cancelled"];

const STATUS_COLORS = {
  pending: COLORS.WARNING,
  confirmed: COLORS.INFO,
  "checked-in": COLORS.SUCCESS,
  "checked-out": COLORS.TEXT_SECONDARY,
  cancelled: COLORS.ERROR,
};


const BILLING_COLORS = {
  Paid: COLORS.SUCCESS,
  "Bill Ready": COLORS.INFO,
  "Not Billed": COLORS.MUTED,
};

const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const tint = (hex, alpha = "1F") => `${hex}${alpha}`;

const COLUMNS = [
  { key: "bookingId", label: "Booking ID", sortable: true },
  { key: "guest", label: "Guest Name", sortable: true, staffOnly: true },
  { key: "room", label: "Room", sortable: true },
  { key: "roomType", label: "Room Type", sortable: true },
  { key: "checkIn", label: "Check-In", sortable: true },
  { key: "checkOut", label: "Check-Out", sortable: true },
  { key: "nights", label: "Nights / Total", sortable: false },
  { key: "status", label: "Status", sortable: true },
  { key: "billing", label: "Billing", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });


  const isStaffOrAdmin = 
  user?.role === ROLES.ADMIN || 
    user?.role === ROLES.MANAGER ||
  user?.role === ROLES.RECEPTIONIST;
  

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingApi.getAll();
      setBookings(res.data.bookings);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

 const handleStatusChange = async (id, status) => {
    try {
      await bookingApi.updateStatus(id, status);
      toast.success("Booking status updated");
      fetchBookings(); // refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      await bookingApi.updateStatus(id, "cancelled");
      toast.success("Booking cancelled");
      fetchBookings();
    } catch {
      toast.error("Cancel failed");
    }
  };

    const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };


    const stats = useMemo(() => {
    const count = (status) => bookings.filter((b) => b.status === status).length;
    return [
      { label: "Total", value: bookings.length, color: COLORS.TEXT_PRIMARY },
      { label: "Confirmed", value: count("confirmed"), color: COLORS.INFO },
      { label: "Checked In", value: count("checked-in"), color: COLORS.SUCCESS },
      { label: "Pending", value: count("pending"), color: COLORS.WARNING },
      { label: "Cancelled", value: count("cancelled"), color: COLORS.ERROR },
    ];
  }, [bookings]);

 const visibleColumns = COLUMNS.filter((c) => !c.staffOnly || isStaffOrAdmin);


   const filteredBookings = useMemo(() => {
    let list = [...bookings];

    if (statusFilter !== "all") {
      list = list.filter((b) => b.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((b) =>
        [b.guest?.name, b.room?.roomNumber, b._id]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(q))
      );
    }

        if (sortConfig.key) {
      const getValue = (b) => {
        switch (sortConfig.key) {
          case "bookingId": return b._id || "";
          case "guest": return b.guest?.name || "";
          case "room": return b.room?.roomNumber || "";
          case "roomType": return b.room?.type || "";
          case "checkIn": return new Date(b.checkIn).getTime();
          case "checkOut": return new Date(b.checkOut).getTime();
          case "status": return b.status || "";
          case "billing": return b.billingStatus || "";
          default: return "";
        }
      };

            list.sort((a, b) => {
        const va = getValue(a);
        const vb = getValue(b);
        if (va < vb) return sortConfig.direction === "asc" ? -1 : 1;
        if (va > vb) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [bookings, searchQuery, statusFilter, sortConfig]);

  const sortIndicator = (key) => {
    if (sortConfig.key !== key) return "\u21C5"; // ⇅ neutral
    return sortConfig.direction === "asc" ? "\u2191" : "\u2193"; // ↑ / ↓
  };


 return (
<div
  style={{
    minHeight: "100vh",
    display: "flex",
    background: COLORS.BACKGROUND,
    fontFamily: FONTS.BODY,
  }}
>
  <AsideBar />

  <main
    style={{
      flex: 1,
      padding: "32px",
      overflowY: "auto",
    }}
  >

      {/* Breadcrumb */}
      <div style={{ fontSize: "12px", color: COLORS.TEXT_SECONDARY, marginBottom: "8px" }}>
        <Link to="/" style={{ color: COLORS.TEXT_SECONDARY, textDecoration: "none" }}>Dashboard</Link>
        {" / "}
        <span style={{ color: COLORS.PRIMARY, fontWeight: 600 }}>Booking Management</span>
      </div>

      {/* Page header */}
           <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
             <div>
               <h1 style={{ fontFamily: FONTS.HEADING, fontSize: "26px", color: COLORS.DARK, margin: 0 }}>
                 {isStaffOrAdmin ? "Booking Management" : "My Bookings"}
               </h1>
               <p style={{ fontSize: "13px", color: COLORS.TEXT_SECONDARY, marginTop: "4px" }}>
                 {isStaffOrAdmin
                   ? "Create, manage, and track all hotel reservations"
                   : "View and manage your reservations"}
               </p>
             </div>
     
             {isStaffOrAdmin && (
               <Link
                 to="/booking/newbooking"
                 style={{
                   background: COLORS.PRIMARY,
                   color: COLORS.CREAM,
                   fontSize: "13px",
                   fontWeight: 600,
                   padding: "10px 18px",
                   borderRadius: BORDER_RADIUS.PILL,
                   textDecoration: "none",
                   boxShadow: SHADOWS.DROPDOWN,
                   whiteSpace: "nowrap",
                 }}
               >
                 + New Booking
               </Link>
             )}
           </div>
     

 {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: label === "Total" ? COLORS.SURFACE : tint(color),
              border: `0.5px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "22px", fontWeight: 700, color, fontFamily: FONTS.HEADING }}>
              {value}
            </div>
            <div style={{ fontSize: "12px", color: COLORS.TEXT_SECONDARY, marginTop: "2px" }}>
              {label}
            </div>
          </div>
        ))}
      </div>

{/* Search + filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
        <div style={{
          flex: "1 1 280px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: COLORS.SURFACE,
          border: `0.5px solid ${COLORS.BORDER}`,
          borderRadius: BORDER_RADIUS.MEDIUM,
          padding: "10px 14px",
        }}>
          <HiSearch size={16} color={COLORS.MUTED} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by guest, booking ID, room..."
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "13px",
              fontFamily: FONTS.BODY,
              color: COLORS.TEXT_PRIMARY,
              background: "transparent",
            }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            border: `0.5px solid ${COLORS.BORDER}`,
            borderRadius: BORDER_RADIUS.MEDIUM,
            padding: "10px 14px",
            fontSize: "13px",
            fontFamily: FONTS.BODY,
            color: COLORS.TEXT_PRIMARY,
            background: COLORS.SURFACE,
            cursor: "pointer",
          }}
        >
          <option value="all">All Statuses</option>
          {STATUS_FLOW.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

 {/* Table card */}
      <div style={{
        background: COLORS.SURFACE,
        border: `0.5px solid ${COLORS.BORDER}`,
        borderRadius: BORDER_RADIUS.MEDIUM,
        boxShadow: SHADOWS.CARD,
        overflowX: "auto",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>

          {/* Head */}
          <thead>
            <tr style={{ background: COLORS.PRIMARY, textAlign: "left" }}>
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  style={{
                    padding: "12px 16px",
                    color: COLORS.CREAM,
                    fontWeight: 500,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontFamily: FONTS.BODY,
                    cursor: col.sortable ? "pointer" : "default",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.label}
                  {col.sortable && (
                    <span style={{ marginLeft: "4px", opacity: sortConfig.key === col.key ? 1 : 0.5 }}>
                      {sortIndicator(col.key)}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={visibleColumns.length}
                  style={{ padding: "32px", textAlign: "center", color: COLORS.TEXT_SECONDARY, fontFamily: FONTS.BODY }}>
                  Loading bookings...
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length}
                  style={{ padding: "32px", textAlign: "center", color: COLORS.TEXT_SECONDARY, fontFamily: FONTS.BODY }}>
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => {
                const statusColor = STATUS_COLORS[b.status] || COLORS.MUTED;
                const billingLabel = b.billingStatus || "Not Billed";
                const billingColor = BILLING_COLORS[billingLabel] || COLORS.MUTED;
                const initial = b.guest?.name?.charAt(0)?.toUpperCase() || "?";

                return (
                  <motion.tr
                    key={b._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => navigate(`/bookings/${b._id}`)}
                    style={{ borderTop: `0.5px solid ${COLORS.BORDER}`, cursor: "pointer" }}
                  >
                    <td style={{ padding: "14px 16px", color: COLORS.PRIMARY, fontWeight: 600 }}>
                      #{b._id?.slice(-6).toUpperCase()}
                    </td>

                    {isStaffOrAdmin && (
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: BORDER_RADIUS.PILL,
                            background: COLORS.PRIMARY,
                            color: COLORS.CREAM,
                            fontSize: "11px",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}>
                            {initial}
                          </span>
                          <span style={{ color: COLORS.TEXT_PRIMARY, fontWeight: 500 }}>
                            {b.guest?.name}
                          </span>
                        </div>
                      </td>
                    )}

                    <td style={{ padding: "14px 16px", color: COLORS.TEXT_PRIMARY }}>
                      {b.room?.roomNumber}
                    </td>

                    <td style={{ padding: "14px 16px", color: COLORS.TEXT_PRIMARY }}>
                      {b.room?.type}
                    </td>

                    <td style={{ padding: "14px 16px", color: COLORS.TEXT_PRIMARY }}>
                      {new Date(b.checkIn).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                    </td>

                    <td style={{ padding: "14px 16px", color: COLORS.TEXT_PRIMARY }}>
                      {new Date(b.checkOut).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                    </td>

                    <td style={{ padding: "14px 16px", color: COLORS.TEXT_PRIMARY }}>
                      {b.nights}n &middot; Rs. {b.totalAmount?.toLocaleString()}
                    </td>

                    <td style={{ padding: "14px 16px" }} onClick={(e) => e.stopPropagation()}>
                      {isStaffOrAdmin ? (
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b._id, e.target.value)}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            border: "none",
                            borderRadius: BORDER_RADIUS.PILL,
                            padding: "5px 10px",
                            background: tint(statusColor),
                            color: statusColor,
                            fontFamily: FONTS.BODY,
                            outline: "none",
                            cursor: "pointer",
                          }}
                        >
                          {STATUS_FLOW.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <StatusBadge status={b.status} />
                      )}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "5px 10px",
                        borderRadius: BORDER_RADIUS.PILL,
                        background: tint(billingColor),
                        color: billingColor,
                      }}>
                        {billingLabel}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px" }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {isStaffOrAdmin && (
                          <Link
                            to={`/bookings/${b._id}/edit`}
                            style={{ color: COLORS.WARNING, padding: "4px" }}
                            title="Edit booking"
                          >
                            <HiPencilAlt size={16} />
                          </Link>
                        )}

                        {["pending", "confirmed"].includes(b.status) && (
                          <button
                            onClick={() => handleCancel(b._id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: COLORS.ERROR,
                              cursor: "pointer",
                              padding: "4px",
                            }}
                            title="Cancel booking"
                          >
                            <HiTrash size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Footer */}
        {!loading && bookings.length > 0 && (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderTop: `0.5px solid ${COLORS.BORDER}`,
            fontSize: "12px",
            color: COLORS.TEXT_SECONDARY,
          }}>
            <span>Showing {filteredBookings.length} of {bookings.length} bookings</span>
            <span>Click any row to view details</span>
          </div>
        )}

      </div>
      </main>
    </div>
  );
};

export default BookingPage;