// import { Schema, model } from "mongoose";

// const UserSchema = new Schema({
//   firstName: { type: String, required: true }, // First Name
//   lastName: { type: String, required: true }, // Last Name
//   email: { type: String, required: true, unique: true }, // Email
//   password: { type: String, required: true }, // Password
//   otp: { type: String }, // OTP for verification
//   otpExpiry: { type: Date }, // Expiry time for OTP
//   isVerified: { type: Boolean, default: false }, // Email verification status
//   role: {
//     type: String,
//     enum: ["client", "artist"], // Role can only be Client, Artist
//     required: true,
//   },
//   country: { type: String, required: true }, // Country
//   accessGranted: { type: Boolean, default: false }, // Access Granted status
//   signupDate: { type: Date, default: Date.now }, // Date of Signup
//   isAdmin: { type: Boolean, default: false }, // isAdmin status
//   isActive: { type: Boolean, default: false }, // isActive status
//   resetToken: { type: String }, // Field to store the reset token
//   resetTokenExpiration: { type: Date }, // Field to store the expiration time of the token
// });

// const User = model("User", UserSchema);

// export default User;
