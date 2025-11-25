import React from 'react';
import './About.css';

const About = () => {
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
            <p>
              Our mission is to empower educational institutes by providing a clean, modern, and efficient platform 
              that simplifies student management. We aim to reduce manual workload, enhance productivity, and 
              enable administrators, teachers, and students to stay connected.
            </p>
          </div>

          <div className="about-section">
            <h3>Who We Are</h3>
            <p>
              We are a passionate team dedicated to developing smart and reliable solutions for the education sector. 
              Our goal is to create tools that help institutes transition smoothly into a digital environment 
              without complications.
            </p>
          </div>

          <div className="about-section">
            <h3>Why Choose Us?</h3>
            <p>
              Our Student Management System is built with simplicity, speed, and reliability in mind. 
              Whether you're managing academic records, tracking student progress, or monitoring attendance, 
              the system provides a seamless and intuitive experience for users of all technical levels.
            </p>
          </div>

          <div className="about-section">
            <h3>Our Vision</h3>
            <p>
              To become a globally trusted platform that revolutionizes how institutions manage and track 
              academic performance, helping them adopt digital tools that improve learning outcomes.
            </p>
          </div>

          <div className="about-section">
            <h3>Future Goals</h3>
            <p>
              We aim to expand the system with advanced modules including online assignments, 
              parent–teacher communication portals, fee management, and AI-driven analytics to help institutions 
              make better academic decisions.
            </p>
          </div>

          <div className="about-section">
            <h3>Contact Us</h3>
            <p><strong>Email:</strong> Sanantahir29@gmail.com</p>
            <p><strong>Phone:</strong> 0311-4926966</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
