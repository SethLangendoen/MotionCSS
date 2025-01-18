import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../../CSS/Blogs.css';  // Import your CSS for styling
import BlogList from './BlogList';

const BlogPage = () => {
  const { slug } = useParams();  // Get the blog slug from the URL
  const navigate = useNavigate();  // Use navigate to go back to the home page
  const [blogs, setBlogs] = useState([]);  // State to store the blogs
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to track errors
  const [hovered, setHovered] = useState(false); // State for hover tracking

  useEffect(() => {
    // Fetch the blogs from the JSON file
    fetch('/blogs/blogs.json')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);  // Set the blogs to state
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError('Error loading blogs');  // Set error if fetching fails
        setLoading(false);  // Set loading to false
      });
  }, []);

  // Generate the slug for comparison
  const generateSlug = (title) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  };

  // Find the blog by slug
  const blog = blogs.find((b) => generateSlug(b.title) === slug);

  const handleBackClick = () => {
    navigate('/');  // Navigate to the home page
    // Use a small delay after navigation to ensure the page renders
    setTimeout(() => {
      document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' });
    }, 700); // Allow the page to render before scrolling
  };

  if (loading) {
    return <p>Loading...</p>;  // Display loading message while fetching
  }

  if (error) {
    return <p>{error}</p>;  // Display error message if there's an issue with fetching
  }

  if (!blog) {
    return <p>Blog not found</p>;  // Display message if the blog is not found
  }

  return (
    <div>
      {/* Meta tags using react-helmet */}
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.metaDescription} />
        <meta name="keywords" content={blog.metaKeywords} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
      </Helmet>

      <div className="blog-content scaleFadeSlideInUp">

        {/* <button
          onClick={handleBackClick}
          className={`back-button ${hovered ? 'borderBoxShadowShake' : ''}`}
          onMouseEnter={() => setHovered(true)} // Add hover class on mouse enter
          onMouseLeave={() => setHovered(false)} // Remove hover class on mouse leave
        >
          Back
        </button> */}
        <h2>{blog.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  );
};

export default BlogPage;
