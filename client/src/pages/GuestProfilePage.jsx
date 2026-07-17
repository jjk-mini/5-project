// GuestProfilePage.jsx — LuxuryStay Hospitality
// Single merged Guest Profile page. Replaces the old ProfilePage hero +
// standalone GuestStayTab route: "My Stay" content now lives inside a tab
// here, alongside Profile Info, Security and Services.
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Globe2,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  Home,
  Sparkles,
  Wrench,
  Save,
  MapPin,
  Wifi,
  Clock3,
  CalendarDays,
  CreditCard,
  Hash,
  Award,
  BedDouble,
  Gift,
  Coffee,
  ConciergeBell,
  Sparkle,
  Flower2,
  ArrowRight,
} from "lucide-react";

import AsideBarGuest from "../components/AsidebarGuest"; // adjust path if needed
import { COLORS, FONTS, BORDER_RADIUS, SHADOWS } from "../constants/theme";

import ProfileHeader from "./componnts/ProfileHeader";
import TabButton from "./componnts/TabButton";
import BookingCard from "./componnts/BookingCard";
import CurrentBookingCard from "./componnts/CurrentBookingCard";
import InfoCard from "./componnts/InfoCard";
import StatisticCard from "./componnts/StatisticCard";
import ActivityItem from "./componnts/ActivityItem";
import ServiceCard from "./componnts/ServiceCard";
import ToggleSwitch from "./componnts/ToggleSwitch";
import ProfileSection from "./componnts/ProfileSection";

// ---- Static data (swap for real guest/booking data) -----------------------

const TABS = [
  { key: "stay", label: "My Stay", icon: Home },
  { key: "info", label: "Profile Info", icon: User },
  { key: "security", label: "Security", icon: KeyRound },
  { key: "services", label: "Services", icon: Sparkles },
];

const bookingsSummary = [
  {
    key: "current",
    status: "Viewing",
    room: "Suite 402",
    location: "Karachi",
    meta: "Day 3 of 5 · checks out 15 Jul",
    active: true,
  },
  {
    key: "upcoming",
    status: "Upcoming",
    room: "Room 210",
    location: "Lahore",
    meta: "Checks in 2 Aug · 3 nights",
    active: false,
  },
];

const currentBooking = {
  room: "Deluxe Suite",
  guests: "2 Adults",
  checkIn: "10 Jul",
  checkOut: "15 Jul",
  dayOfStay: 3,
  totalDays: 5,
};

const recentActivity = [
  { icon: Clock3, title: "Room Service Requested", time: "Today, 10:30 AM" },
  { icon: CalendarDays, title: "Booking Confirmed", time: "Yesterday, 2:15 PM" },
  { icon: CreditCard, title: "Payment Successful", time: "2 days ago" },
];

const stayInfoRows = [
  { label: "Wi-Fi", value: "LuxuryStay_Guest" },
  { label: "Breakfast", value: "7:00 – 10:30 AM" },
  { label: "Check-out", value: "12:00 PM" },
  { label: "Room Number", value: "402" },
];

const services = [
  { icon: Coffee, name: "Breakfast", subtitle: "$12" },
  { icon: ConciergeBell, name: "Room Service", subtitle: "24 hours" },
  { icon: Sparkle, name: "Laundry", subtitle: "Same-day" },
  { icon: Flower2, name: "Spa", subtitle: "From $45" },
];

// ---- Page -------------------------------------------------------------

