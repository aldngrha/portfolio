import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Label } from "~/components/ui/label"
import { Mail, MapPin, Clock, Send } from "lucide-react"
import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Portfolio" },
    {
      name: "description",
      content:
        "Aldi Nugraha's personal portfolio — software engineer passionate about cutting-edge tech and clean code.",
    },
  ]
}

export default function ContactPage() {
  return (
    <>
      <section className="text-center mb-16">
        <h1 className="text-4xl font-light text-slate-800 dark:text-white mb-4">Get In Touch</h1>
        <div className="w-16 h-px bg-sky-200 dark:bg-sky-800 mx-auto mb-8"></div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          I&#39;m always interested in new opportunities and meaningful conversations. Let&#39;s
          discuss how we can work together.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-6">
                Send a Message
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="mt-2 border-sky-200 dark:border-sky-800 focus:border-sky-400 dark:focus:border-sky-500 bg-white dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-2 border-sky-200 dark:border-sky-800 focus:border-sky-400 dark:focus:border-sky-500 bg-white dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-slate-700 dark:text-slate-300">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    className="mt-2 border-sky-200 dark:border-sky-800 focus:border-sky-400 dark:focus:border-sky-500 bg-white dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or idea..."
                    className="mt-2 min-h-32 border-sky-200 dark:border-sky-800 focus:border-sky-400 dark:focus:border-sky-500 bg-white dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 text-white rounded-full px-8"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-800 dark:text-white mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-sky-400 dark:text-sky-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">Email</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      aldi.nugrahatk@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-sky-400 dark:text-sky-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">Location</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Bandar Lampung, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-sky-400 dark:text-sky-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">Response Time</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Usually within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-800 dark:text-white mb-4">Let&#39;s Connect</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                Follow my work and thoughts on these platforms.
              </p>
              <div className="space-y-2">
                <Link
                  to="https://linkedin.com/in/aldngrha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  LinkedIn →
                </Link>
                <Link
                  to="https://github.com/aldngrha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  GitHub →
                </Link>
                <Link
                  to="https://instagram.com/aldngrha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Instagram →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
