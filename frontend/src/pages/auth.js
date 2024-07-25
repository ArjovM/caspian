// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}login/`, { username, password });
    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
};

const getAccessToken = () => localStorage.getItem('access_token');

const isLoggedIn = () => !!getAccessToken();

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export { login, getAccessToken, isLoggedIn, logout };
