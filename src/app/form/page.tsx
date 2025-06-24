"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function BENFormPage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  state: "",
  
    // Employment Type
    employmentType: "", // "selfEmployed" or "ownBusiness"
  
    // Business Overview (for business owners)
    businessName: "",
    category: "",
    otherCategory: "",
    businessDescription: "",
    businessWebsite: "",
    businessSocialMedia: "",
  

    // Professional Details (for self-employed/consultants)
professionalWebsite: "",
professionalSocialMedia: "",
workExperience: "",
  
    // Services & Requirements
    servicesOffered: "",
    lookingFor: "",
  
    // Agreement
    agreeToRules: false,
  })

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    // Section 1 Validation (Basic Information)
    if (currentSection === 1) {
      if (!formData.employmentType) {
        alert("Please select whether you are Self Employed/Consultant or Own a Business")
        return
      }
  
      // Basic field validations
      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        alert("Please fill all required fields in Basic Information")
        return
      }

      // Email validation
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
  
      // Navigate to appropriate section
      if (formData.employmentType === "selfEmployed") {
        setCurrentSection(3)
      } else {
        setCurrentSection(2)
      }
      window.scrollTo(0, 0)
    }
  
    // Section 2 Validation (Business Overview)
    else if (currentSection === 2) {
      // Mandatory fields check
      if (!formData.businessName || !formData.category || !formData.businessDescription) {
        alert("Please fill all required fields in Business Overview")
        return
      }
  
      // Other category specification check
      if (formData.category === "other" && !formData.otherCategory) {
        alert("Please specify your business category")
        return
      }
  
      setCurrentSection(4)
      window.scrollTo(0, 0)
    }
  

 // Section 3 Validation (Self-Employed)
else if (currentSection === 3) {
  // Mandatory fields check
  if (!formData.workExperience) {
    alert("Please select your years of experience");
    return;
  }

  setCurrentSection(4);
  window.scrollTo(0, 0);
}
  
    // Section 4 Validation (Services & Agreement)
    else if (currentSection === 4) {
      // Final validation before submission
      if (!formData.servicesOffered || !formData.lookingFor || !formData.agreeToRules) {
        alert("Please fill all required fields and agree to the community rules")
        return
      }

      setIsSubmitting(true)
      try {
        const submissionData = {
          ...formData,
          // Combine phone with +91 prefix
  phone: `+91${formData.phone}`,
          // Combine category with otherCategory if applicable
          businessCategory: formData.category === "other" ? formData.otherCategory : formData.category
        }
  
        // Update fetch URL to use environment variable
// const response = await fetch(`http://localhost:3000/submit-form`, {
const response = await fetch(`https://bharat-community-server.vercel.app/submit-form`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(submissionData),
});
  
        // Handle duplicate errors
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.error === 'Database error' || errorData.error?.includes('already exists')) {
            if (errorData.details.includes('email')) {
              alert('This email is already registered');
              return; // Add return to prevent further execution
            } 
            if (errorData.details.includes('phone')) {
              alert('This phone number is already registered');
              return; // Add return to prevent further execution
            }
          }
          throw new Error(await response.text());
        }

        if (!response.ok) throw new Error("Submission failed")
        router.push("/form/success")
      } catch (error) {
        console.error("Submission error:", error)
        alert("This email or phone number is already registered. Please connect with Admin.")
      } finally {
        setIsSubmitting(false)
      }
    }
  
    // Safety net for any other sections
    else if (currentSection < 4) {
      setCurrentSection(currentSection + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentSection === 4) {
      // Return to Business Details (2) or Self-Employed (3) based on selection
      if (formData.employmentType === "ownBusiness") {
        setCurrentSection(2)
      } else if (formData.employmentType === "selfEmployed") {
        setCurrentSection(3)
      }
    } else if (currentSection === 2 || currentSection === 3) {
      // Return to Basic Info from either Business Details or Self-Employed
      setCurrentSection(1)
    } else if (currentSection > 1) {
      // Regular back navigation
      setCurrentSection(currentSection - 1)
    }
    window.scrollTo(0, 0)
  }



  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Business Entrepreneurs Network</h1>
            <p className="text-gray-600 mt-2">Please fill out this form to join our community</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentSection >= 1 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span className="text-sm mt-2">Basic Info</span>
              </div>

              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className="h-full bg-orange-600" style={{ width: currentSection >= 2 ? "100%" : "0%" }}></div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentSection >= 2 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span className="text-sm mt-2">Business Details </span>
              </div>

              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className="h-full bg-orange-600" style={{ width: currentSection >= 3 ? "100%" : "0%" }}></div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentSection >= 3 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span className="text-sm mt-2">Self Employed</span>
              </div>

              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className="h-full bg-orange-600" style={{ width: currentSection >= 4 ? "100%" : "0%" }}></div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentSection >= 4 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  4
                </div>
                <span className="text-sm mt-2">Services Offered</span>
              </div>
            </div>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              {currentSection === 1 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription className="mt-1">Tell us about yourself</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {" "}
                    {/* Ensures consistent spacing */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="phone">Business Contact No *</Label>
<div className="relative">
  <span className="absolute left-3 top-2.5 text-gray-500">+91</span>
  <Input
    id="phone"
    name="phone"
    value={formData.phone}
    onChange={(e) => {
      const rawValue = e.target.value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: rawValue }));
    }}
    placeholder=""
    className="pl-12"
    inputMode="numeric"
    pattern="[6-9]\d{9}"
    required
  />
