import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, ImagePlus, Pencil, Trash2, X } from "lucide-react";
import AsideBar from "../components/AsideBar";
import { serviceApi } from "../api/serviceApi";
import {
  COLORS,
  FONTS,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";

const CATEGORIES = [
  "Food & Drinks",
  "Laundry",
  "Spa & Wellness",
  "Housekeeping",
  "Room Service",
  "Transport",
];

const emptyForm = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  price: "",
  rating: 5,
  eta: "",
  status: "available",
  curated: false,
  image: null,
};

function ServiceCatalogPage() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState(null);

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await serviceApi.getAll();
      setServices(res.data || []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setImagePreview(null);
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setFormData({
      name: service.name || "",
      description: service.description || "",
      category: service.category || CATEGORIES[0],
      price: service.price ?? "",
      rating: service.rating ?? 5,
      eta: service.eta || "",
      status: service.status || "available",
      curated: !!service.curated,
      image: null,
    });
    setImagePreview(service.image || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service card? This can't be undone.")) return;
    try {
      await serviceApi.delete(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete service");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price) return;

    setSaving(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("rating", formData.rating);
      data.append("eta", formData.eta);
      data.append("status", formData.status);
      data.append("curated", formData.curated);
      if (formData.image) data.append("image", formData.image);

      if (editingId) {
        await serviceApi.update(editingId, data);
      } else {
        await serviceApi.create(data);
      }

      resetForm();
      loadServices();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    border: `1px solid ${COLORS.BORDER}`,
    borderRadius: BORDER_RADIUS.MEDIUM,
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: COLORS.BACKGROUND, fontFamily: FONTS.BODY }}
    >
      <AsideBar />

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
              onClick={() => navigate("/admin/services")}
              className="p-3"
              style={{ background: COLORS.ACCENT, color: COLORS.PRIMARY, borderRadius: BORDER_RADIUS.MEDIUM, border: "none", cursor: "pointer" }}
            >
              <ArrowLeft size={22} />
            </button>

            <div>
              <h1 className="text-4xl font-bold text-white" style={{ fontFamily: FONTS.HEADING }}>
                Service Catalog
              </h1>
              <p className="mt-2" style={{ color: COLORS.ACCENT }}>
                Add and manage the service cards guests order from.
              </p>
            </div>
          </div>
        </div>

        {/* Add / Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 mb-8"
          style={{ background: COLORS.SURFACE, borderRadius: BORDER_RADIUS.LARGE, boxShadow: SHADOWS.CARD }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.PRIMARY, fontFamily: FONTS.HEADING }}>
            {editingId ? "Edit Service" : "Add New Service"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Image</label>
              <label
                htmlFor="service-image"
                className="flex items-center justify-center h-36 cursor-pointer overflow-hidden"
                style={{ ...inputStyle, background: COLORS.BACKGROUND }}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm flex items-center gap-2" style={{ color: COLORS.TEXT_SECONDARY }}>
                    <ImagePlus size={18} /> Upload image
                  </span>
                )}
              </label>
              <input id="service-image" type="file" accept="image/*" onChange={handleImageChange} hidden />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Breakfast in Bed"
                required
                className="w-full px-4 py-3 outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 outline-none"
                style={inputStyle}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Price (PKR)</label>
              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">ETA</label>
              <input
                name="eta"
                value={formData.eta}
                onChange={handleChange}
                placeholder="e.g. 20 mins"
                className="w-full px-4 py-3 outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 outline-none"
                style={inputStyle}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 text-sm mt-6" style={{ color: COLORS.TEXT_SECONDARY }}>
                <input type="checkbox" name="curated" checked={formData.curated} onChange={handleChange} />
                Show in "Curated for You" carousel
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-4 py-3 outline-none resize-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 font-semibold"
                style={{ border: `1px solid ${COLORS.BORDER}`, borderRadius: BORDER_RADIUS.MEDIUM, color: COLORS.TEXT_PRIMARY, background: "transparent", cursor: "pointer" }}
              >
                Cancel Edit
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 text-white font-semibold"
              style={{ background: COLORS.PRIMARY, borderRadius: BORDER_RADIUS.MEDIUM, border: "none", opacity: saving ? 0.7 : 1, cursor: "pointer" }}
            >
              <Save size={18} />
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Service"}
            </button>
          </div>
        </form>

        {/* Existing services list */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.PRIMARY, fontFamily: FONTS.HEADING }}>
            Existing Services ({services.length})
          </h2>

          {loading && <p style={{ color: COLORS.TEXT_SECONDARY }}>Loading...</p>}

          {!loading && services.length === 0 && (
            <div className="text-center py-16" style={{ background: COLORS.SURFACE, borderRadius: BORDER_RADIUS.LARGE, boxShadow: SHADOWS.CARD }}>
              <p style={{ color: COLORS.TEXT_SECONDARY }}>No services added yet — use the form above.</p>
            </div>
          )}

          {!loading && services.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="overflow-hidden"
                  style={{ background: COLORS.SURFACE, borderRadius: BORDER_RADIUS.LARGE, boxShadow: SHADOWS.CARD, border: `1px solid ${COLORS.BORDER}` }}
                >
                  <div className="h-36 w-full" style={{ background: COLORS.BACKGROUND }}>
                    {service.image ? (
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImagePlus size={26} style={{ color: COLORS.TEXT_SECONDARY }} />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-lg" style={{ color: COLORS.TEXT_PRIMARY, fontFamily: FONTS.HEADING }}>
                        {service.name}
                      </h3>
                      <span
                        className="px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                        style={{
                          background: service.status === "available" ? "#EAF7F0" : "#FDECEC",
                          color: service.status === "available" ? COLORS.SUCCESS : COLORS.ERROR,
                        }}
                      >
                        {service.status === "available" ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    <p className="text-xs mt-1" style={{ color: COLORS.TEXT_SECONDARY }}>
                      {service.category}{service.curated ? " · Curated" : ""}
                    </p>

                    <p className="text-sm mt-2" style={{ color: COLORS.TEXT_SECONDARY }}>
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold" style={{ color: COLORS.PRIMARY }}>
                        PKR {Number(service.price || 0).toLocaleString()}
                      </span>
                      <span className="text-xs" style={{ color: COLORS.TEXT_SECONDARY }}>{service.eta}</span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(service)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium"
                        style={{ background: COLORS.PRIMARY, color: COLORS.CREAM, borderRadius: BORDER_RADIUS.MEDIUM, border: "none", cursor: "pointer" }}
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium"
                        style={{ background: COLORS.ERROR, color: "#fff", borderRadius: BORDER_RADIUS.MEDIUM, border: "none", cursor: "pointer" }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default ServiceCatalogPage;