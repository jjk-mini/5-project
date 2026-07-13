// Reports page — occupancy and revenue chartsimport { useState } from "react";
import AsideBar from "../components/AsideBar"; // Change path if needed

import {
  CalendarDays,
  BedDouble,
  DollarSign,
  TrendingUp,
  Download,
} from "lucide-react";
import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

const occupancyData = [
  { day: "Mon", occupancy: 72 },
  { day: "Tue", occupancy: 76 },
  { day: "Wed", occupancy: 80 },
  { day: "Thu", occupancy: 85 },
  { day: "Fri", occupancy: 91 },
  { day: "Sat", occupancy: 97 },
  { day: "Sun", occupancy: 88 },
];

const revenueData = [
  { month: "Jan", revenue: 22000 },
  { month: "Feb", revenue: 26000 },
  { month: "Mar", revenue: 31000 },
  { month: "Apr", revenue: 29000 },
  { month: "May", revenue: 36000 },
  { month: "Jun", revenue: 41000 },
];

function ReportsPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="flex bg-[#F5EFE7] min-h-screen">

      {/* Sidebar */}
      <AsideBar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Header */}

        <div className="bg-linear-to-r from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-8 flex flex-col lg:flex-row justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Reports & Analytics
            </h1>

            <p className="text-[#F3D89B] mt-3 text-lg">
              View occupancy trends, monthly revenue and hotel performance.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-[#D9B26F] text-[#5C1A2B] px-6 py-3 rounded-xl font-semibold mt-6 lg:mt-0 hover:scale-105 transition">

            <Download size={20} />

            Export Report

          </button>

        </div>

        {/* Date Filter */}

        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">

          <div className="flex items-center gap-3">

            <CalendarDays
              size={28}
              className="text-[#5C1A2B]"
            />

            <h2 className="text-2xl font-bold text-[#5C1A2B]">
              Filter by Date Range
            </h2>

          </div>

          <div className="flex flex-wrap gap-4">

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded-xl px-4 py-2 outline-none"
            />

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded-xl px-4 py-2 outline-none"
            />

            <button className="bg-[#5C1A2B] text-white px-6 rounded-xl hover:bg-[#7A2840] transition">

              Apply

            </button>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-6 text-white">

            <DollarSign
              className="text-[#D9B26F]"
              size={40}
            />

            <p className="mt-5 text-gray-200">
              Total Revenue
            </p>

            <h2 className="text-4xl font-bold mt-2">
              $182K
            </h2>

          </div>

          <div className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-6 text-white">

            <BedDouble
              className="text-[#D9B26F]"
              size={40}
            />

            <p className="mt-5 text-gray-200">
              Occupancy
            </p>

            <h2 className="text-4xl font-bold mt-2">
              89%
            </h2>

          </div>

          <div className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-6 text-white">

            <TrendingUp
              className="text-[#D9B26F]"
              size={40}
            />

            <p className="mt-5 text-gray-200">
              Monthly Growth
            </p>

            <h2 className="text-4xl font-bold mt-2">
              +14%
            </h2>

          </div>

          <div className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-xl p-6 text-white">

            <CalendarDays
              className="text-[#D9B26F]"
              size={40}
            />

            <p className="mt-5 text-gray-200">
              Bookings
            </p>

            <h2 className="text-4xl font-bold mt-2">
              524
            </h2>

          </div>

        </div>

        {/* Charts */}

        <div className="grid xl:grid-cols-2 gap-8 mb-8">

          {/* Occupancy */}

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-[#5C1A2B] mb-6">
              Occupancy Rate Over Time
            </h2>

            <ResponsiveContainer width="100%" height={350}>

              <LineChart data={occupancyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#D9B26F"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* Revenue */}

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-[#5C1A2B] mb-6">
              Revenue by Month
            </h2>

            <ResponsiveContainer width="100%" height={350}>

              <BarChart data={revenueData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="revenue"
                  fill="#5C1A2B"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Summary */}

        <div className="bg-white rounded-3xl shadow-xl border-l-8 border-[#D9B26F] p-8">

          <h2 className="text-3xl font-bold text-[#5C1A2B] mb-8">
            Performance Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-[#F5EFE7] rounded-2xl p-6">

              <p className="text-gray-500">
                Highest Occupancy
              </p>

              <h3 className="text-2xl font-bold text-[#5C1A2B] mt-2">
                Saturday (97%)
              </h3>

            </div>

            <div className="bg-[#F5EFE7] rounded-2xl p-6">

              <p className="text-gray-500">
                Best Revenue Month
              </p>

              <h3 className="text-2xl font-bold text-[#5C1A2B] mt-2">
                June ($41,000)
              </h3>

            </div>

            <div className="bg-[#F5EFE7] rounded-2xl p-6">

              <p className="text-gray-500">
                Average Occupancy
              </p>

              <h3 className="text-2xl font-bold text-[#5C1A2B] mt-2">
                84%
              </h3>

            </div>

            <div className="bg-[#F5EFE7] rounded-2xl p-6">

              <p className="text-gray-500">
                Average Monthly Revenue
              </p>

              <h3 className="text-2xl font-bold text-[#5C1A2B] mt-2">
                $30,333
              </h3>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ReportsPage;