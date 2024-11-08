import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../data/mockData"; // Adjust path to your mockData.js
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // Adjust paths
import { Button } from "@/components/ui/button"; // Adjust path
import { Progress } from "@/components/ui/progress"; // Adjust path

const ProjectDetails = () => {
  const { id } = useParams(); // Extract project ID from URL params
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const data = await getProjectById(Number(id)); // Fetch project by ID from the mock API
        setProjectData(data); // Set the project data
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchProjectData(); // Fetch the project data when component mounts
  }, [id]); // Re-fetch if the `id` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const percentageFunded = (projectData.currentFunding / projectData.fundingGoal) * 100;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center gap-4">
              <img
                src={projectData.logo}
                alt={`${projectData.name} logo`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <CardTitle>{projectData.name}</CardTitle>
                <CardDescription>{projectData.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Funding Progress</span>
                    <span>${projectData.currentFunding.toLocaleString()} / ${projectData.fundingGoal.toLocaleString()}</span>
                  </div>
                  <Progress value={percentageFunded} className="w-full" />
                </div>
                <div className="flex justify-between">
                  <span>Percentage Funded</span>
                  <span>{percentageFunded.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>End Date</span>
                  <span>{new Date(projectData.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Invest Now</Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetails;
