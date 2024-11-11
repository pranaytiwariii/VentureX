const projects = [
  {
    id: 1,
    name: "EcoTech Solutions",
    description: "EcoTech Solutions is revolutionizing the way we approach sustainable energy. Our innovative solar panel technology increases efficiency by 30% while reducing production costs.",
    logo: "/HeroSection/sisyphus.svg",
    fundingGoal: 1000000,
    currentFunding: 750000,
    endDate: "2023-12-31",
    milestones: [
      { title: "Prototype Development", date: "2023-06-30", completed: true },
      { title: "Patent Filing", date: "2023-08-15", completed: true },
      { title: "Pilot Installation", date: "2023-11-30", completed: false },
      { title: "Mass Production", date: "2024-03-31", completed: false },
    ],
    team: [
      { name: "Jane Doe", role: "CEO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "John Smith", role: "CTO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "Alice Johnson", role: "Lead Engineer", avatar: "/placeholder.svg?height=50&width=50" },
    ],
    nfts: [
      { id: 1, name: "Early Supporter", price: 500, image: "/placeholder.svg?height=150&width=150" },
      { id: 2, name: "Green Innovator", price: 1000, image: "/placeholder.svg?height=150&width=150" },
      { id: 3, name: "Eco Warrior", price: 2500, image: "/placeholder.svg?height=150&width=150" },
    ],
    updates: [
      { date: "2023-09-15", title: "Milestone Achieved", content: "We're excited to announce that we've successfully completed our prototype development phase!" },
      { date: "2023-10-01", title: "New Partnership", content: "EcoTech Solutions has partnered with GreenEnergy Corp to expand our distribution network." },
    ],
    faqs: [
      { question: "How does your technology differ from traditional solar panels?", answer: "Our panels use advanced nanotechnology to capture a broader spectrum of light, resulting in higher efficiency." },
      { question: "What's your projected ROI for investors?", answer: "We project a 15-20% annual return on investment over the next 5 years, based on current market trends and our growth projections." },
    ],
  },
  {
    id: 2,
    name: "GreenWave Technologies",
    description: "GreenWave Technologies is dedicated to creating innovative solutions for water conservation. Our smart irrigation systems reduce water usage by 40% while maintaining optimal plant health.",
    logo: "/HeroSection/quotient.svg",
    fundingGoal: 2000000,
    currentFunding: 1500000,
    endDate: "2024-06-30",
    milestones: [
      { title: "Research and Development", date: "2023-05-30", completed: true },
      { title: "Prototype Testing", date: "2023-09-15", completed: true },
      { title: "Market Launch", date: "2024-03-01", completed: false },
      { title: "Global Expansion", date: "2024-12-31", completed: false },
    ],
    team: [
      { name: "Emily Clark", role: "CEO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "Michael Brown", role: "CTO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "Sarah Davis", role: "Lead Scientist", avatar: "/placeholder.svg?height=50&width=50" },
    ],
    nfts: [
      { id: 1, name: "Water Saver", price: 600, image: "/placeholder.svg?height=150&width=150" },
      { id: 2, name: "Eco Guardian", price: 1200, image: "/placeholder.svg?height=150&width=150" },
      { id: 3, name: "Green Champion", price: 3000, image: "/placeholder.svg?height=150&width=150" },
    ],
    updates: [
      { date: "2023-07-01", title: "Research Completed", content: "We have successfully completed our research phase and are moving on to prototype testing." },
      { date: "2023-10-01", title: "Partnership Announcement", content: "GreenWave Technologies has partnered with AquaTech to enhance our smart irrigation systems." },
    ],
    faqs: [
      { question: "How does your irrigation system save water?", answer: "Our system uses advanced sensors and AI to optimize water usage, reducing waste by up to 40%." },
      { question: "What is the expected ROI for investors?", answer: "We anticipate a 20-25% annual return on investment over the next 5 years, based on our growth projections." },
    ],
  },
  {
    id: 3,
    name: "Solar Innovations",
    description: "Solar Innovations is at the forefront of solar energy technology. Our advanced solar panels offer 25% more efficiency compared to traditional panels, making renewable energy more accessible.",
    logo: "/HeroSection/circooles.svg",
    fundingGoal: 1500000,
    currentFunding: 1000000,
    endDate: "2024-05-31",
    milestones: [
      { title: "Design Phase", date: "2023-04-30", completed: true },
      { title: "Prototype Creation", date: "2023-08-20", completed: true },
      { title: "Field Testing", date: "2024-01-15", completed: false },
      { title: "Commercial Production", date: "2024-07-31", completed: false },
    ],
    team: [
      { name: "David Lee", role: "CEO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "Sophia Martinez", role: "CTO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "James Wilson", role: "Chief Engineer", avatar: "/placeholder.svg?height=50&width=50" },
    ],
    nfts: [
      { id: 1, name: "Solar Pioneer", price: 700, image: "/placeholder.svg?height=150&width=150" },
      { id: 2, name: "Energy Innovator", price: 1400, image: "/placeholder.svg?height=150&width=150" },
      { id: 3, name: "Renewable Leader", price: 3500, image: "/placeholder.svg?height=150&width=150" },
    ],
    updates: [
      { date: "2023-06-01", title: "Design Completed", content: "Our design phase is complete, and we are moving forward with prototype creation." },
      { date: "2023-09-01", title: "New Partnership", content: "Solar Innovations has partnered with GreenEnergy Solutions to enhance our solar panel technology." },
    ],
    faqs: [
      { question: "What makes your solar panels more efficient?", answer: "Our panels use cutting-edge materials and design to capture more sunlight and convert it into energy more efficiently." },
      { question: "What is the projected ROI for investors?", answer: "We project a 18-22% annual return on investment over the next 5 years, based on current market trends." },
    ],
  },
  {
    id: 4,
    name: "BioTech Ventures",
    description: "BioTech Ventures is pioneering advancements in biotechnology. Our innovative solutions in gene editing and synthetic biology are set to transform healthcare and agriculture.",
    logo: "/HeroSection/catalog.svg",
    fundingGoal: 2500000,
    currentFunding: 2000000,
    endDate: "2024-08-31",
    milestones: [
      { title: "Research Phase", date: "2023-03-31", completed: true },
      { title: "Clinical Trials", date: "2023-12-15", completed: true },
      { title: "Regulatory Approval", date: "2024-06-30", completed: false },
      { title: "Market Launch", date: "2024-12-31", completed: false },
    ],
    team: [
      { name: "Olivia Johnson", role: "CEO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "Liam Smith", role: "CTO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "Emma Brown", role: "Chief Scientist", avatar: "/placeholder.svg?height=50&width=50" },
    ],
    nfts: [
      { id: 1, name: "Bio Innovator", price: 800, image: "/placeholder.svg?height=150&width=150" },
      { id: 2, name: "Gene Pioneer", price: 1600, image: "/placeholder.svg?height=150&width=150" },
      { id: 3, name: "Synthetic Leader", price: 4000, image: "/placeholder.svg?height=150&width=150" },
    ],
    updates: [
      { date: "2023-05-01", title: "Research Completed", content: "We have successfully completed our research phase and are moving on to clinical trials." },
      { date: "2023-11-01", title: "Partnership Announcement", content: "BioTech Ventures has partnered with HealthTech Inc. to advance our gene editing technology." },
    ],
    faqs: [
      { question: "What are the potential applications of your gene editing technology?", answer: "Our technology can be used in healthcare for gene therapy and in agriculture for crop improvement." },
      { question: "What is the expected ROI for investors?", answer: "We anticipate a 25-30% annual return on investment over the next 5 years, based on our growth projections." },
    ],
  },
  {
    id: 5,
    name: "CleanAir Solutions",
    description: "CleanAir Solutions is committed to improving air quality through innovative filtration systems. Our products are designed to remove pollutants and allergens, ensuring cleaner and healthier air.",
    logo: "/Logo2.png",
    fundingGoal: 1800000,
    currentFunding: 1300000,
    endDate: "2024-07-31",
    milestones: [
      { title: "Product Design", date: "2023-02-28", completed: true },
      { title: "Prototype Testing", date: "2023-07-15", completed: true },
      { title: "Market Launch", date: "2024-04-01", completed: false },
      { title: "Global Expansion", date: "2024-11-30", completed: false },
    ],
    team: [
      { name: "William Green", role: "CEO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "Ava White", role: "CTO", avatar: "/placeholder.svg?height=50&width=50" },
      { name: "Ethan Black", role: "Lead Engineer", avatar: "/placeholder.svg?height=50&width=50" },
    ],
    nfts: [
      { id: 1, name: "Air Purifier", price: 500, image: "/placeholder.svg?height=150&width=150" },
      { id: 2, name: "Clean Air Advocate", price: 1000, image: "/placeholder.svg?height=150&width=150" },
      { id: 3, name: "Pollution Fighter", price: 2500, image: "/placeholder.svg?height=150&width=150" },
    ],
    updates: [
      { date: "2023-04-01", title: "Design Completed", content: "Our product design phase is complete, and we are moving forward with prototype testing." },
      { date: "2023-08-01", title: "New Partnership", content: "CleanAir Solutions has partnered with AirTech Innovations to enhance our filtration systems." },
    ],
    faqs: [
      { question: "How effective are your filtration systems?", answer: "Our systems are designed to remove up to 99% of pollutants and allergens from the air." },
      { question: "What is the projected ROI for investors?", answer: "We project a 20-25% annual return on investment over the next 5 years, based on current market trends." },
    ],
  },
];

export const getProjects = () => {
  return new Promise((resolve) => {
    resolve(projects);
  });
};

export const getProjectById = (id) => {
  return new Promise((resolve, reject) => {
    const project = projects.find((project) => project.id === id);
    if (project) {
      resolve(project);
    } else {
      reject(new Error("Project not found"));
    }
  });
};