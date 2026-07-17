import axiosClient from "./axiosClient";

export const orderApi = {
  create: (data) => axiosClient.post("/orders", data), // { items: [{serviceId, quantity}], specialInstructions }
  getMine: () => axiosClient.get("/orders/mine"),
};