import * as Yup from "yup";

const FlatSchema = ({
  areaSize = false,
  city = false,
  dateAvailable = false,
  hasAc = false,
  price = false,
  streetName = false,
  streetNumber = false,
  yearBuilt = false,
  flatImage = false,
  flatUser = false,
  rooms = false,
  bathrooms = false,
  description = false, // New field
} = {}) => {
  const schemaFields = {};

  if (areaSize) {
    schemaFields.areaSize = Yup.number()
      .nullable()
      .min(10, "A flat with less than 10 sqm? That seems off!")
      .max(10000, "Let’s keep the size under 10,000 sqm, please!")
      .required("Area size is required to help others visualize the space.");
  }

  if (city) {
    schemaFields.city = Yup.string()
      .matches(
        /^[a-zA-Z\s-]+$/,
        "City names can only include letters, spaces, and hyphens."
      )
      .min(2, "City name must have at least 2 characters.")
      .max(100, "Let’s keep city names under 100 characters.")
      .required("City is required to help locate the flat.");
  }

  if (dateAvailable) {
    schemaFields.dateAvailable = Yup.date()
      .typeError("Hmm, that doesn’t look like a valid date. Try again!")
      .min(new Date(), "The availability date must be in the future.")
      .required("Date available is required to set expectations.");
  }

  if (hasAc) {
    schemaFields.hasAc = Yup.boolean();
  }

  if (price) {
    schemaFields.price = Yup.number()
      .nullable()
      .min(50, "Flats under $50/month? Sounds too good to be true!")
      .max(100000, "Let’s keep the price under $100,000/month.")
      .required("Price is required to make an informed decision.");
  }

  if (streetName) {
    schemaFields.streetName = Yup.string()
      .matches(
        /^[a-zA-Z0-9\s-]+$/,
        "Street names can only include letters, numbers, spaces, and hyphens."
      )
      .min(3, "Street name must have at least 3 characters.")
      .max(100, "Let’s keep street names under 100 characters.")
      .required("Street name is required for location clarity.");
  }

  if (streetNumber) {
    schemaFields.streetNumber = Yup.number()
      .nullable()
      .min(1, "Street numbers must be positive.")
      .max(10000, "Street numbers must be under 10,000.")
      .required("Street number is required for location precision.");
  }

  if (yearBuilt) {
    schemaFields.yearBuilt = Yup.number()
      .nullable()
      .min(1800, "Buildings from before 1800 might be fascinating but rare!")
      .max(new Date().getFullYear(), "Year built cannot be in the future.")
      .required("Year built is required for historical context.");
  }

  if (flatImage) {
    schemaFields.flatImage = Yup.string()
      .url("That doesn’t look like a valid image URL. Double-check?")
      .required("An image of the flat is required to attract interest.");
  }

  if (flatUser) {
    schemaFields.flatUser = Yup.string().required(
      "Flat user (owner or manager) is required."
    );
  }

  if (rooms) {
    schemaFields.rooms = Yup.number()
      .nullable()
      .min(1, "A flat must have at least one room.")
      .max(100, "Flats with more than 100 rooms? Let’s be realistic.")
      .required("Number of rooms is required to understand the layout.");
  }

  if (bathrooms) {
    schemaFields.bathrooms = Yup.number()
      .nullable()
      .min(1, "A flat must have at least one bathroom.")
      .max(50, "Flats with more than 50 bathrooms? Let’s scale it down.")
      .required("Number of bathrooms is required for user clarity.");
  }

  if (description) {
    schemaFields.description = Yup.string()
      .min(
        20,
        "Let’s include at least 20 characters for a meaningful description."
      )
      .max(1000, "Let’s keep the description concise, under 1,000 characters.");
  }

  return Yup.object(schemaFields);
};

export default FlatSchema;
