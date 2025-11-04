import express from "express";
import jwt from 'jsonwebtoken';       // ⬅️ 1. IMPORT jsonwebtoken
import Admin from "../models/Admin.js";

const router = express.Router();

// Define your secret key (MUST match the one in your authMiddleware.js)
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_SECURE_FALLBACK_KEY_HERE';

// 🟢 Admin Signup (only one admin allowed)
router.post("/signup", async (req, res) => {
    try {
        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists! Please log in instead.",
            });
        }

        const newAdmin = new Admin(req.body);
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔵 Admin Login (THE FIX IS HERE)
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username }); 
    
    if (admin && (await admin.matchPassword(password))) { 
        
        // 2. GENERATE THE JWT TOKEN
        const token = jwt.sign(
            { id: admin._id, username: admin.username }, // Payload
            JWT_SECRET,                                  // Secret Key
            { expiresIn: '1h' }                          // Expiration
        );

        // 3. SEND THE TOKEN IN THE RESPONSE BODY
        // This is the CRITICAL change that fixes the frontend error.
        res.json({ 
            message: "Login successful!",
            token: token // ⬅️ The frontend 'Login.jsx' will find this!
        });

    } else {
        // Invalid credentials
        return res.status(401).json({ message: "Invalid username or password" }); 
    }
});

export default router;