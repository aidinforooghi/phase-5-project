// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import AddStudent from './AddStudent';
import AddCourse from './AddCourse';
import ListStudents from './ListStudents';
import ListCourses from './ListCourses';
import DeleteCourse from './DeleteCourse';
import DeleteStudent from './DeleteStudent';
import GenerateReport from './GenerateReport';
import EnrollStudent from './EnrollStudent';
import DeleteAllEnrollments from './DeleteAllEnrollments';

import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import { ApiProvider } from './ApiContext';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <Router>
      <ApiProvider>
        <div>
          <NavBar />
          <div className="container mt-4">
            <Switch>
              <ProtectedRoute  exact path="/add-student" component={AddStudent} />
              <ProtectedRoute exact path="/add-course" component={AddCourse} />
              <ProtectedRoute exact path="/list-students" component={ListStudents} />
              <ProtectedRoute exact path="/list-courses" component={ListCourses} />
              <ProtectedRoute exact path="/delete-course/:courseId" component={DeleteCourse} />
              <ProtectedRoute exact path="/delete-student/:studentId" component={DeleteStudent} />
              <ProtectedRoute exact path="/delete-all-enrollments" component={DeleteAllEnrollments} />
              <ProtectedRoute exact path="/enroll-student" component={EnrollStudent} />
              <ProtectedRoute exact path="/generate-report" component={GenerateReport} />
              <Route exact path="/register" component={RegistrationForm} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/logout" component={LogoutButton} />
              <Route path="/" component={() => <div>Welcome to the Home Page</div>} />
            </Switch>
          </div>
        </div>
      </ApiProvider>
    </Router>
  );
}

export default App;
