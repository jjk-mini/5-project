import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";
import bookingApi from "../api/bookingApi";
import DashboardCard from "../components/DashboardCard";
import DashboardHeader from "../components/DashboardHeader";
// import getDashboardLinks from "../utils/dashboardLinks.jsx";

const CheckInOut = () => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("confirmed");

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

  const handleAction = async (id, status) => {
    try {
      await bookingApi.updateStatus(id, status);
      toast.success(status === "checked-in" ? "Guest checked in" : "Guest checked out");
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  const filtered = bookings.filter((b) => b.status === tab);

  return (
    <DashboardLayout>
    <DashboardHeader title="Check-In / Check-Out" />
      <div className="flex gap-3 mb-6">
        {[
          { key: "confirmed", label: "Ready for Check-In" },
          { key: "checked-in", label: "Currently Checked-In" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === t.key ? "bg-primary-700 text-white" : "bg-primary-50 text-primary-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No bookings in this category.</p>
        ) : (
          filtered.map((b) => (
   
            <motion.div key={b._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} >
                       <DashboardCard>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{b.guest?.name}</h4>
                  <p className="text-xs text-gray-500">{b.guest?.email}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
              <p className="text-sm text-gray-600 mb-1">Room {b.room?.roomNumber} - {b.room?.type}</p>
              <p className="text-sm text-gray-600 mb-1">
                {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
              </p>
              <p className="text-sm font-semibold text-primary-700 mb-4">Rs. {b.totalAmount.toLocaleString()}</p>

              {tab === "confirmed" ? (
                <button onClick={() => handleAction(b._id, "checked-in")} className="btn-primary w-full py-2">
                  Check In Guest
                </button>
              ) : (
                <button onClick={() => handleAction(b._id, "checked-out")} className="btn-outline w-full py-2">
                  Check Out Guest
                </button>
              )}
               </DashboardCard>
            </motion.div>
           
          ))
        )}
      </div>
   </DashboardLayout>
  );
};

export default CheckInOut;