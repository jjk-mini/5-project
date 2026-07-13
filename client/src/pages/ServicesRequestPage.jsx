import { useState } from "react";
import {
  BellRing,
  ConciergeBell,
  Flag,
  FileText,
} from "lucide-react";
import AsideBarGuest from "../components/AsidebarGuest";

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
  <div className="min-h-screen bg-[#F5EFE7] flex">

    {/* Sidebar */}
    <AsideBarGuest />

    {/* Main Content */}
    <main className="flex-1 p-8 overflow-y-auto">

      {/* Header */}
      <div className="bg-linear-to-r from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-8 mb-8">

        <h1 className="text-4xl font-bold text-white">
          Hotel Service Request
        </h1>

        <p className="text-[#F3D89B] mt-3 text-lg">
          Need anything during your stay? Submit a request and our staff will
          assist you as quickly as possible.
        </p>

      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl shadow-xl border-l-8 border-[#D9B26F] p-10">

        <div className="flex items-center gap-4 mb-10">

          <BellRing
            size={40}
            className="text-[#5C1A2B]"
          />

          <div>
            <h2 className="text-3xl font-bold text-[#5C1A2B]">
              Service Request Form
            </h2>

            <p className="text-gray-500">
              Fill out the details below to request any hotel service.
            </p>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-2 gap-8"
        >

          {/* Service */}
          <div>

            <label className="flex items-center gap-2 text-[#5C1A2B] font-semibold mb-3">
              <ConciergeBell size={18} />
              Service
            </label>

            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#5C1A2B]"
            >
              <option>Room Cleaning</option>
              <option>Food Delivery</option>
              <option>Laundry</option>
              <option>Extra Towels</option>
              <option>Wake-up Call</option>
              <option>Airport Pickup</option>
              <option>Spa Appointment</option>
              <option>Maintenance</option>
            </select>

          </div>

          {/* Priority */}
          <div>

            <label className="flex items-center gap-2 text-[#5C1A2B] font-semibold mb-3">
              <Flag size={18} />
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#5C1A2B]"
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>

          </div>

          {/* Description */}
          <div className="lg:col-span-2">

            <label className="flex items-center gap-2 text-[#5C1A2B] font-semibold mb-3">
              <FileText size={18} />
              Describe Your Request
            </label>

            <textarea
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: Please send two extra pillows to Room 204 before 8 PM."
              className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:border-[#5C1A2B]"
            />

          </div>

          {/* Submit */}
          <div className="lg:col-span-2">

            <button
              type="submit"
              className="w-full bg-[#5C1A2B] hover:bg-[#7A2840] text-white py-4 rounded-xl text-lg font-semibold shadow-xl transition hover:scale-[1.01]"
            >
              Submit Service Request
            </button>

          </div>

        </form>

      </div>

    </main>

  </div>
);
}

export default ServiceRequestPage;