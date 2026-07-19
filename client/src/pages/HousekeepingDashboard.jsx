// // Housekeeping dashboard — task list, mark rooms cleanimport { useState } from "react";
// import AsideBar from "../components/AsideBar";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   ChevronDown,
//   CheckCircle2,
//   BedDouble,
//   Clock3,
//   Wrench,
// } from "lucide-react";

// const initialRooms = [
//   { id: 101, status: "Pending" },
//   { id: 102, status: "Pending" },
//   { id: 103, status: "Cleaned" },
//   { id: 104, status: "Pending" },
//   { id: 105, status: "Pending" },
//   { id: 106, status: "Cleaned" },
// ];

// const initialIssues = [
//   {
//     id: 1,
//     room: 101,
//     issue: "AC Not Working",
//     status: "Open",
//   },
//   {
//     id: 2,
//     room: 205,
//     issue: "Water Leakage",
//     status: "In Progress",
//   },
//   {
//     id: 3,
//     room: 304,
//     issue: "Broken Light",
//     status: "Resolved",
//   },
// ];

// function HousekeepingDashboard() {

//   const [isDashboardOpen, setIsDashboardOpen] = useState(false);
//   const [rooms, setRooms] = useState(initialRooms);
//   const [issues, setIssues] = useState(initialIssues);

//   const dashboardOptions = [
//     {
//       label: "Admin Dashboard",
//       path: "/",
//     },
//     {
//       label: "Housekeeping Dashboard",
//       path: "/housekeeping-dashboard",
//     },
//     {
//       label: "Staff Management Dashboard",
//       path: "/staff-management",
//     },
//   ];

//   const handleClean = (id) => {
//     setRooms(
//       rooms.map((room) =>
//         room.id === id
//           ? {
//             ...room,
//             status: "Cleaned",
//           }
//           : room
//       )
//     );
//   };

//   const updateIssueStatus = (id, status) => {
//     setIssues(
//       issues.map((issue) =>
//         issue.id === id
//           ? {
//             ...issue,
//             status,
//           }
//           : issue
//       )
//     );
//   };

//   const assigned = rooms.length;

//   const cleaned = rooms.filter(
//     (room) => room.status === "Cleaned"
//   ).length;

//   const remaining = assigned - cleaned;

//   const stats = [
//     {
//       label: "Rooms Assigned",
//       value: assigned,
//       icon: BedDouble,
//     },
//     {
//       label: "Rooms Cleaned",
//       value: cleaned,
//       icon: CheckCircle2,
//     },
//     {
//       label: "Rooms Remaining",
//       value: remaining,
//       icon: Clock3,
//     },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-[#F5EFE7]">

//       <AsideBar />

//       <main className="flex-1 p-4 sm:p-6 lg:p-8">

//         {/* Header */}

//         <div className="bg-linear-to-r from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-8 mb-8">

//           <h1 className="text-2xl md:text-4xl font-bold text-white">
//             Housekeeping Dashboard
//           </h1>

//           <p className="text-[#F3D89B] mt-3 text-lg">
//             Monitor room cleaning, maintenance requests and housekeeping operations.
//           </p>

//           <div className="mt-6 relative w-full md:w-80">

//             <label className="block text-sm font-medium text-[#F3D89B] mb-2">
//               Select Dashboard
//             </label>

//             <button
//               type="button"
//               onClick={() =>
//                 setIsDashboardOpen(!isDashboardOpen)
//               }
//               className="w-full flex items-center justify-between border border-[#D9B26F] bg-[#D9B26F] text-[#5C1A2B] rounded-lg p-3 font-medium"
//             >

//               <span className="flex items-center gap-2">
//                 <LayoutDashboard size={18} />
//                 Select Dashboard
//               </span>

//               <ChevronDown
//                 className={`transition-transform ${isDashboardOpen ? "rotate-180" : ""
//                   }`}
//               />

//             </button>

//             {isDashboardOpen && (

//               <ul className="absolute mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-20">

//                 {dashboardOptions.map((item) => (

//                   <li key={item.path}>

//                     <Link
//                       to={item.path}
//                       onClick={() =>
//                         setIsDashboardOpen(false)
//                       }
//                       className="block px-4 py-3 hover:bg-[#F5EFE7]"
//                     >
//                       {item.label}
//                     </Link>

//                   </li>

//                 ))}

//               </ul>

//             )}

//           </div>

//         </div>

//         {/* Stats */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

//           {stats.map(({ label, value, icon: Icon }) => (

//             <div
//               key={label}
//               className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-6 text-white"
//             >

