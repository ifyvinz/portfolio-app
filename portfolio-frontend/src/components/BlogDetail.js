import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../axiosInstance';
import ReactMarkdown from 'react-markdown';  // Import react-markdown
import '../css/BlogDetail.css';

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    // Check if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    // Fetch the blog post details based on the ID from the API
    useEffect(() => {
        instance.get(`http://18.159.112.61/blogposts/${id}/`)
            .then(response => setBlog(response.data))
            .catch(error => console.error('Error fetching blog post details:', error));
    }, [id]);

    // Delete blog post function
    const deleteBlogPost = async () => {
        try {
            await instance.delete(`delete_blog/${id}/`);
            setFeedback({ message: 'Blog post successfully deleted!', type: 'success' });
            navigate('/blog');
        } catch (error) {
            console.error('Error deleting blog post:', error);
            setFeedback({ message: 'Failed to delete. Please try again.', type: 'error' });
        }
    };

    if (!blog) {
        return <p>Loading...</p>;
    }

    return (
        <section className="blog-detail">
            <h1>{blog.title}</h1>
            {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
            {blog.photo && (
                <img
                    src={`http://18.159.112.61${blog.photo}`}
                    alt={blog.title}
                    className="blog-image"
                />
            )}

            {/* Use ReactMarkdown to render Markdown content as HTML */}
            <div className="blog-content">
                <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            <p className="created-at">Published on: {blog.created_at}</p>

            {/* Show Delete Button only if authenticated */}
            {isAuthenticated && (
                <button className="delete-button" onClick={deleteBlogPost}>Delete Blog Post</button>
            )}
        </section>
    );
}

export default BlogDetail;
