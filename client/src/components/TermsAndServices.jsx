import {
  COLORS,
  FONTS,
  BORDER_RADIUS,
  SHADOWS,
} from "../constants/theme";

export default function TermsAndServices() {
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
          Terms & Conditions
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
          title="Acceptance of Terms"
          text="By accessing or using LuxuryStay Hospitality's website and services, you agree to comply with these Terms & Conditions. If you do not agree with these terms, please discontinue using our services."
        />

        <Section
          title="Reservations"
          text="All reservations are subject to room availability and confirmation. Guests are responsible for providing accurate personal and payment information during the booking process."
        />

        <Section
          title="Payments"
          text="Payment may be required at the time of booking or upon check-in, depending on the selected rate. Additional charges for room service, damages, or other services may be applied before checkout."
        />

        <Section
          title="Cancellation & Refund Policy"
          text="Cancellation and refund eligibility depend on the selected booking policy. Late cancellations or failure to check in may result in cancellation charges or forfeiture of the booking amount."
        />

        <Section
          title="Check-In & Check-Out"
          text="Guests must present valid identification during check-in. Standard check-in and check-out times are determined by the hotel and may vary depending on availability."
        />

        <Section
          title="Guest Responsibilities"
          text="Guests agree to respect hotel property, staff, and other guests. Any damage caused intentionally or through negligence may result in additional charges."
        />

        <Section
          title="Prohibited Activities"
          text="Illegal activities, disruptive behavior, smoking in non-smoking areas, unauthorized parties, and actions that endanger the safety of others are strictly prohibited."
        />

        <Section
          title="Limitation of Liability"
          text="LuxuryStay Hospitality is not responsible for loss, theft, or damage to personal belongings unless required by applicable law. Guests are encouraged to use in-room safes where available."
        />

        <Section
          title="Changes to These Terms"
          text="We reserve the right to update these Terms & Conditions at any time. Changes become effective once published on this page."
        />

        <Section
          title="Contact Us"
          text="If you have any questions regarding these Terms & Conditions, please contact our customer support team through the Contact Us page."
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