import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../axiosInstance';
import '../css/CreateService.css';

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
        formData.append('content', content);
        if (photo) formData.append('photo', photo);

        try {
            await instance.post('create_service/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Service created successfully!');
            setTitle('');
            setContent('');
            setPhoto(null);
            navigate('/services'); // Redirect to the Services page
        } catch (error) {
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
