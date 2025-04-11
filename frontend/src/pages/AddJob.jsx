import { useState } from "react";
import { FaBriefcase, FaCalendarAlt, FaCheck, FaLink } from "react-icons/fa";
import { createJob } from "../api/jobsApi.js";

export default function AddJobPage() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: new Date().toISOString().split("T")[0],
    link: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

      await createJob(formattedData);
      setSuccess(true);

      // Reset form
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: new Date().toISOString().split("T")[0],
        link: "",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError("Failed to create job application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Add New Job Application
      </h1>

      {success && (
        <div
          className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded"
          role="alert"
        >
          <div className="flex items-center">
            <FaCheck className="mr-2" />
            <p>Job application successfully added!</p>
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

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? (
                <>
                  <span className="mr-2">Submitting...</span>
                  <div className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                </>
              ) : (
                "Add Job Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
