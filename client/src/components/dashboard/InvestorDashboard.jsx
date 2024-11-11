'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, ChevronDown, CreditCard, DollarSign, Home, MenuIcon,MessageCircle, PieChart, Settings, Users, Vote, X, Send, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Chatbot from './chatbot/InvestorChatbot'
import { Link } from 'react-router-dom'

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("portfolio")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const chatbotRef = useRef(null)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleChatbot = () => setChatbotOpen(!chatbotOpen)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setChatbotOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white p-4 transition-all duration-300 ease-in-out`}>
        <div className="flex items-center mb-6">
          {/* <PieChart className="h-6 w-6 mr-2 text-blue-500" /> */}
          <img src="/" alt="" />
          {sidebarOpen && <h1 className="text-xl font-semibold">VentureX</h1>}
        </div>
        <nav>
        <Button variant="ghost" className="w-full justify-start mt-auto" onClick={toggleSidebar}>
          {sidebarOpen ? <X className="h-4 w-4" /> : <MenuIcon className="h-5 w-5" />}
          {sidebarOpen && "Collapse"}
        </Button>
          <Button variant="ghost" className={`w-full justify-start mb-2 ${!sidebarOpen && 'px-2'}`} onClick={() => setActiveTab("portfolio")}>
            <Home className="mr-2 h-4 w-4 text-green-500" />
            {sidebarOpen && "Portfolio Overview"}
          </Button>
          <Button variant="ghost" className={`w-full justify-start mb-2 ${!sidebarOpen && 'px-2'}`} onClick={() => setActiveTab("investments")}>
            <DollarSign className="mr-2 h-4 w-4 text-yellow-500" />
            {sidebarOpen && "Active Investments"}
          </Button>
          <Button variant="ghost" className={`w-full justify-start mb-2 ${!sidebarOpen && 'px-2'}`} onClick={() => setActiveTab("opportunities")}>
            <Users className="mr-2 h-4 w-4 text-purple-500" />
            {sidebarOpen && "Funding Opportunities"}
          </Button>
          <Button variant="ghost" className={`w-full justify-start mb-2 ${!sidebarOpen && 'px-2'}`} onClick={() => setActiveTab("activity")}>
            <CreditCard className="mr-2 h-4 w-4 text-red-500" />
            {sidebarOpen && "Investment Activity"}
          </Button>
          <Button variant="ghost" className={`w-full justify-start mb-2 ${!sidebarOpen && 'px-2'}`} onClick={() => setActiveTab("governance")}>
            <Vote className="mr-2 h-4 w-4 text-indigo-500" />
            {sidebarOpen && "Governance and Voting"}
          </Button>
          <Button variant="ghost" className={`w-full justify-start mb-2 ${!sidebarOpen && 'px-2'}`} onClick={() => setActiveTab("earnings")}>
            <DollarSign className="mr-2 h-4 w-4 text-teal-500" />
            {sidebarOpen && "Earnings & Withdrawals"}
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 h-screen overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Investor Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Link to="/explore">
            <Button variant="outline" size="auto">
              <p className='p-2'>Add investment</p>
              <Plus className="" />
            </Button>
            </Link>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">John Doe</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsContent value="portfolio" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ROI</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+15.3%</div>
                  <p className="text-xs text-muted-foreground">+4% from last quarter</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Votes and approvals</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  {/* Add a chart component here */}
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Portfolio Breakdown Chart
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Investments</CardTitle>
                <CardDescription>Your current investment portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {[
                    { name: 'Project Alpha', invested: 10000, progress: 75, milestone: 'Beta Testing' },
                    { name: 'Project Beta', invested: 15000, progress: 50, milestone: 'MVP Launch' },
                    { name: 'Project Gamma', invested: 8000, progress: 25, milestone: 'Seed Funding' },
                  ].map((project, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{project.name}</h4>
                        <span className="text-sm text-muted-foreground">${project.invested.toLocaleString()} invested</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">Next milestone: {project.milestone}</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Opportunities</CardTitle>
                <CardDescription>Personalized investment recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {[
                    { name: 'EcoTech Solutions', sector: 'Green Technology', seeking: 500000 },
                    { name: 'AI Healthcare', sector: 'Healthcare', seeking: 750000 },
                    { name: 'Sustainable Energy', sector: 'Renewable Energy', seeking: 1000000 },
                  ].map((project, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-lg">
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">Seeking ${project.seeking.toLocaleString()} - {project.sector}</p>
                      <div className="mt-2">
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {[
                    { type: 'Deposit', project: 'Project Alpha', amount: 5000, date: '2023-06-15' },
                    { type: 'Withdrawal', project: 'Project Beta', amount: 2000, date: '2023-06-10' },
                    { type: 'Deposit', project: 'Project Gamma', amount: 3000, date: '2023-06-05' },
                  ].map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-semibold">{transaction.type}</p>
                        <p className="text-sm text-muted-foreground">{transaction.project}</p>
                      </div>
                      <div className="text-right">
                        <span className={transaction.type === 'Withdrawal' ? 'text-red-500' : 'text-green-500'}>
                          ${transaction.amount.toLocaleString()}
                        </span>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Voting Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {[
                    { title: 'Increase funding for Project X', deadline: '2023-06-30' },
                    { title: 'New partnership with TechCorp', deadline: '2023-07-05' },
                    { title: 'Adjust investor reward structure', deadline: '2023-07-10' },
                  ].map((proposal, index) => (
                    <div key={index} className="mb-4">
                      <div className="font-semibold">{proposal.title}</div>
                      <div className="text-sm text-muted-foreground">Deadline: {proposal.deadline}</div>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">For</Button>
                        <Button size="sm" variant="outline">Against</Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Total Earnings</h4>
                    <p className="text-2xl font-bold">$12,345.67</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Recent Withdrawals</h4>
                    <ScrollArea className="h-[200px]">
                      {[
                        { date: '2023-05-15', amount: 1000 },
                        { date: '2023-04-30', amount: 2500 },
                        { date: '2023-04-15', amount: 750 },
                      ].map((withdrawal, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                          <span>{withdrawal.date}</span>
                          <span className="font-semibold">${withdrawal.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Chatbot Component */}
        <Chatbot />
      </main>
    </div>
  );
}
