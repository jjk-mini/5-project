import axiosClient from "./AxiosClient";

export const orderApi = {
  create: (data) => axiosClient.post("/orders", data), // { items: [{serviceId, quantity}], specialInstructions }
  getMine: () => axiosClient.get("/orders/mine"),

  // Staff (admin/manager/receptionist): all guest service orders
  getAll: () => axiosClient.get("/orders"),
  updateStatus: (id, status) => axiosClient.patch(`/orders/${id}/status`, { status }),
};