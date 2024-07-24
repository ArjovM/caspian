import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        axios.get('/subjecta/')
            .then(response => {

                setSubjects(response.data); 

            })
            .catch(error => {
                console.log('The error is', error);
            });
    }, []);


    const renderSubjectsInGrid = () => {
      return subjects.reduce((rows, subject, index) => {
        // Organize subjects into rows of 4 columns
        if (index % 4 === 0) {
          rows.push([]);
        }
        const rowIndex = Math.floor(index / 4);
        rows[rowIndex].push(
          <div className="grid-item" key={subject.SubjectID}>
            <Link style={{ textDecoration: 'none' }}to={`/subject/${subject.SubjectID}`}>
              <div className='text-item'>{subject.SubjectName}</div>
            </Link>
          </div>
        );
        return rows;
      }, []).map((row, index) => (
        <div className="grid-row" key={index}>{row}</div>
      ));
    };


    return (
        <div className="grid-container">
            <div className='subtitle-item'>All Subjects</div>
            <div className="grid-items">
                {renderSubjectsInGrid()}
            </div>
        </div>
    );
};

export default HomePage;
