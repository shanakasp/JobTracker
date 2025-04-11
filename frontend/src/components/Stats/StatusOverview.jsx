import React from "react";
import { FaCalendarAlt, FaCheck, FaHourglass, FaTimes } from "react-icons/fa";
import { StatCard } from "./StatCard";

export function StatsOverview({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Applied"
        count={stats.Applied || 0}
        icon={<FaHourglass className="text-blue-600" />}
        bgColor="bg-blue-100"
      />
      <StatCard
        title="Interviewing"
        count={stats.Interview || 0}
        icon={<FaCalendarAlt className="text-yellow-600" />}
        bgColor="bg-yellow-100"
      />
      <StatCard
        title="Offers"
        count={stats.Offer || 0}
        icon={<FaCheck className="text-green-600" />}
        bgColor="bg-green-100"
      />
      <StatCard
        title="Rejected"
        count={stats.Rejected || 0}
        icon={<FaTimes className="text-red-600" />}
        bgColor="bg-red-100"
      />
    </div>
  );
}
