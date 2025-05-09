import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user || !user.isAdmin || !user.accessGranted) {
      return res.status(403).json({ message: "Forbidden: Admin access only" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
