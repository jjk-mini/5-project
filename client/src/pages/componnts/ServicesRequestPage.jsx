import { useState, useEffect } from "react";
import {
  BellRing,
  ConciergeBell,
  Flag,
  FileText,
  Wrench 
} from "lucide-react";
import ProfileSection from "./ProfileSection";
import bookingApi from "../../api/bookingApi";
import maintenanceApi from "../../api/mainteanceApi";
import {
  COLORS,
  SHADOWS,
  FONTS
} from "../../constants/theme";

function ServiceRequestPage() {

  // Guest's currently checked-in bookings — this is how we know exactly
  // which room number to attach the request to, even if the guest has
  // more than one active booking.
  const [activeBookings, setActiveBookings] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [loadingBookings, setLoadingBookings] = useState(true);

  const [service, setService] = useState("Air Conditioner");
  const [priority, setPriority] = useState("Normal");
  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchActiveBookings = async () => {
      try {
        const res = await bookingApi.getMyActiveBookings();
        const bookings = res.data?.bookings || [];
        setActiveBookings(bookings);
        if (bookings.length === 1) setBookingId(bookings[0]._id);
      } catch {
        setActiveBookings([]);
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchActiveBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!bookingId) {
      setSubmitError("Please select which room this request is for.");
      return;
    }

    setSubmitting(true);
    try {
      await maintenanceApi.create({
        bookingId,
        issueType: service,
        description,
        priority,
      });
      setSubmitted(true);
      setService("Air Conditioner");
      setPriority("Normal");
      setDescription("");
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Couldn't submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_320px]">

    <ProfileSection
      title="Maintenance Request"
      icon={Wrench}
    >
      <p className="mb-6 text-sm text-gray-500">
        Report any issue in your room and our maintenance team will be notified.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5"
      >
        {/* Room */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <ConciergeBell size={16} />
            Room
          </label>

          {loadingBookings ? (
            <p className="text-sm text-gray-500">Loading your rooms...</p>
          ) : activeBookings.length === 0 ? (
            <p className="text-sm" style={{ color: COLORS.ERROR }}>
              You don't have any checked-in room right now, so a maintenance request can't be raised.
            </p>
          ) : (
            <select
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="" disabled>Select a room</option>
              {activeBookings.map((b) => (
                <option key={b._id} value={b._id}>
                  Room {b.room?.roomNumber} — {b.room?.type}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Service */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <ConciergeBell size={16} />
            Issue Type
          </label>

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-xl border p-3"
          >
            <option value="Air Conditioner">Air Conditioner</option>
            <option value="Electricity">Electricity</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="TV">TV</option>
            <option value="Door Lock">Door Lock</option>
            <option value="Furniture">Furniture</option>
            <option value="Bathroom">Bathroom</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Flag size={16} />
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-xl border p-3"
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <FileText size={16} />
            Description
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border p-3"
            placeholder="Describe the maintenance issue..."
          />
        </div>

{submitError && (
  <p className="text-sm" style={{ color: COLORS.ERROR }}>{submitError}</p>
)}
{submitted && (
  <p className="text-sm" style={{ color: COLORS.SUCCESS }}>Request submitted — our team has been notified.</p>
)}

<button
  type="submit"
  disabled={submitting || activeBookings.length === 0}
  className="w-full py-4 rounded-xl text-lg font-bold transition-transform hover:-translate-y-0.5"
  style={{
    background: COLORS.PRIMARY,
    color: COLORS.CREAM,
    boxShadow: SHADOWS.CARD,
    fontFamily: FONTS.BODY,
    opacity: (submitting || activeBookings.length === 0) ? 0.6 : 1,
  }}
>
  {submitting ? "Submitting..." : "Submit Service Request"}
</button>
      </form>
    </ProfileSection>

    <section
      className="rounded-[18px] border p-6"
      style={{
        background: COLORS.PRIMARY,
        borderColor: COLORS.PRIMARY,
        boxShadow: SHADOWS.CARD,
      }}
    >
      <Wrench size={30} color={COLORS.ACCENT} />

      <h2 className="mt-4 text-xl font-bold text-white">
        Maintenance Support
      </h2>

      <p className="mt-3 text-sm text-white/60 leading-6">
        Our maintenance staff is available 24/7 to resolve issues in your room.
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-white font-semibold">Average Response</p>
          <p className="text-white/70 text-sm">15 - 30 minutes</p>
        </div>

        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-white font-semibold">Emergency</p>
          <p className="text-white/70 text-sm">
            Critical issues receive immediate attention.
          </p>
        </div>

        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-white font-semibold">Available</p>
          <p className="text-green-300 font-medium">
            24 Hours • 7 Days
          </p>
        </div>
      </div>
    </section>

  </div>
);
}

export default ServiceRequestPage;