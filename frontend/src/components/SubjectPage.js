import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage2 = () => {
  const [course, setCourse] = useState([]);


  useEffect(() => {
    axios.get('/subjecta/')
      .then(response => {

        setCourse(response.data);

      })
      .catch(error => {
        console.log('The error is', error);
      });
  }, []);

  const renderCoursesInGrid = () => {
    return course.reduce((rows, course, index) => {
      // Organize subjects into rows of 4 columns
      if (index % 4 === 0) {
        rows.push([]);
      }
      const rowIndex = Math.floor(index / 4);
      rows[rowIndex].push(
        <div className="grid-item" key={course.id}>
          <Link style={{ textDecoration: 'none' }} to={`/grade`}>
            <div className='text-item'>{course.course_name}</div>
          </Link>
        </div>
      );
      return rows;
    }, []).map((row, index) => (
      <div className="grid-row" key={index}>{row}</div>
    ));
  };

  return (
    <div className="container">
      <div className="grid-container">
        {renderCoursesInGrid()}
      </div>
    </div>
  );


};

export default HomePage2;