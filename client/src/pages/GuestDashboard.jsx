// GuestStayTab.jsx — content for the Guest-only "My Stay" tab inside ProfilePage.
// This is NOT a standalone page (no sidebar/layout) — it's rendered inside
// ProfilePage's tab area, so it inherits the page's background and width.
import {
  CalendarDays,
  BedDouble,
  Clock3,
  CreditCard,
  Gift,
  LogOut,
  MapPin,
  Wifi,
  Coffee,
  Sparkles,
  ConciergeBell,
  ShieldCheck,
  KeyRound,
  Flower2,
  UtensilsCrossed,
  Car,
  Waves,
  CheckCircle2,
} from "lucide-react";
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../constants/theme.js"; // adjust path if needed

// ---- Data (swap for real booking/guest data) ---------------------------

const stay = {
  guestName: "John",
  room: "Suite 402",
  roomType: "Deluxe Suite",
  checkIn: "10 Jul 2026",
  checkOut: "15 Jul 2026",
  dayOfStay: 3,
  totalDays: 5,
  nightsRemaining: 5,
  pendingBill: 0,
  loyaltyPoints: 840,
  wifiNetwork: "LuxuryStay_Guest",
  wifiPassword: "Suite402Stay",
};

const schedule = [
  { icon: Coffee, title: "Breakfast", time: "7:00 AM – 10:30 AM" },
  { icon: Sparkles, title: "Housekeeping", time: "11:00 AM" },
  { icon: ConciergeBell, title: "Concierge Service", time: "Available 24/7" },
];

const amenities = [
  { icon: Flower2, title: "Spa & Wellness", hours: "9:00 AM – 8:00 PM", desc: "Massage therapy, sauna and steam room on the first floor." },
  { icon: Waves, title: "Pool & Fitness", hours: "6:00 AM – 10:00 PM", desc: "Heated swimming pool and fully equipped gym." },
  { icon: UtensilsCrossed, title: "Fine Dining", hours: "7:00 AM – 11:00 PM", desc: "Rooftop restaurant and in-room dining available." },
  { icon: Car, title: "Valet Parking", hours: "24 Hours", desc: "Complimentary valet parking at the main entrance." },
];

const activity = [
  { icon: Clock3, title: "Room Service Requested", time: "Today • 10:30 AM" },
  { icon: CalendarDays, title: "Booking Confirmed", time: "Yesterday • 02:15 PM" },
  { icon: CreditCard, title: "Payment Successful", time: "2 Days Ago" },
  { icon: Gift, title: "Breakfast Activated", time: "Available until checkout" },
];

// ---- Small building blocks -------------------------------------------

function DarkTile({ icon: Icon, label, value, big }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: BORDER_RADIUS.LARGE,
        padding: 20,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: BORDER_RADIUS.MEDIUM,
          background: "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <Icon size={20} color={COLORS.ACCENT} />
      </div>
      <p style={{ fontSize: 13, color: "rgba(248,246,243,0.65)" }}>{label}</p>
      <h3
        style={{
          marginTop: 6,
          fontFamily: FONTS.HEADING,
          fontWeight: 700,
          color: COLORS.CREAM,
          fontSize: big ? 30 : 18,
        }}
      >
        {value}
      </h3>
    </div>
  );
}

function StatCardDark({ icon: Icon, label, value }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #2E2620)`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
        padding: 24,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: BORDER_RADIUS.MEDIUM,
          background: "rgba(200,169,106,0.16)",
          border: "1px solid rgba(200,169,106,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={24} color={COLORS.ACCENT} />
      </div>
      <p style={{ marginTop: 18, color: "rgba(248,246,243,0.65)", fontSize: 14 }}>{label}</p>
      <h2 style={{ marginTop: 6, fontFamily: FONTS.HEADING, fontSize: 32, fontWeight: 700, color: COLORS.CREAM }}>
        {value}
      </h2>
    </div>
  );
}

