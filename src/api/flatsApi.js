import axios from "../utils/axios";

// Fetch a list of flats (supports pagination and filters)
export const fetchFlats = async (filters = {}, page = 1) => {
  return axios.get("/flats", { params: { ...filters, page } });
};

// Fetch a single flat by ID
export const fetchFlatById = async (flatId) => {
  return axios.get(`/flats/${flatId}`);
};

// Create a new flat
export const createFlat = async (flatData) => {
  return axios.post("/flats", flatData);
};

// Update a flat by ID
export const updateFlat = async (flatId, updatedData) => {
  return axios.put(`/flats/${flatId}`, updatedData);
};

// Delete a flat by ID
export const deleteFlat = async (flatId) => {
  return axios.delete(`/flats/${flatId}`);
};
