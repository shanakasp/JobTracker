const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Get all jobs with optional filtering
router.get("/", jobController.getAllJobs);

// Create a new job
router.post("/", jobController.createJob);

// Get a specific job
router.get("/:id", jobController.getJobById);

// Update a job
router.put("/:id", jobController.updateJob);

// Update job status
router.patch("/:id/status", jobController.updateJobStatus);

// Delete a job
router.delete("/:id", jobController.deleteJob);

// Get status statistics
router.get("/stats/status", jobController.getStatusStats);

// Check for duplicates
router.get("/stats/duplicates", jobController.checkDuplicates);

module.exports = router;
