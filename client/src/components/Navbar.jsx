import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import notificationApi from "../api/notificationApi";
import { COLORS, FONTS } from "../constants/theme";
import { ROLES } from "../constants/roles";
import { SIDEBAR_WIDTH } from "../constants/layout";
import Logo from "../assets/Logo.png";
import { HashLink } from "react-router-hash-link";
import {
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const PUBLIC_LINKS = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "About", path: "/#about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];


const GUEST_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/#about" },
  { label: "Services", path: "/HomeService" },
  { label: "Contact", path: "/contact" },
  { label: "Gallery", path: "/gallery" },
  { label: "Rooms", path: "/rooms" },
  { label: "Feedback", path: "/guest/feedback" },
];

const ADMIN_LINK = [
  { label: "Home", path: "/" },
  { label: "About", path: "/#about" },
  { label: "Services", path: "/HomeService" },
  { label: "Contact", path: "/contact" },
  { label: "Gallery", path: "/gallery" },
  { label: "Rooms", path: "/rooms" },
  { label: "Feedback", path: "/guest/feedback" },
];

const STAFF_ROLES = [ROLES.ADMIN, ROLES.MANAGER, ROLES.RECEPTIONIST, ROLES.HOUSEKEEPING];

// Turns a createdAt timestamp into "5m ago" / "1h ago" / "Yesterday" style text.
const timeAgo = (dateStr) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
};

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const initials = getInitials(user?.name);

