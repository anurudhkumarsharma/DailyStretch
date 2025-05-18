"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// Get the stretch data to check for image path
import { defaultStretches } from "@/lib/data" 

interface StretchAnimationProps {
  name: string
  fullScreen?: boolean
  isActive?: boolean
  duration?: number
}

export default function StretchAnimation({
  name,
  fullScreen = false,
  isActive = true,
  duration = 30,
}: StretchAnimationProps) {
  const [frame, setFrame] = useState(0)

  // Check if this stretch has an image
  const stretch = defaultStretches.find(s => s.animationName === name)
  const hasImage = !!stretch?.imageSrc

  // Simple animation loop (only used for SVG fallback)
  useEffect(() => {
    if (!isActive || hasImage) return

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4)
    }, 750) // Change animation frame every 750ms

    return () => clearInterval(interval)
  }, [isActive, hasImage])

  // Map stretch name to a color (for SVG fallback)
  const getColor = () => {
    const colors = {
      "yoga-pose": "bg-blue-500", // Elevated Mountain Climbers
      "stretch-side": "bg-green-500", // Cervical Retraction
      "stretch-forward": "bg-purple-500", // Overhead Reach
      hamstring: "bg-yellow-500",
      shoulder: "bg-pink-500",
      back: "bg-teal-500", // Standing Pigeon
      neck: "bg-indigo-500",
      quad: "bg-orange-500",
      calf: "bg-cyan-500", // Air Squat
      hip: "bg-rose-500", // Standing Fire Hydrant
    }
    return colors[name as keyof typeof colors] || "bg-gray-500"
  }

  // Show GIF if available, otherwise fallback to SVG
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "w-full h-full" : "w-full aspect-square"}`}
      aria-label={`Animation of ${name} stretch`}
    >
      {hasImage ? (
        // Display GIF image
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <Image 
            src={stretch!.imageSrc!}
            alt={`${stretch!.name} demonstration`}
            className="object-cover rounded-lg" 
            fill={true}
            sizes={fullScreen ? "(max-width: 768px) 100vw, 700px" : "(max-width: 768px) 100vw, 200px"}
            priority={fullScreen}
          />
        </div>
      ) : (
        // Fallback to original SVG animation
        <div className={`relative ${getColor()} bg-opacity-20 rounded-full p-4 flex items-center justify-center`}>
          <svg viewBox="0 0 100 100" className={`${fullScreen ? "w-64 h-64" : "w-full h-full max-w-[200px]"}`}>
            {/* Simple stick figure in different poses based on the frame */}
            {frame === 0 && (
              <>
                {/* Head */}
                <circle cx="50" cy="30" r="10" fill="currentColor" />
                {/* Body */}
                <line x1="50" y1="40" x2="50" y2="70" stroke="currentColor" strokeWidth="4" />
                {/* Arms */}
                <line x1="50" y1="50" x2="30" y2="60" stroke="currentColor" strokeWidth="4" />
                <line x1="50" y1="50" x2="70" y2="60" stroke="currentColor" strokeWidth="4" />
                {/* Legs */}
                <line x1="50" y1="70" x2="35" y2="90" stroke="currentColor" strokeWidth="4" />
                <line x1="50" y1="70" x2="65" y2="90" stroke="currentColor" strokeWidth="4" />
              </>
            )}
            {frame === 1 && (
              <>
                {/* Head */}
                <circle cx="50" cy="30" r="10" fill="currentColor" />
                {/* Body */}
                <line x1="50" y1="40" x2="50" y2="70" stroke="currentColor" strokeWidth="4" />
                {/* Arms stretched up */}
                <line x1="50" y1="50" x2="30" y2="40" stroke="currentColor" strokeWidth="4" />
                <line x1="50" y1="50" x2="70" y2="40" stroke="currentColor" strokeWidth="4" />
                {/* Legs */}
                <line x1="50" y1="70" x2="30" y2="85" stroke="currentColor" strokeWidth="4" />
                <line x1="50" y1="70" x2="70" y2="85" stroke="currentColor" strokeWidth="4" />
              </>
            )}
            {frame === 2 && (
              <>
                {/* Head */}
                <circle cx="50" cy="30" r="10" fill="currentColor" />
                {/* Body leaning */}
                <line x1="50" y1="40" x2="60" y2="70" stroke="currentColor" strokeWidth="4" />
                {/* Arms */}
                <line x1="55" y1="55" x2="35" y2="65" stroke="currentColor" strokeWidth="4" />
                <line x1="55" y1="55" x2="75" y2="45" stroke="currentColor" strokeWidth="4" />
                {/* Legs */}
                <line x1="60" y1="70" x2="40" y2="85" stroke="currentColor" strokeWidth="4" />
                <line x1="60" y1="70" x2="75" y2="90" stroke="currentColor" strokeWidth="4" />
              </>
            )}
            {frame === 3 && (
              <>
                {/* Head */}
                <circle cx="50" cy="40" r="10" fill="currentColor" />
                {/* Body bending */}
                <line x1="50" y1="50" x2="50" y2="70" stroke="currentColor" strokeWidth="4" />
                {/* Arms reaching down */}
                <line x1="50" y1="60" x2="30" y2="75" stroke="currentColor" strokeWidth="4" />
                <line x1="50" y1="60" x2="70" y2="75" stroke="currentColor" strokeWidth="4" />
                {/* Legs */}
                <line x1="50" y1="70" x2="35" y2="90" stroke="currentColor" strokeWidth="4" />
                <line x1="50" y1="70" x2="65" y2="90" stroke="currentColor" strokeWidth="4" />
              </>
            )}
          </svg>
        </div>
      )}
    </div>
  )
}
