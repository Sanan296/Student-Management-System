import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

// Define the API Base URL
const API_BASE_URL = "http://localhost:5000/api"; 
// Key used for storing the token locally
const AUTH_TOKEN_KEY = "adminToken"; // Key for the JWT
const LOGIN_FLAG_KEY = "isLoggedIn"; // Key App.js is checking!

const Login = () => { // ⚠️ Removed setIsLoggedIn prop
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔄 API-Integrated handleLogin
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    username: formData.email, 
                    password: formData.password,
                }),
            });

            const result = await response.json(); 

            if (!response.ok) {
                throw new Error(result.message || "Login failed. Check your credentials.");
            }
            
            const token = result.token || result.accessToken || result.jwt; 
            
            if (token) {
                // SUCCESS: Store the JWT token
                localStorage.setItem(AUTH_TOKEN_KEY, token);
                
                // 🚀 CRITICAL FIX: Set the isLoggedIn flag for App.js
                localStorage.setItem(LOGIN_FLAG_KEY, "true"); 
                
                // Navigate will now work because App.js will see the flag set
                navigate("/home"); 
                
            } else {
                throw new Error("Login failed: Server response was missing the token.");
            }

        } catch (err) {
            setError(err.message);
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* ... (rest of the component remains the same) ... */}
                <div className="auth-header">
                    <h1>Admin Login</h1>
                    <p>Sign in to manage students</p>
                </div>

                <form onSubmit={handleLogin}>
                    {/* Display error message */}
                    {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

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
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <div className="auth-switch">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;