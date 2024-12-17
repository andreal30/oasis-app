import { useFormik } from "formik";
import PropTypes from "prop-types";
import FlatSchema from "./FlatSchema";
import { createFlat, updateFlat } from "../../services/flatService";
import {
  deleteFlatImageFirebase,
  // uploadFlatImageFirebase,
} from "../../services/firebase";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadImage } from "../../utils/images";
import { Toast } from "primereact/toast";
import { formatDate } from "../../utils/date";
import { Calendar, CalendarBlank, CalendarStar } from "@phosphor-icons/react";
import MessageErrors from "../Commons/Inputs/MessageErrors";
import { FloatLabel } from "primereact/floatlabel";
import GeneralInput from "../Commons/Inputs/GeneralInput";
import { InputSwitch } from "primereact/inputswitch";
import LoadingSkeleton from "../Commons/Misc/LoadingSkeleton";
import MainButton from "../Commons/Buttons/MainButton";
import { FileUpload } from "primereact/fileupload";
import { toInt } from "validator";
import ImageCropper from "../Commons/Misc/ImageCropper";

const today = new Date();
let minDate = new Date(today);
let maxDate = new Date(today);
const minYear = new Date(1900, 0, 1);
const maxYear = new Date(new Date().getFullYear(), 11, 31); // Current year

maxDate.setFullYear(today.getFullYear() + 2);

const validationSchema = FlatSchema({
  city: true,
  streetName: true,
  streetNumber: true,
  areaSize: true,
  yearBuilt: true,
  rentPrice: true,
  dateAvailable: true,
  rooms: true,
  bathrooms: true,
});

