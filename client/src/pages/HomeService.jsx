import ServiceBanner from "../components/ServiceBanner";
import ServiceCard from "../components/ServiceCard";
import services from "../data/homeservices";

import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Services = () => {
  return (
    <>
      <ToastContainer position="top-right" />

      <ServiceBanner />

      <section className="py-24  text-primary-300">

        <div className="max-w-7xl mx-auto px-5">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[5px] text-primary-700 font-semibold">
              Premium Services
            </p>

            <h2 className="text-5xl  text-primary-700 font-bold mt-4">
              Explore Our Luxury Services
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto mt-5">
              LuxuryStay provides exceptional comfort and
              personalized services to ensure every guest enjoys
              a memorable experience.
            </p>

          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}

          </div>

        </div>

      </section>
    </>
  );
};

export default Services;