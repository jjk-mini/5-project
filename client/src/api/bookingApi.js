import axiosClient from "./AxiosClient";

const bookingApi = {
  getAll: () =>
    axiosClient.get("/bookings"),

  getById: (id) =>
    axiosClient.get(`/bookings/${id}`),

  create: (data) =>
    axiosClient.post("/bookings", data),

  updateStatus: (id, status) =>
    axiosClient.patch(`/bookings/${id}/status`, { status }),

  cancel: (id) =>
    axiosClient.patch(`/bookings/${id}/status`, { status: "cancelled" }),

  getByGuest: (guestId) =>
    axiosClient.get(`/bookings/guest/${guestId}`),

  delete: (id) =>
    axiosClient.delete(`/bookings/${id}`),

  getByRoom: (roomId) =>
    axiosClient.get(`/bookings/room/${roomId}`),

  getTodayActivity: () =>
    axiosClient.get("/bookings/today"),
};

export default bookingApi;