import type { Stretch } from "./types"

export const defaultStretches: Stretch[] = [
  {
    id: "hamstring",
    name: "Hamstring Stretch",
    description: "Stretches the back of your thighs. Sit with legs extended and reach for your toes.",
    animationName: "hamstring",
    duration: 30,
    imageSrc: "/hamstring-stretch.gif"
  },
  {
    id: "shoulder",
    name: "Shoulder Stretch",
    description: "Relieves tension in shoulders and upper back. Pull one arm across your chest.",
    animationName: "shoulder",
    duration: 30,
    imageSrc: "/shoulder-stretch.gif"
  },
  {
    id: "quad",
    name: "Quad Stretch",
    description: "Stretches the front of your thighs. Stand and pull your foot toward your buttocks.",
    animationName: "quad",
    duration: 30,
    imageSrc: "/quad-stretch.gif"
  },
  {
    id: "calf",
    name: "Quadriceps Stretch",
    description: "Stretches your lower legs. Step forward and press your heel down.",
    animationName: "calf",
    duration: 30,
  },
  {
    id: "neck",
    name: "Neck Stretch",
    description: "Relieves tension in your neck. Gently tilt your head to each side.",
    animationName: "neck",
    duration: 30,
  },
  {
    id: "back",
    name: "Standing Pigeon",
    description: "Stretches your lower back. Lie on your back and hug your knees to your chest.",
    animationName: "back",
    duration: 30,
  },
  {
    id: "hip",
    name: "Standing Fire Hydrant",
    description: "Opens up your hips. Kneel and lunge forward with one leg.",
    animationName: "hip",
    duration: 30,
  },
  {
    id: "yoga-pose",
    name: "Elevated Mountain Climbers",
    description: "A full-body yoga pose that stretches your hamstrings, calves, and shoulders.",
    animationName: "yoga-pose",
    duration: 30,
  },
  {
    id: "stretch-side",
    name: "Cervical Retraction",
    description: "Stretches your obliques and intercostal muscles. Reach overhead and lean to one side.",
    animationName: "stretch-side",
    duration: 30,
  },
  {
    id: "stretch-forward",
    name: "Overhead Reach",
    description: "Stretches your entire posterior chain. Stand and bend forward at the hips.",
    animationName: "stretch-forward",
    duration: 30,
  },
]