function AmenityCard({ icon: Icon, title, hours, desc }) {
  return (
    <div
      style={{
        background: COLORS.PRIMARY,
        borderRadius: BORDER_RADIUS.LARGE,
        padding: 26,
        border: "1px solid transparent",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(200,169,106,0.4)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: BORDER_RADIUS.MEDIUM,
          background: "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        <Icon size={24} color={COLORS.ACCENT} />
      </div>
      <h3 style={{ fontFamily: FONTS.HEADING, fontSize: 17, fontWeight: 700, color: COLORS.CREAM }}>{title}</h3>
      <p style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: COLORS.ACCENT }}>{hours}</p>
      <p style={{ marginTop: 10, fontSize: 13, color: "rgba(248,246,243,0.65)", lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

// ---- Main tab content ----------------------------------------------------

function GuestStayTab() {
  const progressPct = (stay.dayOfStay / stay.totalDays) * 100;

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: BORDER_RADIUS.LARGE,
          background: COLORS.SURFACE,
          border: `1px solid ${COLORS.BORDER}`,
          boxShadow: SHADOWS.CARD,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(200,169,106,0.10)",
            filter: "blur(50px)",
          }}
        />
        <div style={{ position: "relative", padding: "36px 32px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, color: COLORS.ACCENT }}>
                Good Morning
              </p>
              <h1 style={{ marginTop: 8, fontFamily: FONTS.HEADING, fontSize: 32, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                Welcome Back, {stay.guestName}
              </h1>
            </div>
            <span
              style={{
                alignSelf: "flex-start",
                background: COLORS.CREAM,
                border: `1px solid ${COLORS.BORDER}`,
                color: COLORS.TEXT_PRIMARY,
                padding: "9px 20px",
                borderRadius: BORDER_RADIUS.PILL,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              Day {stay.dayOfStay} of {stay.totalDays} • {stay.room}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 28 }}>
            {/* Left column */}
            <div>
              <p style={{ color: COLORS.TEXT_SECONDARY, fontSize: 15, lineHeight: 1.7, maxWidth: 560 }}>
                Everything you need during your stay is available here. Manage your booking, check your stay
                progress and enjoy premium hotel services with just a few clicks.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 16, marginTop: 28 }}>
                <div style={{ borderRadius: BORDER_RADIUS.LARGE, overflow: "hidden" }}>
                  <div style={{ background: COLORS.PRIMARY }}>
                    <DarkTile icon={CalendarDays} label="Check-Out" value={stay.checkOut} />
                  </div>
                </div>
                <div style={{ background: COLORS.PRIMARY, borderRadius: BORDER_RADIUS.LARGE }}>
                  <DarkTile icon={MapPin} label="Room" value={stay.room} />
                </div>
                <div style={{ background: COLORS.PRIMARY, borderRadius: BORDER_RADIUS.LARGE }}>
                  <DarkTile icon={Wifi} label="Wi-Fi" value="Connected" />
                </div>
                <div style={{ background: COLORS.PRIMARY, borderRadius: BORDER_RADIUS.LARGE }}>
                  <DarkTile icon={ShieldCheck} label="Stay Status" value="Checked In" />
                </div>
              </div>

              {/* Stay progress */}
              <div
                style={{
                  marginTop: 28,
                  background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #2E2620)`,
                  borderRadius: BORDER_RADIUS.LARGE,
                  padding: 24,
                  color: COLORS.CREAM,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <p style={{ fontWeight: 700 }}>Stay Progress</p>
                  <p style={{ color: COLORS.ACCENT, fontSize: 13 }}>{stay.totalDays - stay.dayOfStay} Days Left</p>
                </div>
                <div style={{ height: 10, borderRadius: BORDER_RADIUS.PILL, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${progressPct}%`,
                      height: "100%",
                      borderRadius: BORDER_RADIUS.PILL,
                      background: `linear-gradient(90deg, ${COLORS.ACCENT}, #E4C98A)`,
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 13, color: "rgba(248,246,243,0.65)" }}>
                  <span>Check In</span>
                  <span style={{ color: COLORS.ACCENT, fontWeight: 600 }}>Today</span>
                  <span>Check Out</span>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: "grid", gap: 20 }}>
              {/* Digital key */}
              <div
                style={{
                  background: COLORS.CREAM,
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.LARGE,
                  padding: 24,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div>
                    <p style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: COLORS.TEXT_SECONDARY }}>
                      Digital Room Key
                    </p>
                    <h2 style={{ marginTop: 6, fontFamily: FONTS.HEADING, fontSize: 22, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                      {stay.room}
                    </h2>
                  </div>
                  <KeyRound size={26} color={COLORS.ACCENT} />
                </div>
                <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.TEXT_SECONDARY }}>Guest</span>
                    <span style={{ fontWeight: 600, color: COLORS.TEXT_PRIMARY }}>John Smith</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.TEXT_SECONDARY }}>Valid Until</span>
                    <span style={{ fontWeight: 600, color: COLORS.TEXT_PRIMARY }}>15 Jul • 12 PM</span>
                  </div>
                </div>
              </div>

              {/* Today's schedule */}
              <div
                style={{
                  background: COLORS.CREAM,
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.LARGE,
                  padding: 24,
                }}
              >
                <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 18, fontWeight: 700, color: COLORS.TEXT_PRIMARY, marginBottom: 18 }}>
                  Today's Schedule
                </h2>
                <div style={{ display: "grid", gap: 16 }}>
                  {schedule.map(({ icon: Icon, title, time }) => (
                    <div key={title} style={{ display: "flex", gap: 14 }}>
                      <Icon size={19} color={COLORS.ACCENT} />
                      <div>
                        <p style={{ fontWeight: 600, color: COLORS.TEXT_PRIMARY, fontSize: 14 }}>{title}</p>
                        <p style={{ fontSize: 13, color: COLORS.TEXT_SECONDARY }}>{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 28 }}>
        <StatCardDark icon={CalendarDays} label="Nights Remaining" value={stay.nightsRemaining} />
        <StatCardDark icon={BedDouble} label="Room Type" value={stay.roomType} />
        <StatCardDark icon={CreditCard} label="Pending Bill" value={`$${stay.pendingBill}`} />
        <StatCardDark icon={Gift} label="Loyalty Points" value={stay.loyaltyPoints} />
      </div>

      {/* Booking summary */}
      <div
        style={{
          background: COLORS.SURFACE,
          border: `1px solid ${COLORS.BORDER}`,
          borderRadius: BORDER_RADIUS.LARGE,
          boxShadow: SHADOWS.CARD,
          padding: 32,
          marginBottom: 28,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div>
            <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 26, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>Current Booking</h2>
            <p style={{ color: COLORS.TEXT_SECONDARY, marginTop: 6 }}>Reservation Details</p>
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(47,107,79,0.12)",
              color: COLORS.SUCCESS,
              padding: "9px 20px",
              borderRadius: BORDER_RADIUS.PILL,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            <CheckCircle2 size={16} /> Confirmed
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 18 }}>
          {[
            { label: "Room", value: stay.roomType },
            { label: "Guests", value: "2 Adults" },
            { label: "Check In", value: stay.checkIn },
            { label: "Check Out", value: stay.checkOut },
          ].map((item) => (
            <div key={item.label} style={{ background: COLORS.CREAM, borderRadius: BORDER_RADIUS.LARGE, padding: 20 }}>
              <p style={{ color: COLORS.TEXT_SECONDARY, fontSize: 13 }}>{item.label}</p>
              <h3 style={{ marginTop: 8, fontFamily: FONTS.HEADING, fontSize: 20, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: COLORS.PRIMARY,
              color: COLORS.CREAM,
              border: "none",
              borderRadius: BORDER_RADIUS.MEDIUM,
              padding: "13px 26px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(31,26,23,0.18)",
            }}
          >
            <LogOut size={17} /> Check Out
          </button>
        </div>
      </div>

      {/* Amenities */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div>
            <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 26, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>Hotel Amenities</h2>
            <p style={{ color: COLORS.TEXT_SECONDARY, marginTop: 4 }}>Included with your stay, available on-site</p>
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: COLORS.PRIMARY,
              color: COLORS.CREAM,
              padding: "8px 16px",
              borderRadius: BORDER_RADIUS.PILL,
              fontSize: 13,
            }}
          >
            <MapPin size={14} color={COLORS.ACCENT} /> Ground & 1st Floor
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {amenities.map((a) => (
            <AmenityCard key={a.title} {...a} />
          ))}
        </div>
      </div>

      {/* Recent activity + stay info */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div
          style={{
            background: COLORS.SURFACE,
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
            padding: 28,
          }}
        >
          <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 24, fontWeight: 700, color: COLORS.TEXT_PRIMARY, marginBottom: 24 }}>
            Recent Activity
          </h2>
          <div style={{ display: "grid", gap: 16 }}>
            {activity.map(({ icon: Icon, title, time }) => (
              <div
                key={title}
                style={{ display: "flex", alignItems: "center", gap: 18, background: COLORS.CREAM, borderRadius: BORDER_RADIUS.LARGE, padding: 18 }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: "rgba(200,169,106,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={21} color={COLORS.ACCENT} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: COLORS.TEXT_PRIMARY, fontSize: 14 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: COLORS.TEXT_SECONDARY }}>{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #2E2620)`,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
            padding: 28,
            color: COLORS.CREAM,
          }}
        >
          <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Stay Information</h2>

          <div style={{ display: "grid", gap: 20 }}>
            <div>
              <p style={{ fontSize: 13, color: "rgba(248,246,243,0.65)" }}>Room Number</p>
              <h3 style={{ fontFamily: FONTS.HEADING, fontSize: 26, fontWeight: 700 }}>{stay.room.replace(/\D/g, "")}</h3>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />
            <div>
              <p style={{ fontSize: 13, color: "rgba(248,246,243,0.65)" }}>Wi-Fi Network</p>
              <h3 style={{ fontWeight: 600, fontSize: 15 }}>{stay.wifiNetwork}</h3>
              <p style={{ fontSize: 13, color: "rgba(248,246,243,0.65)", marginTop: 4 }}>Password: {stay.wifiPassword}</p>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />
            <div>
              <p style={{ fontSize: 13, color: "rgba(248,246,243,0.65)" }}>Breakfast</p>
              <h3 style={{ fontWeight: 600, fontSize: 15 }}>7:00 AM - 10:30 AM</h3>
            </div>
            <div>
              <p style={{ fontSize: 13, color: "rgba(248,246,243,0.65)" }}>Check-Out</p>
              <h3 style={{ fontWeight: 600, fontSize: 15 }}>12:00 PM</h3>
            </div>
            <button
              style={{
                width: "100%",
                background: COLORS.ACCENT,
                color: COLORS.PRIMARY,
                border: "none",
                borderRadius: BORDER_RADIUS.LARGE,
                padding: "15px 0",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Contact Reception
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestStayTab;
