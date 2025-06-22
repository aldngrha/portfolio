import {
  // Zap,
  // Sparkles,
  // Rocket,
  // Brain,
  Link2,
  Pizza,
  Stethoscope,
  PlaneTakeoff,
  // Code,
  // Palette,
  // Globe,
  // TrendingUp
} from "lucide-react"

import { LabProject } from "~/interface"

export const techSkills = [
  {
    name: "React",
    icon: "https://camo.githubusercontent.com/34b891c76d258e4b0ee593443e5cbc2506cdbb7d3cd6bc0e4beffa87a9c1611b/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667",
  },
  {
    name: "Next.js",
    icon: "https://camo.githubusercontent.com/92ce1c051262bbe8c329848632e7ce3a5289de4c35182ae3d01ef1655f65c32b/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6e6578746a732f6e6578746a732d6f726967696e616c2e737667",
  },
  {
    name: "TypeScript",
    icon: "https://camo.githubusercontent.com/a07203131922e3fa0d6d0cd787edb5597771b30d712574bbc70a3c7aaa0161ea/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f747970657363726970742f747970657363726970742d6f726967696e616c2e737667",
  },
  {
    name: "JavaScript",
    icon: "https://camo.githubusercontent.com/426c1121b29abc64a6b1af1e3aa3091abb38e39c87054720b765af1425c74e7f/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667",
  },
  {
    name: "Node.js",
    icon: "https://camo.githubusercontent.com/d21012299f2ccd4a7d73b13f896b0be91c9e71bb7f0b51f1cbfb783ed6b9f9b1/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6e6f64656a732f6e6f64656a732d6f726967696e616c2e737667",
  },
  { name: "Hono.js", icon: "https://hono.dev/images/logo.svg" },
  {
    name: "Tailwind CSS",
    icon: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg",
  },
  {
    name: "Express.js",
    icon: "https://camo.githubusercontent.com/77aa9fd87a8cb509310fb9951b08090e352490b6e8e2073a22f892eed5fe69a5/68747470733a2f2f63646e2e73696d706c6569636f6e732e6f72672f657870726573732f303030303030",
  },
  {
    name: "Go",
    icon: "https://camo.githubusercontent.com/2da2b4f522a141ee1ab31083715611812c2d5d32f233767c507fb84fd7e14f1d/68747470733a2f2f63646e2e73696d706c6569636f6e732e6f72672f676f2f303041444438",
  },
  {
    name: "Laravel",
    icon: "https://camo.githubusercontent.com/5b13a1dda84194fa13ed156bd124e409497815977ab8ea21ebb815720160652d/68747470733a2f2f63646e2e73696d706c6569636f6e732e6f72672f6c61726176656c2f464632443230",
  },
  {
    name: "PostgreSQL",
    icon: "https://camo.githubusercontent.com/f76ca013b330e2bffb000dfd1f5487432ead1d7c6f489b6051a5ac5853ea4c78/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2e737667",
  },
  {
    name: "MySQL",
    icon: "https://camo.githubusercontent.com/8b690f4dff81513c7425f3b8f6e66b34a1dea43e22562037eeb5449d18571c89/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6d7973716c2f6d7973716c2d6f726967696e616c2e737667",
  },
  {
    name: "Redis",
    icon: "https://redis.io/wp-content/uploads/2024/04/Logotype.svg?auto=webp&quality=85,75&width=120",
  },
  {
    name: "Firebase",
    icon: "https://camo.githubusercontent.com/8058e635f9243b2d287b6e48dd9964f58fccf86c001075ba6d6fd15ae0ebe2ad/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f66697265626173652f66697265626173652d706c61696e2e737667",
  },
  {
    name: "Supabase",
    icon: "https://supabase.com/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupabase-logo.svg&w=48&q=75",
  },
]

export const experience = [
  {
    role: "Software Engineer",
    company: "Self Employed",
    period: "2022 - Present",
    description:
      "Developed responsive web and mobile apps for diverse clients, collaborating closely with designers and backend teams.",
  },
  {
    role: "Lead Frontend Developer",
    company: "Newus Technology",
    period: "2024 - 2025",
    description:
      "Leading frontend development for enterprise applications, and implementing design systems.",
  },
  {
    role: "Junior Developer",
    company: "Badan Kepagawaian Daerah",
    period: "2021 - 2021",
    description:
      "Built Excel apps with VBA macros to automate incoming and outgoing mail processes.",
  },
]

