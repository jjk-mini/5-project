import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import bookingApi from "../api/bookingApi";

const todayStr = () => new Date().toISOString().split("T")[0];

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
      className="card p-6 space-y-4 sticky top-24"
    >
      <h3 className="font-display text-xl font-semibold text-primary-700">Book This Room</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600">Check-in</label>
          <input
            type="date"
            name="checkIn"
            min={todayStr()}
            value={form.checkIn}
            onChange={handleChange}
            required
            className="w-full mt-1 rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Check-out</label>
          <input
            type="date"
            name="checkOut"
            min={form.checkIn}
            value={form.checkOut}
            onChange={handleChange}
            required
            className="w-full mt-1 rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">Guests</label>
        <input
          type="number"
          name="guestsCount"
          min={1}
          max={room?.capacity || 10}
          value={form.guestsCount}
          onChange={handleChange}
          className="w-full mt-1 rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">Special Requests</label>
        <textarea
          name="specialRequests"
          value={form.specialRequests}
          onChange={handleChange}
          rows={3}
          className="w-full mt-1 rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Any preferences, e.g. late check-in, extra pillows..."
        />
      </div>

      <div className="border-t pt-3 space-y-1 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Rate</span>
          <span>Rs. {room?.price?.toLocaleString()} / night</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Nights</span>
          <span>{nights}</span>
        </div>
        <div className="flex justify-between font-semibold text-dark-900 text-base">
          <span>Total</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </motion.form>
  );
};

export default BookingForm;