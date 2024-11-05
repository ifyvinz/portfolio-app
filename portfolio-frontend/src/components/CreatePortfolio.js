import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CreatePortfolio.css';

const CreatePortfolio = () => {
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState(''); // Update to match backend
    const [photo, setPhoto] = useState(null);
    const [website, setWebsite] = useState('');
    const [github, setGithub] = useState('');

    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('discription', discription); // Updated to match backend
        formData.append('photo', photo);
        formData.append('website', website);
        formData.append('github', github);

        try {
            const token = localStorage.getItem('token');
            await axios.post('create_portfolio/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Portfolio created successfully!');
            navigate('/portfolio'); // Redirect to the About page
        } catch (error) {
            console.error('Error creating portfolio:', error);
            alert('Failed to create portfolio.');
        }
    };

    return (
        <div className="create-portfolio-container">
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
                    onChange={(e) => setDiscription(e.target.value)} 
                    placeholder="Description" 
                    required 
                />
                <input 
                    type="file" 
                    onChange={(e) => setPhoto(e.target.files[0])} 
                />
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
