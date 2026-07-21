import AsideBar from "../components/AsideBar";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Pencil,
  Trash2,
  Users,
  Mail,
  BadgeCheck,
  LayoutDashboard,
  ChevronDown,
  UserCog,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff as removeStaff,
} from "../api/staffApi";
import Swal from 'sweetalert2'
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";

const API_URL = "http://localhost:5000/api/staff";

function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);


  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Receptionist",
  });


  const dashboardOptions = [
    { label: "Admin Dashboard", path: "/" },
    { label: "Housekeeping Dashboard", path: "/housekeeping-dashboard" },
    { label: "Staff Management Dashboard", path: "/staff-management" },
  ];

  // Fetch staff from the database on mount
  const fetchStaff = async () => {
    try {
      setLoading(true);

      const res = await getStaff();

      setStaff(res);
      setError("");

    } catch (err) {
      setError("Failed to fetch staff.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const addStaff = async () => {
    if (!form.name || !form.email) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editId !== null) {
        // Update staff
        await updateStaff(editId, form);
        setEditId(null);
      } else {
        // Add new staff — backend creates a real login account and
        // returns a one-time temporary password
        const created = await createStaff(form);

        if (created?.tempPassword) {
          await Swal.fire({
            title: "Staff account created",
            html: `<p style="margin-bottom:8px">Share these login details with <b>${created.name}</b>:</p>
                   <p>Email: <b>${created.email}</b></p>
                   <p>Temporary password: <b>${created.tempPassword}</b></p>
                   <p style="font-size:12px;color:#888;margin-top:8px">This password is shown only once and cannot be retrieved again.</p>`,
            icon: "success",
            confirmButtonColor: "#5C1A2B",
          });
        }
      }

      // Clear form
      setForm({
        name: "",
        email: "",
        role: "Receptionist",
      });

      // Refresh staff list
      fetchStaff();

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message || "Something went wrong."
      );
    }
  };

  const editStaff = (member) => {
    setForm({
      name: member.name,
      email: member.email,
      role: member.role
        ? member.role.charAt(0).toUpperCase() + member.role.slice(1)
        : "Receptionist",
    });
    setEditId(member._id);
  };

  const deleteStaff = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5C1A2B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await removeStaff(id);

      await Swal.fire({
        title: "Deleted!",
        text: "Staff member has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#5C1A2B",
      });

      fetchStaff();

    } catch (err) {
      console.error(err);

      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to delete staff.",
        icon: "error",
        confirmButtonColor: "#5C1A2B",
      });
    }
  };

  return (
    <>
      {/* start Component */}
      <div style={{ background: COLORS.BACKGROUND, fontFamily: FONTS.BODY }}
        className="flex min-h-screen">

        <AsideBar />
        {/* component */}
        <div className="flex-1 p-4 md:p-8">

          {/* Header */}

          <div
            className="mb-8 p-8"
            style={{
              background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
              borderRadius: BORDER_RADIUS.LARGE,
              boxShadow: SHADOWS.CARD,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="p-4"
                style={{
                  backgroundColor: COLORS.ACCENT,
                  borderRadius: BORDER_RADIUS.LARGE,
                }}
              >
                <UserCog
                  size={35}
                  style={{ color: COLORS.PRIMARY }}
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
                  Staff Management
                </h1>

                <p
                  className="mt-2"
                  style={{
                    color: COLORS.ACCENT,
                    fontFamily: FONTS.BODY,
                  }}
                >
                  Manage your hotel staff, assign roles, and keep your team organized.
                </p>
              </div>
            </div>
          </div>

          {/* Add Staff Form */}

          <div className="p-6 md:p-8"
            style={{
              background: COLORS.SURFACE,
              borderTop: `4px solid ${COLORS.PRIMARY}`,
              borderRadius: BORDER_RADIUS.LARGE,
              boxShadow: SHADOWS.CARD,
            }}>

            <div className="flex items-center gap-2 mb-5">
              <UserPlus size={22} className="text-[#5C1A2B]" />
              <h2 className="text-xl font-semibold"
                style={{
                  color: COLORS.TEXT_PRIMARY,
                  fontFamily: FONTS.HEADING,
                }}>
                {editId !== null ? "Edit Staff Member" : "Add New Staff"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="p-3 outline-none"
                style={{
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: COLORS.SURFACE,
                }}
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="p-3 outline-none"
                style={{
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: COLORS.SURFACE,
                }}
              />

              <select
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                className="p-3 outline-none"
                style={{
                  border: `1px solid ${COLORS.BORDER}`,
                  borderRadius: BORDER_RADIUS.MEDIUM,
                  background: COLORS.SURFACE,
                }}
              >
                <option>Admin</option>
                <option>Manager</option>
                <option>Receptionist</option>
                <option>Housekeeping</option>
              </select>

            </div>

            <button
              onClick={addStaff}
              className="mt-5 flex items-center gap-2 text-white px-6 py-3 transition-all duration-300"
              style={{
                background: COLORS.PRIMARY,
                borderRadius: BORDER_RADIUS.MEDIUM,
              }}
            >
              <UserPlus size={18} />
              {editId !== null ? "Update Staff" : "Add Staff"}
            </button>

          </div>
          {/* end */}

          {/* Table */}

          <div className="mt-8 overflow-hidden"
            style={{
              background: COLORS.SURFACE,
              borderRadius: BORDER_RADIUS.LARGE,
              boxShadow: SHADOWS.CARD,
            }}>

            <div className="flex items-center gap-2 p-6 pb-0">
              <BadgeCheck size={22} className="text-[#5C1A2B]" />
              <h2 className="text-xl font-semibold text-[#5C1A2B]">
                Staff Directory
              </h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <p className="text-gray-500 font-medium">Loading staff...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <p className="text-rose-600 font-medium">{error}</p>
                <p className="text-gray-400 text-sm mt-1">
                  Make sure your backend server is running.
                </p>
              </div>
            ) : staff.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <Users size={40} className="text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">
                  No staff members added yet.
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Use the form above to add your first team member.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto mt-4">
                  <table className="w-full">

                    <thead style={{
                      background: COLORS.PRIMARY,
                      color: "white",
                    }}>
                      <tr>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Role</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>

                    <tbody>

                      {staff.map((member) => (
                        <tr key={member._id} className="border-b hover:bg-[#F5EFE7] transition">

                          <td className="p-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#D9B26F] text-[#5C1A2B] font-bold flex items-center justify-center text-sm">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-800">
                              {member.name}
                            </span>
                          </td>

                          <td className="p-4 text-gray-600">
                            <span className="flex items-center gap-2">
                              <Mail size={15} className="text-gray-400" />
                              {member.email}
                            </span>
                          </td>

                          <td className="p-4">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F3D89B]/40 text-[#5C1A2B]">
                              {member.role}
                            </span>
                          </td>

                          {/* Button start */}
                          <td className="p-4">
                            <div className="flex justify-center gap-2">
                              {/* Edit */}
                              <button
                                onClick={() => editStaff(member)}
                                className="flex items-center gap-1.5 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow"
                                style={{
                                  background: COLORS.PRIMARY,
                                  borderRadius: BORDER_RADIUS.MEDIUM,
                                }}
                              >
                                <Pencil size={15} />
                                Edit
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => deleteStaff(member._id)}
                                className="flex items-center gap-1.5 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow"
                                style={{
                                  background: COLORS.ERROR,
                                  borderRadius: BORDER_RADIUS.MEDIUM,
                                }}
                              >
                                <Trash2 size={15} />
                                Delete
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-4 p-6 pt-4">
                  {staff.map((member) => (
                    <div
                      key={member._id}
                      className="border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#D9B26F] text-[#5C1A2B] font-bold flex items-center justify-center text-sm">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail size={12} />
                            {member.email}
                          </p>
                        </div>
                      </div>

                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#F3D89B]/40 text-[#5C1A2B] mb-4">
                        {member.role}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => editStaff(member)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          onClick={() => deleteStaff(member._id)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>

        </div>
      </div>
    </>
  );
}
export default StaffManagement;