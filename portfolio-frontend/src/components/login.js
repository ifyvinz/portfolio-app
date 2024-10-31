import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('login/', { username, password });
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            navigate('/'); // Redirect to the About page
            window.location.reload();  // Refresh to update footer visibility
        } catch (error) {
            alert('Login failed. Check username and password.');
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
