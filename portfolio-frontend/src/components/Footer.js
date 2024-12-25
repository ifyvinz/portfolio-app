import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Footer.css';

function Footer({ isLoggedIn, handleLogout }) {
    return (
        <footer className="footer-section">
            <div className="footer-content">
                <p className="footer-author">Vincent Igbineweka © {new Date().getFullYear()}</p>

                <div className="footer-links">
                    {/* Login/Logout buttons */}
                    <div className="footer-login-logout">
                        {!isLoggedIn && (
                            <Link to="/login" className="footer-link login-btn">Login</Link>
                        )}
                        {isLoggedIn && (
                            <button onClick={handleLogout} className="footer-link logout-btn">Logout</button>
                        )}
                    </div>

                    {/* Links section (Edit Profile, Create Blog, etc.) */}
                    {isLoggedIn && (
                        <div className="footer-column-links">
                            <div className="footer-column">
                                <Link to="/edit-profile" className="footer-link">Edit Profile</Link>
                                <Link to="/create-blog" className="footer-link">Create Blog</Link>
                                <Link to="/create-portfolio" className="footer-link">Create Portfolio</Link>
                            </div>
                            <div className="footer-column">
                                <Link to="/create-service" className="footer-link">Create Service</Link>
                                <Link to="/create-badge" className="footer-link">Create Badge</Link>
                            </div>
                        </div>
                    )}
                </div>

                <p className="footer-thanks">Thank you for visiting my portfolio website!</p>
            </div>
        </footer>
    );
}

export default Footer;
