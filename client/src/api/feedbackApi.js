// Axios calls — submit and get feedback
import axiosClient from "./AxiosClient";

export const addFeedback = (data) => axiosClient.post("/feedback", data);