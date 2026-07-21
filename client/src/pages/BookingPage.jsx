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
import { CalendarCheck, Users, BedDouble, Clock } from "lucide-react";

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

  const tint = (hex, alpha = "20") => `${hex}${alpha}`;

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
      fetchBookings();
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
    if (sortConfig.key !== key) return "\u21C5";
    return sortConfig.direction === "asc" ? "\u2191" : "\u2193";
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
        {/* Header */}
        <div
          className="mb-8 p-8"
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="p-4"
                style={{
                  backgroundColor: COLORS.ACCENT,
                  borderRadius: BORDER_RADIUS.LARGE,
                }}
              >
                <CalendarCheck size={35} style={{ color: COLORS.PRIMARY }} />
              </div>

              <div>
                <h1
                  className="text-4xl font-bold"
                  style={{
                    color: "#fff",
                    fontFamily: FONTS.HEADING,
                  }}
                >
                  Booking Management
                </h1>

                <p
                  className="mt-2"
                  style={{
                    color: COLORS.ACCENT,
                    fontFamily: FONTS.BODY,
                  }}
                >
                  Create, manage, and track all hotel reservations
                </p>
              </div>
            </div>

            {isStaffOrAdmin && (
              <Link
                to="/booking/newbooking"
                style={{
                  background: COLORS.ACCENT,
                  color: COLORS.PRIMARY,
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "10px 18px",
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  textDecoration: "none",
                  boxShadow: SHADOWS.DROPDOWN,
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = `0 4px 20px rgba(212,168,130,0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = SHADOWS.DROPDOWN;
                }}
              >
                + New Booking
              </Link>
            )}
          </div>
        </div>

        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {stats.map(({ label, value, color }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: label === "Total" ? COLORS.SURFACE : tint(color),
                border: `1px solid ${label === "Total" ? COLORS.BORDER : tint(color, "40")}`,
                borderRadius: BORDER_RADIUS.MEDIUM,
                padding: "16px",
                textAlign: "center",
                boxShadow: SHADOWS.CARD,
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color,
                  fontFamily: FONTS.HEADING,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: COLORS.TEXT_SECONDARY,
                  marginTop: "2px",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search + filter */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              flex: "1 1 280px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: COLORS.SURFACE,
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
              padding: "8px 14px",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.ACCENT;
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212,168,130,0.1)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = COLORS.BORDER;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
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
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
              padding: "8px 14px",
              fontSize: "13px",
              fontFamily: FONTS.BODY,
              color: COLORS.TEXT_PRIMARY,
              background: COLORS.SURFACE,
              cursor: "pointer",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.ACCENT;
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212,168,130,0.1)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = COLORS.BORDER;
              e.currentTarget.style.boxShadow = "none";
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
        <div
          style={{
            background: COLORS.SURFACE,
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
                minWidth: "1100px",
              }}
            >
              {/* Head */}
              <thead>
                <tr
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
                  }}
                >
                  {visibleColumns.map((col) => (
                    <th
                      key={col.key}
                      onClick={col.sortable ? () => handleSort(col.key) : undefined}
                      style={{
                        padding: "14px 16px",
                        color: COLORS.ACCENT,
                        fontWeight: 600,
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        fontFamily: FONTS.BODY,
                        cursor: col.sortable ? "pointer" : "default",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        {col.label}
                        {col.sortable && (
                          <span
                            style={{
                              marginLeft: "4px",
                              opacity: sortConfig.key === col.key ? 1 : 0.5,
                              fontSize: "11px",
                            }}
                          >
                            {sortIndicator(col.key)}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      style={{
                        padding: "48px",
                        textAlign: "center",
                        color: COLORS.TEXT_SECONDARY,
                        fontFamily: FONTS.BODY,
                      }}
                    >
                      <div
                        style={{
                          display: "inline-block",
                          width: "24px",
                          height: "24px",
                          border: `2px solid ${COLORS.BORDER}`,
                          borderTopColor: COLORS.ACCENT,
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      <p style={{ marginTop: "12px" }}>Loading bookings...</p>
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      style={{
                        padding: "48px",
                        textAlign: "center",
                        color: COLORS.TEXT_SECONDARY,
                        fontFamily: FONTS.BODY,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "32px",
                          marginBottom: "8px",
                        }}
                      >
                        📋
                      </div>
                      <p>No bookings found.</p>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b, index) => {
                    const statusColor = STATUS_COLORS[b.status] || COLORS.MUTED;
                    const billingLabel = b.billingStatus || "Not Billed";
                    const billingColor = BILLING_COLORS[billingLabel] || COLORS.MUTED;
                    const initial = b.guest?.name?.charAt(0)?.toUpperCase() || "?";

                    return (
                      <motion.tr
                        key={b._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        onClick={() => navigate(`/bookings/${b._id}`)}
                        style={{
                          borderTop: `1px solid ${COLORS.BORDER}`,
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                          background: index % 2 === 0 ? "transparent" : `${COLORS.BORDER}20`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${COLORS.BORDER}30`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            index % 2 === 0 ? "transparent" : `${COLORS.BORDER}20`;
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            color: COLORS.PRIMARY,
                            fontWeight: 600,
                            fontSize: "12px",
                          }}
                        >
                          #{b._id?.slice(-6).toUpperCase()}
                        </td>

                        {isStaffOrAdmin && (
                          <td style={{ padding: "12px 16px" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <span
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: BORDER_RADIUS.PILL,
                                  background: COLORS.PRIMARY,
                                  color: COLORS.CREAM,
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                {initial}
                              </span>
                              <span
                                style={{
                                  color: COLORS.TEXT_PRIMARY,
                                  fontWeight: 500,
                                  fontSize: "13px",
                                }}
                              >
                                {b.guest?.name}
                              </span>
                            </div>
                          </td>
                        )}

                        <td
                          style={{
                            padding: "12px 16px",
                            color: COLORS.TEXT_PRIMARY,
                            fontSize: "13px",
                          }}
                        >
                          {b.room?.roomNumber}
                        </td>

                        <td
                          style={{
                            padding: "12px 16px",
                            color: COLORS.TEXT_SECONDARY,
                            fontSize: "13px",
                          }}
                        >
                          {b.room?.type}
                        </td>

                        <td
                          style={{
                            padding: "12px 16px",
                            color: COLORS.TEXT_PRIMARY,
                            fontSize: "12px",
                          }}
                        >
                          {new Date(b.checkIn).toLocaleDateString("en-PK", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        <td
                          style={{
                            padding: "12px 16px",
                            color: COLORS.TEXT_PRIMARY,
                            fontSize: "12px",
                          }}
                        >
                          {new Date(b.checkOut).toLocaleDateString("en-PK", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        <td
                          style={{
                            padding: "12px 16px",
                            color: COLORS.TEXT_PRIMARY,
                            fontSize: "13px",
                          }}
                        >
                          {b.nights}n · Rs. {b.totalAmount?.toLocaleString()}
                        </td>

                        <td
                          style={{ padding: "12px 16px" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {isStaffOrAdmin ? (
                            <select
                              value={b.status}
                              onChange={(e) =>
                                handleStatusChange(b._id, e.target.value)
                              }
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                border: "none",
                                borderRadius: BORDER_RADIUS.PILL,
                                padding: "4px 10px",
                                background: tint(statusColor),
                                color: statusColor,
                                fontFamily: FONTS.BODY,
                                outline: "none",
                                cursor: "pointer",
                                width: "100%",
                                maxWidth: "100px",
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

                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "4px 12px",
                              borderRadius: BORDER_RADIUS.PILL,
                              background: tint(billingColor),
                              color: billingColor,
                              display: "inline-block",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {billingLabel}
                          </span>
                        </td>

                        <td
                          style={{ padding: "12px 16px" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <Link
                              to={`/admin/bookings/edit/${b._id}`}
                              style={{
                                color: COLORS.WARNING,
                                padding: "4px",
                                transition: "all 0.2s ease",
                              }}
                              title="Edit booking"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            >
                              <HiPencilAlt size={16} />
                            </Link>

                            {["pending", "confirmed"].includes(b.status) && (
                              <button
                                onClick={() => handleCancel(b._id)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: COLORS.ERROR,
                                  cursor: "pointer",
                                  padding: "4px",
                                  transition: "all 0.2s ease",
                                }}
                                title="Cancel booking"
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                }}
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
          </div>

          {/* Footer */}
          {!loading && bookings.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderTop: `1px solid ${COLORS.BORDER}`,
                fontSize: "12px",
                color: COLORS.TEXT_SECONDARY,
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <span>
                Showing {filteredBookings.length} of {bookings.length} bookings
              </span>
              <span
                style={{
                  color: COLORS.ACCENT,
                  fontWeight: 500,
                }}
              >
                Click any row to view details
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Spin animation keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default BookingPage;