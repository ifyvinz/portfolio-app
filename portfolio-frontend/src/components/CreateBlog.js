import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CreateBlog.css';

axios.defaults.baseURL = 'http://18.159.112.61';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('photo', photo);

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://18.159.112.61/create_blog/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFeedback({ message: 'Blog created successfully!', type: 'success' });
            setTimeout(() => navigate('/blog'), 2000);
        } catch (error) {
            setFeedback({ message: 'Failed to create blog. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="create-blog-container">
            <form onSubmit={handleSubmit} className="create-blog-form">
                {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                />
                <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
};

export default CreateBlog;