//  notification 
  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;
    const fetchNotifications = async () => {
      try {
        const res = await notificationApi.getMine();
        if (cancelled) return;
        setNotifications(res.data?.notifications || []);
        setUnreadCount(res.data?.unreadCount || 0);
      } catch {
        
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  const handleNotifClick = async (n) => {
    if (!n.read) {
      setNotifications((prev) => prev.map((x) => (x._id === n._id ? { ...x, read: true } : x)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
      try {
        await notificationApi.markAsRead(n._id);
      } catch {
      }
    }
    if (n.link) navigate(n.link);
    setNotifOpen(false);
  };

  const isStaff = isAuthenticated && STAFF_ROLES.includes(user?.role);
  const isGuestUser = isAuthenticated && user?.role === ROLES.GUEST;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSheetOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

// notification 

  const NotificationBell = ({ dark }) => (
    <div ref={notifRef} style={{ position: "relative" }}>
      <button
        onClick={() => { setNotifOpen((p) => !p); setProfileOpen(false); }}
        aria-label="Notifications"
        style={{
          position: "relative",
          width: "38px", height: "38px", borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "transparent", border: "none", cursor: "pointer",
          color: dark ? "rgba(243,229,216,0.85)" : COLORS.TEXT_SECONDARY,
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = dark ? "rgba(255,255,255,0.1)" : COLORS.BACKGROUND)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <BellIcon style={{ width: 20, height: 20 }} />
        {unreadCount > 0 && (
          <span style={{
            position: "absolute", top: "7px", right: "8px",
            width: "8px", height: "8px", borderRadius: "50%",
            background: COLORS.ACCENT,
            border: `2px solid ${dark ? COLORS.PRIMARY : "#FFFFFF"}`,
          }} />
        )}
      </button>

      {notifOpen && (
        <div style={{
          position: "absolute", top: "48px", right: 0,
          width: "310px", maxWidth: "calc(100vw - 40px)", background: "#FFFFFF",
          border: `1px solid ${COLORS.BORDER}`,
          borderRadius: "14px",
          boxShadow: "0 14px 36px rgba(92,26,43,0.16)",
          zIndex: 1100, overflow: "hidden",
        }}>
          <div style={{
            padding: "13px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: `1px solid ${COLORS.BORDER}`,
          }}>
            <span style={{ fontFamily: FONTS.HEADING, fontSize: "13px", color: COLORS.TEXT_PRIMARY }}>
              Notifications
            </span>
            {unreadCount > 0 && (
              <span style={{ fontSize: "11px", color: COLORS.ACCENT, fontFamily: FONTS.BODY, fontWeight: 500 }}>
                {unreadCount} new
              </span>
            )}
          </div>

          <div style={{ maxHeight: "280px", overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <p style={{ padding: "24px 16px", fontSize: "12px", color: COLORS.TEXT_SECONDARY, textAlign: "center", fontFamily: FONTS.BODY }}>
                You're all caught up.
              </p>
            ) : (
              notifications.map((n) => (
                <div key={n._id} onClick={() => handleNotifClick(n)} style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${COLORS.BORDER}`,
                  display: "flex", gap: "10px", alignItems: "flex-start",
                  background: n.read ? "transparent" : COLORS.BACKGROUND,
                  cursor: "pointer",
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%", marginTop: "6px", flexShrink: 0,
                    background: n.read ? COLORS.BORDER : COLORS.ACCENT,
                  }} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: "0 0 2px", fontSize: "12.5px", fontWeight: 500, color: COLORS.TEXT_PRIMARY, fontFamily: FONTS.BODY }}>
                      {n.title}
                    </p>
                    <p style={{ margin: "0 0 2px", fontSize: "11.5px", color: COLORS.TEXT_SECONDARY, fontFamily: FONTS.BODY }}>
                      {n.detail}
                    </p>
                    <p style={{ margin: 0, fontSize: "10.5px", color: COLORS.TEXT_SECONDARY, opacity: 0.7 }}>
                      {timeAgo(n.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );

  // profile avatar
  const ProfileMenu = () => (
    <div ref={profileRef} style={{ position: "relative" }}>
      <button
        onClick={() => { setProfileOpen((p) => !p); setNotifOpen(false); }}
        aria-label="Open profile menu"
        style={{
          width: "38px", height: "38px", borderRadius: "50%", border: "none", cursor: "pointer",
          background: `linear-gradient(135deg, ${COLORS.ACCENT}, ${COLORS.PRIMARY})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", fontWeight: 600, color: COLORS.CREAM, fontFamily: FONTS.BODY,
          boxShadow: "0 0 0 2px rgba(255,255,255,0.5)",
        }}
      >
        {initials}
      </button>

      {profileOpen && (
        <div style={{
          position: "absolute", top: "48px", right: 0,
          background: "#FFFFFF",
          border: `1px solid ${COLORS.BORDER}`,
          borderRadius: "14px", width: "230px", maxWidth: "calc(100vw - 40px)",
          boxShadow: "0 14px 36px rgba(92,26,43,0.16)",
          zIndex: 1100, overflow: "hidden",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "14px 16px",
            borderBottom: `1px solid ${COLORS.BORDER}`,
            background: COLORS.BACKGROUND,
          }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, ${COLORS.ACCENT}, ${COLORS.PRIMARY})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: 600, color: COLORS.CREAM, fontFamily: FONTS.BODY,
            }}>
              {initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{
                margin: "0 0 2px", fontSize: "13px", fontWeight: 500, color: COLORS.TEXT_PRIMARY,
                fontFamily: FONTS.BODY, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {user?.name || "User"}
              </p>
              <p style={{
                margin: 0, fontSize: "11px", color: COLORS.TEXT_SECONDARY,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {user?.email || ""}
              </p>
            </div> 
          </div>

          <Link
            to="/profile"
            onClick={() => setProfileOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 16px", fontSize: "13px", color: COLORS.TEXT_PRIMARY, textDecoration: "none", fontFamily: FONTS.BODY }}
          >
            <UserCircleIcon style={{ width: 17, height: 17, color: COLORS.TEXT_SECONDARY }} />
            Profile
          </Link>

          <Link
            to="/settings"
            onClick={() => setProfileOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 16px", fontSize: "13px", color: COLORS.TEXT_PRIMARY, textDecoration: "none", fontFamily: FONTS.BODY }}
          >
            <Cog6ToothIcon style={{ width: 17, height: 17, color: COLORS.TEXT_SECONDARY }} />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "11px 16px", fontSize: "13px",
              color: COLORS.ERROR,
              background: "none", border: "none",
              borderTop: `1px solid ${COLORS.BORDER}`,
              width: "100%", cursor: "pointer",
              fontFamily: FONTS.BODY, textAlign: "left",
            }}
          >
            <ArrowRightOnRectangleIcon style={{ width: 17, height: 17 }} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );


  if (isStaff) {
    return (
      <header
        className="lg:ml-[--sidebar-w]"
        style={{
          "--sidebar-w": `${SIDEBAR_WIDTH}px`,
          height: "64px",
          background: COLORS.PRIMARY,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "10px",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <NotificationBell dark />
        <ProfileMenu />
      </header>
    );
  }

// loged in guesy navbar
  if (isGuestUser) {
    const linkStyle = (path) => ({
      fontFamily: FONTS.BODY,
      fontSize: "13px",
      color: COLORS.CREAM,
      opacity: isActive(path) ? 1 : 0.72,
      padding: "7px 15px",
      borderRadius: "9px",
      textDecoration: "none",
      background: isActive(path) ? "rgba(243,229,216,0.16)" : "transparent",
      whiteSpace: "nowrap",
      transition: "opacity 0.15s ease, background 0.15s ease",
    });

    return (
      <>
        <style>{`
          .nav-links-desktop { display: flex; }
          .nav-hamburger { display: none; }
          @media (max-width: 768px) {
            .nav-links-desktop { display: none; }
            .nav-hamburger { display: flex; }
          }
          .nav-link:hover { opacity: 1 !important; background: rgba(243,229,216,0.1) !important; }
        `}</style>

        <nav style={{
          background: COLORS.PRIMARY,
          borderBottom: `2px solid ${COLORS.ACCENT}`,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          height: "64px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
        }}>

          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginRight: "36px", flexShrink: 0 }}>
            <img src={Logo} alt="LuxuryStay Logo" style={{ height: "46px", width: "auto", objectFit: "contain" }} />
            <span style={{ fontFamily: FONTS.HEADING, fontSize: "15px", color: COLORS.ACCENT }}>
              LuxuryStay
            </span>
          </Link>

          <div className="nav-links-desktop" style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: "2px" }}>
            {GUEST_LINKS.map((link) => (
              <HashLink key={link.path} smooth to={link.path} className="nav-link" style={linkStyle(link.path)}>
                {link.label}
              </HashLink>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto", flexShrink: 0 }}>
            <NotificationBell dark />
            <ProfileMenu />
          </div>

          <button
            className="nav-hamburger"
            onClick={() => setSheetOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none", border: "none",
              cursor: "pointer", color: COLORS.CREAM,
              marginLeft: "12px", padding: "4px",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <Bars3Icon style={{ width: 24, height: 24 }} />
          </button>

        </nav>

        {sheetOpen && (
          <div onClick={() => setSheetOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1200 }} />
        )}

        {sheetOpen && (
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "#FFFFFF",
            borderRadius: "20px 20px 0 0",
            zIndex: 1300, overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 8px" }}>
              <span style={{ fontFamily: FONTS.HEADING, fontSize: "14px", color: COLORS.TEXT_PRIMARY }}>Menu</span>
              <button onClick={() => setSheetOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.TEXT_SECONDARY, padding: "4px" }}>
                <XMarkIcon style={{ width: 20, height: 20 }} />
              </button>
            </div>

            {GUEST_LINKS.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setSheetOpen(false)}
                style={{ display: "flex", alignItems: "center", padding: "15px 20px", fontSize: "14px", color: COLORS.TEXT_PRIMARY, borderBottom: `0.5px solid ${COLORS.BORDER}`, textDecoration: "none" }}>
                {link.label}
              </Link>
            ))}
            <Link to="/profile" onClick={() => setSheetOpen(false)}
              style={{ display: "flex", alignItems: "center", padding: "15px 20px", fontSize: "14px", color: COLORS.TEXT_PRIMARY, borderBottom: `0.5px solid ${COLORS.BORDER}`, textDecoration: "none" }}>
              Profile
            </Link>
            <button onClick={handleLogout}
              style={{ display: "flex", alignItems: "center", padding: "15px 20px", fontSize: "14px", color: COLORS.ERROR, background: "none", border: "none", width: "100%", cursor: "pointer", textAlign: "left" }}>
              Sign out
            </button>
            <div style={{ height: "24px" }} />
          </div>
        )}
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // PUBLIC MODE — logged out visitors.
  // ══════════════════════════════════════════════════════════════════
  return (
    <>
      <style>{`
        .nav-links-desktop { display: flex; }
        .nav-auth-desktop { display: flex; }
        .nav-hamburger { display: none; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none; }
          .nav-auth-desktop { display: none; }
          .nav-hamburger { display: flex; }
        }
        .nav-link:hover { opacity: 1 !important; background: rgba(243,229,216,0.1) !important; }
        .btn-login:hover { background: rgba(243,229,216,0.08); }
        .btn-register:hover { filter: brightness(1.08); transform: translateY(-1px); }
      `}</style>

      <nav style={{
        background: COLORS.PRIMARY,
        borderBottom: `2px solid ${COLORS.ACCENT}`,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
      }}>

        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginRight: "36px", flexShrink: 0 }}>
          <img src={Logo} alt="LuxuryStay Logo" style={{ height: "46px", width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: FONTS.HEADING, fontSize: "15px", color: COLORS.ACCENT }}>
            LuxuryStay
          </span>
        </Link>

        <div className="nav-links-desktop" style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: "2px" }}>
          {PUBLIC_LINKS.map((link) => (
            <HashLink key={link.path} smooth to={link.path} className="nav-link" style={{
              fontFamily: FONTS.BODY, fontSize: "13px", color: COLORS.CREAM,
              opacity: isActive(link.path) ? 1 : 0.72, padding: "7px 15px", borderRadius: "9px",
              textDecoration: "none", background: isActive(link.path) ? "rgba(243,229,216,0.16)" : "transparent",
              whiteSpace: "nowrap", transition: "opacity 0.15s ease, background 0.15s ease",
            }}>
              {link.label}
            </HashLink>
          ))}
        </div>

        <div className="nav-auth-desktop" style={{ alignItems: "center", gap: "8px", marginLeft: "auto", flexShrink: 0 }}>
          <Link to="/login" className="btn-login" style={{
            fontFamily: FONTS.BODY, fontSize: "13px", color: COLORS.CREAM, padding: "8px 18px",
            borderRadius: "9px", border: "1px solid rgba(243,229,216,0.4)", textDecoration: "none",
            transition: "background 0.15s ease",
          }}>
            Login
          </Link>
          <Link to="/register" className="btn-register" style={{
            fontFamily: FONTS.BODY, fontSize: "13px", color: COLORS.TEXT_PRIMARY, padding: "8px 18px",
            borderRadius: "9px", background: COLORS.ACCENT, textDecoration: "none", fontWeight: 500,
            transition: "filter 0.15s ease, transform 0.15s ease",
          }}>
            Register
          </Link>
        </div>

        <button className="nav-hamburger" onClick={() => setSheetOpen(true)} aria-label="Open menu" style={{
          background: "none", border: "none", cursor: "pointer", color: COLORS.CREAM,
          marginLeft: "auto", padding: "4px", alignItems: "center", justifyContent: "center",
        }}>
          <Bars3Icon style={{ width: 24, height: 24 }} />
        </button>

      </nav>

      {sheetOpen && (
        <div onClick={() => setSheetOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1200 }} />
      )}

      {sheetOpen && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#FFFFFF", borderRadius: "20px 20px 0 0", zIndex: 1300, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 8px" }}>
            <span style={{ fontFamily: FONTS.HEADING, fontSize: "14px", color: COLORS.TEXT_PRIMARY }}>Menu</span>
            <button onClick={() => setSheetOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.TEXT_SECONDARY, padding: "4px" }}>
              <XMarkIcon style={{ width: 20, height: 20 }} />
            </button>
          </div>

          {PUBLIC_LINKS.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setSheetOpen(false)}
              style={{ display: "flex", alignItems: "center", padding: "15px 20px", fontSize: "14px", color: COLORS.TEXT_PRIMARY, borderBottom: `0.5px solid ${COLORS.BORDER}`, textDecoration: "none" }}>
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setSheetOpen(false)}
            style={{ display: "flex", alignItems: "center", padding: "15px 20px", fontSize: "14px", color: COLORS.PRIMARY, borderBottom: `0.5px solid ${COLORS.BORDER}`, textDecoration: "none", fontWeight: 500 }}>
            Login
          </Link>
          <Link to="/register" onClick={() => setSheetOpen(false)}
            style={{ display: "flex", alignItems: "center", padding: "15px 20px", fontSize: "14px", color: COLORS.ACCENT, textDecoration: "none", fontWeight: 500 }}>
            Register
          </Link>
          <div style={{ height: "24px" }} />
        </div>
      )}
    </>
  );
}