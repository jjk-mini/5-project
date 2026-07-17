// ProfilePage.jsx — LuxuryStay Hospitality
// Role-aware profile: the layout, sidebar, and third tab all adapt to
// whichever role is passed in. Wire `role` up to your auth/user context —
// defaults to "Admin" for now.
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  KeyRound,
  Save,
  Eye,
  EyeOff,
  ShieldCheck,
  Briefcase,
  Sparkles,
  Check,
  Clock,
  Home,
} from "lucide-react";
import AsideBar from "../components/AsideBar"; // adjust path if needed
import AsideBarGuest from "../components/AsidebarGuest"; // adjust path if needed
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../constants/theme"; // adjust path if needed
import GuestStayTab from "../pages/GuestDashboard"; // adjust path if needed

// ---- Role configuration ---------------------------------------------------
// Each role controls: which sidebar renders, the card's ribbon text, the
// membership-style detail row under the name, and the third tab's content.

const ROLE_CONFIG = {
  Admin: {
    Sidebar: AsideBar,
    ribbon: "Admin",
    detail: (p) => `Employee ID • ${p.employeeId}`,
    tabLabel: "Access & Permissions",
    icon: ShieldCheck,
  },
  Staff: {
    Sidebar: AsideBar,
    ribbon: "Staff",
    detail: (p) => `${p.department} • ${p.shift} Shift`,
    tabLabel: "Work Details",
    icon: Briefcase,
  },
  Guest: {
    Sidebar: AsideBarGuest,
    ribbon: "Guest",
    detail: (p) => `${p.tier} Member • Since ${p.memberSince}`,
    tabLabel: "Preferences & Rewards",
    icon: Sparkles,
  },
};

const PERMISSIONS = [
  "Manage Bookings",
  "Manage Rooms",
  "Manage Staff",
  "View Reports",
  "Manage Billing",
  "System Settings",
];

// ---- Small building blocks -------------------------------------------

