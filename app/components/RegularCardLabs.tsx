import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { RegularCardLabsProps } from "~/interface"

export default function RegularCardLabs({
  icon: Icon,
  title,
  category,
  status,
  description,
  technologies,
  slug,
  githubUrl,
  demoUrl,
  getCategoryColor,
  getStatusColor,
  viewMode = "grid",
}: RegularCardLabsProps) {
  return (
    <Card className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
      <CardContent className="p-6">
        <div className={`${viewMode === "list" ? "flex items-start space-x-6" : ""}`}>
          {/* Icon and Badges */}
          <div
            className={`${viewMode === "list" ? "flex-shrink-0" : "flex items-start justify-between mb-4"}`}
          >
            <div
              className={`w-8 h-8 bg-soft-blue-50 dark:bg-soft-blue-900/30 rounded-lg flex items-center justify-center text-soft-blue-600 dark:text-soft-blue-400 ${viewMode === "list" ? "mb-0" : "mb-3"}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            {viewMode === "grid" && (
              <div className="flex space-x-2">
                <Badge variant="secondary" className={getCategoryColor(category)}>
                  {category}
                </Badge>
                <Badge variant="secondary" className={getStatusColor(status)}>
                  {status.replace("-", " ")}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            {viewMode === "list" && (
              <div className="flex items-start justify-between mb-3">
                <div></div>
                <div className="flex space-x-2">
                  <Badge variant="secondary" className={getCategoryColor(category)}>
                    {category}
                  </Badge>
                  <Badge variant="secondary" className={getStatusColor(status)}>
                    {status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            )}

            <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2 group-hover:text-soft-blue-600 dark:group-hover:text-soft-blue-400 transition-colors">
              {title}
            </h3>

            <p
              className={`text-slate-600 dark:text-slate-300 mb-4 leading-relaxed ${
                viewMode === "list" ? "line-clamp-2" : "line-clamp-3"
              }`}
            >
              {description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mb-3">
              {technologies.slice(0, viewMode === "list" ? 4 : 3).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs text-slate-500 dark:text-slate-400 bg-soft-blue-50 dark:bg-soft-blue-900/30 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > (viewMode === "list" ? 4 : 3) && (
                <span className="text-xs text-slate-400 dark:text-slate-500 px-2 py-1">
                  +{technologies.length - (viewMode === "list" ? 4 : 3)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Link
                to={`/lab/${slug}`}
                className="text-soft-blue-600 dark:text-soft-blue-400 hover:text-soft-blue-700 dark:hover:text-soft-blue-300 font-medium transition-colors text-sm"
              >
                Explore →
              </Link>

              <div className="flex space-x-1">
                {githubUrl && (
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="p-1 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                  >
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3 h-3" />
                    </a>
                  </Button>
                )}
                {demoUrl && (
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="p-1 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                  >
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
