import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ 1. Import useNavigate for security check
import "./Students.css";

// Define the API Base URL
const API_BASE_URL = "http://localhost:5000/api";
const AUTH_TOKEN_KEY = "adminToken"; // ⬅️ 2. Key for the stored JWT

export default function Students() {
    const navigate = useNavigate(); // ⬅️ 3. Initialize useNavigate
    const [students, setStudents] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Helper function to get Authorization Headers ---
    const getAuthHeaders = () => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) {
            // If token is missing, redirect to login immediately
            alert("Session expired or missing. Please log in.");
            navigate('/login');
            return null;
        }
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // ⬅️ Attach the JWT
        };
    };

    // --- Handle Unauthorized/Error Responses ---
    const handleAuthError = (status) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            alert("Session expired or unauthorized. Please log in again.");
            navigate('/login');
            return true;
        }
        return false;
    };

    // 1. FETCH STUDENTS (GET)
    const fetchStudents = async () => {
        const headers = getAuthHeaders();
        if (!headers) return; // Stop if no token is found

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/students`, {
                method: "GET",
                headers: headers, // ⬅️ Send secured headers
            });

            if (handleAuthError(response.status)) return;

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }

            const data = await response.json();
            setStudents(data); 
            setError(null);
        } catch (err) {
            console.error("Fetch Error:", err);
            // Show network error if it's not an authentication issue
            if (!error.includes("expired") && !error.includes("unauthorized")) {
                setError("Could not load students. Is the backend server running?");
            }
            setStudents([]); 
        } finally {
            setLoading(false);
        }
    };

    // Replaces localStorage on mount
    useEffect(() => {
        fetchStudents();
    }, []); 

    // 2. DELETE STUDENT (DELETE)
    const handleDelete = async (index) => {
        const studentToDelete = students[index];
        if (!studentToDelete || !studentToDelete._id) return; 

        const headers = getAuthHeaders();
        if (!headers) return;

        if (!window.confirm(`Are you sure you want to delete ${studentToDelete.name}?`)) return;

        try {
            const response = await fetch(`${API_BASE_URL}/students/${studentToDelete._id}`, {
                method: "DELETE",
                headers: headers, // ⬅️ Send secured headers
            });

            if (handleAuthError(response.status)) return;

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete student.");
            }

            // Update the state locally after successful deletion
            setStudents(students.filter((_, i) => i !== index));
            alert("✅ Student deleted successfully!");
            
        } catch (err) {
            console.error("Delete Error:", err);
            alert(`❌ Deletion Failed: ${err.message}`);
        }
    };

    // 3. EDIT/CANCEL/CHANGE functions remain the same (local state management)
    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditData(students[index]); 
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setEditData({});
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // 4. SAVE EDITS (PUT)
    const handleSave = async (index) => {
        const studentToUpdate = students[index];
        if (!studentToUpdate || !studentToUpdate._id) return;

        const headers = getAuthHeaders();
        if (!headers) return;

        try {
            const response = await fetch(`${API_BASE_URL}/students/${studentToUpdate._id}`, {
                method: "PUT",
                headers: headers, // ⬅️ Send secured headers
                body: JSON.stringify(editData),
            });

            if (handleAuthError(response.status)) return;

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update student.");
            }

            // Update the local state with the newly returned data
            const updatedList = [...students];
            updatedList[index] = result.student; // Assuming your backend returns { message, student: {...} }
            setStudents(updatedList);
            
            setEditingIndex(null);
            alert("✅ Student updated successfully!");

        } catch (err) {
            console.error("Save Error:", err);
            alert(`❌ Update Failed: ${err.message}`);
        }
    };

    // --- JSX RENDER (remains unchanged) ---
    return (
        <div className="students-container fade-in">
            <h2>Registered Students</h2>

            {loading ? (
                <p className="loading-state">Loading students from server...</p>
            ) : error ? (
                <p className="error-state">{error}</p>
            ) : students.length === 0 ? (
                <p className="no-data">No students registered yet.</p>
            ) : (
                <div className="students-grid">
                    {students.map((student, i) => (
                        // Use student._id as key
                        <div className="student-card" key={student._id}> 
                            <div className="student-avatar">
                                {student.name ? student.name.charAt(0).toUpperCase() : "?"}
                            </div>

                            {editingIndex === i ? (
                                <div className="edit-section">
                                    <h4>Editing: {student.name}</h4>
                                    <input type="text" name="name" value={editData.name} onChange={handleChange} placeholder="Student Name" />
                                    <input type="text" name="roll" value={editData.roll} onChange={handleChange} placeholder="Roll No" />
                                    <input type="text" name="department" value={editData.department} onChange={handleChange} placeholder="Department" />
                                    <input type="text" name="cgpa" value={editData.cgpa} onChange={handleChange} placeholder="CGPA" />
                                    <input type="date" name="dob" value={editData.dob} onChange={handleChange} />
                                    <div className="edit-buttons">
                                        <button className="cancel-btn" onClick={handleCancel}>✖ Cancel</button>
                                        <button className="save-btn" onClick={() => handleSave(i)}>💾 Save</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="student-name">{student.name}</h3>
                                    <div className="student-info">
                                        <p><span className="icon">🎓</span><strong>Roll No:</strong> {student.roll}</p>
                                        <p><span className="icon">🏫</span><strong>Department:</strong> {student.department}</p>
                                        <p><span className="icon">📊</span><strong>CGPA:</strong> {student.cgpa}</p>
                                        <p><span className="icon">🎂</span><strong>DOB:</strong> {student.dob}</p>
                                    </div>
                                    <div className="card-buttons">
                                        <button className="btn-edit" onClick={() => handleEdit(i)}>✏ Edit</button>
                                        <button className="btn-delete" onClick={() => handleDelete(i)}>🗑 Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}