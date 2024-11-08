// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import Dashboard from './Pages/Dashboard';
import InvestorDashboard from "./components/dashboard/InvestorDashboard";
import ExploreProject from "./Pages/ExploreProject";
import ProjectDetails from "./Pages/ProjectDetails"; // Import ProjectDetails
import ProjectList from "./Pages/ProjectList"; // Import ProjectList

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />
        <Route path="/explore" element={<ProjectList />} /> {/* Project list */}
        <Route path="/project/:id" element={<ProjectDetails />} /> {/* Project details */}
      </Routes>
    </Router>
  );
}

export default App;