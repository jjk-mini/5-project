import { useState } from "react";
import {
User,
Bell,
Lock,
Palette,
Save,
} from "lucide-react";
import {
COLORS,
FONTS,
SHADOWS,
BORDER_RADIUS,
} from "../constants/theme";

function SettingsPage() {
const [activeTab, setActiveTab] = useState("profile");

const [settings, setSettings] = useState({
name: "John Doe",
email: "[john@example.com](mailto:john@example.com)",
phone: "+92 300 0000000",
emailNotifications: true,
bookingNotifications: true,
housekeepingNotifications: true,
darkMode: false,
});

const handleChange = (e) => {
const { name, value, type, checked } = e.target;

setSettings((prev) => ({
  ...prev,
  [name]: type === "checkbox" ? checked : value,
}));

};

const handleSave = () => {
alert("Settings saved successfully!");
};

const tabs = [
{
id: "profile",
label: "Profile",
icon: <User size={18} />,
},
{
id: "notifications",
label: "Notifications",
icon: <Bell size={18} />,
},
{
id: "security",
label: "Security",
icon: <Lock size={18} />,
},
{
id: "appearance",
label: "Appearance",
icon: <Palette size={18} />,
},
];

return (
<div
className="flex min-h-screen"
style={{
background: COLORS.BACKGROUND,
fontFamily: FONTS.BODY,
}}
> 

  <main className="flex-1 p-6">
    {/* Header */}
    <div
      className="p-8 mb-8"
      style={{
        background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
      }}
    >
      <h1
        className="text-4xl font-bold text-white"
        style={{
          fontFamily: FONTS.HEADING,
        }}
      >
        Settings
      </h1>

      <p
        className="mt-2"
        style={{
          color: COLORS.ACCENT,
        }}
      >
        Manage your account and application preferences.
      </p>
    </div>

    {/* Settings Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Tabs */}
      <div
        className="p-4 h-fit"
        style={{
          background: COLORS.SURFACE,
          borderRadius: BORDER_RADIUS.LARGE,
          boxShadow: SHADOWS.CARD,
          border: `1px solid ${COLORS.BORDER}`,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="w-full flex items-center gap-3 px-4 py-3 mb-2 text-left transition-all"
            style={{
              background:
                activeTab === tab.id
                  ? COLORS.PRIMARY
                  : "transparent",

              color:
                activeTab === tab.id
                  ? COLORS.CREAM
                  : COLORS.TEXT_PRIMARY,

              borderRadius: BORDER_RADIUS.MEDIUM,
              border: "none",
              cursor: "pointer",
              fontFamily: FONTS.BODY,
              fontWeight: 600,
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div
        className="lg:col-span-3 p-8"
        style={{
          background: COLORS.SURFACE,
          borderRadius: BORDER_RADIUS.LARGE,
          boxShadow: SHADOWS.CARD,
          border: `1px solid ${COLORS.BORDER}`,
        }}
      >
        {/* Profile */}
        {activeTab === "profile" && (
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontFamily: FONTS.HEADING,
              }}
            >
              Profile Settings
            </h2>

            <p
              className="mb-6"
              style={{
                color: COLORS.TEXT_SECONDARY,
              }}
            >
              Update your personal account information.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 outline-none"
                  style={{
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: COLORS.BACKGROUND,
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 outline-none"
                  style={{
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: COLORS.BACKGROUND,
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 outline-none"
                  style={{
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: COLORS.BACKGROUND,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontFamily: FONTS.HEADING,
              }}
            >
              Notification Settings
            </h2>

            <p
              className="mb-6"
              style={{
                color: COLORS.TEXT_SECONDARY,
              }}
            >
              Choose which notifications you want to receive.
            </p>

            <div className="space-y-5">
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    Email Notifications
                  </p>

                  <p
                    className="text-sm"
                    style={{
                      color: COLORS.TEXT_SECONDARY,
                    }}
                  >
                    Receive important updates through email.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    Booking Notifications
                  </p>

                  <p
                    className="text-sm"
                    style={{
                      color: COLORS.TEXT_SECONDARY,
                    }}
                  >
                    Get notified about booking updates.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="bookingNotifications"
                  checked={settings.bookingNotifications}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    Housekeeping Notifications
                  </p>

                  <p
                    className="text-sm"
                    style={{
                      color: COLORS.TEXT_SECONDARY,
                    }}
                  >
                    Receive updates about housekeeping requests.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="housekeepingNotifications"
                  checked={settings.housekeepingNotifications}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              </label>
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontFamily: FONTS.HEADING,
              }}
            >
              Security
            </h2>

            <p
              className="mb-6"
              style={{
                color: COLORS.TEXT_SECONDARY,
              }}
            >
              Manage your password and account security.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-semibold">
                  Current Password
                </label>

                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 outline-none"
                  style={{
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: COLORS.BACKGROUND,
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 outline-none"
                  style={{
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: COLORS.BACKGROUND,
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 outline-none"
                  style={{
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: COLORS.BACKGROUND,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Appearance */}
        {activeTab === "appearance" && (
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontFamily: FONTS.HEADING,
              }}
            >
              Appearance
            </h2>

            <p
              className="mb-6"
              style={{
                color: COLORS.TEXT_SECONDARY,
              }}
            >
              Customize how the application looks.
            </p>

            <label className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  Dark Mode
                </p>

                <p
                  className="text-sm"
                  style={{
                    color: COLORS.TEXT_SECONDARY,
                  }}
                >
                  Enable dark mode for the application.
                </p>
              </div>

              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
                className="w-5 h-5"
              />
            </label>
          </div>
        )}

        {/* Save Button */}
        <div
          className="mt-8 pt-6 flex justify-end"
          style={{
            borderTop: `1px solid ${COLORS.BORDER}`,
          }}
        >
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 text-white font-semibold transition-all hover:scale-105"
            style={{
              background: COLORS.PRIMARY,
              borderRadius: BORDER_RADIUS.PILL,
            }}
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </main>
</div>


);
}

export default SettingsPage;
