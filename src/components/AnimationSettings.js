import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import the default Prism styling for syntax highlighting
import '../CSS/AnimationSettings.css';

const AnimationSettings = ({ animation }) => {
  const [css, setCss] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    if (animation) {
      const animationCss = `
        @keyframes ${animation.name} {
          ${animation.keyframes}
        }
        
        .${animation.name} {
          animation: ${animation.name} ${animation.duration} ${animation.timingFunction} ${animation.iterationCount};
        }
      `;
      setCss(animationCss);
    } else {
      setCss('');
    }
  }, [animation]);

  const formatKeyframes = (keyframes) => {
    return keyframes
      .split('}')
      .filter((line) => line.trim())
      .map((line) => (line.includes('%') ? `    ${line.trim()} }` : line.trim()))
      .join('\n');
  };

  const handleCopy = () => {
    if (css.trim()) {
      navigator.clipboard
        .writeText(css.trim())
        .then(() => {
          setCopyMessage('CSS copied to clipboard!');
          setTimeout(() => setCopyMessage(''), 2000);
        })
        .catch(() => {
          setCopyMessage('Failed to copy CSS.');
        });
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [css]);

  return (
    <div className="animation-settings slideInLeft">
      <div id="settingsTitle">
        <h2 id="animTitle">Animation CSS</h2>
        {animation && (
          <button className="copy-button" onClick={handleCopy}>
            Copy CSS
          </button>
        )}
      </div>
      {copyMessage && <p className="copy-message">{copyMessage}</p>}

      <div className="setting-item">
        <pre>
          <code className="language-css">
            {animation ? (
              `
@keyframes ${animation?.name} {
  ${formatKeyframes(animation?.keyframes)}
}

.${animation?.name} {
  animation: ${animation?.name} ${animation?.duration} ${animation?.timingFunction} ${animation?.iterationCount};
}
              `
            ) : (
              '/* Select an animation to view its CSS */'
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AnimationSettings;
