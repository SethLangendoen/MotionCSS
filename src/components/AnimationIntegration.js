import React from 'react';
import '../CSS/AnimationIntegration.css';

const AnimationIntegration = ({ animation }) => {
  return (
    <div className="animation-integration">
      <h2>How to Use the {animation.name} Animation</h2>
      <div className="animation-details">
        <h3>Step 1: Add Keyframes</h3>
        <p>Start by adding the following @keyframes to your CSS file. This defines the animation's behavior:</p>
        <pre>
          <code className="language-css">{`
@keyframes ${animation.name} {
  ${animation.keyframes}
}
          `}</code>
        </pre>

        <h3>Step 2: Apply the Animation to an Element</h3>
        <p>Now, apply the animation to an element using the following class:</p>
        <pre>
          <code className="language-css">{`
.animation-${animation.name} {
  animation: ${animation.name} ${animation.duration} ${animation.timingFunction} ${animation.iterationCount};
}
          `}</code>
        </pre>

        <h3>Step 3: Use the Animation in Your HTML</h3>
        <p>Finally, add the animation class to an element:</p>
        <pre>
          <code className="language-html">{`
<div class="animation-${animation.name}">
  Your content here
</div>
          `}</code>
        </pre>

        <h3>Step 4 (optional): Dynamically Toggle the Animation Using JavaScript</h3>
        <p>You can use JavaScript to dynamically add or remove the animation class from an element. This allows you to trigger the animation when certain events occur (e.g., button click, page load, etc.). Here’s how you can do it:</p>
        <pre>
          <code className="language-js">{`
  const element = document.querySelector('.your-element'); // Select your element
  
  // Function to start the animation
  function startAnimation() {
    element.classList.add('animation-${animation.name}');
  }

  // Function to stop the animation
  function stopAnimation() {
    element.classList.remove('animation-${animation.name}');
  }

  // Example: Trigger the animation on button click
  const button = document.querySelector('#startAnimationButton');
  button.addEventListener('click', startAnimation);
  
  // Example: Stop animation after a timeout (e.g., after 3 seconds)
  setTimeout(stopAnimation, 3000);
          `}</code>
        </pre>

        <h3>Step 5: Other Ways to Dynamically Toggle the Animation</h3>
        <p>Here are some additional ways you can toggle the animation class based on user interactions:</p>

        <h4>1. Toggle on Hover:</h4>
        <pre>
          <code className="language-js">{`
  const hoverElement = document.querySelector('.hover-element');
  
  hoverElement.addEventListener('mouseover', function() {
    hoverElement.classList.add('animation-${animation.name}');
  });
  
  hoverElement.addEventListener('mouseout', function() {
    hoverElement.classList.remove('animation-${animation.name}');
  });
          `}</code>
        </pre>

        <h4>2. Toggle on Scroll (Element In View):</h4>
        <pre>
          <code className="language-js">{`
  const scrollElement = document.querySelector('.scroll-element');

  function checkScroll() {
    const rect = scrollElement.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      scrollElement.classList.add('animation-${animation.name}');
    } else {
      scrollElement.classList.remove('animation-${animation.name}');
    }
  }

  window.addEventListener('scroll', checkScroll);
          `}</code>
        </pre>

        <h4>3. Toggle on Focus (for Input Fields or Buttons):</h4>
        <pre>
          <code className="language-js">{`
  const focusElement = document.querySelector('.focus-element');
  
  focusElement.addEventListener('focus', function() {
    focusElement.classList.add('animation-${animation.name}');
  });
  
  focusElement.addEventListener('blur', function() {
    focusElement.classList.remove('animation-${animation.name}');
  });
          `}</code>
        </pre>

        <h4>4. Toggle on Keyboard Event (e.g., Pressing a Key):</h4>
        <pre>
          <code className="language-js">{`
  const keypressElement = document.querySelector('.keypress-element');
  
  window.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Trigger on Enter key
      keypressElement.classList.add('animation-${animation.name}');
    }
  });
  
  window.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') { // Remove the animation after key release
      keypressElement.classList.remove('animation-${animation.name}');
    }
  });
          `}</code>
        </pre>

        <h3>Additional Notes:</h3>
        <p>
          The animation will apply to the element when you add the class dynamically. You can also toggle the class based on other events like hover, scroll, or user interactions. Experiment with different triggers to fit the needs of your website’s design and user experience.
        </p>
      </div>
    </div>
  );
};

export default AnimationIntegration;
