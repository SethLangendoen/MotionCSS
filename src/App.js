import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import AnimationLoader from './components/AnimationLoader';
import KeyframesGuide from './components/KeyframesGuide';
import BlogList from './components/blogs/BlogList';
import BlogPage from './components/blogs/BlogPage';  // Import the BlogPage component
import Navbar from './components/Navbar';  // Import the Navbar component

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default to "All"

  // Function to handle category selection from the Search component
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Update the selected category in state
  };

  const categories = [
    { name: 'Slide' },
    { name: 'Bounce' },
    { name: 'Fade' },
    { name: "Zoom" },
    { name: "Rotate" },
    { name: "Text" },
    { name: "Flip" },
    { name: "Pulse" },
    { name: "Border" },
    { name: "Box Shadow" },
    { name: "Background" },
    { name: "3D and Skew" },
    // Add more categories as necessary
  ];

  return (
    <div className="App">
      <Navbar />  {/* Add Navbar to the app */}

      <Routes>
        {/* Route for the blog list */}
        <Route path="/" element={
          <>
            <Search categories={categories} onCategorySelect={handleCategorySelect} />
            <AnimationLoader selectedCategory={selectedCategory} />
            <KeyframesGuide />
            <BlogList />
          </>
        } />

        {/* Route for the individual blog page */}
        <Route path="/blog/:slug" element={<BlogPage />} />
      </Routes>
    </div>
  );
}

export default App;