export const post = {
  id: 1,
  title: "Building Accessible React Components",
  excerpt:
    "Exploring best practices for creating inclusive user interfaces that work for everyone, regardless of their abilities or the technology they use.",
  content: `
# Introduction

Accessibility in web development isn't just a nice-to-have feature—it's a fundamental requirement for creating inclusive digital experiences. When building React components, we have the opportunity to bake accessibility into our applications from the ground up.

In this article, we'll explore practical strategies for creating React components that work seamlessly for all users, including those who rely on assistive technologies.

## Why Accessibility Matters

Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites and applications. This includes users who:

- Are blind or have low vision
- Are deaf or hard of hearing
- Have motor disabilities
- Have cognitive disabilities

By building accessible components, we're not just following best practices—we're creating a more inclusive web for everyone.

## Key Principles of Accessible React Components

### 1. Semantic HTML Foundation

The foundation of accessible React components starts with semantic HTML. Instead of relying solely on divs and spans, use meaningful HTML elements that convey structure and purpose.

\`\`\`jsx
// ❌ Not semantic
<div onClick={handleClick}>Submit</div>

// ✅ Semantic and accessible
<button onClick={handleClick}>Submit</button>
\`\`\`

### 2. Proper ARIA Labels

ARIA (Accessible Rich Internet Applications) attributes provide additional context for screen readers when semantic HTML isn't sufficient.

\`\`\`jsx
function SearchInput() {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        aria-describedby="search-help"
        placeholder="Enter your search term"
      />
      <div id="search-help">
        Search through our product catalog
      </div>
    </div>
  )
}
\`\`\`

### 3. Keyboard Navigation

Ensure all interactive elements are accessible via keyboard navigation. This includes proper focus management and logical tab order.

\`\`\`jsx
function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      // Focus the modal when it opens
      modalRef.current?.focus()
    }
  }, [isOpen])

  export const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}
\`\`\`

## Testing Your Components

Regular testing is crucial for maintaining accessibility. Here are some tools and techniques:

1. **Screen Reader Testing**: Test with actual screen readers like NVDA, JAWS, or VoiceOver
2. **Automated Testing**: Use tools like axe-core or Lighthouse
3. **Keyboard Testing**: Navigate your entire application using only the keyboard
4. **Color Contrast**: Ensure sufficient contrast ratios for text and backgrounds

## Conclusion

Building accessible React components requires intentional design and development practices. By starting with semantic HTML, adding appropriate ARIA labels, ensuring keyboard navigation, and testing regularly, we can create components that work for everyone.

Remember, accessibility is not a one-time task—it's an ongoing commitment to inclusive design. Every component we build is an opportunity to make the web more accessible for all users.
    `,
  category: "Development",
  author: "Aldi Nugraha",
  publishDate: "Jan 15, 2024",
  readTime: "5 min read",
  tags: ["React", "Accessibility", "Frontend", "Web Development"],
  image: "/placeholder.svg?height=400&width=800",
}

export const relatedPosts = [
  {
    id: 2,
    title: "The Art of Minimal Design",
    excerpt: "How export constraints and simplicity can lead to more effective user experiences.",
    readTime: "3 min read",
    publishDate: "Jan 8, 2024",
  },
  {
    id: 3,
    title: "Modern CSS Layout Techniques",
    excerpt: "A deep dive into CSS Grid and Flexbox for creating responsive layouts.",
    readTime: "8 min read",
    publishDate: "Dec 28, 2023",
  },
]

export const posts = [
  {
    id: 1,
    title: "Building Accessible React Components",
    excerpt:
      "Exploring best practices for creating inclusive user interfaces that work for everyone, regardless of their abilities or the technology they use.",
    category: "Development",
    readTime: "5 min read",
    publishDate: "Jan 15, 2024",
    featured: true,
  },
  {
    id: 2,
    title: "The Art of Minimal Design",
    excerpt:
      "How export constraints and simplicity can lead to more effective user experiences and cleaner codebases.",
    category: "Design",
    readTime: "3 min read",
    publishDate: "Jan 8, 2024",
    featured: false,
  },
  {
    id: 3,
    title: "Modern CSS Layout Techniques",
    excerpt:
      "A deep dive into CSS Grid and Flexbox for creating responsive layouts that adapt to any screen size.",
    category: "CSS",
    readTime: "8 min read",
    publishDate: "Dec 28, 2023",
    featured: false,
  },
  {
    id: 4,
    title: "State Management in React",
    excerpt:
      "Comparing different approaches to managing state in React applications, from useState to external libraries.",
    category: "React",
    readTime: "6 min read",
    publishDate: "Dec 20, 2023",
    featured: false,
  },
  {
    id: 5,
    title: "Performance Optimization Tips",
    excerpt: "Practical techniques for improving web application performance and user experience.",
    category: "Performance",
    readTime: "7 min read",
    publishDate: "Dec 15, 2023",
    featured: false,
  },
]

export const project = {
  title: "Public Service Platform",
  description:
    "A comprehensive digital platform designed to streamline government services for citizens.",
  longDescription: `This project aimed to modernize how citizens interact with government services by creating an intuitive, accessible web platform. The application features a clean interface that guides users through complex administrative processes, reducing bureaucratic friction and improving overall user satisfaction.

The platform includes user authentication, document management, real-time status tracking, and integrated payment systems. Special attention was paid to accessibility standards and mobile responsiveness to ensure the platform serves all citizens effectively.`,
  technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
  category: "Web Application",
  year: "2024",
  duration: "6 months",
  team: "4 developers",
  role: "Lead Frontend Developer",
  features: [
    "User authentication and authorization",
    "Document upload and management",
    "Real-time application tracking",
    "Integrated payment processing",
    "Multi-language support",
    "Responsive mobile design",
  ],
}

