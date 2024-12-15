import { useFormik } from "formik";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { InputSwitch } from "primereact/inputswitch";
import { useRef, useState } from "react";
import useAuthContext from "../../hooks/useAuth";
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
import { resizeImage } from "../../utils/images";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import {
  deleteProfileImageFirebase,
  uploadProfileImageFirebase,
} from "../../services/firebase";
import LoadingSkeleton from "../Commons/Misc/LoadingSkeleton";

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
  const [profileFile, setProfileFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const { login } = useAuthContext();
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
    birthDate: user?.birthDate || null,
    admin: user?.isAdmin || false,
    profileImage: user?.profileImage || null,
  };

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
      console.log("0. USER Form submitted with values:", values);
      setError(null);
      setSuccess(null);
      setLoading(true);

      console.log("1. USER FORM is logged in?", isLoggedIn);
      console.log("2. USER FORM is registering?", registerPath);
      try {
        let imageUrl = user?.profileImage || "";
        console.log("3. USER FORM imageUrl:", imageUrl);
        console.log("4. USER FORM profileFile:", profileFile);
        if (profileFile) {
          if (user?.profileImage) {
            await deleteProfileImageFirebase(user.profileImage); // Delete existing profile image
          }
          imageUrl = await uploadProfileImageFirebase(profileFile); // Upload new resized image
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
          console.log("5. USER FORM userData:", userData);
          const newUser = await registerUser(userData);
          console.log("6. USER FORM New user registered:", newUser);

          const response = await login(newUser.email, values.password);
          console.log(
            "7. USER FORM New user Login response:",
            response,
            response.status
          );

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
          console.log(
            "5. USER FORM ID and updatedData :",
            user._id,
            updatedData
          );

          const response = await updateUserProfile(user._id, updatedData);
          //   onClose();
          console.log("6. USER FORM Update response:", response);

          if (response.status === 200) {
            setSuccess(`Profile has been updated successfully!`);
            console.log("7. USER FORM Success message:", success);
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

  const handleUploadImage = async ({ files }) => {
    try {
      const file = files[0];
      if (!file) throw new Error("No file uploaded.");

      // Validate file type and size
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size exceeds 2MB.");
      }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and JPG are allowed."
        );
      }

      // Resize the image
      const resizedImageBlob = await resizeImage(file);

      // Convert the Blob to a File for FormData compatibility
      const resizedFile = new File([resizedImageBlob], file.name, {
        type: file.type,
      });

      // Upload using the service
      const downloadURL = await uploadProfileImageFirebase(resizedFile);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Image uploaded successfully!",
      });

      console.log("Image URL:", downloadURL);

      formik.setFieldValue("profileImage", downloadURL);

      setProfileFile(resizedFile);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Failed to upload image.",
      });
      console.error("Upload error:", error);
    }
  };

  console.log("Formik Values:", formik.errors);

  const isAdministrator = user?.isAdmin || false;

  return (
    <>
      {error && <Messages severity='error' text={error} />}
      {success && <Messages severity='success' text={success} />}

      <Toast ref={toast} />
      <form
        id='UserForm'
        onSubmit={formik.handleSubmit}
        className='w-full flex flex-column gap-3'
      >
        <div className='flex justify-content-center mb-4'>
          <Image
            src={user?.profileImage}
            alt='User Profile Image'
            className='profile-img'
          />
        </div>

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
              <label htmlFor='isAdmin'>Is Admin</label>
              <InputSwitch
                checked={formik.values.admin} // Use the correct field name
                onChange={(e) => formik.setFieldValue("admin", e.value)} // Match the field name
                className='mr-3'
                inputId='isAdmin'
                id='isAdmin'
              />
            </div>
          </>
        )}

        <FileUpload
          name='demo[]'
          multiple={false}
          accept='image/*'
          maxFileSize={2000000}
          emptyTemplate={
            <p className='m-0'>Drag and drop images to here to upload.</p>
          }
          chooseLabel={isLoggedIn ? "Update Photo" : "Upload Photo"}
          customUpload
          auto
          uploadHandler={handleUploadImage}
        />

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
