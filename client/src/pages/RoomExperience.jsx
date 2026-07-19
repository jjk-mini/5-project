import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
getRoomById,
getAllRooms,
} from "../api/roomApi";

import {
COLORS,
FONTS,
} from "../constants/theme";

export default function RoomExperience() {
const { id } = useParams();
const navigate = useNavigate();

const [room, setRoom] = useState(null);
const [activeImage, setActiveImage] = useState(null);
const [loading, setLoading] = useState(true);
const [similar, setSimilar] = useState([]);

useEffect(() => {
const loadRoom = async () => {
try {
setLoading(true);

    const response = await getRoomById(id);

    // Supports both:
    // response = room
    // response = { room: room }
    const roomData = response?.room || response?.data || response;

    if (!roomData) {
      setRoom(null);
      return;
    }

    setRoom(roomData);

    // Set main image safely
    setActiveImage(
      roomData.image ||
      roomData.gallery?.[0] ||
      "/rooms/default-room.jpg"
    );

    // Load similar rooms
    const allRoomsResponse = await getAllRooms();

    const allRooms = Array.isArray(allRoomsResponse)
      ? allRoomsResponse
      : allRoomsResponse?.rooms ||
        allRoomsResponse?.data ||
        [];

    setSimilar(
      allRooms
        .filter((r) => r._id !== roomData._id)
        .slice(0, 3)
    );

  } catch (error) {
    console.error(
      "Failed to load room:",
      error.response?.data || error
    );

    setRoom(null);

  } finally {
    setLoading(false);
  }
};

if (id) {
  loadRoom();
}

}, [id]);

if (loading) {
return (
<div
className="min-h-screen flex items-center justify-center"
style={{
background: COLORS.BACKGROUND,
color: COLORS.TEXT_SECONDARY,
fontFamily: FONTS.BODY,
}}
>
Loading room... </div>
);
}

if (!room) {
return (
<div
className="min-h-screen flex flex-col items-center justify-center gap-4"
style={{
background: COLORS.BACKGROUND,
color: COLORS.TEXT_PRIMARY,
fontFamily: FONTS.BODY,
}}
> <h2>Room not found</h2>

    <button
      onClick={() => navigate("/rooms")}
      style={{
        background: COLORS.PRIMARY,
        color: COLORS.CREAM,
        border: "none",
        padding: "12px 20px",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      Back to Rooms
    </button>
  </div>
);

}

const gallery = [
room.image,
...(Array.isArray(room.gallery) ? room.gallery : []),
].filter(Boolean);

const amenities = Array.isArray(room.amenities)
? room.amenities
: [];

const highlights = Array.isArray(room.highlights)
? room.highlights
: [];

const isBooked =
String(room.status || "").toLowerCase() === "occupied";

const roomArea =
room.area ||
room.size ||
"-";

return (
<div
style={{
background: COLORS.BACKGROUND,
minHeight: "100vh",
fontFamily: FONTS.BODY,
padding: "48px 6vw 96px",
}}
>



  {/* BACK BUTTON */}

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
      gridTemplateColumns: "minmax(0, 1.3fr) minmax(320px, 1fr)",
      gap: 44,
      maxWidth: 1280,
      margin: "0 auto",
    }}
  >

    {/* LEFT SIDE */}

    <div>

      {/* MAIN IMAGE */}

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
          src={
            activeImage ||
            "/rooms/default-room.jpg"
          }
          alt={room.type || "Hotel room"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>


      {/* IMAGE GALLERY */}

      {gallery.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 30,
            overflowX: "auto",
          }}
        >
          {gallery.map((src, index) => (
            <button
              type="button"
              key={`${src}-${index}`}
              onClick={() => setActiveImage(src)}
              style={{
                padding: 0,
                border:
                  activeImage === src
                    ? `2px solid ${COLORS.ACCENT}`
                    : "2px solid transparent",
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                width: 84,
                height: 60,
                flexSackink: 0,
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </button>
          ))}
        </div>
      )}


      {/* ROOM TITLE */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
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
            {room.type || "Luxury Room"}
          </h1>

          <p
            style={{
              color: COLORS.TEXT_SECONDARY,
              margin: "4px 0 0",
            }}
          >
            Room {room.roomNumber || "-"} · Floor{" "}
            {room.floor || "-"}
          </p>

        </div>

        <span
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            background: isBooked
              ? COLORS.PRIMARY
              : COLORS.SUCCESS,
            whiteSpace: "nowrap",
          }}
        >
          {isBooked
            ? "Currently Booked"
            : "Available"}
        </span>

      </div>


      {/* DESCRIPTION */}

      <p
        style={{
          color: COLORS.TEXT_PRIMARY,
          lineHeight: 1.7,
          fontSize: 15.5,
          margin: "18px 0 30px",
          maxWidth: 560,
        }}
      >
        {room.description ||
          "Experience comfort, elegance and premium hospitality in our beautifully designed accommodation."}
      </p>


      {/* AMENITIES */}

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
          gridTemplateColumns:
            "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 10,
          marginBottom: 32,
        }}
      >
        {amenities.length > 0 ? (
          amenities.map((amenity, index) => (
            <div
              key={`${amenity}-${index}`}
              style={{
                background: COLORS.SURFACE,
                border: `1px solid ${COLORS.BORDER}`,
                borderRadius: 10,
                padding: "12px 14px",
                fontSize: 14,
                color: COLORS.TEXT_PRIMARY,
              }}
            >
              {amenity}
            </div>
          ))
        ) : (
          <p
            style={{
              color: COLORS.TEXT_SECONDARY,
            }}
          >
            No amenities listed.
          </p>
        )}
      </div>


      {/* SIMILAR ROOMS */}

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 14,
        }}
      >
        {similar.map((similarRoom) => (
          <Link
            key={similarRoom._id}
            to={`/rooms/experience/${similarRoom._id}`}
            style={{
              textDecoration: "none",
            }}
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
                src={
                  similarRoom.image ||
                  "/rooms/default-room.jpg"
                }
                alt={
                  similarRoom.type ||
                  "Hotel room"
                }
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              style={{
                fontSize: 13,
                color: COLORS.TEXT_PRIMARY,
                fontWeight: 600,
              }}
            >
              {similarRoom.type ||
                "Luxury Room"}
            </div>

            <div
              style={{
                fontSize: 12,
                color: COLORS.TEXT_SECONDARY,
              }}
            >
              PKR{" "}
              {Number(
                similarRoom.price || 0
              ).toLocaleString()}{" "}
              / night
            </div>
          </Link>
        ))}
      </div>

    </div>


    {/* RIGHT SIDE */}

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

        {/* PRICE */}

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
            PKR{" "}
            {Number(
              room.price || 0
            ).toLocaleString()}
          </span>

          <span
            style={{
              color: COLORS.TEXT_SECONDARY,
              fontSize: 14,
            }}
          >
            / night
          </span>
        </div>


        {/* ROOM INFORMATION */}

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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 22,
          }}
        >
          {[
            ["Sleeps", `${room.guests || "-"} guests`],
            ["Room size", roomArea],
            ["Bed configuration", room.bed || "-"],
            ["View", room.view || "-"],
            ["Floor", room.floor || "-"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                fontSize: 14,
              }}
            >
              <span
                style={{
                  color: COLORS.TEXT_SECONDARY,
                }}
              >
                {label}
              </span>

              <span
                style={{
                  color: COLORS.TEXT_PRIMARY,
                  fontWeight: 500,
                  textAlign: "right",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>


        {/* HIGHLIGHTS */}

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

        <ul
          style={{
            margin: "0 0 22px",
            padding: 0,
            listStyle: "none",
          }}
        >
          {highlights.length > 0 ? (
            highlights.map((highlight, index) => (
              <li
                key={`${highlight}-${index}`}
                style={{
                  display: "flex",
                  gap: 10,
                  fontSize: 14,
                  color: COLORS.TEXT_PRIMARY,
                  marginBottom: 10,
                  lineHeight: 1.4,
                }}
              >
                <span
                  style={{
                    color: COLORS.ACCENT,
                    fontWeight: 700,
                  }}
                >
                  —
                </span>

                {highlight}
              </li>
            ))
          ) : (
            <li
              style={{
                color: COLORS.TEXT_SECONDARY,
                fontSize: 14,
              }}
            >
              Premium comfort and hospitality included.
            </li>
          )}
        </ul>


        {/* CHECK-IN INFORMATION */}

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
          <strong>Check-in:</strong> 2:00 PM
          &nbsp;·&nbsp;
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
