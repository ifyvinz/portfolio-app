import './css/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import PortfolioDetail from './components/PortfolioDetail';
import Services from './components/Services';
import Footer from './components/Footer';
import EditProfile from './components/EditProfile';
import CreateBlog from './components/CreateBlog';
import CreatePortfolio from './components/CreatePortfolio';
import LandingPage from './components/LandingPage';
import CreateService from './components/CreateService';
import Login from './components/Login';
import CreateBadge from './components/CreateBadge';

axios.defaults.baseURL = 'http://18.159.112.61';

function App() {
    const [theme, setTheme] = useState('dark');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        console.log("Token being sent:", token);
    
        try {
            const response = await axios.post('http://18.159.112.61/logout/', null, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
    
            console.log("Logout response:", response.data);
            if (response.status === 200) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error during logout:", error.response?.data || error.message);
        }
    };
    


    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const toggleMenu = () => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
        document.body.classList.toggle('menu-open', !menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.classList.remove('menu-open');
    };

    return (
        <Router>
            <nav>
                <div className="nav-left">
                    <Link to="/" onClick={closeMenu}>Vincent.</Link>
                </div>

                <div
                    className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                >
                    {menuOpen ? '✕' : '☰'}
                </div>

                <div className={`nav-center ${menuOpen ? 'open' : ''}`}>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/portfolio" onClick={closeMenu}>Portfolio</Link>
                    <Link to="/services" onClick={closeMenu}>Services</Link>
                    <Link to="/contact" onClick={closeMenu}>Contact</Link>
                    <Link to="/blog" onClick={closeMenu}>Blog</Link>
                </div>

                <div className="nav-right">
                    <button onClick={toggleTheme} className="theme-toggle-btn">
                        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                </div>
            </nav>

            {menuOpen && <div className="backdrop" onClick={closeMenu}></div>}

            <div className="container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<About isLoggedIn={isLoggedIn} />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/create-blog" element={<CreateBlog />} />
                    <Route path="/create-portfolio" element={<CreatePortfolio />} />
                    <Route path="/create-service" element={<CreateService />} />
                    <Route path="/create-badge" element={<CreateBadge />} />

                </Routes>
            </div>

            <Footer isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </Router>
    );
}

export default App;
