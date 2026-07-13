import {
  COLORS,
  FONTS,
  BORDER_RADIUS,
  SHADOWS,
} from "../constants/theme";

export default function CookiesPolicy() {
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
          Cookies Policy
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
          title="What Are Cookies?"
          text="Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, improve website performance, and provide a better browsing experience."
        />

        <Section
          title="How We Use Cookies"
          text="LuxuryStay Hospitality uses cookies to maintain secure user sessions, remember your preferences, improve website functionality, analyze visitor traffic, and enhance your overall experience."
        />

        <Section
          title="Types of Cookies We Use"
          text="We use essential cookies required for the website to function, performance cookies to analyze usage, functional cookies to remember your preferences, and analytics cookies to help improve our services."
        />

        <Section
          title="Third-Party Cookies"
          text="Some cookies may be placed by trusted third-party providers, such as payment processors or analytics services. These providers may collect limited information in accordance with their own privacy policies."
        />

        <Section
          title="Managing Cookies"
          text="Most web browsers allow you to control, block, or delete cookies through their settings. Please note that disabling essential cookies may affect certain features of our website."
        />

        <Section
          title="Changes to This Policy"
          text="We may update this Cookies Policy from time to time to reflect changes in technology, legal requirements, or our business practices. The latest version will always be available on this page."
        />

        <Section
          title="Contact Us"
          text="If you have any questions regarding our use of cookies or this policy, please contact LuxuryStay Hospitality through our Contact Us page."
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