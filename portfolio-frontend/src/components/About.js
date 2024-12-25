import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import '../css/About.css';

const About = ({ isLoggedIn }) => {
    const [profile, setProfile] = useState(null);
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/profile/');
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        const fetchBadges = async () => {
            try {
                const response = await axios.get('/badges/');
                console.log("Fetched badges:", response.data); // Debug badges
                setBadges(response.data);
            } catch (error) {
                console.error("Error fetching badges:", error);
            }
        };

        fetchProfile();
        fetchBadges();
    }, []);

    const handleDelete = async (id) => {
        console.log("Deleting badge with ID:", id); // Debug id
        try {
            await axios.delete(`/delete_badge/${id}/`);
            setBadges(badges.filter(badge => badge.id !== id));
        } catch (error) {
            console.error("Error deleting badge:", error);
        }
    };

    return (
        <div className="about-container">
            {profile ? (
                <>
                    <div className="about-left">
                        <img src={`http://127.0.0.1:8000${profile.photo}`} alt="Vincent" className="profile-photo" />
                        <div className="social-links">
                            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href={profile.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                        </div>
                        <a href={profile.resume} download className="resume-download">
                            Download Resume
                        </a>
                    </div>
                    <div className="about-right about-content">
                        <h2>About Me</h2>
                        <ReactMarkdown>{profile.about}</ReactMarkdown>

                        <h3>Badges</h3>
                        <div className="badges">
                            {badges.map((badge, index) => (
                                <div key={badge.id || `badge-${index}`} className="badge-card">
                                    <a href={badge.url} target="_blank" rel="noopener noreferrer">
                                        <img src={`http://127.0.0.1:8000${badge.image}`} alt={badge.name} />
                                    </a>
                                    {isLoggedIn && (
                                        <button
                                            className="delete-badge-btn"
                                            onClick={() => handleDelete(badge.id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default About;
