import type { MetaFunction } from "@remix-run/node"
import UnderConstruction from "~/components/UnderConstruction"

export const meta: MetaFunction = () => {
  return [
    { title: "Posts - Portfolio" },
    {
      name: "description",
      content:
        "Aldi Nugraha's personal portfolio — software engineer passionate about cutting-edge tech and clean code.",
    },
  ]
}

export default function PostsPage() {
  // const regularPosts = posts.filter((post) => !post.featured)

  return (
    <div className="h-[57.5vh]">
      <UnderConstruction
        title="Coming Soon"
        description="We're working hard to bring you an amazing new feature. Stay tuned for updates!"
        estimatedDate="July 2025"
        className="absolute top-1/2 -translate-y-1/2 md:left-1/4 md:right-1/4"
        showNotify={false}
      />
    </div>
    // <>
    //   <section className="text-center mb-16">
    //     <h1 className="text-4xl font-light text-slate-800 dark:text-white mb-4">Writing</h1>
    //     <div className="w-16 h-px bg-sky-200 dark:bg-sky-800 mx-auto mb-8"></div>
    //     <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
    //       Thoughts and insights about web development, design, and technology.
    //     </p>
    //   </section>
    //
    //   {/* Search */}
    //   <section className="mb-12">
    //     <div className="max-w-md mx-auto relative">
    //       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 dark:text-sky-500 w-4 h-4" />
    //       <Input
    //         placeholder="Search articles..."
    //         className="pl-10 border-sky-200 dark:border-sky-800 focus:border-sky-400 dark:focus:border-sky-500 rounded-full bg-white dark:bg-slate-900 dark:text-white"
    //       />
    //     </div>
    //   </section>
    //
    //   {/* Recent Posts */}
    //   <section className="mb-16">
    //     <div className="space-y-6 mx-auto">
    //       {regularPosts.map((post) => (
    //         <Card
    //           key={post.id}
    //           className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-900 dark:border dark:border-slate-800"
    //         >
    //           <CardContent className="p-6">
    //             <div className="flex items-start justify-between">
    //               <div className="flex-1">
    //                 <Badge
    //                   variant="secondary"
    //                   className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-0 mb-3"
    //                 >
    //                   {post.category}
    //                 </Badge>
    //                 <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-3">
    //                   {post.title}
    //                 </h3>
    //                 <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
    //                   {post.excerpt}
    //                 </p>
    //
    //                 <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
    //                   <div className="flex items-center space-x-1">
    //                     <Calendar className="w-4 h-4" />
    //                     <span>{post.publishDate}</span>
    //                   </div>
    //                   <div className="flex items-center space-x-1">
    //                     <Clock className="w-4 h-4" />
    //                     <span>{post.readTime}</span>
    //                   </div>
    //                 </div>
    //               </div>
    //
    //               <Button
    //                 asChild
    //                 variant="ghost"
    //                 className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 ml-6"
    //               >
    //                 <Link to={`/posts/${post.id}`}>Read →</Link>
    //               </Button>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>
    //   </section>
    //
    //   {/* Newsletter */}
    //   <section className="text-center">
    //     <Card className="border-0 shadow-sm max-w-2xl mx-auto bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
    //       <CardContent className="p-8">
    //         <h2 className="text-2xl font-light text-slate-800 dark:text-white mb-4">
    //           Stay Updated
    //         </h2>
    //         <p className="text-slate-600 dark:text-slate-300 mb-6">
    //           Get notified when I publish new articles about web development and design.
    //         </p>
    //         <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
    //           <Input
    //             placeholder="your@email.com"
    //             className="border-sky-200 dark:border-sky-800 focus:border-sky-400 dark:focus:border-sky-500 bg-white dark:bg-slate-900 dark:text-white"
    //           />
    //           <Button className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 text-white">
    //             Subscribe
    //           </Button>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </section>
    // </>
  )
}
