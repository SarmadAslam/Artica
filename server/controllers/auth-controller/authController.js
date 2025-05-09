import User from "../../models/User.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import authmiddleware from "../../middleware/authMiddleware.js";

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // ✅ Correct import
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'files/profiles/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create the folder if it doesn't exist
    }
    cb(null, dir); // Save the file in the 'files/profiles/' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4(); // ✅ Correct usage
    const extname = path.extname(file.originalname); // Get the file extension
    cb(null, uniqueSuffix + extname); // File name will be uuid.extension
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
}).single('profilePic');


// Load environment variables from .env file
dotenv.config();

// Use environment variable for the secret key
const SECRET_KEY = process.env.SECRET_KEY;

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for email credentials
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Register User and Send OTP
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, country } = req.body;
    const allowedRoles = ["client", "artist"];
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Email is already registered." });
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: 'Invalid role. Only "client" or "artist" are allowed.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
      role,
      country,
    });

    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Send email using the environment variable
      to: email,
      subject: "RungLey OTP Verification",
      text: `Your OTP is: ${otp}`,
    });

    res.status(201).json({
      message:
        "Registration successful. We have sent you an OTP on your email.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error, please try again later.", error });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Use the environment variable for email sender
      to: email,
      subject: "Resend OTP Verification",
      text: `Your new OTP is: ${otp}`,
    });

    res.json({ message: "OTP resent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error resending OTP", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Email not verified. Please verify OTP." });
    }

    // Ensure the user is active
    if (!user.isActive) {
      return res.status(400).json({
        message: "Your account is not active. Please contact support.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Send token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Return token in JSON response too
    res.json({
      message: "Login successful",
      token, // Send token in response body
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Logout User
export const logout = (req, res) => {
  try {
    res.clearCookie("token"); // Remove the JWT cookie
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};

// Dashboard (Protected Route)
export const dashboard = async (req, res) => {
  try {
    // Ensure user is authenticated via the token
    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: Check role or other conditions
    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    res.json({
      message: "Welcome to the dashboard",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard", error });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const resetToken = Math.random().toString(36).substr(2, 9);

    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Reset password email sent." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the user by the reset token and check expiration
    const user = await User.findOne({ resetToken: token });
    if (!user || user.resetTokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Update the user's password (hash it before saving)
    user.password = await bcrypt.hash(newPassword, 10); 
    user.resetToken = undefined; // Clear the reset token
    user.resetTokenExpiration = undefined; // Clear expiration time
    await user.save();

    return res
      .status(200)
      .json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};


export async function fetchUser(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .populate("ShowArtWork")
      .populate("arts")
      .lean();
      ;

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


export async function updateUserProfile(req, res) {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      const { username, email, about, skills, software, role,website, instagram, linkedin, twitter } = req.body;
      let profilePic = req.file ? `files/profiles/${req.file.filename}` : undefined;

      
      console.log(req.body);
      console.log(req.file);

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      user.username = username || user.username;
      user.email = email || user.email;
      user.about = about || user.about;
      user.skills = skills ? skills.split(',') : user.skills;
      user.software = software ? software.split(',') : user.software;
      user.role = role || user.role;
       user.website = website || user.website;


  
      // Update social media links
      user.instagram = instagram || user.instagram;
      user.linkedin = linkedin || user.linkedin;
      user.twitter = twitter || user.twitter;

      if (profilePic) user.profilePic = profilePic;

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

      res.json({ success: true, message: 'Profile updated successfully', user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}