</div>

{formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone) && !/^(\d)\1{9}$/.test(formData.phone) ? (
  <p className="text-sm text-green-600">✓ Valid phone number</p>
) : formData.phone.length === 10 ? (
  <p className="text-sm text-red-600">Invalid phone number</p>
) : formData.phone.length > 0 ? (
  <p className="text-sm text-red-600">Please enter 10 digits</p>
) : null}

  </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        required
                      />
                    </div>

                    <div className="space-y-2">
  <Label htmlFor="city">City *</Label>
  <Input
    id="city"
    name="city"
    value={formData.city}
    onChange={handleChange}
    placeholder="Enter your city"
    required
  />
</div>

<div className="space-y-2">
  <Label htmlFor="state">State *</Label>
  <Select
    value={formData.state}
    onValueChange={(value) => handleSelectChange("state", value)}
    required
  >
    <SelectTrigger>
      <SelectValue placeholder="Select your state" />
    </SelectTrigger>
    <SelectContent>
      {indianStates.map((state) => (
        <SelectItem key={state} value={state}>
          {state}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
                    {/* New section for employment type selection */}
                    <div className="space-y-2 mt-6 border-t pt-4">
                      <Label>Are you *</Label>
                      <RadioGroup
                        value={formData.employmentType}
                        onValueChange={(value) => handleSelectChange("employmentType", value)}
                        required
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-3 py-2">
                          <RadioGroupItem value="selfEmployed" id="self-employed" />
                          <Label htmlFor="self-employed">1) Self Employed/Consultant/Employed</Label>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                          <RadioGroupItem value="ownBusiness" id="own-business" />
                          <Label htmlFor="own-business">2) Own a Business</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </>
              )}

              {currentSection === 2 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle>Business Overview</CardTitle>
                    <CardDescription className="mt-1">
                      Tell us about your business if you are Consultant can skip this section{" "}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Company Name </Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Your company or business name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessDescription">Business Description *</Label>
                      <Textarea
                        id="businessDescription"
                        name="businessDescription"
                        value={formData.businessDescription}
                        onChange={handleChange}
                        placeholder="Briefly describe what your business does"
                        rows={4}
                        required
                      />
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

  {/* Show additional input when "Other" is selected */}
  {formData.category === "other" && (
    <div className="mt-2">
      <Input
        id="otherCategory"
        name="otherCategory"
        value={formData.otherCategory}
        onChange={handleChange}
        placeholder="Please specify your business category"
        required
      />
    </div>
  )}
</div>

                    

                    <div className="space-y-2">
                      <Label htmlFor="businessWebsite">Business Website</Label>
                      <Input
                        id="businessWebsite"
                        name="businessWebsite"
                        value={formData.businessWebsite}
                        onChange={handleChange}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessSocialMedia">Business Social Media Handles</Label>
                      <Input
                        id="businessSocialMedia"
                        name="businessSocialMedia"
                        value={formData.businessSocialMedia}
                        onChange={handleChange}
                        placeholder="LinkedIn, Instagram, Twitter, etc."
                      />
                    </div>
                  </CardContent>
                </>
              )}

