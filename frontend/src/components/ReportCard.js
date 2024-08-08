import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddReport from './AddReport';

const ReportCard = () => {
  const [report, setReport] = useState([]);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    axios.get('http://localhost:8000/report/')
      .then(response => {
        setReport(response.data);
      })
      .catch(error => {
        console.error('Error fetching report cards:', error);
      });
  }, []);

  const firstReport = report.length > 0 ? report[0] : null;

  return (
    <div className="report-card-container">
      <h2>Report Card</h2>
      {user && user.user_type === "1" && <AddReport />}
      <div className="report-card">
        <div className="report-card-header">
          <h3>Report Cards</h3>
          {firstReport && (
            <div className="report-summary">
              <p><strong>Student:</strong> {firstReport.student}</p>
              <p><strong>Course:</strong> {firstReport.course}</p>
              <p><strong>Grade:</strong> {firstReport.grade}</p>
              <p><strong>Term:</strong> {firstReport.term}</p>
            </div>
          )}
        </div>
        <div className="report-card-body">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {report.map((reportCard, index) => (
                <tr key={index}>
                  <td>{reportCard.subject}</td>
                  <td>{reportCard.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
