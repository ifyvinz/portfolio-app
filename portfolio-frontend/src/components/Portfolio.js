import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import instance from '../axiosInstance';  // axios instance for API calls

function Portfolio() {
    const [portfolios, setPortfolios] = useState([]); // State to store portfolio data

    // Fetch portfolio data from API when component mounts
    useEffect(() => {
        instance.get('portfolio/')
            .then(response => setPortfolios(response.data))
            .catch(error => console.error('Error fetching portfolio:', error));
    }, []);

    return (
        <section>
            <h1>Portfolio</h1>
            <p>Here are some of my projects...</p>
            <ul>
                {portfolios.map(portfolio => (
                    <li key={portfolio.id}>
                        <h2>{portfolio.title}</h2>
                        
                        {/* Render description from Markdown */}
                        <p dangerouslySetInnerHTML={{ __html: portfolio.discription }}></p>
                        
                        {/* Render project image */}
                        {portfolio.photo && (
                            <img
                                src={`http://127.0.0.1:8000${portfolio.photo}`}  // Full image URL
                                alt={portfolio.title}  // Alt text for accessibility
                                style={{ maxWidth: '100%', height: 'auto' }}  // Responsive image styling
                            />
                        )}
                        
                        {/* Link to the detailed portfolio page */}
                        
                        <Link to={`/portfolio/${portfolio.id}`}>View Details</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Portfolio;
