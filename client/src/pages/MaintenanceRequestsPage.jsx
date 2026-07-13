import { useState } from "react";
import AsideBar from "../components/AsideBar";
import { Wrench, Search } from "lucide-react";

function MaintenanceRequestPage() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      room: 101,
      issue: "Air Conditioner Not Working",
      priority: "High",
      status: "Open",
    },
    {
      id: 2,
      room: 205,
      issue: "Water Leakage",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      room: 302,
      issue: "Broken TV",
      priority: "Low",
      status: "Resolved",
    },
    {
      id: 4,
      room: 405,
      issue: "Light Not Working",
      priority: "Medium",
      status: "Open",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const updateStatus = (id) => {
    setRequests(
      requests.map((item) => {
        if (item.id !== id) return item;

        let nextStatus = "Resolved";

        if (item.status === "Open")
          nextStatus = "In Progress";
        else if (item.status === "In Progress")
          nextStatus = "Resolved";

        return {
          ...item,
          status: nextStatus,
        };
      })
    );
  };

  const filtered = requests.filter((item) => {
    const matchSearch =
      item.issue.toLowerCase().includes(search.toLowerCase()) ||
      item.room.toString().includes(search);

    const matchFilter =
      filter === "All" || item.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#F5EFE7]">

      <AsideBar />

      <main className="flex-1 p-6">

        {/* Header */}

        <div className="bg-linear-to-r from-[#5C1A2B] to-[#7A2840] rounded-3xl p-8 shadow-xl">

          <div className="flex items-center gap-4">

            <div className="bg-[#D9B26F] p-4 rounded-2xl">

              <Wrench
                size={35}
                className="text-[#5C1A2B]"
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-white">
                Maintenance Requests
              </h1>

              <p className="text-[#F3D89B] mt-2">
                Manage all hotel maintenance issues.
              </p>

            </div>

          </div>

        </div>

        {/* Search & Filter */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8 flex flex-col md:flex-row gap-4 justify-between">

          <div className="relative w-full md:w-80">

            <Search
              className="absolute left-3 top-3.5 text-gray-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Room or Issue..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#5C1A2B]"
            />

          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#5C1A2B]"
          >
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8 overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Room
                </th>

                <th className="text-left py-4">
                  Issue
                </th>

                <th className="text-left py-4">
                  Priority
                </th>

                <th className="text-left py-4">
                  Status
                </th>

                <th className="text-left py-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-[#F9F6F2]"
                >

                  <td className="py-4 font-semibold">
                    {item.room}
                  </td>

                  <td>
                    {item.issue}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : item.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.priority}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status === "Open"
                          ? "bg-red-100 text-red-700"
                          : item.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>

                    {item.status !== "Resolved" ? (

                      <button
                        onClick={() =>
                          updateStatus(item.id)
                        }
                        className="bg-[#5C1A2B] hover:bg-[#7A2840] text-white px-4 py-2 rounded-lg transition"
                      >
                        Next Status
                      </button>

                    ) : (

                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default MaintenanceRequestPage;