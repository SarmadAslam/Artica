import multer from 'multer';
import path from 'path';
import uuid from 'uuid';
import fs from 'fs';
import User from '../models/User.js';  // Assuming your User model is in this location
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Multer configuration for storing images in files/profiles/uuid
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'files/profiles/';
     if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create the folder if it doesn't exist
    }
    cb(null, dir);  // Save the file in the 'files/profiles/' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuid.v4(); // Generates a unique filename
    const extname = path.extname(file.originalname); // Get the file extension
    cb(null, uniqueSuffix + extname); // File name will be uuid.extension
  },
});

// Multer file filter to ensure only image files are uploaded
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Allowed image file types
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only image files are allowed!'), false); // Reject file
  }
};

// Initialize multer with storage, fileFilter, and file size limits
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (in bytes)
  },
}).single('profilePic');  // 'profilePic' will be the field name in the form

// Controller to handle profile picture upload
export async function uploadProfilePic(req, res) {
  try {
    upload(req, res, async (err) => {
      if (err) {
        // Handle errors
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ success: false, message: 'File is too large. Max size is 10MB.' });
        } else {
          return res.status(400).json({ success: false, message: 'File upload failed', error: err });
        }
      }

      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
      }
       const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

       const profilePicPath = `files/profiles/${req.file.filename}`;

       user.profilePic = profilePicPath;
      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Profile picture uploaded successfully',
        user: user,  
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export async function signup(req, res) {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields (username, email, password, role) are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword, role });
  await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: newUser,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user,
  });
}

export async function updateUserInfo(req, res) {
  const { username, role, socialLinks } = req.body;
   const user = await User.findById(req.user.id); 
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  if (username) user.username = username;
  if (role) user.role = role;
  if (socialLinks) user.socialLinks = socialLinks;
  await user.save();
  res.status(200).json({
    success: true,
    message: 'User information updated successfully',
    user,
  });
}

export async function updateAbout(req, res) {
  try {
    const { about, skills, software } = req.body;

    // Validate 'about' field
    if (!about) {
      return res.status(400).json({ success: false, message: 'About section is required' });
    }

    // Find the user by their ID
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update the 'about' field
    user.about = about;

    // Retain old values for 'skills' and 'software' if not provided in the request body
    if (skills) {
      user.skills = skills;
    }
    if (software) {
      user.software = software;
    }

    // Save the updated user document to the database
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'About section and other fields updated successfully',
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export async function fetchUser(req, res) {
  try {
    // Fetch user and populate the 'arts' field
    const user = await User.findById(req.user.id)
    .populate('showartWork')
    .populate('arts');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
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

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.json({ success: true, message: 'Profile updated successfully', user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select('-password'); 
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export async function getUserById(req, res) {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
