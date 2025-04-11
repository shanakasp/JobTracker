import { useEffect, useState } from "react";
import { FaBriefcase, FaCalendarAlt, FaCheck, FaLink } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../api/jobsApi.js";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: new Date().toISOString().split("T")[0],
    link: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobData = await getJobById(id);

        // Format the date for the input field (YYYY-MM-DD)
        const formattedDate = new Date(jobData.appliedDate)
          .toISOString()
          .split("T")[0];

        setFormData({
          company: jobData.company,
          role: jobData.role,
          status: jobData.status,
          appliedDate: formattedDate,
          link: jobData.link,
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load job data. Please try again.");
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Format the date to include time for proper ISO format
      const formattedData = {
        ...formData,
        appliedDate: new Date(formData.appliedDate).toISOString(),
      };

      await updateJob(id, formattedData);
      setSuccess(true);

      setTimeout(() => {
        navigate("/"); // Navigate back to job list after updating
      }, 2000);
    } catch (err) {
      setError("Failed to update job application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-700">Loading job data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Edit Job Application
      </h1>

      {success && (
        <div
          className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded"
          role="alert"
        >
          <div className="flex items-center">
            <FaCheck className="mr-2" />
            <p>Job application successfully updated! Redirecting...</p>
          </div>
        </div>
      )}

      {error && (
        <div
          className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="company"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Company Name*
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 p-2 rounded-l-lg">
                <FaBriefcase className="text-gray-500" />
              </span>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g. Google, Facebook, etc."
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Job Role*
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g. Frontend Developer, Product Manager, etc."
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Application Status*
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="appliedDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Application Date*
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 p-2 rounded-l-lg">
                <FaCalendarAlt className="text-gray-500" />
              </span>
              <input
                type="date"
                id="appliedDate"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="link"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Job URL (Optional)
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 p-2 rounded-l-lg">
                <FaLink className="text-gray-500" />
              </span>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="https://careers.company.com/jobs..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? (
                <>
                  <span className="mr-2">Updating...</span>
                  <div className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                </>
              ) : (
                "Update Job Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
