import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import StatusChart from "./components/Stats/StatusChart.jsx";
import AddJOb from "./pages/AddJob.jsx";
import Dashboard from "./pages/Dashboard";
import EditJob from "./pages/EditJob.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-job" element={<AddJOb />} />
          <Route path="/edit/:id" element={<EditJob />} />
          <Route path="/statistics" element={<StatusChart />} />
          {/* />
            <Route path="/jobs" element={<JobList />} />
        
         */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
