import axiosClient from "./AxiosClient";

// Get all rooms
export const getAllRooms = async () => {
  const response = await axiosClient.get("/rooms");
  return response.data;
};

// Get one room
export const getRoomById = async (id) => {
  const response = await axiosClient.get(`/rooms/${id}`);
  return response.data;
};

// Create room
export const createRoom = async (roomData) => {
  const response = await axiosClient.post("/rooms", roomData);
  return response.data;
};

// Update room
export const updateRoom = async (id, roomData) => {
  const response = await axiosClient.put(`/rooms/${id}`, roomData);
  return response.data;
};

// Delete room
export const deleteRoom = async (id) => {
  const response = await axiosClient.delete(`/rooms/${id}`);
  return response.data;
};

// Default export
const roomApi = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};

export default roomApi;