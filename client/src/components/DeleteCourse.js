import React, { useState } from 'react';
import { useApi } from './ApiContext';

function DeleteCourse() {
  const { makeApiRequest } = useApi();
  const [courseId, setCourseId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCourseIdChange = (e) => {
    setCourseId(e.target.value);
  };

  const handleDeleteCourse = async () => {
    try {
      const response = await makeApiRequest(`/delete-course/${courseId}`, 'DELETE');

      if (response && response.message) {
        // Reset the course ID field and show a success message
        setCourseId('');
        alert(response.message);
      } else {
        setErrorMessage('Failed to delete the course. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      setErrorMessage('An error occurred while deleting the course. Please try again.');
    }
  };

  return (
    <div>
      <h2>Delete Course</h2>
      <div className="form-group">
        <label htmlFor="courseId">Course ID:</label>
        <input
          type="number"
          className="form-control"
          id="courseId"
          placeholder="Enter course ID to delete"
          value={courseId}
          onChange={handleCourseIdChange}
        />
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={handleDeleteCourse}
        >
          Delete Course
        </button>
      </div>
      {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
    </div>
  );
}

export default DeleteCourse;
