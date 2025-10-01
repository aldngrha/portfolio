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
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 text-sky-400 dark:text-sky-500 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">Whatsapp</p>
                    <Link
                      to="https://wa.me/6282278628215?text=Halo%2C%20aku%20baru%20lihat%20portfolio%20kamu%20dan%20jadi%20penasaran%2C%20boleh%20ngobrol%3F"
                      className="text-slate-600 dark:text-slate-300 text-sm hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +62 822-7862-8215
                    </Link>
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
