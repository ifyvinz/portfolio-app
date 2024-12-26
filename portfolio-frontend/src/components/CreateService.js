import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import instance from '../axiosInstance';
import axios from 'axios';
import '../css/CreateService.css';

axios.defaults.baseURL = 'http://18.159.112.61';
function CreateService() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

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
            const response = await axios.post('http://18.159.112.61/create_service/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                    
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
