import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Art from '../models/ArtWork.js';
import fs from 'fs';
import User from '../models/User.js';

// Multer configuration for storing images in files/arts/uuid
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'files/arts/';
    // Check if the directory exists, if not create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create the folder if it doesn't exist
    }
    cb(null, dir);  // Save the file in the 'files/arts/' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4(); // Generates a unique filename
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
    fileSize: 20 * 1024 * 1024, // 20MB limit (in bytes)
  },
});

export async function createArt(req, res) {
  try {
    // Handle file upload inside the controller
    upload.array('image')(req, res, async (err) => {
      if (err) {
        // Handle the error, such as file size exceeded
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ success: false, message: 'File is too large. Max size is 20MB.' });
        }
        // Other upload errors
        return res.status(400).json({ success: false, message: 'File upload failed', error: err });
      }

      // After the file upload, check if files were uploaded
      let imagePath = null;
      if (req.files && req.files.length > 0) {
        // If files are uploaded, use the first file (you can modify this to handle multiple files if needed)
        imagePath = `files/arts/${req.files[0].filename}`;
      }

      // Destructure body parameters
      const { title, description, type, year, tags } = req.body;

       if (!title || !description || !type) {
        return res.status(400).json({
          success: false,
          message: 'Title, description, and type are required fields.',
        });
      }

      // Set default values for any missing fields
      const newArt = new Art({
        title: title || 'Untitled',               // Default title if not provided
        description: description || 'No description provided', // Default description if not provided
        type: type || 'Unknown',                  // Default type if not provided
        year: year || new Date().getFullYear(),   // Default year to current year if not provided
        tags: tags || [],                         // Default empty array if no tags
        image: imagePath || 'files/arts/default.jpg', // Default image path if no image uploaded
      });

      // Save the new artwork to the database
      const savedArt = await newArt.save();

      // Find the user by userId (from req.user.id) and push the new art's ID into the user's arts array
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Push the new art's ObjectId to the arts array in the User schema
      user.arts.push(savedArt._id);
      await user.save();  // Save the updated user document

      return res.status(201).json({
        success: true,
        message: 'Art created and associated with user successfully',
        Art: savedArt,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Update Art
export async function updateArt(req, res) {
  try {
    // Handle file upload inside the controller
    upload.array('image')(req, res, async (err) => {
      if (err) {
        // Handle different types of errors (like file size exceeded or file type issue)
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ success: false, message: 'File is too large. Max size is 20MB.' });
        }
        return res.status(400).json({ success: false, message: 'File upload failed', error: err });
      }

      // Now that the file upload is done, we can check the files
      let imagePath = null;
      if (req.files && req.files.length > 0) {
        // If there are uploaded files, get the first one (or choose based on your needs)
        imagePath = `files/arts/${req.files[0].filename}`;
      }

      const { title, description, type, year, tags } = req.body;

      // Find the current art object to compare and retain old values
      const currentArt = await Art.findById(req.params.id);
      if (!currentArt) {
        return res.status(404).json({ success: false, message: 'Art not found' });
      }

      // Retain the old values if the new fields are empty or null
      const updatedArt = await Art.findByIdAndUpdate(
        req.params.id,
        {
          title: title || currentArt.title,
          description: description || currentArt.description,
          type: type || currentArt.type,
          year: year || currentArt.year,
          tags: tags || currentArt.tags,
          image: imagePath || currentArt.image, // Retain old image if no new image is provided
        },
        { new: true } // Return the updated document
      );

      return res.status(200).json({
        success: true,
        message: 'Art updated successfully',
        Art: updatedArt,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Get all Arts
export async function getAllArts(req, res) {
  try {
    const Arts = await Art.find();  // Fetch all Arts
    return res.status(200).json({
      success: true,
      Arts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Get a specific Art by ID
export async function getArtById(req, res) {
  try {
    const art = await Art.findById(req.params.id);  

    if (!art) {
      return res.status(404).json({ success: false, message: 'Art not found' });
    }

    return res.status(200).json({
      success: true,
      art,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export async function deleteArt(req, res) {
 try {
   const art = await Art.findByIdAndDelete(req.params.id);

   if (!art) {
     return res.status(404).json({ success: false, message: 'Art not found' });
   }

   return res.status(200).json({
     success: true,
     message: 'Art deleted successfully',
   });
 } catch (err) {
   console.error(err);
   return res.status(500).json({ success: false, message: 'Server error' });
 }
}
