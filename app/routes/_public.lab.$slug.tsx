import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Clock,
  Beaker,
  Lightbulb,
  Target,
  Zap,
  BookOpen,
} from "lucide-react"
import { Link, useParams } from "@remix-run/react"
import { getCategoryColor, getStatusColor } from "~/lib/utils"
import { labProjects } from "~/constants"
import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Detail Labs - Portfolio" },
    {
      name: "description",
      content:
        "Dive deep into Aldi Nugraha’s innovative lab projects—explore the thought process, technical challenges, and learnings behind each experimental build shaping the future of web development.",
    },
  ]
}

export default function LabProjectDetailPage() {
  const { slug } = useParams()

  const project = labProjects.find((p) => p.slug === slug)

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
          <Link to="/labs">Back to Labs</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Back Button */}
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="text-slate-600 dark:text-slate-300 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
        >
          <Link to="/labs">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Labs
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            <Badge variant="secondary" className={getCategoryColor(project.category)}>
              {project.category}
            </Badge>
            <Badge variant="secondary" className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          <h1 className="text-4xl font-light text-slate-800 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>

        {/* Demo Image/Preview */}
        <div className="aspect-video bg-gradient-to-br from-soft-blue-50 to-soft-blue-100 dark:from-soft-blue-900/20 dark:to-soft-blue-900/40 rounded-lg mb-8 flex items-center justify-center">
          <div className="text-center">
            <Beaker className="w-16 h-16 text-soft-blue-400 dark:text-soft-blue-500 mx-auto mb-4" />
            <span className="text-soft-blue-500 dark:text-soft-blue-400 text-lg">
              Interactive Demo
            </span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <Button
            asChild
            className="bg-soft-blue-600 hover:bg-soft-blue-700 dark:bg-soft-blue-600 dark:hover:bg-soft-blue-500 text-white rounded-full"
          >
            <Link to={project.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Try Demo
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 rounded-full"
          >
            <Link to={project.githubUrl || "#"} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View Code
            </Link>
          </Button>
          {project.blogPostUrl && (
            <Button
              variant="outline"
              asChild
              className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 rounded-full"
            >
              <Link to={project.blogPostUrl} target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-4 h-4 mr-2" />
                Read Article
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
                About This Experiment
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {project.longDescription?.split("\n\n").map((paragraph, index) => (
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
                  <Calendar className="w-4 h-4 text-soft-blue-400 dark:text-soft-blue-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Started: {new Date(project.dateCreated).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-soft-blue-400 dark:text-soft-blue-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Updated: {new Date(project.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-300">
                    Difficulty: {project.difficulty}
                  </span>
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
                    className="bg-soft-blue-50 dark:bg-soft-blue-900/30 text-soft-blue-700 dark:text-soft-blue-400 border-0"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-800 dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-soft-blue-600 dark:text-soft-blue-400 bg-soft-blue-50 dark:bg-soft-blue-900/30 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Objectives */}
      <section className="mb-12">
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Target className="w-5 h-5 text-soft-blue-600 dark:text-soft-blue-400 mr-2" />
              <h2 className="text-2xl font-light text-slate-800 dark:text-white">Objectives</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.objectives?.map((objective, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-soft-blue-400 dark:bg-soft-blue-500 rounded-full mt-2"></div>
                  <span className="text-slate-600 dark:text-slate-300">{objective}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Challenges & Learnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Zap className="w-5 h-5 text-orange-500 mr-2" />
              <h3 className="text-xl font-medium text-slate-800 dark:text-white">Challenges</h3>
            </div>
            <div className="space-y-3">
              {project.challenges?.map((challenge, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span className="text-slate-600 dark:text-slate-300 text-sm">{challenge}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Lightbulb className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-xl font-medium text-slate-800 dark:text-white">Key Learnings</h3>
            </div>
            <div className="space-y-3">
              {project.learnings?.map((learning, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span className="text-slate-600 dark:text-slate-300 text-sm">{learning}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <section className="mb-12">
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="p-8">
            <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-6">Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.nextSteps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-soft-blue-400 dark:bg-soft-blue-500 rounded-full mt-2"></div>
                  <span className="text-slate-600 dark:text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Interested in this experiment or have ideas to share?
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            asChild
            className="bg-soft-blue-600 hover:bg-soft-blue-700 dark:bg-soft-blue-600 dark:hover:bg-soft-blue-500 text-white rounded-full"
          >
            <Link to="/contact">Get In Touch</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 rounded-full"
          >
            <Link to="/labs">Explore More Labs</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
