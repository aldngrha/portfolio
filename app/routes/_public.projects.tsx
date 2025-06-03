import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { Github, ExternalLink, Search } from "lucide-react"
import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"
import { projects } from "~/constants"
import { useEffect, useState } from "react"
import Pagination from "~/components/Pagination"

export const meta: MetaFunction = () => {
  return [
    { title: "Projects - Portfolio" },
    {
      name: "description",
      content:
        "Discover a curated collection of projects by Aldi Nugraha, demonstrating skills in modern technologies and a commitment to quality software.",
    },
  ]
}

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const itemsPerPage = 4

  // Filter projects based on search term
  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProjects(filtered)
    setCurrentPage(1) // Reset to first page when search changes
  }, [searchTerm])

  // Get current projects for the page
  const indexOfLastProject = currentPage * itemsPerPage
  const indexOfFirstProject = indexOfLastProject - itemsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top of projects section
    document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section className="text-center mb-16">
        <h1 className="text-4xl font-light text-slate-800 dark:text-white mb-4">My Work</h1>
        <div className="w-16 h-px bg-sky-200 dark:bg-sky-800 mx-auto mb-8"></div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          A collection of projects showcasing my approach to solving problems through thoughtful
          design and clean code.
        </p>
      </section>

      {/* Search */}
      <section className="mb-12">
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 dark:text-sky-500 w-4 h-4" />
          <Input
            placeholder="Search projects..."
            className="pl-10 border-sky-200 dark:border-sky-800 focus:border-sky-400 dark:focus:border-sky-500 rounded-full bg-white dark:bg-slate-900 dark:text-white"
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects-section" className="mb-16">
        {filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 dark:border dark:border-slate-800"
                >
                  <div className="aspect-video bg-gradient-to-br from-soft-blue-50 to-soft-blue-100 dark:from-soft-blue-900/20 dark:to-soft-blue-900/40 rounded-t-lg flex items-center justify-center">
                    <span className="text-soft-blue-400 dark:text-soft-blue-500 text-sm">
                      Project Preview
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-soft-blue-50 dark:bg-soft-blue-900/30 text-soft-blue-700 dark:text-soft-blue-400 border-0"
                      >
                        {project.category}
                      </Badge>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs text-slate-500 dark:text-slate-400 bg-soft-blue-50 dark:bg-soft-blue-900/30 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/project/${project.id}`}
                        className="text-soft-blue-600 dark:text-soft-blue-400 hover:text-soft-blue-700 dark:hover:text-soft-blue-300 font-medium transition-colors"
                      >
                        View Details →
                      </Link>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                totalItems={filteredProjects.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                showItemCount={true}
                className="justify-center"
              />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              No projects found matching your search criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30"
            >
              Clear Search
            </Button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-6">Interested in working together?</p>
        <Button
          asChild
          className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 text-white rounded-full"
        >
          <Link to="/contact">Start a Conversation</Link>
        </Button>
      </section>
    </>
  )
}
