// src/Pages/ExploreProject.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"; // Adjust the import paths as necessary
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ExploreProject() {
  const projects = [
    // Example project data
    { id: 1, name: "EcoTech Solutions", logo: "/path/to/logo1.png", fundingGoal: 500000, percentageFunded: 75, endDate: "2023-12-31" },
    { id: 2, name: "AI Healthcare", logo: "/path/to/logo2.png", fundingGoal: 750000, percentageFunded: 50, endDate: "2024-06-30" },
    // Add more projects as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img src={project.logo} alt={`${project.name} logo`} className="w-12 h-12 rounded-full" />
                <CardTitle>{project.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Funding Goal:</span>
                  <span>${project.fundingGoal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Funded:</span>
                  <span>{project.percentageFunded}%</span>
                </div>
                <Progress value={project.percentageFunded} className="w-full" />
                <div className="flex justify-between">
                  <span>End Date:</span>
                  <span>{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/project/${project.id}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}