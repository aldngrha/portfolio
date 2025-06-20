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
