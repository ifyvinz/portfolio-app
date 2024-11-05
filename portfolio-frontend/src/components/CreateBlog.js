import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CreateBlog.css';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);

    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('photo', photo);

        try {
            const token = localStorage.getItem('token');
            await axios.post('create_blog/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Blog created successfully!');
            navigate('/blog'); // Redirect to the About page
        } catch (error) {
            console.error('Error creating blog:', error);
            alert('Failed to create blog.');
        }
    };

    return (
        
            <div className="create-blog-container">
                <form onSubmit={handleSubmit} className="create-blog">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                    <button type="submit">Create Blog</button>
                </form>
            </div>
        
        
    );
};

export default CreateBlog;
