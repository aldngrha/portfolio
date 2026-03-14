// ─── Date ────────────────────────────────────────────────────────────────────

export function formatDate(dateStr: string, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'short',
  }).format(new Date(dateStr))
}

export function formatDateFull(dateStr: string, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}

// ─── String ──────────────────────────────────────────────────────────────────

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

export function readTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// ─── URL ─────────────────────────────────────────────────────────────────────

export function buildSearchParams(params: Record<string, string | number | boolean | undefined>): string {
  const sp = new URLSearchParams()
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== '') {
      sp.set(key, String(val))
    }
  }
  return sp.toString()
}

// ─── Class names ─────────────────────────────────────────────────────────────

export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
