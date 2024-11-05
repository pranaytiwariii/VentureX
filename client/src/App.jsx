// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import Dashboard from './Pages/Dashboard'
import InvestorDashboard from "./components/dashboard/InvestorDashboard";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;