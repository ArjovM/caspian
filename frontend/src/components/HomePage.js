import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Modal'

const HomePage = () => {
  const [subjects, setSubjects] = useState([]);
  const API_URL = 'http://localhost:8000/';
  const [resource, setResource] = useState('');
  const [resourceInfo, setResourceInfo] = useState('');
  const [subjectID, setSubjectId] = useState('');
  const [resourceData, setResourceData] = useState([]);

  const [error, setError] = useState(null);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios.get('/subjecta/')
      .then(response => {

        setSubjects(response.data);

      })
      .catch(error => {
        console.log('The error is', error);
      });
  }, []);

  const studyResource = async (subjectID, resourceInfo, resource) => {
    try {
      const response = await axios.post(`${API_URL}addresource/`,
        { subjectID, resourceInfo, resource },
      );

      return response.data;
    } catch (error) {
      console.error('Study Resource error:', error.response ? error.response.data : error);
      throw error;
    }
  };

  const addStudyResource = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const newStudyResource = await studyResource(subjectID, resourceInfo, resource);
      setResourceData(prevResourceData => [newStudyResource, ...prevResourceData]); // Add new notice to the top of the list
      setResourceInfo('');
      setResource('');
      setSubjectId('');
      console.log("Study Resource was added successfully");
    } catch (err) {
      console.error("Error during adding study resource:", err);
      setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
    }
  };

  const renderSubjectsInGrid = () => {
    return subjects.reduce((rows, subject, index) => {
      // Organize subjects into rows of 4 columns
      if (index % 4 === 0) {
        rows.push([]);
      }
      const rowIndex = Math.floor(index / 4);
      rows[rowIndex].push(
        <div className="grid-item" key={subject.SubjectID}>
          <Link style={{ textDecoration: 'none' }} to={`/subject`}>
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
    <>
      <div className="grid-container">
        {user && user.user_type === "2" && <div className="button-group"><button class="add-resource-button" onClick={handleOpen}>Add Study Resource</button></div>}
      <div className="grid-items">
        {renderSubjectsInGrid()}
      </div>
    </div >
      <Modal isOpen={open}>
        <>
          <h1>Add a Study Resource</h1>
          <form onSubmit={addStudyResource}>
            <textarea
              type="text-field"
              placeholder="Description"
              value={resourceInfo}
              onChange={(e) => setResourceInfo(e.target.value)}
              className="input-field"
            />
            <input
              type="file"
              id='myfile'
              onChange={(e) => setResource(e.target.value)}
              value={resource}
              name="myfile"
            />
            <select
              value={subjectID}
              onChange={(e) => setSubjectId(e.target.value)}
              className="input-field"
            >
              <option value="" disabled>Select Subject</option>
              <option value="1">Physics</option>
              <option value="2">Chemistry</option>
              <option value="3">Botany</option>
              <option value="4">Zoology</option>
              <option value="5">Mathematics</option>
              <option value="6">English</option>
              <option value="7">Nepali</option>
              <option value="8">Computer Science</option>
              <option value="9">Business Studies</option>
              <option value="10">Accountancy</option>
              <option value="11">Economics</option>
              <option value="12">Hotel Management</option>
            </select>
            <div className="button-group">
              <button type="submit" class="submit-button">Submit</button>
              <button onClick={handleClose} class="close-button">Close</button>
            </div>
          </form>
        </>
      </Modal>
    </>

  );
};

export default HomePage;
