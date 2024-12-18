import {
  uploadFlatImageFirebase,
  uploadProfileImageFirebase,
} from "../services/firebase";

// Upload image to Firebase and return the download URL
export const uploadImage = async (file, type) => {
  try {
    // Choose upload function based on type
    const uploadFunction =
      type === "flat" ? uploadFlatImageFirebase : uploadProfileImageFirebase;

    const downloadURL = await uploadFunction(file);
    return { downloadURL, processedFile: file };
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
