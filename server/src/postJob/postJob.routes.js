// const express = require('express');
// const { postAJob, getAllJobs, getSingleJob, updateJob, deleteJob } = require('./postJob.controller');

// const router = express.Router();

// // 📌 Create a Job
// router.post('/create-job', postAJob);

// // 📌 Get All Jobs
// router.get('/', getAllJobs);

// // 📌 Get a Single Job
// router.get('/:id', getSingleJob);

// // 📌 Update a Job
// router.put('/edit/:id', updateJob);

// // 📌 Delete a Job
// router.delete('/:id', deleteJob);

// module.exports = router;

import express from 'express';
import { postAJob, getAllJobs, getSingleJob, updateJob, deleteJob } from './postJob.controller.js';

const router = express.Router();

// 📌 Create a Job
router.post('/create-job', postAJob);

// 📌 Get All Jobs
router.get('/', getAllJobs);

// 📌 Get a Single Job
router.get('/:id', getSingleJob);

// 📌 Update a Job
router.put('/edit/:id', updateJob);

// 📌 Delete a Job
router.delete('/:id', deleteJob);

export default router; // ✅ Use default export
