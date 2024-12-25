import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CreatePortfolio.css';

const CreatePortfolio = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [website, setWebsite] = useState('');
    const [github, setGithub] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('photo', photo);
        formData.append('website', website);
        formData.append('github', github);

        try {
            const token = localStorage.getItem('token');
            await axios.post('create_portfolio/', formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFeedback({ message: 'Portfolio created successfully!', type: 'success' });
            setTimeout(() => navigate('/portfolio'), 2000);
        } catch (error) {
            setFeedback({ message: 'Failed to create portfolio. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="create-portfolio-container">
            {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
            <form onSubmit={handleSubmit} className="create-portfolio-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Website URL"
                    required
                />
                <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="GitHub URL"
                    required
                />
                <button type="submit">Create Portfolio</button>
            </form>
        </div>
    );
};

export default CreatePortfolio;
