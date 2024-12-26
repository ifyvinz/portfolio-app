import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/EditProfile.css';

axios.defaults.baseURL = 'http://18.159.112.61';

const EditProfile = () => {
    const [about, setAbout] = useState('');
    const [photo, setPhoto] = useState(null);
    const [resume, setResume] = useState(null);
    const [github, setGithub] = useState('');
    const [linkedln, setLinkedln] = useState('');
    const [twitter, setTwitter] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://18.159.112.61/profile/', {
                    headers: { Authorization: `Token ${token}` }
                });
                const profile = response.data;
                setAbout(profile.about);
                setGithub(profile.github);
                setLinkedln(profile.linkedln);
                setTwitter(profile.twitter);
            } catch (error) {
                console.error('Failed to load profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('about', about);
        if (photo) formData.append('photo', photo);
        if (resume) formData.append('resume', resume);
        formData.append('github', github);
        formData.append('linkedln', linkedln);
        formData.append('twitter', twitter);
    
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://18.159.112.61/edit_profile/', formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFeedback({ message: 'Profile updated successfully!', type: 'success' });
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setFeedback({ message: 'Failed to update profile. Please try again.', type: 'error' });
        }
    };
    

    return (
        <div className="edit-profile-container">
            <form onSubmit={handleSubmit} className="edit-profile-form">
                {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
                <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="About"
                    required
                />
                <input 
                    type="file" 
                    onChange={(e) => setPhoto(e.target.files[0])} 
                />
                <input 
                    type="file" 
                    onChange={(e) => setResume(e.target.files[0])} 
                />
                <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="GitHub URL"
                    required
                />
                <input
                    type="url"
                    value={linkedln}
                    onChange={(e) => setLinkedln(e.target.value)}
                    placeholder="LinkedIn URL"
                    required
                />
                <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="Twitter URL"
                    required
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}    
export default EditProfile;
