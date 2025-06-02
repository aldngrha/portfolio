import { Link, useLocation } from "@remix-run/react"
import { useState } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"

import { Button } from "../ui/button"
import { useTheme } from "./ThemeProvider"

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const pathname = location.pathname
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Work" },
    { href: "/posts", label: "Writing" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-soft-blue-100 dark:border-soft-blue-900/40 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-soft-blue-500 dark:bg-soft-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            {/*<span className="font-medium text-slate-800 dark:text-white">Aldi Nugraha</span>*/}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors ${
                  isActive(item.href)
                    ? "text-soft-blue-600 dark:text-soft-blue-400 font-medium"
                    : "text-slate-600 dark:text-slate-300 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-600 dark:text-slate-300 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-600 dark:text-slate-300 relative"
            >
              <Menu
                className={`absolute top-1/4 left-1/4 w-5 h-5 transition-opacity duration-300 ease-in-out ${
                  mobileMenuOpen ? "opacity-0 scale-75" : "opacity-100 scale-100"
                }`}
              />
              <X
                className={`absolute top-1/4 left-1/4 w-5 h-5 transition-opacity duration-300 ease-in-out ${
                  mobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`transition-colors ${
                    isActive(item.href)
                      ? "text-soft-blue-600 dark:text-soft-blue-400 font-medium"
                      : "text-slate-600 dark:text-slate-300 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
