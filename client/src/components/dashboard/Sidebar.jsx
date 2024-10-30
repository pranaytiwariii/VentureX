import React, { useState } from "react";
import { Link } from "react-router-dom";
import InvestorDashboard from "./InvestorDashboard";
import { Bell, Home, PieChart as PieChartIcon, DollarSign, Vote, ArrowUpDown, AlertCircle } from 'lucide-react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <><div className="">
      <button
        onClick={toggleSidebar}
        className="p-2 bg-gray-800 text-white rounded-md m-2"
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>
      {isOpen && (
        <aside className="w-64 bg-white shadow-md">
        <nav className="mt-6">
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 bg-gray-200">
            <Home className="w-5 h-5 mr-2" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200">
            <PieChartIcon className="w-5 h-5 mr-2" />
            Portfolio
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200">
            <DollarSign className="w-5 h-5 mr-2" />
            Investments
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200">
            <Vote className="w-5 h-5 mr-2" />
            Governance
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200">
            <ArrowUpDown className="w-5 h-5 mr-2" />
            Transactions
          </a>
        </nav>
      </aside>
      )}
    </div></>
  );
};

export default Sidebar;