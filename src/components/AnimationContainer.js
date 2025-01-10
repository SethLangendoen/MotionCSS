import React, { useEffect, useState } from 'react';
import '../CSS/AnimationContainer.css';
import playAnimation from '../images/playAnimation.png'; // Assuming the image is PNG format
import stopAnimation from '../images/stopAnimation.png'; // Assuming the image is PNG format

const AnimationContainer = ({ animationData, isPlaying, onPlayToggle }) => {
  const [style, setStyle] = useState('');

  // Function to handle the animation end event
  const handleAnimationEnd = () => {
    if (animationData.iterationCount !== 'infinite') {
      onPlayToggle(animationData.name); // Stop animation when it's finite
    }
  };

  // Toggle animation on click
  const handleClick = () => {
    onPlayToggle(animationData.name); // Notify parent to toggle play/pause for this animation
  };

  useEffect(() => {
    if (animationData) {
      const animationStyles = `
        @keyframes ${animationData.name} {
          ${animationData.keyframes}
        }
        .animation-${animationData.name} {
          animation: ${isPlaying ? `${animationData.name} ${animationData.duration} ${animationData.timingFunction} ${animationData.iterationCount}` : ''};
        }
      `;
      setStyle(animationStyles); // Ensure that style is updated on play/pause
    }
  }, [animationData, isPlaying]);

  return (
    <div className="animation-container" onClick={handleClick}>
      <style>{style}</style>
      <div
        className={`animation-${animationData.name}`}
        onAnimationEnd={handleAnimationEnd} // Listen for the animation end event
      >
		<div className='animationBox'>
        	{animationData && typeof animationData.content === 'string' ? animationData.content : 'Loading animation...'}
		</div>
      </div>
      <img
        src={isPlaying ? stopAnimation : playAnimation} // Use the appropriate image based on isPlaying
        alt={isPlaying ? 'Stop animation' : 'Start animation'}
        className="animation-toggle-icon" // Add a class for styling the image if needed
      />
    </div>
  );
};

export default AnimationContainer;
