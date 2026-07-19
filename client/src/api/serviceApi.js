import axiosClient from "./AxiosClient";

export const serviceApi = {
  getAll: (params) => axiosClient.get("/services", { params }), // { category, search, curated }
  getById: (id) => axiosClient.get(`/services/${id}`),
};