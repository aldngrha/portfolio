"use client"

import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Search, Beaker, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { labProjects } from "~/constants"
import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"
import FeaturedCardLabs from "~/components/FeaturedCardLabs"
import RegularCardLabs from "~/components/RegularCardLabs"
import { getCategoryColor, getStatusColor } from "~/lib/utils"
import FilterControls from "~/components/FilterControls"
import FilterDropdown from "~/components/FilterDropdown"
// import UnderConstruction from "~/components/UnderConstruction"

export const meta: MetaFunction = () => {
  return [
    { title: "Labs - Portfolio" },
    {
      name: "description",
      content:
        "Discover Aldi Nugraha’s experimental projects, prototypes, and research—exploring ideas, pushing boundaries, and building the future of web technology.",
    },
  ]
}

export default function LabsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredProjects, setFilteredProjects] = useState(labProjects)
  const [showFilters, setShowFilters] = useState(false)

  // Filter projects based on search and filters
  useEffect(() => {
    const filtered = labProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || project.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })

    setFilteredProjects(filtered)
  }, [searchTerm, selectedCategory, selectedStatus])

  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const regularProjects = filteredProjects.filter((project) => !project.featured)

  // return (
  //   <div className="h-[57.5vh]">
  //     <UnderConstruction
  //       title="Coming Soon"
  //       description="We're working hard to bring you an amazing new feature. Stay tuned for updates!"
  //       estimatedDate="July 2025"
  //       className="absolute top-1/2 -translate-y-1/2 md:left-1/4 md:right-1/4"
  //       showNotify={false}
  //     />
  //   </div>
  // )

  return (
    <>
      <section className="text-center mb-16">
        <h1 className="text-4xl font-light text-slate-800 dark:text-white mb-4">Labs</h1>
        <div className="w-16 h-px bg-soft-blue-200 dark:bg-soft-blue-800 mx-auto mb-8"></div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          A collection of experimental projects, prototypes, and research explorations. This is
          where I test new ideas, push boundaries, and explore the cutting edge of web development.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="mb-12">
        <div className="space-y-6">
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soft-blue-400 dark:text-soft-blue-500 w-4 h-4" />
            <Input
              placeholder="Search experiments..."
              className="pl-10 border-soft-blue-200 dark:border-soft-blue-800 focus:border-soft-blue-400 dark:focus:border-soft-blue-500 rounded-full bg-white dark:bg-slate-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Controls */}
          <FilterControls
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Filters */}
          {showFilters && (
            <FilterDropdown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          )}
        </div>
      </section>

      {filteredProjects.length > 0 ? (
        <>
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <Star className="w-5 h-5 text-soft-blue-500 dark:text-soft-blue-400 mr-2" />
                <h2 className="text-2xl font-light text-slate-800 dark:text-white">
                  Featured Experiments
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredProjects.map((project) => (
                  <FeaturedCardLabs
                    getCategoryColor={getCategoryColor}
                    getStatusColor={getStatusColor}
                    key={project.id}
                    icon={project.icon}
                    title={project.title}
                    category={project.category}
                    status={project.status}
                    description={project.description}
                    technologies={project.technologies}
                    dateCreated={project.dateCreated}
                    lastUpdated={project.lastUpdated}
                    slug={project.slug}
                  />
                ))}
              </div>
            </section>
          )}

          {/* All Projects */}
          {regularProjects.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-8 text-center">
                {featuredProjects.length > 0 ? "More Experiments" : "All Experiments"}
              </h2>

              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {regularProjects.map((project) => (
                  <RegularCardLabs
                    key={project.id}
                    viewMode={viewMode}
                    icon={project.icon}
                    category={project.category}
                    status={project.status}
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    slug={project.slug}
                    getCategoryColor={getCategoryColor}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-soft-blue-100 dark:bg-soft-blue-900/30 rounded-full flex items-center justify-center">
            <Beaker className="w-8 h-8 text-soft-blue-400" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            No experiments found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setSelectedStatus("all")
            }}
            className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* CTA */}
      <section className="text-center">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-soft-blue-50 to-soft-blue-100 dark:from-soft-blue-900/20 dark:to-soft-blue-900/40 dark:border dark:border-slate-800">
          <CardContent className="p-8">
            <Beaker className="w-12 h-12 text-soft-blue-600 dark:text-soft-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-4">
              Have an Experimental Idea?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
              I&#39;m always experimenting with new technologies and concepts. If you have an
              interesting idea or want to collaborate on something experimental, let&#39;s talk!
            </p>
            <Button
              asChild
              className="bg-soft-blue-600 hover:bg-soft-blue-700 dark:bg-soft-blue-600 dark:hover:bg-soft-blue-500 text-white rounded-full"
            >
              <Link to="/contact">Start a Conversation</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
