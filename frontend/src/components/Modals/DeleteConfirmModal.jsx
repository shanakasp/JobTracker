import React from "react";
import { FaTrash } from "react-icons/fa";

export function DeleteConfirmModal({
  isOpen,
  job,
  onClose,
  onConfirm,
  actionInProgress,
}) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Confirm Deletion
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete the application for{" "}
          <strong>{job.company}</strong> - {job.role}? This action cannot be
          undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
            onClick={onClose}
            disabled={actionInProgress}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none flex items-center"
            onClick={() => onConfirm(job._id)}
            disabled={actionInProgress}
          >
            {actionInProgress ? (
              <>
                <span className="mr-2">Deleting...</span>
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
              </>
            ) : (
              <>
                <FaTrash className="mr-2" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
