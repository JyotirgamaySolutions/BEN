"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"


interface FormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  business_name: string
  business_category: string
  business_description: string
  business_website: string
  business_social_media: string
  services_offered: string
  looking_for: string
}

export default function EditFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const [formData, setFormData] = useState<FormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!email) {
        setError("No email provided")
        setIsLoading(false)
        return
      }

      try {
        // const response = await fetch(`https://bharat-community-server.vercel.app/member/${email}`)
        const response = await fetch(`https://bharat-community-server.vercel.app/member/${email}`)
        if (!response.ok) throw new Error("Failed to fetch member data")
        
        const data = await response.json()
        setFormData(data)
      } catch (err) {
        setError("Failed to load member data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMemberData()
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`https://bharat-community-server.vercel.app/update-member`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update member")
      
      router.push("/directory")
    } catch (err) {
      console.error(err)
      setError("Failed to update member details")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600">Loading member details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Button onClick={() => router.push("/directory")} className="bg-orange-600 hover:bg-orange-700">
            Return to Directory
          </Button>
        </div>
      </div>
    )
  }

  if (!formData) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/directory" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Edit Member Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div>
  <Label htmlFor="city">City</Label>
  <Input
    id="city"
    name="city"
    value={formData.city}
    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
    required
  />
</div>

<div>
  <Label htmlFor="state">State</Label>
  <Select
  value={formData.state}
    onValueChange={(value) => setFormData({ ...formData, state: value })}
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

                  <div>
                    <Label htmlFor="business_name">Business Name</Label>
                    <Input
                      id="business_name"
                      value={formData.business_name}
                      onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="business_description">Business Description</Label>
                    <Textarea
                      id="business_description"
                      value={formData.business_description}
                      onChange={(e) => setFormData({ ...formData, business_description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="business_website">Business Website</Label>
                    <Input
                      id="business_website"
                      value={formData.business_website}
                      onChange={(e) => setFormData({ ...formData, business_website: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="business_social_media">Business Social Media</Label>
                    <Input
                      id="business_social_media"
                      value={formData.business_social_media}
                      onChange={(e) => setFormData({ ...formData, business_social_media: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="services_offered">Services Offered</Label>
                    <Textarea
                      id="services_offered"
                      value={formData.services_offered}
                      onChange={(e) => setFormData({ ...formData, services_offered: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="looking_for">Looking For</Label>
                    <Textarea
                      id="looking_for"
                      value={formData.looking_for}
                      onChange={(e) => setFormData({ ...formData, looking_for: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/directory")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Details"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

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