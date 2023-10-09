import React, { useState } from 'react';
import { useApi } from './ApiContext';

function DeleteStudent() {
  const { makeApiRequest } = useApi();
  const [studentId, setStudentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleDeleteStudent = async () => {
    try {
      const response = await makeApiRequest(`/delete-student/${studentId}`, 'DELETE');

      if (response && response.message) {
        // Reset the student ID field and show a success message
        setStudentId('');
        alert(response.message);
      } else {
        setErrorMessage('Failed to delete the student. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      setErrorMessage('An error occurred while deleting the student. Please try again.');
    }
  };

  return (
    <div>
      <h2>Delete Student</h2>
      <div className="form-group">
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="number"
          className="form-control"
          id="studentId"
          placeholder="Enter student ID to delete"
          value={studentId}
          onChange={handleStudentIdChange}
        />
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={handleDeleteStudent}
        >
          Delete Student
        </button>
      </div>
      {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
    </div>
  );
}

export default DeleteStudent;
