// import  { useState } from "react";
//   import AsideBar from "../components/AsideBar";
//   import { User, Mail, Phone, KeyRound, Save } from "lucide-react";
// import AsideBarGuest from "../components/AsidebarGuest";

//   function ProfilePage() {
//     const [profile, setProfile] = useState({
//       name: "",
//       email: "",
//       phone: "",
//       role: "Admin",
//     });

//     const [password, setPassword] = useState({
//       current: "",
//       newPassword: "",
//       confirmPassword: "",
//     });

//     const handleProfileSave = () => {
//       alert("Profile Updated Successfully!");
//     };

//     const handlePasswordChange = () => {
//       if (
//         !password.current ||
//         !password.newPassword ||
//         !password.confirmPassword
//       ) {
//         alert("Please fill all password fields.");
//         return;
//       }

//       if (password.newPassword !== password.confirmPassword) {
//         alert("Passwords do not match.");
//         return;
//       }

//       alert("Password Changed Successfully!");

//       setPassword({
//         current: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     };

//     return (
//       <div className="flex min-h-screen bg-[#F5EFE7]">
//         <AsideBarGuest />

//         <main className="flex-1 p-4 md:p-8">

//           {/* Header */}
//           <div className="bg-linear-to-r from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-8 mb-8 flex items-center gap-4">

//             <div className="w-16 h-16 rounded-full bg-[#D9B26F] text-[#5C1A2B] font-bold flex items-center justify-center text-2xl shadow-lg">
//               {profile.name ? profile.name.charAt(0).toUpperCase() : <User size={28} />}
//             </div>

//             <div>
//               <h1 className="text-2xl md:text-4xl font-bold text-white">
//                 My Profile
//               </h1>
//               <p className="text-[#F3D89B] mt-1">
//                 Manage your personal information and security settings.
//               </p>
//             </div>

//           </div>

//           {/* Profile Information */}
//           <div className="bg-white rounded-3xl shadow-xl border-t-4 border-[#5C1A2B] p-6 md:p-8">

//             <div className="flex items-center gap-2 mb-6">
//               <User size={22} className="text-[#5C1A2B]" />
//               <h2 className="text-xl font-semibold text-[#5C1A2B]">
//                 Profile Information
//               </h2>
//             </div>

//             <form autoComplete="off">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                 {/* Name */}
//                 <div>
//                   <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
//                     <User size={16} className="text-[#5C1A2B]" />
//                     Full Name
//                   </label>

//                   <input
//                     type="text"
//                     name="profile_name_123"
//                     autoComplete="off"
//                     placeholder="Enter Full Name"
//                     value={profile.name}
//                     onChange={(e) =>
//                       setProfile({
//                         ...profile,
//                         name: e.target.value,
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#5C1A2B] outline-none transition"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
//                     <Phone size={16} className="text-[#5C1A2B]" />
//                     Phone Number
//                   </label>

//                   <input
//                     type="text"
//                     name="profile_phone_123"
//                     autoComplete="off"
//                     placeholder="Enter Phone Number"
//                     value={profile.phone}
//                     onChange={(e) =>
//                       setProfile({
//                         ...profile,
//                         phone: e.target.value,
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#5C1A2B] outline-none transition"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
//                     <Mail size={16} className="text-[#5C1A2B]" />
//                     Email
//                   </label>

//                   <input
//                     type="email"
//                     name="profile_email_123"
//                     autoComplete="off"
//                     placeholder="Enter Email"
//                     value={profile.email}
//                     onChange={(e) =>
//                       setProfile({
//                         ...profile,
//                         email: e.target.value,
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#5C1A2B] outline-none transition"
//                   />
//                 </div>

                

//               </div>

//               <button
//                 type="button"
//                 onClick={handleProfileSave}
//                 className="mt-6 flex items-center gap-2 bg-[#5C1A2B] hover:bg-[#7A233A] text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
//               >
//                 <Save size={18} />
//                 Save Profile
//               </button>
//             </form>
//           </div>

//           {/* Change Password */}
//           <div className="bg-white rounded-3xl shadow-xl border-t-4 border-[#D9B26F] mt-8 p-6 md:p-8">

//             <div className="flex items-center gap-2 mb-6">
//               <KeyRound size={22} className="text-[#5C1A2B]" />
//               <h2 className="text-xl font-semibold text-[#5C1A2B]">
//                 Change Password
//               </h2>
//             </div>

//             <form autoComplete="off">
//               <div className="grid grid-cols-1 gap-5">

//                 <input
//                   type="password"
//                   name="new_password_123"
//                   autoComplete="new-password"
//                   placeholder="New Password"
//                   value={password.newPassword}
//                   onChange={(e) =>
//                     setPassword({
//                       ...password,
//                       newPassword: e.target.value,
//                     })
//                   }
//                   className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#5C1A2B] outline-none transition"
//                 />

//                 <input
//                   type="password"
//                   name="confirm_password_123"
//                   autoComplete="new-password"
//                   placeholder="Confirm New Password"
//                   value={password.confirmPassword}
//                   onChange={(e) =>
//                     setPassword({
//                       ...password,
//                       confirmPassword: e.target.value,
//                     })
//                   }
//                   className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#5C1A2B] outline-none transition"
//                 />

//               </div>

//               <button
//                 type="button"
//                 onClick={handlePasswordChange}
//                 className="mt-6 flex items-center gap-2 bg-[#5C1A2B] hover:bg-[#7A233A] text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
//               >
//                 <KeyRound size={18} />
//                 Change Password
//               </button>
//             </form>
//           </div>

//         </main>
//       </div>
//     );
//   }

//   export default ProfilePage;

import React from 'react'

function ProfilePage() {
  return (
    <h1>ProfilePage</h1>
  )
}

export default ProfilePage