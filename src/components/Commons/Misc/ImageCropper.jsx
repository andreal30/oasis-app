import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Pica from "pica";
import PropTypes from "prop-types";

const pica = Pica();

const ImageCropper = ({ file, aspect, onComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImage = async () => {
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });

    const image = await createImage(URL.createObjectURL(file));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const { width, height, x, y } = croppedAreaPixels;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    // Resize with Pica
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = aspect === 16 / 9 ? 550 : 300; // Conditional resize
    resizedCanvas.height = aspect === 16 / 9 ? 310 : 300;

    await pica.resize(canvas, resizedCanvas);

    resizedCanvas.toBlob(
      (blob) => {
        if (blob) onComplete(blob);
      },
      "image/jpeg",
      0.9
    );
  };

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <Cropper
          image={URL.createObjectURL(file)}
          crop={crop}
          zoom={zoom}
          aspect={aspect} // Aspect passed directly
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <button onClick={getCroppedImage} className='p-button mt-3'>
        Crop & Upload
      </button>
    </div>
  );
};

ImageCropper.propTypes = {
  file: PropTypes.object.isRequired,
  aspect: PropTypes.number.isRequired, // Ensure aspect is passed
  onComplete: PropTypes.func.isRequired,
};

export default ImageCropper;
