import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String, // store file path or URL
  },
  portfolio: {
    type: String, // store file path or URL
  },
  jobTitle: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('JobApplication', jobApplicationSchema);
