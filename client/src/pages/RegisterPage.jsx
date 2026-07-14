import { color } from "framer-motion";
import { ROLES } from "../constants/roles";

import useAuth from "../hooks/useAuth";
import {  useNavigate } from 'react-router-dom';
import { useState } from "react";
import { authApi } from "../api/authApi";


import logo from "../assets/logo.png";
import { COLORS, FONTS } from "../constants/theme";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";




const getDashboardPath = (role) =>{
    switch (role){
        case ROLES.ADMIN:
            case ROLES.MANAGER:
                return "/admin/dashboard";
                case ROLES.RECEPTIONIST:
                return "/receptionist/dashboard"
                case ROLES.HOUSEKEEPING:
                    return "houseKepping/dashboard"
                    case ROLES.GUEST:
                        default:
                            return "guest/dashboard"
    }
}

// password checker
const getPasswordStrength = (password)=>{
if (!password) return 0;
let score = 0 ;
if (password.length >=8) score++;

if (/[A-Z]/.test(password)&& /[0-9]/.test(password)) score++

if (/[^A-Za-z0-9]/.test(password)) score++

return score

}
const STRENGTH_CONFIG = {
    0: {color:COLORS.BORDER, lable: ""},
    1: {color: COLORS.ERROR, lable:"weak"},
    2: {color: COLORS.WARNING, lable:"Medium"},
    3:{color:COLORS.SUCCESS, lable:"Strong"},
}

export default function RegisterPage(){
    const { login } = useAuth()
    const  navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName:"",
        lastName: "",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false)
    const strength = getPasswordStrength(formData.password)
    const strengthConfig = STRENGTH_CONFIG[strength]

    const handleChange =(e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value})

        if (errors[e.target.name]){
            setErrors({ ...errors, [e.target.name]: ""})
        }
    }

// validate form
 const validate =()=>{
    const newErrors ={}
//    names
    if (!formData.firstName.trim())  newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "last name is required";

    // email 
    if(!formData.email){
        newErrors.email = "Email is required"
    }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email address"
    }     
    
//   password 
if (!formData.password) {
    newErrors.password = "password is required"
}else if (formData.password.length < 8) {
    newErrors.password ="password must cbe at least 8 characters"
}

