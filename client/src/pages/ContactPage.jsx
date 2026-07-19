import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";
import { submitContactForm } from "../api/contactApi";

// ── ANIMATION ────────────────────────────────────────────────
const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  animate:     { opacity: 1, y: 0 },
  transition:  { duration: 0.4 },
};

// ── CONTACT INFO ─────────────────────────────────────────────
const CONTACT_ITEMS = [
  { icon: "📞", label: "Phone",    value: "+92 300 0000000" },
  { icon: "✉️", label: "Email",    value: "info@luxurystay.com" },
  { icon: "📍", label: "Location", value: "Karachi, Pakistan" },
  { icon: "🕐", label: "Hours",    value: "24/7 — always available" },
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

export default function ContactPage() {

  // ── STATE ────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    firstName:   "",
    lastName:    "",
    email:       "",
    phone:       "",
    subject:     SUBJECTS[0],
    message:     "",
  });

  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
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
    if (!formData.lastName.trim())  newErrors.lastName  = "Last name is required";
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
    // Simulate API call — connect to backend later
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
    width:        "100%",
    padding:      "9px 12px",
    border:       `0.5px solid ${hasError ? COLORS.ERROR : COLORS.BORDER}`,
    borderRadius: "7px",
    fontSize:     "13px",
    color:        COLORS.TEXT_BODY,
    background:   COLORS.BACKGROUND,
    fontFamily:   FONTS.BODY,
    boxSizing:    "border-box",
    outline:      "none",
  });

  const labelStyle = {
    fontSize:    "11px",
    fontWeight:  500,
    color:       COLORS.TEXT_BODY,
    display:     "block",
    marginBottom: "4px",
    fontFamily:  FONTS.BODY,
  };

  const errorStyle = {
    fontSize:   "11px",
    color:      COLORS.ERROR,
    margin:     "3px 0 0",
    fontFamily: FONTS.BODY,
  };

  const socialStyle = {
  color: "#fff",
  fontSize: "20px",
  transition: "0.3s",
  textDecoration: "none",
                  width:          "30px",
                height:         "30px",
                borderRadius:   "50%",
                border:         "0.5px solid rgba(249,249,249,0.2)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                fontSize:       "9px",
                fontWeight:     600,
                color:          "rgba(249,249,249,0.5)",
                cursor:         "pointer",
                fontFamily:     FONTS.BODY,
};

  // ════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: COLORS.BACKGROUND, padding: "60px 24px", fontFamily: FONTS.BODY }}>

      {/* Page header */}
      <motion.div {...fadeUp} style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "10px", color: COLORS.ACCENT, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <span style={{ width: "20px", height: "1px", background: COLORS.ACCENT, display: "inline-block" }} />
          Get in touch
          <span style={{ width: "20px", height: "1px", background: COLORS.ACCENT, display: "inline-block" }} />
        </p>
        <h1 style={{ fontFamily: FONTS.HEADING, fontSize: "32px", color: COLORS.DARK, margin: "0 0 10px", fontWeight: 600 }}>
          Contact Us
        </h1>
        <p style={{ fontSize: "13px", color: COLORS.TEXT_SECONDARY, maxWidth: "420px", margin: "0 auto", lineHeight: 1.8 }}>
          Have a question or want to make a reservation? Reach out and our team will get back to you within 24 hours.
        </p>
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display:      "grid",
          gridTemplateColumns: "1fr 1.3fr",
          maxWidth:     "920px",
          margin:       "0 auto",
          borderRadius: "16px",
          overflow:     "hidden",
          boxShadow:    SHADOWS.MODAL,
        }}
      >

        {/* ── LEFT — Contact info ── */}
        <div style={{
          background:     COLORS.PRIMARY,
          padding:        "48px 36px",
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "center",
        }}>

          {/* Tag */}
          <div style={{
            display:      "inline-flex",
            alignItems:   "center",
            gap:          "6px",
            background:   "rgba(190,152,116,0.2)",
            border:       "0.5px solid rgba(190,152,116,0.3)",
            color:        COLORS.SECONDARY,
            fontSize:     "10px",
            padding:      "4px 12px",
            borderRadius: BORDER_RADIUS.PILL,
            marginBottom: "16px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            width:        "fit-content",
            fontFamily:   FONTS.BODY,
          }}>
            ✉ Get in touch
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily:  FONTS.HEADING,
            fontSize:    "22px",
            color:       "#f9f9f9",
            margin:      "0 0 10px",
            lineHeight:  1.4,
          }}>
            We'd love to hear from you
          </h2>

          <p style={{
            fontSize:    "12px",
            color:       "rgba(249,249,249,0.55)",
            margin:      "0 0 32px",
            lineHeight:  1.8,
            fontFamily:  FONTS.BODY,
          }}>
            Reach out to us and our dedicated team will ensure your every need is met with the utmost care and attention.
          </p>

          {/* Contact items */}
          {CONTACT_ITEMS.map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
              <div style={{
                width:          "34px",
                height:         "34px",
                borderRadius:   "7px",
                background:     "rgba(173,108,38,0.2)",
                border:         "0.5px solid rgba(173,108,38,0.25)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                flexShrink:     0,
                fontSize:       "15px",
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{ fontSize: "10px", color: "rgba(249,249,249,0.4)", margin: "0 0 2px", fontFamily: FONTS.BODY }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "12px", color: "rgba(249,249,249,0.75)", margin: 0, fontFamily: FONTS.BODY }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}

          {/* Social links */}
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            {SOCIAL_LINKS.map(( { icon:Icon, url, label } ) => (
              <a key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={socialStyle}>
               <Icon/>
              </a>
            ))}
          </div>
        </div>


        {/* ── RIGHT — Form ── */}
        <div style={{ background: COLORS.SURFACE, padding: "48px 36px" }}>

          {submitted ? (
            // Success message
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", gap: "12px" }}
            >
              <div style={{
                width:          "60px",
                height:         "60px",
                borderRadius:   "50%",
                background:     "#E1F5EE",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                fontSize:       "26px",
                marginBottom:   "4px",
              }}>
                ✓
              </div>
              <h3 style={{ fontFamily: FONTS.HEADING, fontSize: "20px", color: COLORS.DARK, margin: 0 }}>
                Message sent!
              </h3>
              <p style={{ fontSize: "13px", color: COLORS.TEXT_SECONDARY, margin: 0, lineHeight: 1.7, maxWidth: "280px" }}>
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: SUBJECTS[0], message: "" }); }}
                style={{
                  marginTop:    "16px",
                  background:   "none",
                  border:       `0.5px solid ${COLORS.BORDER}`,
                  borderRadius: "10px",
                  padding:      "8px 20px",
                  fontSize:     "12px",
                  color:        COLORS.TEXT_SECONDARY,
                  cursor:       "pointer",
                  fontFamily:   FONTS.BODY,
                }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <>
              <h2 style={{ fontFamily: FONTS.HEADING, fontSize: "18px", color: COLORS.DARK, margin: "0 0 4px" }}>
                Send us a message
              </h2>
              <p style={{ fontSize: "12px", color: COLORS.TEXT_SECONDARY, margin: "0 0 24px", fontFamily: FONTS.BODY }}>
                Fill in the form below and we'll respond shortly
              </p>

              <form onSubmit={handleSubmit}>

                {/* First + Last name */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                  <div>
                    <label style={labelStyle}>First name</label>
                    <input
                      type="text" name="firstName"
                      value={formData.firstName} onChange={handleChange}
                      placeholder="Sara"
                      style={inputStyle(errors.firstName)}
                    />
                    {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Last name</label>
                    <input
                      type="text" name="lastName"
                      value={formData.lastName} onChange={handleChange}
                      placeholder="Ahmed"
                      style={inputStyle(errors.lastName)}
                    />
                    {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Email address</label>
                  <input
                    type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="sara@email.com"
                    style={inputStyle(errors.email)}
                  />
                  {errors.email && <p style={errorStyle}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>
                    Phone number{" "}
                    <span style={{ color: COLORS.TEXT_SECONDARY, fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="tel" name="phone"
                    value={formData.phone} onChange={handleChange}
                    placeholder="+92 300 0000000"
                    style={inputStyle(false)}
                  />
                </div>

                {/* Subject */}
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{ ...inputStyle(false), cursor: "pointer" }}
                  >
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
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
                    style={{ ...inputStyle(errors.message), resize: "none", height: "100px" }}
                  />
                  {errors.message && <p style={errorStyle}>{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width:        "100%",
                    padding:      "12px",
                    background:   loading ? COLORS.TEXT_SECONDARY : COLORS.PRIMARY,
                    color:        COLORS.CREAM,
                    border:       "none",
                    borderRadius: "7px",
                    fontSize:     "14px",
                    fontWeight:   500,
                    cursor:       loading ? "not-allowed" : "pointer",
                    fontFamily:   FONTS.BODY,
                    transition:   "background 0.15s",
                  }}
                >
                  {loading ? "Sending..." : "Send message"}
                </button>

              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