export const projects = [
  {
    id: 7,
    title: "Simpuskes (Health Service Platform)",
    slug: "simpuskes-health-service-platform",
    description:
      "A digital platform to streamline public health services, enabling citizens to access healthcare information, request services, and monitor their medical records with ease.",
    longDescription: `Developed a Puskesmas management system with a responsive and modern UI using Next.js and Tailwind CSS. Implemented a body anatomy feature for visual anamnesis, and integrated backend APIs for patient data, doctor schedules, and medical records. Used JWT for authentication, and built custom middleware for role-based access. Prepared the system for BPJS integration while ensuring performance, scalability, and accessibility across all devices.`,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Query"],
    category: "Web Application",
    year: "Oct 2024 - Apr 2025",
    image: "/assets/images/simpuskes.jpg",
    github: null,
    link: "https://simpuskes.com",
    duration: "5 months",
    team: "6 developers",
    role: "Frontend Developer",
    contribution_as: "Leader & Engineer",
    features: [
      "JWT-based authentication and session management",
      "Anamnesis body anatomy coordinate feature",
      "API integration for doctor schedule & medical records",
      "Route protection with custom middleware",
      "Responsive and scalable UI design",
      "Preparation for BPJS integration",
    ],
  },
  {
    id: 6,
    title: "Sitmap (Geographic Information System)",
    slug: "sitmap-geographic-information-system",
    description:
      "An interactive GIS web app for infrastructure monitoring, featuring dynamic map visualizations and spatial data integration for efficient project tracking.",
    longDescription: `Built with Next.js and Google Maps API, this GIS system enables geospatial visualization through point, line, and polygon mapping. Designed to manage regional data in Lampung Utara, it supports decision-making by visualizing boundaries and regions. JWT ensures secure sessions, while scalability was emphasized for handling future growth. The UI was translated directly from Figma designs, ensuring consistency across devices.`,
    technologies: ["Next.js", "Tailwind CSS", "Google Maps API"],
    category: "Web Application",
    year: "Aug 2024 - Oct 2024",
    image: "/assets/images/sitmap.jpg",
    github: null,
    link: "https://sitmap.tapem.lampungutarakab.go.id/",
    duration: "3 months",
    team: "2 developers",
    role: "Frontend Developer",
    contribution_as: "Engineer",
    features: [
      "Interactive GIS map (point, line, polygon)",
      "Secure session with JWT",
      "Responsive UI from Figma design",
      "Boundary and spatial data analysis",
      "Centralized regional data platform",
    ],
  },
  {
    id: 5,
    title: "Mal Pelayanan Publik (Public Service Mall) Web App",
    slug: "mal-pelayanan-publik-public-service-mall-web-app",
    description:
      "A web-based dashboard to manage public service requests, track submissions, and provide real-time analytics for government departments.",
    longDescription: `Developed an admin dashboard web app using Next.js and Tailwind CSS. Features included dynamic form creation based on government service types, service request approval workflows, and JWT-based authentication. Integrated with backend APIs and built with role-based access for three types of users. Collaboration with UI/UX and backend teams ensured a seamless experience.`,
    technologies: ["Next.js", "Tailwind CSS", "Chart.js"],
    category: "Dashboard",
    year: "May 2024 - Aug 2024",
    image: "/assets/images/mpp.png",
    github: null,
    link: "https://admin-mpp.lampungtimurkab.go.id",
    duration: "4 months",
    team: "3 developers",
    role: "Frontend Developer",
    contribution_as: "Leader & Engineer",
    features: [
      "Admin dashboard with 3 user roles",
      "Dynamic form rendering per service",
      "Approval management system",
      "JWT authentication with cookie storage",
      "Real-time data visualization with Chart.js",
    ],
  },
  {
    id: 4,
    title: "Mal Pelayanan Publik (Public Service Mall) Mobile App",
    slug: "mal-pelayanan-publik-public-service-mall-mobile-app",
    description:
      "A mobile app for citizens to submit, track, and manage public service applications on the go, integrated with push notifications and document uploads.",
    longDescription: `Built an Android mobile application using React Native and NativeWind. Features included JWT-based authentication, dynamic forms tied to selected services, and push notifications for approval or rejection updates. Collaborated with the backend and UI/UX teams to ensure integration and experience were seamless and intuitive.`,
    technologies: ["React Native", "Tailwind CSS", "NativeWind"],
    category: "Mobile Application",
    year: "Apr 2024 - Aug 2024",
    image: null, //"/assets/images/mpp-mobile.png",
    github: null,
    link: "https://mpp.lampungtimurkab.go.id/",
    duration: "5 months",
    team: "3 developers",
    role: "Mobile Developer",
    contribution_as: "Leader & Engineer",
    features: [
      "Dynamic forms based on selected service",
      "Push notifications for service updates",
      "JWT-based authentication",
      "Responsive mobile-first design",
      "API integration and UI/UX collaboration",
    ],
  },
  {
    id: 3,
    title: "SIPPP (Information System for Implementation, Monitoring, Reporting)",
    slug: "sippp-information-system-for-implementation-monitoring-reporting",
    description:
      "A centralized system to manage project implementation and monitoring reports, with geolocation support for mapping project progress.",
    longDescription: `Developed a web-based surveillance system for surveying bridges, drainage, and road sections. Implemented Leaflet JS for GIS maps and added pagination, search with debounce, and sorting functionality. Used JWT for secure auth and cookies for state persistence. Managed tasks via Jira and versioned code via Git workflows.`,
    technologies: ["React.js", "Tailwind CSS", "Leaflet"],
    category: "Web Application",
    year: "Mar 2024 - May 2024",
    image: "/assets/images/sipp.jpg",
    github: null,
    link: "https://sippp-puprtubabakab.com/",
    duration: "3 months",
    team: "2 developers",
    role: "Frontend Developer",
    contribution_as: "Engineer",
    features: [
      "GIS integration with Leaflet JS",
      "Pagination, search with debounce, and sorting",
      "JWT-based authentication with cookies",
      "Project monitoring and reporting system",
      "Task tracking with Jira and Git",
    ],
  },
  {
    id: 2,
    title: "Newus Technology (Company Website)",
    slug: "newus-technology-company-website",
    description:
      "A sleek, responsive company website showcasing Newus Technology’s services, products, and vision through structured content and modern design.",
    longDescription: `Built the official Newus Technology website using Next.js and Tailwind CSS. Focused on clean UI slicing and responsive layout. Tasks were managed using Jira and version control was maintained through Git, enabling collaborative development and streamlined delivery.`,
    technologies: ["Next.js", "Tailwind CSS", "MDX"],
    category: "Website",
    year: "Apr 2024",
    image: "/assets/images/newus.jpg",
    github: null,
    link: "https://newus.id",
    duration: "1 month",
    team: "2 developers",
    role: "Frontend Developer",
    contribution_as: "Engineer",
    features: [
      "Responsive company profile site",
      "Modern design with Tailwind CSS",
      "Task and progress management via Jira",
      "Version control with Git workflow",
    ],
  },
  {
    id: 1,
    title: "EMONEV (Electronic Monitoring and Evaluation)",
    slug: "emonev-electronic-monitoring-and-evaluation",
    description:
      "A system designed to track and evaluate program implementation, providing visual reports and data summaries for strategic decision-making.",
    longDescription: `Developed an evaluation dashboard system using Next.js and Tailwind CSS. Implemented print report features and secured the app using NextAuth with credential-based login. Worked in a collaborative environment using Git and Jira for versioning and task management.`,
    technologies: ["Next.js", "Tailwind CSS", "NextAuth", "MDX"],
    category: "Website",
    year: "Apr 2024",
    image: null, //"/assets/images/emonev.png",
    github: null,
    link: null,
    duration: "1 month",
    team: "2 developers",
    role: "Frontend Developer",
    contribution_as: "Engineer",
    features: [
      "Secure login via NextAuth",
      "Printable report generation",
      "Monitoring and evaluation tools",
      "Project tracking with Jira and Git",
    ],
  },
]

