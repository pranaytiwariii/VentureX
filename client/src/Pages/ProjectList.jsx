'use client'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjects } from '../data/mockData' // Adjust path to where your mock data is stored
import { Search, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const industries = ['Green Tech', 'Healthcare', 'Fintech', 'Education', 'E-commerce']
const paymentMethods = ['Crypto', 'Fiat', 'NFT']

const ProjectList = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustries, setSelectedIndustries] = useState([])
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([])
  const [sortOption, setSortOption] = useState('trending')

  // Fetch projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects() // Fetch projects from the mock API
        setProjects(data) // Set fetched data to state
      } catch (error) {
        setError(error.message) // Handle errors
      } finally {
        setLoading(false) // Stop loading when data is fetched
      }
    }

    fetchProjects()
  }, [])

  // Handle filtered projects based on search and selected filters
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedIndustries.length === 0 || selectedIndustries.includes(project.industry)) &&
    (selectedPaymentMethods.length === 0 || project.paymentMethods.some(method => selectedPaymentMethods.includes(method)))
  )

  // Sorting projects based on the selected sort option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === 'trending') return b.percentageFunded - a.percentageFunded
    if (sortOption === 'recent') return new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
    if (sortOption === 'funded') return b.fundingGoal * (b.percentageFunded / 100) - a.fundingGoal * (a.percentageFunded / 100)
    return 0
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Fundraising Projects</h1>
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trending
                </div>
              </SelectItem>
              <SelectItem value="recent">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Recently Launched
                </div>
              </SelectItem>
              <SelectItem value="funded">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Most Funded
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 mb-8 md:mb-0 md:mr-8">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Industry Filter */}
                <div>
                  <h3 className="font-semibold mb-2">Industries</h3>
                  {industries.map(industry => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={`industry-${industry}`}
                        checked={selectedIndustries.includes(industry)}
                        onCheckedChange={(checked) => {
                          setSelectedIndustries(
                            checked
                              ? [...selectedIndustries, industry]
                              : selectedIndustries.filter(i => i !== industry)
                          )
                        }}
                      />
                      <label htmlFor={`industry-${industry}`}>{industry}</label>
                    </div>
                  ))}
                </div>

                {/* Payment Method Filter */}
                <div>
                  <h3 className="font-semibold mb-2">Payment Methods</h3>
                  {paymentMethods.map(method => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox
                        id={`payment-${method}`}
                        checked={selectedPaymentMethods.includes(method)}
                        onCheckedChange={(checked) => {
                          setSelectedPaymentMethods(
                            checked
                              ? [...selectedPaymentMethods, method]
                              : selectedPaymentMethods.filter(m => m !== method)
                          )
                        }}
                      />
                      <label htmlFor={`payment-${method}`}>{method}</label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Project List */}
        <main className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map(project => (
              <Link to={`/project/${project.id}`} key={project.id}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        className="w-20 h-20 rounded-full"
                      />
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
                    <Button className="w-full">Invest Now</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProjectList
