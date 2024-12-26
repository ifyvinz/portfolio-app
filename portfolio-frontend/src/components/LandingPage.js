import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';

axios.defaults.baseURL = 'http://18.159.112.61';

const LandingPage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://18.159.112.61/profile/');
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
                        <img src={`http://18.159.112.61${profile.photo}`} alt="Vincent" />
                    </div>
                    <h1 className="mission-message">Creating Solutions from Code to the Cloud</h1>
                    <p className="mission-paragraph">
                        "To inspire and innovate through technology by crafting purposeful digital solutions that connect, empower, and drive positive change, while continuously growing and sharing knowledge to contribute to a more interconnected world."
                    </p>
                    <div className="landing-buttons">
                        {profile.resume && (
                            <a href={`http://18.159.112.61${profile.resume}`} target="_blank" rel="noopener noreferrer" className="download-resume" download>
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
