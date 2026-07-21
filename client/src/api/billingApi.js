// Axios calls — billing and invoices
import axiosClient from "./AxiosClient";

const billingApi = {
  getByBookingId: (bookingId) =>
    axiosClient.get(`/billing/booking/${bookingId}`),

  getById: (id) => axiosClient.get(`/billing/${id}`),

  getAll: (params) => axiosClient.get("/billing", { params }),

  create: (data) => axiosClient.post("/billing", data),

  update: (id, data) => axiosClient.put(`/billing/${id}`, data),

  pay: (id, data) => axiosClient.patch(`/billing/${id}/pay`, data),
};

export default billingApi;