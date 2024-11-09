import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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

function App() {
    const [theme, setTheme] = useState('dark');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Router>
            <nav>
                <div className="nav-left">
                    <Link to="/" onClick={() => setMenuOpen(false)}>Vincent.</Link>
                </div>
                <div className="hamburger-menu" onClick={toggleMenu}>
                    {menuOpen ? '✕' : '☰'}
                </div>
                <div className={`nav-center ${menuOpen ? 'open' : ''}`}>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
                    <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                    <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>

                    {/* Move theme toggle button to the center for mobile */}
                    <div className="nav-right mobile-center">
                       <button onClick={toggleTheme} className="theme-toggle-btn">
                           {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                       </button>
                    </div>
                </div>
            </nav>

            <div className="container">
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/edit-profile' element={<EditProfile />} />
                    <Route path="/create-blog" element={<CreateBlog />} />
                    <Route path="/create-portfolio" element={<CreatePortfolio />} />
                    <Route path="/create-service" element={<CreateService />} />
                </Routes>
            </div>

            <Footer />
        </Router>
    );
}

export default App;
