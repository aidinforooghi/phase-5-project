// LogoutButton.js

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LogoutButton() {
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Implement a logout request to the server if needed

    // Clear any user-related data (e.g., tokens) in local storage or cookies if used

    // Call the logout function from AuthContext
    logout();

    // Redirect to the login page or any other desired route
    history.push('/login');
  };

  return (
    <button className="btn btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;