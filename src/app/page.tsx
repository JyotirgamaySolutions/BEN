"use client"
import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Building, Calendar, Briefcase, Rocket,  Network, ChevronRight } from "lucide-react"
import { Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { EmailVerificationDialog } from "@/components/email-verification-dialog"

// Note: If you want to use the motion animations, you'll need to install framer-motion
// For now, let's create a simple version without animations
// const motion = {
//   div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
//     <div className={className}>{children}</div>
//   ),
// }

export default function Home() {
  const router = useRouter()
  const [showVerification, setShowVerification] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)

  // Update the taglines array with more catchy messaging
  const taglines = [
    {
      title: "For Consultants & Self-Employed",
      description: "Monetize Your Time & Expertise",
      subtext: "Turn your knowledge into a thriving business with direct access to clients who value what you offer.",
      icon: <Briefcase className="h-6 w-6" />,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "For Business Owners",
      description: "List Your Business & Connect Directly",
      subtext: "Showcase your products and services to a network of verified entrepreneurs seeking trusted partners.",
      icon: <Building className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "For Aspiring Entrepreneurs",
      description: "Learn, Network & Grow",
      subtext:
        "Join our Sneh Milan events to gain insights, find mentors, and build connections that fuel your success.",
      icon: <Rocket className="h-6 w-6" />,
      color: "from-amber-400 to-yellow-500",
    },
  ]

  useEffect(() => {
    // Check for verification expiry
    const checkVerification = () => {
      const isVerified = localStorage.getItem("emailVerified")
      const expiryTime = localStorage.getItem("verificationExpiry")

      if (isVerified === "true" && expiryTime) {
        const currentTime = Date.now()
        if (currentTime > Number.parseInt(expiryTime)) {
          // Clear verification if expired
          localStorage.removeItem("emailVerified")
          localStorage.removeItem("verificationExpiry")
          if (window.location.pathname === "/directory") {
            router.push("/")
          }
        }
      }
    }

    // Check immediately and set up interval
    checkVerification()
    const verificationInterval = setInterval(checkVerification, 30000) // Check every 30 seconds

    // Play video with reduced volume if available
    if (videoRef.current) {
      videoRef.current.volume = 0.2
    }

    return () => {
      clearInterval(verificationInterval)
    }
  }, [router, taglines.length])

  const handleDirectoryClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const isVerified = localStorage.getItem("emailVerified")
    const expiryTime = localStorage.getItem("verificationExpiry")

    if (isVerified === "true" && expiryTime && Date.now() <= Number.parseInt(expiryTime)) {
      router.push("/directory")
    } else {
      // Clear any expired verification
      localStorage.removeItem("emailVerified")
      localStorage.removeItem("verificationExpiry")
      setShowVerification(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <EmailVerificationDialog open={showVerification} onOpenChange={setShowVerification} />

      {/* Hero Section */}
      <header className="relative overflow-hidden text-white pt-16 pb-32">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset- 0 w-full h-full object-cover opacity-40"
        >
          <source src="/benBgVideo2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 mix-blend-multiply" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Bharat Entrepreneurs Network <span className="text-amber-300">(BEN)</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Connect with verified entrepreneurs across India to grow your business, share knowledge, and create
                opportunities.
              </p>
            </div>
          </div>

          {/* 3D Tagline Cards */}
          <div className="w-full mt-8 mb-12">
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
              {taglines.map((tagline, index) => (
                <div
                  key={index}
                  className={`group perspective-1000 ${index === 0 ? "animate-float" : index === 1 ? "animate-float-delay-1" : "animate-float-delay-2"}`}
                >
                  <div className="relative h-full transform-style-3d transition-transform duration-500 group-hover:rotate-y-10 group-hover:scale-105">
                    <div
                      className={`bg-gradient-to-br ${tagline.color} p-6 rounded-xl shadow-xl h-full transform-style-3d backface-hidden`}
                    >
                      <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <div className="text-orange-600">{tagline.icon}</div>
                      </div>

                      <div className="pt-8 pb-2">
                        <Badge variant="outline" className="bg-white/20 text-white border-white/40 px-3 py-1 mb-3">
                          {tagline.title}
                        </Badge>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{tagline.description}</h3>
                        <p className="text-white/80 text-sm">{tagline.subtext}</p>
                      </div>

                      <div className="absolute bottom-4 right-4">
                        {/* <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300"> */}
                          <ChevronRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                // </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button
              onClick={handleDirectoryClick}
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Directory <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/form">
                Join Network <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640, 120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div> */}
      </header>

      {/* Value Proposition Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 bg-orange-100 text-orange-700 border-orange-200">
              Why Join BEN?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Grow Your Business Through Trusted Connections
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              BEN provides a platform for entrepreneurs to connect, collaborate, and grow together through verified
              business relationships and regular networking opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-orange-400 to-amber-500"></div>
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <Banknote className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Monetize Your Expertise</h3>
                <p className="text-gray-600">
                  For consultants and self-employed professionals, BEN offers a platform to showcase your services and
                  connect with clients who value your expertise.
                </p>
                <div className="mt-6">
                  <Link
                    href="/form"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Join as a Consultant <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <Network className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">List Your Business</h3>
                <p className="text-gray-600">
                  Business owners can create a profile in our directory, making it easy for potential clients and
                  partners to find and connect with you directly.
                </p>
                <div className="mt-6">
                  <Link
                    href="/form"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Add Your Business <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-400"></div>
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Learn & Grow</h3>
                <p className="text-gray-600">
                  Aspiring entrepreneurs can attend our Sneh Milan events to learn from established business owners and
                  build valuable connections.
                </p>
                <div className="mt-6">
                  <Link
                    href="#events"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                  >
                    View Upcoming Events <ChevronRight className="ml-1 h-4 w-4" />
                  </ Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <p className="text-orange-100">Active Members</p>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
              <p className="text-orange-100">Industry Categories</p>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">12</div>
              <p className="text-orange-100">Monthly Events</p>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <p className="text-orange-100">Verified Businesses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 bg-orange-100 text-orange-700 border-orange-200">
              Browse by Category
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Find Entrepreneurs in Your Industry</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our directory is organized by industry to help you find the right connections for your business needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={handleDirectoryClick}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer transform hover:-translate-y-1 hover:bg-orange-50 group"
              >
                <h3 className="font-medium text-lg group-hover:text-orange-600">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.count} members</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              onClick={handleDirectoryClick}
              variant="outline"
              className="border-orange-200 hover:bg-orange-100 hover:text-orange-700"
            >
              View All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 bg-orange-100 text-orange-700 border-orange-200">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Our Members Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">
                      RS
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Rahul Sharma</h4>
                    <p className="text-sm text-gray-500">Tech Consultant</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  Since joining BEN, I have connected with 5 new clients who needed my tech expertise. The network has been invaluable for monetizing my time and skills.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">
                      AP
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Anjali Patel</h4>
                    <p className="text-sm text-gray-500">Retail Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  Listing my business on BEN has helped me find reliable suppliers and partners. The verification
                  process ensures I am connecting with legitimate businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">
                      VK
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Vikram Kumar</h4>
                    <p className="text-sm text-gray-500">Aspiring Entrepreneur</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  The Sneh Milan events have been eye-opening. I have learned so much from established entrepreneurs and
                  made connections that helped me launch my startup.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 bg-orange-100 text-orange-700 border-orange-200">
              Networking Opportunities
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Upcoming Sneh Milan Meetups</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our regular networking events to connect with fellow entrepreneurs in person and virtually.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    src="/virtualSnehMilan.jpg"
                    alt="Upcoming meetup"
                    width={300}
                    height={300}
                    className="h-48 w-full object-cover md:w-48 md:h-full"
                  />
                </div>
                <CardContent className="p-8">
                  <Badge className="mb-2 bg-orange-100 text-orange-700 hover:bg-orange-200">Monthly Event</Badge>
                  <h3 className="mt-1 text-2xl font-semibold">Virtual Sneh Milan</h3>
                  <p className="mt-2 text-gray-600 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Monthly Meetup on a scheduled date every month - 3rd Friday • 9:00 PM - 10:00 PM
                  </p>
                  <p className="mt-4 text-gray-600">
                    Connect with entrepreneurs from across India in our monthly virtual networking session. Share ideas,
                    find partners, and grow your business network.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild variant="outline" className="border-orange-200 hover:bg-orange-100">
                      <a href="https://meet.google.com/brh-vosq-dts" target="_blank" rel="noopener noreferrer">
                        Join Google Meet
                      </a>
                    </Button>
                    <Button asChild className="bg-orange-600 hover:bg-orange-700">
                      <a
                        href="https://wa.me/917719965958?text=SitaRam%20Prasad%20Ji,%20Bharat Entrepreneurs Network (BEN)%20Admin,%20I%20want%20to%20register%20for%20the% Virtual%20Sneh%20Milan%209.0%20event"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register for Event
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden mt-8">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    src="/benSevenEdition1.jpg?height=300&width=300"
                    alt="In-person meetup"
                    width={300}
                    height={300}
                    className="h-48 w-full object-cover md:w-48 md:h-full"
                  />
                </div>
                <CardContent className="p-8">
                  <Badge className="mb-2 bg-orange-100 text-orange-700 hover:bg-orange-200">Quarterly Event</Badge>
                  <h3 className="mt-1 text-2xl font-semibold">In-Person Sneh Milan </h3>
                  <p className="mt-2 text-gray-600 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Quaterly Meetup on a scheduled date every month - 1st Sunday • 11:00 AM - 12:30 PM
                  </p>
                  <p className="mt-4 text-gray-600">
                    Join us for an evening of networking, knowledge sharing, and business opportunities. Meet
                    entrepreneurs face-to-face and build lasting business relationships.
                  </p>
                  <div className="mt-6">
                    <Button asChild className="bg-orange-600 hover:bg-orange-700">
                      <a
                        href="https://wa.me/917719965958?text=SitaRam%20Prasad%20Ji,%20Bharat Entrepreneurs Network (BEN)%20Admin,%20I%20want%20to%20register%20for%20the%20In-Person%20Sneh%20Milan%20Mumbai%20event"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register for Event
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Business Network?</h2>
              <p className="text-xl mb-8 text-orange-100">
                Join BEN today and connect with verified entrepreneurs across India
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDirectoryClick}
                  size="lg"
                  variant="outline"
                  className="bg-white text-orange-600 hover:bg-orange-50 border-white"
                >
                  Browse Directory <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Link href="/form">
                    Join Network <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  )
}

// Mock data for categories
const categories = [
  { id: "tech", name: "Technology", count: 42 },
  { id: "finance", name: "Finance", count: 38 },
  { id: "retail", name: "Retail", count: 27 },
  { id: "manufacturing", name: "Manufacturing", count: 31 },
  { id: "consulting", name: "Consulting", count: 45 },
  { id: "marketing", name: "Marketing", count: 36 },
  { id: "education", name: "Education", count: 24 },
  { id: "healthcare", name: "Healthcare", count: 29 },
]
