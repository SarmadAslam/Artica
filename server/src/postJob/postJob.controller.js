import PostJob from './postJob.model.js';

// 📌 Post a Job
export const postAJob = async (req, res) => {
    // try {
    //     const newJob = new PostJob({ ...req.body });
    //     await newJob.save();
    //     res.status(201).json({ message: 'Job posted successfully', job: newJob });
    // } catch (error) {
    //     console.error('Error posting job:', error);
    //     res.status(500).json({ message: 'Failed to post job' });
    // }
    try {
        console.log("Received Job Data:", req.body); // ✅ Debugging step
    
        const newJob = new PostJob({ ...req.body });
        await newJob.save();
        res.status(201).json({ message: "Job posted successfully", job: newJob });
      } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Failed to post job", error: error.message }); // ✅ Return error details
      }
    
};

// 📌 Get All Jobs
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await PostJob.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
};

// 📌 Get Single Job
export const getSingleJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await PostJob.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ message: 'Failed to fetch job' });
    }
};

// 📌 Update a Job
export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedJob = await PostJob.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Failed to update job' });
    }
};

// 📌 Delete a Job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJob = await PostJob.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully', job: deletedJob });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Failed to delete job' });
    }
};
