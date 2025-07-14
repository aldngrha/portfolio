import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import {
  Mail,
  Download,
  ArrowRight,
  Code,
  Heart,
  Lightbulb,
  Users,
  Gamepad,
  Activity,
  BookOpen, Database,
} from "lucide-react"
import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"
import { experience, techCategories, techSkills } from "~/constants"
import TechCategoryCard from "~/components/TechCard"

export const meta: MetaFunction = () => {
  return [
    { title: "About - Portfolio" },
    {
      name: "description",
      content:
        "Discover the story behind Aldi Nugraha, a software engineer driven by curiosity, creativity, and a mission to transform ideas into impactful technology.",
    },
  ]
}

export default function AboutPage() {
  const values = [
    {
      icon: <Users className="w-6 h-6 text-soft-blue-600 dark:text-soft-blue-400" />,
      title: "User-Centric Design",
      description:
        "I believe every interface should serve the user first, creating intuitive and delightful experiences.",
    },
    {
      icon: <Code className="w-6 h-6 text-soft-blue-600 dark:text-soft-blue-400" />,
      title: "Clean Code",
      description:
        "I'm passionate about writing maintainable, scalable code that other developers can easily understand.",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-soft-blue-600 dark:text-soft-blue-400" />,
      title: "Continuous Learning",
      description:
        "I stay curious and embrace new technologies to solve problems more effectively.",
    },
  ]

  const interests = [
    {
      icon: <Gamepad className="w-5 h-5 text-soft-blue-600 dark:text-soft-blue-400" />,
      title: "Gaming",
      description:
        "Whether it's story-driven adventures or fast-paced tactical games, I game to recharge and stay sharp under pressure.",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-soft-blue-600 dark:text-soft-blue-400" />,
      title: "Reading",
      description:
        "From tech blogs to sci-fi novels, reading fuels my curiosity and expands how I think about the world (and code).",
    },
    {
      icon: <Activity className="w-5 h-5 text-soft-blue-600 dark:text-soft-blue-400" />,
      title: "Staying Active",
      description:
        "Whether it’s running or light workouts, moving keeps my mind fresh and helps me stay balanced beyond the screen.",
    },
  ]
  return (
    <>
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 rounded-full overflow-hidden bg-soft-blue-100 dark:bg-soft-blue-900/50 flex-shrink-0 border-4 border-white dark:border-slate-800 shadow-md">
            <img
              src="/assets/images/image.webp"
              alt="Aldi Nugraha"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-light text-slate-800 dark:text-white mb-4">
              Hello, I&#39;m{" "}
              <span className="font-medium text-soft-blue-600 dark:text-soft-blue-400">
                Aldi Nugraha
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
              Frontend Developer & Software Engineer
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              I&#39;m passionate about crafting thoughtful digital experiences that make technology
              feel human. With a keen eye for detail and a love for clean code, I transform ideas
              into interfaces that users genuinely enjoy.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-soft-blue-500 hover:bg-soft-blue-600 dark:bg-soft-blue-500 dark:hover:bg-soft-blue-400 text-white rounded-full"
              >
                <Link to="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Get in Touch
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 rounded-full"
              >
                <Link to="/resume">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-12 text-center">Tech Stack</h2>
        <div className="space-y-10">
          {techCategories.map((category) => (
            <TechCategoryCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              items={category.items}
              color={category.color}
            />
          ))}
        </div>
      </section>

      {/* Values & Principles */}
      <section className="mb-20">
        <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-8 text-center">
          Values & Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-soft-blue-50 dark:bg-soft-blue-900/30 flex items-center justify-center">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Resume Section */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light text-slate-800 dark:text-white">
            Professional Experience
          </h2>
          <Button
            variant="outline"
            asChild
            className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30 rounded-full"
          >
            <Link to="/resume">
              <ArrowRight className="w-4 h-4 ml-2" />
              Full Resume
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {experience.map((exp, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">{exp.company}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-soft-blue-50 w-fit dark:bg-soft-blue-900/30 text-soft-blue-700 dark:text-soft-blue-400 border-0 mt-2 md:mt-0"
                  >
                    {exp.period}
                  </Badge>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Personal Interests */}
      <section className="mb-20">
        <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-8 text-center">
          Beyond Code
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {interests.map((interest, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-soft-blue-50 dark:bg-soft-blue-900/30 flex items-center justify-center">
                      {interest.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-white mb-2">
                      {interest.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Connect & Collaborate */}
      <section className="text-center">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-soft-blue-50 to-soft-blue-100 dark:from-soft-blue-900/20 dark:to-soft-blue-900/40 dark:border dark:border-slate-800">
          <CardContent className="p-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-soft-blue-100 dark:bg-soft-blue-900/50 flex items-center justify-center">
                <Heart className="w-8 h-8 text-soft-blue-600 dark:text-soft-blue-400" />
              </div>
            </div>
            <h2 className="text-3xl font-light text-slate-800 dark:text-white mb-4">
              Let&#39;s Create Something Amazing
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              I&#39;m always excited to collaborate on projects that make a difference. Whether you
              have an idea to explore or just want to chat about frontend development, I&#39;d love
              to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-soft-blue-500 hover:bg-soft-blue-600 dark:bg-soft-blue-500 dark:hover:bg-soft-blue-400 text-white px-8 py-3 rounded-full font-medium"
                asChild
              >
                <Link to="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
