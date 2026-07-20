import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import bookingApi from "../api/bookingApi";
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../constants/theme";

const todayStr = () => new Date().toISOString().split("T")[0];

const inputStyle = {
  width: "100%",
  marginTop: "6px",
  padding: "10px 12px",
  fontSize: "13.5px",
  borderRadius: BORDER_RADIUS.SMALL,
  border: `1px solid ${COLORS.BORDER}`,
  color: COLORS.TEXT_PRIMARY,
  fontFamily: FONTS.BODY,
  outline: "none",
  background: COLORS.BACKGROUND,
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: 500,
  color: COLORS.TEXT_SECONDARY,
  fontFamily: FONTS.BODY,
};

const BookingForm = ({ room, onSuccess }) => {
  const [form, setForm] = useState({
    checkIn: todayStr(),
    checkOut: "",
    guestsCount: 1,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const diff = (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.ceil(diff) : 0;
  }, [form.checkIn, form.checkOut]);

  const total = nights * (room?.price || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nights) {
      toast.error("Please select a valid check-out date");
      return;
    }
    if (room.status !== "available") {
      toast.error("This room is currently not available");
      return;
    }

    setLoading(true);
    try {
      const res = await bookingApi.create({ room: room._id, ...form });
      toast.success("Booking request submitted!");
      onSuccess?.(res.data.booking);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      style={{
        background: COLORS.SURFACE,
        border: `1px solid ${COLORS.BORDER}`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h3
        style={{
          fontFamily: FONTS.HEADING,
          fontSize: "19px",
          color: COLORS.PRIMARY,
          margin: 0,
        }}
      >
        Book This Room
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <label style={labelStyle}>Check-in</label>
          <input
            type="date"
            name="checkIn"
            min={todayStr()}
            value={form.checkIn}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Check-out</label>
          <input
            type="date"
            name="checkOut"
            min={form.checkIn}
            value={form.checkOut}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Guests</label>
        <input
          type="number"
          name="guestsCount"
          min={1}
          max={room?.guests || room?.capacity || 10}
          value={form.guestsCount}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Special Requests</label>
        <textarea
          name="specialRequests"
          value={form.specialRequests}
          onChange={handleChange}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Any preferences, e.g. late check-in, extra pillows..."
        />
      </div>

      <div
        style={{
          borderTop: `1px solid ${COLORS.BORDER}`,
          paddingTop: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          fontSize: "13.5px",
          fontFamily: FONTS.BODY,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", color: COLORS.TEXT_SECONDARY }}>
          <span>Rate</span>
          <span>PKR {Number(room?.price || 0).toLocaleString()} / night</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: COLORS.TEXT_SECONDARY }}>
          <span>Nights</span>
          <span>{nights}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
            fontSize: "15px",
            color: COLORS.TEXT_PRIMARY,
            marginTop: "4px",
          }}
        >
          <span>Total</span>
          <span>PKR {total.toLocaleString()}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "13px",
          border: "none",
          borderRadius: BORDER_RADIUS.MEDIUM,
          background: COLORS.PRIMARY,
          color: COLORS.CREAM,
          fontFamily: FONTS.BODY,
          fontSize: "14.5px",
          fontWeight: 600,
          cursor: loading ? "default" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </motion.form>
  );
};

export default BookingForm;
