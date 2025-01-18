// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import './App.css';
// import Search from './components/Search';
// import AnimationLoader from './components/AnimationLoader';
// import KeyframesGuide from './components/KeyframesGuide';
// import BlogList from './components/blogs/BlogList';
// import BlogPage from './components/blogs/BlogPage';  // Import the BlogPage component
// import Navbar from './components/Navbar';  // Import the Navbar component
// import Advanced from './components/Advanced/Advanced';

// function App() {
//   const [selectedCategory, setSelectedCategory] = useState('All'); // Default to "All"

//   // Function to handle category selection from the Search component
//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category); // Update the selected category in state
//   };

//   const categories = [
//     { name: 'Slide' },
//     { name: 'Bounce' },
//     { name: 'Fade' },
//     { name: "Zoom" },
//     { name: "Rotate" },
//     { name: "Text" },
//     { name: "Flip" },
//     { name: "Pulse" },
//     { name: "Border" },
//     { name: "Box Shadow" },
//     { name: "Background" },
//     { name: "3D and Skew" },
//     // Add more categories as necessary
//   ];

  

//   return (
//     <div className="App">
//       <Navbar />  {/* Add Navbar to the app */}

//       <Routes>
//         {/* Route for the blog list */}
//         <Route path="/" element={
//           <>
//             <Search categories={categories} onCategorySelect={handleCategorySelect} />
//             <AnimationLoader selectedCategory={selectedCategory} />
//             <KeyframesGuide />
//             <BlogList />
//           </>
//         } />

//         {/* Route for the individual blog page */}
//         <Route path="/blog/:slug" element={<BlogPage />} />
//         <Route path="/advanced/" element={<Advanced />} />

//       </Routes>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import AnimationLoader from './components/AnimationLoader';
import KeyframesGuide from './components/KeyframesGuide';
import BlogList from './components/blogs/BlogList';
import BlogPage from './components/blogs/BlogPage';
import Navbar from './components/Navbar';
import Advanced from './components/Advanced/Advanced';
import AllBlogs from './components/blogs/AllBlogs'; // Import the new AllBlogs component

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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
    { name: "Background" },
    { name: "3D and Skew" },
  ];

  return (
    <div className="App">
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <>
            <Search categories={categories} onCategorySelect={handleCategorySelect} />
            <AnimationLoader selectedCategory={selectedCategory} />
            <KeyframesGuide />
            <BlogList />
          </>
        } />

        {/* Route for the individual blog page */}
        <Route path="/blog/:slug" element={
          <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <AllBlogs /> {/* Always show AllBlogs */}
              </div>
              <div >
                <BlogPage /> {/* Show the specific blog content */}
              </div>
            </div>
          </>
        } />

        <Route path="/advanced/" element={<Advanced />} />
      </Routes>
    </div>
  );
}

export default App;
