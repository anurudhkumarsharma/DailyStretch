"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Input } from "@/components/ui/input"
import { Trash2, Clock, GripVertical } from "lucide-react"
import StretchAnimation from "@/components/stretch-animation"
import type { Stretch } from "@/lib/types"

interface SortableStretchCardProps {
  stretch: Stretch
  onRemove: () => void
  onDurationChange: (duration: number) => void
}

export default function SortableStretchCard({ stretch, onRemove, onDurationChange }: SortableStretchCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: stretch.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="neu-card relative rounded-xl overflow-hidden transition-all hover:shadow-lg group"
    >
      <div className="flex items-stretch">
        <div
          className="flex items-center px-3 cursor-grab bg-gray-50 dark:bg-gray-700 border-r hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
        </div>

        <div className="flex-1 p-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <StretchAnimation name={stretch.animationName} />
            </div>

            <div className="flex-1">
              <h3 className="font-medium font-montserrat text-lg">{stretch.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{stretch.description}</p>

              <div className="flex items-center gap-3 mt-3">
                <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="5"
                    max="300"
                    value={stretch.duration}
                    onChange={(e) => onDurationChange(Number.parseInt(e.target.value) || 30)}
                    className="w-20 h-8 shadow-neu-inset-light dark:shadow-neu-inset-dark border-none bg-transparent text-center font-medium"
                    aria-label="Duration in seconds"
                  />
                  <span className="text-sm font-medium">seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-0 border-l border-gray-100 dark:border-gray-800">
          <button
            onClick={onRemove}
            className="h-full px-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group-hover:text-red-600 dark:group-hover:text-red-400"
            aria-label="Remove stretch"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
