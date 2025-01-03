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
  addFlatFavouriteApi,
  allowAdminApi,
  deleteUserApi,
  denyAdminApi,
  getAllUsersApi,
  getUserByIdApi,
  removeFlatFavouriteApi,
  updateUserProfileApi,
  validateUniqueApi,
} from "../api/userApi";
import { getLocal } from "../utils/localStorage";

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

export const getAllUsers = async () => {
  try {
    const users = await getAllUsersApi();
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

export const deleteUser = async (userId) => {
  try {
    const response = await deleteUserApi(userId);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const allowAdmin = async (userId) => {
  try {
    const response = await allowAdminApi(userId);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

export const denyAdmin = async (userId) => {
  try {
    const response = await denyAdminApi(userId);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

export const resetFiltersAndSorting = async () => {
  const response = await getAllUsersApi();
  if (!response.ok) throw new Error("Failed to reset filters and sorting");
  return await response.json();
};

export const filterAndSortUsers = async (filters, sortOptions) => {
  const queryParams = new URLSearchParams({
    ...filters,
    ...sortOptions,
  }).toString();
  const response = await getAllUsersApi(queryParams);
  if (!response.ok) throw new Error("Failed to filter and sort users");
  return await response.json();
};

export const toggleFavourites = async (flatId) => {
  const user = getLocal("loggedInUser");

  const isFavourite = user.favouriteFlats.includes(flatId);
  if (!isFavourite) {
    await removeFlatFavouriteApi(flatId);
  } else {
    await addFlatFavouriteApi(flatId);
  }
  return isFavourite;
};

// export const filterUsers = async (filters) => {
//   const queryParams = new URLSearchParams(filters).toString();
//   const response = await fetch(`/api/users/filter?${queryParams}`);
//   if (!response.ok) throw new Error("Failed to filter users");
//   return await response.json();
// };

// export const sortUsers = async (sortField, sortOrder) => {
//   const queryParams = new URLSearchParams({ sortField, sortOrder }).toString();
//   const response = await fetch(`/api/users/sort?${queryParams}`);
//   if (!response.ok) throw new Error("Failed to sort users");
//   return await response.json();
// };

// export const fetchAdminData = async () => {
//   const response = await axios.get("/auth/admin", {
//     withCredentials: true, // Ensures cookies are included
//   });

//   // Optionally, store any part of the response data if needed
//   const adminData = response.data;
//   localStorage.setItem("admin", JSON.stringify(adminData)); // Example: Save user data to localStorage (optional)

//   return adminData;
// };
