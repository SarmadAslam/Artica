
// import ClientProfile from "./clientProfile.model.js";

// // Create Profile
// export const createProfile = async (req, res) => {
//   try {
//     const { firstName, lastName, gender, dob, phone, email } = req.body;

//     const existing = await ClientProfile.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const profile = new ClientProfile({
//       firstName,
//       lastName,
//       gender,
//       dob,
//       phone,
//       email,
//     });

//     const savedProfile = await profile.save();
//     res.status(201).json(savedProfile);
//   } catch (error) {
//     console.error("Error creating profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get All Profiles (optional for admin)
// export const getAllProfiles = async (req, res) => {
//   try {
//     const profiles = await ClientProfile.find();
//     res.status(200).json(profiles);
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



import ClientProfile from "./clientProfile.model.js";

// Create Profile
export const createProfile = async (req, res) => {
  try {
    // const { userId } = req.body; // Ensure the userId is sent from frontend
    const { firstName, lastName, gender, dob, phone, email } = req.body;

    const existing = await ClientProfile.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const profile = new ClientProfile({
      // userId, // Add this line
      firstName,
      lastName,
      gender,
      dob,
      phone,
      email,
    });
    

    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Profiles (optional for admin)
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ClientProfile.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Server error" });
  }
};
