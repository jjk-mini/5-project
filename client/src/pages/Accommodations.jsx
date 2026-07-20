import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
Search,
BedDouble,
Users,
Maximize,
Mountain,
Filter,
Star,
ArrowRight,
ChevronDown,
Heart,
Utensils,
Sparkles,
} from "lucide-react";

import {
COLORS,
FONTS,
SHADOWS,
BORDER_RADIUS,
} from "../constants/theme";

import { getAllRooms } from "../api/roomApi";

export const fadeUp = {
initial: { opacity: 0, y: 24 },
whileInView: { opacity: 1, y: 0 },
viewport: { once: true },
transition: { duration: 0.5 },
};

export const fadeIn = {
initial: { opacity: 0 },
whileInView: { opacity: 1 },
viewport: { once: true },
transition: { duration: 0.4 },
};

export default function Accommodations() {
const [rooms, setRooms] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [selectedType, setSelectedType] = useState("All");
const [sortBy, setSortBy] = useState("default");
const [showFilters, setShowFilters] = useState(false);
const [hoveredRoom, setHoveredRoom] = useState(null);

// LOAD ROOMS
useEffect(() => {
const loadRooms = async () => {
try {
const data = await getAllRooms();


    const roomData = Array.isArray(data)
      ? data
      : data?.rooms || data?.data || [];

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

// ROOM TYPES
const roomTypes = useMemo(() => {
const types = rooms
.map((room) => room.type)
.filter(Boolean);


return ["All", ...new Set(types)];


}, [rooms]);

// FILTER AND SEARCH
const filteredRooms = useMemo(() => {
let data = [...rooms];


if (selectedType !== "All") {
  data = data.filter(
    (room) => room.type === selectedType
  );
}

if (search.trim()) {
  const query = search.toLowerCase();

  data = data.filter((room) => {
    const roomNumber = String(
      room.roomNumber || ""
    ).toLowerCase();

    const type = String(
      room.type || ""
    ).toLowerCase();

    const view = String(
      room.view || ""
    ).toLowerCase();

    return (
      roomNumber.includes(query) ||
      type.includes(query) ||
      view.includes(query)
    );
  });
}

switch (sortBy) {
  case "price-low":
    data.sort(
      (a, b) =>
        Number(a.price || 0) -
        Number(b.price || 0)
    );
    break;

  case "price-high":
    data.sort(
      (a, b) =>
        Number(b.price || 0) -
        Number(a.price || 0)
    );
    break;

  case "rating":
    data.sort(
      (a, b) =>
        Number(b.rating || 0) -
        Number(a.rating || 0)
    );
    break;

  default:
    break;
}

return data;


}, [
rooms,
selectedType,
search,
sortBy,
]);

// STATISTICS
const availableRooms = rooms.filter(
(room) =>
String(room.status || "").toLowerCase() ===
"available"
).length;

const averageRating =
rooms.length > 0
? rooms.reduce(
(total, room) =>
total + Number(room.rating || 0),
0
) / rooms.length
: 0;

return (
<main
style={{
background: COLORS.BACKGROUND,
minHeight: "100vh",
fontFamily: FONTS.BODY,
}}
>
{/* HERO SECTION */} <section
     className="relative min-h-[620px] flex items-center overflow-hidden"
   >
<div
className="absolute inset-0 bg-cover bg-center"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')",
transform: "scale(1.05)",
}}
/>


    <div
      className="absolute inset-0"
      style={{
        background: `
          linear-gradient(
            135deg,
            rgba(31,26,23,0.95) 0%,
            rgba(31,26,23,0.7) 40%,
            rgba(31,26,23,0.4) 70%,
            rgba(31,26,23,0.15) 100%
          ),
          linear-gradient(
            to bottom,
            rgba(31,26,23,0.3) 0%,
            transparent 30%,
            transparent 60%,
            rgba(31,26,23,0.6) 100%
          )
        `,
      }}
    />

    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p
            className="inline-flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-[0.15em] rounded-full"
            style={{
              color: COLORS.ACCENT,
              background:
                "rgba(212,168,130,0.15)",
              border:
                "1px solid rgba(212,168,130,0.2)",
            }}
          >
            <span
              className="h-px w-4"
              style={{
                background: COLORS.ACCENT,
              }}
            />

            Luxury Collection

            <span
              className="h-px w-4"
              style={{
                background: COLORS.ACCENT,
              }}
            />
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 mb-4 text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15]"
          style={{
            fontFamily: FONTS.HEADING,
            color: COLORS.CREAM,
          }}
        >
          Find Your
          <br />

          <span
            style={{
              color: COLORS.ACCENT,
            }}
          >
            Perfect Stay
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl text-base md:text-lg font-light leading-[1.8]"
          style={{
            color:
              "rgba(248,246,243,0.85)",
          }}
        >
          Discover elegant rooms and luxury suites
          designed to provide exceptional comfort,
          unforgettable experiences and premium
          hospitality.
        </motion.p>

        <div className="mt-8 flex items-center gap-6">
          <div>
            <p
              className="text-2xl font-light"
              style={{
                color: COLORS.CREAM,
              }}
            >
              {rooms.length}
            </p>

            <p
              className="text-xs uppercase tracking-[0.15em]"
              style={{
                color:
                  "rgba(248,246,243,0.5)",
              }}
            >
              Rooms
            </p>
          </div>

          <div
            className="w-px h-10"
            style={{
              background:
                "rgba(248,246,243,0.15)",
            }}
          />

          <div>
            <p
              className="text-2xl font-light"
              style={{
                color: COLORS.CREAM,
              }}
            >
              {availableRooms}
            </p>

            <p
              className="text-xs uppercase tracking-[0.15em]"
              style={{
                color:
                  "rgba(248,246,243,0.5)",
              }}
            >
              Available
            </p>
          </div>

          <div
            className="w-px h-10"
            style={{
              background:
                "rgba(248,246,243,0.15)",
            }}
          />

          <div>
            <p
              className="text-2xl font-light"
              style={{
                color: COLORS.ACCENT,
              }}
            >
              {averageRating.toFixed(1)}
            </p>

            <p
              className="text-xs uppercase tracking-[0.15em]"
              style={{
                color:
                  "rgba(248,246,243,0.5)",
              }}
            >
              Rating
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* SEARCH AND FILTER */}
  <section className="max-w-[1200px] mx-auto px-6 py-12">
    <motion.div
      {...fadeUp}
      className="p-6 md:p-8"
      style={{
        background: COLORS.SURFACE,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
        border:
          `1px solid ${COLORS.BORDER}`,
      }}
    >
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{
              color:
                COLORS.TEXT_SECONDARY,
            }}
          />

          <input
            type="text"
            placeholder="Search rooms by number, type, or view..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-12 pr-4 py-3.5 outline-none"
            style={{
              borderRadius:
                BORDER_RADIUS.MEDIUM,
              border:
                `2px solid ${COLORS.BORDER}`,
              background:
                COLORS.BACKGROUND,
              color:
                COLORS.TEXT_PRIMARY,
            }}
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value)
          }
          className="px-4 py-3.5 min-w-[160px] outline-none"
          style={{
            borderRadius:
              BORDER_RADIUS.MEDIUM,
            border:
              `2px solid ${COLORS.BORDER}`,
            background:
              COLORS.BACKGROUND,
            color:
              COLORS.TEXT_PRIMARY,
          }}
        >
          {roomTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="px-4 py-3.5 min-w-[150px] outline-none"
          style={{
            borderRadius:
              BORDER_RADIUS.MEDIUM,
            border:
              `2px solid ${COLORS.BORDER}`,
            background:
              COLORS.BACKGROUND,
            color:
              COLORS.TEXT_PRIMARY,
          }}
        >
          <option value="default">
            Sort by
          </option>

          <option value="price-low">
            Lowest Price
          </option>

          <option value="price-high">
            Highest Price
          </option>

          <option value="rating">
            Highest Rating
          </option>
        </select>

        <button
          onClick={() =>
            setShowFilters(!showFilters)
          }
          className="flex items-center gap-2 px-6 py-3.5 font-semibold"
          style={{
            background: COLORS.PRIMARY,
            color: COLORS.CREAM,
            borderRadius:
              BORDER_RADIUS.MEDIUM,
          }}
        >
          <Filter size={18} />

          Filters

          <ChevronDown
            size={16}
            style={{
              transform: showFilters
                ? "rotate(180deg)"
                : "rotate(0)",
              transition:
                "transform 0.3s ease",
            }}
          />
        </button>
      </div>

      {showFilters && (
        <div
          className="mt-6 pt-6 flex flex-wrap gap-4"
          style={{
            borderTop:
              `1px solid ${COLORS.BORDER}`,
          }}
        >
          {[
            "All Amenities",
            "WiFi",
            "TV",
            "Kitchen",
            "Jacuzzi",
            "Pool Access",
            "Butler Service",
          ].map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 text-sm"
              style={{
                color:
                  COLORS.TEXT_SECONDARY,
              }}
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                style={{
                  accentColor:
                    COLORS.ACCENT,
                }}
              />

              {amenity}
            </label>
          ))}
        </div>
      )}
    </motion.div>
  </section>

  {/* ROOM GRID */}
  <section className="max-w-[1200px] mx-auto px-6 pb-20">
    <motion.div
      {...fadeUp}
      className="mb-8"
    >
      <h2
        className="text-3xl md:text-4xl font-light"
        style={{
          fontFamily: FONTS.HEADING,
          color: COLORS.PRIMARY,
        }}
      >
        Luxury Rooms & Suites
      </h2>

      <p
        className="mt-2 text-sm"
        style={{
          color:
            COLORS.TEXT_SECONDARY,
        }}
      >
        <span
          style={{
            color: COLORS.ACCENT,
            fontWeight: 600,
          }}
        >
          {filteredRooms.length}
        </span>{" "}
        Premium Rooms Available
      </p>
    </motion.div>

    {loading && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(
          (item) => (
            <div
              key={item}
              className="h-[460px] animate-pulse"
              style={{
                borderRadius:
                  BORDER_RADIUS.LARGE,
                background:
                  COLORS.SURFACE,
              }}
            />
          )
        )}
      </div>
    )}

    {!loading &&
      filteredRooms.length === 0 && (
        <motion.div
          {...fadeIn}
          className="text-center py-20"
        >
          <Search
            size={40}
            className="mx-auto mb-5"
            style={{
              color: COLORS.ACCENT,
            }}
          />

          <h3
            className="text-2xl font-light"
            style={{
              fontFamily:
                FONTS.HEADING,
              color:
                COLORS.PRIMARY,
            }}
          >
            No Rooms Found
          </h3>

          <p
            className="mt-2 text-sm"
            style={{
              color:
                COLORS.TEXT_SECONDARY,
            }}
          >
            Try adjusting your search or filters.
          </p>
        </motion.div>
      )}

    {!loading &&
      filteredRooms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(
            (room, index) => {
              const amenities =
                Array.isArray(
                  room.amenities
                )
                  ? room.amenities
                  : [];

              const isAvailable =
                String(
                  room.status || ""
                ).toLowerCase() ===
                "available";

              const roomArea =
                room.area ||
                room.size ||
                "-";

              const rating =
                Number(
                  room.rating || 0
                );

              return (
                <motion.div
                  key={room._id}
                  {...fadeUp}
                  transition={{
                    duration: 0.4,
                    delay:
                      (index % 6) *
                      0.05,
                  }}
                  className="group overflow-hidden transition-all duration-500"
                  style={{
                    background:
                      COLORS.SURFACE,
                    borderRadius:
                      BORDER_RADIUS.LARGE,
                    border:
                      `1px solid ${COLORS.BORDER}`,
                    boxShadow:
                      SHADOWS.CARD,
                    transform:
                      hoveredRoom ===
                      room._id
                        ? "translateY(-8px)"
                        : "translateY(0)",
                  }}
                  onMouseEnter={() =>
                    setHoveredRoom(
                      room._id
                    )
                  }
                  onMouseLeave={() =>
                    setHoveredRoom(null)
                  }
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={
                        room.image ||
                        "/rooms/default-room.jpg"
                      }
                      alt={
                        room.type ||
                        "Hotel room"
                      }
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div
                      className="absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold uppercase rounded-full"
                      style={{
                        background:
                          isAvailable
                            ? COLORS.SUCCESS
                            : COLORS.ERROR,
                        color: "#fff",
                      }}
                    >
                      {room.status ||
                        "Unknown"}
                    </div>

                    <div
                      className="absolute bottom-4 left-4 px-4 py-2 rounded-full font-bold text-sm"
                      style={{
                        background:
                          COLORS.ACCENT,
                        color:
                          COLORS.PRIMARY,
                      }}
                    >
                      PKR{" "}
                      {Number(
                        room.price || 0
                      ).toLocaleString()}
                    </div>

                    <div
                      className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      style={{
                        background:
                          "rgba(0,0,0,0.6)",
                      }}
                    >
                      <Star
                        size={14}
                        fill={
                          COLORS.WARNING
                        }
                        style={{
                          color:
                            COLORS.WARNING,
                        }}
                      />

                      <span className="text-white text-sm font-semibold">
                        {rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-xl font-semibold"
                      style={{
                        fontFamily:
                          FONTS.HEADING,
                        color:
                          COLORS.PRIMARY,
                      }}
                    >
                      {room.type ||
                        "Luxury Room"}
                    </h3>

                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          COLORS.TEXT_SECONDARY,
                      }}
                    >
                      Room{" "}
                      {room.roomNumber ||
                        "-"}
                    </p>

                    <p
                      className="text-sm mt-3 leading-relaxed"
                      style={{
                        color:
                          COLORS.TEXT_SECONDARY,
                      }}
                    >
                      {room.description ||
                        "Experience comfort, elegance and premium hospitality in our beautifully designed accommodation."}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {amenities
                        .slice(0, 3)
                        .map(
                          (
                            amenity
                          ) => (
                            <span
                              key={
                                amenity
                              }
                              className="text-xs px-3 py-1 rounded-full"
                              style={{
                                background:
                                  "rgba(212,168,130,0.08)",
                                color:
                                  COLORS.TEXT_SECONDARY,
                                border:
                                  "1px solid rgba(212,168,130,0.1)",
                              }}
                            >
                              {amenity}
                            </span>
                          )
                        )}

                      {amenities.length >
                        3 && (
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background:
                              COLORS.BACKGROUND,
                            color:
                              COLORS.TEXT_SECONDARY,
                            border:
                              `1px solid ${COLORS.BORDER}`,
                          }}
                        >
                          +
                          {amenities.length -
                            3}
                        </span>
                      )}
                    </div>

                    <div
                      className="grid grid-cols-2 gap-3 mt-4 py-4 border-y"
                      style={{
                        borderColor:
                          COLORS.BORDER,
                      }}
                    >
                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{
                          color:
                            COLORS.TEXT_SECONDARY,
                        }}
                      >
                        <Users
                          size={16}
                          style={{
                            color:
                              COLORS.ACCENT,
                          }}
                        />

                        {room.guests ||
                          "-"}{" "}
                        Guests
                      </div>

                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{
                          color:
                            COLORS.TEXT_SECONDARY,
                        }}
                      >
                        <Maximize
                          size={16}
                          style={{
                            color:
                              COLORS.ACCENT,
                          }}
                        />

                        {roomArea}
                      </div>

                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{
                          color:
                            COLORS.TEXT_SECONDARY,
                        }}
                      >
                        <BedDouble
                          size={16}
                          style={{
                            color:
                              COLORS.ACCENT,
                          }}
                        />

                        {room.bed ||
                          "-"}
                      </div>

                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{
                          color:
                            COLORS.TEXT_SECONDARY,
                        }}
                      >
                        <Mountain
                          size={16}
                          style={{
                            color:
                              COLORS.ACCENT,
                          }}
                        />

                        {room.view ||
                          "-"}
                      </div>
                    </div>

                    <Link
                      to={`/rooms/experience/${room._id}`}
                      className="flex items-center justify-center gap-2 w-full mt-5 py-3 font-semibold"
                      style={{
                        background:
                          COLORS.PRIMARY,
                        color:
                          COLORS.CREAM,
                        borderRadius:
                          BORDER_RADIUS.MEDIUM,
                      }}
                    >
                      View Room
                      <ArrowRight
                        size={18}
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      )}
  </section>

  {/* FEATURES */}
  <section className="max-w-[1200px] mx-auto px-6 pb-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: BedDouble,
          title: "Luxury Rooms",
          desc: "Beautifully designed rooms with modern interiors and premium furnishings.",
        },
        {
          icon: Users,
          title: "24/7 Concierge",
          desc: "Professional concierge service available any time during your stay.",
        },
        {
          icon: Utensils,
          title: "Fine Dining",
          desc: "World-class restaurants serving international cuisine.",
        },
        {
          icon: Sparkles,
          title: "Spa & Wellness",
          desc: "Relax with luxurious spa treatments and wellness experiences.",
        },
      ].map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            {...fadeUp}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
            }}
            className="p-8 text-center"
            style={{
              background:
                COLORS.SURFACE,
              borderRadius:
                BORDER_RADIUS.LARGE,
              border:
                `1px solid ${COLORS.BORDER}`,
              boxShadow:
                SHADOWS.CARD,
            }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{
                background:
                  "rgba(212,168,130,0.1)",
              }}
            >
              <Icon
                size={28}
                style={{
                  color:
                    COLORS.ACCENT,
                }}
              />
            </div>

            <h3
              className="text-lg font-semibold"
              style={{
                fontFamily:
                  FONTS.HEADING,
                color:
                  COLORS.PRIMARY,
              }}
            >
              {item.title}
            </h3>

            <p
              className="mt-2 text-sm leading-relaxed"
              style={{
                color:
                  COLORS.TEXT_SECONDARY,
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  </section>

  {/* CTA */}
  <section
    className="relative overflow-hidden py-24 px-6"
    style={{
      background:
        COLORS.PRIMARY,
    }}
  >
    <motion.div
      {...fadeUp}
      className="relative mx-auto max-w-[800px] text-center"
    >
      <div
        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
        style={{
          background:
            "rgba(212,168,130,0.15)",
          border:
            "2px solid rgba(212,168,130,0.2)",
        }}
      >
        <Heart
          size={32}
          style={{
            color: COLORS.ACCENT,
          }}
        />
      </div>

      <h2
        className="text-3xl md:text-5xl font-light"
        style={{
          fontFamily: FONTS.HEADING,
          color: COLORS.CREAM,
        }}
      >
        Experience Luxury Like Never Before
      </h2>

      <p
        className="max-w-2xl mx-auto mt-4 text-base leading-relaxed"
        style={{
          color:
            "rgba(248,246,243,0.75)",
        }}
      >
        Discover elegant accommodations,
        exceptional hospitality and unforgettable
        moments.
      </p>

      <Link
        to="/rooms"
        className="inline-flex items-center gap-3 mt-8 px-8 py-4 text-sm font-semibold rounded-full"
        style={{
          background: COLORS.ACCENT,
          color: COLORS.PRIMARY,
        }}
      >
        Book Your Stay
        <ArrowRight size={20} />
      </Link>
    </motion.div>
  </section>
</main>

);
}
