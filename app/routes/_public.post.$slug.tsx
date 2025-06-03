import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Share2, Heart, MessageCircle, ArrowRight } from "lucide-react"
import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { post, relatedPosts } from "~/constants"
import UnderConstruction from "~/components/UnderConstruction"

export const meta: MetaFunction = () => {
  return [
    { title: "Post Detail - Portfolio" },
    {
      name: "description",
      content:
        "Aldi Nugraha's personal portfolio — software engineer passionate about cutting-edge tech and clean code.",
    },
  ]
}

export default function PostDetailPage() {
  // const { id } = params
  // Mock post data - in real app, fetch based on params.id

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
    //   {" "}
    //   <div className="mb-8">
    //     <Button variant="ghost" asChild className="text-slate-600 hover:text-sky-600">
    //       <Link to="/posts">
    //         <ArrowLeft className="w-4 h-4 mr-2" />
    //         Back to Writing
    //       </Link>
    //     </Button>
    //   </div>
    //   {/* Article Header */}
    //   <article>
    //     <header className="mb-12">
    //       <Badge variant="secondary" className="bg-sky-50 text-sky-700 border-0 mb-4">
    //         {post.category}
    //       </Badge>
    //
    //       <h1 className="text-4xl font-light text-slate-800 mb-4 leading-tight">{post.title}</h1>
    //
    //       <p className="text-lg text-slate-600 mb-6 leading-relaxed">{post.excerpt}</p>
    //
    //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    //         <div className="flex items-center space-x-4 text-sm text-slate-500">
    //           <div className="flex items-center space-x-1">
    //             <Calendar className="w-4 h-4" />
    //             <span>{post.publishDate}</span>
    //           </div>
    //           <div className="flex items-center space-x-1">
    //             <Clock className="w-4 h-4" />
    //             <span>{post.readTime}</span>
    //           </div>
    //           <span>By {post.author}</span>
    //         </div>
    //
    //         <div className="flex items-center space-x-2">
    //           <Button size="sm" variant="ghost" className="text-slate-600 hover:text-sky-600">
    //             <Heart className="w-4 h-4 mr-1" />
    //             Like
    //           </Button>
    //           <Button size="sm" variant="ghost" className="text-slate-600 hover:text-sky-600">
    //             <Share2 className="w-4 h-4 mr-1" />
    //             Share
    //           </Button>
    //         </div>
    //       </div>
    //
    //       {/* Featured Image */}
    //       <div className="aspect-video bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg overflow-hidden mb-8">
    //         <img
    //           src={post.image || "/placeholder.svg"}
    //           alt={post.title}
    //           className="w-full h-full object-cover"
    //         />
    //       </div>
    //     </header>
    //
    //     {/* Article Content */}
    //     <div className="prose prose-slate prose-lg max-w-none mb-12">
    //       <Card className="border-0 shadow-sm bg-white">
    //         <CardContent className="p-8">
    //           <div className="prose prose-slate max-w-none">
    //             {post.content.split("\n\n").map((paragraph, index) => {
    //               if (paragraph.startsWith("# ")) {
    //                 return (
    //                   <h1
    //                     key={index}
    //                     className="text-3xl font-light text-slate-800 mb-6 mt-8 first:mt-0"
    //                   >
    //                     {paragraph.replace("# ", "")}
    //                   </h1>
    //                 )
    //               }
    //               if (paragraph.startsWith("## ")) {
    //                 return (
    //                   <h2 key={index} className="text-2xl font-light text-slate-800 mb-4 mt-8">
    //                     {paragraph.replace("## ", "")}
    //                   </h2>
    //                 )
    //               }
    //               if (paragraph.startsWith("### ")) {
    //                 return (
    //                   <h3 key={index} className="text-xl font-medium text-slate-800 mb-3 mt-6">
    //                     {paragraph.replace("### ", "")}
    //                   </h3>
    //                 )
    //               }
    //               if (paragraph.startsWith("```")) {
    //                 const codeContent = paragraph.replace(/```jsx?/g, "").replace(/```/g, "")
    //                 return (
    //                   <div key={index} className="bg-sky-50 rounded-lg p-4 my-6 overflow-x-auto">
    //                     <pre className="text-sm text-slate-700">
    //                       <code>{codeContent}</code>
    //                     </pre>
    //                   </div>
    //                 )
    //               }
    //               if (paragraph.trim() === "") return null
    //
    //               return (
    //                 <p key={index} className="text-slate-600 leading-relaxed mb-4">
    //                   {paragraph}
    //                 </p>
    //               )
    //             })}
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>
    //
    //     {/* Tags */}
    //     <div className="mb-12">
    //       <h3 className="text-lg font-medium text-slate-800 mb-4">Tags</h3>
    //       <div className="flex flex-wrap gap-2">
    //         {post.tags.map((tag, index) => (
    //           <Badge key={index} variant="secondary" className="bg-sky-50 text-sky-700 border-0">
    //             {tag}
    //           </Badge>
    //         ))}
    //       </div>
    //     </div>
    //   </article>
    //   {/* Author Bio */}
    //   <section className="mb-12">
    //     <Card className="border-0 shadow-sm bg-white">
    //       <CardContent className="p-8">
    //         <div className="flex items-start space-x-4">
    //           <div className="w-16 h-16 rounded-full overflow-hidden bg-sky-100 flex-shrink-0">
    //             <img
    //               src="/placeholder.svg?height=64&width=64"
    //               alt="Aldi Nugraha"
    //               className="w-full h-full object-cover"
    //             />
    //           </div>
    //           <div>
    //             <h3 className="text-lg font-medium text-slate-800 mb-2">Aldi Nugraha</h3>
    //             <p className="text-slate-600 mb-4 leading-relaxed">
    //               Frontend developer passionate about creating thoughtful digital experiences with
    //               clean code and user-centric design. I love sharing knowledge about web development
    //               and accessibility.
    //             </p>
    //             <div className="flex space-x-4">
    //               <Button
    //                 variant="outline"
    //                 size="sm"
    //                 asChild
    //                 className="border-sky-200 text-sky-700 hover:bg-sky-50 rounded-full"
    //               >
    //                 <Link to="/about">View Profile</Link>
    //               </Button>
    //               <Button
    //                 variant="outline"
    //                 size="sm"
    //                 asChild
    //                 className="border-sky-200 text-sky-700 hover:bg-sky-50 rounded-full"
    //               >
    //                 <Link to="/posts">More Articles</Link>
    //               </Button>
    //             </div>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </section>
    //   {/* Related Posts */}
    //   <section className="mb-12">
    //     <h2 className="text-2xl font-light text-slate-800 mb-8">Related Articles</h2>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //       {relatedPosts.map((relatedPost) => (
    //         <Card
    //           key={relatedPost.id}
    //           className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white"
    //         >
    //           <CardContent className="p-6">
    //             <h3 className="text-lg font-medium text-slate-800 mb-2">{relatedPost.title}</h3>
    //             <p className="text-slate-600 mb-4 leading-relaxed">{relatedPost.excerpt}</p>
    //
    //             <div className="flex items-center justify-between">
    //               <div className="flex items-center space-x-4 text-sm text-slate-500">
    //                 <span>{relatedPost.publishDate}</span>
    //                 <span>{relatedPost.readTime}</span>
    //               </div>
    //               <Button asChild variant="ghost" className="text-sky-600 hover:text-sky-700">
    //                 <Link to={`/posts/${relatedPost.id}`}>Read →</Link>
    //               </Button>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>
    //   </section>
    //   {/* Comments Section */}
    //   <section className="mb-12">
    //     <Card className="border-0 shadow-sm bg-white">
    //       <CardContent className="p-8">
    //         <div className="flex items-center space-x-2 mb-6">
    //           <MessageCircle className="w-5 h-5 text-sky-600" />
    //           <h2 className="text-2xl font-light text-slate-800">Discussion</h2>
    //         </div>
    //
    //         <div className="text-center py-12">
    //           <p className="text-slate-600 mb-4">
    //             Join the conversation! Share your thoughts and experiences about building accessible
    //             React components.
    //           </p>
    //           <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-full">
    //             Start Discussion
    //           </Button>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </section>
    //   {/* Newsletter CTA */}
    //   <section className="text-center">
    //     <Card className="border-0 shadow-sm bg-gradient-to-br from-sky-50 to-sky-100">
    //       <CardContent className="p-8">
    //         <h2 className="text-2xl font-light text-slate-800 mb-4">Stay Updated</h2>
    //         <p className="text-slate-600 mb-6">
    //           Get notified when I publish new articles about web development and design.
    //         </p>
    //         <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white rounded-full">
    //           <Link to="/posts">
    //             Read More Articles
    //             <ArrowRight className="w-4 h-4 ml-2" />
    //           </Link>
    //         </Button>
    //       </CardContent>
    //     </Card>
    //   </section>
    // </>
  )
}
