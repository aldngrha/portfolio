import type { LucideIcon } from "lucide-react"

type Category = "experiment" | "prototype" | "research" | "tool" | "demo" | "concept"
type Status = "active" | "completed" | "archived" | "in-progress"
type Difficulty = "beginner" | "intermediate" | "advanced"
type ViewMode = "list" | "grid"

export interface CardProjectProps {
  id: string | number
  category: string
  year: string | number
  title: string
  slug: string
  description: string
  image?: string | null
  technologies: string[]
  github?: string | null
  link?: string | null
}

export interface LabProject {
  id: number
  title: string
  slug: string
  description: string
  longDescription?: string
  category: Category
  status: Status
  technologies: string[]
  difficulty: Difficulty
  featured: boolean
  dateCreated: string
  lastUpdated: string
  githubUrl?: string
  demoUrl?: string
  blogPostUrl?: string
  tags: string[]
  icon: LucideIcon
  stats?: {
    views: number
    stars: number
    forks: number
  }
  objectives?: string[]
  challenges?: string[]
  learnings?: string[]
  nextSteps?: string[]
}

interface BaseLabCardProps {
  icon: LucideIcon
  title: string
  category: Category
  status: Status
  description: string
  technologies: string[]
  slug: string | number
  githubUrl?: string
  demoUrl?: string
  getCategoryColor: (category: Category) => string
  getStatusColor: (status: Status) => string
}

export interface FeaturedCardLabsProps extends BaseLabCardProps {
  stats?: {
    views: number
    stars: number
    forks: number
  }
  dateCreated: string | number | Date
  lastUpdated: string | number | Date
}

export interface RegularCardLabsProps extends BaseLabCardProps {
  viewMode: ViewMode
}

export interface FilterControlsProps {
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  selectedCategory: string
  selectedStatus: string
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

export interface FilterDropdownProps {
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
}
