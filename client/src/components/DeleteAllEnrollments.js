import React, { useState } from 'react';
import { useApi } from './ApiContext';

function DeleteAllEnrollments() {
  const { makeApiRequest } = useApi();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDeleteAllEnrollments = async () => {
    setIsDeleting(true);

    try {
      // Make an API request to delete all enrollments
      const response = await makeApiRequest('/delete-all-enrollments', 'DELETE');

      // Check for successful response
      if (response && response.success) {
        setDeleteSuccess(true);
      } else {
        // Handle deletion failure
        // You can display an error message or take other actions
      }
    } catch (error) {
      // Handle API request errors
      console.error('Error deleting enrollments:', error);
      // You can display an error message or take other actions
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h2>Delete All Enrollments</h2>
      {deleteSuccess ? (
        <div className="alert alert-success">All enrollments have been deleted successfully.</div>
      ) : (
        <>
          <p>Are you sure you want to delete all enrollments?</p>
          <button
            className="btn btn-danger"
            onClick={handleDeleteAllEnrollments}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete All Enrollments'}
          </button>
        </>
      )}
    </div>
  );
}

export default DeleteAllEnrollments;
