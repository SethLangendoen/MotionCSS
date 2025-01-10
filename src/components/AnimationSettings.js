import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import the default Prism styling for syntax highlighting
import '../CSS/AnimationSettings.css';

const AnimationSettings = ({ animation }) => {
  const [css, setCss] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    // Generate CSS string for the selected animation
    if (animation) {
      const animationCss = `
        @keyframes ${animation.name} {
          ${animation.keyframes}
        }
        
        .animation-${animation.name} {
          animation: ${animation.duration} ${animation.timingFunction} ${animation.iterationCount};
        }
      `;
      setCss(animationCss); // Set the generated CSS
    }
  }, [animation]);

  // Function to split keyframes into a column format
  const formatKeyframes = (keyframes) => {
    return keyframes
      .split(';')
      .filter((line) => line.trim()) // Remove empty lines
      .map((line, index) => {
        return line.includes('%') ? `    ${line.trim()};` : line.trim();
      })
      .join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(css.trim())
      .then(() => {
        setCopyMessage('CSS copied to clipboard!');
        setTimeout(() => setCopyMessage(''), 2000); // Clear message after 2 seconds
      })
      .catch(() => {
        setCopyMessage('Failed to copy CSS.');
      });
  };

  useEffect(() => {
    // Highlight the syntax when CSS content changes
    Prism.highlightAll();
  }, [css]);

  return (
    <div className="animation-settings">
      <div id='settingsTitle'>
		<h2 id='animTitle'>
        Animation CSS 
		</h2>
        <button className="copy-button" onClick={handleCopy}>
          Copy CSS
        </button>
      </div>
      {copyMessage && <p className="copy-message">{copyMessage}</p>}

      <div className="setting-item">
        <pre>
          <code className="language-css">
            {`
@keyframes ${animation?.name} {
  ${formatKeyframes(animation?.keyframes)}
}

.animation-${animation?.name} {
  animation: ${animation?.name} ${animation?.duration} ${animation?.timingFunction} ${animation?.iterationCount};
}
            `}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AnimationSettings;
