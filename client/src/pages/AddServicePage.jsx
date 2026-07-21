import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  ConciergeBell,
  ArrowLeft,
  Save,
  CheckCircle,
} from "lucide-react";

import AsideBar from "../components/AsideBar";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";
import housekeepingApi from "../api/housekeepingApi";
import { getAllRooms } from "../api/roomApi";

function NewServicePage() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    room: "",
    service: "",
    priority: "Medium",
  });

  const [errors, setErrors] = useState({});

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoadingRooms(true);

        const response = await getAllRooms();

        let roomsData = [];

        if (Array.isArray(response)) {
          roomsData = response;
        } else if (Array.isArray(response?.data)) {
          roomsData = response.data;
        } else if (Array.isArray(response?.rooms)) {
          roomsData = response.rooms;
        } else if (Array.isArray(response?.data?.rooms)) {
          roomsData = response.data.rooms;
        }

        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Failed to load rooms");
        setRooms([]);
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.room) {
      newErrors.room = "Please select a room";
    }

    if (!formData.service.trim()) {
      newErrors.service = "Please enter a service request";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const serviceData = {
        room: formData.room,
        service: formData.service.trim(),
        priority: formData.priority,
      };

      console.log("Sending housekeeping request:", serviceData);

      const response =
        await housekeepingApi.createRequest(serviceData);

      console.log("Created request:", response);

      setSuccess(true);

      toast.success(
        "Housekeeping service request created successfully!"
      );

      setTimeout(() => {
        navigate("/services");
      }, 2000);
    } catch (error) {
      console.error(
        "Error creating housekeeping request:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        "Failed to create service request";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: COLORS.BACKGROUND,
        fontFamily: FONTS.BODY,
      }}
    >
      <AsideBar />

      <main
        style={{
          flex: 1,
          padding: "32px",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          className="mb-8 p-8"
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="p-4"
                style={{
                  backgroundColor: COLORS.ACCENT,
                  borderRadius: BORDER_RADIUS.LARGE,
                }}
              >
                <ConciergeBell
                  size={35}
                  style={{
                    color: COLORS.PRIMARY,
                  }}
                />
              </div>

              <div>
                <h1
                  className="text-4xl font-bold"
                  style={{
                    color: "#fff",
                    fontFamily: FONTS.HEADING,
                  }}
                >
                  New Service Request
                </h1>

                <p
                  className="mt-2"
                  style={{
                    color: COLORS.ACCENT,
                  }}
                >
                  Create a housekeeping service request for a room
                </p>
              </div>
            </div>

            <Link
              to="/services"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: COLORS.CREAM,
                fontSize: "13px",
                fontWeight: 600,
                padding: "10px 18px",
                borderRadius: BORDER_RADIUS.MEDIUM,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ArrowLeft size={18} />
              Back to Services
            </Link>
          </div>
        </div>

        {/* Success Message */}
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: COLORS.SURFACE,
              borderRadius: BORDER_RADIUS.LARGE,
              padding: "60px 40px",
              textAlign: "center",
              border: `1px solid ${COLORS.BORDER}`,
              boxShadow: SHADOWS.CARD,
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(46, 160, 67, 0.1)",
                border: `2px solid ${COLORS.SUCCESS}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <CheckCircle
                size={40}
                style={{
                  color: COLORS.SUCCESS,
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: FONTS.HEADING,
                fontSize: "28px",
                color: COLORS.TEXT_PRIMARY,
                fontWeight: 300,
              }}
            >
              Service Request Created!
            </h2>

            <p
              style={{
                color: COLORS.TEXT_SECONDARY,
                marginTop: "8px",
              }}
            >
              The housekeeping team has received the request.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: COLORS.SURFACE,
              borderRadius: BORDER_RADIUS.LARGE,
              padding: "32px",
              border: `1px solid ${COLORS.BORDER}`,
              boxShadow: SHADOWS.CARD,
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Room */}
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: COLORS.TEXT_PRIMARY,
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Select Room *
                  </label>

                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: `1px solid ${
                        errors.room
                          ? COLORS.ERROR
                          : COLORS.BORDER
                      }`,
                      borderRadius: BORDER_RADIUS.MEDIUM,
                      fontSize: "13px",
                      fontFamily: FONTS.BODY,
                      color: COLORS.TEXT_PRIMARY,
                      background: COLORS.BACKGROUND,
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="">
                      -- Select a room --
                    </option>

                    {loadingRooms ? (
                      <option disabled>
                        Loading rooms...
                      </option>
                    ) : rooms.length === 0 ? (
                      <option disabled>
                        No rooms found
                      </option>
                    ) : (
                      rooms.map((room) => (
                        <option
                          key={room._id}
                          value={room._id}
                        >
                          Room {room.roomNumber} - {room.type}
                        </option>
                      ))
                    )}
                  </select>

                  {errors.room && (
                    <p
                      style={{
                        fontSize: "11px",
                        color: COLORS.ERROR,
                        marginTop: "4px",
                      }}
                    >
                      {errors.room}
                    </p>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: COLORS.TEXT_PRIMARY,
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: `1px solid ${COLORS.BORDER}`,
                      borderRadius: BORDER_RADIUS.MEDIUM,
                      fontSize: "13px",
                      fontFamily: FONTS.BODY,
                      color: COLORS.TEXT_PRIMARY,
                      background: COLORS.BACKGROUND,
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>
                  </select>
                </div>

                {/* Service */}
                <div className="lg:col-span-2">
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: COLORS.TEXT_PRIMARY,
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Service Request *
                  </label>

                  <textarea
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Example: Room cleaning, fresh towels, laundry service, extra pillows..."
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: `1px solid ${
                        errors.service
                          ? COLORS.ERROR
                          : COLORS.BORDER
                      }`,
                      borderRadius: BORDER_RADIUS.MEDIUM,
                      fontSize: "13px",
                      fontFamily: FONTS.BODY,
                      color: COLORS.TEXT_PRIMARY,
                      background: COLORS.BACKGROUND,
                      resize: "vertical",
                      outline: "none",
                    }}
                  />

                  {errors.service && (
                    <p
                      style={{
                        fontSize: "11px",
                        color: COLORS.ERROR,
                        marginTop: "4px",
                      }}
                    >
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div
                style={{
                  marginTop: "28px",
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  borderTop: `1px solid ${COLORS.BORDER}`,
                  paddingTop: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={() => navigate("/services")}
                  style={{
                    padding: "10px 24px",
                    background: COLORS.BACKGROUND,
                    color: COLORS.TEXT_SECONDARY,
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: BORDER_RADIUS.PILL,
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || loadingRooms}
                  style={{
                    padding: "10px 32px",
                    background: loading
                      ? COLORS.TEXT_SECONDARY
                      : COLORS.PRIMARY,
                    color: COLORS.CREAM,
                    border: "none",
                    borderRadius: BORDER_RADIUS.PILL,
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <Save size={18} />

                  {loading
                    ? "Creating..."
                    : "Create Service Request"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default NewServicePage;