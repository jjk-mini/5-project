import axiosClient from "./AxiosClient";

export const authApi = {
  register: (data) => axiosClient.post("/auth/register", data),
  login: (data) => axiosClient.post("/auth/login", data),
  getCurrentUser: () => axiosClient.get("/auth/me"),
};
export const registerUser = (userData) => {
  return axiosClient.post("/auth/register", userData);
};

export const getUsers = (params) => {
  return axiosClient.get("/users", { params });
};