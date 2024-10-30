import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import InvestorDashboard from "../components/dashboard/InvestorDashboard";

export default function Deshboard() {
  return (
    <div className="flex">
      <Sidebar />
      <InvestorDashboard />
      <div className="hidden sm:flex flex-1 p-6">
        <h1>Vult AI Space</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}
