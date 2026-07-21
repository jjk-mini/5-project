import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";
import { submitContactForm } from "../api/contactApi";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  User,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ── ANIMATION ────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

// ── CONTACT INFO ─────────────────────────────────────────────
const CONTACT_ITEMS = [
  { icon: Phone, label: "Phone", value: "+92 300 0000000", sub: "Available 24/7" },
  { icon: Mail, label: "Email", value: "info@luxurystay.com", sub: "We reply within 24 hours" },
  { icon: MapPin, label: "Location", value: "Karachi, Pakistan", sub: "Visit us anytime" },
  { icon: Clock, label: "Hours", value: "24/7 Service", sub: "Always available" },
];

// ── SUBJECT OPTIONS ──────────────────────────────────────────
const SUBJECTS = [
  "General inquiry",
  "Room reservation",
  "Event booking",
  "Feedback",
  "Other",
];

// ── SOCIAL LINKS ──────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/",
    label: "Instagram",
    color: "#E4405F",
  },
  {
    icon: FaFacebookF,
    url: "https://www.facebook.com/",
    label: "Facebook",
    color: "#1877F2",
  },
  {
    icon: FaTwitter,
    url: "https://twitter.com/",
    label: "Twitter",
    color: "#1DA1F2",
  },
  {
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/",
    label: "LinkedIn",
    color: "#0A66C2",
  },
];

