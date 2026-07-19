import { useState } from "react";
import {
  BellRing,
  ConciergeBell,
  Flag,
  FileText,
  Wrench 
} from "lucide-react";
import ProfileSection from "./ProfileSection";
import {
  COLORS,
  SHADOWS,
  FONTS
} from "../../constants/theme";

function ServiceRequestPage() {
 

  const [service, setService] = useState("Room Cleaning");
  const [priority, setPriority] = useState("Normal");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Service request submitted successfully!");

    setService("Room Cleaning");
    setPriority("Normal");
    setDescription("");
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
            <option>Air Conditioner</option>
            <option>Electricity</option>
            <option>Water Leakage</option>
            <option>TV</option>
            <option>Door Lock</option>
            <option>Furniture</option>
            <option>Bathroom</option>
            <option>Other</option>
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
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
            <option>Urgent</option>
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

<button
  type="submit"
  className="w-full py-4 rounded-xl text-lg font-bold transition-transform hover:-translate-y-0.5"
  style={{
    background: COLORS.PRIMARY,
    color: COLORS.CREAM,
    boxShadow: SHADOWS.CARD,
    fontFamily: FONTS.BODY,
  }}
>
  Submit Service Request
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