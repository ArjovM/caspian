import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, isLoggedIn } from './auth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const navigate = useNavigate();

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
    // Update the logged-in status
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Welcome!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
