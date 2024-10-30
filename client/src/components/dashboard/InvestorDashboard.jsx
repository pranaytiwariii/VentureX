'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { Bell, Home, PieChart as PieChartIcon, DollarSign, Vote, ArrowUpDown, AlertCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data
const portfolioData = [
  { name: 'Project A', value: 400 },
  { name: 'Project B', value: 300 },
  { name: 'Project C', value: 200 },
  { name: 'Project D', value: 100 },
]

const activeInvestments = [
  { name: 'Project X', progress: 75, milestone: 'Beta Launch' },
  { name: 'Project Y', progress: 40, milestone: 'Prototype' },
  { name: 'Project Z', progress: 90, milestone: 'Market Entry' },
]

const fundingOpportunities = [
  { name: 'EcoTech Solutions', description: 'Sustainable energy storage', match: '95%' },
  { name: 'HealthAI', description: 'AI-powered diagnostics', match: '87%' },
  { name: 'SpaceHarvest', description: 'Orbital agriculture tech', match: '82%' },
]

const recentTransactions = [
  { project: 'Project A', amount: '+5000 USDC', date: '2023-06-15' },
  { project: 'Project B', amount: '-2000 USDC', date: '2023-06-10' },
  { project: 'Project C', amount: '+3000 USDC', date: '2023-06-05' },
]

const votingProposals = [
  { title: 'Increase funding for Project X', deadline: '2023-06-30' },
  { title: 'New partnership with TechCorp', deadline: '2023-07-05' },
  { title: 'Adjust investor reward structure', deadline: '2023-07-10' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function InvestorDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,250,000</div>
              <div className="text-sm text-gray-500">Total Investments</div>
              <div className="mt-2 text-lg font-semibold text-green-600">+12.5% ROI</div>
              <PieChart width={200} height={200} className="mx-auto mt-4">
                <Pie
                  data={portfolioData}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>

          {/* Active Investments */}
          <Card>
            <CardHeader>
              <CardTitle>Active Investments</CardTitle>
            </CardHeader>
            <CardContent>
              {activeInvestments.map((investment, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold">{investment.name}</div>
                    <Badge>{investment.milestone}</Badge>
                  </div>
                  <Progress value={investment.progress} className="w-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Funding Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle>Funding Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {fundingOpportunities.map((opportunity, index) => (
                <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{opportunity.name}</div>
                      <div className="text-sm text-gray-500">{opportunity.description}</div>
                    </div>
                    <Badge variant="secondary">{opportunity.match} Match</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Investment Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-semibold">{transaction.project}</div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                  <div className={transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Governance and Voting */}
          <Card>
            <CardHeader>
              <CardTitle>Governance and Voting</CardTitle>
            </CardHeader>
            <CardContent>
              {votingProposals.map((proposal, index) => (
                <div key={index} className="mb-4">
                  <div className="font-semibold">{proposal.title}</div>
                  <div className="text-sm text-gray-500">Deadline: {proposal.deadline}</div>
                  <Button className="mt-2" size="sm">Vote Now</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Earnings and Withdrawals */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings & Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$25,000</div>
              <div className="text-sm text-gray-500">Total Earnings</div>
              <BarChart width={300} height={200} data={[
                { name: 'Jan', earnings: 4000 },
                { name: 'Feb', earnings: 3000 },
                { name: 'Mar', earnings: 5000 },
                { name: 'Apr', earnings: 4500 },
                { name: 'May', earnings: 6000 },
                { name: 'Jun', earnings: 2500 },
              ]} className="mt-4">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#8884d8" />
              </BarChart>
              <Button className="mt-4" size="sm">Withdraw Earnings</Button>
            </CardContent>
          </Card>
        </div>

        {/* Notifications & Alerts */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Notifications & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
                <span>Project X has reached its funding goal!</span>
              </div>
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-yellow-500" />
                <span>New voting proposal: Increase funding for Project Y</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-green-500" />
                <span>Milestone completed: Project Z launched beta version</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}