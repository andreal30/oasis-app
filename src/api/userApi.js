import axiosInstance from "../utils/axios";

export const validateUniqueApi = async (field, value) => {
  return await axiosInstance.post("/users/validate-unique", { field, value });
};

export const updateUserProfileApi = async (userId, updatedData) => {
  return await axiosInstance.put(`/users/${userId}`, updatedData);
};

export const fetchAllUsersApi = async () => {
  return await axiosInstance.get("/users");
};

export const getUserEmailApi = async (userEmail) => {
  return await axiosInstance.post(`/users/email`, { email: { userEmail } });
};

export const getUserByIdApi = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};
