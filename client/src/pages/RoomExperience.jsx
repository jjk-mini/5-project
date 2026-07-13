import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { rooms } from "../data/roomsData";
import { COLORS, FONTS } from "../constants/theme";

export default function RoomExperience() {
  const { id } = useParams();
  const room = rooms.find((r) => String(r.id) === String(id)) || rooms[0];
  const [activeImage, setActiveImage] = useState(room.image);
  const isBooked = room.status === "booked";

  const similar = rooms.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <div
      style={{
        background: COLORS.BACKGROUND,
        minHeight: "100vh",
        fontFamily: FONTS.BODY,
        padding: "48px 6vw 96px",
      }}
    >
      <Link
        to="/rooms"
        style={{
          color: COLORS.ACCENT,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 24,
        }}
      >
        ← Back to all rooms
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 44,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* ── Left: gallery + story ── */}
        <div>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              height: 380,
              marginBottom: 12,
              boxShadow: "0 10px 30px rgba(92,26,43,0.12)",
            }}
          >
            <img
              src={activeImage}
              alt={room.type}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
            {[room.image, ...room.gallery].map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(src)}
                style={{
                  padding: 0,
                  border: activeImage === src
                    ? `2px solid ${COLORS.ACCENT}`
                    : `2px solid transparent`,
                  borderRadius: 10,
                  overflow: "hidden",
                  cursor: "pointer",
                  width: 84,
                  height: 60,
                  flexShrink: 0,
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 6,
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: FONTS.HEADING,
                  fontSize: 38,
                  color: COLORS.PRIMARY,
                  margin: 0,
                }}
              >
                {room.type}
              </h1>
              <p style={{ color: COLORS.TEXT_SECONDARY, margin: "4px 0 0" }}>
                {room.number} · {room.floor}
              </p>
            </div>
            <span
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                background: isBooked ? COLORS.PRIMARY : COLORS.SUCCESS,
                whiteSpace: "nowrap",
              }}
            >
              {isBooked ? "Currently Booked" : "Available"}
            </span>
          </div>

          <p
            style={{
              color: COLORS.TEXT_PRIMARY,
              lineHeight: 1.7,
              fontSize: 15.5,
              margin: "18px 0 30px",
              maxWidth: 560,
            }}
          >
            {room.description}
          </p>

          <h3
            style={{
              fontFamily: FONTS.HEADING,
              color: COLORS.PRIMARY,
              fontSize: 22,
              marginBottom: 14,
            }}
          >
            Amenities
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 10,
              marginBottom: 32,
            }}
          >
            {room.amenities.map((a) => (
              <div
                key={a}
                style={{
                  background: COLORS.SURFACE,
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  fontSize: 14,
                  color: COLORS.TEXT_PRIMARY,
                }}
              >
                {a}
              </div>
            ))}
          </div>

          <h3
            style={{
              fontFamily: FONTS.HEADING,
              color: COLORS.PRIMARY,
              fontSize: 22,
              marginBottom: 14,
            }}
          >
            More Rooms You Might Like
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {similar.map((r) => (
              <Link
                key={r.id}
                to={`/rooms/${r.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    height: 90,
                    marginBottom: 8,
                  }}
                >
                  <img
                    src={r.image}
                    alt={r.type}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ fontSize: 13, color: COLORS.TEXT_PRIMARY, fontWeight: 600 }}>
                  {r.type}
                </div>
                <div style={{ fontSize: 12, color: COLORS.TEXT_SECONDARY }}>
                  PKR {r.price.toLocaleString()} / night
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Right: information panel (replaces the booking form) ── */}
        <div>
          <div
            style={{
              background: COLORS.SURFACE,
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: 16,
              padding: 28,
              position: "sticky",
              top: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 20,
                paddingBottom: 18,
                borderBottom: `1px solid ${COLORS.BORDER}`,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.HEADING,
                  fontSize: 26,
                  color: COLORS.PRIMARY,
                }}
              >
                PKR {room.price.toLocaleString()}
              </span>
              <span style={{ color: COLORS.TEXT_SECONDARY, fontSize: 14 }}>
                / night
              </span>
            </div>

            <h4
              style={{
                fontFamily: FONTS.HEADING,
                color: COLORS.PRIMARY,
                fontSize: 17,
                margin: "0 0 12px",
              }}
            >
              Room Information
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
              {[
                ["Sleeps", `${room.guests} guests`],
                ["Room size", room.size],
                ["Bed configuration", room.bed],
                ["View", room.view],
                ["Floor", room.floor],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: COLORS.TEXT_SECONDARY }}>{label}</span>
                  <span style={{ color: COLORS.TEXT_PRIMARY, fontWeight: 500 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <h4
              style={{
                fontFamily: FONTS.HEADING,
                color: COLORS.PRIMARY,
                fontSize: 17,
                margin: "0 0 12px",
              }}
            >
              Why Guests Choose This Room
            </h4>
            <ul style={{ margin: "0 0 22px", padding: 0, listStyle: "none" }}>
              {room.highlights.map((h) => (
                <li
                  key={h}
                  style={{
                    display: "flex",
                    gap: 10,
                    fontSize: 14,
                    color: COLORS.TEXT_PRIMARY,
                    marginBottom: 10,
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ color: COLORS.ACCENT, fontWeight: 700 }}>—</span>
                  {h}
                </li>
              ))}
            </ul>

            <div
              style={{
                background: COLORS.CREAM,
                borderRadius: 10,
                padding: "14px 16px",
                fontSize: 13,
                color: COLORS.TEXT_PRIMARY,
                lineHeight: 1.6,
              }}
            >
              <strong>Check-in:</strong> 2:00 PM &nbsp;·&nbsp;
              <strong>Check-out:</strong> 12:00 PM
              <br />
              Free cancellation up to 24 hours before check-in.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
