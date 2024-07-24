import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/usera/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log('There was an error >>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', error);
            });
    }, []);

    return (
        <div className="user-list-container">
            <h1 className="user-list-heading">User List</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.UserID}>
                                <td>{user.UserID}</td>
                                <td>{user.Username}</td>
                                <td>{user.Role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="no-users">No users available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
