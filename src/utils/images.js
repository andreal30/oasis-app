import Pica from "pica";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import {
  uploadFlatImageFirebase,
  uploadProfileImageFirebase,
} from "../services/firebase";

const pica = Pica();

// Resize and crop an image using Pica and CropperJS
export const resizeAndCropImage = async (file, type) => {
  const image = document.createElement("img");
  image.src = URL.createObjectURL(file);

  const canvas = document.createElement("canvas");
  const cropCanvas = document.createElement("canvas");
  document.body.appendChild(canvas); // Necessary for CropperJS to work

  return new Promise((resolve, reject) => {
    image.onload = async () => {
      try {
        // Determine dimensions and aspect ratio
        const aspectRatio = type === "flat" ? 16 / 9 : 1;
        const targetWidth = type === "flat" ? 550 : 300;
        const targetHeight =
          type === "flat" ? Math.round(550 / aspectRatio) : 300;

        // Crop the image using CropperJS
        const cropper = new Cropper(image, {
          aspectRatio,
          viewMode: 1,
        });

        const croppedCanvas = cropper.getCroppedCanvas();

        // Resize the cropped image using Pica
        cropCanvas.width = targetWidth;
        cropCanvas.height = targetHeight;

        await pica.resize(croppedCanvas, cropCanvas);

        // Convert the resized image to Blob
        cropCanvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob); // Return the processed image as a Blob
            } else {
              reject(new Error("Failed to convert canvas to Blob."));
            }
          },
          file.type, // Preserve file type
          0.9 // Quality
        );
      } catch (error) {
        reject(new Error(`Image processing failed: ${error.message}`));
      } finally {
        document.body.removeChild(canvas); // Clean up temporary canvas
      }
    };

    image.onerror = () => reject(new Error("Failed to load the image."));
  });
};

// Upload image to Firebase and return the download URL
export const uploadImage = async (file, type) => {
  try {
    const processedBlob = await resizeAndCropImage(file, type);

    // Convert Blob to File for Firebase
    const processedFile = new File([processedBlob], file.name, {
      type: file.type,
    });

    // Choose upload function based on type
    const uploadFunction =
      type === "flat" ? uploadFlatImageFirebase : uploadProfileImageFirebase;

    const downloadURL = await uploadFunction(processedFile);
    return { downloadURL, processedFile };
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
