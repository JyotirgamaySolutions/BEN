import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for joining our Bharat Entrepreneurs Network. Your application has been received.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-medium text-gray-900 mb-2">What happens next?</h2>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-100 text-orange-600 mr-2 flex-shrink-0 text-xs">
                  1
                </span>
                <span>Our team will review your application within 24-48 hours.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-100 text-orange-600 mr-2 flex-shrink-0 text-xs">
                  2
                </span>
                <span>You&apos;ll receive an email confirmation with your membership details.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-100 text-orange-600 mr-2 flex-shrink-0 text-xs">
                  3
                </span>
                <span>You&apos;ll be added to our WhatsApp community group.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-100 text-orange-600 mr-2 flex-shrink-0 text-xs">
                  4
                </span>
                <span>You can start connecting with other members and exploring opportunities!</span>
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
              <Link href="/directory">
                Browse Member Directory <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

