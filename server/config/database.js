import mongoose from "mongoose";
import dotenv from "dotenv";
import User from '../models/User.js'; // Import the User model

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("MongoDB URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected Successfully');
    
    // Check if the User collection exists and create it if necessary
    const collectionExists = await mongoose.connection.db.listCollections({ name: 'users' }).hasNext();
    if (!collectionExists) {
      await User.createCollection();
      console.log('User collection created successfully');
    }
} catch (err) {
    console.error('MongoDB Connection Failed:', err.message);
    process.exit(1); // Exit the process with failure
}
};