export const experiences = [
  {
    role: "Software Engineer",
    company: "Self Employed",
    location: "Remote",
    period: "2022 - Present",
    description: [
      "Develop responsive web and mobile applications for diverse clients using modern frameworks.",
      "Collaborate closely with designers and backend teams to deliver seamless user experiences.",
      "Manage full project lifecycle from requirements gathering to deployment.",
    ],
  },
  {
    role: "Lead Frontend Developer",
    company: "Newus Technology",
    location: "Bandar Lampung, Indonesia",
    period: "2024 - 2025",
    description: [
      "Lead frontend development on enterprise-grade applications with focus on scalability and maintainability.",
      "Implement design systems to ensure UI consistency across multiple products.",
      "Mentor junior developers and coordinate cross-team collaborations.",
      "Optimize performance and improve application responsiveness.",
    ],
  },
  {
    role: "Junior Developer",
    company: "Badan Kepagawaian Daerah",
    location: "Bandar Lampung, Indonesia",
    period: "2021 - 2021",
    description: [
      "Built Excel-based applications with VBA macros to automate incoming and outgoing mail processes.",
      "Streamlined administrative workflows and reduced manual errors.",
    ],
  },
]

export const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Teknokrat University of Indonesia",
    location: "Bandar Lampung, Indonesia",
    period: "2018 - 2023",
    description:
      "Graduated with a GPA of 3.48, specializing in software engineering and web development.",
  },
]