// connfirmpassword
if (!formData.confirmPassword) {
    newErrors.confirmPassword = "please confirm your passsword"

}else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "passwords do not match"
}
 return newErrors
 }

 const handleSubmit = async (e) =>{
    e.preventDefault()

    const validationErrors = validate()
     if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return;
     }
     setLoading(true)
     try {
        const res = await authApi.register({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
        })

        login(res.data.user, res.data.token)

        navigate(getDashboardPath(res.data.user.role))
     } catch (err) {
        setErrors({
            general: err.response?.data?.message || "Registration failed. Try again.",
        })
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
 
   const errorStyle = {
     fontSize: "11px",
     color: COLORS.ERROR,
     margin: "3px 0 0",
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
 
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4 }}
         style={{
           display: "flex",
           width: "100%",
           maxWidth: "900px",
           borderRadius: "16px",
           overflow: "hidden",
           boxShadow: "0 4px 32px rgba(92, 26, 43, 0.1)",
         }}
       >
 
         {/* ── LEFT PANEL ── */}
         <div style={{
           background: COLORS.PRIMARY,
           width: "42%",
           padding: "48px 36px",
           display: "flex",
           flexDirection: "column",
           justifyContent: "center",
         }}>
 
           <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px" }}>
             {logo
               ? <img src={logo} alt="LuxuryStay" style={{ height: "30px", width: "auto" }} />
               : <div style={{ width:"30px",height:"30px",borderRadius:"7px",background:COLORS.ACCENT,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:FONTS.HEADING,fontSize:"15px",fontWeight:700,color:COLORS.TEXT_PRIMARY }}>L</div>
             }
             <span style={{ fontFamily: FONTS.HEADING, fontSize: "15px", color: COLORS.CREAM }}>LuxuryStay</span>
           </div>
 
           <h1 style={{ fontFamily: FONTS.HEADING, fontSize: "22px", color: COLORS.CREAM, margin: "0 0 12px", lineHeight: 1.3 }}>
             Join LuxuryStay Hospitality
           </h1>
 
           <p style={{ fontSize: "12px", color: "rgba(243,229,216,0.6)", margin: "0 0 36px", lineHeight: 1.8, fontFamily: FONTS.BODY }}>
             Create your account to get started with our hotel management platform.
           </p>
 
           {[
             "Manage all hotel operations",
             "Track bookings and billing",
             "Role-based access control",
           ].map((f) => (
             <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
               <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.ACCENT, flexShrink: 0 }} />
               <span style={{ fontSize: "12px", color: "rgba(243,229,216,0.75)", fontFamily: FONTS.BODY }}>{f}</span>
             </div>
           ))}
         </div>
 
 
         {/* ── RIGHT PANEL (Form) ── */}
         <div style={{
           flex: 1,
           background: "#FFFFFF",
           padding: "40px 36px",
           display: "flex",
           flexDirection: "column",
           justifyContent: "center",
           overflowY: "auto",
           // overflowY: "auto" → scrollable if content is too tall
         }}>
 
           <h2 style={{ fontFamily: FONTS.HEADING, fontSize: "20px", color: COLORS.PRIMARY, margin: "0 0 4px" }}>
             Create account
           </h2>
           <p style={{ fontSize: "12px", color: COLORS.TEXT_SECONDARY, margin: "0 0 24px", fontFamily: FONTS.BODY }}>
             Fill in your details to register
           </p>
 
           {/* General error */}
           {errors.general && (
             <p style={{ ...errorStyle, marginBottom: "12px" }}>{errors.general}</p>
           )}
 
           <form onSubmit={handleSubmit}>
 
             {/* First + Last name (two columns) */}
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
               <div>
                 <label style={labelStyle}>First name</label>
                 <input
                   type="text"
                   name="firstName"
                   value={formData.firstName}
                   onChange={handleChange}
                   placeholder="Sara"
                   style={inputStyle}
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
                   style={inputStyle}
                 />
                 {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
               </div>
             </div>
 
             {/* Email */}
             <div style={{ marginBottom: "14px" }}>
               <label style={labelStyle}>Email address</label>
               <input
                 type="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 placeholder="sara@luxurystay.com"
                 style={inputStyle}
               />
               {errors.email && <p style={errorStyle}>{errors.email}</p>}
             </div>
 
             {/* Password */}
             <div style={{ marginBottom: "14px" }}>
               <label style={labelStyle}>Password</label>
               <input
                 type="password"
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                 placeholder="Min. 8 characters"
                 style={inputStyle}
                 autoComplete="new-password"
               />
 
               {/* Password strength bars */}
               {formData.password && (
                 <>
                   <div style={{ display: "flex", gap: "4px", marginTop: "6px" }}>
                     {[1, 2, 3].map((level) => (
                       <div key={level} style={{
                         flex: 1, height: "3px", borderRadius: "2px",
                         background: strength >= level ? strengthConfig.color : COLORS.BORDER,
                         transition: "background 0.3s",
                       }} />
                     ))}
                   </div>
                   <p style={{ fontSize: "10px", color: strengthConfig.color, margin: "3px 0 0", fontFamily: FONTS.BODY }}>
                     {strengthConfig.label}
                   </p>
                 </>
               )}
 
               {errors.password && <p style={errorStyle}>{errors.password}</p>}
             </div>
 
             {/* Confirm password */}
             <div style={{ marginBottom: "20px" }}>
               <label style={labelStyle}>Confirm password</label>
               <input
                 type="password"
                 name="confirmPassword"
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 placeholder="••••••••"
                 style={inputStyle}
                 autoComplete="new-password"
               />
               {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
             </div>
 
             {/* Submit */}
             <button
               type="submit"
               disabled={loading}
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
               }}
             >
               {loading ? "Creating account..." : "Create account"}
             </button>
 
           </form>
 
           <p style={{ textAlign: "center", fontSize: "12px", color: COLORS.TEXT_SECONDARY, marginTop: "16px", fontFamily: FONTS.BODY }}>
             Already have an account?{" "}
             <Link to="/login" style={{ color: COLORS.PRIMARY, fontWeight: 500, textDecoration: "none" }}>
               Sign in
             </Link>
           </p>
 
         </div>
       </motion.div>
     </div>
   );
 }
 
