
// import mongoose from "mongoose";

// const jobCategories = [
//   "Custom Artwork & Commissions",
//   "Illustration & Design",
//   "Painting & Drawing",
//   "Handmade & Decorative Art",
//   "Craft & DIY Projects",
//   "Teaching & Workshops",
//   "Restoration & Repair",
//   "Art for Events & Business",
// ];

// const jobTypes = ["Freelance", "Full-time", "Part-time", "Contract"];
// const workplaceTypes = ["Remote", "On-Site", "Hybrid"];
// const budgetOptions = ["Rs 1 to 5k", "Rs 6 to 15k", "Rs 16 to 25k", "Other"];

// const postJobSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     category: { type: String, enum: jobCategories, required: true },
//     jobType: { type: String, enum: jobTypes, required: true },
//     workplaceType: { type: String, enum: workplaceTypes, required: true },
//     experienceLevel: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     skillsRequired: { type: String, required: true },
//     budget: { type: String, enum: budgetOptions, required: true },
//     customBudget: { type: Number }, // Only used when budget is "Other"
//   },
//   { timestamps: true }
// );

// const PostJob = mongoose.model("PostJob", postJobSchema);

// export default PostJob;

// import mongoose from "mongoose";

// const jobCategories = [
//   "Custom Artwork & Commissions",
//   "Illustration & Design",
//   "Painting & Drawing",
//   "Handmade & Decorative Art",
//   "Craft & DIY Projects",
//   "Teaching & Workshops",
//   "Restoration & Repair",
//   "Art for Events & Business",
// ];

// const jobTypes = ["Freelance", "Full-time", "Part-time", "Contract"];
// const workplaceTypes = ["Remote", "On-Site", "Hybrid"];
// const budgetOptions = ["Rs 1 to 5k", "Rs 6 to 15k", "Rs 16 to 25k", "Other"];

// const postJobSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     category: { type: [String], enum: jobCategories, required: true }, // ✅ Supports multiple categories
//     jobType: { type: String, enum: jobTypes, required: true },
//     workplaceType: { type: String, enum: workplaceTypes, required: true },
//     experienceLevel: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     skillsRequired: { type: String, required: true },
//     budget: { type: String, enum: budgetOptions, required: true },
//     customBudget: { type: Number, required: function () { return this.budget === "Other"; } }, // ✅ Required only when budget is "Other"
//   },
//   { timestamps: true }
// );

// const PostJob = mongoose.model("PostJob", postJobSchema);

// export default PostJob;






import mongoose from "mongoose";

const jobCategories = [
  "Custom Artwork & Commissions",
  "Illustration & Design",
  "Painting & Drawing",
  "Handmade & Decorative Art",
  "Craft & DIY Projects",
  "Teaching & Workshops",
  "Restoration & Repair",
  "Art for Events & Business",
];

const jobTypes = ["Freelance", "Full-time", "Part-time", "Contract"];
const workplaceTypes = ["Remote", "On-Site", "Hybrid"];
const budgetOptions = ["Rs 1 to 5k", "Rs 6 to 15k", "Rs 16 to 25k", "Other"];

const postJobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: [String], required: true },
    jobType: { type: String, required: true },
    workplaceType: { type: String, required: true },
    experienceLevel: { type: String, required: false }, // Set to false if optional
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    // skillsRequired: { type: String, required: false },
    // budget: { type: String, required: true },
    // customBudget: { type: Number, required: true }
    budget: {
      type: String,
      enum: ["Rs 1 to 5k", "Rs 6 to 15k", "Rs 16 to 25k", "Other"], // Allowed budget options
      required: true,
    },
    customBudget: {
      type: Number,
      required: function () {
        return this.budget === "Other"; // Only required if budget is "Other"
      },
    },

  },
  { timestamps: true }
);

const PostJob = mongoose.model("PostJob", postJobSchema);

export default PostJob;