export const certifications = [
  {
    name: "Go-Lang: Beginner to Advanced",
    issuer: "Programmer Zaman Now",
    year: "2024",
  },
  {
    name: "Typescript: Beginner to Advanced",
    issuer: "Programmer Zaman Now",
    year: "2022",
  },
  {
    name: "Javascript: Beginner to Advanced",
    issuer: "Programmer Zaman Now",
    year: "2022",
  },
  {
    name: "Node JS: Beginner to Advanced",
    issuer: "Programmer Zaman Now",
    year: "2022",
  },
  {
    name: "Fullstack Javascript Developer",
    issuer: "Builtwithangga",
    year: "2021",
  },
]

export const skills = {
  technical: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Node.js",
    "Git",
    "Figma",
    "Responsive Design",
    "Laravel",
    "Express.js",
    "Hono.js",
    "Accessibility",
  ],
  soft: [
    "Problem Solving",
    "Communication",
    "Team Collaboration",
    "Time Management",
    "Mentoring",
    "Project Planning",
  ],
}

export const labProjects: LabProject[] = [
  {
    id: 4,
    title: "E-Commerce Platform with Go & gRPC",
    slug: "ecommerce-go-grpc",
    description:
      "A full-stack experiment using Go, gRPC, and React to explore modular services, gRPC-Web communication, and Xendit-powered checkout.",
    longDescription: `This project started as a technical experiment to explore how gRPC and Protocol Buffers could be applied in building a full-stack e-commerce system from scratch. It was an opportunity to stress-test modern tools across both the backend and frontend.

The backend is architected with Go, split into modular services for authentication, product catalog, and checkout flow — all communicating over gRPC. JWT is used for stateless auth, and PostgreSQL (via Supabase) handles relational data with real-time sync.

On the frontend, React.js connects to these services using gRPC-Web, pushing boundaries on client-server communication performance. The integration with Xendit simulates real-world payment flows and completes the loop from user input to transaction settlement.

This isn't just a codebase — it's a playground for testing ideas in system design, performance, and cross-stack communication. While inspired by production patterns, the real goal here is experimentation: breaking stuff, fixing it, and learning from the edge.`,
    category: "prototype",
    status: "in-progress",
    technologies: [
      "Go (Golang)",
      "gRPC",
      "Protocol Buffers",
      "React.js",
      "gRPC-Web",
      "PostgreSQL",
      "Supabase",
      "JWT Auth",
      "Tailwind CSS",
      "Xendit API",
    ],
    difficulty: "intermediate",
    featured: true,
    dateCreated: "2025-06-11",
    lastUpdated: "2025-06-21",
    githubUrl: "https://github.com/aldngrha/AirGo",
    demoUrl: null,
    blogPostUrl: null,
    image: "/assets/images/grpc.jpg",
    tags: ["Go", "gRPC", "React", "PostgreSQL", "Supabase", "E-Commerce", "Full-Stack"],
    icon: Link2,
    // stats: {
    //   views: 0,
    //   stars: 0,
    //   forks: 0,
    // },
    objectives: [
      "Understand the fundamentals of gRPC and Protocol Buffers",
      "Develop scalable backend services using Go and gRPC",
      "Implement secure authentication using JWT",
      "Build a responsive frontend with React.js and Tailwind CSS",
      "Connect frontend to backend using gRPC-Web",
      "Integrate Supabase for database and real-time sync",
      "Add payment gateway integration using Xendit",
    ],
    challenges: [
      "Designing Protobuf schemas for gRPC communication",
      "Handling gRPC-Web integration in a React environment",
      "Ensuring secure and stateless authentication across services",
      "Implementing dynamic checkout and payment flows",
      "Managing real-time data with Supabase in a consistent state",
    ],
    learnings: [
      "How to architect full-stack applications using Go and React.js",
      "Practical use of gRPC in modern web development",
      "Integration of real-world tools like Supabase and Xendit",
      "Building modular services with clear separation of concerns",
      "Working with PostgreSQL in production-like scenarios",
    ],
    nextSteps: [
      "Implement role-based access control and admin dashboard",
      "Add unit/integration testing for backend services",
      "Deploy to cloud using Docker and CI/CD pipelines",
      "Enhance checkout with discount, coupon, and inventory systems",
    ],
  },
  {
    id: 3,
    title: "Flight Ticket Booking Website with Next.js",
    slug: "flight-ticket-booking-website-with-nextjs",
    description:
      "A hands-on prototype for flight booking built with Next.js and Prisma, testing server-side rendering and integrated checkout with Midtrans.",
    longDescription: `This project was born out of curiosity — a deep dive into how modern web technologies could be used to recreate a flight booking experience from scratch.

At the core is Next.js, chosen not just for its flexibility but for its power in handling server-side rendering, routing, and API logic in a unified framework. The backend is shaped using Prisma, designed to handle complex relationships like users, flight schedules, and booking history with clarity and type-safety.

Authentication is implemented with Lucia for its minimal yet robust approach, while file uploads (like travel documents or ID) are routed through Supabase Storage. Tailwind CSS and Shadcn/UI power the interface, enabling rapid prototyping without sacrificing polish.

Midtrans handles the payment layer — integrated to simulate real-world checkout and transaction flow. Deployment happens on Vercel, bringing the whole system live with minimal friction.

It’s not just a booking app — it’s a playground for testing how far modern full-stack tooling can go in shaping digital travel experiences.`,
    category: "prototype",
    status: "completed",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Shadcn/UI",
      "Prisma ORM",
      "Lucia Auth",
      "Supabase Storage",
      "Midtrans",
      "Vercel",
    ],
    difficulty: "intermediate",
    featured: false,
    dateCreated: "2024-09-22",
    lastUpdated: "2025-04-11",
    githubUrl: "https://github.com/aldngrha/AirGo",
    demoUrl: null,
    blogPostUrl: null,
    image: "/assets/images/flysha.jpg",
    tags: ["Next.js", "Full-Stack", "Flight Booking", "Prisma", "Tailwind", "Midtrans"],
    icon: PlaneTakeoff,
    objectives: [
      "Build a full-stack flight booking website using Next.js",
      "Implement server-side rendering for SEO optimization",
      "Style custom components with Tailwind CSS and Shadcn/UI",
      "Use Prisma ORM for database integration",
      "Integrate Lucia for authentication",
      "Upload user files with Supabase Storage",
      "Handle payment transactions with Midtrans",
      "Deploy the application to Vercel",
    ],
    challenges: [
      "Managing state between server and client with SSR",
      "Structuring relational data with Prisma",
      "Securing authentication and payment flows",
      "Handling media uploads and access control",
      "Deploying and configuring environment variables for production",
    ],
    learnings: [
      "Full-stack application architecture with modern JavaScript",
      "Next.js rendering strategies (SSR, SSG)",
      "Authentication flows using Lucia",
      "Database design and access with Prisma",
      "Responsive UI development with Tailwind and Shadcn",
      "Deployment workflows using Vercel",
    ],
    nextSteps: [
      "Add Downloadable e-ticket feature",
      "Integrate push email notifications after payment success",
      "Implement seat selection and flight filter system",
    ],
  },
  {
    id: 2,
    title: "Food Market Mobile App with React Native",
    slug: "food-market-mobile-app-with-react-native",
    description:
      "An end-to-end mobile stack prototype — slicing Figma designs into React Native screens, with Laravel APIs and Midtrans-powered checkout.",
    longDescription: `This project explores how React Native and Laravel 8 can be combined to create a full-stack mobile experience — starting from Figma designs all the way to live, functional apps.

The frontend is built with React Native, focusing on transforming UI mockups into responsive, cross-platform components. Every screen is sliced directly from Figma, with attention to detail in styling, layout behavior, and component logic.

On the backend, Laravel 8 (with Jetstream) powers a headless CMS and API layer, handling authentication, user roles, transactions, and content management. It’s designed to be flexible enough for production-level use cases, yet modular for experimentation.

The app also integrates with the Midtrans Payment Gateway, simulating real-world payment flows within mobile environments — including checkout logic, transaction handling, and state management.

This experiment serves as a sandbox to test mobile-to-API integration, realtime payment workflows, and the limits of what can be achieved with a full-stack Laravel and React Native combo.`,
    category: "prototype",
    status: "completed",
    technologies: [
      "React Native",
      "Laravel 8",
      "Jetstream",
      "Figma",
      "REST API",
      "Midtrans",
      "Tailwind CSS",
      "Play Store Deployment",
    ],
    difficulty: "beginner",
    featured: false,
    dateCreated: "2023-01-15",
    lastUpdated: "2023-06-21",
    githubUrl: "https://github.com/aldngrha/food-market-rn",
    demoUrl: null,
    blogPostUrl: null,
    image: "/assets/images/foodmarket.jpg",
    tags: ["React Native", "Laravel", "Mobile App", "Full-Stack", "Midtrans", "Jetstream"],
    icon: Pizza,
    objectives: [
      "Transform Figma designs into React Native components",
      "Build responsive mobile apps using React Native",
      "Develop APIs and CMS using Laravel 8 and Jetstream",
      "Understand the synergy between mobile and backend developers",
      "Integrate payment flows using Midtrans gateway",
      "Deploy Android apps to the Play Store",
    ],
    challenges: [
      "Managing state and navigation in React Native apps",
      "Setting up Laravel Jetstream authentication securely",
      "Synchronizing mobile app with RESTful APIs",
      "Handling file uploads and image preview in mobile UI",
      "Configuring production-ready deployments for CMS and APK",
    ],
    learnings: [
      "Mobile-first design translation from Figma to code",
      "Building a backend with Laravel Jetstream",
      "Connecting mobile frontend with custom APIs",
      "Deployment process to Play Store with production builds",
      "Midtrans payment integration for mobile transactions",
    ],
    nextSteps: [
      "Implement push notifications using Firebase Cloud Messaging",
      "Add role-based access control in the CMS",
      "Expand to iOS deployment using EAS (Expo Application Services)",
      "Integrate analytics and error monitoring",
    ],
  },
  {
    id: 1,
    title: "Online Doctor Consultation App with React Native",
    slug: "online-doctor-consultation-app-with-react-native",
    description:
      "A lightweight mobile prototype for online doctor consultation, built with React Native and Firebase to explore real-time chat and healthcare UX.",
    longDescription: `This project is an exploration into mobile healthcare — a lightweight React Native app built to simulate real-time doctor consultations in a remote setting.

The idea was simple: what if accessing a certified doctor could be as easy as opening a chat app? Using Firebase for authentication, realtime messaging, and photo uploads, the app tests how minimal infrastructure can deliver meaningful telemedicine experiences.

The frontend is crafted with React Native, aiming for simplicity, speed, and clarity in UX. Behind the scenes, Firebase handles secure login and real-time sync, allowing patients to share symptoms, ask questions, and interact instantly with healthcare professionals.

This build isn’t about recreating the next big health platform — it’s a focused experiment in bridging mobile UX, data sync, and human care. A space to test what healthcare might look like when powered by lean code and fast feedback loops.`,
    category: "prototype",
    status: "completed",
    technologies: [
      "React Native",
      "Firebase Auth",
      "Firebase Realtime Database",
      "Firebase Storage",
      "Expo",
    ],
    difficulty: "beginner",
    featured: false,
    dateCreated: "2020-11-20",
    lastUpdated: "2021-02-11",
    githubUrl: "https://github.com/aldngrha/MyDoctor",
    demoUrl: null,
    blogPostUrl: null,
    image: "/assets/images/mydoctor.jpg",
    tags: ["React Native", "Firebase", "Healthcare", "Chat App", "Mobile App"],
    icon: Stethoscope, // Kalau pakai Lucide, bisa custom import
    objectives: [
      "Understand the use of Firebase for real-time applications",
      "Build secure authentication flow using email and password",
      "Implement chat functionality between patient and doctor",
      "Enable photo uploads (e.g., medical images) to Firebase Storage",
      "Create intuitive healthcare mobile UI with React Native",
    ],
    challenges: [
      "Handling real-time chat state and performance",
      "Managing user authentication securely",
      "Implementing Firebase Storage upload flows",
      "Building role-based views for patients and doctors",
      "Designing mobile UX for healthcare consultation scenarios",
    ],
    learnings: [
      "Firebase integration with React Native (Auth, DB, Storage)",
      "Real-time data sync using Firebase Realtime Database",
      "Managing chat logic and UI state in mobile apps",
      "Deploying mobile apps with sensitive user data (e.g. health-related)",
    ],
    nextSteps: [
      "Integrate video call feature using WebRTC or Jitsi",
      "Add doctor availability scheduling and booking system",
      "Implement push notifications for message alerts",
      "Deploy to Play Store with analytics and crash reporting",
    ],
  },

  // {
  //   id: 7,
  //   title: "Real-time Code Collaboration",
  //   slug: "real-time-code-collaboration",
  //   description:
  //     "WebRTC-powered collaborative code editor with live cursors, syntax highlighting, and integrated voice chat for seamless pair programming.",
  //   category: "prototype",
  //   status: "in-progress",
  //   technologies: ["WebRTC", "Socket.io", "Monaco Editor", "Node.js"],
  //   difficulty: "advanced",
  //   featured: true,
  //   dateCreated: "2024-01-10",
  //   lastUpdated: "2024-01-18",
  //   githubUrl: "#",
  //   tags: ["Collaboration", "Real-time", "WebRTC", "Code Editor"],
  //   icon: Code,
  //   stats: { views: 890, stars: 67, forks: 15 },
  // },
  // {
  //   id: 6,
  //   title: "CSS Animation Playground",
  //   slug: "css-animation-playground",
  //   description:
  //     "Interactive playground for experimenting with CSS animations, transitions, and keyframes with live preview and automatic code generation.",
  //   category: "tool",
  //   status: "completed",
  //   technologies: ["CSS", "JavaScript", "Animation API", "Code Generation"],
  //   difficulty: "intermediate",
  //   featured: true,
  //   dateCreated: "2023-12-20",
  //   lastUpdated: "2024-01-05",
  //   githubUrl: "#",
  //   demoUrl: "#",
  //   blogPostUrl: "#",
  //   tags: ["CSS", "Animation", "Tool", "Playground"],
  //   icon: Sparkles,
  //   stats: { views: 2100, stars: 156, forks: 42 },
  // },
  // {
  //   id: 5,
  //   title: "Voice-Controlled Interface",
  //   slug: "voice-controlled-interface",
  //   description:
  //     "Experimental interface using Web Speech API for hands-free navigation, form filling, and content interaction with natural language processing.",
  //   category: "experiment",
  //   status: "active",
  //   technologies: ["Web Speech API", "Voice Recognition", "React", "NLP"],
  //   difficulty: "advanced",
  //   featured: false,
  //   dateCreated: "2024-01-08",
  //   lastUpdated: "2024-01-16",
  //   githubUrl: "#",
  //   demoUrl: "#",
  //   tags: ["Voice", "Accessibility", "Speech API", "Innovation"],
  //   icon: Brain,
  //   stats: { views: 650, stars: 34, forks: 8 },
  // },
  // {
  //   id: 4,
  //   title: "Micro-Frontend Architecture",
  //   slug: "micro-frontend-architecture",
  //   description:
  //     "Research project exploring micro-frontend patterns with module federation, independent deployments, and shared state management at scale.",
  //   category: "research",
  //   status: "completed",
  //   technologies: ["Module Federation", "Webpack", "React", "Shared State"],
  //   difficulty: "advanced",
  //   featured: false,
  //   dateCreated: "2023-11-15",
  //   lastUpdated: "2023-12-30",
  //   githubUrl: "#",
  //   blogPostUrl: "#",
  //   tags: ["Architecture", "Micro-frontends", "Scalability", "Research"],
  //   icon: Globe,
  //   stats: { views: 1580, stars: 203, forks: 67 },
  // },
  // {
  //   id: 3,
  //   title: "3D Portfolio Showcase",
  //   slug: "3d-portfolio-showcase",
  //   description:
  //     "Immersive 3D portfolio experience using Three.js with interactive models, particle systems, and physics-based animations.",
  //   category: "demo",
  //   status: "in-progress",
  //   technologies: ["Three.js", "WebGL", "GLSL", "React Three Fiber"],
  //   difficulty: "advanced",
  //   featured: false,
  //   dateCreated: "2024-01-01",
  //   lastUpdated: "2024-01-12",
  //   githubUrl: "#",
  //   demoUrl: "#",
  //   tags: ["3D", "WebGL", "Three.js", "Interactive"],
  //   icon: Rocket,
  //   stats: { views: 980, stars: 78, forks: 19 },
  // },
  // {
  //   id: 2,
  //   title: "Performance Monitor",
  //   slug: "performance-monitor",
  //   description:
  //     "Real-time dashboard for monitoring web performance metrics with custom analytics, automated optimization suggestions, and detailed reports.",
  //   category: "tool",
  //   status: "active",
  //   technologies: ["Performance API", "Charts.js", "WebVitals", "Analytics"],
  //   difficulty: "intermediate",
  //   featured: false,
  //   dateCreated: "2023-12-10",
  //   lastUpdated: "2024-01-14",
  //   githubUrl: "#",
  //   demoUrl: "#",
  //   tags: ["Performance", "Monitoring", "Analytics", "Optimization"],
  //   icon: TrendingUp,
  //   stats: { views: 1320, stars: 94, forks: 28 },
  // },
  // {
  //   id: 1,
  //   title: "Gesture Navigation",
  //   slug: "gesture-navigation",
  //   description:
  //     "Concept interface using hand gestures and device motion for navigation, built with MediaPipe and advanced computer vision algorithms.",
  //   category: "concept",
  //   status: "archived",
  //   technologies: ["MediaPipe", "Computer Vision", "Device Motion API", "ML"],
  //   difficulty: "advanced",
  //   featured: false,
  //   dateCreated: "2023-10-20",
  //   lastUpdated: "2023-11-30",
  //   githubUrl: "#",
  //   tags: ["Gestures", "Computer Vision", "Innovation", "Experimental"],
  //   icon: Zap,
  //   stats: { views: 420, stars: 21, forks: 5 },
  // },
]

export const categories = [
  { value: "all", label: "All Projects", count: labProjects.length },
  {
    value: "experiment",
    label: "Experiments",
    count: labProjects.filter((p) => p.category === "experiment").length,
  },
  {
    value: "prototype",
    label: "Prototypes",
    count: labProjects.filter((p) => p.category === "prototype").length,
  },
  {
    value: "research",
    label: "Research",
    count: labProjects.filter((p) => p.category === "research").length,
  },
  {
    value: "tool",
    label: "Tools",
    count: labProjects.filter((p) => p.category === "tool").length,
  },
  {
    value: "demo",
    label: "Demos",
    count: labProjects.filter((p) => p.category === "demo").length,
  },
  {
    value: "concept",
    label: "Concepts",
    count: labProjects.filter((p) => p.category === "concept").length,
  },
]

export const statuses = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In Progress" },
  { value: "archived", label: "Archived" },
]
