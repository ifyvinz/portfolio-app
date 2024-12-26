import '../css/PortfolioDetail.css'
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Hook to get URL parameters
import instance from '../axiosInstance';  // axios instance for API calls
import ReactMarkdown from 'react-markdown';

function PortfolioDetail() {
    const { id } = useParams();  // Get the portfolio id from the URL
    const [portfolio, setPortfolio] = useState(null);  // State to store portfolio data
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    // Fetch portfolio data based on the ID from the API
    console.log(id)
    useEffect(() => {
        instance.get(`http://18.159.112.61/portfolio/${id}/`)
            .then(response => {
                console.log(response.data);  // Debugging to see the response
                setPortfolio(response.data);
            })
            .catch(error => console.error('Error fetching portfolio details:', error));
    }, [id]);

     // Delete blog post function
     const deletePortfolio = async () => {
        try {
            await instance.delete(`delete_portfolio/${id}/`);
            alert('Porfolio post deleted successfully!');
            navigate('/portfolio');
        } catch (error) {
            console.error('Error deleting Portfolio post:', error);
            alert('Failed to delete the portfolio post.');
        }
    };

    // Display loading state or portfolio details
    if (!portfolio) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <h1>{portfolio.title}</h1>
            
            {/* Render description from Markdown */}
            
            <div><ReactMarkdown>{portfolio.discription}</ReactMarkdown></div>
            {/* Render project image */}
            {portfolio.photo && (
                <img
                    src={`http://18.159.112.61${portfolio.photo}`}  // Full image URL
                    alt={portfolio.title}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}
            
            {/* Render website and GitHub links */}
            <p>
                <a href={portfolio.website} target="_blank" rel="noopener noreferrer">Visit Website</a> | 
                <a href={portfolio.github} target="_blank" rel="noopener noreferrer"> GitHub</a>
            </p>

            {/* Show Delete Button only if authenticated */}
            {isAuthenticated && (
                <button className="delete-button" onClick={deletePortfolio}>Delete Porfolio</button>
            )}
        </section>
    );
}

export default PortfolioDetail;
