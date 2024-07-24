import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username: 'your_username',
                password: 'your_password'
            });
            console.log('Token:', response.data.token);
        } catch (err) {
            console.error('Error:', err.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {token && <div>Token: {token}</div>}
            {error && <div>{error}</div>}
        </div>
    );
};

export default LoginForm;
