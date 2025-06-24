// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   // Only run middleware for directory page
//   if (request.nextUrl.pathname.startsWith('/directory')) {
//     // Check if user is verified
//     const isVerified = request.cookies.get('emailVerified')?.value
//     const verificationExpiry = request.cookies.get('verificationExpiry')?.value

//     const isValid = isVerified === 'true' && 
//                    verificationExpiry && 
//                    Date.now() <= parseInt(verificationExpiry)

//     if (!isValid) {
//       // Redirect to home page if not verified
//       return NextResponse.redirect(new URL('/', request.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: '/directory/:path*',
// }


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/directory')) {
    // First check cookies (server-side)
    const cookieVerified = request.cookies.get('emailVerified')?.value
    const cookieExpiry = request.cookies.get('verificationExpiry')?.value

    const isValidCookie = cookieVerified === 'true' && 
                          cookieExpiry && 
                          Date.now() <= parseInt(cookieExpiry)

    // If cookie validation fails, redirect to home page
    if (!isValidCookie) {
      console.log('Directory access denied: Invalid authentication');
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/directory/:path*',
}