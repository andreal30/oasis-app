import {
  createFlatApi,
  deleteFlatApi,
  getFlatByIdApi,
  getFlatsApi,
  updateFlatApi,
} from "../api/flatsApi";

// Fetch a list of flats with error handling
export const getFlats = async () => {
  try {
    const response = await getFlatsApi();
    return response.data; // Return the list of flats and metadata
  } catch (error) {
    console.error("Error fetching flats:", error.message || error);
    throw new Error("Unable to fetch flats. Please try again later.");
  }
};

// Fetch a single flat by ID
export const getFlatById = async (flatId) => {
  console.log("1. GET FLAT BY ID SERVICE: flatId", flatId);
  try {
    const response = await getFlatByIdApi(flatId);
    console.log("2. GET FLAT BY ID SERVICE: response", response);
    return response.data; // Return the flat details
  } catch (error) {
    console.error(
      `Error fetching flat with ID ${flatId}:`,
      error.message || error
    );
    throw new Error(
      `Unable to fetch the flat with ID ${flatId}. Please try again later.`
    );
  }
};

// Create a new flat
export const createFlat = async (flatData) => {
  console.log("1. CREATE FLAT SERVICE: flatData", flatData);
  try {
    const response = await createFlatApi(flatData);
    console.log("2. CREATE FLAT SERVICE: response", response);
    return response.data; // Return the newly created flat
  } catch (error) {
    console.error("Error creating flat:", error.message || error);
    throw new Error(
      "Unable to create the flat. Please check your input and try again."
    );
  }
};

// Update a flat by ID
export const updateFlat = async (flatId, updatedData) => {
  console.log("1. UPDATE FLAT SERVICE: flatId", flatId);
  try {
    const response = await updateFlatApi(flatId, updatedData);
    console.log("2. UPDATE FLAT SERVICE: response", response);
    return response.data; // Return the updated flat
  } catch (error) {
    console.error(
      `Error updating flat with ID ${flatId}:`,
      error.message || error
    );
    throw new Error(
      `Unable to update the flat with ID ${flatId}. Please try again later.`
    );
  }
};

// Delete a flat by ID
export const deleteFlat = async (flatId) => {
  console.log("1. DELETE FLAT SERVICE: flatId", flatId);
  try {
    const response = await deleteFlatApi(flatId);
    console.log("2. DELETE FLAT SERVICE: response", response);
    return response.data; // Return confirmation of deletion
  } catch (error) {
    console.error(
      `Error deleting flat with ID ${flatId}:`,
      error.message || error
    );
    throw new Error(
      `Unable to delete the flat with ID ${flatId}. Please try again later.`
    );
  }
};
