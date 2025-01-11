import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import the default Prism styling for syntax highlighting
import '../CSS/KeyframesGuide.css';

const KeyframesGuide = () => {
  useEffect(() => {
    Prism.highlightAll(); // Ensure Prism applies syntax highlighting
  }, []);

  return (
    <div className="keyframes-guide">
      <h1 id='how-to-section'>Understanding CSS Keyframes</h1>

      <section>
        <h2>What Are Keyframes?</h2>
        <p>
          Keyframes in CSS allow you to define intermediary steps for animations, enabling
          smooth transitions between multiple states. By specifying styles at certain points
          (percentages) within the animation's duration, you can create complex animations.
        </p>
        <pre>
          <code className="language-css">{`@keyframes example {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}`}</code>
        </pre>
      </section>

      <section>
        <h2>How to Use Keyframes</h2>
        <p>
          After defining keyframes, use the <code>animation</code> property to apply them to an element.
        </p>
        <pre>
          <code className="language-css">{`div {
  animation: example 2s ease-in-out infinite;
}`}
          </code>
        </pre>
        <p>The <code>animation</code> shorthand consists of the following properties:</p>
        <table className="keyframes-guide-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>animation-name</code></td>
              <td>The name of the keyframes block.</td>
            </tr>
            <tr>
              <td><code>animation-duration</code></td>
              <td>How long the animation takes (e.g., <code>2s</code>).</td>
            </tr>
            <tr>
              <td><code>animation-timing-function</code></td>
              <td>Controls the speed curve (e.g., <code>ease-in</code>).</td>
            </tr>
            <tr>
              <td><code>animation-delay</code></td>
              <td>Delay before starting the animation.</td>
            </tr>
            <tr>
              <td><code>animation-iteration-count</code></td>
              <td>Number of times to play (or <code>infinite</code>).</td>
            </tr>
            <tr>
              <td><code>animation-direction</code></td>
              <td>Normal, reverse, alternate, etc.</td>
            </tr>
            <tr>
              <td><code>animation-fill-mode</code></td>
              <td>Determines the styles before and after the animation runs.</td>
            </tr>
            <tr>
              <td><code>animation-play-state</code></td>
              <td>Running or paused.</td>
            </tr>
          </tbody>
        </table>

        <p>
          Here is an example using all animation properties: 
        </p>

        <pre>
          <code className="language-css">
            {`@keyframes exampleAnimation {
  0% { transform: translateX(0); opacity: 0; }
  50% { transform: translateX(100px); opacity: 0.5; }
  100% { transform: translateX(200px); opacity: 1; }
}

div {
  animation: exampleAnimation 2s ease-in-out 1s infinite alternate forwards;
  /* animation-name: exampleAnimation;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: forwards; */
}`}
          </code>
        </pre>



      </section>

      <section>
        <h2>Common Settings</h2>
        <p>Here are some common settings for CSS animations:</p>
        <table className="keyframes-guide-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Timing Functions</b></td>
              <td><code>ease</code>, <code>linear</code>, <code>ease-in</code>, <code>ease-out</code>, <code>ease-in-out</code>, and custom <code>cubic-bezier</code> values.</td>
            </tr>
            <tr>
              <td><b>Directions</b></td>
              <td><code>normal</code> (default), <code>reverse</code>, <code>alternate</code>, <code>alternate-reverse</code>.</td>
            </tr>
            <tr>
              <td><b>Fill Modes</b></td>
              <td><code>none</code>, <code>forwards</code>, <code>backwards</code>, <code>both</code>.</td>
            </tr>
          </tbody>
        </table>
      </section>



    </div>
  );
};

export default KeyframesGuide;
