import mongoose from 'mongoose';

const illustrationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: false, // Optional field to describe the illustration
  },
  type: {
    type: String,
    required: true,
    default: '', // You can specify the type, and default it to 'Digital Illustration'
  },
  year: {
    type: Number,
    required: true,
    default: 2025, // Set to 2025 as the default year
  },
  image: {
    type: String,
    required: true, // Path to the image or URL of the image (could be a URL to the file)
  },
  tags: {
    type: [String],
    required: false, // Array of tags or categories related to the project (e.g., Abstract, Dreams)
  },
});

const Art = mongoose.model('Art', illustrationSchema);

export default Art;
