import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";
import { COLORS, FONTS } from "../constants/theme";
import { ROLES } from "../constants/roles";
import Logo from '../assets/Logo.png'
import { HashLink } from "react-router-hash-link";

const PUBLIC_LINKS = [
  { label: "Home",     path: "/" },
  { label: "Rooms",    path: "/rooms" },
  { label: "About",    path: "/#about" },
  { label: "Services", path: "/services" },
  { label: "Contact",  path: "/contact" },
];

const NAV_LINKS = {
  [ROLES.ADMIN]: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Staff",     path: "/admin/staff" },
    { label: "Rooms",     path: "/admin/rooms" },
    { label: "Reports",   path: "/admin/reports" },
    { label: "Settings",  path: "/admin/settings" },
  ],
  [ROLES.MANAGER]: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Staff",     path: "/admin/staff" },
    { label: "Rooms",     path: "/admin/rooms" },
    { label: "Reports",   path: "/admin/reports" },
  ],
  [ROLES.RECEPTIONIST]: [
    { label: "Dashboard",    path: "/receptionist/dashboard" },
    { label: "Rooms",        path: "/receptionist/rooms" },
    { label: "Bookings",     path: "/receptionist/bookings" },
    { label: "Check In/Out", path: "/receptionist/checkinout" },
    { label: "Billing",      path: "/receptionist/billing" },
  ],
  [ROLES.HOUSEKEEPING]: [
    { label: "My Tasks",    path: "/housekeeping/dashboard" },
    { label: "Maintenance", path: "/housekeeping/maintenance" },
  ],
  [ROLES.GUEST]: [
    { label: "My Booking", path: "/guest/dashboard" },
    { label: "Services",   path: "/guest/services" },
    { label: "Invoice",    path: "/guest/invoice" },
    { label: "Feedback",   path: "/guest/feedback" },
  ],
};

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sheetOpen, setSheetOpen]       = useState(false);
  const dropdownRef = useRef(null);

  const links    = isAuthenticated ? (NAV_LINKS[user?.role] || []) : PUBLIC_LINKS;
  const initials = getInitials(user?.name);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSheetOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    fontFamily:     FONTS.BODY,
    fontSize:       "13px",
    color:          COLORS.CREAM,
    opacity:        isActive(path) ? 1 : 0.72,
    padding:        "6px 14px",
    borderRadius:   "6px",
    textDecoration: "none",
    background:     isActive(path) ? "rgba(243,229,216,0.15)" : "transparent",
    whiteSpace:     "nowrap",
  });

  return (
    <>
      {/* ── RESPONSIVE STYLE ── */}
      <style>{`
        .nav-links-desktop { display: flex; }
        .nav-hamburger      { display: none; }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none; }
          .nav-hamburger      { display: flex; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        background:    COLORS.PRIMARY,
        display:       "flex",
        alignItems:    "center",
        padding:       "0 24px",
        height:        "60px",
        position:      "sticky",
        top:           0,
        zIndex:        1000,
        boxShadow:     "0 1px 4px rgba(0,0,0,0.15)",
      }}>

        {/* LOGO */}
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none", marginRight:"36px", flexShrink: 0 }}>
          <img
            src={Logo}
            alt="LuxuryStay Logo"
            style={{ height:"50px", width:"auto", objectFit:"contain" }}
          />
          {/* CHANGE 3 — logo name color changed to ACCENT (golden brown) */}
          <span style={{ fontFamily: FONTS.HEADING, fontSize:"15px", color: COLORS.ACCENT }}>
            LuxuryStay
          </span>
        </Link>

        {/* CHANGE 2 — Nav links centered, hidden on mobile */}
        <div
          className="nav-links-desktop"
          style={{
            flex:           1,
            alignItems:     "center",
            justifyContent: "center", // ← centered
            gap:            "2px",
          }}
        >
          {links.map((link) => (
            <HashLink
              key={link.path}
              smooth
              to={link.path}
              style={linkStyle(link.path)}
            >
              {link.label}
            </HashLink>
          ))}
        </div>

        {/* RIGHT SIDE — avatar or login/register */}
        <div ref={dropdownRef} style={{ position:"relative", marginLeft:"auto", flexShrink: 0 }}>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-label="Open profile menu"
                style={{
                  width:"36px", height:"36px", borderRadius:"50%",
                  background: COLORS.ACCENT,
                  border: `2px solid rgba(243,229,216,0.25)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"13px", fontWeight:600,
                  color: COLORS.TEXT_PRIMARY,
                  cursor:"pointer",
                }}
              >
                {initials}
              </button>

              {dropdownOpen && (
                <div style={{
                  position:"absolute", top:"46px", right:0,
                  background:"#FFFFFF",
                  border: `0.5px solid ${COLORS.BORDER}`,
                  borderRadius:"12px", width:"230px",
                  boxShadow:"0 6px 24px rgba(92,26,43,0.12)",
                  zIndex:1100, overflow:"hidden",
                }}>
                  <div style={{
                    display:"flex", alignItems:"center", gap:"12px",
                    padding:"14px 16px",
                    borderBottom: `0.5px solid ${COLORS.BORDER}`,
                    background: COLORS.BACKGROUND,
                  }}>
                    <div style={{
                      width:"38px", height:"38px", borderRadius:"50%",
                      background: COLORS.ACCENT,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"14px", fontWeight:600, color: COLORS.TEXT_PRIMARY,
                    }}>{initials}</div>
                    <div>
                      <p style={{ margin:"0 0 2px", fontSize:"13px", fontWeight:500, color: COLORS.TEXT_PRIMARY }}>
                        {user?.name || "User"}
                      </p>
                      <p style={{ margin:0, fontSize:"11px", color: COLORS.TEXT_SECONDARY }}>
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>

                  <Link to="/profile" onClick={() => setDropdownOpen(false)}
                    style={{ display:"flex", alignItems:"center", gap:"10px", padding:"11px 16px", fontSize:"13px", color: COLORS.TEXT_PRIMARY, textDecoration:"none" }}>
                    Profile
                  </Link>

                  <Link to="/settings" onClick={() => setDropdownOpen(false)}
                    style={{ display:"flex", alignItems:"center", gap:"10px", padding:"11px 16px", fontSize:"13px", color: COLORS.TEXT_PRIMARY, textDecoration:"none" }}>
                    Settings
                  </Link>

                  <button onClick={handleLogout}
                    style={{
                      display:"flex", alignItems:"center", gap:"10px",
                      padding:"11px 16px", fontSize:"13px",
                      color: COLORS.ERROR,
                      background:"none", border:"none",
                      borderTop: `0.5px solid ${COLORS.BORDER}`,
                      width:"100%", cursor:"pointer",
                      marginTop:"4px", textAlign:"left",
                    }}>
                    Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <Link to="/login" style={{
                fontFamily: FONTS.BODY, fontSize:"13px",
                color: COLORS.CREAM, padding:"6px 16px",
                borderRadius:"6px",
                border: `1px solid rgba(243,229,216,0.4)`,
                textDecoration:"none",
              }}>
                Login
              </Link>
              <Link to="/register" style={{
                fontFamily: FONTS.BODY, fontSize:"13px",
                color: COLORS.TEXT_PRIMARY, padding:"6px 16px",
                borderRadius:"6px",
                background: COLORS.ACCENT,
                textDecoration:"none", fontWeight:500,
              }}>
                Register
              </Link>
            </div>
          )}
        </div>

        {/* CHANGE 1 — Hamburger ONLY on mobile */}
        <button
          className="nav-hamburger"
          onClick={() => setSheetOpen(true)}
          aria-label="Open menu"
          style={{
            background:"none", border:"none",
            cursor:"pointer", color: COLORS.CREAM,
            marginLeft:"12px", padding:"4px",
            alignItems:"center", justifyContent:"center",
            fontSize:"20px",
          }}
        >
          ☰
        </button>

      </nav>

      {/* ── MOBILE BOTTOM SHEET ── */}
      {sheetOpen && (
        <div onClick={() => setSheetOpen(false)} style={{
          position:"fixed", inset:0,
          background:"rgba(0,0,0,0.4)",
          zIndex:1200,
        }} />
      )}

      {sheetOpen && (
        <div style={{
          position:"fixed", bottom:0, left:0, right:0,
          background:"#FFFFFF",
          borderRadius:"20px 20px 0 0",
          zIndex:1300, overflow:"hidden",
        }}>
          <div style={{ width:"36px", height:"4px", background: COLORS.BORDER, borderRadius:"2px", margin:"12px auto 0" }} />

          {isAuthenticated ? (
            <>
              <div style={{
                display:"flex", alignItems:"center", gap:"12px",
                padding:"16px 20px",
                borderBottom: `0.5px solid ${COLORS.BORDER}`,
                background: COLORS.BACKGROUND,
              }}>
                <div style={{
                  width:"44px", height:"44px", borderRadius:"50%",
                  background: COLORS.ACCENT,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"16px", fontWeight:600, color: COLORS.TEXT_PRIMARY,
                }}>{initials}</div>
                <div>
                  <p style={{ margin:"0 0 2px", fontSize:"15px", fontWeight:500, color: COLORS.TEXT_PRIMARY }}>
                    {user?.name || "User"}
                  </p>
                  <p style={{ margin:0, fontSize:"12px", color: COLORS.TEXT_SECONDARY, textTransform:"capitalize" }}>
                    {user?.role || ""}
                  </p>
                </div>
              </div>

              {links.map((link) => (
                <Link key={link.path} to={link.path}
                  onClick={() => setSheetOpen(false)}
                  style={{
                    display:"flex", alignItems:"center",
                    padding:"15px 20px", fontSize:"14px",
                    color: COLORS.TEXT_PRIMARY,
                    borderBottom: `0.5px solid ${COLORS.BORDER}`,
                    textDecoration:"none",
                  }}>
                  {link.label}
                </Link>
              ))}

              <Link to="/profile" onClick={() => setSheetOpen(false)}
                style={{ display:"flex", alignItems:"center", padding:"15px 20px", fontSize:"14px", color: COLORS.TEXT_PRIMARY, borderBottom: `0.5px solid ${COLORS.BORDER}`, textDecoration:"none" }}>
                Profile
              </Link>

              <button onClick={handleLogout}
                style={{
                  display:"flex", alignItems:"center",
                  padding:"15px 20px", fontSize:"14px",
                  color: COLORS.ERROR,
                  background:"none", border:"none",
                  borderTop: `0.5px solid ${COLORS.BORDER}`,
                  width:"100%", cursor:"pointer", textAlign:"left",
                }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              {PUBLIC_LINKS.map((link) => (
                <Link key={link.path} to={link.path}
                  onClick={() => setSheetOpen(false)}
                  style={{
                    display:"flex", alignItems:"center",
                    padding:"15px 20px", fontSize:"14px",
                    color: COLORS.TEXT_PRIMARY,
                    borderBottom: `0.5px solid ${COLORS.BORDER}`,
                    textDecoration:"none",
                  }}>
                  {link.label}
                </Link>
              ))}
              <Link to="/login" onClick={() => setSheetOpen(false)}
                style={{
                  display:"flex", alignItems:"center",
                  padding:"15px 20px", fontSize:"14px",
                  color: COLORS.PRIMARY,
                  borderBottom: `0.5px solid ${COLORS.BORDER}`,
                  textDecoration:"none", fontWeight:500,
                }}>
                Login
              </Link>
              <Link to="/register" onClick={() => setSheetOpen(false)}
                style={{
                  display:"flex", alignItems:"center",
                  padding:"15px 20px", fontSize:"14px",
                  color: COLORS.ACCENT,
                  textDecoration:"none", fontWeight:500,
                }}>
                Register
              </Link>
            </>
          )}
          <div style={{ height:"24px" }} />
        </div>
      )}
    </>
  );
}
