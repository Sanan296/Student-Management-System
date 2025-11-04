// About.jsx
import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="page-container">
        <div className="about-header">
          <h2>About Student Management System</h2>
          <p>Your trusted partner in educational excellence</p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h3>Our Mission</h3>
            <p>To provide institutions with an easy-to-use student management platform that streamlines administration.</p>
          </div>

          <div className="about-section">
            <h3>Key Features</h3>
            <ul className="features-list">
              <li>✅ Student record management</li>
              <li>✅ Subject tracking</li>
              <li>✅ Automated CGPA calculation</li>
              <li>✅ Performance analytics</li>
              <li>✅ Secure data</li>
              <li>✅ Multi-device access</li>
            </ul>
          </div>

          <div className="about-section">
            <h3>Contact Us</h3>
            <p><strong>Email:</strong> info@studentms.com</p>
            <p><strong>Phone:</strong> +1 234 567 8900</p>
          </div>
        </div>
      </div>
    </div>
  );
}
