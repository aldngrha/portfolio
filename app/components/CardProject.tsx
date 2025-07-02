import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { CardProjectProps } from "~/interface"
import { truncate } from "~/lib/utils"

export default function CardProject({
  id,
  category,
  year,
  title,
  description,
  technologies,
  github,
  link,
  image,
  slug,
  landingPage,
}: CardProjectProps) {
  if (landingPage) {
    return (
      <Card className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
        {image ? (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-soft-blue-50 to-soft-blue-100 dark:from-soft-blue-900/20 dark:to-soft-blue-900/40 rounded-t-lg flex items-center justify-center">
            <span className="text-soft-blue-400 dark:text-soft-blue-500 text-sm">
              Project Preview
            </span>
          </div>
        )}
        <CardContent className="p-6">
          <h3 className="text-xl font-medium text-slate-800 dark:text-white group-hover:text-soft-blue-600 dark:group-hover:text-soft-blue-400 transition-colors mb-2">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
            {truncate(description, 100, " ...")}
          </p>
          <div className="flex items-center justify-between">
            <Link
              to={`/project/${slug}`}
              className="text-soft-blue-600 dark:text-soft-blue-400 hover:text-soft-blue-700 dark:hover:text-soft-blue-300 font-medium transition-colors"
            >
              View Details →
            </Link>
            <div className="flex space-x-2">
              {github && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                  asChild
                >
                  <Link to={github || "#"} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {link && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                  asChild
                >
                  <Link to={link || "#"} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      key={id}
      className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 dark:border dark:border-slate-800"
    >
      {image ? (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-soft-blue-50 to-soft-blue-100 dark:from-soft-blue-900/20 dark:to-soft-blue-900/40 rounded-t-lg flex items-center justify-center">
          <span className="text-soft-blue-400 dark:text-soft-blue-500 text-sm">
            Project Preview
          </span>
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-soft-blue-50 dark:bg-soft-blue-900/30 text-soft-blue-700 dark:text-soft-blue-400 border-0"
          >
            {category}
          </Badge>
          <span className="text-sm text-slate-500 dark:text-slate-400">{year}</span>
        </div>

        <h3 className="text-xl font-medium text-slate-800 dark:text-white group-hover:text-soft-blue-600 dark:group-hover:text-soft-blue-400 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
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
            to={`/project/${slug}`}
            className="text-soft-blue-600 dark:text-soft-blue-400 hover:text-soft-blue-700 dark:hover:text-soft-blue-300 font-medium transition-colors"
          >
            View Details →
          </Link>
          <div className="flex space-x-2">
            {github && (
              <Button
                size="sm"
                variant="ghost"
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                asChild
              >
                <Link to={github || "#"} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </Link>
              </Button>
            )}
            {link && (
              <Button
                size="sm"
                variant="ghost"
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                asChild
              >
                <Link to={link || "#"} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
