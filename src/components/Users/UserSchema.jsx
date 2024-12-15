import * as Yup from "yup";

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
      .required(
        "Time to pick a username! This is how the world will know you."
      );
  }

  // Email or Username validation
  if (emailOrUsername) {
    schemaFields.emailOrUsername = Yup.string()
      .required("Please provide either your email or username!")
      .test(
        "email-or-username",
        "Doesn’t look like a valid email or username. Double-check?",
        (value) =>
          /^[a-zA-Z0-9_]+$/.test(value) ||
          /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
      );
  }

  // Password validation
  if (password) {
    schemaFields.password = Yup.string()
      .min(
        8,
        "Remember, your password is at least 8 characters long to keep it secure!"
      )
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
      .required("What’s your first name? Don’t be shy!");

    schemaFields.lastName = Yup.string()
      .min(2, "Last names with at least 2 characters are the way to go!")
      .max(100, "Wow, that’s a long name! Let’s keep it under 100 characters.")
      .required("And your last name? Let’s make it official!");
  }

  // Birthdate validation
  if (birthDate) {
    schemaFields.birthDate = Yup.date()
      .typeError("Hmm, that doesn’t seem like a valid date. Let’s try again!")
      .required("We need your birth date to get to know you better!")
      .test(
        "age",
        "You must be at least 18 years old and younger than 120 to register.",
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
    schemaFields.profileImage = Yup.string();
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
