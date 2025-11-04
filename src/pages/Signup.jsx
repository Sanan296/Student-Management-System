import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

// Define the API Base URL
const API_BASE_URL = "http://localhost:5000/api"; 

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔄 API-Integrated handleSignup
    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("❌ Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            // Send POST request to the unique admin signup endpoint
            const response = await fetch(`${API_BASE_URL}/admin/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Backend expects 'username' (we use email for this) and 'password'
                    username: formData.email, 
                    password: formData.password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                // This captures the crucial backend message: "Admin already exists! Please log in instead."
                throw new Error(result.message || "Signup failed due to a server error.");
            }

            alert("✅ Admin account created successfully! Please log in.");
            navigate("/login");

        } catch (err) {
            setError(err.message);
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card active">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Sign up to get started</p>
                </div>

                <form onSubmit={handleSignup}>
                    {/* Display error message */}
                    {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="checkbox-group">
                        <input type="checkbox" required />
                        <label>I agree to the Terms & Conditions</label>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Processing..." : "Sign Up"}
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <div className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;