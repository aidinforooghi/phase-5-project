// ListStudents.js

import React, { useEffect, useState } from 'react';
import { useApi } from './ApiContext';

function ListStudents() {
  const { makeApiRequest } = useApi();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the list of students when the component mounts
    const fetchStudents = async () => {
      try {
        const studentList = await makeApiRequest('/list-students');
        setStudents(studentList);
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>List of Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListStudents;
