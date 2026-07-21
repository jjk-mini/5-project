const asyncHandler = require("express-async-handler");

const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Billing = require("../models/Billing");

// =====================================================
// Dashboard Stats
// GET /api/reports/dashboard
// =====================================================

const getDashboardStats = asyncHandler(async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [rooms, bookingsToday, revenueAgg] =
    await Promise.all([
      Room.find({}, "status"),

      Booking.countDocuments({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        status: {
          $ne: "cancelled",
        },
      }),

      Booking.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
            status: {
              $ne: "cancelled",
            },
          },
        },

        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

  const totalRooms = rooms.length;

  const occupiedRooms = rooms.filter(
    (room) => room.status === "occupied"
  ).length;

  const occupancyRate = totalRooms
    ? Math.round((occupiedRooms / totalRooms) * 100)
    : 0;

  const revenueToday = revenueAgg[0]?.total || 0;

  const roomStatusCounts = rooms.reduce((acc, room) => {
    acc[room.status] =
      (acc[room.status] || 0) + 1;

    return acc;
  }, {});

  const roomStatus = [
    {
      name: "Occupied",
      value: roomStatusCounts.occupied || 0,
    },
    {
      name: "Available",
      value: roomStatusCounts.available || 0,
    },
    {
      name: "Cleaning",
      value: roomStatusCounts.cleaning || 0,
    },
    {
      name: "Maintenance",
      value: roomStatusCounts.maintenance || 0,
    },
  ];

  // Last 7 days occupancy
  const days = [];

  for (let i = 6; i >= 0; i -= 1) {
    const dayStart = new Date();

    dayStart.setHours(0, 0, 0, 0);

    dayStart.setDate(
      dayStart.getDate() - i
    );

    const dayEnd = new Date(dayStart);

    dayEnd.setHours(23, 59, 59, 999);

    days.push({
      dayStart,
      dayEnd,
    });
  }

  const weeklyOccupancy = await Promise.all(
    days.map(
      async ({ dayStart, dayEnd }) => {
        const occupiedThatDay =
          await Booking.countDocuments({
            checkIn: {
              $lte: dayEnd,
            },

            checkOut: {
              $gte: dayStart,
            },

            status: {
              $in: [
                "confirmed",
                "checked-in",
                "checked-out",
              ],
            },
          });

        const occupancy = totalRooms
          ? Math.round(
              (occupiedThatDay / totalRooms) *
                100
            )
          : 0;

        return {
          day: dayStart.toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          ),

          occupancy,
        };
      }
    )
  );

  res.json({
    success: true,

    stats: {
      occupancyRate,
      revenueToday,
      totalRooms,
      bookingsToday,
    },

    roomStatus,

    weeklyOccupancy,
  });
});


const getRevenueByRoomType = asyncHandler(
  async (req, res) => {
    const results =
      await Booking.aggregate([
        {
          $match: {
            status: {
              $ne: "cancelled",
            },
          },
        },

        {
          $lookup: {
            from: "rooms",
            localField: "room",
            foreignField: "_id",
            as: "roomInfo",
          },
        },

        {
          $unwind: "$roomInfo",
        },

        {
          $group: {
            _id: "$roomInfo.type",

            amount: {
              $sum: "$totalAmount",
            },
          },
        },

        {
          $sort: {
            amount: -1,
          },
        },
      ]);

    const totalRevenue = results.reduce(
      (sum, result) =>
        sum + result.amount,
      0
    );

    const roomRevenue = results.map(
      (result) => ({
        type: result._id,

        amount: result.amount,

        pct: totalRevenue
          ? Math.round(
              (result.amount /
                totalRevenue) *
                100
            )
          : 0,
      })
    );

    res.json({
      success: true,
      roomRevenue,
    });
  }
);


const getExtraChargesBreakdown =
  asyncHandler(async (req, res) => {
    const results =
      await Billing.aggregate([
        {
          $unwind: "$charges",
        },

        {
          $match: {
            "charges.label": {
              $not: /room charge/i,
            },
          },
        },

        {
          $group: {
            _id: "$charges.label",

            amount: {
              $sum: "$charges.amount",
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            amount: -1,
          },
        },
      ]);

    const extraCharges = results.map(
      (result) => ({
        label: result._id,

        amount: result.amount,

        count: result.count,
      })
    );

    res.json({
      success: true,
      extraCharges,
    });
  });


const getMonthlyReport = asyncHandler(
  async (req, res) => {
    const year = req.query.year
      ? parseInt(req.query.year, 10)
      : new Date().getFullYear();

    const totalRooms =
      await Room.countDocuments();

    const months = [];

    for (let month = 0; month < 12; month += 1) {
      months.push({
        monthStart: new Date(
          year,
          month,
          1,
          0,
          0,
          0,
          0
        ),

        monthEnd: new Date(
          year,
          month + 1,
          0,
          23,
          59,
          59,
          999
        ),

        monthIndex: month,
      });
    }

    const monthlyData = await Promise.all(
      months.map(
        async ({
          monthStart,
          monthEnd,
          monthIndex,
        }) => {
          const [
            revenueAgg,
            bookingsCount,
            occupiedCount,
          ] = await Promise.all([
            Booking.aggregate([
              {
                $match: {
                  createdAt: {
                    $gte: monthStart,
                    $lte: monthEnd,
                  },

                  status: {
                    $ne: "cancelled",
                  },
                },
              },

              {
                $group: {
                  _id: null,

                  total: {
                    $sum: "$totalAmount",
                  },
                },
              },
            ]),

            Booking.countDocuments({
              createdAt: {
                $gte: monthStart,
                $lte: monthEnd,
              },

              status: {
                $ne: "cancelled",
              },
            }),

            Booking.countDocuments({
              checkIn: {
                $lte: monthEnd,
              },

              checkOut: {
                $gte: monthStart,
              },

              status: {
                $in: [
                  "confirmed",
                  "checked-in",
                  "checked-out",
                ],
              },
            }),
          ]);

          return {
            month: monthStart.toLocaleDateString(
              "en-US",
              {
                month: "short",
              }
            ),

            revenue:
              revenueAgg[0]?.total || 0,

            bookings: bookingsCount,

            occupancy: totalRooms
              ? Math.round(
                  (occupiedCount /
                    totalRooms) *
                    100
                )
              : 0,

            current:
              monthIndex ===
                new Date().getMonth() &&
              year ===
                new Date().getFullYear(),
          };
        }
      )
    );

    res.json({
      success: true,
      monthlyData,
    });
  }
);


module.exports = {
  getDashboardStats,
  getRevenueByRoomType,
  getExtraChargesBreakdown,
  getMonthlyReport,
};