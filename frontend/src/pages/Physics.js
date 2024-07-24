import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhysicsList = () => {
    const [physicsData, setPhysicsData] = useState([]);

    useEffect(() => {
        axios.get('/physica/')  // Adjusted endpoint
            .then(response => {
                setPhysicsData(response.data);  // Set the fetched data to state
            })
            .catch(error => {
                console.error('There was an error fetching the physics data!', error);
            });
    }, []);

    return (
        <div className="table-container">
            <h1>Physics List</h1>
            <table className="physics-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>File</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {physicsData.map(physics => (
                        <tr key={physics.PhysicsID}>
                            
                            <td>{physics.Description}</td>
                            <td><a href={physics.FileField}>Download</a></td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PhysicsList;
