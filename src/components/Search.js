import React, { useState } from 'react';
import '../CSS/Search.css';
import motionLogo from '../images/motionLogo.png';

const Search = ({ categories, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default is "All"

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory); // Set the selected category in state
    onCategorySelect(selectedCategory); // Pass the selected category to the parent
  };

  return (
    <div className="search-container">
		<div id = 'logoTitle'>
		<img src = {motionLogo} alt='CSS Library Logo' id='logoImg'></img>
      <h1 id = 'title'>MotionCSS</h1>
	  </div>

      <p>
        Discover and download high-quality CSS animations to enhance your website's design. 
      </p>

      <div className="category-buttons">
        {/* Radio button for "All" category */}
        <input
          type="radio"
          id="all"
          name="category"
          value="All"
          checked={selectedCategory === 'All'}
          onChange={handleCategoryChange}
        />
        <label htmlFor="all">All</label>

        {/* Radio buttons for each category */}
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              id={category.name}
              name="category"
              value={category.name}
              checked={selectedCategory === category.name}
              onChange={handleCategoryChange}
            />
            <label htmlFor={category.name}>{category.name}</label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Search;
