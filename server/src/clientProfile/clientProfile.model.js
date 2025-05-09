import mongoose from "mongoose";

const clientProfileSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId, // or just String if you're not using ObjectId for user IDs
  //   required: true,
  //   unique: true,
  // },
  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  dob: {
    type: String, // Matches your frontend format from `<input type="date">`
    required: true,
  },
  phone: {
    type: String, // Use string to allow values like "0321..." without errors
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const ClientProfile = mongoose.model("ClientProfile", clientProfileSchema);
export default ClientProfile;
