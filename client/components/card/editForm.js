import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../button/button';
import { toast } from 'react-toastify';
import { updateAddress } from '../../api/addressAPI';
import InputField from './inputField';

const validationSchema = Yup.object().shape({
  line1: Yup.string().required('Line1 is required'),
  line2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string()
    .required('State is required')
    .matches(/^\S{2}$/, 'Invalid State (e.g., CA)'),
  zip: Yup.string()
    .required('Zip is required')
    .matches(/^\d{5}$/, 'Invalid Zip (e.g., 94107)'),
});

export default function EditForm({ address, getAllAddresses, onToggleEdit }) {

  const initialValues = {
    line1: (address && address.line1) || '',
    line2: (address && address.line2) || '',
    city: (address && address.city) || '',
    state: (address && address.state) || '',
    zip: (address && address.zip) || '',
  };
  const [editedValues, setEditedValues] = useState(initialValues);

  const handleEditSubmit = async (values) => {
    try {
      const updatedValues = {
        id: address.id, 
        ...values,
      };
      await updateAddress(address?.id, updatedValues);
      getAllAddresses();
      toast.success('Address updated successfully');
      onToggleEdit();
    } catch (error) {
      toast.error('Error updating Address');
    }
  };

  const handleChange = (fieldName, value) => {
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
      [fieldName]: value,
    }));
  };

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleEditSubmit}
  >
    {({ isSubmitting, values, setFieldValue }) => (
      <Form>
        <InputField 
          inputLabel="Line1" 
          value="line1" 
          placeholder="Enter Line1" 
          values={values} 
          editedValues={editedValues} 
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
        <InputField 
          inputLabel="Line2" 
          value="line2" 
          placeholder="Enter Line2" 
          values={values} 
          editedValues={editedValues} 
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
        <InputField 
          inputLabel="City" 
          value="city" 
          placeholder="Enter city" 
          values={values} 
          editedValues={editedValues} 
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
        <InputField 
          inputLabel="State" 
          value="state" 
          placeholder="Enter State" 
          values={values} 
          editedValues={editedValues} 
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
        <InputField 
          inputLabel="Zip" 
          value="zip" 
          placeholder="Enter Zip" 
          values={values} 
          editedValues={editedValues} 
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
        <div className="mb-4">
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </Form>
    )}
    </Formik>
  )
}