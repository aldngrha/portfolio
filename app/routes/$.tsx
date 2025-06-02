"use client"

import { Button } from "~/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Not Found - Portfolio" },
    {
      name: "description",
      content:
        "Aldi Nugraha's personal portfolio — software engineer passionate about cutting-edge tech and clean code.",
    },
  ]
}

export default function NotFound() {
  return (
    <div className="text-center h-screen flex flex-col justify-center items-center">
      {/* 404 Illustration */}
      <div className="mb-12">
        <div className="relative">
          {/* Large 404 Text */}
          <div className="text-[12rem] md:text-[16rem] font-light text-soft-blue-100 dark:text-soft-blue-900/30 leading-none select-none">
            404
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 opacity-60">
              <div className="w-3 h-3 bg-soft-blue-300 dark:bg-soft-blue-700 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-soft-blue-400 dark:bg-soft-blue-600 rounded-full animate-pulse delay-100"></div>
              <div className="w-4 h-4 bg-soft-blue-200 dark:bg-soft-blue-800 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-soft-blue-500 dark:bg-soft-blue-500 rounded-full animate-pulse delay-300"></div>
              <div className="w-3 h-3 bg-soft-blue-300 dark:bg-soft-blue-700 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-soft-blue-400 dark:bg-soft-blue-600 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-slate-800 dark:text-white mb-4">
          Page Not Found
        </h1>
        <div className="w-16 h-px bg-soft-blue-200 dark:bg-soft-blue-800 mx-auto mb-6"></div>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 max-w-2xl mx-auto leading-relaxed">
          Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
        </p>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Don&lsquo;t worry though – let&apos;s get you back on track with some helpful links below.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            asChild
            className="bg-soft-blue-500 hover:bg-soft-blue-600 dark:bg-soft-blue-500 dark:hover:bg-soft-blue-400 text-white rounded-full px-8"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 rounded-full px-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>

      {/* Quick Links */}

      {/* Fun Fact */}
      <div className="mt-12 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Fun fact: HTTP 404 errors were named after room 404 at CERN, where the original web
          servers were located.
        </p>
      </div>
    </div>
  )
}
