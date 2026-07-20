import axiosClient from "./AxiosClient";

// Get all staff
export const getStaff = async () => {
  const response = await axiosClient.get("/staff");
  return response.data;
};

// Create staff
export const createStaff = async (data) => {
  const response = await axiosClient.post("/staff", data);
  return response.data;
};

// Update staff
export const updateStaff = async (id, data) => {
  const response = await axiosClient.put(`/staff/${id}`, data);
  return response.data;
};

// Delete staff
export const deleteStaff = async (id) => {
  const response = await axiosClient.delete(`/staff/${id}`);
  return response.data;
};

// Default export
const staffApi = {
  getAllStaff: getStaff,
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
};

export default staffApi;