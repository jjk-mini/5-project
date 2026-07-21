// Axios calls — housekeeping and maintenance
import axiosClient from "./AxiosClient";

const housekeepingApi = {
  // Get all housekeeping service requests
  getAllRequests: () =>
    axiosClient.get("/housekeeping"),

  // Get one request
  getRequestById: (id) =>
    axiosClient.get(`/housekeeping/${id}`),

  // Create a new housekeeping request
  createRequest: (data) =>
    axiosClient.post("/housekeeping", data),

  // Update only the status
  updateStatus: (id, status) =>
    axiosClient.patch(
      `/housekeeping/${id}/status`,
      { status }
    ),

  // Update complete request
  updateRequest: (id, data) =>
    axiosClient.put(
      `/housekeeping/${id}`,
      data
    ),

  // Delete request
  deleteRequest: (id) =>
    axiosClient.delete(
      `/housekeeping/${id}`
    ),
};

export default housekeepingApi;