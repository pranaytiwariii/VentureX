// src/mockData.js

export const projects = [
    {
      id: 1,
      name: "EcoTech Solutions",
      description: "EcoTech Solutions is revolutionizing sustainable energy.",
      logo: "/images/eco-tech-logo.png",
      fundingGoal: 1000000,
      currentFunding: 750000,
      endDate: "2023-12-31",
      milestones: [
        { title: "Prototype Development", date: "2023-06-30", completed: true },
        { title: "Patent Filing", date: "2023-08-15", completed: true },
        { title: "Pilot Installation", date: "2023-11-30", completed: false },
        { title: "Mass Production", date: "2024-03-31", completed: false }
      ]
    },
    {
      id: 2,
      name: "SolarMax Innovations",
      description: "SolarMax Innovations is advancing solar panel technology.",
      logo: "/images/solarmax-logo.png",
      fundingGoal: 2000000,
      currentFunding: 1200000,
      endDate: "2024-06-30",
      milestones: [
        { title: "Research & Development", date: "2023-01-15", completed: true },
        { title: "First Prototype", date: "2023-09-15", completed: false }
      ]
    }
  ];
  
  export const getProjects = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(projects), 1000); // Simulating API delay
    });
  };
  
  export const getProjectById = (id) => {
    return new Promise((resolve, reject) => {
      const project = projects.find((p) => p.id === id);
      if (project) {
        setTimeout(() => resolve(project), 1000); // Simulating API delay
      } else {
        setTimeout(() => reject(new Error("Project not found")), 1000);
      }
    });
  };
  