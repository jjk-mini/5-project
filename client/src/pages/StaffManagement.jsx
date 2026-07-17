// Staff management — list, create, edit, deactivate staffimport React, { useEffect, useState } from "react";
import AsideBar from "../components/AsideBar";
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from "../constants/theme";
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
} from "lucide-react";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/staff";

const tint = (hex, alpha = "1A") => `${hex}${alpha}`;


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
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch staff.");
      const data = await res.json();
      setStaff(data);
      setError("");
    } catch (err) {
      setError(err.message);
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
        // Update existing staff member
        const res = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to update staff.");
        setEditId(null);
      } else {
        // Create new staff member
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to add staff.");
      }

      setForm({ name: "", email: "", role: "Receptionist" });
      fetchStaff(); // refresh list from DB
    } catch (err) {
      alert(err.message);
    }
  };

  const editStaff = (member) => {
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
    });
    setEditId(member._id);
  };

  const deleteStaff = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete staff.");
      fetchStaff(); // refresh list from DB
    } catch (err) {
      alert(err.message);
    }
  };

    const headingFont = { fontFamily: FONTS.HEADING };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });


  return (
    <>
      {/* start Component */}
      <div className="flex min-h-screen bg-[#F5EFE7]">

        <AsideBar />
        {/* component */}
        <div className="flex-1 p-4 md:p-8">

          {/* Header */}
         <div
                     className="p-6 sm:p-8"
                     style={{
                       background: `linear-gradient(to right, ${COLORS.PRIMARY}, ${COLORS.DARK})`,
                       borderRadius: BORDER_RADIUS.LARGE,
                       boxShadow: SHADOWS.CARD,
                     }}
                   >
                     <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
         
                       <div>
                         <p className="text-sm font-medium" style={{ color: `${COLORS.CREAM}CC` }}>
                           Good morning,
                         </p>
                         <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1" style={headingFont}>
                           Admin User
                         </h1>
                         <div className="flex items-center gap-3 mt-3">
                           <span
                             className="text-xs font-semibold px-3 py-1"
                             style={{ color: COLORS.PRIMARY, backgroundColor: COLORS.ACCENT, borderRadius: BORDER_RADIUS.PILL }}
                           >
                             Admin
                           </span>
                           <span className="text-sm" style={{ color: `${COLORS.CREAM}B3` }}>
                             {today}
                           </span>
                         </div>
                       </div>
         
                       {/* Dropdown start */}
                       <div className="relative w-full sm:w-72">
                         <button
                           type="button"
                           onClick={() => setIsDashboardOpen((prev) => !prev)}
                           className="w-full flex items-center justify-between gap-2 font-semibold px-5 py-3 transition-colors focus:outline-none"
                           style={{
                             backgroundColor: COLORS.SURFACE,
                             color: COLORS.PRIMARY,
                             borderRadius: BORDER_RADIUS.MEDIUM,
                             boxShadow: SHADOWS.DROPDOWN,
                           }}
                         >
                           <span className="flex items-center gap-2">
                             <LayoutDashboard size={18} />
                             Select Dashboard
                           </span>
                           <ChevronDown
                             size={18}
                             className={`transition-transform ${isDashboardOpen ? "rotate-180" : ""}`}
                           />
                         </button>
         
                         {isDashboardOpen && (
                           <ul
                             className="absolute right-0 z-10 mt-2 w-full overflow-hidden"
                             style={{
                               backgroundColor: COLORS.SURFACE,
                               border: `1px solid ${COLORS.BORDER}`,
                               borderRadius: BORDER_RADIUS.MEDIUM,
                               boxShadow: SHADOWS.DROPDOWN,
                             }}
                           >
                             {dashboardOptions.map((option) => (
                               <li key={option.path}>
                                 <Link
                                   to={option.path}
                                   onClick={() => setIsDashboardOpen(false)}
                                   className="block w-full text-left px-4 py-3 font-medium transition-colors"
                                   style={{ color: COLORS.PRIMARY }}
                                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = tint(COLORS.ACCENT, "33"))}
                                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                 >
                                   {option.label}
                                 </Link>
                               </li>
                             ))}
                           </ul>
                         )}
                       </div>
                       {/* Dropdown end */}
         
                     </div>
                   </div>
<br></br>
          {/* Add Staff Form */}

          <div className="bg-white rounded-3xl shadow-xl border-t-4 border-[#5C1A2B] p-6 md:p-8">

            <div className="flex items-center gap-2 mb-5">
              <UserPlus size={22} className="text-[#5C1A2B]" />
              <h2 className="text-xl font-semibold text-[#5C1A2B]">
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
                className="border border-gray-300 rounded-lg p-3 outline-none shadow-sm focus:ring-2 focus:ring-[#5C1A2B] transition"
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-3 outline-none shadow-sm focus:ring-2 focus:ring-[#5C1A2B] transition"
              />

              <select
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-3 outline-none shadow-sm focus:ring-2 focus:ring-[#5C1A2B] transition"
              >
                <option>Manager</option>
                <option>Receptionist</option>
                <option>Housekeeping</option>
                <option>Chef</option>
                <option>Security</option>
              </select>

            </div>

            <button
              onClick={addStaff}
              className="mt-5 flex items-center gap-2 bg-[#5C1A2B] text-white px-6 py-3 rounded-lg hover:bg-[#7A233A] shadow-md transition-all duration-300"
            >
              <UserPlus size={18} />
              {editId !== null ? "Update Staff" : "Add Staff"}
            </button>

          </div>
          {/* end */}

          {/* Table */}

          <div className="bg-white rounded-3xl shadow-xl mt-8 overflow-hidden">

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

                    <thead className="bg-linear-to-r from-[#5C1A2B] to-[#7A2840] text-white">
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
                                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow"
                              >
                                <Pencil size={15} />
                                Edit
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => deleteStaff(member._id)}
                                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow"
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