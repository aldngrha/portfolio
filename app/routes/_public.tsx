import { Header } from "~/components/Header"
import { Outlet,  useOutletContext } from "@remix-run/react"
import Footer from "~/components/Footer"

type RootContext = {
  version: string;
};

export default function PublicLayout() {
  const { version } = useOutletContext<RootContext>();
  return (
    <div className="min-h-screen bg-soft-blue-50/30 dark:bg-slate-950">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Outlet />
      </main>
      <Footer version={version} />
    </div>
  )
}
