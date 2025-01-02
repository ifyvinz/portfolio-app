import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import instance from '../axiosInstance';
import axios from 'axios';
import '../css/CreateService.css';

axios.defaults.baseURL = 'https://www.ifyvinz.com/api/';
function CreateService() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    const navigate = useNavigate(); // Initialize navigate

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
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        //formData.append('photo', photo);
        //console.log(photo)
        if (photo) formData.append('photo', photo);
        formData.append('content', content);
        console.log('FormData entries:', Array.from(formData.entries())); // Debugging
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://www.ifyvinz.com/api/create_service/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken, // Send the CSRF token
                    
                 },
            });
            console.log('Response:', response.data);
            setMessage('Service created successfully!');
            setTitle('');
            setContent('');
            setPhoto(null);
            navigate('/services'); // Redirect to the Services page
        } catch (error) {
            console.error('Error:', error.response?.data || error.message); // Debugging
            console.error('Error creating service:', error);
            setMessage('Error creating service.');
        }
    };

    return (
        <div className="create-service-container">
            <h2 className="create-service-header">Add New Service</h2>
            <form onSubmit={handleSubmit} className="create-service-form">
                <label htmlFor="title">Service Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="content">Service Description (Markdown):</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <label htmlFor="photo">Upload Service Image:</label>
                <input
                    type="file"
                    id="photo"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />

                <button type="submit" className="submit-button">Create Service</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default CreateService;
