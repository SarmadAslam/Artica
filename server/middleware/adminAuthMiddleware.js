import jwt from "jsonwebtoken";
import User from "../models/User.js"; 
import dotenv from "dotenv";

dotenv.config();

const isAdmin = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Access Denied: No token provided." });
    }

    // Extract token from Bearer scheme
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid token format." });

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    // Find user and check admin role
    const user = await User.findById(decoded.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Admin Auth Middleware Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isAdmin;
