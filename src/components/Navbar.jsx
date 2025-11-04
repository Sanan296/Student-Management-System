import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const navigate = useNavigate();

  const handleClick = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    // This makes sure Navbar updates if login state changes elsewhere
    const handleStorageChange = () => {
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="navbar">
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
