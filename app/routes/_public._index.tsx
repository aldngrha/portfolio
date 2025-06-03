import type { MetaFunction } from "@remix-run/node"
import { Button } from "~/components/ui/button"
import { Link } from "@remix-run/react"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "~/components/ui/card"
import { projects } from "~/constants"
import { Badge } from "~/components/ui/badge"

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Aldi Nugraha" },
    {
      name: "description",
      content:
        "Aldi Nugraha's personal portfolio — software engineer passionate about cutting-edge tech and clean code.",
    },
  ]
}

export default function _public_index() {
  const projectsFilter = projects.filter((_, idx) => idx === 0 || idx === 1)

  return (
    <>
      {/* Hero Section */}
      <section className="text-center mb-24">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-soft-blue-100 dark:bg-soft-blue-900/50 border-4 border-white dark:border-slate-800 shadow-md">
            <img
              src="/assets/images/image.webp?height1006&width=100"
              alt="Aldi Nugraha"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-light text-slate-800 dark:text-white mb-4">
            <span className="font-medium">Aldi Nugraha</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 font-light mb-8">
            Software Engineer
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Engineering meaningful digital experiences through clean architecture and human-focused
            code
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            asChild
            className="bg-soft-blue-500 hover:bg-soft-blue-600 dark:bg-soft-blue-500 dark:hover:bg-soft-blue-400 text-white px-6 py-2 rounded-full"
          >
            <Link to="/projects">
              View Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:border-soft-blue-300 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 px-6 py-2 rounded-full"
          >
            <Link to="/about">About Me</Link>
          </Button>
        </div>
      </section>

      {/* Featured Work */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-800 dark:text-white mb-4">Featured Work</h2>
          <div className="w-16 h-px bg-soft-blue-200 dark:bg-soft-blue-800 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsFilter.map((project) => (
            <Card
              key={project.id}
              className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <div className="aspect-video bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-900/40 rounded-t-lg flex items-center justify-center">
                <span className="text-sky-400 dark:text-sky-500 text-sm">Project Preview</span>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="secondary"
                    className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-0"
                  >
                    {project.category}
                  </Badge>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{project.year}</span>
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
                      className="text-xs text-slate-500 dark:text-slate-400 bg-sky-50 dark:bg-sky-900/30 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to={`/project/${project.slug}`}
                    className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors"
                  >
                    View Details →
                  </Link>
                  <div className="flex space-x-2">
                    {project.github && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
                        asChild
                      >
                        <Link to={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                    {project.link && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
                        asChild
                      >
                        <Link to={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            variant="outline"
            asChild
            className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:border-soft-blue-300 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 px-8 py-2 rounded-full"
          >
            <Link to="/projects">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Recent Thoughts */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-800 dark:text-white mb-4">
            Recent Thoughts
          </h2>
          <div className="w-16 h-px bg-soft-blue-200 dark:bg-soft-blue-800 mx-auto"></div>
        </div>

        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h1 className="text-xl font-medium">🚧 Still under construction.</h1>
            <p className="font-light">
              First post dropping soon. Get ready for some fire content 🔥
            </p>
          </div>
          {/*<article className="group">*/}
          {/*  <Link to="/posts/1" className="block">*/}
          {/*    <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-2 group-hover:text-soft-blue-600 dark:group-hover:text-soft-blue-400 transition-colors">*/}
          {/*      Building Accessible React Components*/}
          {/*    </h3>*/}
          {/*    <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">*/}
          {/*      Exploring best practices for creating inclusive user interfaces that work for*/}
          {/*      everyone.*/}
          {/*    </p>*/}
          {/*    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">*/}
          {/*      <span>5 min read</span>*/}
          {/*      <span className="mx-2">•</span>*/}
          {/*      <span>Jan 15, 2024</span>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*</article>*/}

          {/*<article className="group">*/}
          {/*  <Link to="/posts/2" className="block">*/}
          {/*    <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-2 group-hover:text-soft-blue-600 dark:group-hover:text-soft-blue-400 transition-colors">*/}
          {/*      The Art of Minimal Design*/}
          {/*    </h3>*/}
          {/*    <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">*/}
          {/*      How constraints and simplicity can lead to more effective user experiences.*/}
          {/*    </p>*/}
          {/*    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">*/}
          {/*      <span>3 min read</span>*/}
          {/*      <span className="mx-2">•</span>*/}
          {/*      <span>Jan 8, 2024</span>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*</article>*/}

          {/*<article className="group">*/}
          {/*  <Link to="/posts/3" className="block">*/}
          {/*    <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-2 group-hover:text-soft-blue-600 dark:group-hover:text-soft-blue-400 transition-colors">*/}
          {/*      Modern CSS Layout Techniques*/}
          {/*    </h3>*/}
          {/*    <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">*/}
          {/*      A deep dive into CSS Grid and Flexbox for creating responsive layouts.*/}
          {/*    </p>*/}
          {/*    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">*/}
          {/*      <span>8 min read</span>*/}
          {/*      <span className="mx-2">•</span>*/}
          {/*      <span>Dec 28, 2023</span>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*</article>*/}
        </div>

        {/*<div className="text-center mt-12">*/}
        {/*  <Button*/}
        {/*    variant="outline"*/}
        {/*    asChild*/}
        {/*    className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:border-soft-blue-300 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 px-8 py-2 rounded-full"*/}
        {/*  >*/}
        {/*    <Link to="/posts">*/}
        {/*      Read More*/}
        {/*      <ArrowRight className="w-4 h-4 ml-2" />*/}
        {/*    </Link>*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </section>

      {/* Contact CTA */}
      <section className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-light text-slate-800 dark:text-white mb-4">
            Let&#39;s Work Together
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            I&#39;m always interested in new opportunities and collaborations. Let&#39;s create
            something meaningful together.
          </p>
          <Button
            asChild
            className="bg-soft-blue-500 hover:bg-soft-blue-600 dark:bg-soft-blue-500 dark:hover:bg-soft-blue-400 text-white px-8 py-3 rounded-full"
          >
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
