// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js'; // Import your Admin Model

// Define your secret key (must match the one in adminRoutes.js)
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_FALLBACK_SECRET_KEY';

export const protect = async (req, res, next) => {
    let token;

    // Check for token in the 'Authorization' header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (removes 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Fetch admin user from DB using the ID in the token payload
            req.admin = await Admin.findById(decoded.id).select('-password');

            // Continue to the next middleware or route handler
            next();

        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};