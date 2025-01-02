import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CreateBadge.css'; // Ensure the path is correct.

//axios.defaults.baseURL = 'https://www.ifyvinz.com/api/';

const CreateBadge = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    const getCsrfToken = () => {
            const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];
            setCsrfToken(cookieValue);
        };
    
        useEffect(() => {
            getCsrfToken();
        }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('url', url);

        try {
            const token = localStorage.getItem('token');
            await axios.post('https://www.ifyvinz.com/api/create_badge/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'X-CSRFToken': csrfToken, // Send the CSRF token
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });
            setSuccess(true);
            setName('');
            setImage(null);
            setUrl('');
        } catch (err) {
            console.error('Error creating badge:', err);
            setError('Failed to create badge. Please try again.');
        }
    };

    return (
        <div className="create-badge-container">
            <h2>Create a Badge</h2>
            {success && <p className="success-message">Badge created successfully!</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image:
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </label>
                <label>
                    URL:
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Badge</button>
            </form>
        </div>
    );
};

export default CreateBadge;
