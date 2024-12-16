import * as Yup from "yup";
import { isNonEmptyString, isDateValid } from "./../../utils/validator";

// Reusable Yup schema generator for dynamic validation
const UserSchema = ({
  email = false,
  username = false,
  emailOrUsername = false, // New field for email or username
  password = false,
  confirmPassword = false,
  name = false,
  birthDate = false,
  admin = false,
  isAdmin = false,
  terms = false,
  profileImage = false,
} = {}) => {
  const schemaFields = {};

  // Email validation
  if (email) {
    schemaFields.email = Yup.string()
      .email(
        "Uh-oh! That doesn’t look like a valid email. Mind double-checking?"
      )
      .test(
        "isNonEmptyString",
        "Let’s not leave the email blank, shall we?",
        isNonEmptyString
      )
      .required("Email is required!");
  }

  // Username validation
  if (username) {
    schemaFields.username = Yup.string()
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
      .required("Time to pick a username! This is how the world will know you.")
      .test(
        "isNonEmptyString",
        "Your username can’t be blank. Time to get creative!",
        isNonEmptyString
      );
  }

  // Email or Username validation
  if (emailOrUsername) {
    schemaFields.emailOrUsername = Yup.string()
      .required("Please provide either your email or username!")
      .test(
        "isNonEmptyString",
        "This field can’t be blank. We need something to work with!",
        isNonEmptyString
      )
      .test(
        "email-or-username",
        "Doesn’t look like a valid email or username. Try again?",
        (value) =>
          /^[a-zA-Z0-9_]+$/.test(value) ||
          /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
      );
  }

  // Password validation
  if (password) {
    schemaFields.password = Yup.string()
      .min(8, "Your password needs at least 8 characters to keep things safe.")
      .max(
        100,
        "Wow, that’s a long password! Let’s keep it under 100 characters, okay?"
      )
      .required("Enter your password to access your account.");
  }

  // Confirm Password validation
  if (confirmPassword) {
    schemaFields.confirmPassword = Yup.string()
      .oneOf(
        [Yup.ref("password"), Yup.ref("newPassword"), null],
        "Oops! The passwords don’t match. Try again!"
      )
      .required("Confirm your password to proceed.");
  }

  // Name validation
  if (name) {
    schemaFields.firstName = Yup.string()
      .min(2, "First names with at least 2 characters are the way to go!")
      .max(100, "Wow, that’s a long name! Let’s keep it under 100 characters.")
      .test(
        "isNonEmptyString",
        "Your first name can’t be empty. Let’s add it!",
        isNonEmptyString
      )
      .matches(
        /^[a-zA-Z\s]+$/,
        "First name can only include letters and spaces."
      )
      .required("What’s your first name? We’d love to know!");

    schemaFields.lastName = Yup.string()
      .min(2, "Last names with at least 2 characters are the way to go!")
      .max(100, "Wow, that’s a long name! Let’s keep it under 100 characters.")
      .test(
        "isNonEmptyString",
        "Your last name can’t be empty. Let’s add it!",
        isNonEmptyString
      )
      .matches(
        /^[a-zA-Z\s]+$/,
        "Last name can only include letters and spaces."
      )
      .required("And your last name? Let’s make it official!");
  }

  // Birthdate validation
  if (birthDate) {
    schemaFields.birthDate = Yup.date()
      .required("We need your birthday to get to know you better!")
      .typeError("Hmm, that doesn’t seem like a valid date. Let’s try again!")
      .test(
        "isDateValid",
        "That doesn’t seem like a valid date. Let’s fix it!",
        isDateValid
      )
      .test(
        "age",
        "You need to be between 18 and 120 years old to join us.",
        (value) => {
          if (!value) return false;
          const today = new Date();
          const age = today.getFullYear() - value.getFullYear();
          return age >= 18 && age <= 120;
        }
      );
  }

  // Profile Image validation
  if (profileImage) {
    schemaFields.profileImage = Yup.string().url("Invalid URL format");
  }

  // Admin validation
  if (admin) {
    schemaFields.admin = Yup.boolean();
  }

  // Admin validation
  if (isAdmin) {
    schemaFields.isAdmin = Yup.boolean()
      .required("You need to be an admin to access this page!")
      .oneOf([true], "You need to be an admin to access this page!");
  }

  // Terms validation
  if (terms) {
    schemaFields.terms = Yup.boolean()
      .oneOf(
        [true],
        "You’ll need to accept the Terms and Conditions to move forward!"
      )
      .required("Let’s agree to the terms so we can proceed!");
  }

  return Yup.object(schemaFields);
};

export default UserSchema;
