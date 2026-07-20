import axiosClient from "./AxiosClient";

const notificationApi = {
  // { notifications, unreadCount }
  getMine: () => axiosClient.get("/notifications"),

  markAsRead: (id) => axiosClient.patch(`/notifications/${id}/read`),

  markAllAsRead: () => axiosClient.patch("/notifications/read-all"),
};

export default notificationApi;
