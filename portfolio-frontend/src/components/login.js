import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

//axios.defaults.baseURL = 'http://18.159.112.61';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        try {
            // Send login request to the backend
            const response = await axios.post('http://18.159.112.61/login/', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                const { token, username } = response.data;
                localStorage.setItem('token', token); // Save the token in localStorage
                setIsLoggedIn(true); // Update the logged-in state
                console.log(`Logged in as ${username}`);
                navigate('/'); // Redirect to the home page or dashboard
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            if (error.response) {
                console.error('Server responded with:', error.response.data); // Response data
                console.error('Status code:', error.response.status); // HTTP status
            } else if (error.request) {
                console.error('No response received:', error.request); // Request made but no response
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
        
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Set username state
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set password state
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
