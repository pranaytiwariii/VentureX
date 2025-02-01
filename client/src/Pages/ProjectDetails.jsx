import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../data/mockData"; // Adjust path to your mockData.js
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Adjust paths
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress"; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const ProjectDetails = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("updates");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const data = await getProjectById(Number(id));
        setProjectData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!projectData) {
    return <div>No project data found.</div>;
  }

  const percentageFunded =
    (projectData.currentFunding / projectData.fundingGoal) * 100;

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
                    <span>
                      ${projectData.currentFunding.toLocaleString()} / $
                      {projectData.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={percentageFunded} className="w-full" />
                </div>
                <div className="flex justify-between">
                  <span>Percentage Funded</span>
                  <span>{percentageFunded.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>End Date</span>
                  <span>
                    {new Date(projectData.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Invest Now</Button>
            </CardFooter>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {projectData.milestones.map((milestone, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        milestone.completed ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-grow">
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(milestone.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={milestone.completed ? "default" : "secondary"}
                    >
                      {milestone.completed ? "Completed" : "Upcoming"}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {projectData.team.map((member, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Avatar className="w-20 h-20 mb-2">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="faqs">FAQs</TabsTrigger>
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                </TabsList>
                <TabsContent value="updates">
                  <ul className="space-y-4">
                    {projectData.updates.map((update, index) => (
                      <li key={index} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-semibold">{update.title}</h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(update.date).toLocaleDateString()}
                        </p>
                        <p>{update.content}</p>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="faqs">
                  <Accordion type="single" collapsible>
                    {projectData.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                <TabsContent value="discussions">
                  <p>
                    Investor discussions will be implemented here. This could
                    include a comment system or forum integration.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          {/* Add other project details here */}
        </main>

        <aside className="w-full md:w-80">
          <Card>
            <CardHeader>
              <CardTitle>Support with NFT</CardTitle>
              <CardDescription>
                Exclusive NFTs for project supporters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.nfts && projectData.nfts.length > 0 ? (
                  projectData.nfts.map((nft) => (
                    <div key={nft.id} className="flex items-center gap-4">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-16 h-16 rounded"
                      />
                      <div className="flex-grow">
                        <h4 className="font-semibold">{nft.name}</h4>
                        <p className="text-sm text-gray-500">${nft.price}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Buy
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>No NFTs available for this project.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetails;
