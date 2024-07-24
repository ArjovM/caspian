// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/books/')
            .then(response => {
                setBooksData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div>
            <h1>Books List</h1>
            <ul>
                {booksData.map(item => (
                    <li key={item.BooksID}>
                        <h2>{item.BookName}</h2>
                        <p>Author: {item.Authors}</p>
                        <p>Teacher: {item.TeacherName}</p>
                        <a href={item.File}>Download File</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
