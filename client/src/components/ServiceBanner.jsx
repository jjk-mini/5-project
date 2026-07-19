const ServiceBanner = () => {
  return (
    <section
      className="relative h-[400px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-5">
        <h1 className="text-5xl font-bold text-white">
          LuxuryStay Services
        </h1>

        <p className="text-gray-200 max-w-2xl mt-5">
          Experience world-class hospitality with luxury rooms,
          fine dining, spa, swimming pool and many premium
          services designed to make your stay unforgettable.
        </p>
      </div>
    </section>
  );
};

export default ServiceBanner;