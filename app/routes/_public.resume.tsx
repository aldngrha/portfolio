import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import {
  Download,
  Mail,
  MapPin,
  Globe,
  Calendar,
  GraduationCap,
  Award,
  Briefcase,
} from "lucide-react"
import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Resume - Portfolio" },
    {
      name: "description",
      content:
        "Aldi Nugraha's personal portfolio — software engineer passionate about cutting-edge tech and clean code.",
    },
  ]
}

export default function ResumePage() {
  return (
    <>
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-light text-slate-800 dark:text-white">Resume</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Frontend Developer & Software Engineer
          </p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 text-white rounded-full">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </section>

      {/* Personal Info */}
      <section className="mb-12">
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-sky-100 dark:bg-sky-900/50 flex-shrink-0 border-2 border-white dark:border-slate-800 shadow-sm">
                <img
                  src="/assets/images/image.webp?height=96&width=96"
                  alt="Aldi Nugraha"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-medium text-slate-800 dark:text-white mb-2">
                  Aldi Nugraha
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  Frontend developer passionate about creating thoughtful digital experiences with
                  clean code and user-centric design. Specialized in building modern, accessible web
                  applications.
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>aldi.nugraha@email.com</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>Jakarta, Indonesia</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>aldinugraha.dev</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h2 className="text-2xl font-light text-slate-800 dark:text-white">
            Professional Experience
          </h2>
        </div>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0 md:ml-4">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  {exp.description.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h2 className="text-2xl font-light text-slate-800 dark:text-white">Education</h2>
        </div>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {edu.institution} • {edu.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0 md:ml-4">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{edu.period}</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {edu.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-800 dark:text-white mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-0"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-800 dark:text-white mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-0"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h2 className="text-2xl font-light text-slate-800 dark:text-white">Certifications</h2>
        </div>
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-sky-500 dark:text-sky-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">{cert.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {cert.issuer} ({cert.year})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Languages */}
      <section className="mb-12">
        <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-6">Languages</h2>
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-medium text-slate-800 dark:text-white">Indonesian</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Native</p>
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-white">English</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Professional Proficiency
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-white">Mandarin</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Basic</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact */}
      <section className="text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-6">Interested in working together?</p>
        <Button
          asChild
          className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 text-white rounded-full"
        >
          <Link to="/contact">Get In Touch</Link>
        </Button>
      </section>
    </>
  )
}
