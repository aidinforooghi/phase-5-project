// ListCourses.js

import React, { useEffect, useState } from 'react';
import { useApi } from './ApiContext';

function ListCourses() {
  const { makeApiRequest } = useApi();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of courses when the component mounts
    const fetchCourses = async () => {
      try {
        const courseList = await makeApiRequest('/list-courses');
        setCourses(courseList);
      } catch (error) {
        console.error('Error fetching course list:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>List of Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListCourses;
