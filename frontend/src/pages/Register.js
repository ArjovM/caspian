// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { register } from './auth';

// const RegisterForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

//   const [firstName, setFirstName] = useState('');

//   const [lastName, setLastName] = useState('');


//   const [error, setError] = useState(null);
//   const [userType, setUserType] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       await register(username, password, email, firstName, lastName,userType);

//       console.log("Registered>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
//     //   setLoggedIn(true);
//     //   navigate('/');  // Redirect to home page after login
//     } catch (err) {
//         console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee", err)
//       setError(err);
//     }
//   };


//   return (
//     <div className="login-form-container">
//         <div className="login-form">
//           <h1>Sign up</h1>
//           <form onSubmit={handleSignUp}>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="input-field"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input-field"
//             />

// <input
//               type="email"
//               placeholder="your email..."
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input-field"
//             />

// <input
//               type="text"
//               placeholder="First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="input-field"
//             />

            
// <input
//               type="text"
//               placeholder="Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="input-field"
//             />

// <input
//               type="text"
//               placeholder="User Type"
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//               className="input-field"
//             />

//             <button type="submit" className="login-button">Sign up</button>
//           </form>
//           {error && <p className="error-message">{error}</p>}
//         </div>
      
//     </div>
//   );
// };

// export default RegisterForm;


// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './auth';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await register(username, password, email, firstName, lastName, userType);
      console.log("Registered successfully");
      navigate('/');  // Redirect to home page or wherever you need
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
    }
  };

  console.log("username>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", userType)

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
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
          <button type="submit" className="login-button">Sign Up</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
