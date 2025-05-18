import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Stretch } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Export routine as URL with encoded JSON
export function exportRoutine(routine: Stretch[]) {
  try {
    const routineData = JSON.stringify(routine)
    const encodedData = encodeURIComponent(routineData)
    const url = `${window.location.origin}?routine=${encodedData}`

    // Copy to clipboard
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Routine link copied to clipboard! Share it with others.")
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err)
        // Fallback
        prompt("Copy this link to share your routine:", url)
      })
  } catch (error) {
    console.error("Error exporting routine:", error)
    alert("Failed to create shareable link.")
  }
}

// Import routine from URL
export function importRoutineFromUrl(): Stretch[] | null {
  try {
    if (typeof window === "undefined") return null

    const params = new URLSearchParams(window.location.search)
    const routineParam = params.get("routine")

    if (!routineParam) return null

    const decodedData = decodeURIComponent(routineParam)
    const routine = JSON.parse(decodedData) as Stretch[]

    // Clean URL after import
    window.history.replaceState({}, document.title, window.location.pathname)

    return routine
  } catch (error) {
    console.error("Error importing routine:", error)
    return null
  }
}
