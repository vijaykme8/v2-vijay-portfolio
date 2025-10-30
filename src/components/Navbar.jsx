// Navbar.jsx
import './Navbar.css';
import logo from '../assets/logo-vk.svg';
import searchIcon from '../assets/search.svg';
import downloadIcon from '../assets/download.svg';
import downloadHoverIcon from '../assets/download-hover.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Navbar({ onProjectClick }) {
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const searchBarRef = useRef(null);
  const searchIconRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsNavbarVisible(false);
      } 
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY.current) {
        setIsNavbarVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        searchIconRef.current &&
        !searchIconRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className={`navbar-container ${isNavbarVisible ? 'visible' : 'hidden'}`}>
      <nav className="navbar">
        <div className="navbar-center-group">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="navbar-links-container">
            <ul className="navbar-links-group">
              <li><Link to="/">Home</Link></li>
              <li><a href="#" onClick={onProjectClick}>Projects</a></li>
              <li><Link to="/about">About Me</Link></li>
            </ul>
            <ul className="navbar-links-group">
              <li>
                <a
                  href="https://drive.google.com/file/d/1RQXOmTWpATYwLdsbnaibBOMT2IH-k6o3/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-link"
                  onMouseEnter={() => setIsResumeHovered(true)}
                  onMouseLeave={() => setIsResumeHovered(false)}
                >
                  <img 
                    src={isResumeHovered ? downloadHoverIcon : downloadIcon} 
                    alt="Download" 
                    className="download-icon" 
                  />
                  Resume
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-search" onClick={handleSearchClick} ref={searchIconRef}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
      </nav>
      {isSearchOpen && (
        <div className="floating-search-container" ref={searchBarRef}>
          <div className="floating-search-bar">
            <div className="search-input-wrapper">
              <img src={searchIcon} alt="Search" className="search-input-icon" />
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                className="search-input"
                autoFocus
              />
            </div>
            <div className="search-shortcuts">
              <span className="shortcut-key">⌘</span>
              <span className="shortcut-key">+</span>
              <span className="shortcut-key">/</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
