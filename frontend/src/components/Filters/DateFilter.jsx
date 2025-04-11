import React from "react";
import { FaFilter } from "react-icons/fa";

export function DateFilter({
  isOpen,
  setIsOpen,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isApplied,
  applyFilter,
  clearFilter,
}) {
  return (
    <>
      <div className="ml-auto">
        <button
          className={`px-4 py-2 rounded-lg flex items-center ${
            isApplied ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaFilter className="mr-2" />
          Date Filter {isApplied && "(Active)"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            {isApplied && (
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
                onClick={clearFilter}
              >
                Clear Filter
              </button>
            )}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              onClick={applyFilter}
              disabled={!startDate && !endDate}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </>
  );
}
