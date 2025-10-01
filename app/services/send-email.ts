import { Resend } from "resend"

export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}


export async function sendContactEmail({ name, email, subject, message }: ContactFormData, apiKey: string) {
  const resend = new Resend(apiKey)
  try {
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return { success: false, error: "All fields are required." }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address." }
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <noreply@aldinugraha.me>", // "onboarding@resend.dev", "Portfolio Contact <noreply@aldinugraha.me>", // Replace with your verified domain
      to: ["aldi.nugrahatk@gmail.com"], // Your inbox
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #0ea5e9; margin-bottom: 20px; border-bottom: 2px solid #e0f2fe; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #334155; margin-bottom: 8px; font-size: 16px;">Contact Details:</h3>
              <p style="margin: 5px 0; color: #64748b;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #64748b;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0; color: #64748b;"><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #334155; margin-bottom: 8px; font-size: 16px;">Message:</h3>
              <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #0ea5e9;">
                <p style="margin: 0; color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #94a3b8; font-size: 14px; text-align: center;">
                This message was sent from your portfolio contact form.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio contact form.
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: "Failed to send email. Please try again." }
    }

    return { success: true }
  } catch (err) {
    console.error("Contact form error:", err)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}
