"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full transition-transform hover:scale-110 w-10 h-10 flex items-center justify-center relative"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
        <Moon className="absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
      </div>
    </button>
  )
}
