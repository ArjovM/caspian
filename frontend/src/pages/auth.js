// import axios from 'axios';

// // fetch('/get-csrf-token/')
// //   .then(response => response.json())
// //   .then(data => {
// //     const csrftoken = data.token;
// //   });

// const API_URL = 'http://localhost:8000/';

// const login = async (username, password) => {
//     const response = await axios.post(`${API_URL}login/`, { username, password });
//     if (response.data.access) {
//         localStorage.setItem('access_token', response.data.access);
//         localStorage.setItem('refresh_token', response.data.refresh);
//     }
//     return response.data;
// };

// const register = async (username, password, email, firstName, lastName, userType) => {
//     console.log("heree")
//     // const csrftoken = getCookie('csrftoken');
//     const response = await axios.post(`${API_URL}register/`, { username, password, email, firstName, lastName,userType });
//     //  {   headers: {
//     //       'X-CSRFToken': csrftoken,
//     //     },});
//     return response.data;
// };

// const getAccessToken = () => localStorage.getItem('access_token');

// const isLoggedIn = () => !!getAccessToken();

// const logout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
// };

// export { login, getAccessToken, isLoggedIn, logout, register };


// auth.js
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

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, { username, password });
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error);
        throw error;
    }
};

const register = async (username, password, email, first_name, last_name, user_type) => {
    try {
        const response = await axios.post(`${API_URL}register/`, 
            { username, password, email, first_name, last_name, user_type },
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
};

export { login, getAccessToken, isLoggedIn, logout, register };
