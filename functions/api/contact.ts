import type { PagesFunction } from "@cloudflare/workers-types"
import { ContactFormData, sendContactEmail } from "../../app/services/send-email"

interface Env {
  RESEND_API_KEY: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const body = (await context.request.json()) as ContactFormData
  const result = await sendContactEmail(body, context.env.RESEND_API_KEY)

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}
