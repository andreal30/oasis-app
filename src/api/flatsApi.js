import axiosInstance from "../utils/axios";

// Fetch a list of flats (supports pagination and filters)
export const getFlatsApi = async () => {
  return axiosInstance.get("/flats");
};

// Fetch a single flat by ID
export const getFlatByIdApi = async (flatId) => {
  console.log("2. GET FLAT BY ID API: fetching flat");
  return axiosInstance.get(`/flats/${flatId}`);
};

// Create a new flat
export const createFlatApi = async (flatData) => {
  return axiosInstance.post("/flats", flatData);
};

// Update a flat by ID
export const updateFlatApi = async (flatId, updatedData) => {
  return axiosInstance.put(`/flats/${flatId}`, updatedData);
};

// Delete a flat by ID
export const deleteFlatApi = async (flatId) => {
  return axiosInstance.delete(`/flats/${flatId}`);
};
