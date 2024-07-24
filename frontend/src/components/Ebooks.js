// src/components/BookResourcesList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookResourcesList = () => {
    const [bookResourcesData, setBookResourcesData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/bookresources/')
            .then(response => {
                setBookResourcesData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div>
            <h1>Ebooks List!!</h1>
            <ul>
                {bookResourcesData.map(bookResources => (
                    <li key={bookResources.ebooksID}>
                        <h2>{bookResources.title}</h2>
                        <p>Author: {bookResources.author}</p>
                        <p>Teacher: {bookResources.teacherName}</p>
                        <a href={bookResources.file}>Download File</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookResourcesList;
