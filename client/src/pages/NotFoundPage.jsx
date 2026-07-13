import { useEffect } from "react";
import Swal from "sweetalert2";

const NotFoundPage = () => {
  useEffect(() => {
    Swal.fire({
      icon: "error",
      title: "404 Error",
      text: "The page you are looking for does not exist!",
      confirmButtonText: "OK",
      confirmButtonColor: "#5C1A2B",
      background: "#ffffff",
      backdrop: `
        rgba(0,0,0,0.5)
      `,
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-[#F8F5F2] via-[#F3E8EA] to-[#E8EEF5]">
   
      <div className="absolute top-20 left-20 w-24 h-24 bg-[#5C1A2B]/10 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#5C1A2B]/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#5C1A2B]/10 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-[#5C1A2B]/10 rounded-full animate-pulse"></div>
      <div className="text-center z-10 px-6">
        
        <h1 className="text-9xl md:text-[10rem] font-extrabold text-[#5C1A2B] animate-bounce"> 404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 text-lg max-w-lg mx-auto mb-8">The page you are trying to access may have been moved, deleted, or never existed.</p>

      </div>
    </div>
  );
};

export default NotFoundPage;