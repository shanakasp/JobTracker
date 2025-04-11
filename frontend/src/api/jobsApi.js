// src/api/jobsApi.js
import axios from "axios";

const API_URL = "https://jobtracker-0ued.onrender.com/api/jobs";
// const API_URL = "http://localhost:5000/api/jobs"; // locally running url

// Creating axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Get all jobs with optional filters
export const getJobs = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append("status", filters.status);
    if (filters.startDate) queryParams.append("startDate", filters.startDate);
    if (filters.endDate) queryParams.append("endDate", filters.endDate);
    if (filters.sort) queryParams.append("sort", filters.sort);

    const url = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Get a specific job by ID
export const getJobById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job with ID ${id}:`, error);
    throw error;
  }
};

// Create a new job
export const createJob = async (jobData) => {
  try {
    const response = await api.post("/", jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

// Update a job
export const updateJob = async (id, jobData) => {
  try {
    const response = await api.put(`/${id}`, jobData);
    return response.data;
  } catch (error) {
    console.error(`Error updating job with ID ${id}:`, error);
    throw error;
  }
};

// Update job status
export const updateJobStatus = async (id, status) => {
  try {
    const response = await api.patch(`/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for job with ID ${id}:`, error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting job with ID ${id}:`, error);
    throw error;
  }
};

// Get status statistics
export const getStatusStats = async () => {
  try {
    const response = await api.get("/stats/status");
    return response.data;
  } catch (error) {
    console.error("Error fetching status statistics:", error);
    throw error;
  }
};

// Get duplicate applications
export const getDuplicates = async () => {
  try {
    const response = await api.get("/stats/duplicates");
    return response.data;
  } catch (error) {
    console.error("Error checking for duplicates:", error);
    throw error;
  }
};
