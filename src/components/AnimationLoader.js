import React, { useState, useEffect } from 'react';
import AnimationContainer from './AnimationContainer';
import AnimationSettings from './AnimationSettings'; 
import '../CSS/AnimationLoader.css';
import AnimationIntegration from './AnimationIntegration';

const AnimationLoader = ({ selectedCategory }) => {
  const [animations, setAnimations] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null); 
  const [selectedAnimation, setSelectedAnimation] = useState(null); 

  // Function to load all animations or filtered by category
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const response = await fetch('/animations/animations.json');
        const data = await response.json();

        if (selectedCategory === 'All') {
          // If "All" category is selected, load all animations
          const allAnimations = data.categories.flatMap(cat => cat.animations);
          setAnimations(allAnimations);
        } else {
          // Load animations for the selected category
          const categoryData = data.categories.find(cat => cat.name === selectedCategory);
          setAnimations(categoryData?.animations || []);
        }
      } catch (error) {
        console.error('Error loading animations:', error);
      }
    };

    loadAnimations();
  }, [selectedCategory]);

  const handlePlayToggle = (animationName) => {
    if (currentPlaying === animationName) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(animationName);
      const selected = animations.find(anim => anim.name === animationName);
      setSelectedAnimation(selected); 
    }
  };

  return (
	<div id='animations-section'>

    <div id="animationLoader">
      <div className="animation-list slideInRight">
        {animations.map((animation, index) => (
          <AnimationContainer
            key={index}
            animationData={animation}
            isPlaying={currentPlaying === animation.name}
            onPlayToggle={handlePlayToggle}
          />
        ))}
      </div>
	<AnimationSettings
		animation={selectedAnimation}
		onSettingsChange={setSelectedAnimation} 
	/>

	</div>
	{selectedAnimation && (
	<AnimationIntegration animation={selectedAnimation} />

	)}
    </div>
  );
};

export default AnimationLoader;
