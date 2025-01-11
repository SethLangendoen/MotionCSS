// import React, { useEffect, useState } from 'react';
// import '../../CSS/Blogs.css'; // Import your CSS for styling
// import Blog from './Blog';  // Import Blog component to display selected blog content

// const BlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);  // State for the selected blog
//   const [isTransitioning, setIsTransitioning] = useState(false); // To manage the transition state
//   const [isExiting, setIsExiting] = useState(false); // To manage the exit transition of the selected blog

//   useEffect(() => {
//     fetch('/blogs/blogs.json')  // Ensure the correct path for the JSON file
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Fetched blogs:', data);  // Log the fetched data
//         setBlogs(data);
//       })
//       .catch((error) => console.error('Error loading blogs:', error));
//   }, []);

//   const handleBlogClick = (blog) => {
//     setIsTransitioning(true);  // Start transition for previews
//     setTimeout(() => {
//       setSelectedBlog(blog);  // Set the selected blog after a short delay
//     }, 1000); // Ensure the transition happens first before changing the blog
//   };

//   const handleBackClick = () => {
//     setIsExiting(true); // Start the exit transition for the selected blog
//     setTimeout(() => {
//       setSelectedBlog(null); // Reset the selected blog after the exit animation
//       setIsTransitioning(false); // Reset the transition state for previews
//       setIsExiting(false); // Reset the exit animation state
//     }, 1000); // Allow the animation to finish before resetting the state
//   };

//   return (
//     <div className="blog-list">
//       <h2>Latest Blogs</h2>
      
//       {/* Back button appears only when a blog is selected */}
//       {selectedBlog && (
//         <button className={`back-button ${isExiting ? 'scaleBounceFadeOutSlideDown' : 'scaleFadeSlideInUp'}`} onClick={handleBackClick}>
//           Back to Blog List
//         </button>
//       )}

//       {/* Apply animation classes based on the selected blog */}
//       <div className={`blog-previews ${isTransitioning ? 'scaleBounceFadeOutSlideDown' : 'scaleFadeSlideInUp'}`}>
//         {blogs.length > 0 ? (
//           blogs.map((blog) => (
//             <div
//               className={`blog-preview ${selectedBlog ? 'hidden scaleBounceFadeOutSlideDown' : ''}`} 
//               key={blog.id}
//               onClick={() => handleBlogClick(blog)}
//             >
//               <img src={require(`../../images/blogs/${blog.image}`)} alt={blog.title} />
//               <h3>{blog.title}</h3>
//               <p>{blog.excerpt}</p>
//               <small>{blog.date}</small>
//             </div>
//           ))
//         ) : (
//           <p>Loading blogs...</p>
//         )}
//       </div>

//       {/* Render the selected blog content with slide-in animation */}
//       {selectedBlog && (
//         <div className={`selected-blog-content ${isExiting ? 'scaleBounceFadeOutSlideDown' : 'scaleFadeSlideInUp'}`}>
//           <Blog blog={selectedBlog} />
//         </div>
//       )}
//     </div>
//   );
// };


// export default BlogList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/Blogs.css';  // Import your CSS for styling

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false); // To manage the transition state
  const navigate = useNavigate();  // Used to change the URL dynamically

  useEffect(() => {
    fetch('/blogs/blogs.json')  // Ensure the correct path for the JSON file
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched blogs:', data);  // Log the fetched data
        setBlogs(data);
      })
      .catch((error) => console.error('Error loading blogs:', error));
  }, []);

  const generateSlug = (title) => {
	return title.replace(/\s+/g, '-').toLowerCase();
  };
  

  const handleBlogClick = (blog) => {
    setIsTransitioning(true);  // Start transition for previews
    setTimeout(() => {
      // Navigate to the blog page by its slug
      navigate(`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`);
    }, 1000); // Ensure the transition happens first before changing the URL
  };



  return (
    <div className="blog-list" id='blog-section'>
      <h2>Latest Blogs</h2>

      {/* Apply animation classes based on the selected blog */}
      <div className={`blog-previews ${isTransitioning ? 'scaleBounceFadeOutSlideDown' : 'scaleFadeSlideInUp'}`}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
			  id={generateSlug(blog.title)}  // Set the ID to match the slug
              className={`blog-preview`} 
              key={blog.id}
              onClick={() => handleBlogClick(blog)}  // Trigger URL update on click
            >
              {/* Blog Preview */}
              <img src={require(`../../images/blogs/${blog.image}`)} alt={blog.title} />
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <small>{blog.date}</small>
            </div>
          ))
        ) : (
          <p>Loading blogs...</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
