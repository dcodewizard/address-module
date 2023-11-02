import { Field, ErrorMessage } from 'formik';
import Input from '../../input/input';

export default function InputField({
  inputLabel, 
  value, 
  placeholder, 
  values, 
  editedValues, 
  setFieldValue, 
  handleChange
}) {
  return (
    <div className="mb-4">
      <label htmlFor="line1" className="block text-lg">
        {inputLabel}
      </label>
      <Field
        type="text"
        id={value}
        name={value}
        as={Input}
        placeholder={placeholder}
        onChange={(e) => {
          setFieldValue(value, e.target.value);
          handleChange(value, e.target.value);
        }}
        value={editedValues[value] || values[value]}       
      />
      <ErrorMessage name={value} component="div" className="text-red-500" />
    </div>
  )
}