import React from 'react';
import { Link } from 'react-router-dom';

import '../Footer.css';

function Footer() {
    const isLoggedIn = !!localStorage.getItem('token');
    
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('token');
            window.location.reload(); // Refresh page to update footer
        }
    };

    return (
        <footer className="footer-section">
            <div className="footer-content">
                <p className="footer-author">Vincent Igbineweka © {new Date().getFullYear()}</p>

                <div className="footer-links">
                    {!isLoggedIn && (
                        <Link to="/login" className="footer-link">Login</Link>
                    )}
                    {isLoggedIn && (
                        <>
                            <Link to="/edit-profile" className="footer-link">Edit Profile</Link>
                            <Link to="/create-blog" className="footer-link">Create Blog</Link>
                            <Link to="/create-portfolio" className="footer-link">Create Portfolio</Link>
                            <Link to="/create-service" className="footer-link">Create Service</Link>
                            <button onClick={handleLogout} className="footer-button footer-link">Logout</button>
                        </>
                    )}
                </div>

                <p className="footer-thanks">Thank you for visiting my portfolio website!</p>
            </div>
        </footer>
    );
}

export default Footer;
