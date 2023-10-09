import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function RegistrationForm() {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values) => {
    // Reset error and success messages when submitting the form
    setErrorMessage('');
    setSuccessMessage('');

    // Make a fetch request to register the user
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Registration successful
        setSuccessMessage('Registration successful');
      } else {
        // Handle registration failure
        const data = await response.json();
        setErrorMessage(data.error);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      setErrorMessage('Network error');
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};

          if (!values.username) {
            errors.username = 'Username is required';
          }

          if (!values.email) {
            errors.email = 'Email is required';
          }

          if (!values.password) {
            errors.password = 'Password is required';
          }

          if (!values.passwordConfirmation) {
            errors.passwordConfirmation = 'Password confirmation is required';
          } else if (values.password !== values.passwordConfirmation) {
            errors.passwordConfirmation = 'Passwords do not match';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                className="form-control"
                id="username"
                name="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <Field
                type="password"
                className="form-control"
                id="passwordConfirmation"
                name="passwordConfirmation"
              />
              <ErrorMessage
                name="passwordConfirmation"
                component="div"
                className="text-danger"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            {errorMessage && (
              <div className="text-danger mt-2">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-success mt-2">{successMessage}</div>
            )}
          </Form>
        )}
      </Formik>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegistrationForm;
