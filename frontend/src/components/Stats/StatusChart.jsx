import { useEffect, useState } from "react";
import { FaCalendarAlt, FaCheck, FaHourglass, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getJobs } from "../../api/jobsApi.js";

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getJobs();
        setJobs(data.jobs);
        setStats(data.meta.statusFrequency);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  const chartData = [
    {
      name: "Status",
      Applied: stats.Applied || 0,
      Interview: stats.Interview || 0,
      Offer: stats.Offer || 0,
      Rejected: stats.Rejected || 0,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Applied</p>
              <p className="text-2xl font-bold">{stats.Applied || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaHourglass className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Interviewing</p>
              <p className="text-2xl font-bold">{stats.Interview || 0}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaCalendarAlt className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Offers</p>
              <p className="text-2xl font-bold">{stats.Offer || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaCheck className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-2xl font-bold">{stats.Rejected || 0}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FaTimes className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart with Status Colors */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Job Application Status Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Applied" fill="#3B82F6" radius={[10, 10, 0, 0]} />
            <Bar dataKey="Interview" fill="#F59E0B" radius={[10, 10, 0, 0]} />
            <Bar dataKey="Offer" fill="#10B981" radius={[10, 10, 0, 0]} />
            <Bar dataKey="Rejected" fill="#EF4444" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
