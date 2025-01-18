// src/components/Filters.js

import React from 'react';
import '../CSS/Filters.css'

const Filters = ({ filters, onFilterChange }) => {
  const { duration, iterationCount, animationType } = filters;

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...filters, [filterType]: value });
  };

  return (
    <div className="filters scaleUpFadeInSlideUp">
      {/* Duration Slider */}
      <div className="filter">
        <label htmlFor="duration">Min Duration (seconds): {duration}</label>
        <input
          type="range"
          id="duration"
          min="0"
          max="10"
          step="0.1"
          value={duration}
          onChange={(e) => handleFilterChange('duration', parseFloat(e.target.value))}
        />
      </div>

      {/* Iteration Count Slider */}
      <div className="filter">
        <label htmlFor="iterationCount">Min Iteration Count: {iterationCount}</label>
        <input
          type="range"
          id="iterationCount"
          min="1"
          max="10"
          step="1"
          value={iterationCount}
          onChange={(e) => handleFilterChange('iterationCount', parseInt(e.target.value))}
        />
      </div>

      {/* Animation Type Filter */}
      <div className="filter">
        <label htmlFor="animationType">Animation Type:</label>
        <select
          id="animationType"
          value={animationType}
          onChange={(e) => handleFilterChange('animationType', e.target.value)}
        >
          <option value="All">All</option>
          <option value="basic">Basic</option>
		  <option value="advanced">Advanced</option>
          <option value="creative">Creative</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
