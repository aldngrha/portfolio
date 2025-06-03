import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Label } from "~/components/ui/label"
import { Mail, MapPin, Clock, Send, AlertCircle, CheckCircle } from "lucide-react"
import { Form, Link, useNavigation, useSearchParams } from "@remix-run/react"
import { ActionFunction, MetaFunction, redirect } from "@remix-run/node"
import { sendContactEmail } from "~/services/send-email"

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Portfolio" },
    {
      name: "description",
      content:
        "Get in touch with Aldi Nugraha — software engineer ready to collaborate, innovate, and build the future together.",
    },
  ]
}

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 menit
const MAX_REQUESTS = 3

export const action: ActionFunction = async ({ request }) => {
  const ip =
    request.headers.get("x-forwarded-for") || request.headers.get("remote-addr") || "unknown"

  const now = Date.now()
  const record = rateLimitMap.get(ip) || { count: 0, lastRequest: now }

  if (now - record.lastRequest > RATE_LIMIT_WINDOW) {
    record.count = 0
    record.lastRequest = now
  }

  record.count++
  rateLimitMap.set(ip, record)

  if (record.count > MAX_REQUESTS) {
    return redirect("/contact?error=Too many requests. Please wait a minute and try again.")
  }

  const formData = await request.formData()

  const honeypot = formData.get("website")
  if (honeypot) {
    return redirect("/contact?error=Spam detected.")
  }

  const name = formData.get("name")?.toString().trim() || ""
  const email = formData.get("email")?.toString().trim() || ""
  const subject = formData.get("subject")?.toString().trim() || ""
  const message = formData.get("message")?.toString().trim() || ""

  if (!name || !email || !subject || !message) {
    return redirect("/contact?error=Please fill all the fields")
  }

  const result = await sendContactEmail({ name, email, subject, message })

  if (result.success) {
    return redirect("/contact?success=Message sent successfully!")
  } else {
    return redirect(`/contact?error=${encodeURIComponent(result.error || "Unknown error")}`)
  }
}

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const error = searchParams.get("error")

  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

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
              {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-green-800 dark:text-green-200 text-sm">{success}</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    Failed to send message: {error}
                  </p>
                </div>
              )}
              <Form method="post" id="contact-form" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      required
                      name="name"
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
                      required
                      type="email"
                      name="email"
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
                    required
                    name="subject"
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
                    name="message"
                    required
                    placeholder="Tell me about your project or idea..."
                    className="mt-2 min-h-32 border-sky-200 dark:border-sky-800 focus:border-sky-400 dark:focus:border-sky-500 bg-white dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  placeholder="Leave this field empty"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-soft-blue-600 hover:bg-soft-blue-700 dark:bg-soft-blue-600 dark:hover:bg-soft-blue-500 text-white rounded-full px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </Form>
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
