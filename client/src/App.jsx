// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Dashboard from "./Pages/Dashboard";
import InvestorDashboard from "./components/dashboard/InvestorDashboard";
import ProjectDetails from "./Pages/ProjectDetails"; // Import ProjectDetails
import ProjectList from "./Pages/ProjectList"; // Import ProjectList
import FounderProfile from "./components/FounderProfile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FounderProfile />} />
        <Route path="/founderdashboard" element={<Dashboard />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />
        <Route path="/explore" element={<ProjectList />} /> {/* Project list */}
        <Route path="/project/:id" element={<ProjectDetails />} />{" "}
        {/* Project details */}
      </Routes>
    </Router>
  );
}

export default App;
