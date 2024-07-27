import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhysicsList = () => {
    const [resourceData, setResourceData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;


    useEffect(() => {
        axios.get('/subject/')  // Adjusted endpoint
            .then(response => {
                setResourceData(response.data);  // Set the fetched data to state
            })
            .catch(error => {
                console.error('There was an error fetching the resource data!', error);
            });
    }, []);

    useEffect(() => {
        axios.get('/subjecta/')  // Adjusted endpoint
            .then(response => {
                setSubjectData(response.data);  // Set the fetched data to state
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="table-container">
            {user && (user.user_type === "2" || user.user_type === "1") && <div><button>Add Study Resource</button></div>}
            <h1>Study Resources</h1>
            <table className="physics-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>File</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {resourceData.filter((data)=>data.subjectID === 2).map(resource => (
                        <tr key={resource.studyResourceId}>
                            
                            <td>{resource.resourceInfo}</td>
                            <td><a href={resource.resource}>Download</a></td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PhysicsList;
