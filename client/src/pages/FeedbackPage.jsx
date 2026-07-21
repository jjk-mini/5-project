import { useState } from "react";
import { addFeedback } from "../api/feedbackApi";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import {
  Star,
  MessageSquare,
  User,
  CalendarDays,
  Sparkles,
  Quote,
  Heart,
  Send,
} from "lucide-react";

import {
  COLORS,
  FONTS,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";

function FeedbackPage() {
  const { user } = useAuth();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const reviews = [
    {
      id: 1,
      guest: "John Doe",
      room: "Deluxe Suite",
      rating: 5,
      comment:
        "Amazing experience! The room was spotless and the staff were incredibly friendly.",
      date: "15 July 2026",
    },
    {
      id: 2,
      guest: "Sarah Johnson",
      room: "Executive Room",
      rating: 4,
      comment:
        "Loved the breakfast buffet. The spa service was excellent too.",
      date: "13 July 2026",
    },
    {
      id: 3,
      guest: "Michael Lee",
      room: "Presidential Suite",
      rating: 5,
      comment:
        "One of the finest hotels I've stayed at. Highly recommended!",
      date: "10 July 2026",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Rating Required",
        text: "Please select a rating.",
        confirmButtonColor: COLORS.PRIMARY,
      });
      return;
    }

    if (comment.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please enter your feedback.",
        confirmButtonColor: COLORS.PRIMARY,
      });
      return;
    }

    try {
      await addFeedback({
        guestName: user.name,
        guestId: user._id,
        rating,
        comment,
        room: "Guest Room",
      });

      setRating(0);
      setHover(0);
      setComment("");

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your feedback has been submitted successfully.",
        confirmButtonColor: COLORS.PRIMARY,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to submit feedback.",
        confirmButtonColor: COLORS.PRIMARY,
      });
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "15px 17px",
    borderRadius: BORDER_RADIUS.MEDIUM,
    border: `1px solid ${COLORS.BORDER}`,
    background: COLORS.BACKGROUND,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: FONTS.BODY,
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: COLORS.BACKGROUND,
        padding: "60px 24px 80px",
        fontFamily: FONTS.BODY,
      }}
    >
      {/* PAGE HEADER */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 16px",
            borderRadius: BORDER_RADIUS.PILL,
            background: "rgba(200, 169, 106, 0.12)",
            border: `1px solid rgba(200, 169, 106, 0.3)`,
            color: COLORS.ACCENT,
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "18px",
          }}
        >
          <Sparkles size={14} />
          Your experience matters
        </div>

        <h1
          style={{
            margin: "0 0 14px",
            color: COLORS.TEXT_PRIMARY,
            fontFamily: FONTS.HEADING,
            fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
          }}
        >
          Guest Feedback
        </h1>

        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            color: COLORS.TEXT_SECONDARY,
            fontSize: "15px",
            lineHeight: 1.8,
          }}
        >
          Your thoughts help us create more memorable stays and deliver the
          exceptional hospitality you deserve.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          gap: "28px",
          alignItems: "stretch",
        }}
      >
        {/* LEFT — FEEDBACK FORM */}
        <div
          style={{
            background: COLORS.SURFACE,
            borderRadius: BORDER_RADIUS.LARGE,
            border: `1px solid ${COLORS.BORDER}`,
            boxShadow: SHADOWS.CARD,
            overflow: "hidden",
          }}
        >
          {/* FORM HEADER */}
          <div
            style={{
              background: COLORS.PRIMARY,
              padding: "34px 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "1px solid rgba(200,169,106,0.15)",
                right: "-70px",
                top: "-80px",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: "rgba(200, 169, 106, 0.15)",
                  border: "1px solid rgba(200, 169, 106, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <MessageSquare
                  size={22}
                  color={COLORS.ACCENT}
                />
              </div>

              <h2
                style={{
                  margin: "0 0 8px",
                  color: COLORS.CREAM,
                  fontFamily: FONTS.HEADING,
                  fontSize: "30px",
                  fontWeight: 400,
                }}
              >
                Share your experience
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "rgba(248,246,243,0.65)",
                  fontSize: "13px",
                  lineHeight: 1.7,
                }}
              >
                Tell us about your stay at LuxuryStay. Every review helps us
                improve our service.
              </p>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "32px",
            }}
          >
            {/* USER INFO */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px",
                marginBottom: "30px",
                borderRadius: BORDER_RADIUS.MEDIUM,
                background: COLORS.BACKGROUND,
                border: `1px solid ${COLORS.BORDER}`,
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: COLORS.PRIMARY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User
                  size={19}
                  color={COLORS.ACCENT}
                />
              </div>

              <div>
                <p
                  style={{
                    margin: "0 0 3px",
                    color: COLORS.TEXT_PRIMARY,
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {user?.name || "Guest"}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: COLORS.TEXT_SECONDARY,
                    fontSize: "12px",
                  }}
                >
                  Sharing your personal experience
                </p>
              </div>
            </div>

            {/* RATING */}
            <div style={{ marginBottom: "30px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "12px",
                  color: COLORS.TEXT_PRIMARY,
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                How was your stay?
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = star <= (hover || rating);

                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(star)}
                      aria-label={`${star} star rating`}
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: "3px",
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                        transform: isActive
                          ? "scale(1.12)"
                          : "scale(1)",
                      }}
                    >
                      <Star
                        size={36}
                        strokeWidth={1.5}
                        style={{
                          fill: isActive
                            ? COLORS.ACCENT
                            : "transparent",
                          color: isActive
                            ? COLORS.ACCENT
                            : COLORS.MUTED,
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              <p
                style={{
                  margin: "10px 0 0",
                  color: COLORS.TEXT_SECONDARY,
                  fontSize: "12px",
                }}
              >
                {rating === 0
                  ? "Select a rating from 1 to 5 stars"
                  : `${rating} out of 5 stars selected`}
              </p>
            </div>

            {/* COMMENT */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  color: COLORS.TEXT_PRIMARY,
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Your feedback
              </label>

              <textarea
                rows="7"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.ACCENT;
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(200,169,106,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = COLORS.BORDER;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "9px",
                padding: "14px 20px",
                border: "none",
                borderRadius: BORDER_RADIUS.PILL,
                background: COLORS.PRIMARY,
                color: COLORS.CREAM,
                fontFamily: FONTS.BODY,
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.DARK;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(31,26,23,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.PRIMARY;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Submit Feedback
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* RIGHT — REVIEWS */}
        <div
          style={{
            background: COLORS.SURFACE,
            borderRadius: BORDER_RADIUS.LARGE,
            border: `1px solid ${COLORS.BORDER}`,
            boxShadow: SHADOWS.CARD,
            padding: "32px",
          }}
        >
          {/* REVIEWS HEADER */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "20px",
              marginBottom: "28px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  marginBottom: "9px",
                }}
              >
                <Quote
                  size={18}
                  color={COLORS.ACCENT}
                />

                <span
                  style={{
                    color: COLORS.ACCENT,
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Guest stories
                </span>
              </div>

              <h2
                style={{
                  margin: 0,
                  color: COLORS.TEXT_PRIMARY,
                  fontFamily: FONTS.HEADING,
                  fontSize: "32px",
                  fontWeight: 400,
                }}
              >
                Guest Reviews
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 13px",
                borderRadius: BORDER_RADIUS.PILL,
                background: "rgba(200,169,106,0.1)",
                color: COLORS.ACCENT,
                fontSize: "12px",
                whiteSpace: "nowrap",
              }}
            >
              <Heart
                size={14}
                fill={COLORS.ACCENT}
              />
              Loved by guests
            </div>
          </div>

          {/* REVIEW CARDS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {reviews.map((review) => (
              <article
                key={review.id}
                style={{
                  padding: "22px",
                  borderRadius: BORDER_RADIUS.LARGE,
                  background: COLORS.BACKGROUND,
                  border: `1px solid ${COLORS.BORDER}`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = SHADOWS.CARD;
                  e.currentTarget.style.borderColor =
                    "rgba(200,169,106,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = COLORS.BORDER;
                }}
              >
                {/* REVIEW TOP */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        background: COLORS.PRIMARY,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <User
                        size={18}
                        color={COLORS.ACCENT}
                      />
                    </div>

                    <div>
                      <h3
                        style={{
                          margin: "0 0 3px",
                          color: COLORS.TEXT_PRIMARY,
                          fontFamily: FONTS.HEADING,
                          fontSize: "18px",
                          fontWeight: 500,
                        }}
                      >
                        {review.guest}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          color: COLORS.TEXT_SECONDARY,
                          fontSize: "12px",
                        }}
                      >
                        {review.room}
                      </p>
                    </div>
                  </div>

                  {/* STARS */}
                  <div
                    style={{
                      display: "flex",
                      gap: "2px",
                    }}
                  >
                    {[...Array(review.rating)].map((_, index) => (
                      <Star
                        key={index}
                        size={15}
                        strokeWidth={1.5}
                        style={{
                          fill: COLORS.ACCENT,
                          color: COLORS.ACCENT,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* REVIEW TEXT */}
                <p
                  style={{
                    margin: "18px 0",
                    color: COLORS.TEXT_SECONDARY,
                    fontSize: "13px",
                    lineHeight: 1.8,
                  }}
                >
                  “{review.comment}”
                </p>

                {/* REVIEW DATE */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    paddingTop: "13px",
                    borderTop: `1px solid ${COLORS.BORDER}`,
                    color: COLORS.MUTED,
                    fontSize: "11px",
                  }}
                >
                  <CalendarDays size={14} />
                  {review.date}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM MESSAGE */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "30px auto 0",
          padding: "24px",
          borderRadius: BORDER_RADIUS.LARGE,
          background: COLORS.PRIMARY,
          textAlign: "center",
          boxShadow: SHADOWS.CARD,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "rgba(248,246,243,0.75)",
            fontSize: "13px",
            lineHeight: 1.7,
          }}
        >
          Thank you for choosing{" "}
          <span
            style={{
              color: COLORS.ACCENT,
              fontFamily: FONTS.HEADING,
              fontSize: "17px",
            }}
          >
            LuxuryStay
          </span>
          . Your feedback helps us continue creating exceptional experiences.
        </p>
      </section>

      {/* RESPONSIVE STYLE */}
      <style>
        {`
          @media (max-width: 900px) {
            section[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            main {
              padding: 40px 16px 60px !important;
            }

            section[style*="padding: 32px"] {
              padding: 24px !important;
            }

            h1 {
              font-size: 38px !important;
            }
          }
        `}
      </style>
    </main>
  );
}

export default FeedbackPage;