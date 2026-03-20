// ─── Domain Types ───────────────────────────────────────────────────────────

export interface Work {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  thumbnail_url: string | null
  images: WorkImage[]
  tags: string[]
  tech_stack: string[]
  category: WorkCategory
  status: 'live' | 'archived' | 'wip'
  live_url: string | null
  github_url: string | null
  year: number
  role: string
  featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface WorkImage {
  id: string
  url: string
  caption: string | null
  sort_order: number
}

export type WorkCategory = 'web_app' | 'blockchain' | 'mobile' | 'open_source' | 'other'

export interface LabImage {
  id: string
  lab_id: string
  url: string
  caption: string | null
  sort_order: number
}

export interface Lab {
  id: string
  slug: string
  title: string
  description: string
  tags: string[]
  category: LabCategory
  status: 'done' | 'wip' | 'abandoned'
  github_url: string | null
  demo_url: string | null
  images: LabImage[]
  sort_order: number
  created_at: string
  updated_at: string
}

export type LabCategory = 'blockchain' | 'web' | 'cli' | 'other'

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  category: string
  cover_url: string | null
  read_time: number
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

// ─── API Response Types ──────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  error: string
  code?: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

// ─── UI Types ────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark'
export type Locale = 'en' | 'id'

export interface NavItem {
  label: string
  href: string
  active?: boolean
}
