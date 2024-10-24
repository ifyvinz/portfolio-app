import React, { useEffect, useState } from 'react';
import instance from '../axiosInstance';  // import axios instance for API calls
import '../About.css';  // Assuming you'll be adding custom CSS for styling

function About() {
    const [profile, setProfile] = useState(null);  // State to hold profile data

    useEffect(() => {
        // Fetch profile data from Django API
        instance.get('profile/')
            .then(response => setProfile(response.data))  // Store fetched data in profile state
            .catch(error => console.error('Error fetching profile:', error));  // Handle errors
    }, []);  // This effect runs only once when the component mounts

    if (!profile) {
        return <p>Loading...</p>;  // Display loading message while data is being fetched
    }

    return (
        <section className="about-section">
            <div className="profile-container">
                <h1 className="about-title">About Me</h1>
                
                {/* Display profile photo */}
                {profile.photo && (
                    <div className="profile-photo-container">
                        <img 
                            src={`http://127.0.0.1:8000${profile.photo}`} 
                            alt="Profile" 
                            className="profile-photo" 
                        />
                    </div>
                )}
                
                {/* Markdown content rendered as HTML */}
                <div className="about-content" dangerouslySetInnerHTML={{ __html: profile.about }} />



                {/* Social links */}
                <div className="social-links">
                    {profile.github && (
                        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link">
                            GitHub
                        </a>
                    )}
                    {profile.linkedln && (
                        <a href={profile.linkedln} target="_blank" rel="noopener noreferrer" className="social-link">
                            LinkedIn
                        </a>
                    )}
                    {profile.twitter && (
                        <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                            Twitter
                        </a>
                    )}
                </div>

                {/* Resume download */}
                {profile.resume && (
                    <a href={`http://127.0.0.1:8000${profile.resume}`} target="_blank" rel="noopener noreferrer" className="download-resume" download>
                        Download My Resume
                    </a>
                )}
            </div>
        </section>
    );
}

export default About;
