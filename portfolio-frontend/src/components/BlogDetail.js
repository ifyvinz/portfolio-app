import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../axiosInstance';
import '../BlogDetail.css';

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    // Fetch the blog post details based on the ID from the API
    useEffect(() => {
        instance.get(`blogposts/${id}/`)
            .then(response => setBlog(response.data))
            .catch(error => console.error('Error fetching blog post details:', error));
    }, [id]);

    // Delete blog post function
    const deleteBlogPost = async () => {
        try {
            await instance.delete(`delete_blog/${id}/`);
            alert('Blog post deleted successfully!');
            navigate('/blog');
        } catch (error) {
            console.error('Error deleting blog post:', error);
            alert('Failed to delete the blog post.');
        }
    };

    if (!blog) {
        return <p>Loading...</p>;
    }

    return (
        <section className="blog-detail">
            <h1>{blog.title}</h1>

            {blog.photo && (
                <img
                    src={`http://127.0.0.1:8000${blog.photo}`}
                    alt={blog.title}
                    className="blog-image"
                />
            )}

            <div dangerouslySetInnerHTML={{ __html: blog.content }} className="blog-content" />
            <p className="created-at">Published on: {blog.created_at}</p>

            {/* Show Delete Button only if authenticated */}
            {isAuthenticated && (
                <button className="delete-button" onClick={deleteBlogPost}>Delete Blog Post</button>
            )}
        </section>
    );
}

export default BlogDetail;