{currentSection === 3 && (
  <>
    <CardHeader className="text-center">
      <CardTitle>Self Employment/Consultation</CardTitle>
      <CardDescription className="mt-1">
        Tell us about your professional details
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="workExperience">Years of Experience *</Label>
        <Select
          value={formData.workExperience}
          onValueChange={(value) => handleSelectChange("workExperience", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select years of experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2">0-2 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="6-10">6-10 years</SelectItem>
            <SelectItem value="11-15">11-15 years</SelectItem>
            <SelectItem value="15+">15+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label htmlFor="professionalWebsite">Website</Label>
        <Input
          id="professionalWebsite"
          name="professionalWebsite"
          value={formData.professionalWebsite}
          onChange={handleChange}
          placeholder="https://yourprofessionalwebsite.com"
          type="url"
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="professionalSocialMedia">Social Media Handle</Label>
        <Input
          id="professionalSocialMedia"
          name="professionalSocialMedia"
          value={formData.professionalSocialMedia}
          onChange={handleChange}
          placeholder="LinkedIn, Twitter, etc."
        />
      </div>
    </CardContent>
  </>
)}
{currentSection === 4 && (
  <>
    <CardHeader className="text-center">
      <CardTitle>Services & Requirements</CardTitle>
      <CardDescription className="mt-1">
        Tell us what you offer and what you&apos;re looking for
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-6">
      {/* Services Offered Section */}
      <div className="space-y-4">
        <Label>What services do you provide? *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceOptions.map((service) => {
            const services = formData.servicesOffered.split(', ').filter(Boolean);
            return (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${service}`}
                  checked={services.includes(service)}
                  onCheckedChange={(checked) => {
                    const updatedServices = checked
                      ? [...services, service]
                      : services.filter(item => item !== service);
                    setFormData(prev => ({
                      ...prev,
                      servicesOffered: updatedServices.join(', ')
                    }));
                  }}
                />
                <Label htmlFor={`service-${service}`}>{service}</Label>
              </div>
            );
          })}
          <div className="flex items-center space-x-2 col-span-full">
            <Checkbox
              id="service-other"
              checked={
                formData.servicesOffered.split(', ')
                  .some(item => item && !serviceOptions.includes(item))
              }
              onCheckedChange={(checked) => {
                const services = formData.servicesOffered.split(', ').filter(Boolean);
                const hasOther = services.some(item => !serviceOptions.includes(item));
                
                if (checked && !hasOther) {
                  services.push(''); // Add empty entry for other
                  setFormData(prev => ({
                    ...prev,
                    servicesOffered: services.join(', ')
                  }));
                } else if (!checked && hasOther) {
                  const filtered = services.filter(item => serviceOptions.includes(item));
                  setFormData(prev => ({
                    ...prev,
                    servicesOffered: filtered.join(', ')
                  }));
                }
              }}
            />
            <Label htmlFor="service-other">Other</Label>
            {formData.servicesOffered.split(', ').some(item => !serviceOptions.includes(item)) && (
              <Input
                value={
                  formData.servicesOffered.split(', ')
                    .find(item => item && !serviceOptions.includes(item)) || ''
                }
                onChange={(e) => {
                  const services = formData.servicesOffered.split(', ')
                    .filter(item => serviceOptions.includes(item));
                  services.push(e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    servicesOffered: services.join(', ')
                  }));
                }}
                placeholder="Specify other services"
                className="flex-1"
              />
            )}
          </div>
        </div>
      </div>

      {/* Looking For Section */}
      <div className="space-y-4">
        <Label>What are you looking for from this community? *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lookingForOptions.map((item) => {
            const lookingFor = formData.lookingFor.split(', ').filter(Boolean);
            return (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={`lookingFor-${item}`}
                  checked={lookingFor.includes(item)}
                  onCheckedChange={(checked) => {
                    const updatedLookingFor = checked
                      ? [...lookingFor, item]
                      : lookingFor.filter(i => i !== item);
                    setFormData(prev => ({
                      ...prev,
                      lookingFor: updatedLookingFor.join(', ')
                    }));
                  }}
                />
                <Label htmlFor={`lookingFor-${item}`}>{item}</Label>
              </div>
            );
          })}
          <div className="flex items-center space-x-2 col-span-full">
            <Checkbox
              id="lookingFor-other"
              checked={
                formData.lookingFor.split(', ')
                  .some(i => i && !lookingForOptions.includes(i))
              }
              onCheckedChange={(checked) => {
                const lookingFor = formData.lookingFor.split(', ').filter(Boolean);
                const hasOther = lookingFor.some(i => !lookingForOptions.includes(i));
                
                if (checked && !hasOther) {
                  lookingFor.push(''); // Add empty entry for other
                  setFormData(prev => ({
                    ...prev,
                    lookingFor: lookingFor.join(', ')
                  }));
                } else if (!checked && hasOther) {
                  const filtered = lookingFor.filter(i => lookingForOptions.includes(i));
                  setFormData(prev => ({
                    ...prev,
                    lookingFor: filtered.join(', ')
                  }));
                }
              }}
            />
            <Label htmlFor="lookingFor-other">Other</Label>
            {formData.lookingFor.split(', ').some(i => !lookingForOptions.includes(i)) && (
              <Input
                value={
                  formData.lookingFor.split(', ')
                    .find(i => i && !lookingForOptions.includes(i)) || ''
                }
                onChange={(e) => {
                  const lookingFor = formData.lookingFor.split(', ')
                    .filter(i => lookingForOptions.includes(i));
                  lookingFor.push(e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    lookingFor: lookingFor.join(', ')
                  }));
                }}
                placeholder="Specify other requirements"
                className="flex-1"
              />
            )}
          </div>
        </div>
      </div>

                    <div className="border-t pt-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="agreeToRules"
                          checked={formData.agreeToRules}
                          onCheckedChange={(checked) => handleCheckboxChange("agreeToRules", checked as boolean)}
                          required
                          className="border-black text-black focus:ring-black"
                        />
                        <div>
                          <Label
                            htmlFor="agreeToRules"
                            className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the community rules and guidelines - to join the WhatsApp group
                          </Label>
                          <div className="text-sm text-gray-500 mt-1">
                            By submitting this form, you agree to our community guidelines:
                            <ul className="list-disc pl-5 space-y-1">
                              <li>For business/entrepreneurial exchange only</li>
                              <li>No greetings/chit-chatting/discussions/gyan</li>
                              <li>No other group invites allowed</li>
                              <li>Limit promotional posts to once in a fortnight</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              <CardFooter className="flex justify-between border-t pt-6">
                {currentSection > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                ) : (
                  <div></div>
                )}

<Button 
          type="submit" 
          className="bg-orange-600 hover:bg-orange-700"
          disabled={isSubmitting}
        >
          {currentSection < 4 ? (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              "Submit Application"
            )
          )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Already a member?{" "}
              <Link href="/login" className="text-orange-600 hover:underline">
                Login here
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

const categories = [
  { id: "retail", name: "Retail & E-commerce" },
  { id: "tech", name: "Technology & Software" },
  { id: "finance", name: "Finance & Banking" },
  { id: "health", name: "Health & Wellness" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "food", name: "Food & Beverage" },
  { id: "consulting", name: "Consulting Services" },
  { id: "education", name: "Education & Training" },
  { id: "realestate", name: "Real Estate" },
  { id: "creative", name: "Creative Arts & Media" },
  { id: "other", name: "Other (please specify)" },
]

// Add these constants above your component
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


const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];