import { toast } from "react-toastify";

const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl duration-300 p-8 text-center group"
    >
      <div className="w-20 h-20 mx-auto rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 duration-300">
        <Icon className="text-4xl text-primary-700" />
      </div>

      <h3 className="text-2xl font-bold mt-6">
        {service.title}
      </h3>

      <p className="text-gray-500 mt-3">
        {service.desc}
      </p>

      <button
        onClick={() =>
          toast.success(`${service.title}: ${service.desc}`)
        }
        className="mt-6 px-6 py-3 rounded-xl bg-primary-700 text-white hover:bg-primary-800 duration-300"
      >
        Learn More
      </button>
    </div>
  );
};

export default ServiceCard;