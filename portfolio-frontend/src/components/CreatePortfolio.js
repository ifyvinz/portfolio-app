import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CreatePortfolio.css';

axios.defaults.baseURL = 'http://18.159.112.61';

const CreatePortfolio = () => {
    const [title, setTitle] = useState('');
    const [discription, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [website, setWebsite] = useState('');
    const [github, setGithub] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('discription', discription);
        formData.append('photo', photo);
        formData.append('website', website);
        formData.append('github', github);
    
        console.log('FormData entries:', Array.from(formData.entries())); // Debugging
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://18.159.112.61/create_portfolio/', formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);
            setFeedback({ message: 'Portfolio created successfully!', type: 'success' });
            setTimeout(() => navigate('/portfolio'), 2000);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message); // Debugging
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
                    value={discription}
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
