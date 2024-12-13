// export const fetchUserData = async () => {
//   try {
//     const user = await userApi.fetchUserData();
//     return user;
//   } catch (error) {
//     console.error("Failed to fetch user data:", error);
//     throw error;
//   }
// };

import {
  fetchAllUsersApi,
  getUserByIdApi,
  getUserEmailApi,
  updateUserProfileApi,
  validateUniqueApi,
} from "../api/userApi";

export const validateUnique = async (field, value) => {
  try {
    return await validateUniqueApi(field, value);
  } catch (error) {
    console.error("Error validating uniqueness:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updatedData) => {
  try {
    const updatedUser = await updateUserProfileApi(userId, updatedData);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const users = await fetchAllUsersApi();
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await getUserByIdApi(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await getUserEmailApi(email);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

// export const fetchAdminData = async () => {
//   const response = await axios.get("/auth/admin", {
//     withCredentials: true, // Ensures cookies are included
//   });

//   // Optionally, store any part of the response data if needed
//   const adminData = response.data;
//   localStorage.setItem("admin", JSON.stringify(adminData)); // Example: Save user data to localStorage (optional)

//   return adminData;
// };
