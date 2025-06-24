"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Briefcase, Mail, Phone, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { EmailVerificationDialog } from "@/components/email-verification-dialog"
import { useRouter } from "next/navigation"
import { formatUrl } from "@/components/url-formatter"

interface Member {
  id: string
  name: string
  business_name: string
  business_category: string
  services_offered: string
  location: string
  email: string
  phone: string
  address: string
  city: string
  state: string;
  professional_website?: string
  professional_social_media?: string
  looking_for: string
  business_website?: string
  employment_type: string
}

const predefinedCategories = [
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
]

export default function DirectoryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedMemberEmail, setSelectedMemberEmail] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://bharat-community-server.vercel.app/submissions`)
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`)
        
        const data: Member[] = await response.json()
        
        const transformedMembers = data.map((item) => ({
          ...item,
          id: item.id.toString(),
          business: item.business_name || item.name,
          category: item.business_category || 'other',
          services: item.services_offered?.split(',').map(s => s.trim()) || [],
          lookingFor: item.looking_for?.split(',').map(s => s.trim()) || [],
        }))

        setMembers(transformedMembers)
        setFilteredMembers(transformedMembers)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load directory data')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    filterMembers()
  }, [searchQuery, selectedCategories, members]) // Add members as dependency

  const filterMembers = () => {
    const searchLower = searchQuery.toLowerCase().trim()
    
    let filtered = members

    // Apply category filter if categories are selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(member => 
        selectedCategories.includes(member.business_category.toLowerCase())
      )
    }

    // Apply search filter if search query exists
    if (searchLower) {
      filtered = filtered.filter(member => {
        const searchableContent = [
          member.name,
          member.business_name,
          member.business_category,
          member.services_offered,
          member.email,
          member.phone,
          member.address,
          member.looking_for,
          getCategoryName(member.business_category)
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return searchableContent.includes(searchLower)
      })
    }
    
    setFilteredMembers(filtered)
  }

  const handleSearch = () => {
    filterMembers()
  }

  const handleEditClick = (email: string) => {
    setSelectedMemberEmail(email)
    setIsEditDialogOpen(true)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
      return newCategories
    })
  }

  const getCategoryName = (categoryId: string) => {
    return predefinedCategories.find(c => c.id.toLowerCase() === categoryId.toLowerCase())?.name || categoryId
  }

  const clearAllCategories = () => {
    setSelectedCategories([])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600">Loading directory...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Loading Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-orange-600 hover:bg-orange-700">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Directory</h1>
          <p className="text-xl opacity-90">Connect with verified businesses in our network</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              placeholder="Search by name, business, services, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="bg-orange-600 hover:bg-orange-700">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            {selectedCategories.map((categoryId) => (
              <span key={categoryId} className="bg-orange-300 text-gray-800 px-2 py-1 rounded-full flex items-center">
                {getCategoryName(categoryId)}
                <button onClick={() => handleCategoryChange(categoryId)} className="ml-2 text-yellow-800">x</button>
              </span>
            ))}
            {selectedCategories.length > 0 && (
              <button 
                onClick={clearAllCategories} 
                className="text-gray-800 hover:text-orange-600 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {predefinedCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={category.id}
                  checked={selectedCategories.includes(category.id.toLowerCase())}
                  onChange={() => handleCategoryChange(category.id.toLowerCase())}
                  className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-600"
                />
                <Label htmlFor={category.id} className="text-sm font-medium cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <Card key={member.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold">{member.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {member.business_name || member.name}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditClick(member.email)}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium">Category:</span>
                    <span className="ml-2 text-orange-600">
                      {getCategoryName(member.business_category)}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{member.address}, {member.city}, {member.state}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Mail className="mr-2 h-4 w-4 text-gray-500" />
                    <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">{member.email}</a>
                  </div>
                  {member.phone && (
                    <div className="flex items-center mb-2">
                      <Phone className="mr-2 h-4 w-4 text-gray-500" />
                      <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">{member.phone}</a>
                    </div>
                  )}
                  {member.business_website && (
                    <div className="flex items-center mb-2">
                      <a 
                        href={formatUrl(member.business_website)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  {member.professional_website && (
                    <div className="flex items-center mb-2">
                      <a 
                        href={formatUrl(member.professional_website)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline"
                      >
                        Professional Website
                      </a>
                    </div>
                  )}
                  {member.professional_social_media && (
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600">Professional Social: </span>
                      <a 
                        href={formatUrl(member.professional_social_media)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-2 text-blue-600 hover:underline"
                      >
                        {member.professional_social_media}
                      </a>
                    </div>
                  )}
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Services Offered:</h4>
                    <p className="text-sm text-gray-600">{member.services_offered}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium mb-2">Looking For:</h4>
                    <p className="text-sm text-gray-600">{member.looking_for}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <EmailVerificationDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onVerificationSuccess={(email) => {
          router.push(`/directory/editFormPage?email=${email}`)
        }}
        memberEmail={selectedMemberEmail}
      />
    </div>
  )
}