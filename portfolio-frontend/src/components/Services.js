import React, { useEffect, useState } from 'react';
import instance from '../axiosInstance';  // Import the axios instance for API calls
import ReactMarkdown from 'react-markdown';
import '../css/Services.css';  // Import CSS file for styling

function Services() {
    const [services, setServices] = useState([]);  // State to store service data

    // Fetch services from the API when the component mounts
    useEffect(() => {
        instance.get('http://18.159.112.61/services/')  // Adjust the endpoint as needed
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    return (
        <section className="service-section">
            <h1 className='service-header'>🛠️ Our Services</h1>
            <div className="service-list">
                {services.map(service => (
                    <div className="service-item" key={service.id}>
                        {service.photo && (
                            <img
                                src={`http://18.159.112.61${service.photo}`}  // Full image URL
                                alt={service.title}
                                className="service-photo"  // Class for styling
                            />
                        )}
                        <h2>{service.title}</h2>
                        {/* Render service content from Markdown */}
                        <div
                            className="service-content"
                            
                        />
                        <ReactMarkdown>{service.content}</ReactMarkdown>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;
