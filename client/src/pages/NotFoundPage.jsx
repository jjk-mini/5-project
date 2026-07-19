import { useEffect } from "react";
import Swal from "sweetalert2";
import {
  COLORS,
  FONTS,
} from "../constants/theme";

const NotFoundPage = () => {
  useEffect(() => {
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.BACKGROUND}, ${COLORS.CREAM}, #EFE8DE)`,
        fontFamily: FONTS.BODY,
      }}
    >
      {/* Background Circles */}

      <div
        className="absolute top-20 left-20 w-24 h-24 rounded-full animate-ping"
        style={{
          background: "rgba(200,169,106,0.15)",
        }}
      ></div>

      <div
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full animate-pulse"
        style={{
          background: "rgba(31,26,23,0.08)",
        }}
      ></div>

      <div
        className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full animate-bounce"
        style={{
          background: "rgba(200,169,106,0.18)",
        }}
      ></div>

      <div
        className="absolute bottom-1/4 left-1/4 w-20 h-20 rounded-full animate-pulse"
        style={{
          background: "rgba(31,26,23,0.08)",
        }}
      ></div>

      <div className="text-center z-10 px-6">

        <h1
          className="text-9xl md:text-[10rem] font-extrabold animate-bounce"
          style={{
            color: COLORS.PRIMARY,
            fontFamily: FONTS.HEADING,
          }}
        >
          404
        </h1>

        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            color: COLORS.TEXT_PRIMARY,
            fontFamily: FONTS.HEADING,
          }}
        >
          Oops! Page Not Found
        </h2>

        <p
          className="text-lg max-w-lg mx-auto mb-8"
          style={{
            color: COLORS.TEXT_SECONDARY,
          }}
        >
          The page you are trying to access may have been moved, deleted, or never existed.
        </p>

      </div>
    </div>
  );
};

export default NotFoundPage;