// AddCourse.js

import React, { useState } from 'react';
import { useApi } from './ApiContext';

function AddCourse() {
  const { makeApiRequest } = useApi();
  const [courseName, setCourseName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate courseName (add your own validation logic here if needed)
      if (!courseName) {
        setErrorMessage('Course name is required.');
        return;
      }

      const response = await makeApiRequest('/add-course', 'POST', { name: courseName });

      // Check for successful response (you can customize this based on your API response)
      if (response && response.message) {
        // Reset the form and error message
        setCourseName('');
        setErrorMessage('');
        alert(response.message); // Show a success message (customize as needed)
      } else {
        setErrorMessage('Failed to add the course. Please try again.'); // Display an error message
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setErrorMessage('An error occurred while adding the course. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            placeholder="Enter course name"
            value={courseName}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Course
        </button>
        {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default AddCourse;
