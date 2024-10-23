import '../PortfolioDetail.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Hook to get URL parameters
import instance from '../axiosInstance';  // axios instance for API calls

function PortfolioDetail() {
    const { id } = useParams();  // Get the portfolio id from the URL
    const [portfolio, setPortfolio] = useState(null);  // State to store portfolio data

    // Fetch portfolio data based on the ID from the API
    console.log(id)
    useEffect(() => {
        instance.get(`portfolio/${id}/`)
            .then(response => {
                console.log(response.data);  // Debugging to see the response
                setPortfolio(response.data);
            })
            .catch(error => console.error('Error fetching portfolio details:', error));
    }, [id]);

    // Display loading state or portfolio details
    if (!portfolio) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <h1>{portfolio.title}</h1>
            
            {/* Render description from Markdown */}
            <p dangerouslySetInnerHTML={{ __html: portfolio.discription }}></p>
            
            {/* Render project image */}
            {portfolio.photo && (
                <img
                    src={`http://127.0.0.1:8000${portfolio.photo}`}  // Full image URL
                    alt={portfolio.title}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}
            
            {/* Render website and GitHub links */}
            <p>
                <a href={portfolio.website} target="_blank" rel="noopener noreferrer">Visit Website</a> | 
                <a href={portfolio.github} target="_blank" rel="noopener noreferrer"> GitHub</a>
            </p>
        </section>
    );
}

export default PortfolioDetail;
