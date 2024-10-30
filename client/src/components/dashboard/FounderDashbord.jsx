"use client"

import { useState } from 'react'
import { Bell, ChevronDown, Coins, FileText, LineChart, MessageSquare, Milestone, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data
const campaignData = {
  raised: 750000,
  target: 1000000,
  milestoneProgress: 60,
}

const milestoneData = [
  { id: 1, title: "Product Development", status: "Completed", deadline: "2023-12-31" },
  { id: 2, title: "Beta Launch", status: "In Progress", deadline: "2024-03-31" },
  { id: 3, title: "Marketing Campaign", status: "Upcoming", deadline: "2024-06-30" },
]

const fundingData = [
  { source: "Individual Investors", amount: 500000 },
  { source: "Venture Capital", amount: 200000 },
  { source: "Angel Investors", amount: 50000 },
]

const investorActivities = [
  { id: 1, investor: "Alice", action: "Invested $50,000", timestamp: "2 hours ago" },
  { id: 2, investor: "Bob", action: "Commented on milestone", timestamp: "1 day ago" },
  { id: 3, investor: "Charlie", action: "Voted on proposal", timestamp: "3 days ago" },
]

const performanceData = [
  { name: 'Week 1', visits: 4000, conversions: 2400 },
  { name: 'Week 2', visits: 3000, conversions: 1398 },
  { name: 'Week 3', visits: 2000, conversions: 9800 },
  { name: 'Week 4', visits: 2780, conversions: 3908 },
]

export default function FounderDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">DecentralFund</h2>
          <nav>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => setActiveTab("overview")}>
              <Coins className="mr-2 h-4 w-4" /> Overview
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => setActiveTab("milestones")}>
              <Milestone className="mr-2 h-4 w-4" /> Milestones
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => setActiveTab("funding")}>
              <LineChart className="mr-2 h-4 w-4" /> Funding & Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => setActiveTab("investors")}>
              <Users className="mr-2 h-4 w-4" /> Investor Engagement
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => setActiveTab("compliance")}>
              <FileText className="mr-2 h-4 w-4" /> Compliance
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => setActiveTab("performance")}>
              <LineChart className="mr-2 h-4 w-4" /> Performance
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Founder Dashboard</h1>
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="mr-2">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-2">
                    John Doe <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="funding">Funding & Analytics</TabsTrigger>
              <TabsTrigger value="investors">Investor Engagement</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${campaignData.raised.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">raised of ${campaignData.target.toLocaleString()} goal</div>
                    <Progress value={campaignData.raised / campaignData.target * 100} className="mt-2" />
                    <div className="mt-2 text-sm text-gray-500">Milestone Progress: {campaignData.milestoneProgress}%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      {investorActivities.map((activity) => (
                        <div key={activity.id} className="mb-4">
                          <div className="font-semibold">{activity.investor}</div>
                          <div className="text-sm">{activity.action}</div>
                          <div className="text-xs text-gray-500">{activity.timestamp}</div>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full mb-2">Update Milestone</Button>
                    <Button className="w-full mb-2">Message Investors</Button>
                    <Button className="w-full">View Analytics</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="milestones">
              <Card>
                <CardHeader>
                  <CardTitle>Milestone Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {milestoneData.map((milestone) => (
                    <div key={milestone.id} className="mb-4 p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{milestone.title}</h3>
                        <Badge variant={milestone.status === "Completed" ? "success" : milestone.status === "In Progress" ? "warning" : "secondary"}>
                          {milestone.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">Deadline: {milestone.deadline}</div>
                      <Button className="mt-2" variant="outline">Update Status</Button>
                    </div>
                  ))}
                  <Button className="mt-4">Add New Milestone</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="funding">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Funding Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        amount: {
                          label: "Amount",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={fundingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="source" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="amount" fill="var(--color-amount)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investor Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-gray-500">Demographic data visualization goes here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="investors">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Investor Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  {investorActivities.map((activity) => (
                    <div key={activity.id} className="mb-4 p-4 border rounded-lg flex items-center">
                      <Avatar className="mr-4">
                        <AvatarFallback>{activity.investor[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{activity.investor}</div>
                        <div className="text-sm">{activity.action}</div>
                        <div className="text-xs text-gray-500">{activity.timestamp}</div>
                      </div>
                      <Button variant="outline" className="ml-auto">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance and Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">KYC/AML Status</h3>
                    <Badge variant="success">Completed</Badge>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
                    <ul className="list-disc list-inside">
                      <li>Business Registration <Badge variant="success">Uploaded</Badge></li>
                      <li>Financial Statements <Badge variant="warning">Pending Review</Badge></li>
                      <li>Tax Compliance Certificate <Badge variant="secondary">Not Uploaded</Badge></li>
                    </ul>
                  </div>
                  <Button>Upload New Document</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      visits: {
                        label: "Visits",
                        color: "hsl(var(--chart-1))",
                      },
                      conversions: {
                        label: "Conversions",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="visits" fill="var(--color-visits)" />
                        <Bar dataKey="conversions" fill="var(--color-conversions)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <h3 className="text-lg  font-semibold">Top Traffic Sources</h3>
                      <ul className="list-disc list-inside">
                        <li>Direct: 45%</li>
                        <li>Social Media: 30%</li>
                        <li>Referrals: 25%</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Investor Engagement Rate</h3>
                      <p className="text-2xl font-bold">68%</p>
                      <p className="text-sm text-gray-500">+5% from last week</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Average Investment</h3>
                      <p className="text-2xl font-bold">$15,000</p>
                      <p className="text-sm text-gray-500">-2% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}