import { useState } from "react";
import {
  Star,
  MessageSquare,
  User,
  CalendarDays,
} from "lucide-react";
import AsideBarGuest from "../components/AsidebarGuest";

function FeedbackPage() {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const reviews = [
    {
      id: 1,
      guest: "John Smith",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    if (comment.trim() === "") {
      alert("Please enter your feedback.");
      return;
    }

    alert("Thank you for your feedback!");

    setRating(0);
    setHover(0);
    setComment("");
  };

  return (
  <div className="min-h-screen bg-[#F5EFE7] flex">

    {/* Sidebar */}
    <AsideBarGuest />

    {/* Main Content */}
    <main className="flex-1 overflow-y-auto p-8">

      {/* Header */}
      <div className="bg-linear-to-r from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-8 flex flex-col lg:flex-row justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Guest Feedback
          </h1>

          <p className="text-[#F3D89B] mt-2 text-lg">
            Share your experience and help us improve.
          </p>

        </div>

      </div>

      {/* Everything below remains exactly the same */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Guest Form */}

        <div className="bg-white rounded-3xl shadow-xl border-l-8 border-[#D9B26F] p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare
              size={35}
              className="text-[#5C1A2B]"
            />

            <h2 className="text-3xl font-bold text-[#5C1A2B]">
              Leave Feedback
            </h2>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* Rating */}

            <div>

              <h3 className="text-lg font-semibold text-[#5C1A2B] mb-4">
                Rate Your Stay
              </h3>

              <div className="flex gap-3">

                {[1, 2, 3, 4, 5].map((star) => (

                  <Star
                    key={star}
                    size={42}
                    className={`cursor-pointer transition-all duration-200 ${
                      star <= (hover || rating)
                        ? "fill-[#D9B26F] text-[#D9B26F] scale-110"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                  />

                ))}

              </div>

            </div>

            {/* Comment */}

            <div>

              <label className="block text-lg font-semibold text-[#5C1A2B] mb-3">
                Your Feedback
              </label>

              <textarea
                rows="7"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-[#5C1A2B]"
              />

            </div>

            <button
              type="submit"
              className="bg-[#5C1A2B] hover:bg-[#7A2840] text-white px-8 py-4 rounded-xl shadow-lg font-semibold transition hover:scale-105"
            >
              Submit Feedback
            </button>

          </form>

        </div>

        {/* Admin Reviews */}

        <div className="bg-white rounded-3xl shadow-xl border-l-8 border-[#D9B26F] p-8">

          <h2 className="text-3xl font-bold text-[#5C1A2B] mb-8">
            Guest Reviews
          </h2>

          <div className="space-y-6">

            {reviews.map((review) => (

              <div
                key={review.id}
                className="bg-[#F5EFE7] rounded-2xl p-6 shadow-sm"
              >

                <div className="flex justify-between items-start">

                  <div className="flex items-center gap-4">

                    <div className="bg-[#5C1A2B] p-3 rounded-full">

                      <User
                        size={20}
                        className="text-[#D9B26F]"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold text-lg text-[#5C1A2B]">
                        {review.guest}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {review.room}
                      </p>

                    </div>

                  </div>

                  <div className="flex">

                    {[...Array(review.rating)].map((_, index) => (

                      <Star
                        key={index}
                        size={18}
                        className="fill-[#D9B26F] text-[#D9B26F]"
                      />

                    ))}

                  </div>

                </div>

                <p className="text-gray-600 mt-5 leading-7">
                  {review.comment}
                </p>

                <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">

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