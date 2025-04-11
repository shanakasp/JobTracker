import React from "react";
import { FaCalendarAlt, FaCheck, FaHourglass, FaTimes } from "react-icons/fa";

export function JobStatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Interview":
        return "bg-yellow-100 text-yellow-800";
      case "Offer":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Applied":
        return <FaHourglass className="mr-1" />;
      case "Interview":
        return <FaCalendarAlt className="mr-1" />;
      case "Offer":
        return <FaCheck className="mr-1" />;
      case "Rejected":
        return <FaTimes className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
        status
      )}`}
    >
      {getStatusIcon(status)}
      {status}
    </span>
  );
}
