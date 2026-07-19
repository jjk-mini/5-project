import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Automatically attach JWT token
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // If uploading files with FormData,
  // Axios will automatically set the correct Content-Type.
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export default axiosClient;