import {
  // Zap,
  // Sparkles,
  // Rocket,
  // Brain,
  Link2,
  Pizza,
  Stethoscope,
  PlaneTakeoff,
  Mic,
  Coins, Truck, Code, Database, Lightbulb, Users, ShieldCheck, Smartphone,
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
    name: "Remix",
    icon: "data:image/jpeg;base64,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"
  },
  {
    name: "Solidity",
    icon: "https://docs.soliditylang.org/en/latest/_images/solidity_logo.svg",
  },
]

export const techCategories = [
  {
    title: "Frontend",
    icon: Code,
    items: [
      "React.js",
      "Vue.js",
      "Svelte.js",
      "Next.js",
      "Remix.js",
      "Nuxt.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "CSS3",
      "HTML5",
      "Zustand",
      "Redux",
    ],
    color: "text-soft-blue-600",
  },
  {
    title: "Backend",
    icon: Database,
    items: ["Node.js", "Express.js", "Hono.js", "Golang", "Redis", "Firebase", "Supabase", "PostgreSQL", "MongoDB", "Prisma"],
    color: "text-slate-600",
  },
  {
    title: "Mobile",
    icon: Smartphone,
    items: ["React Native", "Kotlin", "Swift"],
    color: "text-indigo-600", // bisa disesuaikan tone warnanya
  },
  {
    title: "Blockchain",
    icon: ShieldCheck,
    items: ["Solidity", "Web3.js", "Ethers.js", "Hardhat"],
    color: "text-amber-600",
  },
  {
    title: "Tools",
    icon: Users,
    items: ["Git", "VS Code", "Figma", "Vercel", "Docker", "Postman", "Jetbrains", "Jira", "Slack", "Trello"],
    color: "text-green-600",
  },
  {
    title: "Practices",
    icon: Lightbulb,
    items: [
      "Semantic Versioning",
      "Git Flow",
      "Code Reviews",
      "Testing",
      "CI/CD",
      "Accessibility (a11y)",
      "Mobile-First Design",
      "Performance Optimization",
      "Design System",
    ],
    color: "text-purple-600",
  },
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Self Employed",
    period: "2022 - Present",
    description:
      "Developed responsive web and mobile apps for diverse clients, collaborating closely with designers and backend teams.",
  },
  {
    role: "Software Engineer & Sustainability Support",
    company: "PT Sumber Kurnia Alam",
    period: "2025 - Present",
    description:
      "Contributed as a Software Engineer and Sustainability Support by building and maintaining internal web systems, supporting sustainability initiatives, and collaborating with cross-functional teams.",
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
    role: "Software Engineer & Sustainability Support",
    company: "PT Sumber Kurnia Alam",
    location: "Bandar Lampung, Indonesia",
    period: "2025 - Present",
    description: [
      "Develop and maintain export data management features aligned with 4C and EUDR requirements.",
      "Implement geospatial mapping features using point and polygon data for plot visualization and validation.",
      "Collaborate with sustainability and operations teams to ensure data accuracy and compliance readiness.",
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
    id: 7,
    title: "Blockchain Logistics Tracker",
    slug: "blockchain-logistics-tracker",
    description:
      "A logistics tracker built with smart contracts on Ethereum Sepolia, designed to explore how blockchain can improve delivery systems.",
    longDescription: `This project is my introduction to building decentralized logistics systems using blockchain. I created a smart contract called TrackingDelivery to keep records of delivery activity in a way that's transparent and tamper-proof.

Each package is identified by a unique ID and includes information like sender and recipient addresses, timestamps for when it's sent and received, and a status that shows where it is in the process. Only the original sender can update the status, and every update emits an event that can be used to build real-time tracking in a frontend.

I wrote the contract in Solidity and deployed it using Hardhat on the Ethereum Sepolia testnet. The contract is fully verified on Etherscan, so anyone can view the code and follow the transactions.

Right now, this is purely an on-chain system. I haven’t built the backend or frontend yet, but I plan to use MetaMask for wallet connection and build a dashboard where users can search for delivery status by package ID.

This project helps me understand how blockchain can be used to solve real-world problems. It’s not just a coding exercise — it's part of a bigger goal to rethink how trust and transparency can be designed into everyday systems.`,
    category: "experiment",
    status: "completed",
    technologies: [
      "Solidity",
      "Hardhat",
      "Ethereum Sepolia",
      "Etherscan",
    ],
    difficulty: "intermediate",
    featured: true,
    dateCreated: "2025-06-25",
    lastUpdated: "2025-07-14",
    githubUrl: "https://github.com/aldngrha/tracking-delivery",
    demoUrl: "https://sepolia.etherscan.io/address/0x555E44Bf5A6743A7d51f4C96E531a109C4Ccdb6C",
    blogPostUrl: null,
    image: "/assets/images/bc.jpg",
    tags: [
      "Web3",
      "Solidity",
      "Logistics",
      "Blockchain",
      "Smart Contract",
      "Ethereum",
    ],
    icon: Truck,
    objectives: [
      "Build a smart contract to track delivery status on-chain",
      "Design status states using enums for clarity and logic",
      "Ensure only the sender can update package status",
      "Log timestamps for dispatch and delivery on the blockchain",
      "Emit events for each update to support frontend integration",
      "Make the contract open and verifiable on Etherscan",
    ],
    challenges: [
      "Avoid duplicate deliveries by checking unique package IDs",
      "Enforce sender-only access for status updates",
      "Keep the contract structure simple and gas efficient",
      "Translate real-world delivery logic into Solidity code",
    ],
    learnings: [
      "Using Hardhat to compile, deploy, and verify smart contracts",
      "Working with enums and modifiers for cleaner access control",
      "Designing contract events that support live frontend updates",
      "Understanding how to verify contracts and make them public",
    ],
    nextSteps: [
      "Develop a simple frontend with package tracking by ID",
      "Add MetaMask wallet connection to manage sender roles",
      "Create a backend to index and search delivery data",
      "Add support for full delivery history with multiple status events",
      "Write documentation for contributors and future improvements",
    ],
  },
  {
    id: 6,
    title: "Decentralized Crowdfunding with Web3",
    slug: "decentralized-crowdfunding-with-web3",
    description:
      "A crowdfunding DApp experiment using React, Solidity, and Thirdweb — now with MetaMask integration and Sepolia testnet deployment.",
    longDescription: `This project is my deep dive into the world of blockchain and Web3 — a study in building decentralized applications that solve real-world problems through transparent, immutable technology.

The use case: crowdfunding. Instead of relying on centralized platforms, I built a DApp where campaign creators can launch fundraising goals and contributors can fund transparently — all powered by smart contracts on the Ethereum Sepolia testnet.

One major milestone was successfully integrating wallet connection with MetaMask. Users can now connect their wallets, view their public address, and sign transactions directly from the app. I also implemented a network detection and switching feature to guide users seamlessly to the Sepolia testnet if they're on the wrong network.

On the frontend, I used React with Thirdweb SDK for simplified contract interaction. The backend logic lives in Solidity smart contracts, tested and deployed using Hardhat. All contributions are on-chain, ensuring transparency and eliminating intermediaries.

This isn’t just about code. It's about reimagining trust on the internet. A space where people fund ideas without gatekeepers. A world where smart contracts enforce fairness. And for me — a step toward mastering decentralized systems, one block at a time.`,
    category: "prototype",
    status: "completed",
    technologies: [
      "Solidity",
      "Hardhat",
      "React.js",
      "Thirdweb",
      "Tailwind CSS",
      "Ethereum Sepolia",
      "MetaMask",
      "Ethers.js",
      "Smart Contracts",
    ],
    difficulty: "intermediate",
    featured: true,
    dateCreated: "2025-06-18",
    lastUpdated: "2025-07-02",
    githubUrl: "https://github.com/aldngrha/crowd-funding",
    demoUrl: null,
    blogPostUrl: null,
    image: null,
    tags: [
      "Web3",
      "Solidity",
      "Crowdfunding",
      "Blockchain",
      "React",
      "Thirdweb",
      "Ethereum",
      "MetaMask",
    ],
    icon: Coins,
    objectives: [
      "Understand smart contract development using Solidity",
      "Deploy and test contracts with Hardhat on Sepolia testnet",
      "Integrate MetaMask wallet connection in the frontend",
      "Auto-detect and switch to Sepolia network",
      "Design a transparent and trustless crowdfunding system",
      "Explore on-chain data flow and contributor accountability",
    ],
    challenges: [
      "Gas optimization and contract efficiency",
      "Handling contract interactions with connected wallets",
      "Ensuring smooth network switching for non-technical users",
      "Managing testnet limitations like ETH faucet rate",
      "Building intuitive UI for crypto and non-crypto users",
    ],
    learnings: [
      "How MetaMask enables secure wallet-based auth and tx",
      "Best practices in Web3 onboarding and UX",
      "Deploying smart contracts using Hardhat",
      "Frontend <-> smart contract bridging via Thirdweb",
      "Designing trustless funding logic with Solidity",
    ],
    nextSteps: [
      "Add DAO-style moderation and campaign approval logic",
      "Implement milestone-based funding release system",
      "Support more chains like Polygon Mumbai for scalability",
      "Add unit and integration tests for core contract flows",
      "Write a dev blog to document technical decisions and gotchas",
    ],
  },
  {
    id: 5,
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
    id: 4,
    title: "AI-Powered Mock Interview Platform",
    slug: "ai-mock-interview-nextjs-vapi",
    description:
      "A full-stack project combining Next.js, Firebase, and Vapi AI to create a smart mock interview system with real-time feedback and voice-based interaction.",
    longDescription: `Prepwise is an AI-enhanced platform that helps users simulate real job interviews with intelligent voice agents. It’s designed not just as a tool, but as a learning experiment — diving into how conversational AI and modern web frameworks can come together.

The project leverages Next.js for both the frontend and backend logic, Firebase for authentication and real-time Firestore storage, and Vapi AI for voice-based interviews powered by large language models (LLMs). Styling is handled by Tailwind CSS and shadcn/ui, providing a clean and responsive design.

What sets this project apart is the integration of real-time feedback via Gemini and voice agents, giving users an experience that feels like speaking to a real interviewer. It’s a step toward building more human-centric AI applications — ones that listen, respond, and evolve.

I learn from [this YouTube video](https://www.youtube.com/watch?v=8GK8R77Bd7g&t=6767s).`,
    category: "prototype",
    status: "in-progress",
    technologies: [
      "Next.js",
      "Firebase",
      "Tailwind CSS",
      "Vapi AI",
      "shadcn/ui",
      "Zod",
      "Google Gemini",
    ],
    difficulty: "intermediate",
    featured: true,
    dateCreated: "2025-05-15",
    lastUpdated: "2025-06-22",
    githubUrl: "https://github.com/aldngrha/mock_interviews",
    demoUrl: null,
    blogPostUrl: null,
    image: "/assets/images/prepwise.jpg",
    tags: [
      "Next.js",
      "AI",
      "Vapi",
      "Firebase",
      "LLM",
      "Voice AI",
      "Mock Interview",
      "Gemini",
      "Tailwind CSS",
    ],
    icon: Mic,
    objectives: [
      "Integrate voice-based AI agents into a web application",
      "Build real-time feedback systems using LLMs like Gemini",
      "Design a modular, maintainable codebase in Next.js",
      "Explore full-stack authentication and data persistence with Firebase",
      "Craft intuitive, accessible UI using shadcn/ui and Tailwind",
    ],
    challenges: [
      "Synchronizing audio input with real-time Gemini feedback",
      "Managing authentication state and protected routes in Next.js",
      "Handling Vapi's async response streams gracefully",
      "Scaling Firebase reads/writes for multiple sessions",
    ],
    learnings: [
      "How to build AI-integrated tools with real conversational UX",
      "Connecting voice agents like Vapi to client-side apps",
      "Best practices for Firebase + Next.js full-stack architecture",
      "Improving usability and accessibility in AI-driven UI",
    ],
    nextSteps: [
      "Add role-based access control (e.g. admin vs. candidate)",
      "Implement session replays and analytics dashboard",
      "Introduce multilingual support for non-English interviews",
      "Experiment with fine-tuned feedback based on emotion/tone detection",
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
