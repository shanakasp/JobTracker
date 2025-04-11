const Job = require("../model/job");

// Utility functions
// Problem 1: Sort jobs by appliedDate (latest first)
const sortJobsByDate = (jobs) => {
  return [...jobs].sort(
    (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
  );
};

// Problem 2: Status Frequency Counter
const getStatusFrequency = (jobs) => {
  const statusCount = {
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  };

  jobs.forEach((job) => {
    statusCount[job.status] += 1;
  });

  return statusCount;
};

// Problem 3: Detect Duplicate Applications
const detectDuplicates = (jobs) => {
  const uniqueApplications = new Map();
  const duplicates = [];

  jobs.forEach((job) => {
    const key = `${job.company.toLowerCase()}-${job.role.toLowerCase()}`;

    if (uniqueApplications.has(key)) {
      duplicates.push({
        original: uniqueApplications.get(key),
        duplicate: job,
      });
    } else {
      uniqueApplications.set(key, job);
    }
  });

  return duplicates;
};

// CRUD Operations
// Get all jobs with optional filtering
exports.getAllJobs = async (req, res) => {
  try {
    const { status, startDate, endDate, sort } = req.query;
    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.appliedDate = {};
      if (startDate) query.appliedDate.$gte = new Date(startDate);
      if (endDate) query.appliedDate.$lte = new Date(endDate);
    }

    let jobs = await Job.find(query);

    jobs = sortJobsByDate(jobs);

    // Get status frequency
    const statusFrequency = getStatusFrequency(jobs);

    // Check for duplicates
    const duplicates = detectDuplicates(jobs);

    res.status(200).json({
      jobs,
      meta: {
        statusFrequency,
        duplicatesCount: duplicates.length,
        duplicates: duplicates.length > 0 ? duplicates : undefined,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a specific job
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update job status
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get status statistics
exports.getStatusStats = async (req, res) => {
  try {
    const jobs = await Job.find();
    const statusFrequency = getStatusFrequency(jobs);
    res.status(200).json(statusFrequency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check for duplicates
exports.checkDuplicates = async (req, res) => {
  try {
    const jobs = await Job.find();
    const duplicates = detectDuplicates(jobs);
    res.status(200).json({
      hasDuplicates: duplicates.length > 0,
      duplicates,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
