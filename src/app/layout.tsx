"use client"

import { useState } from "react";
import type React from "react";
import { ThemeProvider } from "../components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import "./globals.css";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EmailVerificationDialog } from "@/components/email-verification-dialog";
import FloatingChatbot from "@/components/FloatingChatbot";
import { DirectoryVerifier } from "@/components/DirectoryVerifier";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [showVerification, setShowVerification] = useState(false);

  const handleDirectoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      // Check both localStorage and cookies
      const lsVerified = localStorage.getItem("emailVerified");
      const lsExpiry = localStorage.getItem("verificationExpiry");
      
      // Parse cookie values
      const getCookieValue = (name: string) => {
        const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return value ? value.pop() : null;
      };
      
      const cookieVerified = getCookieValue("emailVerified");
      const cookieExpiry = getCookieValue("verificationExpiry");
      
      const now = Date.now();
      
      // Check localStorage validation
      const isLsValid = lsVerified === "true" && 
                        lsExpiry && 
                        now <= parseInt(lsExpiry);
                        
      // Check cookie validation
      const isCookieValid = cookieVerified === "true" && 
                           cookieExpiry && 
                           now <= parseInt(cookieExpiry);
      
      // If either is valid, navigate to directory
      if (isLsValid || isCookieValid) {
        router.push("/directory");
        return;
      }
      
      // If validation fails, clear auth data and show verification dialog
      localStorage.removeItem("emailVerified");
      localStorage.removeItem("verificationExpiry");
      document.cookie = 'emailVerified=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'verificationExpiry=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      
      setShowVerification(true);
    } catch (error) {
      console.error("Directory access error:", error);
      // Show verification dialog as fallback
      setShowVerification(true);
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <DirectoryVerifier />
          <div className="flex min-h-screen flex-col">
            <EmailVerificationDialog
              open={showVerification}
              onOpenChange={setShowVerification}
            />

            <header className="border-b bg-white">
              <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between relative">
                  {/* Logo */}
                  <Link href="/" className="flex items-center space-x-2 z-10">
                    <Image src="/ben-logo1.png" alt="Logo" width={50} height={50} />
                    <span className="text-xl font-bold text-orange-600">Bharat Entrepreneurs Network</span>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex items-center space-x-6">
                    <a 
                      href="/directory" 
                      onClick={handleDirectoryClick} 
                      className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                    >
                      Directory
                    </a>
                    <Link href="/events" className="text-gray-600 hover:text-orange-600 transition-colors duration-200">
                      Events
                    </Link>
                    <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors duration-200">
                      About
                    </Link>
                    <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <Link href="/form">Join Network</Link>
                    </Button>
                  </nav>

                  {/* Mobile Navigation */}
                  <div className="md:hidden flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-600">
                          <Menu className="h-6 w-6" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={handleDirectoryClick} className="cursor-pointer">
                          Directory
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/events" className="w-full">Events</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/about" className="w-full">About</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/form" className="w-full text-orange-600 font-semibold">
                            Join Network
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="bg-gray-900 text-white py-8">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Bharat Entrepreneurs Network</h3>
                    <p className="text-gray-400">A community dedicated to business and entrepreneurial exchange.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="/directory" onClick={handleDirectoryClick} className="text-gray-400 hover:text-white">
                          Member Directory
                        </a>
                      </li>
                      <li>
                        <Link href="/events" className="text-gray-400 hover:text-white">
                          Upcoming Events
                        </Link>
                      </li>
                      <li>
                        <Link href="/form" className="text-gray-400 hover:text-white">
                          Join Network
                        </Link>
                      </li>
                      <li>
                        <Link href="/about" className="text-gray-400 hover:text-white">
                          About Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Contact</h4>
                    <p className="text-gray-400">For any inquiries, please contact the group administrators.</p>
                    <div className="text-gray-400 mt-2 space-y-2">
                      <p>
                        <a
                          href="https://chat.whatsapp.com/0i3nhit7Qy27UP7UIRHOV5"
                          className="text-orange-400 hover:text-orange-300"
                        >
                          Join our WhatsApp Group
                        </a>
                      </p>
                      <p>
                        <a
                          href="https://wa.me/918605589062?text=I%20want%20to%20edit%20my%20details%20in%20the%20Bharat%20network%20community"
                          className="text-orange-400 hover:text-orange-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          To Update Your Details – Contact Admin
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  <p>© {new Date().getFullYear()} Bharat Entrepreneurs Network. All rights reserved.</p>
                </div>
              </div>
            </footer>
            <FloatingChatbot />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}