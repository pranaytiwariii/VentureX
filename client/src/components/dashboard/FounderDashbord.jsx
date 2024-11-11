"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bell,
  ChevronDown,
  CreditCard,
  DollarSign,
  Download,
  LayoutDashboard,
  MessageSquare,
  PieChart,
  Settings,
  Upload,
  Users,
  Menu,
  X,
  Send,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import data from './data.json' // Adjust the path as necessary

export default function FounderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const chatbotRef = useRef(null);
  const data = {
    campaignData: {
      fundsRaised: 750000,
      targetAmount: 1000000,
      milestoneProgress: 75,
    },
    milestones: [
      {
        name: "Product Development",
        status: "Completed",
        deadline: "2023-12-31",
      },
      { name: "Beta Launch", status: "In Progress", deadline: "2024-03-31" },
      {
        name: "Marketing Campaign",
        status: "Upcoming",
        deadline: "2024-06-30",
      },
      { name: "Full Launch", status: "Upcoming", deadline: "2024-09-30" },
    ],
    fundingData: [
      { region: "jan", investors: 12000 },
      { region: "feb", investors: 8000 },
      { region: "march", investors: 6000 },
      { region: "april", investors: 4000 },
      { region: "may", investors: 6000 },
    ],
    investorActivities: [
      {
        investor: "Alice",
        action: "Invested",
        amount: 50000,
        date: "2024-02-15",
      },
      { investor: "Bob", action: "Messaged", amount: null, date: "2024-02-14" },
      {
        investor: "Charlie",
        action: "Voted",
        amount: null,
        date: "2024-02-13",
      },
      {
        investor: "David",
        action: "Invested",
        amount: 25000,
        date: "2024-02-12",
      },
    ],
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        chatbotRef.current &&
        event.target instanceof Node &&
        !chatbotRef.current.contains(event.target)
      ) {
        setChatbotOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-white text-gray-800 w-64 min-h-screen p-4 border-r ${
          sidebarOpen ? "" : "hidden"
        } md:block`}
      >
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
              >
                <LayoutDashboard className="h-5 w-5 text-blue-500" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
              >
                <PieChart className="h-5 w-5 text-green-500" />
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
              >
                <Users className="h-5 w-5 text-purple-500" />
                <span>Investors</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
              >
                <MessageSquare className="h-5 w-5 text-yellow-500" />
                <span>Messages</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
              >
                <Settings className="h-5 w-5 text-red-500" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Founder Dashboard
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Campaign Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Funds Raised
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${data.campaignData.fundsRaised.toLocaleString()}
                </div>
                <Progress
                  value={data.campaignData.milestoneProgress}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {data.campaignData.milestoneProgress}% of $
                  {data.campaignData.targetAmount.toLocaleString()} goal
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Investor Count
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground mt-2">
                  +180 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Campaign Visibility
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground mt-2">
                  +2% from last week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Milestone Management */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Milestone Management</CardTitle>
              <CardDescription>
                Track your project milestones and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.milestones.map((milestone, index) => (
                    <TableRow key={index}>
                      <TableCell>{milestone.name}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            milestone.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : milestone.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {milestone.status}
                        </span>
                      </TableCell>
                      <TableCell>{milestone.deadline}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Funding Status and Analytics */}
          {/* Investor Engagement and Compliance */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Funding Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.fundingData}>
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Bar dataKey="investors" fill="#6941C6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Investor Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investor</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.investorActivities.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>{activity.investor}</TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>
                          {activity.amount
                            ? `$${activity.amount.toLocaleString()}`
                            : "-"}
                        </TableCell>
                        <TableCell>{activity.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Notifications & Alerts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Notifications & Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-blue-500" />
                    <span>
                      Milestone "Beta Launch" deadline approaching in 2 weeks
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-green-500" />
                    <span>New investor joined your campaign</span>
                  </div>
                  <div className="flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>Voting for proposed changes closes in 3 days</span>
                  </div>
                  <div className="flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-purple-500" />
                    <span>5 unread messages from investors</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Chatbot Button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full p-2"
          onClick={() => setChatbotOpen(!chatbotOpen)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>

        {/* Chatbot UI */}
        {chatbotOpen && (
          <div
            ref={chatbotRef}
            className="fixed bottom-20 right-4 w-80 h-96 bg-white border rounded-lg shadow-lg flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Chatbot</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setChatbotOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {/* Chat messages would go here */}
            </div>
            <div className="border-t p-4">
              <form className="flex items-center" action="">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border rounded-md"
                />
                <Button type="submit" size="sm" className="ml-2">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
