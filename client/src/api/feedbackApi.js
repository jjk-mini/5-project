// Axios calls — submit and get feedback
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/feedback",
});

export const addFeedback = (data) => API.post("/", data);