// src/components/RegisterLogin.js
import React, { useState } from 'react';
import { register, login } from './auth';

const RegisterLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    try {
      const response = await register(username, password, role);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering:', error.response.data);
    }
  };

  const handleLogin = async () => {
    try {
        console.log('reached here ----"jlopipi:::::::::::::::::::::::::::::::::');

      const response = await login(username, password);
      if (response && response.data) {
        console.log('Login successful:::::::::::::::::::::::::::::::::');

        console.log('Login successful:::::::::::::::::::::::::::::::::', response.data);

        console.log('Login successful:::::::::::::::::::::::::::::::::');

      } else {
        console.error('Unexpected response:::::::::::::::::::::::::::::;', response);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Register</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Role"
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>

      <div className="form-container">
        <h1>Login</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
