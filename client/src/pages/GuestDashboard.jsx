import {
  CalendarDays,
  BedDouble,
  // MessageSquare,
  Clock3,
  CreditCard,
  Gift,
  LogOut,
  MapPin,
  Wifi,
  Coffee,
  Sparkles,
  ConciergeBell,
  ShieldCheck,
  KeyRound,
  Flower2,
  UtensilsCrossed,
  Car,
  Waves,
  CheckCircle2
} from "lucide-react";
import AsideBarGuest from "../components/AsideBarGuest"
function GuestDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8F6F2]">

      {/* Sidebar */}
      <AsideBarGuest/>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">

        
        <main className="p-6 lg:p-8">


          {/* Hero Section */}

<div className="relative overflow-hidden rounded-3xl bg-white border border-[#ECE5DC] shadow-xl mb-8">



  <div className="absolute top-0 right-0 w-72 h-72 bg-[#D9B26F]/10 rounded-full blur-3xl"></div>

  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5EFE7] rounded-full blur-3xl"></div>

  <div className="relative p-8 lg:p-10">

    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

      <div>

        <p className="text-sm uppercase tracking-[0.25em] text-[#8B1E3F] font-semibold">
          Good Morning
        </p>

        <h1 className="text-4xl lg:text-5xl font-bold text-[#5C1A2B] mt-2">
          Welcome Back, John
        </h1>

      </div>

      <span className="bg-[#F8F3EC] border border-[#E7D9C8] text-[#5C1A2B] px-5 py-2 rounded-full font-semibold">
        Day 3 of 5 • Suite 402
      </span>

    </div>

    <div className="grid lg:grid-cols-3 gap-8">


      <div className="lg:col-span-2">

        <p className="text-gray-600 text-lg leading-8 max-w-2xl">

          Everything you need during your stay is available here. Manage your booking, check your stay progress and enjoy premium hotel services with just a few clicks.

        </p>

        {/* Info Cards */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

          <div className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-2xl p-5 border border-[#6D1631] hover:shadow-xl transition-all duration-300 text-white">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <CalendarDays className="text-[#D9B26F]" size={22} />
            </div>

            <p className="text-sm text-gray-300">
              Check-Out
            </p>

            <h3 className="font-bold text-white mt-2">
              15 Jul 2026
            </h3>

          </div>

          <div className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-2xl p-5 border border-[#6D1631] hover:shadow-xl transition-all duration-300 text-white">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <MapPin className="text-[#D9B26F]" size={22} />
            </div>

            <p className="text-sm text-gray-300">
              Room
            </p>

            <h3 className="font-font-bold text-white mt-2">
              Suite 402
            </h3>

          </div>

          <div className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-2xl p-5 border border-[#6D1631] hover:shadow-xl transition-all duration-300 text-white">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <Wifi className="text-[#D9B26F]" size={22} />
            </div>

            <p className="text-sm text-gray-300">
              Wi-Fi
            </p>

            <h3 className="font-bold text-[#D9B26F] mt-2">
              Connected
            </h3>

          </div>

          <div className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-2xl p-5 border border-[#6D1631] hover:shadow-xl transition-all duration-300 text-white">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <ShieldCheck className="text-[#D9B26F]" size={22} />
            </div>

            <p className="text-sm text-gray-300">
              Stay Status
            </p>

            <h3 className="font-bold text-[#D9B26F] mt-2">
              Checked In
            </h3>

          </div>

        </div>
        {/* Stay Progress */}

        <div className="mt-8 bg-linear-to-r from-[#5C1A2B] to-[#7A2840] rounded-2xl p-6 text-white shadow-lg">

          <div className="flex justify-between mb-3">

  <p className="font-semibold">
    Stay Progress
  </p>

  <p className="text-sm text-[#D9B26F]">
    3 Days Left
  </p>

</div>

<div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">

  <div className="progress-bar h-full rounded-full"></div>

</div>

<div className="flex justify-between mt-4 text-sm text-gray-300">

  <span>Check In</span>

  <span className="font-semibold text-[#D9B26F]">
    Today
  </span>

  <span>Check Out</span>

</div>

        </div>

      </div>

      <div className="space-y-5">

        {/* Digital Key */}

        <div className="bg-linear-to-br from-[#FDFBF8] to-[#F5EFE7] rounded-2xl border border-[#ECE5DC] p-6 shadow-sm">

          <div className="flex justify-between items-center mb-5">

            <div>

              <p className="text-xs uppercase tracking-widest text-gray-500">
                Digital Room Key
              </p>

              <h2 className="text-2xl font-bold text-[#5C1A2B] mt-1">
                Suite 402
              </h2>

            </div>

            <KeyRound className="text-[#D9B26F]" size={28} />

          </div>

          <div className="space-y-3">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Guest
              </span>

              <span className="font-semibold text-[#5C1A2B]">
                John Smith
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Valid Until
              </span>

              <span className="font-semibold text-[#5C1A2B]">
                15 Jul • 12 PM
              </span>

            </div>

          </div>

        </div>

        {/* Today's Schedule */}

        <div className="bg-[#FAF8F5] rounded-2xl border border-[#ECE5DC] p-6">

          <h2 className="text-xl font-bold text-[#5C1A2B] mb-5">
            Today's Schedule
          </h2>

          <div className="space-y-5">

            <div className="flex gap-4">

              <Coffee className="text-[#8B1E3F]" />

              <div>

                <p className="font-semibold text-[#5C1A2B]">
                  Breakfast
                </p>

                <p className="text-sm text-gray-500">
                  7:00 AM – 10:30 AM
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <Sparkles className="text-[#8B1E3F]" />

              <div>

                <p className="font-semibold text-[#5C1A2B]">
                  Housekeeping
                </p>

                <p className="text-sm text-gray-500">
                  11:00 AM
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <ConciergeBell className="text-[#8B1E3F]" />

              <div>

                <p className="font-semibold text-[#5C1A2B]">
                  Concierge Service
                </p>

                <p className="text-sm text-gray-500">
                  Available 24/7
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

          {/* Stats Cards */}

<div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

  {/* Nights Remaining */}

  <div className="group bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

    <div className="w-14 h-14 rounded-2xl bg-[#D9B26F]/20 flex items-center justify-center border border-[#D9B26F]/30">

      <CalendarDays
        className="text-[#D9B26F]"
        size={28}
      />

    </div>

    <p className="text-gray-300 mt-5">
      Nights Remaining
    </p>

    <h2 className="text-5xl font-bold text-white mt-2">
      5
    </h2>

  </div>

  {/* Room Type */}

  <div className="group bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

    <div className="w-14 h-14 rounded-2xl bg-[#D9B26F]/20 flex items-center justify-center border border-[#D9B26F]/30">

      <BedDouble
        className="text-[#D9B26F]"
        size={28}
      />

    </div>

    <p className="text-gray-300 mt-5">
      Room Type
    </p>

    <h2 className="text-2xl font-bold text-white mt-2">
      Deluxe Suite
    </h2>

  </div>

  {/* Pending Bill */}

  <div className="group bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

    <div className="w-14 h-14 rounded-2xl bg-[#D9B26F]/20 flex items-center justify-center border border-[#D9B26F]/30">

      <CreditCard
        className="text-[#D9B26F]"
        size={28}
      />

    </div>

    <p className="text-gray-300 mt-5">
      Pending Bill
    </p>

    <h2 className="text-5xl font-bold text-white mt-2">
      $0
    </h2>

  </div>

  {/* Loyalty Points */}

  <div className="group bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

    <div className="w-14 h-14 rounded-2xl bg-[#D9B26F]/20 flex items-center justify-center border border-[#D9B26F]/30">

      <Gift
        className="text-[#D9B26F]"
        size={28}
      />

    </div>

    <p className="text-gray-300 mt-5">
      Loyalty Points
    </p>

    <h2 className="text-5xl font-bold text-white mt-2">
      840
    </h2>

  </div>

</div>

          {/* Booking Summary */}

          <div className="bg-white rounded-3xl shadow-lg border border-[#EFE7DD] p-8 mb-8">

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#5C1A2B]">Current Booking</h2>
                <p className="text-gray-500 mt-2">Reservation Details</p>
              </div>
              <span className="flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold w-fit">
                <CheckCircle2 size={16} />
                Confirmed
              </span>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">

              <div className="bg-[#F9F7F4] rounded-2xl p-5 hover:bg-[#F8F1E8] transition">
                <p className="text-gray-500 text-sm">Room</p>
                <h3 className="font-bold text-xl text-[#5C1A2B] mt-2">Deluxe Suite</h3>
              </div>

              <div className="bg-[#F9F7F4] rounded-2xl p-5 hover:bg-[#F8F1E8] transition">
                <p className="text-gray-500 text-sm">Guests</p>
                <h3 className="font-bold text-xl text-[#5C1A2B] mt-2">2 Adults</h3>
              </div>

              <div className="bg-[#F9F7F4] rounded-2xl p-5 hover:bg-[#F8F1E8] transition">
                <p className="text-gray-500 text-sm">Check In</p>
                <h3 className="font-bold text-xl text-[#5C1A2B] mt-2">10 Jul 2026</h3>
              </div>

              <div className="bg-[#F9F7F4] rounded-2xl p-5 hover:bg-[#F8F1E8] transition">
                <p className="text-gray-500 text-sm">Check Out</p>
                <h3 className="font-bold text-xl text-[#5C1A2B] mt-2">15 Jul 2026</h3>
              </div>

            </div>

            <div className="flex justify-end mt-8">
              <button className="flex items-center gap-2 bg-[#8B1E3F] hover:bg-[#6D1631] text-white px-7 py-3 rounded-xl transition shadow-md hover:shadow-lg">
                <LogOut size={18} />
                Check Out
              </button>
            </div>

          </div>

         {/* Hotel Amenities */}

<div className="mb-8">

  <div className="flex items-center justify-between mb-6">

    <div>
      <h2 className="text-3xl font-bold text-[#5C1A2B]">
        Hotel Amenities
      </h2>

      <p className="text-gray-500 mt-1">
        Included with your stay, available on-site
      </p>
    </div>

    <span className="hidden sm:flex items-center gap-2 text-sm bg-[#5C1A2B] text-white px-4 py-2 rounded-full shadow-md">
      <MapPin size={14} className="text-[#D9B26F]" />
      Ground & 1st Floor
    </span>

  </div>

  <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">

    {/* Spa */}

    <div className="group bg-[#5C1A2B] rounded-3xl p-7 shadow-md hover:shadow-xl transition border border-transparent hover:border-[#D9B26F]/40">

      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-[#D9B26F] transition">

        <Flower2
          size={26}
          className="text-[#D9B26F] group-hover:text-[#5C1A2B] transition"
        />

      </div>

      <h3 className="text-lg font-bold text-white">
        Spa & Wellness
      </h3>

      <p className="text-[#D9B26F] text-xs font-semibold mt-2">
        9:00 AM – 8:00 PM
      </p>

      <p className="text-gray-300 text-sm mt-3">
        Massage therapy, sauna and steam room on the first floor.
      </p>

    </div>

    {/* Pool */}

    <div className="group bg-[#5C1A2B] rounded-3xl p-7 shadow-md hover:shadow-xl transition border border-transparent hover:border-[#D9B26F]/40">

      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-[#D9B26F] transition">

        <Waves
          size={26}
          className="text-[#D9B26F] group-hover:text-[#5C1A2B] transition"
        />

      </div>

      <h3 className="text-lg font-bold text-white">
        Pool & Fitness
      </h3>

      <p className="text-[#D9B26F] text-xs font-semibold mt-2">
        6:00 AM – 10:00 PM
      </p>

      <p className="text-gray-300 text-sm mt-3">
        Heated swimming pool and fully equipped gym.
      </p>

    </div>

    {/* Dining */}

    <div className="group bg-[#5C1A2B] rounded-3xl p-7 shadow-md hover:shadow-xl transition border border-transparent hover:border-[#D9B26F]/40">

      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-[#D9B26F] transition">

        <UtensilsCrossed
          size={26}
          className="text-[#D9B26F] group-hover:text-[#5C1A2B] transition"
        />

      </div>

      <h3 className="text-lg font-bold text-white">
        Fine Dining
      </h3>

      <p className="text-[#D9B26F] text-xs font-semibold mt-2">
        7:00 AM – 11:00 PM
      </p>

      <p className="text-gray-300 text-sm mt-3">
        Rooftop restaurant and in-room dining available.
      </p>

    </div>

    {/* Parking */}

    <div className="group bg-[#5C1A2B] rounded-3xl p-7 shadow-md hover:shadow-xl transition border border-transparent hover:border-[#D9B26F]/40">

      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-[#D9B26F] transition">

        <Car
          size={26}
          className="text-[#D9B26F] group-hover:text-[#5C1A2B] transition"
        />

      </div>

      <h3 className="text-lg font-bold text-white">
        Valet Parking
      </h3>

      <p className="text-[#D9B26F] text-xs font-semibold mt-2">
        24 Hours
      </p>

      <p className="text-gray-300 text-sm mt-3">
        Complimentary valet parking at the main entrance.
      </p>

    </div>

  </div>

</div>

          {/* Recent Activity & Stay Info */}

          <div className="grid xl:grid-cols-3 gap-6">

            {/* Recent Activity */}

            <div className="xl:col-span-2 bg-white rounded-3xl p-8 border border-[#EFE7DD] shadow-md">

              <h2 className="text-3xl font-bold text-[#5C1A2B] mb-8">Recent Activity</h2>

              <div className="space-y-5">

                {[
                  { icon: Clock3, title: "Room Service Requested", time: "Today • 10:30 AM" },
                  { icon: CalendarDays, title: "Booking Confirmed", time: "Yesterday • 02:15 PM" },
                  { icon: CreditCard, title: "Payment Successful", time: "2 Days Ago" },
                  { icon: Gift, title: "Breakfast Activated", time: "Available until checkout" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-5 bg-[#FAF8F5] rounded-2xl p-5 hover:shadow-md hover:bg-[#F8F1E8] transition"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#F7E5D1] flex items-center justify-center">
                      <item.icon size={24} className="text-[#8B1E3F]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#5C1A2B]">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.time}</p>
                    </div>
                  </div>
                ))}

              </div>

            </div>

            {/* Stay Information */}

            <div className="bg-linear-to-br from-[#5C1A2B] to-[#7A2840] rounded-3xl shadow-md p-8 text-white">

              <h2 className="text-3xl font-bold mb-8">Stay Information</h2>

              <div className="space-y-6">

                <div>
                  <p className="text-gray-300 text-sm">Room Number</p>
                  <h3 className="text-3xl font-bold">402</h3>
                </div>

                <div className="h-px bg-white/15" />

                <div>
                  <p className="text-gray-300 text-sm">Wi-Fi Network</p>
                  <h3 className="font-semibold">LuxuryStay_Guest</h3>
                  <p className="text-gray-300 text-sm mt-1">Password: Suite402Stay</p>
                </div>

                <div className="h-px bg-white/15" />

                <div>
                  <p className="text-gray-300 text-sm">Breakfast</p>
                  <h3 className="font-semibold">7:00 AM - 10:30 AM</h3>
                </div>

                <div>
                  <p className="text-gray-300 text-sm">Check-Out</p>
                  <h3 className="font-semibold">12:00 PM</h3>
                </div>

                <button className="w-full bg-[#D9B26F] hover:bg-[#c99f57] text-[#5C1A2B] py-4 rounded-2xl font-semibold transition shadow-md">
                  Contact Reception
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>

  );
}

export default GuestDashboard;