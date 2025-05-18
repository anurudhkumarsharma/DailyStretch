"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Clock, DumbbellIcon, Sparkles, Check } from "lucide-react"
import SortableStretchCard from "@/components/sortable-stretch-card"
import StretchAnimation from "@/components/stretch-animation"
import type { Stretch } from "@/lib/types"

interface RoutineBuilderProps {
  routine: Stretch[]
  setRoutine: React.Dispatch<React.SetStateAction<Stretch[]>>
  availableStretches: Stretch[]
}

export default function RoutineBuilder({ routine, setRoutine, availableStretches }: RoutineBuilderProps) {
  const [activeTab, setActiveTab] = useState("routine")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setRoutine((currentRoutine) => {
        const oldIndex = currentRoutine.findIndex((item) => item.id === active.id)
        const newIndex = currentRoutine.findIndex((item) => item.id === over.id)
        if (oldIndex === -1 || newIndex === -1) return currentRoutine
        return arrayMove(currentRoutine, oldIndex, newIndex)
      })
    }
  }

  const addStretchToRoutine = (stretch: Stretch) => {
    // Add with a unique ID
    const newStretch = {
      ...stretch,
      id: `${stretch.id}-${Date.now()}`,
      duration: 30, // Default duration
    }
    setRoutine((prevRoutine) => [...prevRoutine, newStretch])
    setActiveTab("routine") // Switch to routine tab after adding
  }

  const removeStretchFromRoutine = (id: string) => {
    setRoutine((prevRoutine) => prevRoutine.filter((stretch) => stretch.id !== id))
  }

  const updateStretchDuration = (id: string, duration: number) => {
    setRoutine((prevRoutine) => 
      prevRoutine.map((stretch) => (stretch.id === id ? { ...stretch, duration } : stretch))
    )
  }

  // Calculate total routine time
  const totalSeconds = routine.reduce((acc, stretch) => acc + stretch.duration, 0)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = totalSeconds % 60

  return (
    <div className="w-full relative">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-teal-200/30 to-blue-200/30 dark:from-teal-900/20 dark:to-blue-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl -z-10"></div>

      <Tabs defaultValue="routine" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 neu-card p-2 shadow-neu-light dark:shadow-neu-dark bg-transparent rounded-2xl h-16 overflow-hidden">
          <TabsTrigger 
            value="routine" 
            className="data-[state=active]:shadow-neu-inset-light dark:data-[state=active]:shadow-neu-inset-dark data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-50 data-[state=active]:to-blue-50 dark:data-[state=active]:from-teal-900/30 dark:data-[state=active]:to-blue-900/30 rounded-xl text-base font-medium flex items-center justify-center h-12 transition-all"
          >
            <span className="inline-flex items-center">
              <DumbbellIcon className="w-5 h-5 mr-2 text-teal-500 dark:text-teal-400" />
              Your Routine {routine.length > 0 && <span className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-xs px-2 py-0.5">{routine.length}</span>}
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="stretches" 
            className="data-[state=active]:shadow-neu-inset-light dark:data-[state=active]:shadow-neu-inset-dark data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-50 data-[state=active]:to-blue-50 dark:data-[state=active]:from-teal-900/30 dark:data-[state=active]:to-blue-900/30 rounded-xl text-base font-medium flex items-center justify-center h-12 transition-all"
          >
            <span className="inline-flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
              Available Stretches
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="routine" className="space-y-5">
          {routine.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-xl glass-card transition-all hover:scale-[1.01] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              <div className="absolute right-4 top-4 w-20 h-20 bg-teal-400/10 dark:bg-teal-900/10 rounded-full -z-10"></div>
              <div className="absolute left-4 bottom-4 w-16 h-16 bg-blue-400/10 dark:bg-blue-900/10 rounded-full -z-10"></div>
              
              <p className="text-muted-foreground mb-2 font-medium">Your routine is empty</p>
              <p className="text-sm text-muted-foreground/70 mb-8 max-w-md mx-auto">Start building your personalized stretch routine by adding stretches</p>
              <button 
                onClick={() => setActiveTab("stretches")} 
                className="neu-button px-6 py-3 text-white font-medium rounded-xl relative overflow-hidden group-hover:scale-105 transition-transform"
              >
                <span className="relative z-10 flex items-center">
                  <Plus className="inline mr-2 h-5 w-5" /> Add Stretches
                </span>
              </button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={routine.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {routine.map((stretch) => (
                    <SortableStretchCard
                      key={stretch.id}
                      stretch={stretch}
                      onRemove={() => removeStretchFromRoutine(stretch.id)}
                      onDurationChange={(duration) => updateStretchDuration(stretch.id, duration)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="neu-card px-6 py-4 rounded-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                <p className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-teal-500 dark:text-teal-400" /> Total Time:
                </p>
                <p className="text-2xl font-bold neu-gradient-text">
                  {totalMinutes}m {remainingSeconds}s
                </p>
              </div>
              
              <button
                onClick={() => setActiveTab("stretches")}
                className="neu-button px-5 py-3 text-white rounded-xl hover:scale-105 transition-all relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Plus className="inline mr-2 h-5 w-5" /> Add More
                </span>
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stretches">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {availableStretches.map((stretch) => {
              // Check if stretch is already in routine by comparing IDs
              const isAlreadyAdded = routine.some(item => item.id.startsWith(stretch.id));
              
              return (
                <div 
                  key={stretch.id} 
                  className={`neu-card overflow-hidden rounded-xl transition-all ${!isAlreadyAdded ? "hover:scale-[1.02] hover:-translate-y-1" : "opacity-70"} relative group`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
                  <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-teal-400/10 to-blue-400/10 dark:from-teal-900/10 dark:to-blue-900/10 rounded-full -z-1 transition-transform group-hover:scale-150"></div>
                  
                  {isAlreadyAdded && (
                    <div className="absolute right-3 top-3 bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                      Added
                    </div>
                  )}
                  
                  <div className="p-5">
                    <h3 className="font-bold text-xl font-montserrat">{stretch.name}</h3>
                  </div>
                  <div className="p-5 pt-2 relative">
                    <div className="w-full h-52 mb-3 overflow-hidden rounded-lg p-0">
                      <StretchAnimation name={stretch.animationName} />
                    </div>
                    <p className="text-sm text-muted-foreground">{stretch.description}</p>
                  </div>
                  <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <button 
                      onClick={() => !isAlreadyAdded && addStretchToRoutine(stretch)} 
                      disabled={isAlreadyAdded}
                      className={`w-full py-3 rounded-xl font-medium relative overflow-hidden ${
                        isAlreadyAdded 
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" 
                          : "neu-button text-white"
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isAlreadyAdded ? (
                          <>
                            <Check className="inline mr-2 h-4 w-4" /> Already Added
                          </>
                        ) : (
                          <>
                            <Plus className="inline mr-2 h-4 w-4" /> Add to Routine
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
