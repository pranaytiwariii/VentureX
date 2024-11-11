'use client'

import * as React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Building2, CheckCircle2, PlusCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link } from "react-router-dom"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  registrationNumber: z.string().min(1, { message: "Registration number is required." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  description: z.string().min(50, { message: "Description must be at least 50 characters." }),
  fundingAmount: z.string().min(1, { message: "Funding amount is required." }),
  paymentMethod: z.string().min(1, { message: "Please select payment method." }),
  blockchain: z.string().min(1, { message: "Please select blockchain network." }),
  previousCompanies: z.array(z.object({
    name: z.string().min(1, { message: "Company name is required." }),
    role: z.string().min(1, { message: "Your role is required." }),
    duration: z.string().min(1, { message: "Duration is required." }),
  })),
  totalFundsRaised: z.string().min(1, { message: "Total funds raised is required." }),
  investors: z.array(z.object({
    name: z.string().min(1, { message: "Investor name is required." }),
    amount: z.string().min(1, { message: "Investment amount is required." }),
  })),
});

export default function FounderProfile() {
  const [step, setStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [activityLog, setActivityLog] = React.useState([
    { date: '2024-02-20', action: 'Profile created' },
    { date: '2024-02-19', action: 'KYC documents uploaded' },
    { date: '2024-02-18', action: 'Company details updated' },
  ])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      registrationNumber: "",
      industry: "",
      description: "",
      fundingAmount: "",
      paymentMethod: "",
      blockchain: "",
      previousCompanies: [{ name: "", role: "", duration: "" }],
      totalFundsRaised: "",
      investors: [{ name: "", amount: "" }],
    },
  })

  const { fields: previousCompaniesFields, append: appendPreviousCompany, remove: removePreviousCompany } = useFieldArray({
    control: form.control,
    name: "previousCompanies",
  })

  const { fields: investorsFields, append: appendInvestor, remove: removeInvestor } = useFieldArray({
    control: form.control,
    name: "investors",
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
    setIsSubmitting(false)
    setActivityLog(prev => [{
      date: new Date().toISOString().split('T')[0],
      action: 'Profile submitted for review'
    }, ...prev])
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Founder Profile Setup</CardTitle>
          <CardDescription>
            Complete your profile to start raising funds on our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile Setup</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {step === 1 && (
                    <div className="space-y-4">
                      <Alert>
                        <Building2 className="h-4 w-4" />
                        <AlertTitle>Step 1 of 4</AlertTitle>
                        <AlertDescription>
                          Let&apos;s start with your personal information
                        </AlertDescription>
                      </Alert>
                      
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <Alert>
                        <Building2 className="h-4 w-4" />
                        <AlertTitle>Step 2 of 4</AlertTitle>
                        <AlertDescription>
                          Tell us about your company
                        </AlertDescription>
                      </Alert>
                      
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="registrationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration Number</FormLabel>
                            <FormControl>
                              <Input placeholder="123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectItem value="tech">Technology</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your business..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <Alert>
                        <Building2 className="h-4 w-4" />
                        <AlertTitle>Step 3 of 4</AlertTitle>
                        <AlertDescription>
                          Set up your funding requirements
                        </AlertDescription>
                      </Alert>
                      
                      <FormField
                        control={form.control}
                        name="fundingAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Funding Amount</FormLabel>
                            <FormControl>
                              <Input placeholder="1000000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Payment Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                                <SelectItem value="fiat">Fiat Currency</SelectItem>
                                <SelectItem value="nft">NFTs</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="blockchain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Blockchain</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select blockchain" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectItem value="ethereum">Ethereum</SelectItem>
                                <SelectItem value="bsc">BSC</SelectItem>
                                <SelectItem value="polygon">Polygon</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <Label>KYC Documents</Label>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="kyc">Upload Documents</Label>
                          <Input id="kyc" type="file" />
                        </div>
                        
                        <Label>Pitch Deck</Label>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="pitch">Upload Pitch Deck</Label>
                          <Input id="pitch" type="file" />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      <Alert>
                        <Building2 className="h-4 w-4" />
                        <AlertTitle>Step 4 of 4</AlertTitle>
                        <AlertDescription>
                          Tell us about your previous business history and investors
                        </AlertDescription>
                      </Alert>

                      <div>
                        <Label>Previous Companies</Label>
                        {previousCompaniesFields.map((field, index) => (
                          <div key={field.id} className="flex items-end space-x-2 mt-2">
                            <FormField
                              control={form.control}
                              name={`previousCompanies.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Company Name" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`previousCompanies.${index}.role`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Your Role" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`previousCompanies.${index}.duration`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Duration" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={() => removePreviousCompany(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendPreviousCompany({ name: "", role: "", duration: "" })}>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Previous Company
                        </Button>
                      </div>

                      <FormField
                        control={form.control}
                        name="totalFundsRaised"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Funds Raised (in previous ventures)</FormLabel>
                            <FormControl>
                              <Input placeholder="1000000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <Label>Previous Investors</Label>
                        {investorsFields.map((field, index) => (
                          <div key={field.id} className="flex items-end space-x-2 mt-2">
                            <FormField
                              control={form.control}
                              name={`investors.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Investor Name" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`investors.${index}.amount`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Investment Amount" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={() => removeInvestor(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendInvestor({ name: "", amount: "" })}>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Investor
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                        Previous
                      </Button>
                    )}
                    {step < 4 ? (
                      <Button type="button" onClick={() => setStep(step + 1)}>
                        Next
                      </Button>
                    ) : (
                      <Link to="/founderdashboard">
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit for Approval"}
                        </Button>
                      </Link>
                    )}
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="activity">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {activityLog.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}