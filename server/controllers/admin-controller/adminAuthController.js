import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email });

    if (!admin || !admin.isAdmin || !admin.accessGranted) {
      return res.status(403).json({ message: "Access denied" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (!admin.isVerified) {
      return res.status(400).json({ message: "Email not verified. Please verify OTP." });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: true },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Admin login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during admin login", error: err.message });
  }
};
