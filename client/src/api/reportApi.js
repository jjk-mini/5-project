import axiosClient from "./AxiosClient";

const reportApi = {
  getDashboardStats: () => axiosClient.get("/reports/dashboard"),
  getRevenueByRoomType: () => axiosClient.get("/reports/revenue-by-room-type"),
  getExtraCharges: () => axiosClient.get("/reports/extra-charges"),
  getMonthlyReport: (year) => axiosClient.get("/reports/monthly", { params: { year } }),
  getInvoices: () => axiosClient.get("/billing"), // uses your existing billingRoutes.js
};

export default reportApi;

