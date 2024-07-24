import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get('/anotifications/')
            .then(response => {
                setNotifications(response.data);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
    }, []);

    return (
        <div className="table-container">
            <h1>Notifications</h1>
            <table className="notification-table">
                <thead>
                    <tr>
                        <th>Notification ID</th>
                        <th>Description</th>
                        <th>Teacher ID</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map(notifications => (
                        <tr key={notifications.notificationID}>
                            <td>{notifications.NotificationID}</td>
                            <td>{notifications.Description}</td>
                            <td>{notifications.TeacherID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NotificationList;
