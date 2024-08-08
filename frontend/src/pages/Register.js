import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './auth';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('');
  const [grade, setGrade] = useState('');
  const [faculty, setFaculty] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }


  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await register(username, password, email, firstName, lastName, userType, grade, faculty);
      console.log("Registered successfully");

      navigate('/register');  // Redirect to home page or wherever you need
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h1>Sign up Teacher/Student</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <div className="input-container mb-4 flex">
            <input
              type={type}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <span className="icon-container" onClick={handleToggle}>
              <Icon className="icon" icon={icon} size={25} />
            </span>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          />
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="input-field"
          >
            <option value="" disabled>Select User Type</option>
            <option value="2">Teacher</option>
            <option value="3">Student</option>
          </select>
          { userType === '3' &&
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="input-field"
            >
              <option value="" disabled>Select Grade</option>
              <option value="1">11</option>
              <option value="2">12</option>
            </select>


          }
          <select
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className="input-field"
          >
            <option value="" disabled>Select Faculty</option>
            <option value="1">Science</option>
            <option value="2">Management</option>
          </select>

          <button type="submit" className="login-button">Sign Up</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
