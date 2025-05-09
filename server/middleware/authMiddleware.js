import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    // Ensure req.cookies exists
    if (!req.cookies) {
        return res.status(401).json({ message: 'Access denied. No cookies found.' });
    }

    const token = req.cookies.token; // Read token from HTTP-only cookie

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded token info to the request

        // Example Role-Based Access Control: Only allow admins
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        // Ensure user is active
        if (!req.user.isActive) {
            return res.status(403).json({ message: 'Access denied. User is not active.' });
        }

        // Ensure user is verified (if needed)
        if (!req.user.isVerified) {
            return res.status(403).json({ message: 'Access denied. User is not verified.' });
        }

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
}

export default authenticateToken;
