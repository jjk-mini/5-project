// Axios calls — staff management

import axiosClient from "./AxiosClient";

// Get logged-in user profile
export const getMyProfile = async () => {
  const response = await axiosClient.get("/users/profile/");
  return response.data;
};

// Update profile information
export const updateMyProfile = async (profileData) => {
  const response = await axiosClient.put(
    "/users/profile/",
    profileData
  );
  return response.data;
};

// Upload profile image
export const uploadProfileImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("profileImage", imageFile);

  const response = await axiosClient.put(
    "/users/profile/image",
    formData
  );

  return response.data;
};
// Change password
export const changePassword = async (passwordData) => {
  const response = await axiosClient.put(
    "/users/change-password",
    passwordData
  );

  return response.data;
};