import { useFormik } from "formik";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { InputSwitch } from "primereact/inputswitch";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import GeneralInput from "../Commons/Inputs/GeneralInput";
import MainButton from "../Commons/Buttons/MainButton";
import MessageErrors from "../Commons/Inputs/MessageErrors";
import Messages from "../Commons/Inputs/Messages";
import PasswordInput from "../Commons/Inputs/PaswordInput";
import { Image } from "primereact/image";
import { useLocation, useNavigate } from "react-router-dom";
import UserSchema from "./UserSchema";
import { getToken } from "../../utils/tokenUtils";
import { updateUserProfile, validateUnique } from "../../services/userService";
import { registerUser } from "../../services/authService";
import PropTypes from "prop-types";
import { uploadImage } from "../../utils/images";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import {
  deleteProfileImageFirebase,
  // uploadProfileImageFirebase,
} from "../../services/firebase";
import LoadingSkeleton from "../Commons/Misc/LoadingSkeleton";
import { isPasswordStrong } from "../../utils/validator";
import { formatDate } from "../../utils/date";
import ImageCropper from "../Commons/Misc/ImageCropper";

//Min and Max Dates
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

// Calculate the maximum eligible date (older than 18 years)
let maxYear = year - 18;
let maxMonth = month;
let maxDay = today.getDate();
let maxDate = new Date(maxYear, maxMonth, maxDay);

// Calculate the minimum eligible date (younger than 120 years)
let minYear = year - 120;
let minMonth = month;
let minDay = today.getDate();
let minDate = new Date(minYear, minMonth, minDay);

const commonPasswords = [
  "1234",
  "password",
  "admin",
  "123456",
  "12345678",
  "qwerty",
  "abc123",
  "iloveyou",
  "letmein",
  "welcome",
  "monkey",
  "football",
  "123123",
  "admin123",
  "passw0rd",
]; // Add more if needed

const registerSchema = UserSchema({
    confirmPassword: true,
    name: true,
    birthDate: true,
    terms: true,
  }),
  registerUniqueSchema = Yup.object({
    email: Yup.string()
      .email(
        "Uh-oh! That doesn’t look like a valid email. Mind double-checking?"
      )
      .required("We’ll need your email to stay in touch!")
      .test(
        "unique-email",
        "This email is already taken! Maybe try a new one?",
        async (value) => {
          if (!value) return true; // Skip validation if field is empty
          return await validateUnique("email", value);
        }
      ),
    username: Yup.string()
      .min(
        4,
        "Usernames with at least 4 characters are the cool thing these days!"
      )
      .max(
        50,
        "That’s a long username! Let’s keep it under 50 characters, yeah?"
      )
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Usernames can have letters, numbers, and underscores. Keep it classy!"
      )
      .test(
        "unique-username",
        "This username is already taken! Time to get creative!",
        async (value) => {
          if (!value) return true; // Skip validation if field is empty
          return await validateUnique("username", value);
        }
      )
      .required(
        "Time to pick a username! This is how the world will know you."
      ),
    password: Yup.string()
      .min(
        8,
        "Your password needs to be at least 8 characters long. Stronger is better!"
      )
      .max(
        100,
        "Wow, that’s a long password! Let’s keep it under 100 characters, okay?"
      )
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
        "For extra safety, include at least one letter, one number, and one special character!"
      )
      .test(
        "isPasswordStrong",
        "Your password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        (value) => isPasswordStrong(value)
      )
      .test(
        "notCommonPassword",
        "Your password is too common and easy to guess. Choose something more secure.",
        (value) => !commonPasswords.includes(value.toLowerCase())
      )
      .required("Please set a strong password for your account."),
    profileImage: Yup.lazy((value) =>
      value
        ? Yup.string().required("Profile image is required when provided.")
        : Yup.string().default(
            "https://firebasestorage.googleapis.com/v0/b/oasis-88f63.firebasestorage.app/o/profileImages%2Fuser.jpg?alt=media&token=961aa4c1-6967-40cc-bd00-187a2c4654e5"
          )
    ),
  });

const updateSchema = UserSchema({
  email: true,
  username: true,
  // password: true,
  // confirmPassword: true,
  name: true,
  birthDate: true,
  admin: true,
  profileImage: true,
});

