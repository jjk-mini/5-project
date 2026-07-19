import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";
import AsideBar from "../components/AsideBar";
import { createRoom } from "../api/roomApi";

import {
COLORS,
FONTS,
SHADOWS,
BORDER_RADIUS,
} from "../constants/theme";

function NewRoom() {
const navigate = useNavigate();
const [area, setArea] = useState("");
const [formData, setFormData] = useState({
roomNumber: "",
type: "",
floor: "",
area: "",
guests: "",
price: "",
status: "available",
description: "",
image: null,
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
const { name, value } = e.target;


setFormData((prev) => ({
  ...prev,
  [name]: value,
}));


};

const handleImageChange = (e) => {
setFormData((prev) => ({
...prev,
image: e.target.files[0],
}));
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const data = new FormData();

  data.append("roomNumber", formData.roomNumber);
  data.append("type", formData.type);
  data.append("floor", formData.floor);
  data.append("area", formData.area);
  data.append("guests", formData.guests);
  data.append("price", formData.price);
  data.append("status", formData.status);
  data.append("description", formData.description);

  if (formData.image) {
    data.append("image", formData.image);
  }

  await createRoom(data);

  alert("Room created successfully!");

  navigate("/admin/rooms");
} catch (error) {
  console.error(
    "Failed to create room:",
    error.response?.data || error
  );

  alert(
    error.response?.data?.message ||
      "Failed to create room"
  );
} finally {
  setLoading(false);
}


};

return (
<div
className="min-h-screen flex"
style={{
background: COLORS.BACKGROUND,
fontFamily: FONTS.BODY,
}}
> <AsideBar />

  <main className="flex-1 p-6">

    {/* Header */}
    <div
      className="p-8 mb-8"
      style={{
        background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
      }}
    >
      <div className="flex items-center gap-4">

        <button
          type="button"
          onClick={() => navigate("/admin/rooms")}
          className="p-3"
          style={{
            background: COLORS.ACCENT,
            color: COLORS.PRIMARY,
            borderRadius: BORDER_RADIUS.MEDIUM,
          }}
        >
          <ArrowLeft size={22} />
        </button>

        <div>
          <h1
            className="text-4xl font-bold text-white"
            style={{
              fontFamily: FONTS.HEADING,
            }}
          >
            Add New Room
          </h1>

          <p
            className="mt-2"
            style={{
              color: COLORS.ACCENT,
            }}
          >
            Add a new room to your hotel inventory.
          </p>
        </div>

      </div>
    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="p-8"
      style={{
        background: COLORS.SURFACE,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
      }}
    >

      <h2
        className="text-2xl font-bold mb-6"
        style={{
          color: COLORS.PRIMARY,
          fontFamily: FONTS.HEADING,
        }}
      >
        Room Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Room Number */}
        <div>
          <label className="block mb-2 font-semibold">
            Room Number
          </label>

          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Example: 101"
            required
            className="w-full px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
            }}
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="block mb-2 font-semibold">
            Room Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
            }}
          >
            <option value="">
              Select Room Type
            </option>

            <option value="Standard">
              Standard
            </option>

            <option value="Deluxe">
              Deluxe
            </option>

            <option value="Suite">
              Suite
            </option>

            <option value="Executive">
              Executive
            </option>

            <option value="Presidential">
              Presidential
            </option>
          </select>
        </div>

        {/* Floor */}
        <div>
          <label className="block mb-2 font-semibold">
            Floor
          </label>

          <input
            type="number"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            placeholder="Example: 1"
            required
            className="w-full px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
            }}
          />
        </div>

        {/* Area */}
        <div>
          <label className="block mb-2 font-semibold">
            Area
          </label>

          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Example: 450 sq ft"
            className="w-full px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
            }}
          />
        </div>

        {/* Guests */}
        <div>
          <label className="block mb-2 font-semibold">
            Maximum Guests
          </label>

          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            placeholder="Example: 2"
            required
            min="1"
            className="w-full px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
            }}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold">
            Price Per Night
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Example: 25000"
            required
            min="0"
            className="w-full px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
            }}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-semibold">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
            }}
          >
            <option value="available">
              Available
            </option>

            <option value="occupied">
              Occupied
            </option>

            <option value="reserved">
              Reserved
            </option>

            <option value="cleaning">
              Cleaning
            </option>

            <option value="maintenance">
              Maintenance
            </option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-semibold">
            Room Image
          </label>

          <div className="relative">

            <ImagePlus
              size={20}
              className="absolute left-3 top-3.5"
              style={{
                color: COLORS.TEXT_SECONDARY,
              }}
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full pl-10 pr-4 py-3 outline-none"
              style={{
                border: `1px solid ${COLORS.BORDER}`,
                borderRadius: BORDER_RADIUS.MEDIUM,
              }}
            />

          </div>

          {formData.image && (
            <p className="text-sm mt-2">
              Selected: {formData.image.name}
            </p>
          )}
        </div>

      </div>

      {/* Description */}
      <div className="mt-6">

        <label className="block mb-2 font-semibold">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Describe the room..."
          className="w-full px-4 py-3 outline-none resize-none"
          style={{
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: BORDER_RADIUS.MEDIUM,
          }}
        />

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">

        <button
          type="button"
          onClick={() => navigate("/admin/rooms")}
          className="px-6 py-3 font-semibold"
          style={{
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: BORDER_RADIUS.MEDIUM,
            color: COLORS.TEXT_PRIMARY,
          }}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 text-white font-semibold"
          style={{
            background: COLORS.PRIMARY,
            borderRadius: BORDER_RADIUS.MEDIUM,
            opacity: loading ? 0.7 : 1,
          }}
        >
          <Save size={18} />

          {loading
            ? "Saving..."
            : "Save Room"}
        </button>

      </div>

    </form>

  </main>
</div>

);
}

export default NewRoom;
