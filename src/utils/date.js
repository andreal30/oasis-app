import { format, parseISO, isValid } from "date-fns";

// Format a date to 'MM/dd/yyyy' or other formats
export const formatDate = (date, dateFormat = "MM/dd/yyyy") => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, dateFormat) : "Invalid Date";
};

// Get difference between two dates
export const differenceInDays = (startDate, endDate) => {
  const diff = Math.abs(new Date(startDate) - new Date(endDate));
  return Math.ceil(diff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};

// Format date to '1 January, 2025' even if it has a timestamp
export const formatDateInWords = (date) => {
  // Ensure date is a JavaScript Date object
  const parsedDate = typeof date === "string" ? parseISO(date) : date;

  // Check if the date is valid
  return isValid(parsedDate)
    ? format(parsedDate, "d MMMM, yyyy")
    : "Invalid Date";
};