function FieldInput({ icon: Icon, label, ...props }) {
  return (
    <div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
          fontSize: 13,
          fontWeight: 600,
          color: COLORS.TEXT_SECONDARY,
        }}
      >
        <Icon size={15} color={COLORS.ACCENT} />
        {label}
      </label>
      <input
        {...props}
        style={{
          width: "100%",
          padding: "13px 16px",
          borderRadius: BORDER_RADIUS.MEDIUM,
          border: `1px solid ${COLORS.BORDER}`,
          background: COLORS.CREAM,
          color: COLORS.TEXT_PRIMARY,
          fontFamily: FONTS.BODY,
          fontSize: 14,
          outline: "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = COLORS.ACCENT;
          e.target.style.boxShadow = `0 0 0 3px rgba(200,169,106,0.18)`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = COLORS.BORDER;
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function PasswordInput({ label, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label style={{ display: "block", marginBottom: 8, fontSize: 13, fontWeight: 600, color: COLORS.TEXT_SECONDARY }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          style={{
            width: "100%",
            padding: "13px 44px 13px 16px",
            borderRadius: BORDER_RADIUS.MEDIUM,
            border: `1px solid ${COLORS.BORDER}`,
            background: COLORS.CREAM,
            color: COLORS.TEXT_PRIMARY,
            fontFamily: FONTS.BODY,
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: COLORS.TEXT_SECONDARY,
            display: "flex",
          }}
        >
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, accent, children }) {
  return (
    <div
      style={{
        background: COLORS.SURFACE,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
        border: `1px solid ${COLORS.BORDER}`,
        borderTop: `4px solid ${accent}`,
        padding: "28px 28px 32px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <Icon size={20} color={COLORS.PRIMARY} />
        <h2 style={{ fontFamily: FONTS.HEADING, fontSize: 19, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function PillButton({ children, onClick, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        marginTop: 26,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: COLORS.PRIMARY,
        color: COLORS.CREAM,
        border: "none",
        borderRadius: BORDER_RADIUS.PILL,
        padding: "12px 26px",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: FONTS.BODY,
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(31,26,23,0.18)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#332A23")}
      onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.PRIMARY)}
    >
      <Icon size={16} /> {children}
    </button>
  );
}

// ---- Page ----------------------------------------------------------------

function ProfilePage({ role = "Admin" }) {
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.Admin;
  const { Sidebar, ribbon, detail, tabLabel, icon: RoleIcon } = config;

  const [tab, setTab] = useState(role === "Guest" ? "stay" : "profile");

  const [profile, setProfile] = useState({
    name: "Maheen Tareen",
    email: "",
    phone: "",
    employeeId: "LX-0142",
    department: "Front Office",
    shift: "Morning",
    tier: "Gold",
    memberSince: "2024",
    loyaltyPoints: 3200,
    loyaltyNext: 5000,
  });

  const [password, setPassword] = useState({ current: "", newPassword: "", confirmPassword: "" });
  const [permissions, setPermissions] = useState(
    Object.fromEntries(PERMISSIONS.map((p) => [p, role === "Admin"]))
  );

  const handleProfileSave = () => alert("Profile updated successfully!");

  const handlePasswordChange = () => {
    if (!password.current || !password.newPassword || !password.confirmPassword) {
      alert("Please fill all password fields.");
      return;
    }
    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Password changed successfully!");
    setPassword({ current: "", newPassword: "", confirmPassword: "" });
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const tabs = [
    ...(role === "Guest" ? [{ key: "stay", label: "My Stay", icon: Home }] : []),
    { key: "profile", label: "Profile Info", icon: User },
    { key: "security", label: "Security", icon: KeyRound },
    { key: "role", label: tabLabel, icon: RoleIcon },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.BACKGROUND, fontFamily: FONTS.BODY }}>
      {/* Responsive rules — mirrors the <style> + className technique used in
          Navbar.jsx, kept local to this page rather than converting the
          whole file to Tailwind. */}
      <style>{`
        .profile-main { padding: 18px; }
        @media (min-width: 640px)  { .profile-main { padding: 28px; } }
        @media (min-width: 1024px) { .profile-main { padding: 32px; } }

        .profile-hero { padding: 26px 20px 52px; }
        @media (min-width: 640px) { .profile-hero { padding: 40px 40px 64px; } }

        .profile-avatar-wrap { margin-left: 20px; }
        @media (min-width: 640px) { .profile-avatar-wrap { margin-left: 40px; } }

        /* Tab bar scrolls horizontally on narrow screens instead of wrapping
           or overflowing the viewport. */
        .profile-tabs {
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
          max-width: 100%;
        }
        .profile-tabs::-webkit-scrollbar { display: none; }
        .profile-tabs button { flex-shrink: 0; white-space: nowrap; }
      `}</style>

      <Sidebar />

      <main className="profile-main" style={{ flex: 1, maxWidth: 980 }}>
        {/* ---- Membership-card hero ---- */}
        <div
          className="profile-hero"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: BORDER_RADIUS.LARGE,
            background: `linear-gradient(120deg, ${COLORS.PRIMARY} 0%, #2E2620 55%, ${COLORS.PRIMARY} 100%)`,
            boxShadow: SHADOWS.CARD,
          }}
        >
          {/* diagonal gold sheen */}
          <div
            style={{
              position: "absolute",
              top: "-60%",
              left: "-10%",
              width: "70%",
              height: "220%",
              background: "linear-gradient(115deg, transparent 40%, rgba(200,169,106,0.16) 50%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          {/* role ribbon */}
          <div
            style={{
              position: "absolute",
              top: 22,
              right: -46,
              width: 170,
              transform: "rotate(45deg)",
              background: COLORS.ACCENT,
              color: COLORS.PRIMARY,
              textAlign: "center",
              padding: "5px 0",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
            }}
          >
            {ribbon}
          </div>

          <p style={{ color: COLORS.MUTED, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
            LuxuryStay Membership
          </p>
          <h1
            style={{
              marginTop: 8,
              fontFamily: FONTS.HEADING,
              fontSize: "clamp(24px, 5vw, 32px)",
              fontWeight: 700,
              color: COLORS.CREAM,
            }}
          >
            {profile.name || "Your Name"}
          </h1>
          <p style={{ marginTop: 6, color: COLORS.ACCENT, fontSize: 14, fontWeight: 600 }}>{detail(profile)}</p>
        </div>

        {/* overlapping avatar */}
        <div
          className="profile-avatar-wrap"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "flex-start",
            marginTop: -48,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.ACCENT}, #E4C98A)`,
              border: `4px solid ${COLORS.SURFACE}`,
              boxShadow: SHADOWS.DROPDOWN,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONTS.HEADING,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.PRIMARY,
              flexShrink: 0,
            }}
          >
            {initials || <User size={32} />}
          </div>
        </div>

        {/* ---- Tabs ---- */}
        <div
          className="profile-tabs"
          style={{
            display: "flex",
            background: COLORS.CREAM,
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: BORDER_RADIUS.PILL,
            padding: 4,
            marginTop: 12,
            marginBottom: 28,
            gap: 2,
            width: "fit-content",
          }}
        >
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 18px",
                borderRadius: BORDER_RADIUS.PILL,
                border: "none",
                cursor: "pointer",
                fontFamily: FONTS.BODY,
                fontSize: 13,
                fontWeight: 700,
                color: tab === key ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY,
                background: tab === key ? COLORS.SURFACE : "transparent",
                boxShadow: tab === key ? SHADOWS.DROPDOWN : "none",
              }}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* ---- My Stay (guest only) ---- */}
        {tab === "stay" && role === "Guest" && <GuestStayTab />}

        {/* ---- Profile Info ---- */}
        {tab === "profile" && (
          <SectionCard title="Profile Information" icon={User} accent={COLORS.PRIMARY}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              <FieldInput
                icon={User}
                label="Full Name"
                placeholder="Enter full name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <FieldInput
                icon={Phone}
                label="Phone Number"
                placeholder="Enter phone number"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
              <FieldInput
                icon={Mail}
                label="Email"
                type="email"
                placeholder="Enter email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <PillButton icon={Save} onClick={handleProfileSave}>
              Save Profile
            </PillButton>
          </SectionCard>
        )}

        {/* ---- Security ---- */}
        {tab === "security" && (
          <SectionCard title="Change Password" icon={KeyRound} accent={COLORS.ACCENT}>
            <div style={{ display: "grid", gap: 20, maxWidth: 420 }}>
              <PasswordInput
                label="Current Password"
                value={password.current}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
              />
              <PasswordInput
                label="New Password"
                value={password.newPassword}
                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
              />
              <PasswordInput
                label="Confirm New Password"
                value={password.confirmPassword}
                onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
              />
            </div>
            <PillButton icon={KeyRound} onClick={handlePasswordChange}>
              Change Password
            </PillButton>
          </SectionCard>
        )}

        {/* ---- Role-specific tab ---- */}
        {tab === "role" && role === "Admin" && (
          <SectionCard title="Access & Permissions" icon={ShieldCheck} accent={COLORS.SUCCESS}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              {PERMISSIONS.map((perm) => (
                <div
                  key={perm}
                  onClick={() => setPermissions((p) => ({ ...p, [perm]: !p[perm] }))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 16px",
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    border: `1px solid ${permissions[perm] ? COLORS.ACCENT : COLORS.BORDER}`,
                    background: permissions[perm] ? "rgba(200,169,106,0.1)" : COLORS.CREAM,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: permissions[perm] ? COLORS.ACCENT : COLORS.SURFACE,
                      border: `1px solid ${permissions[perm] ? COLORS.ACCENT : COLORS.BORDER}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {permissions[perm] && <Check size={13} color={COLORS.PRIMARY} strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.TEXT_PRIMARY }}>{perm}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {tab === "role" && role === "Staff" && (
          <SectionCard title="Work Details" icon={Briefcase} accent={COLORS.INFO}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {[
                { label: "Department", value: profile.department },
                { label: "Shift", value: `${profile.shift} Shift` },
                { label: "Employee ID", value: profile.employeeId },
                { label: "Employment Type", value: "Full-time" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ background: COLORS.CREAM, borderRadius: BORDER_RADIUS.MEDIUM, padding: "18px 20px" }}
                >
                  <p style={{ fontSize: 12, color: COLORS.TEXT_SECONDARY, marginBottom: 6 }}>{item.label}</p>
                  <p style={{ fontFamily: FONTS.HEADING, fontSize: 18, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: COLORS.TEXT_SECONDARY,
                fontSize: 13,
              }}
            >
              <Clock size={15} color={COLORS.ACCENT} /> Next shift starts tomorrow at 8:00 AM
            </div>
          </SectionCard>
        )}

        {tab === "role" && role === "Guest" && (
          <SectionCard title="Preferences & Rewards" icon={Sparkles} accent={COLORS.ACCENT}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                {profile.tier} Member — {profile.loyaltyPoints.toLocaleString()} pts
              </span>
              <span style={{ fontSize: 12, color: COLORS.TEXT_SECONDARY }}>
                {profile.loyaltyNext - profile.loyaltyPoints} pts to Platinum
              </span>
            </div>
            <div style={{ height: 8, borderRadius: BORDER_RADIUS.PILL, background: COLORS.BORDER, overflow: "hidden" }}>
              <div
                style={{
                  width: `${(profile.loyaltyPoints / profile.loyaltyNext) * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${COLORS.ACCENT}, #E4C98A)`,
                  borderRadius: BORDER_RADIUS.PILL,
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16,
                marginTop: 28,
              }}
            >
              {[
                { label: "Member Since", value: profile.memberSince },
                { label: "Preferred Room Type", value: "Deluxe King" },
                { label: "Total Stays", value: "12 nights" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ background: COLORS.CREAM, borderRadius: BORDER_RADIUS.MEDIUM, padding: "18px 20px" }}
                >
                  <p style={{ fontSize: 12, color: COLORS.TEXT_SECONDARY, marginBottom: 6 }}>{item.label}</p>
                  <p style={{ fontFamily: FONTS.HEADING, fontSize: 18, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </main>
    </div>
  );
}

export default ProfilePage;
