import JobApplication from './jobApplicationModel.js';
import path from 'path';
import fs from 'fs';

 const createApplication = async (req, res) => {
  try {
    const { email, contact, experience, jobTitle } = req.body;
    const coverLetter = req.files?.coverLetter?.[0]?.path || "";
    const portfolio = req.files?.portfolio?.[0]?.path || "";

    const newApplication = new JobApplication({
      email,
      contact,
      experience,
      coverLetter,
      portfolio,
      jobTitle,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting application", error: err.message });
  }
};


export { createApplication };
