import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../About.css';

const About = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/profile/');
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="about-container">
            {profile ? (
                <>
                    <div className="about-left">
                        <img src={`http://127.0.0.1:8000${profile.photo}`}  alt="Vincent" className="profile-photo" />
                        <div className="social-links">
                            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href={profile.linkedln} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href={profile.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                        </div>
                        <a href={profile.resume} download className="resume-download">
                            Download Resume
                        </a>
                    </div>
                    <div className="about-right about-content">
                        <div dangerouslySetInnerHTML={{ __html: profile.about }} />
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default About;
