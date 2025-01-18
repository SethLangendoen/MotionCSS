import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/Blogs.css';  // Import your CSS for styling

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');  // State for the search query

  useEffect(() => {
    fetch('/blogs/blogs.json')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error loading blogs');
        setLoading(false);
      });
  }, []);

  // Generate slug from title for comparison
  const generateSlug = (title) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to calculate match strength with phrase and keyword prioritization
  const getMatchStrength = (text, query) => {
    if (!query) return 0;

    const lowerCaseText = text.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    
    // Split the query into individual keywords (words)
    const queryWords = lowerCaseQuery.split(' ');

    let matchStrength = 0;

    // 1. Prioritize exact phrase match
    if (lowerCaseText.includes(lowerCaseQuery)) {
      matchStrength += 0.6; // Assign high score for phrase match
    }

    // 2. Consider individual keyword matches
    queryWords.forEach((word) => {
      if (lowerCaseText.includes(word)) {
        matchStrength += 0.1; // Add a lower score for keyword match
      }
    });

    // Ensure matchStrength is within the range [0, 1]
    return Math.min(matchStrength, 1);
  };

  // Sort blogs based on the match strength
  const sortedBlogs = blogs.map((blog) => {
    const matchStrength = getMatchStrength(blog.title + ' ' + blog.content, searchQuery);
    const backgroundColor = `rgba(0, 128, 0, ${Math.min(matchStrength, 1)})`; // Adjust green shade based on match strength

    return {
      ...blog,
      matchStrength,
      backgroundColor,
    };
  }).sort((a, b) => b.matchStrength - a.matchStrength); // Sort by match strength in descending order

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="all-blogs-container">
      <h3>More Blogs</h3>

      {/* Search bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search blogs..."
        className="search-bar"
      />

      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id} style={{ backgroundColor: blog.backgroundColor }}>
            {/* Link with slug generated from title */}
            <Link to={`/blog/${generateSlug(blog.title)}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBlogs;
