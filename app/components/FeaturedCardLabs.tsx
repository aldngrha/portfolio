import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { ArrowRight, Calendar, Clock, ExternalLink, Github } from "lucide-react"
import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { FeaturedCardLabsProps } from "~/interface"

export default function FeaturedCardLabs({
  icon: Icon,
  title,
  category,
  status,
  description,
  technologies,
  // stats,
  dateCreated,
  lastUpdated,
  slug,
  githubUrl,
  demoUrl,
  getCategoryColor,
  getStatusColor,
  landingPage,
}: FeaturedCardLabsProps) {
  if (landingPage) {
    return (
      <Card className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-soft-blue-50 dark:bg-soft-blue-900/30 rounded-lg flex items-center justify-center text-soft-blue-600 dark:text-soft-blue-400">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <Badge
                  variant="secondary"
                  className="bg-soft-blue-50 dark:bg-soft-blue-900/30 text-soft-blue-700 dark:text-soft-blue-400 border-0 mb-2"
                >
                  Experiment
                </Badge>
                <h3 className="text-lg font-medium text-slate-800 dark:text-white group-hover:text-soft-blue-600 dark:group-hover:text-soft-blue-400 transition-colors">
                  {title}
                </h3>
              </div>
            </div>
            <Badge variant="secondary" className={getStatusColor(status)}>
              {status.replace("-", " ")}
            </Badge>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="text-xs text-slate-500 dark:text-slate-400 bg-soft-blue-50 dark:bg-soft-blue-900/30 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="text-xs text-slate-400 dark:text-slate-500 px-2 py-1">
                +{technologies.length - 4} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link
              to={`/lab/${slug}`}
              className="text-soft-blue-600 dark:text-soft-blue-400 hover:text-soft-blue-700 dark:hover:text-soft-blue-300 font-medium transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-1 inline" />
            </Link>
            <div className="flex space-x-2">
              {githubUrl && (
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {demoUrl && (
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
                >
                  <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-soft-blue-50 dark:bg-soft-blue-900/30 rounded-lg flex items-center justify-center text-soft-blue-600 dark:text-soft-blue-400">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-slate-800 dark:text-white group-hover:text-soft-blue-600 dark:group-hover:text-soft-blue-400 transition-colors">
                {title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className={getCategoryColor(category)}>
                  {category}
                </Badge>
                <Badge variant="secondary" className={getStatusColor(status)}>
                  {status.replace("-", " ")}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="text-xs text-slate-500 dark:text-slate-400 bg-soft-blue-50 dark:bg-soft-blue-900/30 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="text-xs text-slate-400 dark:text-slate-500 px-2 py-1">
              +{technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Stats */}
        {/*{stats && (*/}
        {/*  <div className="flex items-center space-x-4 mb-4 text-sm text-slate-500 dark:text-slate-400">*/}
        {/*    <div className="flex items-center space-x-1">*/}
        {/*      <Eye className="w-4 h-4" />*/}
        {/*      <span>{stats.views}</span>*/}
        {/*    </div>*/}
        {/*    <div className="flex items-center space-x-1">*/}
        {/*      <Star className="w-4 h-4" />*/}
        {/*      <span>{stats.stars}</span>*/}
        {/*    </div>*/}
        {/*    <div className="flex items-center space-x-1">*/}
        {/*      <span>⑂</span>*/}
        {/*      <span>{stats.forks}</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(dateCreated).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Updated {new Date(lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            to={`/lab/${slug}`}
            className="text-soft-blue-600 dark:text-soft-blue-400 hover:text-soft-blue-700 dark:hover:text-soft-blue-300 font-medium transition-colors"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-1 inline" />
          </Link>
          <div className="flex space-x-2">
            {githubUrl && (
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
            {demoUrl && (
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-soft-blue-600 dark:hover:text-soft-blue-400"
              >
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
