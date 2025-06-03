import { Link, useLocation } from "@remix-run/react"
import { useState } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"

import { Button } from "./ui/button"
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
            <div className="text-slate-900 dark:text-white w-8 h-8">
              <svg
                width="53"
                height="53"
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <rect
                  x="14.1106"
                  y="12.1107"
                  width="3.27452"
                  height="26.4791"
                  rx="1.63726"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <rect
                  x="23.5"
                  y="29.5"
                  width="3"
                  height="9"
                  rx="1.5"
                  transform="rotate(90 23.5 29.5)"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <rect
                  x="34.8727"
                  y="12.1107"
                  width="3.27452"
                  height="26.4791"
                  rx="1.63726"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <rect
                  x="13.7058"
                  y="13.8778"
                  width="3.27452"
                  height="34.0956"
                  rx="1.63726"
                  transform="rotate(-41.5521 13.7058 13.8778)"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <circle cx="26.5" cy="26.5" r="24.5" stroke="currentColor" strokeWidth="4" />
              </svg>
            </div>

            <span className="font-medium text-slate-800 dark:text-white">Aldi Nugraha</span>
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
