// Footer.jsx
import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Student MS</h3>
            <p>Comprehensive student management solution for modern educational institutions.</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@studentms.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Student Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
