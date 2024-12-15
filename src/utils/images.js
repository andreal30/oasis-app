import pica from "pica";
// import sharp from "sharp";

export const resizeImage = async (file) => {
  const picaInstance = pica();
  const canvas = document.createElement("canvas");
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    img.onload = async () => {
      try {
        // Calculate aspect ratio
        const aspectRatio = img.width / img.height;

        // Define desired dimensions
        canvas.width = 320;
        canvas.height = 320 / aspectRatio;

        // Resize the image
        await picaInstance.resize(img, canvas);

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob); // Return the resized image as a Blob
            } else {
              reject(new Error("Canvas to Blob conversion failed."));
            }
          },
          file.type, // Preserve file type
          0.9 // Optional quality factor
        );
      } catch (resizeError) {
        reject(new Error(`Image resizing failed: ${resizeError.message}`));
      }
    };

    img.onerror = () => reject(new Error("Failed to load image for resizing."));
  });
};

// export const resizeAndCropImage = async (fileBuffer) => {
//   return await sharp(fileBuffer)
//     .resize({
//       width: 2048,
//       height: 2048,
//       fit: sharp.fit.cover,
//     })
//     .toBuffer();
// };
