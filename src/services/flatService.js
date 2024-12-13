import * as flatApi from "../api/flatApi";

// Fetch a list of flats with error handling
export const fetchFlats = async (filters = {}, page = 1) => {
  try {
    const response = await flatApi.fetchFlats(filters, page);
    return response.data; // Return the list of flats and metadata
  } catch (error) {
    console.error("Error fetching flats:", error);
    throw error;
  }
};

// Fetch a single flat by ID
export const fetchFlatById = async (flatId) => {
  try {
    const response = await flatApi.fetchFlatById(flatId);
    return response.data; // Return the flat details
  } catch (error) {
    console.error(`Error fetching flat with ID ${flatId}:`, error);
    throw error;
  }
};

// Create a new flat
export const createFlat = async (flatData) => {
  try {
    const response = await flatApi.createFlat(flatData);
    return response.data; // Return the newly created flat
  } catch (error) {
    console.error("Error creating flat:", error);
    throw error;
  }
};

// Update a flat by ID
export const updateFlat = async (flatId, updatedData) => {
  try {
    const response = await flatApi.updateFlat(flatId, updatedData);
    return response.data; // Return the updated flat
  } catch (error) {
    console.error(`Error updating flat with ID ${flatId}:`, error);
    throw error;
  }
};

// Delete a flat by ID
export const deleteFlat = async (flatId) => {
  try {
    const response = await flatApi.deleteFlat(flatId);
    return response.data; // Return confirmation of deletion
  } catch (error) {
    console.error(`Error deleting flat with ID ${flatId}:`, error);
    throw error;
  }
};
