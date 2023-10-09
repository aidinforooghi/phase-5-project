// NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook

function NavBar() {
  const { loggedIn, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <div className="collapse navbar-collapse">
        {loggedIn && ( // Conditionally render the logout button if loggedIn is true
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link" to="/add-student">
                Add Student
              </Link>
            </li>
           
            <li className="nav-item">
              <Link className="nav-link" to="/add-course">
                Add Course
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/list-students">
                List Students
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list-courses">
                List Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/enroll-student">
                Enroll Student
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/generate-report">
                Generate Report
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/delete-course/:id">
                Delete Course
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/delete-student/:id">
                Delete Student
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/delete-all-enrollments">
                Delete All enrollments
              </Link>
            </li>

            <li className="nav-item">
              <button onClick={logout} className="btn btn-link nav-link">Logout</button>
            </li>





          </ul>
           )}

{!loggedIn && ( // Conditionally render login and register links if not loggedIn

<ul className="navbar-nav">
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
            </ul>
          )}

        </div>
      </div>
    </nav>
  );
}

export default NavBar;
