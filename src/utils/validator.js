// Form validation functions
import validator from "validator";

export const isEmailValid = (email) => validator.isEmail(email);

export const isPasswordStrong = (password) => {
  // Minimum 8 characters, at least one uppercase, one lowercase, one number, one special character
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return strongPasswordRegex.test(password);
};

export const isNonEmptyString = (value) => value && value.trim() !== "";

export const isDateValid = (date) => !isNaN(new Date(date).getTime());

// if (!isEmailValid(email)) {
//     setError('Invalid email address');
//     return;
//   }
