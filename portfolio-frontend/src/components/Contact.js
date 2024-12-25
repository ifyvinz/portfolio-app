import '../css/Contact.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [file, setFile] = useState(null); // Store the uploaded file
    const [csrfToken, setCsrfToken] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' }); // Feedback for success/error messages

    // Fetch the CSRF token from the cookie
    const getCsrfToken = () => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        setCsrfToken(cookieValue);
    };

    useEffect(() => {
        getCsrfToken();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataObj = new FormData(); // Use FormData to handle files
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('message', formData.message);
        if (file) formDataObj.append('file', file); // Append file if available

        axios.post('send-email/', formDataObj, {
            headers: {
                'X-CSRFToken': csrfToken, // Send the CSRF token
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        })
        .then(response => {
            setFeedback({ message: 'Message sent successfully!', type: 'success' });
            setFormData({ name: '', email: '', message: '' });
            setFile(null);
        })
        .catch(error => {
            setFeedback({ message: 'Error sending message. Please try again.', type: 'error' });
        });
    };

    return (
        <section>
            <h1 className="contact-header">📨 Contact Me</h1>
            {feedback.message && (
              <p className={`feedback ${feedback.type}`}>
                 {feedback.type === 'success' ? '✅' : '❌'} {feedback.message}
              </p>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <input
                    type="file"
                    onChange={e => setFile(e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.pdf,.docx"
                />
                <button type="submit">Send</button>
            </form>
        </section>
    );
}

export default Contact;
