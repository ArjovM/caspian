import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  logout, isLoggedIn } from './auth';
import axios from 'axios';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const navigate = useNavigate();
  const API_URL = 'http://localhost:8000/';

  const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, { username, password });
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user));

        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error);
        throw error;
    }
};
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setLoggedIn(true);
      navigate('/');  // Redirect to home page after login
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate('/login');  // Redirect to login page after logout
  };

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <div className="login-form-container">
      {loggedIn ? (
        <div className="welcome-container">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-form">
          <h1>Login to visit the Site</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button type="submit" className="login-button">Login</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
