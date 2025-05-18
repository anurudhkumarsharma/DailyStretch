"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import RoutineBuilder from "@/components/routine-builder"
import RoutinePlayer from "@/components/routine-player"
import WelcomeScreen from "@/components/welcome-screen"
import type { Stretch } from "@/lib/types"
import { defaultStretches } from "@/lib/data"
import { exportRoutine, importRoutineFromUrl } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Share2, RefreshCw, LayoutDashboard } from "lucide-react"
import { HomeIcon } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [view, setView] = useState<"welcome" | "builder" | "player">("welcome")
  const [routine, setRoutine] = useState<Stretch[]>([])
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  // Check for imported routine from URL
  useEffect(() => {
    const importedRoutine = importRoutineFromUrl()
    if (importedRoutine) {
      setRoutine(importedRoutine)
      setView("builder")
      setIsFirstVisit(false)
    } else {
      // Load from localStorage if available
      const savedRoutine = localStorage.getItem("stretchRoutine")
      if (savedRoutine) {
        try {
          setRoutine(JSON.parse(savedRoutine))
          setIsFirstVisit(false)
        } catch (e) {
          console.error("Failed to parse saved routine", e)
        }
      }
    }
  }, [])

  // Save routine to localStorage whenever it changes
  useEffect(() => {
    if (routine.length > 0) {
      localStorage.setItem("stretchRoutine", JSON.stringify(routine))
    }
  }, [routine])

  const handleStartRoutine = () => {
    if (routine.length > 0) {
      setView("player")
    }
  }

  const handleShareRoutine = () => {
    exportRoutine(routine)
  }

  const handleResetRoutine = () => {
    if (confirm("Are you sure you want to reset your routine? This cannot be undone.")) {
      setRoutine([])
      localStorage.removeItem("stretchRoutine")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {view === "welcome" && <WelcomeScreen onStart={() => setView("builder")} isFirstVisit={isFirstVisit} />}

      {view === "builder" && (
        <div className="container max-w-5xl px-4 py-10">
          <div className="flex justify-between items-center mb-8">
            <div
              onClick={() => setView("welcome")}
              className="px-4 py-2 rounded-xl neu-card shadow-neu-light dark:shadow-neu-dark hover:shadow-lg transition-all flex items-center cursor-pointer"
            >
              <HomeIcon className="mr-2 h-5 w-5" />
              Back to Home
            </div>
            <h1 className="text-4xl font-bold text-center neu-gradient-text font-montserrat tracking-tight">
              Build Your Routine
            </h1>
            <div className="w-[120px]"></div> {/* Empty div for spacing */}
          </div>

          <RoutineBuilder routine={routine} setRoutine={setRoutine} availableStretches={defaultStretches} />

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button
              onClick={handleStartRoutine}
              disabled={routine.length === 0}
              className="px-8 py-4 neu-button text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transform transition-transform hover:scale-105 flex items-center"
            >
              <ArrowRight className="mr-2 h-5 w-5" /> 
              Start Routine
            </button>
            <button
              onClick={handleShareRoutine}
              disabled={routine.length === 0}
              className="px-8 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-neu-light dark:shadow-neu-dark hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-transform hover:scale-105 flex items-center"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share Routine
            </button>
            <button
              onClick={handleResetRoutine}
              disabled={routine.length === 0}
              className="px-8 py-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-800/30 disabled:opacity-50 disabled:cursor-not-allowed transform transition-transform hover:scale-105 flex items-center"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Reset Routine
            </button>
          </div>
        </div>
      )}

      {view === "player" && (
        <div className="w-full">
          <RoutinePlayer routine={routine} onExit={() => setView("builder")} />
        </div>
      )}
    </main>
  )
}
