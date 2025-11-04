import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Students from "./pages/Students";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RegisterStudent from "./pages/RegisterStudent";
import Subjects from "./pages/Subjects";
import CGPA from "./pages/CGPA";
import "./pages/Global.css";

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem("isLoggedIn") === "true"
    );

    // This useEffect will now correctly handle the redirection after Login.jsx sets the flag
    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn); // Update local state for rendering

        // If not logged in and on a protected route, redirect to login
        if (!loggedIn && location.pathname !== "/login" && location.pathname !== "/signup") {
            navigate("/login", { replace: true });
        }
        // If logged in and on login/signup, redirect to home
        else if (loggedIn && (location.pathname === "/login" || location.pathname === "/signup")) {
            navigate("/home", { replace: true });
        }
    }, [location.pathname, navigate]);

    // ✅ Logout handler (Simplified: only remove the key App.js cares about)
    const handleLogout = () => {
        // Clear all relevant keys
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("adminToken"); 
        setIsLoggedIn(false);
        navigate("/login", { replace: true });
    };

    return (
        <div className="app-container">
            {/* Show Navbar only after login */}
            {isLoggedIn && <Navbar onLogout={handleLogout} />}

            <main className="main-content">
                <Routes>
                    {/* ✅ Redirect root based on login */}
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/home" replace />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    {/* Public routes */}
                    {/* ⚠️ Removed the redundant prop setIsLoggedIn */}
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected routes */}
                    {isLoggedIn ? (
                        <>
                            <Route path="/home" element={<Home />} />
                            <Route path="/register" element={<RegisterStudent />} />
                            <Route path="/students" element={<Students />} />
                            <Route path="/subjects" element={<Subjects />} />
                            <Route path="/cgpa" element={<CGPA />} />
                            <Route path="/about" element={<About />} />
                        </>
                    ) : (
                        // Catch-all for unauthorized users
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    )}
                </Routes>
            </main>

            {/* Show Footer only after login */}
            {isLoggedIn && <Footer />}
        </div>
    );
};

export default App;