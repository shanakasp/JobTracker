import React from "react";

export function StatusFilter({
  currentFilter,
  onFilterChange,
  dateFilterApplied,
  fetchWithFilters,
}) {
  const handleFilterChange = (newFilter) => {
    onFilterChange(newFilter);

    // If date filter is applied, update with new status
    if (dateFilterApplied) {
      fetchWithFilters(newFilter);
    }
  };

  const filters = ["All", "Applied", "Interview", "Offer", "Rejected"];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-lg ${
            currentFilter === filter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
