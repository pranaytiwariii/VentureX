import React from "react";
import InvestorDashboard from "../components/dashboard/InvestorDashboard";
import FounderDashboard from "../components/dashboard/FounderDashbord";

export default function Deshboard() {
  return (
    <div className="flex">
      {/* <InvestorDashboard /> */}
      <FounderDashboard />
    </div>
  );
}
