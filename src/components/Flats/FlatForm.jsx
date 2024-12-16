import { useFormik } from "formik";
import PropTypes from "prop-types";
import FlatSchema from "./FlatSchema";
import { createFlat, updateFlat } from "../../services/flatService";
import {
  deleteFlatImageFirebase,
  uploadFlatImageFirebase,
} from "../../services/firebase";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const FlatForm = (initialFlat, isEditing = false, setUpdated) => {
  const [flatFile, setFlatFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const initialValues = {
    city: initialFlat?.city || "",
    streetName: initialFlat?.streetName || "",
    streetNumber: initialFlat?.streetNumber || "",
    areaSize: initialFlat?.areaSize || "",
    hasAC: initialFlat?.hasAC || false,
    yearBuilt: formatDate(initialFlat?.yearBuilt) || "",
    rentPrice: initialFlat?.rentPrice || "",
    dateAvailable: formatDate(initialFlat?.dateAvailable) || "",
    image: initialFlat?.image || "",
    rooms: initialFlat?.rooms || "",
    bathrooms: initialFlat?.bathrooms || "",
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
        let imageUrl = initialFlat?.image || "";
        console.log("2. FLAT FORM SERVICE: flatFile", flatFile);
        if (flatFile) {
          if (initialFlat?.image) {
            await deleteFlatImageFirebase(initialFlat?.image); // Delete existing profile image
          }
          imageUrl = await uploadFlatImageFirebase(flatFile); // Upload new resized image
        }

        if (!isEditing) {
          const response = await createFlat(values);
          console.log("3. FLAT FORM SERVICE: createFlat response", response);

          if (response.status === 200) {
            setSuccess(`Flat created successfully!`);
            setTimeout(() => {
              navigate("/my-flats");
            }, 2000);
          }
        } else {
          const response = await updateFlat(values, imageUrl);
          console.log("4. FLAT FORM SERVICE: updateFlat response", response);
          if (response.status === 200) {
            setSuccess(`Flat updated successfully!`);
            setTimeout(() => {
              setUpdated(true);
            }, 1500);
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
    try {
      const file = files[0];
      if (!file) {
        throw new Error("No file selected.");
      }

      const { downloadURL, resizedBuffer } = await uploadImage(file, "flat");

      setSuccess("Image uploaded successfully!");
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Image uploaded successfully!",
      });

      console.log("Image URL:", downloadURL);

      // Notify parent component of success
      formik.setFieldValue("image", downloadURL);
      setFlatFile(resizedBuffer);
    } catch (error) {
      setError(error.message || "Failed to upload image.");
      console.error("Image upload error:", error);

      // Notify parent component of failure
      console.error("User image upload error:", error);
    }
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
                  formik.setFieldValue("yearBuilt", toString(e.value))
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
            <p className='m-0'>Drag and drop images to here to upload.</p>
          }
          chooseLabel={initialFlat ? "Update Photo" : "Upload Photo"}
          customUpload
          auto
          uploadHandler={handleUploadImage}
        />

        <LoadingSkeleton loading={loading}>
          <MainButton
            label={!initialFlat ? "Create Flat" : "Update Flat"}
            type='submit'
            disabled={loading}
          />
        </LoadingSkeleton>
      </form>
    </>
  );
};

FlatForm.propTypes = {
  flatId: PropTypes.string,
  initialFlat: PropTypes.object,
  isEditing: PropTypes.bool,
  onFormSubmit: PropTypes.func,
};

export default FlatForm;
