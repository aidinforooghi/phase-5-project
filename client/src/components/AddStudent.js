import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useApi } from './ApiContext'; 

function AddStudent() {
  const { makeApiRequest } = useApi(); // Use the useApi hook

  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .max(50, 'Name must be at most 50 characters'),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Make an API POST request to add a student
      const newStudent = await makeApiRequest('/add-student', 'POST', {
        name: values.name,
      });

      // Handle success (e.g., show a success message)
      console.log('Student added:', newStudent);

      // Reset the form after successful submission
      resetForm();
    } catch (err) {
      // Handle errors (e.g., display an error message)
      console.error('Error adding student:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Student</h2>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Student Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`form-control ${
                  touched.name && errors.name ? 'is-invalid' : ''
                }`}
                onBlur={handleBlur}
                value={values.name}
                onChange={handleChange}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Student
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddStudent;
