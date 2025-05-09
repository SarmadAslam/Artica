
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Basic Info
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: false },

  // Auth Info
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },

  // Profile Info
  profilePic: { type: String, required: false },
  about: { type: String, required: false },
  skills: { type: [String], required: false },
  software: { type: [String], required: false },
  website: { type: String, default: "" },
  instagram: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  twitter: { type: String, default: "" },

  // Roles & Status
  role: {
    type: String,
    enum: ["client", "artist"],
    default: "",
  },
  country: { type: String, required: false },
  accessGranted: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  signupDate: { type: Date, default: Date.now },

  // Password Reset
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },

  // Relations
  arts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Art', default: [] }],
  ShowArtWork: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShowArtWork', default: [] }],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase', default: [] }],
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid', default: [] }],
});

const User = mongoose.model('User', userSchema);

export default User;