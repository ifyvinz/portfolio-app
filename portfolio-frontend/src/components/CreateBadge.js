import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateBadge.css'; // Ensure the path is correct.

axios.defaults.baseURL = 'http://18.159.112.61';

const CreateBadge = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('url', url);

        try {
            await axios.post('http://18.159.112.61/create_badge/', formData);
            setSuccess(true);
            setName('');
            setImage(null);
            setUrl('');
        } catch (error) {
            console.error('Error creating badge:', error);
        }
    };

    return (
        <div className="create-badge-container">
            <h2>Create a Badge</h2>
            {success && <p className="success-message">Badge created successfully!</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image:
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </label>
                <label>
                    URL:
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Badge</button>
            </form>
        </div>
    );
};

export default CreateBadge;
