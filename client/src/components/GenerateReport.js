// GenerateReport.js

import React, { useEffect, useState } from 'react';
import { useApi } from './ApiContext';

function GenerateReport() {
  const { makeApiRequest } = useApi();
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Fetch the report data when the component mounts
    const fetchReportData = async () => {
      try {
        const data = await makeApiRequest('/generate-report');
        setReportData(data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div>
      <h2>Report</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.Student.name}</td>
              <td>{item.Course.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenerateReport;
