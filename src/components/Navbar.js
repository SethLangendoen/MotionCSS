import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../CSS/Navbar.css';
import logo from '../images/motionLogo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleLinkClick = (id) => {
	if (id === '/advanced/') {
	  navigate(id);

	} else if (id === '/blog/'){
		navigate('/blog/the-future-of-web-animations');
	}
	else if (location.pathname !== '/') {
		// Navigate to the home page first if not already there
		navigate('/');
		// Wait for navigation to complete, then scroll to the section
		setTimeout(() => scrollToSection(id), 50); // Small delay to ensure the home page is rendered
	}
	
	else {
      // If already on the home page, scroll directly
      scrollToSection(id);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="MotionCSS Logo" id="navLogo" />
        </a>
      </div>

      <div className="navbar-links">
        <a
          href="#animations-section"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('animations-section');
          }}
        >
          Animations
        </a>

        {/* <a
          href="#how-to-section"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('how-to-section');
          }}
        >
          How To
        </a> */}
				<a
          href=".advanced-container"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/advanced/');
          }}
        >
          Components 
        </a>

        <a
          href="#blog-section"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/blog/');
          }}
        >
          Blog
        </a>

      </div>
    </nav>
  );
};

export default Navbar;
