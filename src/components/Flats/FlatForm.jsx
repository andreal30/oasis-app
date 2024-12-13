import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Input, Checkbox, Button } from 'shared-components'; // Assuming these are the shared components
import PropTypes from 'prop-types';

const FlatForm = ({ flatId }) => {
    const initialValues = {
        city: '',
        streetName: '',
        streetNumber: '',
        areaSize: '',
        hasAC: false,
        yearBuilt: '',
        rentPrice: '',
        dateAvailable: '',
    };

    const validationSchema = Yup.object({
        city: Yup.string().required('City is required'),
        streetName: Yup.string().required('Street Name is required'),
        streetNumber: Yup.number().positive('Street Number must be a positive number').required('Street Number is required'),
        areaSize: Yup.number().positive('Area Size must be a positive number').required('Area Size is required'),
        hasAC: Yup.boolean().required('Has AC is required'),
        yearBuilt: Yup.number().min(1900, 'Year Built must be after 1900').max(new Date().getFullYear(), `Year Built cannot be later than ${new Date().getFullYear()}`).required('Year Built is required'),
        rentPrice: Yup.number().positive('Rent Price must be a positive number').required('Rent Price is required'),
        dateAvailable: Yup.date().min(new Date(), 'Date Available must be a future date').required('Date Available is required'),
    });

    const handleSubmit = async (values) => {
        try {
            if (flatId) {
                // Connect with your Node backend to update a flat
                await axios.put(`/flats/${flatId}`, values);
            } else {
                // Connect with your Node backend to create a new flat
                await axios.post('/flats', values);
            }
            alert('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <Field name="city" as={Input} placeholder="City" />
                        {errors.city && touched.city ? <div>{errors.city}</div> : null}
                    </div>
                    <div>
                        <Field name="streetName" as={Input} placeholder="Street Name" />
                        {errors.streetName && touched.streetName ? <div>{errors.streetName}</div> : null}
                    </div>
                    <div>
                        <Field name="streetNumber" as={Input} type="number" placeholder="Street Number" />
                        {errors.streetNumber && touched.streetNumber ? <div>{errors.streetNumber}</div> : null}
                    </div>
                    <div>
                        <Field name="areaSize" as={Input} type="number" placeholder="Area Size" />
                        {errors.areaSize && touched.areaSize ? <div>{errors.areaSize}</div> : null}
                    </div>
                    <div>
                        <Field name="hasAC" as={Checkbox} type="checkbox" />
                        <label htmlFor="hasAC">Has AC</label>
                        {errors.hasAC && touched.hasAC ? <div>{errors.hasAC}</div> : null}
                    </div>
                    <div>
                        <Field name="yearBuilt" as={Input} type="number" placeholder="Year Built" />
                        {errors.yearBuilt && touched.yearBuilt ? <div>{errors.yearBuilt}</div> : null}
                    </div>
                    <div>
                        <Field name="rentPrice" as={Input} type="number" placeholder="Rent Price" />
                        {errors.rentPrice && touched.rentPrice ? <div>{errors.rentPrice}</div> : null}
                    </div>
                    <div>
                        <Field name="dateAvailable" as={Input} type="date" placeholder="Date Available" />
                        {errors.dateAvailable && touched.dateAvailable ? <div>{errors.dateAvailable}</div> : null}
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
};

FlatForm.propTypes = {
    flatId: PropTypes.string,
};

export default FlatForm;
