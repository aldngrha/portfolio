"use client"

import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { AlertTriangle, ArrowLeft, Bell, Clock, Home, Mail, Wrench, HardHat } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "@remix-run/react"

interface UnderConstructionProps {
  title?: string
  description?: string
  showNotify?: boolean
  showHomeLink?: boolean
  showBackLink?: boolean
  estimatedDate?: string
  className?: string
  children?: ReactNode
  isFullPage?: boolean
}

export default function UnderConstruction({
  title = "Under Construction",
  description = "This section is currently being built. Please check back soon for updates.",
  showNotify = false,
  showHomeLink = true,
  showBackLink = true,
  estimatedDate,
  className = "",
  children,
  isFullPage = false,
}: UnderConstructionProps) {
  const content = (
    <div className={`text-center ${className}`}>
      {/* Construction Animation */}
      <div className="relative mb-16 mx-auto">
        <div className="w-24 h-24 mx-auto bg-soft-blue-100 dark:bg-soft-blue-900/50 rounded-full flex items-center justify-center">
          <HardHat className="w-12 h-12 text-soft-blue-500 dark:text-soft-blue-400" />
        </div>

        {/* Animated Elements */}
        <div className="absolute left-[9.5rem] -bottom-8 md:left-[23.5rem] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <Wrench className="w-6 h-6 text-soft-blue-400 dark:text-soft-blue-500 animate-bounce" />
          </div>
        </div>
        <div className="absolute right-[37%] -bottom-4 md:right-[23rem] transform translate-x-1/4 translate-y-1/4">
          <div className="w-8 h-8 bg-soft-blue-100 dark:bg-soft-blue-900/50 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-soft-blue-500 dark:text-soft-blue-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      <h2 className="text-3xl font-light text-slate-800 dark:text-white mb-4">{title}</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">{description}</p>

      {estimatedDate && (
        <div className="flex items-center justify-center text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Clock className="w-4 h-4 mr-2" />
          <span>Estimated completion: {estimatedDate}</span>
        </div>
      )}

      {/* Custom Content */}
      {children}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {showHomeLink && (
          <Button
            asChild
            variant="outline"
            className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 rounded-full"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        )}

        {showBackLink && (
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        )}
      </div>

      {/* Notification Form */}
      {showNotify && (
        <Card className="max-w-md mx-auto mt-12 border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-soft-blue-500 dark:text-soft-blue-400 mr-2" />
              <h3 className="text-lg font-medium text-slate-800 dark:text-white">Get Notified</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Leave your email to be notified when this section is ready.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1 border-soft-blue-200 dark:border-soft-blue-800 focus:border-soft-blue-400 dark:focus:border-soft-blue-500 bg-white dark:bg-slate-900 dark:text-white"
              />
              <Button className="bg-soft-blue-500 hover:bg-soft-blue-600 dark:bg-soft-blue-500 dark:hover:bg-soft-blue-400 text-white">
                <Mail className="w-4 h-4 mr-2" />
                Notify Me
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )

  if (isFullPage) {
    return (
      <div className="min-h-screen bg-soft-blue-50/30 dark:bg-slate-950 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">{content}</div>
      </div>
    )
  }

  return content
}