//               <Icon
//                 size={38}
//                 className="text-[#D9B26F]"
//               />

//               <p className="mt-5 text-gray-200">
//                 {label}
//               </p>

//               <h1 className="text-3xl font-bold mt-2">
//                 {value}
//               </h1>

//             </div>

//           ))}

//         </div>

//         {/* PART 2 STARTS HERE */}
//         {/* Today's Cleaning List */}

//         <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

//           <div className="flex items-center justify-between mb-6">

//             <h2 className="text-2xl font-bold text-[#5C1A2B]">
//               Today's Cleaning List
//             </h2>

//             <span className="bg-[#D9B26F] text-[#5C1A2B] px-4 py-2 rounded-full font-semibold">
//               {cleaned}/{assigned} Cleaned
//             </span>

//           </div>

//           <div className="overflow-x-auto">

//             <table className="w-full">

//               <thead>

//                 <tr className="border-b">

//                   <th className="text-left py-4 text-[#5C1A2B]">
//                     Room
//                   </th>

//                   <th className="text-left py-4 text-[#5C1A2B]">
//                     Status
//                   </th>

//                   <th className="text-left py-4 text-[#5C1A2B]">
//                     Action
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {rooms.map((room) => (

//                   <tr
//                     key={room.id}
//                     className="border-b hover:bg-[#F9F4EE]"
//                   >

//                     <td className="py-4 font-semibold">
//                       Room {room.id}
//                     </td>

//                     <td>

//                       <span
//                         className={`px-4 py-2 rounded-full text-sm font-medium ${room.status === "Cleaned"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-yellow-100 text-yellow-700"
//                           }`}
//                       >
//                         {room.status}
//                       </span>

//                     </td>

//                     <td>

//                       {room.status === "Pending" ? (

//                         <button
//                           onClick={() => handleClean(room.id)}
//                           className="bg-[#5C1A2B] hover:bg-[#7A2840] text-white px-5 py-2 rounded-lg transition"
//                         >
//                           Mark Room Cleaned
//                         </button>

//                       ) : (

//                         <span className="text-green-600 font-semibold">
//                           ✔ Completed
//                         </span>

//                       )}

//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </div>

//         </div>

//         {/* PART 3 STARTS HERE */}
//         {/* Maintenance Requests */}

//         <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

//           <div className="flex items-center justify-between mb-6">

//             <h2 className="text-2xl font-bold text-[#5C1A2B]">
//               Maintenance Requests
//             </h2>

//             <Link
//               to="/maintenance"
//               className="bg-[#5C1A2B] hover:bg-[#7A2840] text-white px-5 py-3 rounded-xl"
//             >
//               View Maintenance Requests
//             </Link>
//           </div>

        
//         </div>
       

       

         

//       </main>
//         </div>
    
    

//   );
// }

// export default HousekeepingDashboard;old

// import { useState } from "react";
// import AsideBar from "../components/AsideBar";
// import { Link } from "react-router-dom";
// import {
//   LayoutDashboard,
//   ChevronDown,
//   CheckCircle2,
//   BedDouble,
//   Clock3,
//   Wrench,
//   ClipboardList,
// } from "lucide-react";

// import {
//   COLORS,
//   FONTS,
//   SHADOWS,
//   BORDER_RADIUS,
// } from "../constants/theme";

// const initialRooms = [
//   {
//     id: 101,
//     service: "Room Cleaning",
//     status: "Pending",
//   },
//   {
//     id: 102,
//     service: "Laundry",
//     status: "Pending",
//   },
//   {
//     id: 103,
//     service: "Extra Towels",
//     status: "Completed",
//   },
//   {
//     id: 104,
//     service: "Bathroom Cleaning",
//     status: "Pending",
//   },
//   {
//     id: 105,
//     service: "Mini Bar Refill",
//     status: "Pending",
//   },
//   {
//     id: 106,
//     service: "Room Sanitization",
//     status: "Completed",
//   },
// ];

// const initialIssues = [
//   {
//     id: 1,
//     room: 101,
//     issue: "AC Not Working",
//     status: "Open",
//   },
//   {
//     id: 2,
//     room: 205,
//     issue: "Water Leakage",
//     status: "In Progress",
//   },
//   {
//     id: 3,
//     room: 304,
//     issue: "Broken Light",
//     status: "Resolved",
//   },
// ];

// function HousekeepingDashboard() {
//   const [isDashboardOpen, setIsDashboardOpen] = useState(false);

//   const [rooms, setRooms] = useState(initialRooms);

//   const [issues, setIssues] = useState(initialIssues);

//   const dashboardOptions = [
//     {
//       label: "Admin Dashboard",
//       path: "/",
//     },
//     {
//       label: "Housekeeping Dashboard",
//       path: "/admin/housekeeping-dashboard",
//     },
//     {
//       label: "Staff Management Dashboard",
//       path: "/admin/staff-management",
//     },
//   ];

//   const handleClean = (id) => {
//     setRooms(
//       rooms.map((room) =>
//         room.id === id
//           ? {
//             ...room,
//             status: "Completed",
//           }
//           : room
//       )
//     );
//   };

//   const updateIssueStatus = (id, status) => {
//     setIssues(
//       issues.map((issue) =>
//         issue.id === id
//           ? {
//             ...issue,
//             status,
//           }
//           : issue
//       )
//     );
//   };

//   const assigned = rooms.length;

//   const cleaned = rooms.filter(
//     (room) => room.status === "Completed"
//   ).length;

//   const remaining = assigned - cleaned;

//   const stats = [
//     {
//       label: "Rooms Assigned",
//       value: assigned,
//       icon: BedDouble,
//     },
//     {
//       label: "Completed",
//       value: cleaned,
//       icon: CheckCircle2,
//     },
//     {
//       label: "Pending",
//       value: remaining,
//       icon: Clock3,
//     },
//   ];

//   return (
//     <div
//       className="flex flex-col md:flex-row min-h-screen"
//       style={{
//         background: COLORS.BACKGROUND,
//         fontFamily: FONTS.BODY,
//       }}
//     >
//       <AsideBar />

//       <main className="flex-1 p-4 sm:p-6 lg:p-8">

//         {/* Header */}

//         <div
//           className="mb-8 p-8"
//           style={{
//             background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
//             borderRadius: BORDER_RADIUS.LARGE,
//             boxShadow: SHADOWS.CARD,
//           }}
//         >
//           <div className="flex items-center gap-4">
//             <div
//               className="p-4"
//               style={{
//                 backgroundColor: COLORS.ACCENT,
//                 borderRadius: BORDER_RADIUS.LARGE,
//               }}
//             >
//               <ClipboardList
//                 size={35}
//                 style={{ color: COLORS.PRIMARY }}
//               />
//             </div>

//             <div>
//               <h1
//                 className="text-4xl font-bold"
//                 style={{
//                   color: "#fff",
//                   fontFamily: FONTS.HEADING,
//                 }}
//               >
//                 Service Management
//               </h1>

//               <p
//                 className="mt-2"
//                 style={{
//                   color: COLORS.ACCENT,
//                   fontFamily: FONTS.BODY,
//                 }}
//               >
//                 Manage guest service requests, monitor progress, and ensure exceptional hospitality.

//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//           {stats.map(({ label, value, icon: Icon }) => (
//             <div
//               key={label}
//               className="p-6 text-white"
//               style={{
//                 background: COLORS.PRIMARY,
//                 borderRadius: BORDER_RADIUS.LARGE,
//                 boxShadow: SHADOWS.CARD,
//               }}
//             >
//               <Icon
//                 size={38}
//                 style={{
//                   color: COLORS.ACCENT,
//                 }}
//               />

//               <p
//                 className="mt-5"
//                 style={{
//                   color: COLORS.MUTED,
//                 }}
//               >
//                 {label}
//               </p>

//               <h1 className="text-3xl font-bold mt-2">
//                 {value}
//               </h1>
//             </div>
//           ))}
//         </div>
//         {/* Today's Cleaning List */}

//         <div
//   className="mt-8 overflow-hidden"
//   style={{
//     background: COLORS.SURFACE,
//     borderRadius: BORDER_RADIUS.LARGE,
//     boxShadow: SHADOWS.CARD,
//     border: `1px solid ${COLORS.BORDER}`,
//   }}
// >
//   <div className="overflow-x-auto">
//     <table className="w-full border-collapse">
//       <thead
//         style={{
//           background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
//         }}
//       >
//         <tr>
//           <th
//             className="py-4 px-6 text-left"
//             style={{
//               color: COLORS.ACCENT,
//               fontFamily: FONTS.HEADING,
//               fontWeight: 700,
//             }}
//           >
//             Room No
//           </th>

//           <th
//             className="py-4 px-6 text-left"
//             style={{
//               color: COLORS.ACCENT,
//               fontFamily: FONTS.HEADING,
//               fontWeight: 700,
//             }}
//           >
//             Service
//           </th>

//           <th
//             className="py-4 px-6 text-center"
//             style={{
//               color: COLORS.ACCENT,
//               fontFamily: FONTS.HEADING,
//               fontWeight: 700,
//             }}
//           >
//             Status
//           </th>

//           <th
//             className="py-4 px-6 text-center"
//             style={{
//               color: COLORS.ACCENT,
//               fontFamily: FONTS.HEADING,
//               fontWeight: 700,
//             }}
//           >
//             Action
//           </th>
//         </tr>
//       </thead>

//       <tbody>
//         {rooms.map((room, index) => (
//           <tr
//             key={room.id}
//             style={{
//               background: index % 2 === 0 ? "#FFFFFF" : "#FCFAF7",
//               borderBottom: `1px solid ${COLORS.BORDER}`,
//             }}
//             className="transition-all duration-200 hover:bg-amber-50"
//           >
//             <td
//               className="py-5 px-6 font-semibold"
//               style={{ color: COLORS.TEXT_PRIMARY }}
//             >
//               #{room.id}
//             </td>

//             <td
//               className="px-6"
//               style={{ color: COLORS.TEXT_SECONDARY }}
//             >
//               {room.service}
//             </td>

//             <td className="text-center">
//               <span
//                 className="px-4 py-2 text-sm font-semibold"
//                 style={{
//                   background:
//                     room.status === "Completed"
//                       ? "#EAF8EF"
//                       : "#FFF4D8",
//                   color:
//                     room.status === "Completed"
//                       ? COLORS.SUCCESS
//                       : COLORS.WARNING,
//                   borderRadius: BORDER_RADIUS.PILL,
//                 }}
//               >
//                 {room.status}
//               </span>
//             </td>

//             <td className="text-center">
//               {room.status === "Pending" ? (
//                 <button
//                   onClick={() => handleClean(room.id)}
//                   className="px-5 py-2 text-white font-medium transition-all duration-200 hover:scale-105"
//                   style={{
//                     background: COLORS.PRIMARY,
//                     borderRadius: BORDER_RADIUS.MEDIUM,
//                   }}
//                 >
//                   Complete
//                 </button>
//               ) : (
//                 <button
//                   disabled
//                   className="px-5 py-2 text-white font-medium cursor-not-allowed"
//                   style={{
//                     background: COLORS.SUCCESS,
//                     borderRadius: BORDER_RADIUS.MEDIUM,
//                   }}
//                 >
//                   ✓ Completed
//                 </button>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

//       </main>

//     </div>


//   );
// }

// export default HousekeepingDashboard;1st

import { useState } from "react";
import AsideBar from "../components/AsideBar";
import { ConciergeBell, Search } from "lucide-react";
import {
  COLORS,
  FONTS,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";
import { Link } from "react-router-dom";

function ServicesPage() {
  const [services, setServices] = useState([
    {
      id: 1,
      room: 101,
      service: "Room Cleaning",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      room: 205,
      service: "Laundry Service",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      room: 302,
      service: "Fresh Towels",
      priority: "Low",
      status: "Completed",
    },
    {
      id: 4,
      room: 405,
      service: "Laundry Pickup",
      priority: "High",
      status: "Pending",
    },
    {
      id: 5,
      room: 502,
      service: "Bed Making",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 6,
      room: 601,
      service: "Laundry Delivery",
      priority: "Low",
      status: "Completed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const updateStatus = (id) => {
    setServices(
      services.map((item) => {
        if (item.id !== id) return item;

        let nextStatus = "Completed";

        if (item.status === "Pending")
          nextStatus = "In Progress";
        else if (item.status === "In Progress")
          nextStatus = "Completed";

        return {
          ...item,
          status: nextStatus,
        };
      })
    );
  };

  const filtered = services.filter((item) => {
    const matchSearch =
      item.service.toLowerCase().includes(search.toLowerCase()) ||
      item.room.toString().includes(search);

    const matchFilter =
      filter === "All" || item.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: COLORS.BACKGROUND,
        fontFamily: FONTS.BODY,
      }}
    >
      <AsideBar />

      <main className="flex-1 p-6">

<div
  className="p-8 mb-8"
  style={{
    background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
    borderRadius: BORDER_RADIUS.LARGE,
    boxShadow: SHADOWS.CARD,
  }}
>
  <div className="flex items-center justify-between flex-wrap gap-4">

    {/* Left Side */}
    <div className="flex items-center gap-4">
      <div
        className="p-4"
        style={{
          background: COLORS.ACCENT,
          borderRadius: BORDER_RADIUS.LARGE,
        }}
      >
        <ConciergeBell
          size={35}
          style={{ color: COLORS.PRIMARY }}
        />
      </div>

      <div>
        <h1
          className="text-4xl font-bold text-white"
          style={{
            fontFamily: FONTS.HEADING,
          }}
        >
          Service Requests
        </h1>

        <p
          className="mt-2"
          style={{
            color: COLORS.ACCENT,
          }}
        >
          Manage all room and laundry service requests.
        </p>
      </div>
    </div>

    <Link
      to="/services/newService"
      style={{
        background: COLORS.ACCENT,
        color: COLORS.PRIMARY,
        fontSize: "13px",
        fontWeight: 600,
        padding: "10px 18px",
        borderRadius: BORDER_RADIUS.MEDIUM,
        textDecoration: "none",
        boxShadow: SHADOWS.DROPDOWN,
        whiteSpace: "nowrap",
      }}
    >
      + New Service
    </Link>

  </div>
</div>
        {/* Search & Filter */}

        <div
          className="p-6 mt-8 flex flex-col md:flex-row gap-4 justify-between"
          style={{
            background: COLORS.SURFACE,
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
          }}
        >
          <div className="relative w-full md:w-80">

            <Search
              className="absolute left-3 top-3.5 text-gray-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Room or Service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 outline-none transition"
              style={{
                border: `1px solid ${COLORS.BORDER}`,
                borderRadius: BORDER_RADIUS.MEDIUM,
              }}
            />

          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 outline-none"
            style={{
              border: `1px solid ${COLORS.BORDER}`,
              borderRadius: BORDER_RADIUS.MEDIUM,
            }}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

        </div>

               {/* Table */}

        <div
          className="mt-8 overflow-hidden"
          style={{
            background: "#fff",
            borderRadius: BORDER_RADIUS.LARGE,
            boxShadow: SHADOWS.CARD,
            border: `1px solid ${COLORS.BORDER}`,
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead
                style={{
                  background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
                }}
              >
                <tr>
                  <th
                    className="text-left py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Room
                  </th>

                  <th
                    className="text-left py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Service
                  </th>

                  <th
                    className="text-center py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Priority
                  </th>

                  <th
                    className="text-center py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Status
                  </th>

                  <th
                    className="text-center py-4 px-6"
                    style={{
                      color: COLORS.ACCENT,
                      fontFamily: FONTS.HEADING,
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item, index) => (
                  <tr
                    key={item.id}
                    className="transition-all duration-200 hover:bg-amber-50"
                    style={{
                      background:
                        index % 2 === 0 ? "#FFFFFF" : "#FCFAF7",
                      borderBottom: `1px solid ${COLORS.BORDER}`,
                    }}
                  >
                    <td
                      className="py-5 px-6 font-semibold"
                      style={{
                        color: COLORS.TEXT_PRIMARY,
                      }}
                    >
                      #{item.room}
                    </td>

                    <td
                      className="py-5 px-6"
                      style={{
                        color: COLORS.TEXT_SECONDARY,
                      }}
                    >
                      {item.service}
                    </td>

                    <td className="py-5 px-6 text-center">
                      <span
                        className="px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                          background:
                            item.priority === "High"
                              ? "#FDECEC"
                              : item.priority === "Medium"
                              ? "#FFF7E6"
                              : "#EAF7F0",

                          color:
                            item.priority === "High"
                              ? COLORS.ERROR
                              : item.priority === "Medium"
                              ? COLORS.WARNING
                              : COLORS.SUCCESS,
                        }}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <span
                        className="px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                          background:
                            item.status === "Pending"
                              ? "#FDECEC"
                              : item.status === "In Progress"
                              ? "#FFF7E6"
                              : "#EAF7F0",

                          color:
                            item.status === "Pending"
                              ? COLORS.ERROR
                              : item.status === "In Progress"
                              ? COLORS.WARNING
                              : COLORS.SUCCESS,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-5 px-6 text-center">
                      {item.status !== "Completed" ? (
                        <button
                          onClick={() => updateStatus(item.id)}
                          className="text-white px-5 py-2 font-medium transition-all duration-200 hover:scale-105"
                          style={{
                            background: COLORS.PRIMARY,
                            borderRadius: BORDER_RADIUS.MEDIUM,
                            minWidth: "130px",
                          }}
                        >
                          Next Status
                        </button>
                      ) : (
                        <span
                          className="px-4 py-2 rounded-full text-sm font-semibold"
                          style={{
                            background: "#EAF7F0",
                            color: COLORS.SUCCESS,
                          }}
                        >
                          ✓ Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default ServicesPage;