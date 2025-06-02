import { Header } from "~/components/shared/Header"
import { Outlet } from "@remix-run/react"
import Footer from "~/components/shared/Footer"

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-soft-blue-50/30 dark:bg-slate-950">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
