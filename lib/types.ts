export interface Stretch {
  id: string
  name: string
  description: string
  animationName: string
  duration: number
}

export type RoutineState = "welcome" | "builder" | "player"
