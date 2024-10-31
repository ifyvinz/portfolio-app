import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../LandingPage.css';

const LandingPage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('profile/');
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="landing-container">
            {profile ? (
                <>
                    <div className="profile-photo">
                        <img src={`http://127.0.0.1:8000${profile.photo}`}  alt="Vincent" />
                    </div>
                    <h1 className="mission-message">Creating Solutions from Code to Cloud</h1>
                    <div className="landing-buttons">
                        {profile.resume && (
                          <a href={`http://127.0.0.1:8000${profile.resume}`} target="_blank" rel="noopener noreferrer" className="download-resume" download>
                              Download My Resume
                          </a>
                        )}
                        <Link to="/contact" className="contact-link">
                            Contact Me
                        </Link>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default LandingPage;
