import React, { useState, useEffect } from 'react';
import { useApi } from './ApiContext';

function EnrollStudent() {
  const { makeApiRequest } = useApi();
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      const studentsResponse = await makeApiRequest('/list-students');
      const coursesResponse = await makeApiRequest('/list-courses');
      if (Array.isArray(studentsResponse)) {
        setStudents(studentsResponse);
      }
      if (Array.isArray(coursesResponse)) {
        setCourses(coursesResponse);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Check if students and courses are already loaded
    if (students.length === 0 || courses.length === 0) {
      fetchData();
    }
  }, [students, courses]);

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleCourseIdChange = (e) => {
    setCourseId(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate studentId and courseId (add your own validation logic here if needed)
      if (!studentId || !courseId) {
        setErrorMessage('Both student ID and course ID are required.');
        return;
      }

      const response = await makeApiRequest('/enroll-student', 'POST', {
        student_id: studentId,
        course_id: courseId,
      });

      // Check for successful response (you can customize this based on your API response)
      if (response && response.message) {
        // Reset the form and error message
        setStudentId('');
        setCourseId('');
        setErrorMessage('');
        alert(response.message); // Show a success message (customize as needed)
      } else {
        setErrorMessage('Failed to enroll the student. Please try again.'); // Display an error message
      }
    } catch (error) {
      console.error('Error enrolling student:', error);
      setErrorMessage('An error occurred while enrolling the student. Please try again.');
    }
  };

  // Filter the students and courses based on searchText
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2>Enroll Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="number"
            className="form-control"
            id="studentId"
            placeholder="Enter student ID"
            value={studentId}
            onChange={handleStudentIdChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseId">Course ID:</label>
          <input
            type="number"
            className="form-control"
            id="courseId"
            placeholder="Enter course ID"
            value={courseId}
            onChange={handleCourseIdChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enroll Student
        </button>
        {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
      </form>

      <div className="mt-4">
        <h3>Search Students and Courses</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mt-4">
        <h3>Students</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h3>Courses</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnrollStudent;
