export interface Stretch {
  id: string
  name: string
  description: string
  animationName: string
  duration: number
  imageSrc?: string // Optional path to GIF or image file
}

export type RoutineState = "welcome" | "builder" | "player"
