import axiosClient from "./AxiosClient";

export const serviceApi = {
  getAll: (params) => axiosClient.get("/services", { params }), // { category, search, curated }
  getById: (id) => axiosClient.get(`/services/${id}`),

  // Admin/manager only — FormData because of the optional image upload
  create: (formData) =>
    axiosClient.post("/services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    axiosClient.put(`/services/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => axiosClient.delete(`/services/${id}`),
};