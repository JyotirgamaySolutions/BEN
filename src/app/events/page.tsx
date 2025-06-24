"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Calendar, MapPin, Clock, Users, Volume2, VolumeX, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import "./events.css"
import Image from "next/image" 

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: string
  capacity: number
  description: string
  image?: string
  videoSrc?: string
}

interface EventCardProps {
  event: Event
  isPast?: boolean
}

interface SnehMilanCardProps {
  title: string
  image: string
  description: string
  details: { icon: React.ReactNode; text: string }[]
  extendedInfo: string
}

// Mock data for upcoming events
const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Monthly Meetup Every Month's 3rd Friday(Virtual) Sneh Milan",
    date: "Monthly Meetup On a scheduled date every month",
    time: "9:00 PM - 10:00 PM",
    location: "Virtual (Google Meeting)",
    type: "Virtual Sneh Milan",
    capacity: 100,
    description: "Monthly Sneh Milan Virtual Meeting for all BEN members",
    image: "/virtualSnehMilan.jpg",
  },
  {
    id: "2",
    title: "Quaterly Meetup Every 3rd Month's 1st Sunday(In Person)",
    date: "Quaterly Meetup On a scheduled date every month",
    time: "11:00 AM - 12:30 PM",
    location: "Dhole Patil Road, Pune",
    type: "In-Person Sneh Milan",
    capacity: 200,
    description: "Your space to build connections, showcase expertise and grow",
    image: "/benSevenEdition1.jpg",
  },
]