export default function ContactPage() {
  // ── STATE ────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: SUBJECTS[0],
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── HANDLE INPUT CHANGE ──────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // ── VALIDATE ─────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  // ── HANDLE SUBMIT ────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await submitContactForm(formData);
      setSubmitted(true);
    } catch (err) {
      setErrors({
        message: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ── SHARED STYLES ────────────────────────────────────────
  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "12px 16px",
    border: `2px solid ${hasError ? COLORS.ERROR : COLORS.BORDER}`,
    borderRadius: BORDER_RADIUS.MEDIUM,
    fontSize: "13px",
    color: COLORS.TEXT_PRIMARY,
    background: COLORS.BACKGROUND,
    fontFamily: FONTS.BODY,
    boxSizing: "border-box",
    outline: "none",
    transition: "all 0.3s ease",
  });

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 600,
    color: COLORS.TEXT_PRIMARY,
    display: "block",
    marginBottom: "6px",
    fontFamily: FONTS.BODY,
  };

  const errorStyle = {
    fontSize: "11px",
    color: COLORS.ERROR,
    margin: "4px 0 0",
    fontFamily: FONTS.BODY,
  };

  // ════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════
  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.BACKGROUND,
        padding: "60px 24px",
        fontFamily: FONTS.BODY,
      }}
    >
      {/* Page header */}
      <motion.div {...fadeUp} style={{ textAlign: "center", marginBottom: "48px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 16px",
            borderRadius: BORDER_RADIUS.PILL,
            background: `rgba(212, 168, 130, 0.1)`,
            border: `1px solid rgba(212, 168, 130, 0.15)`,
            marginBottom: "12px",
          }}
        >
          <Sparkles size={12} style={{ color: COLORS.ACCENT }} />
          <span
            style={{
              fontSize: "10px",
              color: COLORS.ACCENT,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            Get in touch
          </span>
        </div>
        <h1
          style={{
            fontFamily: FONTS.HEADING,
            fontSize: "clamp(32px, 4vw, 44px)",
            color: COLORS.TEXT_PRIMARY,
            margin: "0 0 10px",
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: COLORS.TEXT_SECONDARY,
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          Have a question or want to make a reservation? Reach out and our team will get back to you within 24 hours.
        </p>
      </motion.div>

      {/* Main card - Wider */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          maxWidth: "1050px",
          margin: "0 auto",
          borderRadius: BORDER_RADIUS.LARGE,
          overflow: "hidden",
          boxShadow: SHADOWS.CARD,
          border: `1px solid ${COLORS.BORDER}`,
        }}
      >
        {/* ── LEFT — Contact info ── */}
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY} 0%, #3B2D25 100%)`,
            padding: "48px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: `rgba(212, 168, 130, 0.05)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: `rgba(212, 168, 130, 0.05)`,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(212, 168, 130, 0.15)",
                border: "0.5px solid rgba(212, 168, 130, 0.2)",
                color: COLORS.ACCENT,
                fontSize: "10px",
                padding: "4px 12px",
                borderRadius: BORDER_RADIUS.PILL,
                marginBottom: "16px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                width: "fit-content",
                fontFamily: FONTS.BODY,
              }}
            >
              ✉ Get in touch
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: FONTS.HEADING,
                fontSize: "24px",
                color: "#f9f9f9",
                margin: "0 0 10px",
                lineHeight: 1.4,
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              We'd love to <br />
              <span style={{ color: COLORS.ACCENT }}>hear from you</span>
            </h2>

            <p
              style={{
                fontSize: "13px",
                color: "rgba(249,249,249,0.6)",
                margin: "0 0 32px",
                lineHeight: 1.8,
                fontFamily: FONTS.BODY,
              }}
            >
              Reach out to us and our dedicated team will ensure your every need is met with the utmost care and attention.
            </p>

            {/* Contact items */}
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "20px",
                    padding: "10px 14px",
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "rgba(212, 168, 130, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: `rgba(212, 168, 130, 0.15)`,
                      border: `1px solid rgba(212, 168, 130, 0.15)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} style={{ color: COLORS.ACCENT }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "rgba(249,249,249,0.4)",
                        margin: "0 0 2px",
                        fontFamily: FONTS.BODY,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "rgba(249,249,249,0.85)",
                        margin: 0,
                        fontFamily: FONTS.BODY,
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </p>
                    {item.sub && (
                      <p
                        style={{
                          fontSize: "10px",
                          color: "rgba(249,249,249,0.35)",
                          margin: "2px 0 0",
                          fontFamily: FONTS.BODY,
                        }}
                      >
                        {item.sub}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Social links */}
            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              {SOCIAL_LINKS.map(({ icon: Icon, url, label, color }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: `1px solid rgba(255,255,255,0.1)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = color + "33";
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT — Form (Wider) ── */}
        <div
          style={{
            background: COLORS.SURFACE,
            padding: "48px 44px",
          }}
        >
          {submitted ? (
            // Success message
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: `rgba(46, 160, 67, 0.1)`,
                  border: `2px solid ${COLORS.SUCCESS}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle size={32} style={{ color: COLORS.SUCCESS }} />
              </div>
              <h3
                style={{
                  fontFamily: FONTS.HEADING,
                  fontSize: "22px",
                  color: COLORS.TEXT_PRIMARY,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                Message sent!
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: COLORS.TEXT_SECONDARY,
                  margin: 0,
                  lineHeight: 1.7,
                  maxWidth: "280px",
                }}
              >
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    subject: SUBJECTS[0],
                    message: "",
                  });
                }}
                style={{
                  marginTop: "16px",
                  background: COLORS.PRIMARY,
                  border: "none",
                  borderRadius: BORDER_RADIUS.PILL,
                  padding: "10px 24px",
                  fontSize: "13px",
                  color: COLORS.CREAM,
                  cursor: "pointer",
                  fontFamily: FONTS.BODY,
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <>
              <div style={{ marginBottom: "24px" }}>
                <h2
                  style={{
                    fontFamily: FONTS.HEADING,
                    fontSize: "20px",
                    color: COLORS.TEXT_PRIMARY,
                    margin: "0 0 4px",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Send us a message
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: COLORS.TEXT_SECONDARY,
                    margin: 0,
                    fontFamily: FONTS.BODY,
                  }}
                >
                  Fill in the form below and we'll respond shortly
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* First + Last name */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Sara"
                      style={inputStyle(errors.firstName)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = COLORS.ACCENT;
                        e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212, 168, 130, 0.1)`;
                      }}
                      onBlur={(e) => {
                        if (!errors.firstName) {
                          e.currentTarget.style.borderColor = COLORS.BORDER;
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }}
                    />
                    {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Ahmed"
                      style={inputStyle(errors.lastName)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = COLORS.ACCENT;
                        e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212, 168, 130, 0.1)`;
                      }}
                      onBlur={(e) => {
                        if (!errors.lastName) {
                          e.currentTarget.style.borderColor = COLORS.BORDER;
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }}
                    />
                    {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sara@email.com"
                    style={inputStyle(errors.email)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = COLORS.ACCENT;
                      e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212, 168, 130, 0.1)`;
                    }}
                    onBlur={(e) => {
                      if (!errors.email) {
                        e.currentTarget.style.borderColor = COLORS.BORDER;
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  />
                  {errors.email && <p style={errorStyle}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>
                    Phone number{" "}
                    <span style={{ color: COLORS.TEXT_SECONDARY, fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 0000000"
                    style={inputStyle(false)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = COLORS.ACCENT;
                      e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212, 168, 130, 0.1)`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = COLORS.BORDER;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Subject */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{
                      ...inputStyle(false),
                      cursor: "pointer",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "40px",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = COLORS.ACCENT;
                      e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212, 168, 130, 0.1)`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = COLORS.BORDER;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={4}
                    style={{
                      ...inputStyle(errors.message),
                      resize: "vertical",
                      minHeight: "100px",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = COLORS.ACCENT;
                      e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212, 168, 130, 0.1)`;
                    }}
                    onBlur={(e) => {
                      if (!errors.message) {
                        e.currentTarget.style.borderColor = COLORS.BORDER;
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  />
                  {errors.message && <p style={errorStyle}>{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: loading ? COLORS.TEXT_SECONDARY : COLORS.PRIMARY,
                    color: COLORS.CREAM,
                    border: "none",
                    borderRadius: BORDER_RADIUS.PILL,
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: FONTS.BODY,
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = `0 4px 20px rgba(92,26,43,0.3)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}