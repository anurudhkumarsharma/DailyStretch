"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, Pause, SkipForward, SkipBack, X, RotateCcw } from "lucide-react"
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
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [completedStretches, setCompletedStretches] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const currentStretch = routine[currentIndex]
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
      // Stretch completed
      setCompletedStretches((prev) => prev + 1)

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
      setCurrentIndex((prev) => prev + 1)
      setTimeRemaining(routine[currentIndex + 1].duration)
      setIsPlaying(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setTimeRemaining(routine[currentIndex - 1].duration)
      setIsPlaying(true)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setTimeRemaining(routine[0].duration)
    setIsPlaying(false)
    setCompletedStretches(0)
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      {/* Overall progress */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Progress value={overallProgress} className="h-1 rounded-none bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </Progress>
      </div>

      {/* Exit button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-2 right-2 z-20"
        onClick={onExit}
        aria-label="Exit routine"
      >
        <X className="h-5 w-5" />
      </Button>

      <div className="w-full max-w-md mx-auto">
        {/* Stretch info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{currentStretch?.name}</h2>
          <p className="text-muted-foreground">
            Stretch {currentIndex + 1} of {routine.length}
          </p>
        </div>

        {/* Animation */}
        <Card className="mb-6 relative overflow-hidden neu-card">
          <CardContent className="p-6">
            <StretchAnimation name={currentStretch?.animationName} isActive={isPlaying} />

            {/* "Great job!" message overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-green-500 bg-opacity-80 flex items-center justify-center transition-opacity duration-300",
                showMessage ? "opacity-100" : "opacity-0 pointer-events-none",
              )}
            >
              <h3 className="text-white text-3xl font-bold">Great job!</h3>
            </div>
          </CardContent>
        </Card>

        {/* Current stretch progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Current stretch progress</span>
            <span className="font-mono">{formatTime(timeRemaining)}</span>
          </div>
          <Progress value={currentProgress} className="h-3 rounded-full neu-inset overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300"
              style={{ width: `${currentProgress}%` }}
            ></div>
          </Progress>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous stretch"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            className="h-12 w-12 rounded-full neu-button"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === routine.length - 1}
            aria-label="Next stretch"
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          <Button variant="outline" size="icon" onClick={handleReset} aria-label="Reset routine">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {/* Auto-advance toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="auto-advance" checked={autoAdvance} onCheckedChange={setAutoAdvance} />
            <Label htmlFor="auto-advance">Auto-advance to next stretch</Label>
          </div>

          <div className="text-sm text-muted-foreground">
            {completedStretches}/{routine.length} done
          </div>
        </div>
      </div>
    </div>
  )
}
