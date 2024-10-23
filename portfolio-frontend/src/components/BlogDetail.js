import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Hook to get URL parameters
import instance from '../axiosInstance';  // axios instance for API calls
import '../BlogDetail.css';  // Import BlogDetail.css for styling


/*function formatDate(dateString) {
    if (!dateString) return 'Date not available';

    // Remove microseconds and timezone offset
    const cleanedDateString = dateString.split('.')[0].replace('+00:00', '');

    // Convert to a JavaScript Date object
    const date = new Date(cleanedDateString);

    // Format the date as DD/MM/YYYY
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
}*/

/*<p className="created-at">
    Published on: {formatDate(blog.created_at)}
</p>*/


function BlogDetail() {
    const { id } = useParams();  // Get the blog post ID from the URL
    const [blog, setBlog] = useState(null);  // State to store the blog data

    // Fetch the blog post details based on the ID from the API
    useEffect(() => {
        instance.get(`blogposts/${id}/`)
            .then(response => setBlog(response.data))
            .catch(error => console.error('Error fetching blog post details:', error));
    }, [id]);

    if (!blog) {
        return <p>Loading...</p>;
    }
    console.log(blog.created_at)
    return (
        <section className="blog-detail">
            <h1>{blog.title}</h1>

            {/* Render blog post image if available */}
            {blog.photo && (
                <img
                    src={`http://127.0.0.1:8000${blog.photo}`}
                    alt={blog.title}
                    className="blog-image"
                />
            )}

            {/* Render blog content */}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} className="blog-content" />
              
            <p className="created-at">Published on: {blog.created_at}</p>
        </section>
    );
}

export default BlogDetail;
