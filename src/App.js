import './App.css';
import React, { useState } from 'react';
import Search from './components/Search';
import AnimationLoader from './components/AnimationLoader';

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

    // Add more categories as necessary
  ];

  return (
    <div className="App">
      <Search categories={categories} onCategorySelect={handleCategorySelect} />
      <AnimationLoader selectedCategory={selectedCategory} />
      {/* <AnimationIntegration animation={selectedAnimation} /> */}

    </div>
  );
}

export default App;
