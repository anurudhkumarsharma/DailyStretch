"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Home as HomeIcon } from "lucide-react"
import StretchAnimation from "@/components/stretch-animation"
import type { Stretch } from "@/lib/types"
import { cn } from "@/lib/utils"

interface RoutinePlayerProps {
  routine: Stretch[]
  onExit: () => void
}

export default function RoutinePlayer({ routine, onExit }: RoutinePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(routine[0]?.duration || 30)
  const [isPlaying, setIsPlaying] = useState(true)
  const [autoAdvance, setAutoAdvance] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [completedStretches, setCompletedStretches] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const currentStretch = routine[currentIndex]
  
  // Log current stretch for debugging
  useEffect(() => {
    console.log("Current stretch:", currentStretch)
  }, [currentStretch])
  const totalDuration = routine.reduce((acc, stretch) => acc + stretch.duration, 0)
  const elapsedDuration =
    routine.slice(0, currentIndex).reduce((acc, stretch) => acc + stretch.duration, 0) +
    (currentStretch?.duration - timeRemaining)

  const overallProgress = (elapsedDuration / totalDuration) * 100
  const currentProgress = ((currentStretch?.duration - timeRemaining) / currentStretch?.duration) * 100

  // Set up timer
  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      // Stretch completed - properly increment counter
      setCompletedStretches((prev) => 
        Math.max(prev, currentIndex + 1)
      )

      // Show "Great job!" message
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 1500)

      // Move to next stretch or end routine
      if (currentIndex < routine.length - 1 && autoAdvance) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1)
          setTimeRemaining(routine[currentIndex + 1].duration)
          setIsPlaying(true)
        }, 1500)
      } else if (currentIndex < routine.length - 1 && !autoAdvance) {
        setIsPlaying(false)
      } else {
        // Routine completed
        setIsPlaying(false)
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isPlaying, timeRemaining, currentIndex, routine, autoAdvance])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ": // Space
          e.preventDefault()
          setIsPlaying((prev) => !prev)
          break
        case "ArrowRight":
          e.preventDefault()
          handleNext()
          break
        case "ArrowLeft":
          e.preventDefault()
          handlePrevious()
          break
        case "r":
          e.preventDefault()
          handleReset()
          break
        case "Escape":
          e.preventDefault()
          onExit()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, routine])

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const handleNext = () => {
    if (currentIndex < routine.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex)
      setTimeRemaining(routine[nextIndex].duration)
      setIsPlaying(true)
      
      // Update completed count when going forward
      setCompletedStretches(prev => 
        Math.max(prev, nextIndex)
      );
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex)
      setTimeRemaining(routine[prevIndex].duration)
      setIsPlaying(true)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setTimeRemaining(routine[0].duration)
    setIsPlaying(false)
    setCompletedStretches(0)
    setShowMessage(false)
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full p-4 overflow-hidden">
      {/* Decorative background elements - matching routine-builder.tsx */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-blue-200/30 dark:from-teal-900/20 dark:to-blue-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full blur-3xl -z-10"></div>
      
      {/* Overall progress */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Progress value={overallProgress} className="h-1.5 rounded-none bg-gray-200/50 dark:bg-gray-700/50 overflow-hidden relative progress-shine">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </Progress>
      </div>

      {/* Back button */}
      <div
        onClick={onExit}
        className="absolute top-4 left-4 z-20 px-4 py-2 rounded-xl neu-card shadow-neu-light dark:shadow-neu-dark hover:shadow-lg transition-all flex items-center cursor-pointer hover-lift"
        style={{ position: 'absolute', top: '16px', left: '16px' }}
      >
        <HomeIcon className="mr-2 h-5 w-5" />
        Back
      </div>

      <div className="w-full max-w-md mx-auto mt-16 relative">
        {/* Stretch info */}
        <div className="text-center mb-6 relative">
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-teal-300/10 to-blue-300/10 dark:from-teal-700/10 dark:to-blue-700/10 rounded-full blur-xl"></div>
          <h2 className="text-4xl font-bold font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 drop-shadow-sm">{currentStretch?.name}</h2>
          <p className="text-muted-foreground mt-2 font-medium">
            Stretch {currentIndex + 1} of {routine.length}
          </p>
        </div>

        {/* Animation */}
        <Card className="mb-6 relative overflow-hidden neu-card w-full shadow-xl">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-teal-400/10 to-blue-400/10 dark:from-teal-900/10 dark:to-blue-900/10 rounded-full -z-1 transition-transform"></div>
          <div className="absolute left-0 bottom-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full -z-1 transition-transform"></div>
          <CardContent className="p-0 w-full">
            {currentStretch?.animationName && 
              <div className="aspect-[4/3] relative">
                <StretchAnimation 
                  name={currentStretch.animationName} 
                  isActive={isPlaying} 
                  fullScreen={true} 
                />
              </div>
            }

            {/* "Great job!" message overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br from-green-500/90 to-emerald-600/90 flex items-center justify-center transition-all duration-500",
                showMessage ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none",
              )}
            >
              <div className="text-center">
                <h3 className="text-white text-4xl font-bold animate-bounce drop-shadow-md">Great job!</h3>
                <div className="mt-3 flex justify-center">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="inline-block mx-1.5 size-3 rounded-full bg-yellow-300 animate-pulse shadow-sm"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current stretch progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-600 dark:text-gray-300">Current stretch progress</span>
            <span className="font-mono bg-gray-100 dark:bg-gray-800/60 px-2 py-0.5 rounded-md text-gray-700 dark:text-gray-300">{formatTime(timeRemaining)}</span>
          </div>
          <Progress value={currentProgress} className="h-3 rounded-full neu-inset overflow-hidden relative progress-shine">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300"
              style={{ width: `${currentProgress}%` }}
            ></div>
          </Progress>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous stretch"
            className="rounded-xl h-12 w-12 border-gray-200 dark:border-gray-700 hover-lift"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            className="h-14 w-14 rounded-full neu-button shadow-lg"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === routine.length - 1}
            aria-label="Next stretch"
            className="rounded-xl h-12 w-12 border-gray-200 dark:border-gray-700 hover-lift"
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleReset} 
            aria-label="Reset routine"
            className="rounded-xl h-12 w-12 border-gray-200 dark:border-gray-700 hover-lift"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {/* Auto-advance toggle and completion stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/20 p-4 rounded-xl border border-gray-100 dark:border-gray-800/30 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <Switch id="auto-advance" checked={autoAdvance} onCheckedChange={setAutoAdvance} className="data-[state=checked]:bg-gradient-to-r from-teal-500 to-blue-500" />
            <Label htmlFor="auto-advance" className="font-medium cursor-pointer">Auto-advance to next stretch</Label>
          </div>

          <div className="text-sm font-medium">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs rounded-full shadow-sm">
                {completedStretches}
              </span>
              <span>of {routine.length} completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