// Mock data for past events
const pastEvents: Event[] = [
  {
    id: "p1",
    title: "Bharat Entrepreneurs Network Virtual Sneh Milan 5.0",
    date: "Febuary 21, 2025",
    time: "9:00 PM - 10:00 PM",
    location: "Virtual (Google Meeting)",
    type: "Virtual Sneh Milan",
    capacity: 100,
    description: "Monthly networking meetup for all BEN members",
    image: "/virtualSnehMilan.jpg",
  },
  {
    id: "p2",
    title: "Bharat Entrepreneurs Network In-Person Sneh Milan 4.0",
    date: "February 10, 2023",
    time: "11:00 PM - 12:00 PM",
    location: "Business Square,Baner-Pashan Pune",
    type: "In-Person Sneh Milan",
    capacity: 45,
    description: "Quarterly networking meetup for all BEN members",
    image: "/benFourEdition.jpg",
  },
  {
    id: "p3",
    title: "Bharat Entrepreneurs Network In-Person Sneh Milan 6.0",
    date: "September 1, 2024",
    time: "11:00 AM - 12:30 PM",
    location: "608 Mount Vert Velocity,Baner-Pashan Pune",
    type: "In-Person Sneh Milan",
    capacity: 60,
    description: "Quarterly networking meetup for all BEN members",
    videoSrc: "/benSixEdition.mp4",
  },
  {
    id: "p4",
    title: "Bharat Entrepreneurs Network In-Person Sneh Milan 7.0",
    date: "December 1, 2024",
    time: "11:00 AM - 12:30 PM",
    location: "608 Mount Vert Velocity,Baner-Pashan Pune",
    type: "In-Person Sneh Milan",
    capacity: 150,
    description: "Quarterly networking meetup for all BEN members",
    videoSrc: "/benSevenEdition.mp4",
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Events & Meetups</h1>
          <p className="text-xl opacity-90">Connect with fellow entrepreneurs at our in-person and virtual events</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="sen-milan">Sneh Milan</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sen-milan" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <SnehMilanCard
                title="Virtual Sneh Milan"
                image="/standardvirtualmeet.jpg"
                description="Our Virtual Sneh Milan events bring together entrepreneurs from across the Bharat in an online setting, allowing for networking and collaboration without geographical limitations."
                details={[
                  {
                    icon: <Calendar className="h-5 w-5 text-orange-600 mr-2" />,
                    text: "Held Every Month (January to December)",
                  },
                  {
                    icon: <Clock className="h-5 w-5 text-orange-600 mr-2" />,
                    text: "1-hour sessions with structured networking",
                  },
                  {
                    icon: <Users className="h-5 w-5 text-orange-600 mr-2" />,
                    text: "Up to 200 participants per event",
                  },
                ]}
                extendedInfo={`
    🌟 Virtual Sneh Milan – Connect, Collaborate & Grow! 🌟

    Welcome to a transformative evening of networking and growth at Virtual Sneh Milan, where entrepreneurs unite to create lasting connections and meaningful partnerships.

    Proudly Presented By:
    • Bharat Entrepreneur Network (BEN)
    • Powered by Jyotirgamay Business Ecosystem (JBE)

    Event Highlights:
    • Interactive Breakout Rooms
      - Focused group discussions
      - Industry-specific networking
      - Problem-solving sessions

    • Expert Speaker Sessions
      - Industry leaders sharing insights
      - Success stories and case studies
      - Latest market trends and opportunities

    • Digital Networking Tools
      - Smart matchmaking system
      - Digital business card exchange
      - Post-event connection platform

    Unique SPPS Framework:
    Our signature introduction format covers:
    • Spiritual - Your core values and beliefs
    • Personal - Your journey and aspirations
    • Professional - Your expertise and offerings
    • Social - Your community contributions

    Session Flow:
    1. Welcome and Introduction
    2. SPPS-based Networking
    3. Expert Speaker Session
    4. Themed Group Discussions
    5. Open Networking
    6. Action Items and Next Steps

    Join us to experience the power of meaningful connections in a dynamic virtual environment. Together, let's build a stronger entrepreneurial ecosystem!
  `}
              />
              
              <SnehMilanCard
                title="In-Person Sneh Milan"
                image="/benSevenEdition1.jpg?height=300&width=400"
                description="Our flagship quarterly in-person networking events where members of the Bharat Entrepreneurs Network come together to connect, collaborate, and grow their businesses."
                details={[
                  {
                    icon: <Calendar className="h-5 w-5 text-orange-600 mr-2" />,
                    text: "Held quarterly (March, June, September, December)",
                  },
                  {
                    icon: <MapPin className="h-5 w-5 text-orange-600 mr-2" />,
                    text: "Premium venues across major cities",
                  },
                  {
                    icon: <Users className="h-5 w-5 text-orange-600 mr-2" />,
                    text: "Limited to 100 members per event",
                  },
                ]}
                extendedInfo="In-Person Sneh Milan events are our premium networking experiences featuring curated attendee lists to ensure meaningful connections. Each event includes a keynote presentation, panel discussions, structured networking sessions, and a gourmet dining experience. Attendees receive a printed directory of participants and access to our exclusive BEN member portal. These events often feature special guests from various industries and provide opportunities for business showcases and partnership announcements."
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-white rounded-lg shadow-md p-6 mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Host Your Own Event</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">For BEN Members</h3>
              <p className="text-gray-600 mb-4">
                As a member of our Bharat Entrepreneurs Network, you can propose and host your own networking events,
                workshops, or seminars for fellow members.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Share your expertise through workshops</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Host industry-specific networking sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Organize panel discussions on business topics</span>
                </li>
              </ul>
              <Button asChild variant="outline">
                <a 
                  href="https://wa.me/919579556592?text=SitaRam%20Nikhil%20Ji%2C%20I%20want%20to%20Share%20the%20Event%20Proposal%20for%20Hosting%20the%20Bharat%20Entrepreneurs%20Network%20Meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Submit Event Proposal
                </a>
              </Button>
            </div>
            {/* <div>
              <h3 className="text-lg font-medium mb-3">For Non-Members</h3>
              <p className="text-gray-600 mb-4">
                Interested in collaborating with our network? We welcome partnership opportunities for events that bring
                value to our entrepreneurial community.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Sponsor an existing BEN event</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Propose a co-branded event</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Offer exclusive workshops for our members</span>
                </li>
              </ul>
              <Button asChild variant="outline">
                <a
                  href="https://wa.me/918605589062?text=SitaRam%20Darshan%20Ji%2C%20I%20want%20Contact%20for%20Partnership%20with%20Bharat%20Entrepreneurs%20Network"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact for Partnerships
                </a>
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

function EventCard({ event, isPast = false }: EventCardProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (event.videoSrc && videoRef.current) {
      videoRef.current.muted = isMuted
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Autoplay failed:", error)
          setIsPlaying(false)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [event.videoSrc, isMuted, isPlaying])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        {event.videoSrc ? (
          <div className="relative">
            <video
              ref={videoRef}
              src={event.videoSrc}
              poster={event.image || "/placeholder.svg?height=200&width=400"}
              className="w-full h-48 object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/80 hover:bg-white"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause className="h-4 w-4 text-gray-800" /> : <Play className="h-4 w-4 text-gray-800" />}
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/80 hover:bg-white"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 text-gray-800" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-gray-800" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        )}
        <Badge
          className={`absolute top-3 right-3 ${
            event.type === "Sen Milan" ? "bg-orange-600" : event.type === "Workshop" ? "bg-blue-600" : "bg-orange-600"
          }`}
        >
          {event.type}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-orange-500 mr-2" />
          <span className="text-sm">{event.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-orange-500 mr-2" />
          <span className="text-sm">{event.time}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-orange-500 mr-2" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 text-orange-500 mr-2" />
          <span className="text-sm">Capacity: {event.capacity} attendees</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        {isPast ? (
          event.videoSrc ? (
            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                className="flex-1 border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                onClick={togglePlayPause}
              >
                {isPlaying ? "Pause Video" : "Play Video"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          ) : (
            <></>
          )
        ) : (
          event.type === "Virtual Sneh Milan" ? (
            <Button asChild variant="outline" className="w-full border-orange-200 hover:bg-orange-100">
              <a href="https://meet.google.com/brh-vosq-dts" target="_blank" rel="noopener noreferrer">
                Join Google Meet
              </a>
            </Button>
          ) : (
            <Button variant="outline" className="w-full border-orange-200 hover:bg-orange-100">
              Location will be shared
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  )
}

function SnehMilanCard({ title, image, description, details, extendedInfo }: SnehMilanCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 lg:w-1/3">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-3/5 lg:w-2/3">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="space-y-3 mb-6">
            {details.map((detail, index) => (
              <div key={index} className="flex items-center">
                {detail.icon}
                <span>{detail.text}</span>
              </div>
            ))}
          </div>

          {expanded && (
            <div className="mt-4 mb-6 text-gray-600 animate-fadeIn">
              <h3 className="font-semibold text-gray-800 mb-2">About {title}</h3>
              <p>{extendedInfo}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Show Less" : "Read More"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
