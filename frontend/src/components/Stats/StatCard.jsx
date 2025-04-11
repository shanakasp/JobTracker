import React from 'react';

export function StatCard({ title, count, icon, bgColor }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{count || 0}</p>
        </div>
        <div className={`p-3 ${bgColor} rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
}