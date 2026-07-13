import React, { useState, useEffect } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaRegCreditCard,
} from "react-icons/fa";
import { COLORS } from "../constants/theme";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
const PaymentForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    country: "Pakistan",
  });

  const [errors, setErrors] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const [status, setStatus] = useState(null); // "success" or "cancel"
  const [showPopup, setShowPopup] = useState(false);

  // helper: validate single field and set error message
  const validateField = (name, value) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const maxYearsAhead = 5;

    switch (name) {
      case "email": {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(value) ? "" : "Invalid email format.";
      }
      case "cardNumber": {
        const digits = value.replace(/\s/g, "");
        if (digits.length === 0) return "Card number required.";
        if (!/^\d+$/.test(digits)) return "Card number must contain only digits.";
        if (digits.length !== 16) return "Card number must be 16 digits.";
        return "";
      }
      case "expiry": {
        if (!value) return "Expiry required.";
        if (!/^\d{2}\/\d{2}$/.test(value)) return "Expiry must be MM/YY.";
        const [mmStr, yyStr] = value.split("/");
        const month = parseInt(mmStr, 10);
        const year = 2000 + parseInt(yyStr, 10);
        if (isNaN(month) || month < 1 || month > 12) return "Month must be 01–12.";
        // past check
        const currentMonth = now.getMonth() + 1;
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          return "Card has expired.";
        }
        if (year > currentYear + maxYearsAhead) {
          return `Expiry too far in future (max ${maxYearsAhead} years).`;
        }
        return "";
      }
      case "cvc": {
        if (!value) return "CVC required.";
        if (!/^\d{3,4}$/.test(value)) return "CVC must be 3 or 4 digits.";
        return "";
      }
      case "name": {
        if (!value || value.trim().length < 2) return "Name must have at least 2 letters.";
        if (!/^[A-Za-z\s'-]+$/.test(value.trim())) return "Name can only contain letters, spaces, - or '.";
        return "";
      }
      default:
        return "";
    }
  };

  // handle input changes with formatting rules
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").substring(0, 16);
      value = value.replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "cvc") {
      value = value.replace(/\D/g, "").substring(0, 4);
    }

    if (name === "expiry") {
      // keep only digits, auto-insert slash after 2 digits
      const digits = value.replace(/\D/g, "").substring(0, 4);
      if (digits.length <= 2) value = digits;
      else value = digits.substring(0, 2) + "/" + digits.substring(2);
    }

    if (name === "name") {
      value = value.replace(/[^A-Za-z\s'-]/g, "").substring(0, 50);
    }

    setFormData((s) => ({ ...s, [name]: value }));

    // real-time validate this field
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // validate all before submit, collect reasons
  const validateAll = () => {
    const newErrors = {};
    Object.keys(errors).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    // return boolean
    return Object.values(newErrors).every((v) => v === "");
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const ok = validateAll();

  if (ok) {
    setStatus("success");

    // Form Clear
    setFormData({
      email: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      name: "",
      country: "Pakistan",
    });

    // Errors bhi clear
    setErrors({
      email: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      name: "",
    });

  } else {
    setStatus("cancel");
  }

  setShowPopup(true);
};

  // build combined reason string for popup when cancelled
  const getCancelReasons = () => {
    const msgs = Object.entries(errors)
      .filter(([k, v]) => v)
      .map(([k, v]) => v);
    // if errors state not yet updated (rare), run validateField fallback
    if (msgs.length === 0) {
      const fallback = Object.keys(errors)
        .map((k) => validateField(k, formData[k]))
        .filter(Boolean);
      return fallback.join(" ");
    }
    return msgs.join(" ");
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border p-6 lg:p-8"
        style={{
          backgroundColor: COLORS.SURFACE,
          borderColor: COLORS.BORDER,
          boxShadow: COLORS.CARD,
        }}
        noValidate
      >
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={(e) => setErrors((p) => ({ ...p, email: validateField("email", formData.email) }))}
            className="w-full h-11 px-3 border rounded-md outline-none"
            style={{ borderColor: errors.email ? "#f87171" : COLORS.BORDER, color: COLORS.TEXT_PRIMARY }}
          />
          {errors.email && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.email}</p>}
        </div>

        <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.PRIMARY }}>
          Payment Method
        </h2>

        {/* Card Number */}
        <div className="relative mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 1234 1234 1234"
            value={formData.cardNumber}
            onChange={handleChange}
            onBlur={() => setErrors((p) => ({ ...p, cardNumber: validateField("cardNumber", formData.cardNumber) }))}
            className="w-full h-11 border rounded-md px-3 pr-32 outline-none"
            style={{ borderColor: errors.cardNumber ? "#f87171" : COLORS.BORDER, color: COLORS.TEXT_PRIMARY }}
          />
          <div className="absolute right-3 top-9.5 flex items-center gap-1 text-xl">
            <FaCcVisa className="text-blue-700" />
            <FaCcMastercard className="text-red-600" />
            <FaCcAmex className="text-sky-500" />
            <FaCcDiscover className="text-orange-500" />
          </div>
          {errors.cardNumber && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.cardNumber}</p>}
        </div>

        {/* Expiry + CVC */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
              Expiry (MM/YY)
            </label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
              onBlur={() => setErrors((p) => ({ ...p, expiry: validateField("expiry", formData.expiry) }))}
              className="h-11 border rounded-md px-3 outline-none w-full"
              style={{ borderColor: errors.expiry ? "#f87171" : COLORS.BORDER, color: COLORS.TEXT_PRIMARY }}
            />
            {errors.expiry && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.expiry}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
              CVC
            </label>
            <div className="relative">
              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                value={formData.cvc}
                onChange={handleChange}
                onBlur={() => setErrors((p) => ({ ...p, cvc: validateField("cvc", formData.cvc) }))}
                className="w-full h-11 border rounded-md px-3 pr-10 outline-none"
                style={{ borderColor: errors.cvc ? "#f87171" : COLORS.BORDER, color: COLORS.TEXT_PRIMARY }}
              />
              <FaRegCreditCard
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: COLORS.TEXT_SECONDARY }}
              />
            </div>
            {errors.cvc && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.cvc}</p>}
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
            Cardholder Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full name on card"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => setErrors((p) => ({ ...p, name: validateField("name", formData.name) }))}
            className="w-full h-11 border rounded-md px-3 outline-none"
            style={{ borderColor: errors.name ? "#f87171" : COLORS.BORDER, color: COLORS.TEXT_PRIMARY }}
          />
          {errors.name && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.name}</p>}
        </div>

        {/* Country */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.TEXT_PRIMARY }}>
            Country or Region
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={(e) => setFormData((s) => ({ ...s, country: e.target.value }))}
            className="w-full h-11 border rounded-md px-3 outline-none"
            style={{ borderColor: COLORS.BORDER, color: COLORS.TEXT_PRIMARY }}
          >
            <option>Pakistan</option>
            <option>United States</option>
          </select>
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          className="w-full text-white font-semibold py-3 rounded-md transition duration-300"
          style={{ backgroundColor: COLORS.PRIMARY }}
        >
          Pay
        </button>
      </form>

    {showPopup && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 180,
      }}
      className="bg-white w-90 rounded-3xl shadow-2xl p-8 text-center"
    >

      {status === "success" ? (
        <>
          <div className="flex justify-center">
            <FaCheckCircle
              size={90}
              className="text-green-500 animate-bounce"
            />
          </div>

          <h2 className="text-3xl font-bold mt-5 text-gray-800">
            Payment Successful
          </h2>

          <p className="text-gray-500 mt-3 leading-6">
            Your payment has been processed successfully.
            Thank you for your booking.
          </p>

          <button
            onClick={() => setShowPopup(false)}
            className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Done
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <FaTimesCircle
              size={90}
              className="text-red-500 animate-pulse"
            />
          </div>

          <h2 className="text-3xl font-bold mt-5 text-gray-800">
            Payment Failed
          </h2>

          <p className="text-gray-500 mt-3 leading-6">
            {getCancelReasons()}
          </p>

          <button
            onClick={() => setShowPopup(false)}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Try Again
          </button>
        </>
      )}

    </motion.div>

  </div>
)}
    </div>
  );
};

export default PaymentForm;
