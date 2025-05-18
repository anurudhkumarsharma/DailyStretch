"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
  isFirstVisit: boolean
}

export default function WelcomeScreen({ onStart, isFirstVisit }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden">
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-teal-200 to-blue-200 dark:from-teal-900 dark:to-blue-900 opacity-20 blur-3xl pulse-animation"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 opacity-20 blur-3xl pulse-animation" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-amber-200 to-emerald-200 dark:from-amber-900 dark:to-emerald-900 opacity-15 blur-3xl pulse-animation" style={{ animationDelay: "2.5s" }}></div>
      </div>

      {/* Content - full page without card boundary */}
      <div className="z-10 text-center px-8 py-16 w-full max-w-4xl mx-auto float-animation">
        <div className="relative z-10 p-4">
          {/* Cool modern logo design */}
          <div className="mx-auto mb-12 relative w-40 h-40">
            {/* Background shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 dark:from-teal-500 dark:to-blue-600 transform rotate-12 rounded-lg shadow-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-blue-500 dark:from-teal-500 dark:to-blue-600 transform -rotate-12 rounded-lg shadow-xl"></div>
            
            {/* Center content */}
            <div className="absolute inset-4 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-teal-300 dark:bg-teal-700 rounded-full opacity-20"></div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-300 dark:bg-blue-700 rounded-full opacity-20"></div>
              
              {/* Text */}
              <div className="relative flex items-center justify-center">
                <span className="text-6xl font-black tracking-tighter bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">D</span>
                <span className="text-6xl font-black tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">S</span>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Animation overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 neu-gradient-text tracking-tight">Daily Stretch</h1>

          <p className="text-xl md:text-2xl mb-12 max-w-lg mx-auto text-gray-700 dark:text-gray-300 leading-relaxed">
            Create personalized stretch routines to improve your flexibility and wellness
          </p>

          <button 
            onClick={onStart} 
            className="text-lg px-10 py-7 neu-button text-white font-medium rounded-2xl transform transition-all hover:scale-105 shadow-lg"
          >
            Build Your Routine <ArrowRight className="inline ml-2" />
          </button>

          {isFirstVisit && (
            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 italic">
              Your routines will be saved automatically for your next visit
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
