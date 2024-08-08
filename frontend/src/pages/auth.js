import axios from 'axios';

const API_URL = 'http://localhost:8000/';

// Function to get CSRF token from cookies
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const csrftoken = getCookie('csrftoken');


const register = async (username, password, email, first_name, last_name, user_type, grade, faculty) => {
    try {
        const response = await axios.post(`${API_URL}register/`, 
            { username, password, email, first_name, last_name, user_type, grade, faculty },
            { headers: { 'X-CSRFToken': csrftoken } }
        );
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error);
        throw error;
    }
};

const getAccessToken = () => localStorage.getItem('access_token');

const isLoggedIn = () => !!getAccessToken();

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
};

export { getAccessToken, isLoggedIn, logout, register };
