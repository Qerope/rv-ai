import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return ""

  // Check if the date is in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const date = new Date(dateString)
    // Return MMM YYYY format (e.g., Jan 2020)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  // If it's just a year or another format, return as is
  return dateString
}