const FlatForm = ({ flat, onClose, setUpdated }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file temporarily
  const [showCropper, setShowCropper] = useState(false); // To control the cropper visibility
  const toast = useRef(null);
  const navigate = useNavigate();

  const location = useLocation();

  const currentPath = location.pathname;

  const initialValues = {
    city: flat?.city || "",
    streetName: flat?.streetName || "",
    streetNumber: flat?.streetNumber || "",
    areaSize: flat?.areaSize || "",
    hasAC: flat?.hasAC || false,
    yearBuilt: formatDate(flat?.yearBuilt) || "",
    rentPrice: flat?.rentPrice || "",
    dateAvailable: formatDate(flat?.dateAvailable) || "",
    image: flat?.image || "",
    rooms: flat?.rooms || "",
    bathrooms: flat?.bathrooms || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      setSuccess(null);
      setLoading(true);

      console.log("1. FLAT FORM SERVICE: values", values);

      try {
        let imageUrl = flat?.image || "";

        if (formik.values.image) {
          if (flat?.image) {
            await deleteFlatImageFirebase(flat.image); // Delete existing profile image
          }
          imageUrl = formik.values.image; // Use the new uploaded image URL
        }

        if (!flat) {
          const newFlat = { ...(values || ""), image: imageUrl };
          const response = await createFlat(newFlat);
          console.log("3. FLAT FORM SERVICE: createFlat response", response);

          if (response.status === 200) {
            setSuccess(`Flat created successfully!`);
            setTimeout(() => {
              navigate("/my-flats");
            }, 2000);
          }
        } else {
          const updatedFlat = { ...flat, ...values, image: imageUrl };
          const response = await updateFlat(flat._id, updatedFlat);
          console.log("4. FLAT FORM SERVICE: updateFlat response", response);
          if (response.status === 200) {
            setSuccess(`Flat has been updated successfully!`);
            setTimeout(() => {
              if (currentPath.includes("/new")) {
                // Navigate to '/home'
                navigate("/my-flats");
              } else if (currentPath.includes("/edit-users")) {
                setUpdated((prev) => !prev); // Notify parent to refresh
                onClose(); // Close the dialog
              }
            }, 2000);
          }
        }
      } catch (err) {
        console.error("Login failed:", err);
        setError(
          err.response?.data?.message ||
            "Oops! Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
        // setSubmitting(false);
      }
    },
  });

  const handleUploadImage = async ({ files }) => {
    const file = files?.[0];
    if (!file) {
      console.error("No valid file received");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Please select an image.");
      return;
    }

    console.log("File validated:", file.name);
    setSelectedFile(file); // Temporarily store file
    setShowCropper(true); // Show the cropper
  };

  toast.current.show({
    severity: { error: "error", success: "success" },
    summary: { error: "Error", success: "Congratulations!" },
    detail: error || success,
  });

  return (
    <>
      <Toast ref={toast} />
      <form
        id='FlatForm'
        onSubmit={formik.handleSubmit}
        className='w-full flex flex-column gap-3'
      >
        {/* Street Number and Street Name */}
        <div className='flex gap-3 w-full flex-column md:flex-row'>
          {/* Street Number */}
          <GeneralInput
            id='streetNumber'
            name='streetNumber'
            value={formik.values.streetNumber}
            onChange={formik.handleChange}
            iconClass='hashtag'
            label='Street Number'
            type='number'
          />

          {formik.touched.streetNumber && formik.errors.streetNumber ? (
            <MessageErrors
              error={formik.errors.streetNumber}
              touched={formik.touched.streetNumber}
            />
          ) : (
            <div className='mt-0'></div>
          )}

          {/* Street Name */}
          <GeneralInput
            id='streetName'
            name='streetName'
            value={formik.values.streetName}
            onChange={formik.handleChange}
            iconPh='MapTrifold'
            label='Street Name'
            type='number'
          />

          {formik.touched.streetName && formik.errors.streetName ? (
            <MessageErrors
              error={formik.errors.streetName}
              touched={formik.touched.streetName}
            />
          ) : (
            <div className='mt-0'></div>
          )}
        </div>

        {/* City and Price */}
        <div className='flex gap-3 w-full flex-column md:flex-row'>
          {/* City */}
          <GeneralInput
            id='city'
            name='city'
            value={formik.values.city}
            onChange={formik.handleChange}
            iconClass='user'
            label='City'
            type='text'
          />

          {formik.touched.city && formik.errors.city ? (
            <MessageErrors
              error={formik.errors.city}
              touched={formik.touched.city}
            />
          ) : (
            <div className='mt-0'></div>
          )}

          {/* Price */}
          <GeneralInput
            id='rentPrice'
            name='rentPrice'
            value={formik.values.rentPrice}
            onChange={formik.handleChange}
            iconClass='dollar'
            label='Price'
            type='number'
          />

          {formik.touched.rentPrice && formik.errors.rentPrice ? (
            <MessageErrors
              error={formik.errors.rentPrice}
              touched={formik.touched.rentPrice}
            />
          ) : (
            <div className='mt-0'></div>
          )}
        </div>

        {/* Year and Date Available */}
        <div className='flex gap-3 w-full flex-column md:flex-row'>
          {/* Year */}
          <FloatLabel>
            <div className='p-inputgroup'>
              <span className='p-inputgroup-addon bg-transparent z-5 calendar-icon'>
                <CalendarBlank />
              </span>
              <Calendar
                inputId='yearBuilt'
                name='yearBuilt'
                value={formik.values.yearBuilt}
                // onChange={(e) => handleBirthdayChange(e.value)}
                onChange={(e) =>
                  formik.setFieldValue("yearBuilt", toInt(e.value))
                }
                inputStyle={{
                  borderLeft: "none",
                  borderRadius: "30px",
                  paddingInlineStart: "2.75rem",
                }}
                minDate={minYear}
                maxDate={maxYear}
                view='year'
                dateFormat='yy'
                // yearNavigator
                className='input-main w-full'
              />
            </div>
            <label htmlFor='yearBuilt' className='left-3 text-400'>
              Year Built
            </label>
          </FloatLabel>

          {formik.touched.yearBuilt && formik.errors.yearBuilt ? (
            <MessageErrors
              error={formik.errors.yearBuilt}
              touched={formik.touched.yearBuilt}
            />
          ) : (
            <div className='mt-0'></div>
          )}
        </div>

        {/* Date Available */}
        <div className='flex gap-3 w-full flex-column md:flex-row'>
          <FloatLabel>
            <div className='p-inputgroup'>
              <span className='p-inputgroup-addon bg-transparent z-5 calendar-icon'>
                <CalendarStar />
              </span>
              <Calendar
                inputId='dateAvailable'
                name='dateAvailable'
                value={formik.values.birthDate}
                // onChange={(e) => handleBirthdayChange(e.value)}
                onChange={(e) => formik.setFieldValue("dateAvailable", e.value)}
                inputStyle={{
                  borderLeft: "none",
                  borderRadius: "30px",
                  paddingInlineStart: "2.75rem",
                }}
                minDate={minDate}
                maxDate={maxDate}
                dateFormat='dd/mm/yy'
                className='input-main w-full'
              />
            </div>
            <label htmlFor='dateAvailable' className='left-3 text-400'>
              Date Available
            </label>
          </FloatLabel>

          {formik.touched.dateAvailable && formik.errors.dateAvailable ? (
            <MessageErrors
              error={formik.errors.dateAvailable}
              touched={formik.touched.dateAvailable}
            />
          ) : (
            <div className='mt-0'></div>
          )}
        </div>

        {/* Rooms and Bathrooms */}
        <div className='flex gap-3 w-full flex-column md:flex-row'>
          {/* Rooms */}
          <GeneralInput
            id='rooms'
            name='rooms'
            value={formik.values.rooms}
            onChange={formik.handleChange}
            iconPh='Bed'
            label='Rooms'
            type='number'
          />

          {formik.touched.rooms && formik.errors.rooms ? (
            <MessageErrors
              error={formik.errors.rooms}
              touched={formik.touched.rooms}
            />
          ) : (
            <div className='mt-0'></div>
          )}

          {/* Bathrooms */}
          <GeneralInput
            id='bathrooms'
            name='bathrooms'
            value={formik.values.bathrooms}
            onChange={formik.handleChange}
            iconPh='Bathtub'
            label='Bathrooms'
            type='number'
          />

          {formik.touched.bathrooms && formik.errors.bathrooms ? (
            <MessageErrors
              error={formik.errors.bathrooms}
              touched={formik.touched.bathrooms}
            />
          ) : (
            <div className='mt-0'></div>
          )}
        </div>

        {/* Area Size and Price */}
        <div className='flex gap-3 w-full flex-column md:flex-row'>
          {/* Area Size */}
          <GeneralInput
            id='areaSize'
            name='areaSize'
            value={formik.values.areaSize}
            onChange={formik.handleChange}
            iconClass='expand'
            label='Area Size'
            type='number'
          />

          {formik.touched.areaSize && formik.errors.areaSize ? (
            <MessageErrors
              error={formik.errors.areaSize}
              touched={formik.touched.areaSize}
            />
          ) : (
            <div className='mt-0'></div>
          )}

          {/* Has AC */}
          <div className='w-full justify-content-start align-items-center gap-2 flex '>
            <InputSwitch
              checked={formik.values.hasAc}
              onChange={(e) => formik.setFieldValue("hasAc", e.value)}
              inputId='hasAC'
            />
            <label htmlFor='hasAC'>Has AC</label>
          </div>
        </div>

        <FileUpload
          name='demo[]'
          multiple={false}
          accept='image/*'
          maxFileSize={2000000}
          emptyTemplate={
            <p className='m-0'>Drag and drop images here to upload.</p>
          }
          chooseLabel={flat ? "Update Photo" : "Upload Photo"}
          customUpload
          auto
          uploadHandler={handleUploadImage}
          onBeforeUpload={() => console.log("Before upload triggered")}
          onUpload={() => console.log("Upload successful")}
          onError={(e) => console.error("Upload error:", e)}
        />

        {selectedFile && showCropper && (
          <div className='modal-overlay'>
            <div className='modal-content'>
              <h3>Crop Your Image</h3>
              <ImageCropper
                file={selectedFile}
                aspect={16 / 9} // Pass aspect directly
                onComplete={async (croppedBlob) => {
                  try {
                    const processedFile = new File(
                      [croppedBlob],
                      selectedFile.name,
                      {
                        type: selectedFile.type,
                      }
                    );

                    const { downloadURL } = await uploadImage(
                      processedFile,
                      "user"
                    );

                    formik.setFieldValue("image", downloadURL);
                    setShowCropper(false);
                    setSelectedFile(null);

                    toast.current.show({
                      severity: "success",
                      summary: "Success",
                      detail: "Image uploaded successfully!",
                    });
                  } catch (error) {
                    console.error("Error uploading cropped image:", error);
                    toast.current.show({
                      severity: "error",
                      summary: "Error",
                      detail: "Failed to upload cropped image.",
                    });
                  }
                }}
              />
              <MainButton
                label='Cancel'
                onClick={() => {
                  setShowCropper(false);
                  setSelectedFile(null);
                }}
              />
            </div>
          </div>
        )}

        <LoadingSkeleton loading={loading}>
          <MainButton
            label={!flat ? "Create Flat" : "Update Flat"}
            type='submit'
            disabled={loading}
          />
        </LoadingSkeleton>
      </form>
    </>
  );
};

FlatForm.propTypes = {
  flat: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
};

export default FlatForm;
