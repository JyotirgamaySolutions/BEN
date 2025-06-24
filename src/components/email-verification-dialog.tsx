"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface EmailVerificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  memberEmail?: string
  onVerificationSuccess?: (email: string) => void
}

export function EmailVerificationDialog({ 
  open, 
  onOpenChange, 
  memberEmail,
  onVerificationSuccess 
}: EmailVerificationDialogProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpTimer, setOtpTimer] = useState(0)

  useEffect(() => {
    if (open && memberEmail) {
      setEmail(memberEmail)
    }
  }, [open, memberEmail])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [otpTimer])

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOtp("")
      setIsOtpSent(false)
      setError("")
      setOtpTimer(0)
      if (!memberEmail) {
        setEmail("")
      }
    }
    onOpenChange(newOpen)
  }

  const handleSendOtp = async () => {
    setIsLoading(true)
    setError("")
    try {
      if (memberEmail && email !== memberEmail) {
        throw new Error("Please use the email address you registered with")
      }

      const checkEmailResponse = await fetch("https://bharat-community-server.vercel.app/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!checkEmailResponse.ok) {
        throw new Error("Email is not registered with Bharat Entrepreneurs Network")
      }

      const response = await fetch("https://bharat-community-server.vercel.app/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error("Failed to send OTP")
      setIsOtpSent(true)
      setOtpTimer(30)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("https://bharat-community-server.vercel.app/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })

      if (!response.ok) throw new Error("Invalid OTP")
      
      // Set cookies with path and expiry
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      document.cookie = `emailVerified=true;path=/;max-age=${60 * 60 * 24}`
      document.cookie = `verificationExpiry=${expiryTime};path=/;max-age=${60 * 60 * 24}`
      
      handleOpenChange(false)
      if (onVerificationSuccess) {
        onVerificationSuccess(email)
      } else {
        router.push("/directory")
      }
    } catch (err) {
      console.error(err)
      setError("Invalid OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-semibold text-center">Email Verification Required</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-6">
          {!isOtpSent ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">Enter your Registered Email ID</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!!memberEmail}
                  className="h-11"
                />
                {memberEmail && (
                  <p className="text-sm text-gray-600 text-center">
                    Please verify the email address you registered with
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleSendOtp}
                  disabled={!email || isLoading}
                  className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-base font-medium"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>
                {!memberEmail && (
                  <p className="text-center text-sm text-gray-600">
                    Not a member yet?{" "}
                    <Link 
                      href="/form" 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => handleOpenChange(false)}
                    >
                      Join the Network
                    </Link>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-base font-medium">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="h-11 text-center text-lg tracking-widest"
                />
                {otpTimer > 0 && (
                  <p className="text-sm text-gray-600 text-center">
                    Resend OTP available in {otpTimer} seconds
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleVerifyOtp}
                  disabled={!otp || isLoading}
                  className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-base font-medium"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
                <Button
                  onClick={handleSendOtp}
                  disabled={isLoading || otpTimer > 0}
                  variant="outline"
                  className="w-full h-11"
                >
                  {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
                </Button>
              </div>
            </div>
          )}
          {error && (
            <div className="text-sm text-red-600 space-y-2 text-center">
              <p>{error}</p>
              {!memberEmail && (
                <p>
                  <Link 
                    href="/form" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => handleOpenChange(false)}
                  >
                    Join the Network
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
