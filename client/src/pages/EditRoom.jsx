import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";

import {
  getRoomById,
  updateRoom,
} from "../api/roomApi";

import {
  COLORS,
  FONTS,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";
import AsideBar from "../components/AsideBar";

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  // =========================
  // LOAD EXISTING ROOM
  // =========================
  useEffect(() => {
    const loadRoom = async () => {
      try {
        const response = await getRoomById(id);

        const room = response.room;

        setFormData({
          roomNumber: room.roomNumber || "",
          type: room.type || "",
          floor: room.floor || "",
          area: room.area || "",
          guests: room.guests || "",
          price: room.price || "",
          status: room.status || "available",
          description: room.description || "",
          image: null,
        });
      } catch (error) {
        console.error(
          "Failed to load room:",
          error.response?.data || error
        );

        alert("Failed to load room");

        navigate("/admin/rooms");
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id, navigate]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE IMAGE
  // =========================
  const handleImageChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      image: e.target.files[0],
    }));
  };

  // =========================
  // UPDATE ROOM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

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

      await updateRoom(id, data);

      alert("Room updated successfully!");

      navigate("/admin/rooms");
    } catch (error) {
      console.error(
        "Failed to update room:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update room"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading room...
      </div>
    );
  }

 return (

  <div className="min-h-screen flex bg-[#FAF6F1]">

{/* SIDEBAR */}
<AsideBar />

{/* MAIN CONTENT */}
<main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8">

  {/* HEADER */}
  <div
    className="p-5 sm:p-6 lg:p-8 mb-6 lg:mb-8"
    style={{
      background: `linear-gradient(
        135deg,
        ${COLORS.PRIMARY},
        #3B2D25
      )`,
      borderRadius: BORDER_RADIUS.LARGE,
      boxShadow: SHADOWS.CARD,
    }}
  >
    <div className="flex items-center gap-4">

      <button
        type="button"
        onClick={() => navigate("/admin/rooms")}
        className="p-3 shrink-0"
        style={{
          background: COLORS.ACCENT,
          color: COLORS.PRIMARY,
          borderRadius: BORDER_RADIUS.MEDIUM,
        }}
      >
        <ArrowLeft size={22} />
      </button>

      <div className="min-w-0">
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
          style={{
            fontFamily: FONTS.HEADING,
          }}
        >
          Edit Room
        </h1>

        <p
          className="mt-2 text-sm sm:text-base"
          style={{
            color: COLORS.ACCENT,
          }}
        >
          Update room information and details.
        </p>
      </div>

    </div>
  </div>

  {/* FORM */}
  <form
    onSubmit={handleSubmit}
    className="p-5 sm:p-6 lg:p-8"
    style={{
      background: COLORS.SURFACE,
      borderRadius: BORDER_RADIUS.LARGE,
      boxShadow: SHADOWS.CARD,
    }}
  >

    <h2
      className="text-xl sm:text-2xl font-bold mb-6"
      style={{
        color: COLORS.PRIMARY,
        fontFamily: FONTS.HEADING,
      }}
    >
      Room Information
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">

      {/* KEEP ALL YOUR EXISTING INPUT FIELDS HERE EXACTLY AS THEY ARE */}

    </div>

    {/* KEEP YOUR DESCRIPTION EXACTLY AS IT IS */}

    {/* BUTTONS */}
    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-8">

      <button
        type="button"
        onClick={() => navigate("/admin/rooms")}
        className="px-6 py-3 font-semibold w-full sm:w-auto"
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
        disabled={saving}
        className="flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold w-full sm:w-auto"
        style={{
          background: COLORS.PRIMARY,
          borderRadius: BORDER_RADIUS.MEDIUM,
          opacity: saving ? 0.7 : 1,
        }}
      >
        <Save size={18} />

        {saving
          ? "Updating..."
          : "Update Room"}
      </button>

    </div>

  </form>

</main>

  </div>
);

  
}

export default EditRoom;