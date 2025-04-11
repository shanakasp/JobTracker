import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteJob, getJobs, updateJobStatus } from "../api/jobsApi.js";
import { DateFilter } from "../components/Filters/DateFilter.jsx";
import { StatusFilter } from "../components/Filters/StatusFilter";
import { JobList } from "../components/Jobs/JobList";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { DeleteConfirmModal } from "../components/Modals/DeleteConfirmModal";
import { StatusChangeModal } from "../components/Modals/StatusChangeModal";
import { StatsOverview } from "../components/Stats/StatusOverview.jsx";

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);
  // Date filtering states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateFilterApplied, setDateFilterApplied] = useState(false);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);

  const navigate = useNavigate();

  const fetchJobs = async (params = {}) => {
    try {
      setLoading(true);
      const data = await getJobs(params);
      setJobs(data.jobs);
      setStats(data.meta.statusFrequency);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on status
  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleEditJob = (jobId) => {
    navigate(`/edit/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      setActionInProgress(true);
      await deleteJob(jobId);

      // Update the jobs state by removing the deleted job
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      // Update stats after deletion
      setStats((prevStats) => {
        const deletedJob = jobs.find((job) => job._id === jobId);
        const status = deletedJob?.status;

        if (status && prevStats[status] > 0) {
          return {
            ...prevStats,
            [status]: prevStats[status] - 1,
          };
        }
        return prevStats;
      });

      setDeleteConfirmOpen(false);
      setSelectedJob(null);
    } catch (error) {
      console.error(`Failed to delete job with ID ${jobId}:`, error);
    } finally {
      setActionInProgress(false);
    }
  };

  const openDeleteConfirm = (job) => {
    setSelectedJob(job);
    setDeleteConfirmOpen(true);
  };

  const openStatusModal = (job) => {
    setSelectedJob(job);
    setStatusModalOpen(true);
  };

  const handleChangeStatus = async (newStatus) => {
    if (!selectedJob || selectedJob.status === newStatus) {
      setStatusModalOpen(false);
      return;
    }

    try {
      setActionInProgress(true);
      await updateJobStatus(selectedJob._id, newStatus);

      // Update the job status in state
      const oldStatus = selectedJob.status;

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === selectedJob._id ? { ...job, status: newStatus } : job
        )
      );

      // Update stats
      setStats((prevStats) => ({
        ...prevStats,
        [oldStatus]: (prevStats[oldStatus] || 0) - 1,
        [newStatus]: (prevStats[newStatus] || 0) + 1,
      }));

      setStatusModalOpen(false);
    } catch (error) {
      console.error(
        `Failed to update status for job with ID ${selectedJob._id}:`,
        error
      );
    } finally {
      setActionInProgress(false);
    }
  };

  const fetchWithFilters = (statusFilter = filter) => {
    const params = {};

    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    // Add status filter if not "All"
    if (statusFilter !== "All") {
      params.status = statusFilter;
    }

    // Add sorting by date
    params.sort = "date";

    fetchJobs(params);
  };

  // Handle date filter application
  const applyDateFilter = () => {
    fetchWithFilters();
    setDateFilterApplied(true);
    setDateFilterOpen(false);
  };

  // Clear date filters
  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
    setDateFilterApplied(false);

    // Re-fetch jobs with just status filter if any
    const params = filter !== "All" ? { status: filter } : {};
    fetchJobs(params);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Job Application Tracker
      </h1>

      {/* Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Filter Options */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <StatusFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            dateFilterApplied={dateFilterApplied}
            fetchWithFilters={fetchWithFilters}
          />

          <DateFilter
            isOpen={dateFilterOpen}
            setIsOpen={setDateFilterOpen}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            isApplied={dateFilterApplied}
            applyFilter={applyDateFilter}
            clearFilter={clearDateFilter}
          />
        </div>
      </div>

      {/* Job Listings */}
      <JobList
        jobs={filteredJobs}
        formatDate={formatDate}
        onEdit={handleEditJob}
        onStatusChange={openStatusModal}
        onDelete={openDeleteConfirm}
        dateFilterApplied={dateFilterApplied}
        clearDateFilter={clearDateFilter}
      />

      {/* Status Change Modal */}
      <StatusChangeModal
        isOpen={statusModalOpen}
        job={selectedJob}
        onClose={() => setStatusModalOpen(false)}
        onStatusChange={handleChangeStatus}
        actionInProgress={actionInProgress}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        job={selectedJob}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setSelectedJob(null);
        }}
        onConfirm={handleDeleteJob}
        actionInProgress={actionInProgress}
      />
    </div>
  );
}
