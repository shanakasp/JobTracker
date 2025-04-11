import React from "react";
import {
  FaBriefcase,
  FaEdit,
  FaExchangeAlt,
  FaExternalLinkAlt,
  FaTrash,
} from "react-icons/fa";
import { JobStatusBadge } from "./JobStatusBadge";

export function JobRow({ job, formatDate, onEdit, onStatusChange, onDelete }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
            <FaBriefcase className="text-gray-500" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {job.company}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{job.role}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <JobStatusBadge status={job.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(job.appliedDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-4">
          {job.link && (
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-900 flex items-center"
            >
              <FaExternalLinkAlt className="mr-1" />
              View
            </a>
          )}
          <button
            onClick={() => onEdit(job._id)}
            className="text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <FaEdit className="mr-1" />
            Edit
          </button>
          <button
            onClick={() => onStatusChange(job)}
            className="text-yellow-600 hover:text-yellow-900 flex items-center"
          >
            <FaExchangeAlt className="mr-1" />
            Status
          </button>
          <button
            onClick={() => onDelete(job)}
            className="text-red-600 hover:text-red-900 flex items-center"
          >
            <FaTrash className="mr-1" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
