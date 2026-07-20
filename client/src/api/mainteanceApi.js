import axiosClient from "./AxiosClient";

const maintenanceApi = {
  // Guest: create a request. Body: { bookingId, issueType, description, priority }
  create: (data) => axiosClient.post("/maintenance", data),

  // Guest: own requests
  getMine: () => axiosClient.get("/maintenance/mine"),

  // Staff: all requests, optional ?status= filter
  getAll: (status) =>
    axiosClient.get("/maintenance", { params: status ? { status } : {} }),

  // Staff: update status (Open / In Progress / Resolved)
  updateStatus: (id, status) =>
    axiosClient.patch(`/maintenance/${id}/status`, { status }),
};

export default maintenanceApi;
