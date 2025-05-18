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
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-teal-200 to-blue-200 dark:from-teal-900 dark:to-blue-900 opacity-20 blur-3xl pulse-animation"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 opacity-20 blur-3xl pulse-animation" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-amber-200 to-emerald-200 dark:from-amber-900 dark:to-emerald-900 opacity-15 blur-3xl pulse-animation" style={{ animationDelay: "2.5s" }}></div>
        
        {/* Additional subtle patterns */}
        <div className="absolute bottom-[30%] left-[15%] w-[20%] h-[20%] rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-900 dark:to-cyan-900 opacity-10 blur-3xl pulse-animation" style={{ animationDelay: "3s" }}></div>
        <div className="absolute top-[20%] right-[35%] w-[15%] h-[15%] rounded-full bg-gradient-to-br from-rose-200 to-orange-200 dark:from-rose-900 dark:to-orange-900 opacity-10 blur-3xl pulse-animation" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Content - full page without card boundary */}
      <div className="z-10 text-center px-8 py-16 w-full max-w-4xl mx-auto float-animation">
        <div className="relative z-10 p-4 backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-3xl">
          {/* Cool modern logo design with stretch animation on hover */}
          <div className="mx-auto mb-12 relative w-44 h-44 group cursor-pointer transition-all duration-300 hover:-translate-y-2">
            {/* Background shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 dark:from-teal-500 dark:to-blue-600 transform rotate-12 rounded-lg shadow-xl group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-blue-500 dark:from-teal-500 dark:to-blue-600 transform -rotate-12 rounded-lg shadow-xl group-hover:-rotate-6 transition-transform duration-500"></div>
            
            {/* Center content */}
            <div className="absolute inset-4 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-inner overflow-hidden backdrop-blur-sm">
              {/* Decorative elements */}
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-teal-300 dark:bg-teal-700 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-300 dark:bg-blue-700 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              
              {/* Stretch figure animation (shown on hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full p-4 text-blue-500 dark:text-blue-400">
                  <g className="animate-stretch">
                    {/* Head */}
                    <circle cx="50" cy="20" r="8" fill="currentColor" />
                    {/* Body */}
                    <line x1="50" y1="28" x2="50" y2="60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    {/* Arms */}
                    <line x1="50" y1="40" x2="30" y2="35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="origin-[50px_40px] animate-armStretch" />
                    <line x1="50" y1="40" x2="70" y2="35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="origin-[50px_40px] animate-armStretch2" />
                    {/* Legs */}
                    <line x1="50" y1="60" x2="35" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="origin-[50px_60px] animate-legStretch" />
                    <line x1="50" y1="60" x2="65" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="origin-[50px_60px] animate-legStretch2" />
                  </g>
                </svg>
              </div>
              
              {/* Text */}
              <div className="relative flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                <span className="text-7xl font-black tracking-tighter bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">D</span>
                <span className="text-7xl font-black tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">S</span>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full group-hover:animate-pulse"></div>
              </div>
            </div>
            
            {/* Animation overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 neu-gradient-text tracking-tight drop-shadow-sm">Daily Stretch</h1>

          <p className="text-xl md:text-2xl mb-12 max-w-lg mx-auto text-gray-700 dark:text-gray-300 leading-relaxed font-light">
            Create personalized stretch routines to improve your flexibility and wellness
          </p>

          <button 
            onClick={onStart} 
            className="text-lg px-10 py-5 neu-button text-white font-medium rounded-2xl transform transition-all hover:scale-105 shadow-lg hover-lift group"
          >
            <span className="relative z-10 flex items-center">
              Build Your Routine 
              <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
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
