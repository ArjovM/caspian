import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookResourcesList = () => {
    const [bookResourcesData, setBookResourcesData] = useState([]);
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

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
        <div className="book-resources-container">
            <h1>Ebooks List</h1>{user && (user.user_type === "2" || user.user_type === "1") && <div><button>Add Ebooks</button></div>}
            <table className="book-resources-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Teacher</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    {bookResourcesData.map(bookResources => (
                        <tr key={bookResources.ebooksID}>
                            <td>{bookResources.title}</td>
                            <td>{bookResources.author}</td>
                            <td>{bookResources.teacherName}</td>
                            <td><a href={bookResources.file}>Download File</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookResourcesList;
