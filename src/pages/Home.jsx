import React from 'react';
import './Home.css';

const Home= ({})=> {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span id='sms'>Student Management System</span></h1>
          <p className="hero-subtitle">
            Streamline your educational institution with our comprehensive student management platform.
          </p>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Student Management</h3>
            <p>Easily manage student records, enrollment, and personal information.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Subject Tracking</h3>
            <p>Monitor courses, subjects, and academic progress efficiently.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>CGPA Calculator</h3>
            <p>Automatic CGPA calculation and grade point management.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Performance Analytics</h3>
            <p>Track and analyze student performance with detailed reports.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Access</h3>
            <p>Role-based access control and data security.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Access from any device - desktop, tablet, or mobile.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;