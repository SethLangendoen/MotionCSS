import React, { useState, useEffect } from 'react';
import '../../CSS/Advanced.css'; // Make sure to create a separate CSS for the advanced section
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import Prism default styling
import 'prismjs/components/prism-javascript.min.js'; // Import JavaScript syntax highlighting
import 'prismjs/components/prism-css.min.js'; // Import CSS syntax highlighting
import 'prismjs/components/prism-markup.min.js'; // Import HTML syntax highlighting

// images (only include if there exists the property and the property isn't '')
import html from '../../images/component/html.png';
import javascript from '../../images/component/javaScript.png';
import css from '../../images/component/css.png';
// images for controls if keyframes exists in css. 
import play from '../../images/playAnimation.png';
import stop from '../../images/stopAnimation.png';

const Advanced = () => {
  const [animations, setAnimations] = useState([]);
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [activeTab, setActiveTab] = useState('html'); // Controls which tab (HTML, CSS, JS) is visible
  const [selectedCategory, setSelectedCategory] = useState('all'); // Controls the selected category
  const [isPlaying, setIsPlaying] = useState(false); // Track animation play state
 

  useEffect(() => {
    // Load animations from the JSON file
    fetch('/animations/advancedAnimations.json')
      .then((response) => response.json())
      .then((data) => setAnimations(data))
      .catch((error) => console.error('Error loading animations:', error));
  }, []);
  
  useEffect(() => {
    // When an animation is selected, inject the CSS and execute the JS
    if (selectedAnimation) {
      injectCSS(selectedAnimation.css);
      executeJS(selectedAnimation.js);
    }
  }, [selectedAnimation]);
  
  useEffect(() => {
    Prism.highlightAll(); // Apply syntax highlighting
  }, [selectedAnimation, activeTab]);
  
  useEffect(() => {
    // Automatically select the first animation in the filtered list when the category changes
    const filtered = filterAnimations();
    if (filtered.length > 0) {
      setSelectedAnimation(filtered[0]);
    } else {
      setSelectedAnimation(null); // Clear selection if no animations match the category
    }
  }, [selectedCategory, animations]); // Re-run when the selected category or animations list changes
  
  useEffect(() => {
    if (selectedAnimation) {
      executeJS(selectedAnimation.js); // Re-run JS for animation when tab changes
    }
  }, [activeTab]);

  // Handle clicking on an animation to display it in the box
  const handleAnimationClick = (animation) => {
    setSelectedAnimation(animation);
    setIsPlaying(false); // Reset play state when a new animation is selected
  };

  // Function to inject CSS dynamically
  const injectCSS = (css) => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
  };

  // Function to execute JS dynamically
  const executeJS = (js) => {
    try {
      new Function(js)(); // Safer than eval
    } catch (e) {
      console.error('Error executing JS:', e);
    }
  };

  // Toggle tab visibility
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle category radio button change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to categorize animations
  const categorizeAnimation = (animation) => {
    const categories = ['footer', 'paragraph', 'text', 'background', 'toggle', 'slider', 'table', 'card', 'loading','menu','dropdown', 'radio','layout'];

    // Check if the animation's name contains a category keyword
    const matchCategory = categories.find(category => animation.name.toLowerCase().includes(category));

    return matchCategory;
  };

  // Filter animations based on the selected category
  const filterAnimations = () => {
    return animations.filter((animation) => {
      const category = categorizeAnimation(animation);

      // If the selected category is "all", show all animations
      if (selectedCategory === 'all') return true;

      return category === selectedCategory;
    });
  };

  const formatText = (text) => {
	// Convert camelCase or PascalCase to normal text with spaces
	return text
	  .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Insert space between lowercase and uppercase
	  .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')  // Handle PascalCase properly
	  .replace(/_/g, ' ')  // Replace underscores with spaces if needed
	  .toLowerCase()  // Convert everything to lowercase
	  .replace(/^\w/, (c) => c.toUpperCase());  // Capitalize the first letter
  };
  

 

  return (
    <div className="advanced-container">
      <h2>Pre-Built Components</h2>
	  <h3 id='componentDesc'>Pick from a wide array of pre-built components to integrate into your website directly! </h3>

      {/* Category Filter */}
      <div className="category-filter">
        {/* Category filter labels here */}

        <label>
          <input
            type="radio"
            name="category"
            value="all"
            checked={selectedCategory === 'all'}
            onChange={() => handleCategoryChange('all')}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="footer"
            checked={selectedCategory === 'footer'}
            onChange={() => handleCategoryChange('footer')}
          />
          Footer
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="paragraph"
            checked={selectedCategory === 'paragraph'}
            onChange={() => handleCategoryChange('paragraph')}
          />
          Paragraph
        </label>
		<label>
          <input
            type="radio"
            name="category"
            value="dropdown"
            checked={selectedCategory === 'dropdown'}
            onChange={() => handleCategoryChange('dropdown')}
          />
          Dropdown
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="text"
            checked={selectedCategory === 'text'}
            onChange={() => handleCategoryChange('text')}
          />
          Text
        </label>
		<label>
          <input
            type="radio"
            name="category"
            value="layout"
            checked={selectedCategory === 'layout'}
            onChange={() => handleCategoryChange('layout')}
          />
          Layout
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="background"
            checked={selectedCategory === 'background'}
            onChange={() => handleCategoryChange('background')}
          />
          Background
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="toggle"
            checked={selectedCategory === 'toggle'}
            onChange={() => handleCategoryChange('toggle')}
          />
          Toggle
        </label>
		<label>
          <input
            type="radio"
            name="category"
            value="radio"
            checked={selectedCategory === 'radio'}
            onChange={() => handleCategoryChange('radio')}
          />
          radio
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="slider"
            checked={selectedCategory === 'slider'}
            onChange={() => handleCategoryChange('slider')}
          />
          Slider
        </label>
		<label>
          <input
            type="radio"
            name="category"
            value="loading"
            checked={selectedCategory === 'loading'}
            onChange={() => handleCategoryChange('loading')}
          />
          Loading
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="table"
            checked={selectedCategory === 'table'}
            onChange={() => handleCategoryChange('table')}
          />
          Table
        </label>
		<label>
          <input
            type="radio"
            name="category"
            value="menu"
            checked={selectedCategory === 'menu'}
            onChange={() => handleCategoryChange('menu')}
          />
          Menu
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="card"
            checked={selectedCategory === 'card'}
            onChange={() => handleCategoryChange('card')}
          />
          Card
        </label>
      </div>




      {/* List of animations (filtered based on selected category) */}
	  	<div id='animation-list-and-display'>
			<div className="animations-list">
				{filterAnimations().map((animation, index) => (
				<div
					key={index}
					className="animation-item"
					onClick={() => handleAnimationClick(animation)}
				>
					<h3>{formatText(animation.name)}</h3>
				</div>
				))}
			</div>


			{/* Display the selected animation */}
			{selectedAnimation && (
				<div className="animation-box">
				<div id="animation-code">
				<h3 className="animationName">{formatText(selectedAnimation.name)}</h3>
					<p className="animationDesc">{selectedAnimation.description}</p>

					{/* Tab toggle buttons using images */}
					<div className="tab-toggle">
					<button onClick={() => handleTabChange('html')} className={activeTab === 'html' ? 'active' : ''}>
						<img src={html} alt="HTML" />
					</button>
					<button onClick={() => handleTabChange('css')} className={activeTab === 'css' ? 'active' : ''}>
						<img src={css} alt="CSS" />
					</button>
					{selectedAnimation.js && selectedAnimation.js !== '' && (
					<button onClick={() => handleTabChange('js')} className={activeTab === 'js' ? 'active' : ''}>
						<img src={javascript} alt="JavaScript" />
					</button>
					)}

					</div>

					{/* Play/Stop Button */}
					{/* {containsKeyframes(selectedAnimation.css) && (
					<button className="play-stop-btn" onClick={handlePlayStop}>
						<img src={isPlaying ? stop : play} alt="Play/Stop" />
					</button>
					)} */}

					{/* HTML Preview */}
					{activeTab === 'html' && (
					<div className="html-preview">
						<pre className='pre-box'>
						<code className="language-markup">{selectedAnimation.html}</code>
						</pre>
					</div>
					)}

					{/* CSS Preview */}
					{activeTab === 'css' && (
					<div className="css-preview">
						<pre className='pre-box'>
						<code className="language-css">{selectedAnimation.css}</code>
						</pre>
					</div>
					)}

					{/* JS Preview */}
					{activeTab === 'js' && (
					<div className="js-preview">
						<pre className='pre-box'>
						<code className="language-javascript">{selectedAnimation.js}</code>
						</pre>
					</div>
					)}
				</div>

				<div
					className="animation-render-box"
					dangerouslySetInnerHTML={{
					__html: selectedAnimation.html,
					}}
				/>
				</div>
			)}
		</div>
    </div>
  );
};

export default Advanced;
