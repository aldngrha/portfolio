import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LabProject } from "~/interface"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCategoryColor = (category: LabProject["category"]) => {
  switch (category) {
    case "experiment":
      return "bg-soft-blue-50 text-soft-blue-700 dark:bg-soft-blue-900/30 dark:text-soft-blue-400 border-0"
    case "prototype":
      return "bg-soft-blue-50 text-soft-blue-700 dark:bg-soft-blue-900/30 dark:text-soft-blue-400 border-0"
    case "research":
      return "bg-soft-blue-50 text-soft-blue-700 dark:bg-soft-blue-900/30 dark:text-soft-blue-400 border-0"
    case "tool":
      return "bg-soft-blue-50 text-soft-blue-700 dark:bg-soft-blue-900/30 dark:text-soft-blue-400 border-0"
    case "demo":
      return "bg-soft-blue-50 text-soft-blue-700 dark:bg-soft-blue-900/30 dark:text-soft-blue-400 border-0"
    case "concept":
      return "bg-soft-blue-50 text-soft-blue-700 dark:bg-soft-blue-900/30 dark:text-soft-blue-400 border-0"
    default:
      return "bg-soft-blue-50 text-soft-blue-700 dark:bg-soft-blue-900/30 dark:text-soft-blue-400 border-0"
  }
}

export const getStatusColor = (status: LabProject["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0"
    case "completed":
      return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0"
    case "in-progress":
      return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-0"
    case "archived":
      return "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-0"
    default:
      return "bg-soft-blue-50 text-soft-blue-700 dark:bg-soft-blue-900/30 dark:text-soft-blue-400 border-0"
  }
}

export function truncate(str: string, maxLength: number, suffix = ""): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - suffix.length) + suffix
}

export function getBadgeColor(color: string) {
  const map: Record<string, string> = {
    "text-soft-blue-600": "bg-soft-blue-50 dark:bg-soft-blue-900/30 text-soft-blue-700 dark:text-soft-blue-400",
    "text-slate-600": "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    "text-amber-600": "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    "text-green-600": "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    "text-purple-600": "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    "text-indigo-600": "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400",
  };
  return map[color] || "";
}