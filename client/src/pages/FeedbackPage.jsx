import { useState } from "react";
import { addFeedback } from "../api/feedbackApi";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import {
  Star,
  MessageSquare,
  User,
  CalendarDays,
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
      });
      return;
    }

    if (comment.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please enter your feedback.",
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
      });
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: COLORS.BACKGROUND,
        fontFamily: FONTS.BODY,
      }}
    >
      <main className="flex-1 overflow-y-auto p-8">

        {/* Header */}

        <div
          className="mb-8 p-8"
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2F28)`,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
          }}
        >
          <h1
            className="text-4xl font-bold"
            style={{
              color: COLORS.CREAM,
              fontFamily: FONTS.HEADING,
            }}
          >
            Guest Feedback
          </h1>

          <p
            className="mt-3 text-lg"
            style={{
              color: COLORS.ACCENT,
            }}
          >
            Share your experience and help us improve our luxury hospitality.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left Card */}

          <div
            className="p-8"
            style={{
              background: COLORS.SURFACE,
              borderRadius: BORDER_RADIUS.LARGE,
              borderLeft: `8px solid ${COLORS.ACCENT}`,
              boxShadow: SHADOWS.CARD,
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare
                size={35}
                style={{ color: COLORS.PRIMARY }}
              />

              <h2
                className="text-3xl font-bold"
                style={{
                  color: COLORS.PRIMARY,
                  fontFamily: FONTS.HEADING,
                }}
              >
                Leave Feedback
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{
                    color: COLORS.TEXT_PRIMARY,
                  }}
                >
                  Rate Your Stay
                </h3>

                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={42}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(star)}
                      className="cursor-pointer transition-all duration-300 hover:scale-110"
                      style={{
                        fill:
                          star <= (hover || rating)
                            ? COLORS.ACCENT
                            : "transparent",
                        color:
                          star <= (hover || rating)
                            ? COLORS.ACCENT
                            : "#d1d5db",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="block mb-3 text-lg font-semibold"
                  style={{
                    color: COLORS.TEXT_PRIMARY,
                  }}
                >
                  Your Feedback
                </label>

                <textarea
                  rows="7"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="w-full p-4 outline-none transition"
                  style={{
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    border: `1px solid ${COLORS.BORDER}`,
                    color: COLORS.TEXT_PRIMARY,
                  }}
                />

                <button
                  type="submit"
                  className="mt-6 w-full py-4 text-white font-semibold transition hover:scale-[1.02]"
                  style={{
                    background: COLORS.PRIMARY,
                    borderRadius: BORDER_RADIUS.MEDIUM,
                    boxShadow: SHADOWS.CARD,
                  }}
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>

          {/* Reviews Card */}

          <div
            className="p-8"
            style={{
              background: COLORS.SURFACE,
              borderRadius: BORDER_RADIUS.LARGE,
              borderLeft: `8px solid ${COLORS.ACCENT}`,
              boxShadow: SHADOWS.CARD,
            }}
          >
            <h2
              className="text-3xl font-bold mb-8"
              style={{
                color: COLORS.PRIMARY,
                fontFamily: FONTS.HEADING,
              }}
            >
              Guest Reviews
            </h2>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6"
                  style={{
                    background: COLORS.CREAM,
                    borderRadius: BORDER_RADIUS.LARGE,
                    boxShadow: SHADOWS.CARD,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-full"
                        style={{
                          background: COLORS.PRIMARY,
                        }}
                      >
                        <User
                          size={20}
                          style={{
                            color: COLORS.ACCENT,
                          }}
                        />
                      </div>

                      <div>
                        <h3
                          className="text-lg font-bold"
                          style={{
                            color: COLORS.PRIMARY,
                            fontFamily: FONTS.HEADING,
                          }}
                        >
                          {review.guest}
                        </h3>

                        <p
                          className="text-sm"
                          style={{
                            color: COLORS.TEXT_SECONDARY,
                          }}
                        >
                          {review.room}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          style={{
                            fill: COLORS.ACCENT,
                            color: COLORS.ACCENT,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <p
                    className="mt-5 leading-7"
                    style={{
                      color: COLORS.TEXT_SECONDARY,
                    }}
                  >
                    {review.comment}
                  </p>

                  <div
                    className="flex items-center gap-2 mt-5 text-sm"
                    style={{
                      color: COLORS.MUTED,
                    }}
                  >
                    <CalendarDays size={16} />
                    {review.date}
                  </div>
                </div>
              ))}
            </div>

          </div>
          </div>
        </main>
        </div>
    
  );
}

export default FeedbackPage;