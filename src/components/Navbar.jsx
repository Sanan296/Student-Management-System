import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar =() =>{
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const navigate = useNavigate();
  // --- START Changes for Dark Mode ---
 const [isDarkMode, setIsDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
 );
 const handleThemeToggle = () => {
 const newMode = !isDarkMode;
  setIsDarkMode(newMode);
  
  // Save preference to localStorage
  localStorage.setItem("theme", newMode ? "dark" : "light"); 
  // Apply the class to the body element
  document.body.classList.toggle("dark-mode", newMode);
 };

 // Combine/Update your existing useEffect
 useEffect(() => {
  // Apply initial theme class on component mount
  if (isDarkMode) {
   document.body.classList.add("dark-mode");
  } else {
   document.body.classList.remove("dark-mode");
  }

  const handleStorageChange = () => {
   setLoggedIn(localStorage.getItem("loggedIn") === "true");
 };

 window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
 }, [isDarkMode]); // Dependency added for isDarkMode

 // --- END Changes for Dark Mode ---

  const handleClick = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode-nav" : ""}`}>
      <div className="nav-container">
        <div className="nav-brand">
            <span className="brand-icon">🎓</span> Student<span id='ms'>MS</span>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/" onClick={handleClick}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/students" onClick={handleClick}>
              Students
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" onClick={handleClick}>
              Register Student
            </NavLink>
          </li>
          <li>
            <NavLink to="/subjects" onClick={handleClick}>
              Road-Map
            </NavLink>
          </li>
          <li>
            <NavLink to="/cgpa" onClick={handleClick}>
              CGPA Calculator
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={handleClick}>
              About
            </NavLink>
          </li>
          {/* Dark Mode Toggle Integration */}
     <li className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="checkbox">
       <input 
        type="checkbox" 
        id="checkbox" 
        checked={isDarkMode} 
        onChange={handleThemeToggle} 
       />
        <div className="slider">
                  <span className="icon sun">☀️</span> {/* Sun Icon */}
                  <span className="icon moon">🌙</span> {/* Moon Icon */}
              </div> {/* <-- UPDATED LINE */}
      </label>
     </li>
         
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;