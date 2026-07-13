import {
  COLORS,
  FONTS,
  BORDER_RADIUS,
  SHADOWS,
} from "../constants/theme";

export default function PrivacyPolicy() {
  return (
    <div
      style={{
        background: COLORS.BACKGROUND,
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: FONTS.BODY,
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: COLORS.SURFACE,
          padding: "45px",
          borderRadius: BORDER_RADIUS.LARGE,
          boxShadow: SHADOWS.CARD,
          border: `1px solid ${COLORS.BORDER}`,
        }}
      >
        <h1
          style={{
            color: COLORS.PRIMARY,
            fontFamily: FONTS.HEADING,
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Privacy Policy
        </h1>

        <p
          style={{
            color: COLORS.TEXT_SECONDARY,
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Last Updated: July 3, 2026
        </p>

        <Section
          title="Introduction"
          text="LuxuryStay Hospitality values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our hotel management platform and website."
        />

        <Section
          title="Information We Collect"
          text="We may collect your name, email address, phone number, booking details, payment information, identification documents where required, and any information you voluntarily provide when making reservations or contacting us."
        />

        <Section
          title="How We Use Your Information"
          text="Your information is used to process reservations, manage hotel services, communicate with you, improve our services, ensure security, comply with legal obligations, and provide customer support."
        />

        <Section
          title="Cookies"
          text="Our website uses cookies and similar technologies to improve your browsing experience, remember your preferences, and analyze website traffic."
        />

        <Section
          title="Data Security"
          text="We implement appropriate administrative, technical, and physical security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction."
        />

        <Section
          title="Third-Party Services"
          text="We may use trusted third-party providers for payment processing, analytics, and email communication. These providers are required to protect your information according to applicable privacy standards."
        />

        <Section
          title="Your Rights"
          text="You may request access to your personal information, update inaccurate information, request deletion where permitted by law, or withdraw consent for certain processing activities."
        />

        <Section
          title="Contact Us"
          text="If you have any questions regarding this Privacy Policy or your personal information, please contact LuxuryStay Hospitality through our Contact Us page or customer support."
        />
      </div>
    </div>
  );
}

function Section({ title, text }) {
  return (
    <div style={{ marginBottom: "35px" }}>
      <h2
        style={{
          color: COLORS.PRIMARY,
          fontFamily: FONTS.HEADING,
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: COLORS.TEXT_PRIMARY,
          lineHeight: "1.8",
          fontSize: "16px",
        }}
      >
        {text}
      </p>
    </div>
  );
}