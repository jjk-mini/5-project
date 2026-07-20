import axiosClient from "./AxiosClient";

export const submitContactForm = async (formData) => {
  const response = await axiosClient.post("/contact", formData);
  return response.data;
};