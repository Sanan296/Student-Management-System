import React, { useState } from "react";
import "./RegisterStudent.css";

// Define the API Base URL
// ⚠️ Ensure your Node.js server is running on port 5000 for this to work.
const API_BASE_URL = "http://localhost:5000/api"; 

export default function RegisterStudent() {
    const [formData, setFormData] = useState({
        name: "",
        roll: "",
        department: "",
        cgpa: "",
        dob: "",
    });
    // Add state for managing API interaction feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restrict roll number to digits only
        if (name === "roll") {
            const numericValue = value.replace(/\D/g, "");
            setFormData((prev) => ({ ...prev, [name]: numericValue }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Validation checks (Client-side validation kept)
    const validateForm = () => {
        const nameRegex = /^[A-Za-z\s]+$/;
        const rollRegex = /^\d{4}$/; 
        const cgpaRegex = /^(?:[0-3]\.\d{1,2}|4\.0{1,2})$/; 

        if (!nameRegex.test(formData.name)) {
            alert("❌ Name should contain only letters (no numbers).");
            return false;
        }

        if (!rollRegex.test(formData.roll)) {
            alert("❌ Roll number must be exactly 4 digits (0000–9999).");
            return false;
        }

        if (!cgpaRegex.test(formData.cgpa)) {
            alert("❌ Enter a valid CGPA like 3.50 or 4.00 (must include decimal).");
            return false;
        }

        if (!formData.department.trim()) {
            alert("❌ Department is required.");
            return false;
        }

        if (!formData.dob) {
            alert("❌ Date of Birth is required.");
            return false;
        }

        const dobYear = new Date(formData.dob).getFullYear();
        if (dobYear < 1980 || dobYear > 2020) {
            alert("❌ Please enter a realistic Date of Birth between 1980 and 2020.");
            return false;
        }

        return true;
    };

    // 🔄 API-Integrated Handle submit (Saves to MongoDB)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            // 1. Send POST request to the backend
            const response = await fetch(`${API_BASE_URL}/students`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Send the form data as JSON body
                body: JSON.stringify(formData), 
            });

            const result = await response.json();

            if (!response.ok) {
                // Throw error if backend returns 4xx or 5xx status
                throw new Error(result.message || "Failed to register student on server.");
            }

            alert("✅ Student Registered Successfully!");

            // 2. Clear form data after successful registration
            setFormData({
                name: "",
                roll: "",
                department: "",
                cgpa: "",
                dob: "",
            });
            
        } catch (err) {
            // Display any network or server-side errors
            setError(err.message);
            alert(`❌ Registration Failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container fade-in">
            <h2>Register New Student</h2>
            {/* Display the error if one occurred */}
            {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleSubmit} className="register-form">
                
                <div className="input-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Student Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Roll No:</label>
                    <input
                        type="text"
                        name="roll"
                        placeholder="e.g. 0001"
                        value={formData.roll}
                        onChange={handleChange}
                        maxLength={4}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Department:</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="dropdown"
                    >
                        <option value="">-- Select Department --</option>
                        <option value="Computer Science">Computer Science (CS)</option>
                        <option value="Software Engineering">Software Engineering (SE)</option>
                        <option value="Information Technology">Information Technology (IT)</option>
                        <option value="Data Science">Data Science (DS)</option>
                        <option value="Artificial Intelligence">Artificial Intelligence (AI)</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Computer Engineering">Computer Engineering (CE)</option>
                        <option value="Information Systems">Information Systems (IS)</option>
                        <option value="Game Development">Game Development</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>CGPA:</label>
                    <input
                        type="text"
                        name="cgpa"
                        placeholder="e.g. 3.50"
                        value={formData.cgpa}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        min="1980-01-01"
                        max="2020-12-31"
                    />
                </div>
                
                <button type="submit" className="register-btn" disabled={loading}>
                    {loading ? "Registering..." : "Register Student"}
                </button>
            </form>
        </div>
    );
}