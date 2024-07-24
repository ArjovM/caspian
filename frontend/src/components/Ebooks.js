// src/components/EbooksList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EbooksList = () => {
    const [ebooksData, setEbooksData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/ebooks/')
            .then(response => {
                setEbooksData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div>
            <h1>Ebooks List</h1>
            <ul>
                {ebooksData.map(item => (
                    <li key={item.ebooksID}>
                        <p>Author: {item.Authors}</p>
                        <p>Teacher: {item.TeacherName}</p>
                        <a href={item.File}>Download File</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EbooksList;
