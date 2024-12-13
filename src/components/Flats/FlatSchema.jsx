import * as Yup from 'yup';
import validateUnique from '../../api/ValidateUnique';

const FlatSchema = ({
  flatId = false,
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

  if (flatId) {
    schemaFields.flatId = Yup.string()
      .required('Flat ID is required')
      .test(
        'unique-flatId',
        'This Flat ID is already taken! Please use a different one.',
        async (value) => {
          if (!value) return true; // Skip validation if field is empty
          return await validateUnique('flatId', value);
        }
      );
  }

  if (areaSize) {
    schemaFields.areaSize = Yup.number()
      .nullable()
      .min(0, 'Area size must be a positive number')
      .required('Area size is required');
  }

  if (city) {
    schemaFields.city = Yup.string()
      .required('City is required');
  }

  if (dateAvailable) {
    schemaFields.dateAvailable = Yup.date()
      .nullable()
      .typeError('Invalid date format')
      .required('Date available is required');
  }

  if (hasAc) {
    schemaFields.hasAc = Yup.boolean()
      .required('AC availability is required');
  }

  if (price) {
    schemaFields.price = Yup.number()
      .nullable()
      .min(0, 'Price must be a positive number')
      .required('Price is required');
  }

  if (streetName) {
    schemaFields.streetName = Yup.string()
      .required('Street name is required');
  }

  if (streetNumber) {
    schemaFields.streetNumber = Yup.number()
      .nullable()
      .min(0, 'Street number must be a positive number')
      .required('Street number is required');
  }

  if (yearBuilt) {
    schemaFields.yearBuilt = Yup.number()
      .nullable()
      .min(0, 'Year built must be a positive number')
      .required('Year built is required');
  }

  if (flatImage) {
    schemaFields.flatImage = Yup.string()
      .url('Invalid URL format')
      .required('Flat image URL is required');
  }

  if (flatUser) {
    schemaFields.flatUser = Yup.string()
      .required('Flat user is required');
  }

  if (rooms) {
    schemaFields.rooms = Yup.number()
      .nullable()
      .min(0, 'Number of rooms must be a positive number')
      .required('Number of rooms is required');
  }

  if (bathrooms) {
    schemaFields.bathrooms = Yup.number()
      .nullable()
      .min(0, 'Number of bathrooms must be a positive number')
      .required('Number of bathrooms is required');
  }

  if (description) {
    schemaFields.description = Yup.string()
      .required('Description is required');
  }

  return Yup.object(schemaFields);
};

export default FlatSchema;