const UserForm = ({ user, onClose, setUpdated }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file temporarily
  const [showCropper, setShowCropper] = useState(false); // To control the cropper visibility

  const navigate = useNavigate();

  const { login } = useAuth();
  const location = useLocation();

  const isLoggedIn = getToken();

  const initialValuesRegister = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthDate: null,
    admin: false,
    profileImage: null,
    terms: false,
  };

  const initialValuesUpdate = {
    email: user?.email || "",
    username: user?.username || "",
    // password: "",
    // confirmPassword: "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    birthDate: formatDate(user?.birthDate) || null,
    admin: user?.isAdmin || false,
    profileImage: user?.profileImage || null,
  };

  console.log("1. USER FORM SERVICE: Initial values:", initialValuesUpdate);

  const currentPath = location.pathname;
  const registerPath =
    currentPath.includes("/register") || currentPath === "/register";

  const validationSchema = registerPath
    ? registerSchema.concat(registerUniqueSchema)
    : updateSchema;
  const initialValues = registerPath
    ? initialValuesRegister
    : initialValuesUpdate;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      setSuccess(null);
      setLoading(true);

      try {
        let imageUrl = user?.profileImage || "";

        if (formik.values.profileImage) {
          if (user?.profileImage) {
            await deleteProfileImageFirebase(user.profileImage); // Delete existing profile image
          }
          imageUrl = formik.values.profileImage; // Use the new uploaded image URL
        }

        if (!isLoggedIn || registerPath) {
          const userData = {
            firstName: values.firstName || "",
            lastName: values.lastName || "",
            email: values.email || "",
            username: values.username || "",
            password: values.password || "",
            profileImage: imageUrl || "",
            birthDate: values.birthDate || new Date() || null,
            isAdmin: false,
          };
          const newUser = await registerUser(userData);

          const response = await login(newUser.email, values.password);

          if (response !== undefined && response !== null) {
            setSuccess(
              `Welcome to Oasis, ${values.firstName}! Everything's set, and we’re taking you home!`
            );

            setTimeout(() => {
              navigate("/home");
            }, 3000);
          }
        } else {
          const updatedData = {
            ...user,
            ...values,
            profileImage: imageUrl,
            // firstName: values.firstName,
            // lastName: values.lastName,
            // email: values.email,
            // username: values.username,
            // birthDate: values.birthDate || new Date(),
            // profileImage: imageUrl,
            // isAdmin: values.admin,
          };

          const response = await updateUserProfile(user._id, updatedData);
          //   onClose();

          if (response.status === 200) {
            setSuccess(`Profile has been updated successfully!`);
            setTimeout(() => {
              if (currentPath.includes("/profile")) {
                // Navigate to '/home'
                navigate("/profile");
              } else if (currentPath.includes("/all-users")) {
                setUpdated((prev) => !prev); // Notify parent to refresh
                onClose(); // Close the dialog
              }
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  // const handleBirthdayChange = (e) => {
  //   formik.setFieldValue("birthDate", e);
  //   formik.setFieldTouched("birthDate", true);
  // };

  // const handleUploadImage = async ({ files }) => {
  //   const file = files?.[0];
  //   if (!file) {
  //     console.error("No valid file received");
  //     return;
  //   }

  //   if (!file.type.startsWith("image/")) throw new Error("Invalid file type.");

  //   console.log("File validated:", file.name);

  //   try {
  //     // const file = files[0];
  //     // if (!file) {
  //     //   throw new Error("No file selected.");
  //     // }
  //     console.log("File Details:", file.name, file.size, file.type);

  //     const { downloadURL, resizedBuffer } = await uploadImage(file, "user");

  //     // Notify parent component of success
  //     formik.setFieldValue("profileImage", downloadURL);
  //     setProfileFile(resizedBuffer);

  //     toast.current.show({
  //       severity: "success",
  //       summary: "Success",
  //       detail: "Image uploaded successfully!",
  //     });

  //     console.log("Image URL:", downloadURL);
  //   } catch (error) {
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Error",
  //       detail: error.message || "Failed to upload image.",
  //     });

  //     console.error("Image upload error:", error);

  //     // Notify parent component of failure
  //     console.error("User image upload error:", error);
  //   }
  // };

  const handleUploadImage = async ({ files }) => {
    const file = files?.[0];
    if (!file) {
      console.error("No valid file received");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Invalid file type. Please select an image.",
      });
      return;
    }

    console.log("File validated:", file.name);
    setSelectedFile(file); // Temporarily store file
    setShowCropper(true); // Show the cropper
  };

  const isAdministrator = user?.isAdmin || false;

  return (
    <>
      {error && <Messages severity='error' text={error} />}
      {success && <Messages severity='success' text={success} />}

      <Toast ref={toast} />

      <div className='flex justify-content-center mb-4'>
        <Image
          src={user?.profileImage}
          alt='User Profile Image'
          className='profile-img'
        />
      </div>

      <form
        id='UserForm'
        onSubmit={formik.handleSubmit}
        className='w-full flex flex-column gap-3'
      >
        <GeneralInput
          id='firstName'
          name='firstName'
          value={formik.values.firstName}
          onChange={formik.handleChange}
          iconClass='user'
          label='First Name'
          type='text'
        />

        {formik.touched.firstName && formik.errors.firstName ? (
          <MessageErrors
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
          />
        ) : (
          <div className='mt-0'></div>
        )}

        <GeneralInput
          id='lastName'
          name='lastName'
          value={formik.values.lastName}
          onChange={formik.handleChange}
          iconClass='user'
          label='Last Name'
          type='text'
        />

        {formik.touched.lastName && formik.errors.lastName ? (
          <MessageErrors
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />
        ) : (
          <div className='mt-0'></div>
        )}

        <GeneralInput
          id='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          iconClass='at'
          label='Email'
          type='email'
          disabled={!registerPath ? true : false}
        />

        {formik.touched.email && formik.errors.email ? (
          <MessageErrors
            error={formik.errors.email}
            touched={formik.touched.email}
          />
        ) : (
          <div className='mt-0'></div>
        )}

        <GeneralInput
          id='username'
          name='username'
          value={formik.values.username}
          onChange={formik.handleChange}
          iconClass='face-smile'
          label='Username'
          disabled={!registerPath ? true : false}
        />

        {formik.touched.username && formik.errors.username ? (
          <MessageErrors
            error={formik.errors.username}
            touched={formik.touched.username}
          />
        ) : (
          <div className='mt-0'></div>
        )}

        <FloatLabel>
          <div className='p-inputgroup'>
            <span className='p-inputgroup-addon bg-transparent z-5 calendar-icon'>
              <i className='pi pi-calendar text-400'></i>
            </span>
            <Calendar
              inputId='birthDate'
              name='birthDate'
              value={formik.values.birthDate}
              // onChange={(e) => handleBirthdayChange(e.value)}
              onChange={(e) => formik.setFieldValue("birthDate", e.value)}
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
          <label htmlFor='birthDate' className='left-3 text-400'>
            Date of Birth
          </label>
        </FloatLabel>

        {formik.touched.birthDate && formik.errors.birthDate ? (
          <MessageErrors
            error={formik.errors.birthDate}
            touched={formik.touched.birthDate}
          />
        ) : (
          <div className='mt-0'></div>
        )}
        {registerPath && (
          <>
            <PasswordInput
              id='password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              label='Password'
            />
            {formik.touched.password && formik.errors.password ? (
              <MessageErrors
                error={formik.errors.password}
                touched={formik.touched.password}
              />
            ) : (
              <div className='mt-0'></div>
            )}

            <PasswordInput
              id='confirmPassword'
              name='confirmPassword'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              label='Confirm Password'
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <MessageErrors
                error={formik.errors.confirmPassword}
                touched={formik.touched.confirmPassword}
              />
            ) : (
              <div className='mt-0'></div>
            )}
          </>
        )}
        {isAdministrator && (
          <>
            <div className='mt-3  flex align-items-center gap-2'>
              <InputSwitch
                checked={formik.values.admin} // Use the correct field name
                onChange={(e) => formik.setFieldValue("admin", e.value)} // Match the field name
                className='mr-3'
                inputId='isAdmin'
                id='isAdmin'
              />
              <label htmlFor='isAdmin'>Is Admin</label>
            </div>
          </>
        )}

        <FileUpload
          name='demo[]'
          multiple={false}
          accept='image/*'
          maxFileSize={2000000}
          emptyTemplate={
            <p className='m-0'>Drag and drop images here to upload.</p>
          }
          chooseLabel={isLoggedIn ? "Update Photo" : "Upload Photo"}
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
                aspect={1} // Pass aspect directly
                // aspect={currentPath.includes("/flats") ? 16 / 9 : 1} // Pass aspect directly
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

                    formik.setFieldValue("profileImage", downloadURL);
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
            label={!registerPath ? "Save Changes" : "Register"}
            type='submit'
            disabled={loading}
          />
        </LoadingSkeleton>
      </form>
    </>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
};

export default UserForm;
