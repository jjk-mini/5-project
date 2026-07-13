import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../constants/theme";
import logo from "../assets/logo.png";
import { HashLink } from "react-router-hash-link";



const HOTEL_LINKS = [
  { label: "About us",   path: "/#about" },
  { label: "Our rooms",  path: "/rooms" },
  { label: "Amenities",  path: "/amenities" },
  { label: "Gallery",    path: "/gallery" },
  { label: "Location",   path: "/location" },
];

const SERVICE_LINKS = [
  { label: "Room service",   path: "/services" },
  { label: "Housekeeping",   path: "/services" },
  { label: "Transportation", path: "/services" },
  { label: "Concierge",      path: "/services" },
  { label: "Events",         path: "/services" },
];

const CONTACT_INFO = [
  { icon: "📞", label: "+92 300 0000000" },
  { icon: "✉️", label: "info@luxurystay.com" },
  { icon: "📍", label: "Karachi, Pakistan" },
  { icon: "🕐", label: "24/7 Support" },
];

const SOCIAL_LINKS =[

  {
    icon: FaInstagram,
    url: "https://www.instagram.com/",
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    url: "https://www.facebook.com/",
    label: "Facebook",
  },
  {
    icon: FaTwitter,
    url: "https://twitter.com/",
    label: "Twitter",
  },
  {
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/",
    label: "LinkedIn",
  },
  
]

const LEGAL_LINKS = [
  { label: "Privacy policy",  path: "/PrivacyPolicy" },
  { label: "Terms of service", path: "/terms" },
  { label: "Cookie policy",   path: "/cookies" },
];


//  FOOTER COMPONENT 
export default function Footer() {
  return (
    <footer
      style={{
        background: COLORS.PRIMARY,   // #5C1A2B burgundy
        padding: "40px 24px 0",
        fontFamily: FONTS.BODY,
      }}
    >

      {/*  TOP SECTION*/}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",

          gap: "32px",
          paddingBottom: "32px",
          borderBottom: "0.5px solid rgba(243, 229, 216, 0.15)",
        }}
      >

        {/*  COLUMN 1:  */}
        <div>

          {/* Logo  */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>


            {logo ? (
              <img
                src={logo}
                alt="LuxuryStay Logo"
                style={{ height: "32px", width: "auto", objectFit: "contain" }}
              />
            ) : (

              <div style={{
                width: "30px", height: "30px",
                borderRadius: "7px",
                background: COLORS.ACCENT,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: FONTS.HEADING,
                fontSize: "14px", fontWeight: 700,
                color: COLORS.TEXT_PRIMARY,
              }}>L</div>
            )}

            <span style={{
              fontFamily: FONTS.HEADING,
              fontSize: "15px",
              color: COLORS.CREAM,
            }}>
              LuxuryStay
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: "12px",
            color: "rgba(243, 229, 216, 0.6)",
            lineHeight: 1.8,
            margin: "0 0 18px",
          }}>
            Experience unparalleled luxury and comfort at LuxuryStay Hospitality.
            Where every stay becomes an unforgettable memory.
          </p>

          {/* Social media  */}
          <div style={{ display: "flex", gap: "8px" }}>
            {SOCIAL_LINKS.map(({ icon:Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"        
                rel="noopener noreferrer"
               
                style={{
                  width: "33px", height: "33px",
                  borderRadius: "50%",
                  border: "0.5px solid rgba(243, 229, 216, 0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: COLORS.CREAM,
                  fontSize: "18px", fontWeight: 600,
                  textDecoration: "none",
                  opacity: 0.7,
                }}
              >
                <Icon/>


              </a>
            ))}
          </div>
        </div>


        {/*  COLUMN 2 */}
        <div>
          <p style={{
            fontSize: "11px",
            fontWeight: 500,
            color: COLORS.ACCENT,      
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: "0 0 14px",
          }}>
            Hotel
          </p>

          {/*  hotel links */}
          {HOTEL_LINKS.map((link) => (
            <HashLink
              key={link.path + link.label}
              to={link.path}
              style={{
                display: "block",
                fontSize: "12px",
                color: "rgba(243, 229, 216, 0.65)",
                marginBottom: "9px",
                textDecoration: "none",
              }}
            >
              {link.label}
            </HashLink>
          ))}
        </div>


        {/*  COLUMN 3 */}
        <div>
          <p style={{
            fontSize: "11px",
            fontWeight: 500,
            color: COLORS.ACCENT,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: "0 0 14px",
          }}>
            Services
          </p>

          {SERVICE_LINKS.map((link) => (
            <Link
              key={link.path + link.label}
              to={link.path}
              style={{
                display: "block",
                fontSize: "12px",
                color: "rgba(243, 229, 216, 0.65)",
                marginBottom: "9px",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>


        {/*  COLUMN 4 */}
        <div>
          <p style={{
            fontSize: "11px",
            fontWeight: 500,
            color: COLORS.ACCENT,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: "0 0 14px",
          }}>
            Contact
          </p>

          {CONTACT_INFO.map((item) => (
            <p
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                fontSize: "12px",
                color: "rgba(243, 229, 216, 0.65)",
                marginBottom: "9px",
              }}
            >
              <span style={{ fontSize: "13px" }}>{item.icon}</span>
              {item.label}
            </p>
          ))}
        </div>

      </div>
      {/* End of top grid */}


      {/*  BOTTOM BAR  */}
    
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        flexWrap: "wrap",   
        gap: "8px",
      }}>

        {/* Copyright */}
        <p style={{
          fontSize: "11px",
          color: "rgba(243, 229, 216, 0.4)",
          margin: 0,
        }}>
          © {new Date().getFullYear()} LuxuryStay Hospitality. All rights reserved.

        </p>

        {/* Legal links */}
        <div style={{ display: "flex", gap: "16px" }}>
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontSize: "11px",
                color: "rgba(243, 229, 216, 0.4)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

      </div>
    

    </footer>
  );
}

