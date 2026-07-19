import { useState } from "react";
import AsideBar from "../components/AsideBar";
import { ConciergeBell, Search } from "lucide-react";
import {
  COLORS,
  FONTS,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";
import { Link } from "react-router-dom";

function ServicesPage() {
  const [services, setServices] = useState([
    {
      id: 1,
      room: 101,
      service: "Room Cleaning",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      room: 205,
      service: "Laundry Service",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      room: 302,
      service: "Fresh Towels",
      priority: "Low",
      status: "Completed",
    },
    {
      id: 4,
      room: 405,
      service: "Laundry Pickup",
      priority: "High",
      status: "Pending",
    },
    {
      id: 5,
      room: 502,
      service: "Bed Making",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 6,
      room: 601,
      service: "Laundry Delivery",
      priority: "Low",
      status: "Completed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const updateStatus = (id) => {
    setServices(
      services.map((item) => {
        if (item.id !== id) return item;

        let nextStatus = "Completed";

        if (item.status === "Pending")
          nextStatus = "In Progress";
        else if (item.status === "In Progress")
          nextStatus = "Completed";

        return {
          ...item,
          status: nextStatus,
        };
      })
    );
  };

  const filtered = services.filter((item) => {
    const matchSearch =
      item.service.toLowerCase().includes(search.toLowerCase()) ||
      item.room.toString().includes(search);

    const matchFilter =
      filter === "All" || item.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: COLORS.BACKGROUND,
        fontFamily: FONTS.BODY,
      }}
    >
      <AsideBar />

      <main className="flex-1 p-6">

<div
  className="p-8 mb-8"
  style={{
    background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
    borderRadius: BORDER_RADIUS.LARGE,
    boxShadow: SHADOWS.CARD,
  }}
>
  <div className="flex items-center justify-between flex-wrap gap-4">

    {/* Left Side */}
    <div className="flex items-center gap-4">
      <div
        className="p-4"
        style={{
          background: COLORS.ACCENT,
          borderRadius: BORDER_RADIUS.LARGE,
        }}
      >
        <ConciergeBell
          size={35}
          style={{ color: COLORS.PRIMARY }}
        />
      </div>

      <div>
        <h1
          className="text-4xl font-bold text-white"
          style={{
            fontFamily: FONTS.HEADING,
          }}
        >
          Service Requests
        </h1>

        <p
          className="mt-2"
          style={{
            color: COLORS.ACCENT,
          }}
        >
          Manage all room and laundry service requests.
        </p>
      </div>
    </div>

    <Link
      to="/services/newService"
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
      }}
    >
      + New Service
    </Link>

  </div>
</div>
        {/* Search & Filter */}

        <div
          className="p-6 mt-8 flex flex-col md:flex-row gap-4 justify-between"
          style={{
            background: COLORS.SURFACE,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
          }}
        >
          <div className="relative w-full md:w-80">

            <Search
              className="absolute left-3 top-3.5 text-gray-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Room or Service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 outline-none transition"
              style={{
                border: `1px solid ${COLORS.BORDER}`,
                borderRadius: BORDER_RADIUS.MEDIUM,
              }}
            />

          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
            }}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

        </div>

               {/* Table */}

        <div
          className="mt-8 overflow-hidden"
          style={{
            background: "#fff",
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
            border: `1px solid ${COLORS.BORDER}`,
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead
                style={{
                  background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
                }}
              >
                <tr>
                  <th
                    className="text-left py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Room
                  </th>

                  <th
                    className="text-left py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Service
                  </th>

                  <th
                    className="text-center py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Priority
                  </th>

                  <th
                    className="text-center py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Status
                  </th>

                  <th
                    className="text-center py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item, index) => (
                  <tr
                    key={item.id}
                    className="transition-all duration-200 hover:bg-amber-50"
                    style={{
                      background:
                        index % 2 === 0 ? "#FFFFFF" : "#FCFAF7",
                      borderBottom: `1px solid ${COLORS.BORDER}`,
                    }}
                  >
                    <td
                      className="py-5 px-6 font-semibold"
                      style={{
                        color: COLORS.TEXT_PRIMARY,
                      }}
                    >
                      #{item.room}
                    </td>

                    <td
                      className="py-5 px-6"
                      style={{
                        color: COLORS.TEXT_SECONDARY,
                      }}
                    >
                      {item.service}
                    </td>

                    <td className="py-5 px-6 text-center">
                      <span
                        className="px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                          background:
                            item.priority === "High"
                              ? "#FDECEC"
                              : item.priority === "Medium"
                              ? "#FFF7E6"
                              : "#EAF7F0",

                          color:
                            item.priority === "High"
                              ? COLORS.ERROR
                              : item.priority === "Medium"
                              ? COLORS.WARNING
                              : COLORS.SUCCESS,
                        }}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <span
                        className="px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                          background:
                            item.status === "Pending"
                              ? "#FDECEC"
                              : item.status === "In Progress"
                              ? "#FFF7E6"
                              : "#EAF7F0",

                          color:
                            item.status === "Pending"
                              ? COLORS.ERROR
                              : item.status === "In Progress"
                              ? COLORS.WARNING
                              : COLORS.SUCCESS,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-5 px-6 text-center">
                      {item.status !== "Completed" ? (
                        <button
                          onClick={() => updateStatus(item.id)}
                          className="text-white px-5 py-2 font-medium transition-all duration-200 hover:scale-105"
                          style={{
                            background: COLORS.PRIMARY,
                            borderRadius: BORDER_RADIUS.MEDIUM,
                            minWidth: "130px",
                          }}
                        >
                          Next Status
                        </button>
                      ) : (
                        <span
                          className="px-4 py-2 rounded-full text-sm font-semibold"
                          style={{
                            background: "#EAF7F0",
                            color: COLORS.SUCCESS,
                          }}
                        >
                          ✓ Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default ServicesPage;