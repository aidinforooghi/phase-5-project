import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function LoginForm() {
  const history = useHistory();
  const { login } = useAuth();
  const [error, setError] = useState(null); // Add state for error message

  const handleLogin = async (values) => {
    const { username, password } = values;

    // Make a fetch request to log in the user
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login successful
        login(true);
        history.push('/add-student');
      } else {
        // Handle login failure
        const data = await response.json();
        setError(data.error); // Set the error message received from the server
      }
    } catch (error) {
      // Handle network errors
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={(values) => {
          const errors = {};

          if (!values.username) {
            errors.username = 'Username is required';
          }

          if (!values.password) {
            errors.password = 'Password is required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await handleLogin(values);
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

            {error && <div className="text-danger">{error}</div>} {/* Display the error message */}
            
            <div className="form-group">
              <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
