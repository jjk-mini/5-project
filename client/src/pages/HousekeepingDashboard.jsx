// Housekeeping dashboard — task list, mark rooms cleanimport { useState } from "react";
import AsideBar from "../components/AsideBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  ChevronDown,
  CheckCircle2,
  BedDouble,
  Clock3,
  Wrench,
} from "lucide-react";

const initialRooms = [
  { id: 101, status: "Pending" },
  { id: 102, status: "Pending" },
  { id: 103, status: "Cleaned" },
  { id: 104, status: "Pending" },
  { id: 105, status: "Pending" },
  { id: 106, status: "Cleaned" },
];

const initialIssues = [
  {
    id: 1,
    room: 101,
    issue: "AC Not Working",
    status: "Open",
  },
  {
    id: 2,
    room: 205,
    issue: "Water Leakage",
    status: "In Progress",
  },
  {
    id: 3,
    room: 304,
    issue: "Broken Light",
    status: "Resolved",
  },
];

function HousekeepingDashboard() {

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [rooms, setRooms] = useState(initialRooms);
  const [issues, setIssues] = useState(initialIssues);

  const dashboardOptions = [
    {
      label: "Admin Dashboard",
      path: "/",
    },
    {
      label: "Housekeeping Dashboard",
      path: "/housekeeping-dashboard",
    },
    {
      label: "Staff Management Dashboard",
      path: "/staff-management",
    },
  ];

  const handleClean = (id) => {
    setRooms(
      rooms.map((room) =>
        room.id === id
          ? {
            ...room,
            status: "Cleaned",
          }
          : room
      )
    );
  };

  const updateIssueStatus = (id, status) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id
          ? {
            ...issue,
            status,
          }
          : issue
      )
    );
  };

  const assigned = rooms.length;

  const cleaned = rooms.filter(
    (room) => room.status === "Cleaned"
  ).length;

  const remaining = assigned - cleaned;

  const stats = [
    {
      label: "Rooms Assigned",
      value: assigned,
      icon: BedDouble,
    },
    {
      label: "Rooms Cleaned",
      value: cleaned,
      icon: CheckCircle2,
    },
    {
      label: "Rooms Remaining",
      value: remaining,
      icon: Clock3,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5EFE7]">

      <AsideBar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* Header */}

        <div className="bg-linear-to-r from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-8 mb-8">

          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Housekeeping Dashboard
          </h1>

          <p className="text-[#F3D89B] mt-3 text-lg">
            Monitor room cleaning, maintenance requests and housekeeping operations.
          </p>

          <div className="mt-6 relative w-full md:w-80">

            <label className="block text-sm font-medium text-[#F3D89B] mb-2">
              Select Dashboard
            </label>

            <button
              type="button"
              onClick={() =>
                setIsDashboardOpen(!isDashboardOpen)
              }
              className="w-full flex items-center justify-between border border-[#D9B26F] bg-[#D9B26F] text-[#5C1A2B] rounded-lg p-3 font-medium"
            >

              <span className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                Select Dashboard
              </span>

              <ChevronDown
                className={`transition-transform ${isDashboardOpen ? "rotate-180" : ""
                  }`}
              />

            </button>

            {isDashboardOpen && (

              <ul className="absolute mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-20">

                {dashboardOptions.map((item) => (

                  <li key={item.path}>

                    <Link
                      to={item.path}
                      onClick={() =>
                        setIsDashboardOpen(false)
                      }
                      className="block px-4 py-3 hover:bg-[#F5EFE7]"
                    >
                      {item.label}
                    </Link>

                  </li>

                ))}

              </ul>

            )}

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {stats.map(({ label, value, icon: Icon }) => (

            <div
              key={label}
              className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-6 text-white"
            >

              <Icon
                size={38}
                className="text-[#D9B26F]"
              />

              <p className="mt-5 text-gray-200">
                {label}
              </p>

              <h1 className="text-3xl font-bold mt-2">
                {value}
              </h1>

            </div>

          ))}

        </div>

        {/* PART 2 STARTS HERE */}
        {/* Today's Cleaning List */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-[#5C1A2B]">
              Today's Cleaning List
            </h2>

            <span className="bg-[#D9B26F] text-[#5C1A2B] px-4 py-2 rounded-full font-semibold">
              {cleaned}/{assigned} Cleaned
            </span>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4 text-[#5C1A2B]">
                    Room
                  </th>

                  <th className="text-left py-4 text-[#5C1A2B]">
                    Status
                  </th>

                  <th className="text-left py-4 text-[#5C1A2B]">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {rooms.map((room) => (

                  <tr
                    key={room.id}
                    className="border-b hover:bg-[#F9F4EE]"
                  >

                    <td className="py-4 font-semibold">
                      Room {room.id}
                    </td>

                    <td>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${room.status === "Cleaned"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {room.status}
                      </span>

                    </td>

                    <td>

                      {room.status === "Pending" ? (

                        <button
                          onClick={() => handleClean(room.id)}
                          className="bg-[#5C1A2B] hover:bg-[#7A2840] text-white px-5 py-2 rounded-lg transition"
                        >
                          Mark Room Cleaned
                        </button>

                      ) : (

                        <span className="text-green-600 font-semibold">
                          ✔ Completed
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* PART 3 STARTS HERE */}
        {/* Maintenance Requests */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-[#5C1A2B]">
              Maintenance Requests
            </h2>

            <Link
              to="/maintenance"
              className="bg-[#5C1A2B] hover:bg-[#7A2840] text-white px-5 py-3 rounded-xl"
            >
              View Maintenance Requests
            </Link>
          </div>

        
        </div>
       

       

         

      </main>
        </div>
    
    

  );
}

export default HousekeepingDashboard;