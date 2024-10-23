import React, { useState } from 'react';
import axios from 'axios';
import '../Contact.css';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [csrfToken, setCsrfToken] = useState('');

    // Fetch the CSRF token from the cookie
    const getCsrfToken = () => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        setCsrfToken(cookieValue);
    };

    // Fetch CSRF token when the component mounts
    React.useEffect(() => {
        getCsrfToken();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
            'send-email/',  // Updated endpoint
            formData,
            {
                headers: {
                    'X-CSRFToken': csrfToken,  // Send the CSRF token in the request header
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => alert('Message sent successfully!'))
            .catch(error => alert('Error sending message: ' + error));
    };

    return (
        <section>
            <h1>Contact Me</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                ></textarea>
                <button type="submit">Send</button>
            </form>
        </section>
    );
}

export default Contact;
