import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { COLORS, FONTS } from "../constants/theme";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ROLES } from "../constants/roles";
import logo from "../assets/logo.png";
import { authApi } from "../api/authApi";




const getDashboardPath = (role) => {
  switch (role) {
    case ROLES.ADMIN:
    case ROLES.MANAGER:
      return "/admin/dashboard";
    case ROLES.RECEPTIONIST:
      return "/receptionist/dashboard";
    case ROLES.HOUSEKEEPING:
      return "/housekeeping/dashboard";
    case ROLES.GUEST:
      return "/";
    default:
      return "/";
  }
};

export default function LoginPage(){
    // const {login, isAuthenticated} = useAuth() uncomment after backend
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate()

    const [formData, setFormData] = useState(
        {
            email:"",
            password: ""
        }
    )

    const [error, setError] = useState("")

const [loading, setLoading] = useState(false)

if (isAuthenticated) {
    navigate(getDashboardPath(user?.role))
    return null;
}

const handleChange = (e)=>{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,

  })
  setError("")
}

const handleSubmit = async (e)=>{
    e.preventDefault()

    if (!formData.email || !formData.password) {
        setError("please fill in all fields")
        return
    }
setLoading(true)
setError("")


try {
    const res = await authApi.login(formData)

    login(res.data.user, res.data.token)

    navigate(getDashboardPath(res.data.user.role))
} catch (err) {
    setError(
        err.response?.data?.message || "incorrect email or passsword"
    )
}finally{
    setLoading(false)
}





}

 const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    border: `0.5px solid ${COLORS.BORDER}`,
    borderRadius: "7px",
    fontSize: "13px",
    color: COLORS.TEXT_PRIMARY,
    background: "#FFFFFF",
    fontFamily: FONTS.BODY,
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 500,
    color: COLORS.TEXT_PRIMARY,
    display: "block",
    marginBottom: "5px",
    fontFamily: FONTS.BODY,
  };


  // ════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════
  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.BACKGROUND,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>

      {/* Animated wrapper — fades in when page loads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "860px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 32px rgba(92, 26, 43, 0.1)",
        }}
      >

        {/* ── LEFT PANEL (Burgundy) ── */}
        <div style={{
          background: COLORS.PRIMARY,
          width: "45%",
          padding: "48px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px" }}>
            {logo
              ? <img src={logo} alt="LuxuryStay" style={{ height: "30px", width: "auto" }} />
              : <div style={{ width:"30px",height:"30px",borderRadius:"7px",background:COLORS.ACCENT,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:FONTS.HEADING,fontSize:"15px",fontWeight:700,color:COLORS.TEXT_PRIMARY }}>L</div>
            }
            <span style={{ fontFamily: FONTS.HEADING, fontSize: "15px", color: COLORS.CREAM }}>
              LuxuryStay
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: FONTS.HEADING,
            fontSize: "22px",
            color: COLORS.CREAM,
            margin: "0 0 12px",
            lineHeight: 1.3,
          }}>
            Welcome back to LuxuryStay
          </h1>

          <p style={{
            fontSize: "12px",
            color: "rgba(243, 229, 216, 0.6)",
            margin: "0 0 36px",
            lineHeight: 1.8,
            fontFamily: FONTS.BODY,
          }}>
            Sign in to manage bookings, rooms, and guest experiences all in one place.
          </p>

          {/* Feature list */}
          {[
            "Real-time room management",
            "Instant booking confirmations",
            "24/7 guest support tools",
          ].map((feature) => (
            <div key={feature} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.ACCENT, flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "rgba(243, 229, 216, 0.75)", fontFamily: FONTS.BODY }}>
                {feature}
              </span>
            </div>
          ))}
        </div>


        {/* ── RIGHT PANEL (Form) ── */}
        <div style={{
          flex: 1,
          background: "#FFFFFF",
          padding: "48px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>

          <h2 style={{
            fontFamily: FONTS.HEADING,
            fontSize: "20px",
            color: COLORS.PRIMARY,
            margin: "0 0 4px",
          }}>
            Sign in
          </h2>
          <p style={{ fontSize: "12px", color: COLORS.TEXT_SECONDARY, margin: "0 0 28px", fontFamily: FONTS.BODY }}>
            Enter your credentials to access your dashboard
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Email address</label>
              <input
                type="email"
                name="email"
                // name must match the key in formData state
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@luxurystay.com"
                style={inputStyle}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "8px" }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={inputStyle}
                autoComplete="current-password"
              />
            </div>

            {/* Error message */}
            {error && (
              <p style={{
                fontSize: "12px",
                color: COLORS.ERROR,
                margin: "0 0 12px",
                fontFamily: FONTS.BODY,
              }}>
                {error}
              </p>
            )}
            {/* The { error && (...) } pattern means: */}
            {/* only show this if error is not empty */}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              // disabled → can't click while loading
              style={{
                width: "100%",
                padding: "11px",
                background: loading ? COLORS.TEXT_SECONDARY : COLORS.PRIMARY,
                color: COLORS.CREAM,
                border: "none",
                borderRadius: "7px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: FONTS.BODY,
                marginTop: "8px",
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
              {/* Show different text while loading */}
            </button>

          </form>

          {/* Link to register */}
          <p style={{
            textAlign: "center",
            fontSize: "12px",
            color: COLORS.TEXT_SECONDARY,
            marginTop: "20px",
            fontFamily: FONTS.BODY,
          }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: COLORS.PRIMARY, fontWeight: 500, textDecoration: "none" }}>
              Register
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}
