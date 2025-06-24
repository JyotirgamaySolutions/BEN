"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from '@/lib/cookies'

/**
 * Component to verify directory access and synchronize localStorage with cookies
 * This helps ensure consistent authentication across devices and browsers
 */
export function DirectoryVerifier() {
  const router = useRouter()

  useEffect(() => {
    const syncAuthState = () => {
      // Get data from both localStorage and cookies
      const localVerified = localStorage.getItem('emailVerified')
      const localExpiry = localStorage.getItem('verificationExpiry')
      const localEmail = localStorage.getItem('verifiedEmail')
      
      const cookieVerified = getCookie('emailVerified')
      const cookieExpiry = getCookie('verificationExpiry')
      const cookieEmail = getCookie('verifiedEmail')
      
      const now = Date.now()
      
      // Check if localStorage has valid credentials
      const isLocalValid = localVerified === 'true' && 
                           localExpiry && 
                           now <= parseInt(localExpiry)
      
      // Check if cookies have valid credentials
      const isCookieValid = cookieVerified === 'true' && 
                           cookieExpiry && 
                           now <= parseInt(cookieExpiry)
      
      // If localStorage is valid but cookies aren't, update cookies
      if (isLocalValid && !isCookieValid && localEmail) {
        const expiryDays = Math.floor((parseInt(localExpiry) - now) / (24 * 60 * 60 * 1000))
        if (expiryDays > 0) {
          setCookie('emailVerified', 'true', expiryDays)
          setCookie('verificationExpiry', localExpiry, expiryDays)
          setCookie('verifiedEmail', localEmail, expiryDays)
        }
      }
      
      // If cookies are valid but localStorage isn't, update localStorage
      if (isCookieValid && !isLocalValid && cookieEmail) {
        localStorage.setItem('emailVerified', 'true')
        localStorage.setItem('verificationExpiry', cookieExpiry)
        localStorage.setItem('verifiedEmail', cookieEmail)
      }
      
      // If both are invalid, clear all auth data
      if (!isLocalValid && !isCookieValid) {
        // Clear localStorage
        localStorage.removeItem('emailVerified')
        localStorage.removeItem('verificationExpiry')
        localStorage.removeItem('verifiedEmail')
        
        // Clear cookies
        document.cookie = 'emailVerified=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        document.cookie = 'verificationExpiry=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        document.cookie = 'verifiedEmail=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      }
    }

    // Run immediately and set up interval
    syncAuthState()
    const interval = setInterval(syncAuthState, 60000) // Check every minute
    
    return () => clearInterval(interval)
  }, [router])

  return null
}