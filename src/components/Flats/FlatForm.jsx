import { useFormik } from "formik";
import PropTypes from "prop-types";
import FlatSchema from "./FlatSchema";
import { createFlat, updateFlat } from "../../services/flatService";
import {
  uploadFlatImageFirebase,
  deleteFlatImageFirebase,
} from "../../services/firebase";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import GeneralInput from "../Commons/Inputs/GeneralInput";
import MessageErrors from "../Commons/Inputs/MessageErrors";
// import LoadingSkeleton from "../Commons/Misc/LoadingSkeleton";
import MainButton from "../Commons/Buttons/MainButton";
import { FileUpload } from "primereact/fileupload";
import ImageCropper from "../Commons/Misc/ImageCropper";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputSwitch } from "primereact/inputswitch";
import { formatDate } from "../../utils/date";
import { CalendarBlank, CalendarStar } from "@phosphor-icons/react";
import { toInt } from "validator";

// Min and Max Dates
const today = new Date();
const minDate = new Date(today);
const maxDate = new Date(today);
minDate.setDate(today.getDate() + 1); // Available starting tomorrow
maxDate.setFullYear(today.getFullYear() + 2); // Up to 2 years in the future

const FlatForm = ({ flat, onClose, setUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const toast = useRef(null);

  const initialValues = {
    city: flat?.city || "",
    streetName: flat?.streetName || "",
    streetNumber: flat?.streetNumber || "",
    areaSize: flat?.areaSize || "",
    hasAc: flat?.hasAc || false,
    yearBuilt: formatDate(flat?.yearBuilt) || "",
    rentPrice: flat?.rentPrice || "",
    dateAvailable: flat?.dateAvailable || null,
    image: flat?.image || "",
    rooms: flat?.rooms || "",
    bathrooms: flat?.bathrooms || "",
  };

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        let imageUrl = flat?.image || "";

        if (selectedFile) {
          if (flat?.image) await deleteFlatImageFirebase(flat.image);
          const { downloadURL } = await uploadFlatImageFirebase(
            selectedFile,
            "flats"
          );
          imageUrl = downloadURL;
        }

        const flatData = {
          ...values,
          yearBuilt: toInt(values.yearBuilt),
          image: imageUrl,
        };

        if (flat) {
          await updateFlat(flat._id, flatData);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Flat updated successfully!",
          });
        } else {
          await createFlat(flatData);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Flat created successfully!",
          });
        }

        setUpdated((prev) => !prev);
        if (onClose) onClose();
      } catch (error) {
        console.error("Error saving flat:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleUploadImage = (e) => {
    const file = e.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setShowCropper(true);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Invalid File",
        detail: "Please upload a valid image file.",
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <form
        id='FlatForm'
        onSubmit={formik.handleSubmit}
        className='w-full flex flex-column gap-3'
      >
        {/* Street Number and Street Name */}
        <div className='grid w-full'>
          {/* City */}
          <GeneralInput
            id='city'
            name='city'
            value={formik.values.city}
            onChange={formik.handleChange}
            iconClass='user'
            label='City'
            type='text'
            widthClass='col-12 sm:col-4'
          />

          {formik.touched.city && formik.errors.city ? (
            <MessageErrors
              error={formik.errors.city}
              touched={formik.touched.city}
            />
          ) : (
            <div className='mt-0'></div>
          )}
          {/* Street Number */}
          <GeneralInput
            id='streetNumber'
            name='streetNumber'
            value={formik.values.streetNumber}
            onChange={formik.handleChange}
            iconClass='hashtag'
            label='Street Number'
            type='number'
            widthClass='col-4'
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
            widthClass='col-8 sm:col-4'
          />

          {formik.touched.streetName && formik.errors.streetName ? (
            <MessageErrors
              error={formik.errors.streetName}
              touched={formik.touched.streetName}
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
            widthClass='col-6 sm:col-4'
          />

          {formik.touched.rentPrice && formik.errors.rentPrice ? (
            <MessageErrors
              error={formik.errors.rentPrice}
              touched={formik.touched.rentPrice}
            />
          ) : (
            <div className='mt-0'></div>
          )}

          {/* Year */}
          <FloatLabel className='col-6 sm:col-4'>
            <div className='p-inputgroup w-full'>
              <span className='p-inputgroup-addon bg-transparent z-5 calendar-icon'>
                <CalendarBlank className='text-400' />
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
                  borderRadius: "30px",
                  paddingInlineStart: "2.75rem",
                }}
                yearRange='1800:2024'
                // minDate={minYear}
                // maxDate={maxYear}
                view='year'
                dateFormat='yy'
                // yearNavigator
                className='input-number w-full'
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

          {/* Date Available */}
          <FloatLabel className='col-6 sm:col-4'>
            <div className='p-inputgroup w-full'>
              <span className='p-inputgroup-addon bg-transparent z-5 calendar-icon'>
                <CalendarStar className='text-400' />
              </span>
              <Calendar
                inputId='dateAvailable'
                name='dateAvailable'
                value={formik.values.birthDate}
                // onChange={(e) => handleBirthdayChange(e.value)}
                onChange={(e) => formik.setFieldValue("dateAvailable", e.value)}
                inputStyle={{
                  borderRadius: "30px",
                  paddingInlineStart: "2.75rem",
                }}
                minDate={minDate}
                maxDate={maxDate}
                dateFormat='dd/mm/yy'
                className='input-number w-full'
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
          {/* Rooms */}
          <GeneralInput
            id='rooms'
            name='rooms'
            value={formik.values.rooms}
            onChange={formik.handleChange}
            iconPh='Bed'
            label='Rooms'
            type='number'
            widthClass='col-6 sm:col-4'
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
            widthClass='col-6 sm:col-4'
          />

          {formik.touched.bathrooms && formik.errors.bathrooms ? (
            <MessageErrors
              error={formik.errors.bathrooms}
              touched={formik.touched.bathrooms}
            />
          ) : (
            <div className='mt-0'></div>
          )}

          {/* Area Size */}
          <GeneralInput
            id='areaSize'
            name='areaSize'
            value={formik.values.areaSize}
            onChange={formik.handleChange}
            iconClass='expand'
            label='Area Size'
            type='number'
            widthClass='col-6 sm:col-4'
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
          <div className='col-6 sm:col-4 justify-content-start align-items-center gap-2 flex '>
            <InputSwitch
              checked={formik.values.hasAc}
              onChange={(e) => formik.setFieldValue("hasAc", e.value)}
              inputId='hasAC'
            />
            <label htmlFor='hasAC'>Has AC</label>
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
            className='col-12'
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

                      const { downloadURL } = await uploadFlatImageFirebase(
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

          {/* <LoadingSkeleton loading={loading}> */}
          <MainButton
            label={!flat ? "Create Flat" : "Update Flat"}
            type='submit'
            loading={loading}
            // disabled={loading}
          />
          {/* </LoadingSkeleton> */}
        </div>
      </form>
    </>
  );
};

FlatForm.propTypes = {
  flat: PropTypes.object,
  onClose: PropTypes.func,
  setUpdated: PropTypes.func,
};

export default FlatForm;
