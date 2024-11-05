import '../Blog.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import instance from '../axiosInstance';  // import axios instance from axiosInstance.js to set up for API calls

function Blog() {
    const [blogs, setBlogs] = useState([]);  // State to hold blog posts

    useEffect(() => {
        // Fetch blog posts from Django API
        instance.get('blogposts/')
            .then(response => setBlogs(response.data))  // Store fetched data in blogs state
            .catch(error => console.error('Error fetching blog posts:', error));  // Handle errors
    }, []);  // The empty dependency array means this effect runs only once when the component mounts

    return (
        <section className='blog-section'>
            <h1 className='blog-header'>📝 Blog</h1>
            <div className='blog-list'>
                {blogs.map(blog => (
                    <div key={blog.id} className='blog-card'>
                        <h2>{blog.title}</h2>
                        
                        {/* Display only the first sentence of the blog content */}
                        <p>{blog.content.split('. ')[0] + '.'}</p>

                        {/* Display blog date */}
                        <p className='blog-date'>Published on: {blog.created_at}</p>

                        {/* Link to the blog detailed page */}
                        <Link to={`/blog/${blog.id}`}>Read More</Link>
                        
                        
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Blog;
