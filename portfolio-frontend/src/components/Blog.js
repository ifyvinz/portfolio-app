import '../Blog.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import instance from '../axiosInstance';  // import  axios instance from axioInstance.js to set up for API calls

function Blog() {
    const [blogs, setBlogs] = useState([]);  // State to hold blog posts

    useEffect(() => {
        // Fetch blog posts from Django API
        instance.get('blogposts/')
            .then(response => setBlogs(response.data))  // Store fetched data in blogs state
            .catch(error => console.error('Error fetching blog posts:', error));  // Handle errors
    }, []);  // The empty dependency array means this effect runs only once when the component mounts

    return (
        <section>
            <h1>Blog</h1>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <h2>{blog.title}</h2>
                        
                        {/* Display blog photo if available */}
                        {blog.photo && (
                            <img src={`http://127.0.0.1:8000${blog.photo}`} alt={blog.title} style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                        
                        {/* Render markdown content as HTML */}
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                        {/* Link to the blog detailed page */}
                        
                        <Link to={`/blog/${blog.id}`}>Read More</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Blog;
