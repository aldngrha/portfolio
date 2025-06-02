import { Code, Coffee, Lightbulb, Music, Palette, Users } from "lucide-react"

export const techSkills = [
  { name: "React", icon: "/placeholder.svg?height=24&width=24" },
  { name: "Next.js", icon: "/placeholder.svg?height=24&width=24" },
  { name: "TypeScript", icon: "/placeholder.svg?height=24&width=24" },
  { name: "JavaScript", icon: "/placeholder.svg?height=24&width=24" },
  { name: "HTML5", icon: "/placeholder.svg?height=24&width=24" },
  { name: "CSS3", icon: "/placeholder.svg?height=24&width=24" },
  { name: "Tailwind CSS", icon: "/placeholder.svg?height=24&width=24" },
  { name: "Node.js", icon: "/placeholder.svg?height=24&width=24" },
  { name: "Git", icon: "/placeholder.svg?height=24&width=24" },
  { name: "Figma", icon: "/placeholder.svg?height=24&width=24" },
]

export const experience = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description:
      "Leading frontend development for enterprise applications, mentoring junior developers, and implementing design systems.",
  },
  {
    role: "Frontend Developer",
    company: "Digital Agency",
    period: "2020 - 2022",
    description:
      "Built responsive web applications for various clients, collaborated with designers and backend teams.",
  },
  {
    role: "Junior Developer",
    company: "Startup Hub",
    period: "2019 - 2020",
    description:
      "Developed user interfaces, learned modern web technologies, and contributed to open-source projects.",
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
    id: 1,
    title: "Public Service Platform",
    description:
      "A modern web application streamlining government services for citizens with intuitive design and efficient workflows.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    category: "Web Application",
    year: "2024",
  },
  {
    id: 2,
    title: "Task Management System",
    description:
      "Collaborative workspace for teams with real-time updates, project tracking, and seamless communication.",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
    category: "Web Application",
    year: "2023",
  },
  {
    id: 3,
    title: "E-Commerce Dashboard",
    description:
      "Analytics dashboard for online retailers with comprehensive reporting and inventory management features.",
    technologies: ["React", "Chart.js", "Express", "PostgreSQL"],
    category: "Dashboard",
    year: "2023",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Clean and minimal portfolio website showcasing work and thoughts with responsive design.",
    technologies: ["Next.js", "Tailwind CSS", "MDX"],
    category: "Website",
    year: "2024",
  },
]

export const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Jakarta, Indonesia",
    period: "2022 - Present",
    description: [
      "Led frontend development for enterprise applications serving 50,000+ users",
      "Mentored junior developers and implemented modern design systems",
      "Reduced load times by 40% through performance optimization",
      "Collaborated with UX designers to improve user satisfaction by 25%",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Digital Agency",
    location: "Jakarta, Indonesia",
    period: "2020 - 2022",
    description: [
      "Built responsive web applications for 15+ clients across various industries",
      "Implemented component libraries that increased development speed by 30%",
      "Collaborated with designers and backend teams in agile environment",
      "Maintained high code quality through testing and code reviews",
    ],
  },
  {
    role: "Junior Developer",
    company: "Startup Hub",
    location: "Jakarta, Indonesia",
    period: "2019 - 2020",
    description: [
      "Developed user interfaces for early-stage startups",
      "Learned modern web technologies and best practices",
      "Contributed to open-source projects to improve skills",
      "Participated in code reviews and team knowledge sharing",
    ],
  },
]

export const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "University of Technology",
    location: "Jakarta, Indonesia",
    period: "2015 - 2019",
    description: "Graduated with honors. Specialized in software engineering and web development.",
  },
]

export const certifications = [
  {
    name: "Advanced React & Redux",
    issuer: "Frontend Masters",
    year: "2023",
  },
  {
    name: "Web Accessibility",
    issuer: "Interaction Design Foundation",
    year: "2022",
  },
  {
    name: "UI/UX Design Fundamentals",
    issuer: "Design Academy",
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
    "Accessibility",
  ],
  soft: [
    "Problem Solving",
    "Communication",
    "Team Collaboration",
    "Time Management",
    "Mentoring",
    "Project Planning",
    "User Empathy",
  ],
}
