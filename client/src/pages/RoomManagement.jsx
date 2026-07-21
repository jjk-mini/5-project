import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllRooms,
  deleteRoom,
} from "../api/roomApi";

import {
  BedDouble,
  Search,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

import {
  COLORS,
  FONTS,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";
import AsideBar from "../components/AsideBar";

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deletingId, setDeletingId] = useState(null);

  // =========================
  // LOAD ROOMS
  // =========================
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await getAllRooms();

        const roomData = Array.isArray(data)
          ? data
          : data?.rooms || [];

        setRooms(roomData);
      } catch (error) {
        console.error("Failed to load rooms:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // =========================
  // DELETE ROOM
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await deleteRoom(id);

      setRooms((previousRooms) =>
        previousRooms.filter(
          (room) => room._id !== id
        )
      );

      alert("Room deleted successfully");
    } catch (error) {
      console.error("Delete room error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete room"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // FILTER ROOMS
  // =========================
  const filteredRooms = rooms.filter((room) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      String(room.roomNumber || "")
        .toLowerCase()
        .includes(searchText) ||
      String(room.type || "")
        .toLowerCase()
        .includes(searchText);

    const matchFilter =
      filter === "All" ||
      String(room.status || "").toLowerCase() === filter;

    return matchSearch && matchFilter;
  });

  // =========================
  // STATUS STYLE
  // =========================
  const getStatusStyle = (status) => {
    const normalizedStatus = String(
      status || ""
    ).toLowerCase();

    if (normalizedStatus === "available") {
      return {
        background: "#EAF7F0",
        color: COLORS.SUCCESS,
      };
    }

    if (normalizedStatus === "occupied") {
      return {
        background: "#FDECEC",
        color: COLORS.ERROR,
      };
    }

    if (normalizedStatus === "reserved") {
      return {
        background: "#FFF7E6",
        color: COLORS.WARNING,
      };
    }

    if (normalizedStatus === "cleaning") {
      return {
        background: "#E8F1FD",
        color: COLORS.INFO,
      };
    }

    if (normalizedStatus === "maintenance") {
      return {
        background: "#FDECEC",
        color: COLORS.ERROR,
      };
    }

    return {
      background: "#E8F1FD",
      color: COLORS.INFO,
    };
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          background: COLORS.BACKGROUND,
        }}
      >
        <AsideBar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <div
                className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                style={{ borderColor: COLORS.ACCENT, borderTopColor: "transparent" }}
              />
              <p
                className="text-xl mt-4"
                style={{
                  color: COLORS.TEXT_SECONDARY,
                }}
              >
                Loading rooms...
              </p>
            </div>
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

      <main className="flex-1 p-6">
        {/* =========================
            HEADER
        ========================= */}
        <div
          className="p-8 mb-8"
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
          }}
        >
          <div className="flex justify-between items-center flex-wrap gap-5">
            <div className="flex items-center gap-4">
              <div
                className="p-4"
                style={{
                  background: COLORS.ACCENT,
                  borderRadius: BORDER_RADIUS.LARGE,
                }}
              >
                <BedDouble
                  size={35}
                  style={{
                    color: COLORS.PRIMARY,
                  }}
                />
              </div>

              <div>
                <h1
                  className="text-4xl font-bold text-white"
                  style={{
                    fontFamily: FONTS.HEADING,
                  }}
                >
                  Rooms Management
                </h1>

                <p
                  className="mt-2"
                  style={{
                    color: COLORS.ACCENT,
                  }}
                >
                  Manage hotel rooms, pricing, availability and room status.
                </p>
              </div>
            </div>

            <Link
              to="/admin/rooms/newroom"
              className="flex items-center gap-2"
              style={{
                background: COLORS.ACCENT,
                color: COLORS.PRIMARY,
                fontWeight: 600,
                padding: "12px 20px",
                borderRadius: BORDER_RADIUS.MEDIUM,
                textDecoration: "none",
                boxShadow: SHADOWS.DROPDOWN,
              }}
            >
              <Plus size={18} />
              Add Room
            </Link>
          </div>
        </div>

        {/* =========================
            SEARCH AND FILTER
        ========================= */}
        <div
          className="p-6 mb-8 flex flex-col md:flex-row justify-between gap-4"
          style={{
            background: COLORS.SURFACE,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
          }}
        >
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-3.5"
              style={{ color: COLORS.TEXT_SECONDARY }}
            />

            <input
              type="text"
              placeholder="Search Room Number or Type..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 outline-none"
              style={{
                border: `1px solid ${COLORS.BORDER}`,
                borderRadius: BORDER_RADIUS.MEDIUM,
                background: COLORS.BACKGROUND,
                color: COLORS.TEXT_PRIMARY,
                fontFamily: FONTS.BODY,
              }}
            />
          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
              background: COLORS.BACKGROUND,
              color: COLORS.TEXT_PRIMARY,
              cursor: "pointer",
              fontFamily: FONTS.BODY,
            }}
          >
            <option value="All">All</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* =========================
            STATISTICS
        ========================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Rooms",
              value: rooms.length,
              color: COLORS.INFO,
            },
            {
              label: "Available",
              value: rooms.filter(
                (room) =>
                  String(room.status || "").toLowerCase() ===
                  "available"
              ).length,
              color: COLORS.SUCCESS,
            },
            {
              label: "Occupied",
              value: rooms.filter(
                (room) =>
                  String(room.status || "").toLowerCase() ===
                  "occupied"
              ).length,
              color: COLORS.ERROR,
            },
            {
              label: "Reserved",
              value: rooms.filter(
                (room) =>
                  String(room.status || "").toLowerCase() ===
                  "reserved"
              ).length,
              color: COLORS.WARNING,
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: `${item.color}22`,
                border: `1px solid ${item.color}55`,
                borderRadius: BORDER_RADIUS.LARGE,
                padding: "22px",
                textAlign: "center",
                boxShadow: SHADOWS.CARD,
              }}
            >
              <h1
                style={{
                  fontSize: "34px",
                  color: item.color,
                  fontWeight: 700,
                  fontFamily: FONTS.HEADING,
                }}
              >
                {item.value}
              </h1>

              <p
                style={{
                  marginTop: "6px",
                  color: COLORS.TEXT_SECONDARY,
                  fontWeight: 500,
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* =========================
            ROOMS TABLE
        ========================= */}
        <div
          className="mt-8 overflow-x-auto"
          style={{
            background: COLORS.SURFACE,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
            border: `1px solid ${COLORS.BORDER}`,
          }}
        >
          <table className="w-full border-collapse min-w-[1100px]">
            <thead
              style={{
                background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
              }}
            >
              <tr>
                {[
                  "Room",
                  "Type",
                  "Image",
                  "Floor",
                  "Area",
                  "Persons",
                  "Price / Night",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="text-center py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredRooms.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-10"
                    style={{
                      color: COLORS.TEXT_SECONDARY,
                    }}
                  >
                    No rooms found.
                  </td>
                </tr>
              ) : (
                filteredRooms.map((room, index) => {
                  const statusStyle =
                    getStatusStyle(room.status);

                  return (
                    <tr
                      key={room._id}
                      className="transition-all duration-200 hover:bg-amber-50"
                      style={{
                        background:
                          index % 2 === 0
                            ? "#FFFFFF"
                            : "#FCFAF7",
                        borderBottom:
                          `1px solid ${COLORS.BORDER}`,
                      }}
                    >
                      <td
                        className="py-5 px-6 text-center font-semibold"
                        style={{
                          color: COLORS.TEXT_PRIMARY,
                        }}
                      >
                        #{room.roomNumber}
                      </td>

                      <td
                        className="py-5 px-6 text-center"
                        style={{
                          color: COLORS.TEXT_SECONDARY,
                        }}
                      >
                        {room.type || "-"}
                      </td>

                      <td className="py-5 px-6 text-center">
                        <img
                          src={
                            room.image ||
                            "/rooms/default-room.jpg"
                          }
                          alt={
                            room.type ||
                            "Hotel room"
                          }
                          style={{
                            width: "75px",
                            height: "55px",
                            objectFit: "cover",
                            borderRadius:
                              BORDER_RADIUS.MEDIUM,
                            border:
                              `2px solid ${COLORS.BORDER}`,
                            boxShadow:
                              SHADOWS.CARD,
                            margin: "auto",
                          }}
                        />
                      </td>

                      <td
                        className="py-5 px-6 text-center"
                        style={{
                          color: COLORS.TEXT_SECONDARY,
                        }}
                      >
                        {room.floor || "-"}
                      </td>

                      <td
                        className="py-5 px-6 text-center"
                        style={{
                          color: COLORS.TEXT_SECONDARY,
                        }}
                      >
                        {room.area || "-"}
                      </td>

                      <td
                        className="py-5 px-6 text-center"
                        style={{
                          color: COLORS.TEXT_SECONDARY,
                        }}
                      >
                        {room.guests || "-"}
                      </td>

                      <td
                        className="py-5 px-6 text-center font-semibold"
                        style={{
                          color: COLORS.TEXT_PRIMARY,
                        }}
                      >
                        PKR {room.price || "-"}
                      </td>

                      <td className="py-5 px-6 text-center">
                        <span
                          className="px-4 py-2 rounded-full text-sm font-semibold"
                          style={{
                            background:
                              statusStyle.background,
                            color:
                              statusStyle.color,
                          }}
                        >
                          {room.status || "Unknown"}
                        </span>
                      </td>

                      <td className="py-5 px-6">
                        <div className="flex justify-center gap-3">
                          {/* EDIT */}
                          <Link
                            to={`/admin/rooms/edit/${room._id}`}
                            className="flex items-center gap-2 text-white px-4 py-2 transition-all duration-200 hover:scale-105"
                            style={{
                              background: COLORS.PRIMARY,
                              borderRadius:
                                BORDER_RADIUS.MEDIUM,
                              textDecoration: "none",
                            }}
                          >
                            <Edit size={16} />
                            Edit
                          </Link>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(room._id)
                            }
                            disabled={
                              deletingId === room._id
                            }
                            className="flex items-center gap-2 text-white px-4 py-2 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                            style={{
                              background: COLORS.ERROR,
                              borderRadius:
                                BORDER_RADIUS.MEDIUM,
                            }}
                          >
                            <Trash2 size={16} />

                            {deletingId === room._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Footer */}
          {!loading && rooms.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderTop: `0.5px solid ${COLORS.BORDER}`,
                fontSize: "12px",
                color: COLORS.TEXT_SECONDARY,
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <span>Showing {filteredRooms.length} of {rooms.length} rooms</span>
              <span>Total {rooms.length} rooms in inventory</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default RoomsPage;