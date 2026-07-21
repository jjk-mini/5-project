import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Maximize,
  BedDouble,
  Mountain,
  Calendar,
  Clock,
  CheckCircle,
  Star,
  Heart,
  Share2,
  MapPin,
  Wifi,
  Coffee,
  Tv,
  Bath,
  Sparkles,
  Utensils,
  Dumbbell,
  ParkingCircle,
} from "lucide-react";

import { getRoomById, getAllRooms } from "../api/roomApi";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../constants/roles";
import BookingForm from "../components/BookingForm";

import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const amenityIcons = {
  WiFi: Wifi,
  "Free WiFi": Wifi,
  Coffee: Coffee,
  TV: Tv,
  Bath: Bath,
  "Air Conditioning": Sparkles,
  Breakfast: Utensils,
  Gym: Dumbbell,
  Parking: ParkingCircle,
};

export default function RoomExperience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [room, setRoom] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookedJustNow, setBookedJustNow] = useState(false);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);

        const response = await getRoomById(id);
        const roomData = response?.room || response?.data || response;

        if (!roomData) {
          setRoom(null);
          return;
        }

        setRoom(roomData);
        setActiveImage(roomData.image || roomData.gallery?.[0] || "/rooms/default-room.jpg");

        // Load similar rooms
        const allRoomsResponse = await getAllRooms();
        const allRooms = Array.isArray(allRoomsResponse)
          ? allRoomsResponse
          : allRoomsResponse?.rooms || allRoomsResponse?.data || [];

        setSimilar(
          allRooms
            .filter((r) => r._id !== roomData._id)
            .slice(0, 3)
        );
      } catch (error) {
        console.error("Failed to load room:", error.response?.data || error);
        setRoom(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadRoom();
    }
  }, [id]);

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    setBookedJustNow(true);
  };

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
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
            style={{ borderColor: COLORS.ACCENT, borderTopColor: "transparent" }}
          />
          <p className="mt-4 text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
            Loading room details...
          </p>
        </div>
      </div>
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
      >
        <h2 className="text-2xl font-light" style={{ fontFamily: FONTS.HEADING }}>
          Room Not Found
        </h2>
        <button
          onClick={() => navigate("/rooms")}
          className="px-6 py-2.5 font-semibold rounded-full transition-all duration-300 hover:scale-105"
          style={{
            background: COLORS.PRIMARY,
            color: COLORS.CREAM,
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

  const amenities = Array.isArray(room.amenities) ? room.amenities : [];
  const highlights = Array.isArray(room.highlights) ? room.highlights : [];

  const isBooked =
    String(room.status || "").toLowerCase() === "occupied" ||
    String(room.status || "").toLowerCase() === "reserved";

  const isGuestUser = isAuthenticated && user?.role === ROLES.GUEST;
  const roomArea = room.area || room.size || "-";

  return (
    <div
      className="min-h-screen"
      style={{
        background: COLORS.BACKGROUND,
        fontFamily: FONTS.BODY,
      }}
    >
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={activeImage || "/rooms/default-room.jpg"}
          alt={room.type || "Hotel room"}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(31,26,23,0.2) 0%, rgba(31,26,23,0.7) 100%)`,
          }}
        />

        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container mx-auto px-6 md:px-12">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200 mb-4"
              style={{ color: "rgba(248,246,243,0.7)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(248,246,243,0.7)";
              }}
            >
              <ArrowLeft size={18} />
              Back to all rooms
            </Link>

            <motion.div {...fadeUp}>
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <h1
                  className="text-4xl md:text-5xl font-light"
                  style={{
                    fontFamily: FONTS.HEADING,
                    color: COLORS.CREAM,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {room.type || "Luxury Room"}
                </h1>
                <span
                  className="px-4 py-1.5 text-xs font-semibold rounded-full"
                  style={{
                    background: isBooked
                      ? `rgba(92,26,43,0.8)`
                      : `rgba(46, 160, 67, 0.8)`,
                    color: "#fff",
                  }}
                >
                  {isBooked ? "Booked" : "Available"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-sm" style={{ color: "rgba(248,246,243,0.7)" }}>
                  Room {room.roomNumber || room.number || "-"} · Floor {room.floor || "-"}
                </p>
                <div className="flex items-center gap-1">
                  <Star size={16} fill={COLORS.WARNING} style={{ color: COLORS.WARNING }} />
                  <span className="text-sm" style={{ color: COLORS.CREAM }}>
                    {room.rating || "4.8"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} style={{ color: "rgba(248,246,243,0.5)" }} />
                  <span className="text-xs" style={{ color: "rgba(248,246,243,0.5)" }}>
                    {room.bar|| "-"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: `1px solid rgba(255,255,255,0.1)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            <Heart
              size={20}
              style={{
                color: isLiked ? "#ef4444" : "#fff",
                fill: isLiked ? "#ef4444" : "none",
                transition: "all 0.3s ease",
              }}
            />
          </button>
          <button
            className="p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: `1px solid rgba(255,255,255,0.1)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            <Share2 size={20} style={{ color: "#fff" }} />
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12 sm:px-8 md:px-12 lg:px-[60px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Gallery + Details */}
            <div className="lg:w-2/3">
              {/* Thumbnail Gallery */}
              {gallery.length > 0 && (
                <motion.div {...fadeUp} className="flex gap-3 mb-8 overflow-x-auto pb-2">
                  {gallery.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      onClick={() => setActiveImage(src)}
                      className="flex-shrink-0 transition-all duration-300 relative"
                      style={{
                        width: 80,
                        height: 60,
                        borderRadius: BORDER_RADIUS.MEDIUM,
                        overflow: "hidden",
                        border: activeImage === src
                          ? `2px solid ${COLORS.ACCENT}`
                          : `2px solid transparent`,
                      }}
                      onMouseEnter={(e) => {
                        if (activeImage !== src) {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {activeImage === src && (
                        <div
                          className="absolute inset-0"
                          style={{ background: `rgba(212, 168, 130, 0.1)` }}
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Description */}
              <motion.div {...fadeUp}>
                <h2
                  className="text-2xl font-light mb-4"
                  style={{
                    fontFamily: FONTS.HEADING,
                    color: COLORS.PRIMARY,
                  }}
                >
                  About This Room
                </h2>
                <p className="text-base leading-relaxed" style={{ color: COLORS.TEXT_SECONDARY }}>
                  {room.description || "Experience comfort, elegance and premium hospitality in our beautifully designed accommodation."}
                </p>
              </motion.div>

              {/* Amenities */}
              <motion.div {...fadeUp} className="mt-8">
                <h3
                  className="text-xl font-light mb-4"
                  style={{
                    fontFamily: FONTS.HEADING,
                    color: COLORS.PRIMARY,
                  }}
                >
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.length > 0 ? (
                    amenities.map((amenity, index) => {
                      const Icon = amenityIcons[amenity] || CheckCircle;
                      return (
                        <div
                          key={`${amenity}-${index}`}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:shadow-md"
                          style={{
                            background: COLORS.SURFACE,
                            border: `1px solid ${COLORS.BORDER}`,
                          }}
                        >
                          <Icon size={16} style={{ color: COLORS.ACCENT }} />
                          <span className="text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
                            {amenity}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p style={{ color: COLORS.TEXT_SECONDARY }}>
                      No amenities listed.
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Room Details */}
              <motion.div {...fadeUp} className="mt-8">
                <h3
                  className="text-xl font-light mb-4"
                  style={{
                    fontFamily: FONTS.HEADING,
                    color: COLORS.PRIMARY,
                  }}
                >
                  Room Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Users, label: "Guests", value: room.guests || "-" },
                    { icon: Maximize, label: "Size", value: roomArea },
                    { icon: BedDouble, label: "Bed", value: room.bed || "-" },
                    { icon: Mountain, label: "Bar", value: room.bar || "" },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="p-4 text-center rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        style={{
                          background: COLORS.SURFACE,
                          border: `1px solid ${COLORS.BORDER}`,
                        }}
                      >
                        <Icon size={20} className="mx-auto mb-2" style={{ color: COLORS.ACCENT }} />
                        <p className="text-sm font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
                          {item.value}
                        </p>
                        <p className="text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <motion.div {...fadeUp} className="mt-8">
                  <h3
                    className="text-xl font-light mb-4"
                    style={{
                      fontFamily: FONTS.HEADING,
                      color: COLORS.PRIMARY,
                    }}
                  >
                    Why Guests Choose This Room
                  </h3>
                  <div className="space-y-2">
                    {highlights.map((highlight, index) => (
                      <div
                        key={`${highlight}-${index}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg"
                        style={{
                          background: `rgba(212, 168, 130, 0.05)`,
                          border: `1px solid rgba(212, 168, 130, 0.08)`,
                        }}
                      >
                        <CheckCircle size={16} style={{ color: COLORS.ACCENT }} />
                        <span className="text-sm" style={{ color: COLORS.TEXT_PRIMARY }}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Similar Rooms */}
              {similar.length > 0 && (
                <motion.div {...fadeUp} className="mt-12">
                  <h3
                    className="text-xl font-light mb-6"
                    style={{
                      fontFamily: FONTS.HEADING,
                      color: COLORS.PRIMARY,
                    }}
                  >
                    More Rooms You Might Like
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {similar.map((r) => (
                      <Link
                        key={r._id}
                        to={`/rooms/experience/${r._id}`}
                        className="group transition-all duration-500"
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="overflow-hidden rounded-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl"
                          style={{
                            background: COLORS.SURFACE,
                            border: `1px solid ${COLORS.BORDER}`,
                            boxShadow: SHADOWS.CARD,
                          }}
                        >
                          <div className="relative overflow-hidden" style={{ height: 160 }}>
                            <img
                              src={r.image || "/rooms/default-room.jpg"}
                              alt={r.type || "Hotel room"}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background: `linear-gradient(to bottom, transparent 50%, rgba(31,26,23,0.4) 100%)`,
                              }}
                            />
                            <span
                              className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full"
                              style={{
                                background: String(r.status || "").toLowerCase() === "available"
                                  ? `linear-gradient(135deg, ${COLORS.SUCCESS}, #2d8a4e)`
                                  : `linear-gradient(135deg, ${COLORS.ERROR}, #b91c1c)`,
                                color: "#fff",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                              }}
                            >
                              {String(r.status || "").toLowerCase() === "available" ? "Available" : "Booked"}
                            </span>
                          </div>

                          <div className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h4
                                  className="text-sm font-semibold truncate transition-colors duration-200 group-hover:text-amber-600"
                                  style={{
                                    color: COLORS.PRIMARY,
                                    fontFamily: FONTS.HEADING,
                                  }}
                                >
                                  {r.type || "Luxury Room"}
                                </h4>
                                <p className="text-xs mt-0.5" style={{ color: COLORS.TEXT_SECONDARY }}>
                                  {r.roomNumber || r.number || "-"} · {r.bar || "-"}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                <Star
                                  size={14}
                                  fill={COLORS.WARNING}
                                  style={{ color: COLORS.WARNING }}
                                />
                                <span className="text-xs font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
                                  {r.rating || "4.8"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
                              <div className="flex items-center gap-1">
                                <Users size={12} style={{ color: COLORS.ACCENT }} />
                                {r.guests || "-"}
                              </div>
                              <span className="w-px h-3" style={{ background: COLORS.BORDER }} />
                              <div className="flex items-center gap-1">
                                <Maximize size={12} style={{ color: COLORS.ACCENT }} />
                                {r.size || r.area || "-"}
                              </div>
                              <span className="w-px h-3" style={{ background: COLORS.BORDER }} />
                              <div className="flex items-center gap-1">
                                <BedDouble size={12} style={{ color: COLORS.ACCENT }} />
                                {(r.bed || "").split(" ")[0] || "-"}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${COLORS.BORDER}` }}>
                              <div>
                                <span
                                  className="text-base font-semibold"
                                  style={{ color: COLORS.PRIMARY }}
                                >
                                  PKR {Number(r.price || 0).toLocaleString()}
                                </span>
                                <span className="text-xs ml-1" style={{ color: COLORS.TEXT_SECONDARY }}>
                                  / night
                                </span>
                              </div>
                              <button
                                className="px-3 py-1.5 text-xs font-medium transition-all duration-300 group-hover:scale-105 flex items-center gap-1"
                                style={{
                                  background: COLORS.ACCENT,
                                  color: COLORS.PRIMARY,
                                  borderRadius: BORDER_RADIUS.PILL,
                                  boxShadow: `0 2px 8px rgba(212,168,130,0.2)`,
                                }}
                              >
                             Bar
                                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Information Panel - Sticky */}
            <div className="lg:w-1/3">
              <div
                style={{
                  position: "sticky",
                  top: "24px",
                  alignSelf: "flex-start",
                }}
              >
                <motion.div
                  {...fadeUp}
                  className="p-6 rounded-xl transition-all duration-300 hover:shadow-xl"
                  style={{
                    background: COLORS.SURFACE,
                    border: `1px solid ${COLORS.BORDER}`,
                    boxShadow: SHADOWS.CARD,
                  }}
                >
                  {/* Price */}
                  <div
                    className="flex items-end justify-between pb-4 mb-4"
                    style={{ borderBottom: `1px solid ${COLORS.BORDER}` }}
                  >
                    <div>
                      <span
                        className="text-3xl font-light"
                        style={{
                          fontFamily: FONTS.HEADING,
                          color: COLORS.PRIMARY,
                        }}
                      >
                        PKR {Number(room.price || 0).toLocaleString()}
                      </span>
                      <span className="text-sm ml-1" style={{ color: COLORS.TEXT_SECONDARY }}>
                        / night
                      </span>
                    </div>
                    <div
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        background: `rgba(212, 168, 130, 0.1)`,
                        color: COLORS.ACCENT,
                      }}
                    >
                      Best Price
                    </div>
                  </div>

                  {/* Room Information */}
                  <h4
                    className="text-sm font-semibold mb-3 uppercase tracking-wider"
                    style={{
                      fontFamily: FONTS.HEADING,
                      color: COLORS.TEXT_SECONDARY,
                    }}
                  >
                    Room Information
                  </h4>
                  <div className="space-y-2 mb-4">
                    {[
                      ["Sleeps", `${room.guests || "-"} guests`],
                      ["Room size", roomArea],
                      ["Bed configuration", room.bed || "-"],
                      ["Bar", room.bar || "-"],
                      ["Floor", room.floor || "-"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between py-1.5 text-sm"
                      >
                        <span style={{ color: COLORS.TEXT_SECONDARY }}>{label}</span>
                        <span className="font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Check-in/out */}
                  <div
                    className="p-4 rounded-lg mb-4"
                    style={{
                      background: `rgba(212, 168, 130, 0.05)`,
                      border: `1px solid rgba(212, 168, 130, 0.08)`,
                    }}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} style={{ color: COLORS.ACCENT }} />
                      <span style={{ color: COLORS.TEXT_SECONDARY }}>Check-in:</span>
                      <span className="font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>2:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Clock size={16} style={{ color: COLORS.ACCENT }} />
                      <span style={{ color: COLORS.TEXT_SECONDARY }}>Check-out:</span>
                      <span className="font-medium" style={{ color: COLORS.TEXT_PRIMARY }}>12:00 PM</span>
                    </div>
                  </div>

                  {/* Booking */}
                  {bookedJustNow ? (
                    <div
                      style={{
                        background: "#EAF7F0",
                        border: `1px solid ${COLORS.SUCCESS}33`,
                        borderRadius: 10,
                        padding: "16px",
                        fontSize: 13.5,
                        color: COLORS.SUCCESS,
                        textAlign: "center",
                      }}
                    >
                      Booking request submitted! You can track its status from your profile.
                    </div>
                  ) : showBookingForm && isGuestUser ? (
                    <BookingForm room={room} onSuccess={handleBookingSuccess} />
                  ) : isBooked ? (
                    <button
                      disabled
                      style={{
                        width: "100%",
                        padding: "14px",
                        border: "none",
                        borderRadius: 10,
                        background: COLORS.BORDER,
                        color: COLORS.TEXT_SECONDARY,
                        fontFamily: FONTS.BODY,
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "not-allowed",
                      }}
                    >
                      Currently Unavailable
                    </button>
                  ) : !isAuthenticated ? (
                    <button
                      onClick={() => navigate("/login", { state: { from: `/rooms/experience/${room._id}` } })}
                      style={{
                        width: "100%",
                        padding: "14px",
                        border: "none",
                        borderRadius: 10,
                        background: COLORS.PRIMARY,
                        color: COLORS.CREAM,
                        fontFamily: FONTS.BODY,
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Login to Book This Room
                    </button>
                  ) : isGuestUser ? (
                    <button
                      onClick={() => setShowBookingForm(true)}
                      style={{
                        width: "100%",
                        padding: "14px",
                        border: "none",
                        borderRadius: 10,
                        background: COLORS.PRIMARY,
                        color: COLORS.CREAM,
                        fontFamily: FONTS.BODY,
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Book Now
                    </button>
                  ) : (
                    <p style={{ fontSize: 12.5, color: COLORS.TEXT_SECONDARY, textAlign: "center" }}>
                      Only guest accounts can book rooms online.
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}