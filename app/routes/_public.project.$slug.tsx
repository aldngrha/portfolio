import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { ArrowLeft, Github, ExternalLink, Calendar, Users } from "lucide-react"
import { Link, useParams } from "@remix-run/react"
import { projects } from "~/constants"
import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Project Detail - Portfolio" },
    {
      name: "description",
      content:
        "Explore the technical details and creative solutions behind this project, crafted by Aldi Nugraha using modern technologies to solve real challenges.",
    },
  ]
}

export default function ProjectDetailPage() {
  const { slug } = useParams()

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-4">
          Project Not Found
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          The project you are looking for does not exist.
        </p>
        <Button variant="outline" asChild className="mt-6">
          <Link to="/projects">Back to Projects</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
        >
          <Link to="/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <Badge
            variant="secondary"
            className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-0 mb-4"
          >
            {project.category}
          </Badge>
          <h1 className="text-4xl font-light text-slate-800 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>

        {project.image ? (
          <div className="aspect-video rounded-lg mb-8">
            <img src={project.image} alt={project.title} className="aspect-video rounded-lg " />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-900/40 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-sky-400 dark:text-sky-500">Project Screenshot</span>
          </div>
        )}

        <div className="flex justify-center space-x-4 mb-8">
          {project.link && (
            <Button
              asChild
              className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 text-white rounded-full"
            >
              <Link to={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Production
              </Link>
            </Button>
          )}
          {project.github && (
            <Button
              variant="outline"
              asChild
              className="border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-full"
            >
              <Link to={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-6">
                Project Overview
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {project.longDescription.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-800 dark:text-white mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-sky-400 dark:text-sky-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Duration: {project.duration}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-sky-400 dark:text-sky-500" />
                  <span className="text-slate-600 dark:text-slate-300">Team: {project.team}</span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-300">Role: {project.role}</span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-300">
                    Contribution: {project.contribution_as}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-300">Year: {project.year}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-800 dark:text-white mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-0"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features */}
      <section className="mb-12">
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="p-8">
            <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-6">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-sky-400 dark:bg-sky-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Next Project */}
      <section className="text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-6">Want to see more work?</p>
        <Button
          variant="outline"
          asChild
          className="border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-full"
        >
          <Link to="/projects">View All Projects</Link>
        </Button>
      </section>
    </>
  )
}
