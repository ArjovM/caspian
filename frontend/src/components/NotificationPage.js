import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [description, setDescription] = useState('');

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = 'http://localhost:8000/';


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const notice = async (Description, Notifier, Role) => {
        try {
            const response = await axios.post(`${API_URL}addnotification`,
                { Description, Notifier, Role },
            );
            return response.data;
        } catch (error) {
            console.error('Notification error:', error.response ? error.response.data : error);
            throw error;
        }
    };


    const addNotice = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const newNotice = await notice(description, user.username, user.user_type);
            setNotifications(prevNotifications => [newNotice, ...prevNotifications]); // Add new notice to the top of the list
            setDescription(''); // Clear the input field
            console.log("Notice added successfully");
        } catch (err) {
            console.error("Error during adding notice:", err);
            setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
        }
    };

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
        <>
        <div className="noticeboard-container">
            {user && (user.user_type === "2" || user.user_type === "1") && (
                <div className="add-notice-container">
                    <button onClick={handleOpen} className="add-button">Add Notice</button>
                </div>
            )}
            <h1>Noticeboard</h1>
            <div className="notification-list">
                {notifications.map(notification => (
                    <div key={notification.notificationID} className="notification-card">
                        <div className="notification-description">{notification.Description}</div>
                        <div className="notification-details">
                        <span className="notification-notifier">Posted by: {notification.Notifier}</span>
                        <span className="notification-role">Role: {notification.Role === "2" ? "Teacher": "Admin"}</span>
                    </div>


                    </div>
                ))}
            </div>
        </div>
        <Modal isOpen={open} onRequestClose={handleClose}>
            <div className="modal-content">
                <h1>Add a Notice</h1>
                <form onSubmit={addNotice}>
                    <textarea
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">Add</button>
                    <button type="button" onClick={handleClose} className="close-button">Close</button>
                </form>
            </div>
        </Modal>
    </>
    );
};

export default NotificationList;
