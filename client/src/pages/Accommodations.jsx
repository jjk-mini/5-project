import { useState } from "react";
import { Link } from "react-router-dom";
import { rooms } from "../data/roomsData";
import { COLORS, FONTS } from "../constants/theme";

export default function Accommodations() {
  const [activeType, setActiveType] = useState("All");
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const types = ["All", ...new Set(rooms.map((r) => r.type))];

  const filtered = rooms.filter((r) => {
    const matchesType = activeType === "All" || r.type === activeType;
    const matchesQuery = r.number.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div
      style={{
        background: COLORS.BACKGROUND,
        minHeight: "100vh",
        fontFamily: FONTS.BODY,
        padding: "64px 6vw 96px",
      }}
    >
      {/* ── Hero banner ── */}
      <div
        style={{
          position: "relative",
          height: 280,
          borderRadius: 18,
          overflow: "hidden",
          marginBottom: 44,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1700457551715-1a841c35c0f3?w=1600&q=80&auto=format&fit=crop"
          alt="Hotel rooms and suites"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(26,26,26,0.55) 0%, rgba(92,26,43,0.75) 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.BODY,
              letterSpacing: 4,
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.ACCENT,
              marginBottom: 10,
            }}
          >
            FIND YOUR STAY
          </div>
          <h1
            style={{
              fontFamily: FONTS.HEADING,
              fontSize: "clamp(30px, 4vw, 46px)",
              color: "#fff",
              margin: 0,
            }}
          >
            Every Room Tells a Different Story
          </h1>
          <p
            style={{
              color: COLORS.CREAM,
              maxWidth: 560,
              margin: "14px auto 0",
              lineHeight: 1.6,
              fontSize: 15,
            }}
          >
            From a quiet garden-facing room to the private-pool Presidential
            suite — browse each stay and read what actually makes it different.
          </p>
        </div>
      </div>

      {/* ── Filters ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 44,
        }}
      >
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            style={{
              padding: "9px 20px",
              borderRadius: 999,
              border: `1px solid ${activeType === t ? COLORS.PRIMARY : COLORS.BORDER}`,
              background: activeType === t ? COLORS.PRIMARY : COLORS.SURFACE,
              color: activeType === t ? COLORS.CREAM : COLORS.TEXT_PRIMARY,
              fontFamily: FONTS.BODY,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {t}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by room number…"
          style={{
            padding: "9px 16px",
            borderRadius: 999,
            border: `1px solid ${COLORS.BORDER}`,
            fontFamily: FONTS.BODY,
            fontSize: 14,
            minWidth: 200,
            outline: "none",
            background: COLORS.SURFACE,
            color: COLORS.TEXT_PRIMARY,
          }}
        />
      </div>

      {/* ── Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 32,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {filtered.map((room) => {
          const isHovered = hoveredId === room.id;
          const isBooked = room.status === "booked";
          return (
            <div
              key={room.id}
              onMouseEnter={() => setHoveredId(room.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: COLORS.SURFACE,
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${COLORS.BORDER}`,
                boxShadow: isHovered
                  ? "0 18px 32px rgba(92,26,43,0.16)"
                  : "0 1px 4px rgba(92,26,43,0.07)",
                transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                transition: "all 0.28s ease",
              }}
            >
              <div style={{ position: "relative", height: 170, overflow: "hidden" }}>
                <img
                  src={room.image}
                  alt={room.type + " " + room.number}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: isHovered ? "scale(1.06)" : "scale(1)",
                    transition: "transform 0.5s ease",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    padding: "5px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#fff",
                    background: isBooked ? COLORS.PRIMARY : COLORS.SUCCESS,
                  }}
                >
                  {isBooked ? "Booked" : "Available"}
                </span>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px 18px 12px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                    color: "#fff",
                    fontFamily: FONTS.BODY,
                    fontSize: 13,
                  }}
                >
                  PKR {room.price.toLocaleString()} / night
                </div>
              </div>

              <div style={{ padding: "20px 20px 22px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 4,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: FONTS.HEADING,
                      color: COLORS.PRIMARY,
                      fontSize: 22,
                      margin: 0,
                    }}
                  >
                    {room.type}
                  </h3>
                  <span style={{ color: COLORS.TEXT_SECONDARY, fontSize: 13 }}>
                    {room.number}
                  </span>
                </div>

                <p
                  style={{
                    color: COLORS.TEXT_SECONDARY,
                    fontSize: 14,
                    lineHeight: 1.55,
                    margin: "10px 0 14px",
                  }}
                >
                  {room.description.length > 96
                    ? room.description.slice(0, 96).trim() + "…"
                    : room.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    fontSize: 12.5,
                    color: COLORS.TEXT_PRIMARY,
                    marginBottom: 16,
                  }}
                >
                  {[
                    `${room.guests} guests`,
                    room.size,
                    room.bed,
                    room.view,
                  ].map((info) => (
                    <span
                      key={info}
                      style={{
                        background: COLORS.CREAM,
                        borderRadius: 6,
                        padding: "5px 10px",
                      }}
                    >
                      {info}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/rooms/${room.id}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                    background: COLORS.PRIMARY,
                    color: COLORS.CREAM,
                    fontFamily: FONTS.BODY,
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: 0.5,
                    padding: "12px 0",
                    borderRadius: 8,
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.PRIMARY)}
                >
                  See Room Story
                </Link>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: COLORS.TEXT_SECONDARY,
            }}
          >
            No rooms match that search — try a different room number or type.
          </p>
        )}
      </div>
    </div>
  );
}
