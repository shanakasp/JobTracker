import React from "react";
import { FaCalendarAlt, FaCheck, FaHourglass, FaTimes } from "react-icons/fa";

export function StatusChangeModal({
  isOpen,
  job,
  onClose,
  onStatusChange,
  actionInProgress,
}) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Change Status
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Update status for <strong>{job.company}</strong> - {job.role}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              job.status === "Applied"
                ? "bg-blue-500 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
            onClick={() => onStatusChange("Applied")}
            disabled={actionInProgress || job.status === "Applied"}
          >
            <FaHourglass className="inline mr-2" />
            Applied
          </button>

          <button
            className={`px-4 py-2 rounded-lg ${
              job.status === "Interview"
                ? "bg-yellow-500 text-white"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            }`}
            onClick={() => onStatusChange("Interview")}
            disabled={actionInProgress || job.status === "Interview"}
          >
            <FaCalendarAlt className="inline mr-2" />
            Interview
          </button>

          <button
            className={`px-4 py-2 rounded-lg ${
              job.status === "Offer"
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
            onClick={() => onStatusChange("Offer")}
            disabled={actionInProgress || job.status === "Offer"}
          >
            <FaCheck className="inline mr-2" />
            Offer
          </button>

          <button
            className={`px-4 py-2 rounded-lg ${
              job.status === "Rejected"
                ? "bg-red-500 text-white"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }`}
            onClick={() => onStatusChange("Rejected")}
            disabled={actionInProgress || job.status === "Rejected"}
          >
            <FaTimes className="inline mr-2" />
            Rejected
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
            onClick={onClose}
            disabled={actionInProgress}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