function GuestProfilePage() {
  const [tab, setTab] = useState("stay");

  const [profile, setProfile] = useState({
    name: "Maheen Tareen",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    country: "",
    tier: "Gold",
    memberSince: "2024",
    memberId: "GX-48213",
    totalBookings: 12,
    rewardPoints: 3200,
  });

  const [preferences, setPreferences] = useState({
    roomType: "Deluxe King",
    language: "English",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
  });

  const [password, setPassword] = useState({ current: "", newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState({ current: false, newPassword: false, confirmPassword: false });

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

  const accountStats = [
    { icon: Hash, label: "Member ID", value: profile.memberId },
    { icon: Award, label: "Loyalty Tier", value: profile.tier },
    { icon: Calendar, label: "Member Since", value: profile.memberSince },
    { icon: BedDouble, label: "Total Bookings", value: profile.totalBookings },
    { icon: Gift, label: "Reward Points", value: profile.rewardPoints.toLocaleString() },
  ];

  return (
    <div className="flex min-h-screen" style={{ background: COLORS.BACKGROUND, fontFamily: FONTS.BODY }}>
      <AsideBarGuest />

      <main className="flex-1 max-w-[1040px] p-4 sm:p-7 lg:p-8">
        {/* ---- Header card ---- */}
        <ProfileHeader
          name={profile.name}
          initials={initials}
          tier={profile.tier}
          memberSince={profile.memberSince}
          activeBookings={bookingsSummary.length}
        />

        {/* ---- Tabs ---- */}
        <div
          className="flex gap-1 overflow-x-auto mt-5 mb-6 p-1"
          style={{
            background: COLORS.CREAM,
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: BORDER_RADIUS.MEDIUM,
            scrollbarWidth: "none",
          }}
        >
          {TABS.map((t) => (
            <TabButton
              key={t.key}
              label={t.label}
              icon={t.icon}
              active={tab === t.key}
              onClick={() => setTab(t.key)}
            />
          ))}
        </div>

        {/* ---- My Stay ---- */}
        {tab === "stay" && (
          <div className="grid gap-5">
            <div>
              <h2 className="text-sm font-bold mb-3" style={{ color: COLORS.TEXT_PRIMARY }}>
                Your Bookings
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {bookingsSummary.map((b) => (
                  <BookingCard key={b.key} {...b} />
                ))}
              </div>
            </div>

            <CurrentBookingCard {...currentBooking} />

            <div className="grid lg:grid-cols-[2fr_1fr] gap-5">
              <div
                className="p-5 sm:p-6"
                style={{
                  background: COLORS.SURFACE,
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.LARGE,
                  boxShadow: SHADOWS.CARD,
                }}
              >
                <h2
                  className="text-base font-bold mb-4"
                  style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
                >
                  Recent Activity
                </h2>
                <div className="grid gap-3">
                  {recentActivity.map((a) => (
                    <ActivityItem key={a.title} {...a} />
                  ))}
                </div>
              </div>

              <InfoCard title="Stay Information" icon={MapPin} rows={stayInfoRows} />
            </div>
          </div>
        )}

        {/* ---- Profile Info ---- */}
        {tab === "info" && (
          <div className="grid gap-5">
            {/* Top profile section */}
            <div
              className="flex flex-wrap items-center gap-5 p-5 sm:p-6"
              style={{
                background: COLORS.SURFACE,
                border: `1px solid ${COLORS.BORDER}`,
                borderRadius: BORDER_RADIUS.LARGE,
                boxShadow: SHADOWS.CARD,
              }}
            >
              <div
                className="flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.ACCENT}, #E4C98A)`,
                  color: COLORS.PRIMARY,
                  fontFamily: FONTS.HEADING,
                }}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <h2
                  className="text-xl font-bold"
                  style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
                >
                  {profile.name}
                </h2>
                <span
                  className="inline-block text-xs font-bold px-3 py-1 mt-2"
                  style={{
                    borderRadius: BORDER_RADIUS.PILL,
                    background: "rgba(200,169,106,0.18)",
                    color: COLORS.ACCENT,
                  }}
                >
                  {profile.tier} Member
                </span>
                <p className="text-sm mt-1" style={{ color: COLORS.TEXT_SECONDARY }}>
                  Member since {profile.memberSince}
                </p>
              </div>
              <button
                type="button"
                className="ml-auto text-sm font-bold px-4 py-2.5 transition-colors duration-150"
                style={{
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  border: `1px solid ${COLORS.BORDER}`,
                  color: COLORS.TEXT_PRIMARY,
                  background: COLORS.CREAM,
                }}
              >
                Edit Profile Photo
              </button>
            </div>

            {/* Personal information */}
            <ProfileSection title="Personal Information" icon={User}>
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldInput
                  icon={User}
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
                <FieldInput
                  icon={Mail}
                  label="Email Address"
                  type="email"
                  placeholder="Add email address"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <FieldInput
                  icon={Phone}
                  label="Phone Number"
                  placeholder="Add phone number"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
                <FieldInput
                  icon={Calendar}
                  label="Date of Birth"
                  type="date"
                  value={profile.dob}
                  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                />
                <FieldInput
                  icon={User}
                  label="Gender"
                  placeholder="Optional"
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                />
                <FieldInput
                  icon={Globe2}
                  label="Country / Region"
                  placeholder="Optional"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                />
              </div>
            </ProfileSection>

            {/* Account information */}
            <ProfileSection title="Account Information" icon={ShieldCheck}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {accountStats.map((s) => (
                  <StatisticCard key={s.label} {...s} />
                ))}
              </div>
            </ProfileSection>

            {/* Preferences */}
            <ProfileSection title="Preferences" icon={Sparkles}>
              <div className="grid sm:grid-cols-2 gap-x-8">
                <FieldInput
                  icon={BedDouble}
                  label="Preferred Room Type"
                  value={preferences.roomType}
                  onChange={(e) => setPreferences({ ...preferences, roomType: e.target.value })}
                />
                <FieldInput
                  icon={Globe2}
                  label="Preferred Language"
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                />
              </div>
              <div className="mt-2 divide-y" style={{ borderColor: COLORS.BORDER }}>
                <ToggleSwitch
                  label="Email Notifications"
                  description="Booking updates and receipts"
                  checked={preferences.emailNotifications}
                  onChange={(v) => setPreferences({ ...preferences, emailNotifications: v })}
                />
                <ToggleSwitch
                  label="SMS Notifications"
                  description="Check-in reminders and alerts"
                  checked={preferences.smsNotifications}
                  onChange={(v) => setPreferences({ ...preferences, smsNotifications: v })}
                />
                <ToggleSwitch
                  label="Marketing Emails"
                  description="Offers, upgrades and news"
                  checked={preferences.marketingEmails}
                  onChange={(v) => setPreferences({ ...preferences, marketingEmails: v })}
                />
              </div>
            </ProfileSection>

            {/* Security summary */}
            <ProfileSection
              title="Security Summary"
              icon={KeyRound}
              action={
                <button
                  type="button"
                  onClick={() => setTab("security")}
                  className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 transition-colors duration-150"
                  style={{
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: COLORS.PRIMARY,
                    color: COLORS.CREAM,
                  }}
                >
                  Manage Security <ArrowRight size={14} />
                </button>
              }
            >
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
                    Password Status
                  </p>
                  <p className="text-sm font-semibold mt-1" style={{ color: COLORS.SUCCESS }}>
                    Strong
                  </p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm font-semibold mt-1" style={{ color: COLORS.WARNING }}>
                    Not enabled
                  </p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
                    Last Account Update
                  </p>
                  <p className="text-sm font-semibold mt-1" style={{ color: COLORS.TEXT_PRIMARY }}>
                    3 weeks ago
                  </p>
                </div>
              </div>
            </ProfileSection>

            {/* Save section */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                className="text-sm font-bold px-6 py-3 order-2 sm:order-1 transition-colors duration-150"
                style={{
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  border: `1px solid ${COLORS.BORDER}`,
                  color: COLORS.TEXT_PRIMARY,
                  background: COLORS.SURFACE,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProfileSave}
                className="flex items-center justify-center gap-2 text-sm font-bold px-6 py-3 order-1 sm:order-2 transition-colors duration-150"
                style={{
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: COLORS.PRIMARY,
                  color: COLORS.CREAM,
                  boxShadow: "0 8px 20px rgba(31,26,23,0.18)",
                }}
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        )}

        {/* ---- Security ---- */}
        {tab === "security" && (
          <ProfileSection title="Change Password" icon={KeyRound}>
            <div className="grid gap-4 max-w-md">
              <PasswordField
                label="Current Password"
                value={password.current}
                visible={showPassword.current}
                onToggleVisible={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
              />
              <PasswordField
                label="New Password"
                value={password.newPassword}
                visible={showPassword.newPassword}
                onToggleVisible={() =>
                  setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })
                }
                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
              />
              <PasswordField
                label="Confirm New Password"
                value={password.confirmPassword}
                visible={showPassword.confirmPassword}
                onToggleVisible={() =>
                  setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })
                }
                onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={handlePasswordChange}
              className="flex items-center gap-2 text-sm font-bold px-6 py-3 mt-6 transition-colors duration-150"
              style={{
                borderRadius: BORDER_RADIUS.MEDIUM,
                background: COLORS.PRIMARY,
                color: COLORS.CREAM,
                boxShadow: "0 8px 20px rgba(31,26,23,0.18)",
              }}
            >
              <KeyRound size={16} /> Change Password
            </button>
          </ProfileSection>
        )}

        {/* ---- Services ---- */}
        {tab === "services" && (
          <div
            className="p-5 sm:p-6"
            style={{
              background: COLORS.SURFACE,
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.LARGE,
              boxShadow: SHADOWS.CARD,
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <h2
                className="text-base font-bold"
                style={{ fontFamily: FONTS.HEADING, color: COLORS.TEXT_PRIMARY }}
              >
                Order Services
              </h2>
              <span className="text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>
                Billed to {currentBooking.room}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s) => (
                <ServiceCard key={s.name} {...s} />
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="text-sm font-bold px-6 py-3 transition-colors duration-150"
                style={{
                  borderRadius: BORDER_RADIUS.PILL,
                  border: `1px solid ${COLORS.BORDER}`,
                  color: COLORS.TEXT_PRIMARY,
                  background: COLORS.CREAM,
                }}
              >
                View All Services
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ---- Local field helpers (kept in this file since they're tightly bound
// to the form state above; extract further only if reused elsewhere) -------

function FieldInput({ icon: Icon, label, ...props }) {
  return (
    <div>
      <label
        className="flex items-center gap-2 mb-2 text-xs font-semibold"
        style={{ color: COLORS.TEXT_SECONDARY }}
      >
        {Icon && <Icon size={14} color={COLORS.ACCENT} />}
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 text-sm outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(200,169,106,0.18)]"
        style={{
          borderRadius: BORDER_RADIUS.MEDIUM,
          border: `1px solid ${COLORS.BORDER}`,
          background: COLORS.CREAM,
          color: COLORS.TEXT_PRIMARY,
          fontFamily: FONTS.BODY,
        }}
      />
    </div>
  );
}

function PasswordField({ label, value, onChange, visible, onToggleVisible }) {
  return (
    <div>
      <label className="block mb-2 text-xs font-semibold" style={{ color: COLORS.TEXT_SECONDARY }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className="w-full pl-4 pr-11 py-3 text-sm outline-none"
          style={{
            borderRadius: BORDER_RADIUS.MEDIUM,
            border: `1px solid ${COLORS.BORDER}`,
            background: COLORS.CREAM,
            color: COLORS.TEXT_PRIMARY,
            fontFamily: FONTS.BODY,
          }}
        />
        <button
          type="button"
          onClick={onToggleVisible}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: COLORS.TEXT_SECONDARY }}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

export default GuestProfilePage;
