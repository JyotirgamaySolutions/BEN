"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Building, MapPin, Mail, Phone, Globe, Briefcase, CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    category: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    services: [] as string[],
    lookingFor: [] as string[],
    about: "",
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, [name]: [...(prev[name as keyof typeof prev] as string[]), value] }
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step < 3) {
      setStep(step + 1)
    } else {
      // In a real application, you would submit the form data to your backend
      console.log("Form submitted:", formData)

      // Redirect to success page
      router.push("/register/success")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Join Our Business Network</h1>
            <p className="text-gray-600 mt-2">Connect with other entrepreneurs and grow your business</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <User className="h-5 w-5" />
                </div>
                <span className="text-sm mt-2">Basic Info</span>
              </div>

              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className="h-full bg-orange-600" style={{ width: step >= 2 ? "100%" : "0%" }}></div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-sm mt-2">Services</span>
              </div>

              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className="h-full bg-orange-600" style={{ width: step >= 3 ? "100%" : "0%" }}></div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-sm mt-2">Confirm</span>
              </div>
            </div>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Tell us about you and your business</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10"
                            placeholder="Full Name"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="business">Business Name *</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="business"
                            name="business"
                            value={formData.business}
                            onChange={handleChange}
                            className="pl-10"
                            placeholder="Your Company Name"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Business Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="City, State"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10"
                            placeholder="email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="pl-10"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website (Optional)</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle>Services & Interests</CardTitle>
                    <CardDescription>Tell us about your services and what you&apos;re looking for
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Services You Provide *</Label>
                      <p className="text-sm text-gray-500">Select all services that your business offers</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {serviceOptions.map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={`service-${service}`}
                              checked={formData.services.includes(service)}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("services", service, checked as boolean)
                              }
                            />
                            <Label htmlFor={`service-${service}`}>{service}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>What Are You Looking For? *</Label>
                      <p className="text-sm text-gray-500">Select all that apply to your business needs</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {lookingForOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`looking-${option}`}
                              checked={formData.lookingFor.includes(option)}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("lookingFor", option, checked as boolean)
                              }
                            />
                            <Label htmlFor={`looking-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about">About Your Business</Label>
                      <Textarea
                        id="about"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        placeholder="Tell us more about your business, your journey, and what makes you unique..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {step === 3 && (
                <>
                  <CardHeader>
                    <CardTitle>Review & Submit</CardTitle>
                    <CardDescription>Please review your information before submitting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Basic Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Name</p>
                          <p className="font-medium">{formData.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Business</p>
                          <p className="font-medium">{formData.business}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Category</p>
                          <p className="font-medium">{getCategoryName(formData.category)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Location</p>
                          <p className="font-medium">{formData.location}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Phone</p>
                          <p className="font-medium">{formData.phone || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Website</p>
                          <p className="font-medium">{formData.website || "Not provided"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Services & Interests</h3>
                      <div className="grid grid-cols-1 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Services Provided</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {formData.services.map((service, index) => (
                              <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                {service}
                              </span>
                            ))}
                            {formData.services.length === 0 && (
                              <span className="text-gray-500">No services selected</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500">Looking For</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {formData.lookingFor.map((item, index) => (
                              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                {item}
                              </span>
                            ))}
                            {formData.lookingFor.length === 0 && (
                              <span className="text-gray-500">No options selected</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500">About</p>
                          <p className="font-medium">{formData.about || "Not provided"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 pt-4 border-t">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                        }
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </Label>
                        <p className="text-sm text-gray-500">
                          By submitting this form, you agree to our{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              <CardFooter className="flex justify-between border-t pt-6">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700"
                  disabled={
                    (step === 1 &&
                      (!formData.name ||
                        !formData.business ||
                        !formData.category ||
                        !formData.location ||
                        !formData.email)) ||
                    (step === 2 && (formData.services.length === 0 || formData.lookingFor.length === 0)) ||
                    (step === 3 && !formData.agreeTerms)
                  }
                >
                  {step < 3 ? (
                    <>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Helper function to get category name from ID
function getCategoryName(categoryId: string) {
  const category = categories.find((c) => c.id === categoryId)
  return category ? category.name : categoryId
}

// Mock data for categories
const categories = [
  { id: "tech", name: "Technology" },
  { id: "finance", name: "Finance" },
  { id: "retail", name: "Retail" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "consulting", name: "Consulting" },
  { id: "marketing", name: "Marketing" },
  { id: "education", name: "Education" },
  { id: "healthcare", name: "Healthcare" },
]

// Service options
const serviceOptions = [
  "Web Development",
  "Mobile App Development",
  "Digital Marketing",
  "SEO Services",
  "Social Media Management",
  "Graphic Design",
  "Content Writing",
  "Financial Consulting",
  "Legal Services",
  "HR Services",
  "Manufacturing",
  "Wholesale Supply",
  "Retail",
  "Import/Export",
  "Logistics",
  "Education & Training",
  "Healthcare Services",
  "Real Estate",
  "Event Management",
  "IT Consulting",
]

// Looking for options
const lookingForOptions = [
  "Clients",
  "Customers",
  "Business Partners",
  "Suppliers",
  "Distributors",
  "Retailers",
  "Investors",
  "Mentors",
  "Service Providers",
  "Networking Opportunities",
  "Referrals",
  "Joint Ventures",
  "Franchising Opportunities",
]

