import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../constants/roles";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";
import AsideBar from "../components/AsideBar";
import bookingApi from "../api/bookingApi";
import { getAllRooms } from "../api/roomApi";
import * as authApi from "../api/authApi";
import {
  CalendarCheck,
  User,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  Save,
  CheckCircle,
  Search,
  Edit,
  Trash2,
} from "lucide-react";

const EditBookingPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [booking, setBooking] = useState(null);
  const [existingGuests, setExistingGuests] = useState([]);
  const [showGuestSearch, setShowGuestSearch] = useState(false);
  const [searchGuestTerm, setSearchGuestTerm] = useState("");
  const [selectedGuest, setSelectedGuest] = useState(null);

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    room: "",
    checkIn: "",
    checkOut: "",
    guestsCount: 1,
    status: "pending",
    billingStatus: "Not Billed",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  const isStaffOrAdmin =
    user?.role === ROLES.ADMIN ||
    user?.role === ROLES.MANAGER ||
    user?.role === ROLES.RECEPTIONIST;

  useEffect(() => {
    if (!isStaffOrAdmin) {
      navigate("/admin/bookings");
      return;
    }
    fetchBooking();
    fetchRooms();
    fetchExistingGuests();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setFetching(true);
      const response = await bookingApi.getById(id);
      const bookingData = response?.data?.booking || response?.booking || response;
      
      if (bookingData) {
        setBooking(bookingData);
        
        // Format dates for input fields
        const checkInDate = bookingData.checkIn ? new Date(bookingData.checkIn) : new Date();
        const checkOutDate = bookingData.checkOut ? new Date(bookingData.checkOut) : new Date();
        
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        setFormData({
          guestName: bookingData.guest?.name || "",
          guestEmail: bookingData.guest?.email || "",
          guestPhone: bookingData.guest?.phone || "",
          room: bookingData.room?._id || bookingData.room || "",
          checkIn: checkInDate ? formatDate(checkInDate) : "",
          checkOut: checkOutDate ? formatDate(checkOutDate) : "",
          guestsCount: bookingData.guestsCount || 1,
          status: bookingData.status || "pending",
          billingStatus: bookingData.billingStatus || "Not Billed",
          specialRequests: bookingData.specialRequests || "",
        });

        // Set selected guest if exists
        if (bookingData.guest) {
          setSelectedGuest(bookingData.guest);
        }
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
      toast.error("Failed to load booking details");
    } finally {
      setFetching(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await getAllRooms();
      
      let roomsData = [];
      if (Array.isArray(response)) {
        roomsData = response;
      } else if (response?.data) {
        roomsData = Array.isArray(response.data) ? response.data : [];
      } else if (response?.rooms) {
        roomsData = Array.isArray(response.rooms) ? response.rooms : [];
      }
      
      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to load rooms");
      setRooms([]);
    }
  };

  const fetchExistingGuests = async () => {
    try {
      const response = await authApi.getMyProfile();
      if (response && response.user) {
        if (response.user.role === "guest") {
          setExistingGuests([response.user]);
        }
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      setExistingGuests([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "guestName" || name === "guestEmail") {
      setSelectedGuest(null);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleGuestSelect = (guest) => {
    setSelectedGuest(guest);
    setFormData((prev) => ({
      ...prev,
      guestName: guest.name,
      guestEmail: guest.email,
      guestPhone: guest.phone || "",
    }));
    setShowGuestSearch(false);
    setSearchGuestTerm("");
    
    if (errors.guestName) {
      setErrors((prev) => ({ ...prev, guestName: "" }));
    }
    if (errors.guestEmail) {
      setErrors((prev) => ({ ...prev, guestEmail: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.guestName || formData.guestName.trim() === "") {
      newErrors.guestName = "Guest name is required";
    }
    
    if (!formData.guestEmail || formData.guestEmail.trim() === "") {
      newErrors.guestEmail = "Guest email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.guestEmail)) {
      newErrors.guestEmail = "Enter a valid email address";
    }
    
    if (!formData.room || formData.room === "") {
      newErrors.room = "Please select a room";
    }
    
    if (!formData.checkIn || formData.checkIn === "") {
      newErrors.checkIn = "Check-in date is required";
    }
    
    if (!formData.checkOut || formData.checkOut === "") {
      newErrors.checkOut = "Check-out date is required";
    }

    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = "Check-out must be after check-in";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allFields = {
      guestName: true,
      guestEmail: true,
      room: true,
      checkIn: true,
      checkOut: true,
    };
    setTouched(allFields);
    
    const isValid = validate();
    
    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }

    setLoading(true);
    try {
      const selectedRoom = rooms.find((r) => r._id === formData.room);
      const nights = calculateNights();
      const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

      // Prepare data in the format the backend expects
      // The backend updateBooking function expects checkIn, checkOut, guestsCount, specialRequests
      const bookingData = {
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guestsCount: parseInt(formData.guestsCount) || 1,
        specialRequests: formData.specialRequests || "",
        // Optional: if you want to update room as well
        // room: formData.room,
        // Optional: if you want to update guest info
        // guest: {
        //   name: formData.guestName.trim(),
        //   email: formData.guestEmail.trim(),
        //   phone: formData.guestPhone || "",
        // }
      };

      console.log("Updating booking data:", JSON.stringify(bookingData, null, 2));

      // Use the update API
      const response = await bookingApi.update(id, bookingData);
      console.log("Update response:", response);
      
      setSuccess(true);
      toast.success("Booking updated successfully!");

      setTimeout(() => {
        navigate("/admin/bookings");
      }, 2000);
    } catch (error) {
      console.error("Error updating booking:", error);
      console.error("Error response data:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || "Failed to update booking. Please check all fields.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      await bookingApi.cancel(id);
      toast.success("Booking cancelled successfully!");
      navigate("/admin/bookings");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  const selectedRoom = rooms.find((r) => r._id === formData.room);
  const nights = calculateNights();
  const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

  if (!isStaffOrAdmin) {
    return null;
  }

  if (fetching) {
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
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div
              className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
              style={{ borderColor: COLORS.ACCENT, borderTopColor: "transparent" }}
            />
            <p className="mt-4 text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
              Loading booking details...
            </p>
          </div>
        </main>
      </div>
    );
  }

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
                <Edit size={35} style={{ color: COLORS.PRIMARY }} />
              </div>

              <div>
                <h1
                  className="text-4xl font-bold"
                  style={{
                    color: "#fff",
                    fontFamily: FONTS.HEADING,
                  }}
                >
                  Edit Booking
                </h1>

                <p
                  className="mt-2"
                  style={{
                    color: COLORS.ACCENT,
                    fontFamily: FONTS.BODY,
                  }}
                >
                  #{booking?._id?.slice(-6).toUpperCase()} - Update reservation details
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              {booking?.status !== "cancelled" && (
                <button
                  onClick={handleCancel}
                  style={{
                    background: "rgba(239,68,68,0.15)",
                    color: COLORS.ERROR,
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "10px 18px",
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    border: `1px solid rgba(239,68,68,0.2)`,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239,68,68,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                  }}
                >
                  <Trash2 size={18} />
                  Cancel Booking
                </button>
              )}

              <Link
                to="/admin/bookings"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: COLORS.CREAM,
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "10px 18px",
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                  border: `1px solid rgba(255,255,255,0.1)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
              >
                <ArrowLeft size={18} />
                Back to Bookings
              </Link>
            </div>
          </div>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: COLORS.SURFACE,
              borderRadius: BORDER_RADIUS.LARGE,
              padding: "60px 40px",
              textAlign: "center",
              border: `1px solid ${COLORS.BORDER}`,
              boxShadow: SHADOWS.CARD,
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: `rgba(46, 160, 67, 0.1)`,
                border: `2px solid ${COLORS.SUCCESS}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <CheckCircle size={40} style={{ color: COLORS.SUCCESS }} />
            </div>
            <h2
              style={{
                fontFamily: FONTS.HEADING,
                fontSize: "28px",
                color: COLORS.TEXT_PRIMARY,
                fontWeight: 300,
              }}
            >
              Booking Updated Successfully!
            </h2>
            <p style={{ color: COLORS.TEXT_SECONDARY, marginTop: "8px" }}>
              The booking has been updated.
            </p>
            <button
              onClick={() => navigate("/admin/bookings")}
              style={{
                marginTop: "24px",
                background: COLORS.PRIMARY,
                color: COLORS.CREAM,
                border: "none",
                padding: "12px 32px",
                borderRadius: BORDER_RADIUS.PILL,
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              View All Bookings
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: COLORS.SURFACE,
              borderRadius: BORDER_RADIUS.LARGE,
              padding: "32px",
              border: `1px solid ${COLORS.BORDER}`,
              boxShadow: SHADOWS.CARD,
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  {/* Guest Name */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Guest Full Name *
                    </label>

                    <input
                      type="text"
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("guestName")}
                      placeholder="Enter guest's full name"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${touched.guestName && errors.guestName ? COLORS.ERROR : COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = COLORS.ACCENT;
                        e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212,168,130,0.1)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = touched.guestName && errors.guestName ? COLORS.ERROR : COLORS.BORDER;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {touched.guestName && errors.guestName && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: COLORS.ERROR,
                          marginTop: "4px",
                        }}
                      >
                        {errors.guestName}
                      </p>
                    )}
                  </div>

                  {/* Guest Email */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Guest Email *
                    </label>
                    <input
                      type="email"
                      name="guestEmail"
                      value={formData.guestEmail}
                      onChange={handleChange}
                      onBlur={() => handleBlur("guestEmail")}
                      placeholder="guest@email.com"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${touched.guestEmail && errors.guestEmail ? COLORS.ERROR : COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = COLORS.ACCENT;
                        e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212,168,130,0.1)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = touched.guestEmail && errors.guestEmail ? COLORS.ERROR : COLORS.BORDER;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {touched.guestEmail && errors.guestEmail && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: COLORS.ERROR,
                          marginTop: "4px",
                        }}
                      >
                        {errors.guestEmail}
                      </p>
                    )}
                  </div>

                  {/* Guest Phone */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Guest Phone
                    </label>
                    <input
                      type="tel"
                      name="guestPhone"
                      value={formData.guestPhone}
                      onChange={handleChange}
                      placeholder="+92 300 0000000"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
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
                    />
                  </div>

                  {/* Room Selection */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Select Room *
                    </label>
                    <select
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      onBlur={() => handleBlur("room")}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${touched.room && errors.room ? COLORS.ERROR : COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
                        cursor: "pointer",
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = COLORS.ACCENT;
                        e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212,168,130,0.1)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = touched.room && errors.room ? COLORS.ERROR : COLORS.BORDER;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <option value="">-- Select a room --</option>
                      {rooms.map((room) => {
                        const isAvailable = room.status === "available";
                        const isCurrentRoom = room._id === booking?.room?._id || room._id === booking?.room;
                        const isDisabled = !isAvailable && !isCurrentRoom;
                        
                        return (
                          <option 
                            key={room._id} 
                            value={room._id}
                            disabled={isDisabled}
                            style={{
                              color: isDisabled ? COLORS.TEXT_SECONDARY : COLORS.TEXT_PRIMARY,
                            }}
                          >
                            {room.roomNumber} - {room.type} 
                            {isDisabled ? " (Unavailable)" : ""}
                            {isCurrentRoom ? " (Current)" : ""}
                            (PKR {room.price?.toLocaleString()}/night)
                          </option>
                        );
                      })}
                    </select>
                    {touched.room && errors.room && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: COLORS.ERROR,
                          marginTop: "4px",
                        }}
                      >
                        {errors.room}
                      </p>
                    )}
                  </div>

                  {/* Guests Count */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      name="guestsCount"
                      value={formData.guestsCount}
                      onChange={handleChange}
                      min="1"
                      max="6"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
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
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  {/* Check-in */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Check-in Date *
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      onBlur={() => handleBlur("checkIn")}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${touched.checkIn && errors.checkIn ? COLORS.ERROR : COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
                        outline: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = COLORS.ACCENT;
                        e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212,168,130,0.1)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = touched.checkIn && errors.checkIn ? COLORS.ERROR : COLORS.BORDER;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {touched.checkIn && errors.checkIn && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: COLORS.ERROR,
                          marginTop: "4px",
                        }}
                      >
                        {errors.checkIn}
                      </p>
                    )}
                  </div>

                  {/* Check-out */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Check-out Date *
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      onBlur={() => handleBlur("checkOut")}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${touched.checkOut && errors.checkOut ? COLORS.ERROR : COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
                        outline: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = COLORS.ACCENT;
                        e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212,168,130,0.1)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = touched.checkOut && errors.checkOut ? COLORS.ERROR : COLORS.BORDER;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {touched.checkOut && errors.checkOut && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: COLORS.ERROR,
                          marginTop: "4px",
                        }}
                      >
                        {errors.checkOut}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
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
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="checked-in">Checked In</option>
                      <option value="checked-out">Checked Out</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Billing Status */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Billing Status
                    </label>
                    <select
                      name="billingStatus"
                      value={formData.billingStatus}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
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
                      <option value="Not Billed">Not Billed</option>
                      <option value="Bill Ready">Bill Ready</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: COLORS.TEXT_PRIMARY,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Any special requests for the guest..."
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${COLORS.BORDER}`,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        fontSize: "13px",
                        fontFamily: FONTS.BODY,
                        color: COLORS.TEXT_PRIMARY,
                        background: COLORS.BACKGROUND,
                        resize: "vertical",
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
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              {selectedRoom && formData.checkIn && formData.checkOut && (
                <div
                  style={{
                    marginTop: "24px",
                    padding: "20px",
                    background: COLORS.BACKGROUND,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    border: `1px solid ${COLORS.BORDER}`,
                  }}
                >
                  <h4
                    style={{
                      fontFamily: FONTS.HEADING,
                      fontSize: "16px",
                      color: COLORS.TEXT_PRIMARY,
                      marginBottom: "12px",
                    }}
                  >
                    Booking Summary
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: COLORS.TEXT_SECONDARY,
                          marginBottom: "2px",
                        }}
                      >
                        Room
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: COLORS.TEXT_PRIMARY,
                        }}
                      >
                        {selectedRoom.roomNumber} - {selectedRoom.type}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: COLORS.TEXT_SECONDARY,
                          marginBottom: "2px",
                        }}
                      >
                        Nights
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: COLORS.TEXT_PRIMARY,
                        }}
                      >
                        {nights} night{nights > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: COLORS.TEXT_SECONDARY,
                          marginBottom: "2px",
                        }}
                      >
                        Price per Night
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: COLORS.TEXT_PRIMARY,
                        }}
                      >
                        PKR {selectedRoom.price?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: COLORS.TEXT_SECONDARY,
                          marginBottom: "2px",
                        }}
                      >
                        Total Amount
                      </p>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: COLORS.ACCENT,
                        }}
                      >
                        PKR {totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div
                style={{
                  marginTop: "28px",
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  borderTop: `1px solid ${COLORS.BORDER}`,
                  paddingTop: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={() => navigate("/admin/bookings")}
                  style={{
                    padding: "10px 24px",
                    background: COLORS.BACKGROUND,
                    color: COLORS.TEXT_SECONDARY,
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: BORDER_RADIUS.PILL,
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: FONTS.BODY,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = COLORS.SURFACE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = COLORS.BACKGROUND;
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "10px 32px",
                    background: loading ? COLORS.TEXT_SECONDARY : COLORS.PRIMARY,
                    color: COLORS.CREAM,
                    border: "none",
                    borderRadius: BORDER_RADIUS.PILL,
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: FONTS.BODY,
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = `0 4px 20px rgba(92,26,43,0.3)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Save size={18} />
                  {loading ? "Updating..." : "Update Booking"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default EditBookingPage;