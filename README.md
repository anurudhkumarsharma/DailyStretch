# Daily Stretch

<div align="center">
  <img src="public/placeholder-logo.svg" alt="Daily Stretch Logo" width="120" style="border-radius: 20px;" />

  <h3 align="center">Create personalized stretch routines for better flexibility and wellness</h3>

  <p align="center">
    A modern web application to build and follow custom stretching routines
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="https://dailystretch.netlify.app/">Features</a>
    ·
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

## About The Project

Daily Stretch is a beautifully designed web application that helps users create personalized stretching routines. Whether you're looking to improve flexibility, reduce muscle tension, or incorporate quick exercise breaks into your day, Daily Stretch provides an intuitive interface to build, customize, and follow stretching routines.

### Built With

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [DND Kit](https://dndkit.com/) - Drag and drop toolkit for React
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark/light mode support
- [Lucide React](https://lucide.dev/) - Beautiful, consistent icons
- [Google Fonts](https://fonts.google.com/) - Montserrat and Nunito fonts

## Features

- **Beautifully designed UI** with glassmorphism and neumorphic styling
- **Drag and drop routine builder** to create custom stretch sequences
- **Visual GIF demonstrations** for each stretch exercise
- **Interactive routine player** with timer and auto-advance features
- **Progress tracking** to monitor completed stretches
- **Responsive design** for all devices (mobile, tablet, desktop)
- **Dark/light mode** with system preference detection
- **Persistent routines** saved to local storage

### Exercise Library

The application includes a diverse set of exercises:
- Hamstring Stretch
- Shoulder Stretch
- Quad Stretch
- Air Squat
- Neck Stretch
- Reverse Lunge
- Standing Fire Hydrant
- Mountain Climbers
- Cervical Retraction
- Overhead Reach

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your-username/daily-stretch.git
   cd daily-stretch
   ```

2. Install dependencies
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server
   ```sh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Building for Production

```sh
npm run build
# or
yarn build
# or
pnpm build
```

## Usage

1. **Welcome Screen**: Start by clicking "Build Your Routine"
2. **Adding Stretches**: Browse available stretches and add them to your routine
3. **Customizing**: Drag to reorder stretches and set duration for each (minimum 10 seconds)
4. **Starting Routine**: Click play to start following your stretch routine
5. **During Workout**: Follow along with the visual guides and timer
6. **Settings**: Toggle auto-advance to automatically move to the next stretch

## Project Structure

```
daily-stretch/
├── app/                  # Next.js app router pages
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── routine-builder/  # Routine builder components
│   ├── routine-player/   # Routine player components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and types
├── public/               # Static assets (GIFs, images)
├── styles/               # Global styles
```

## Design Elements

The application features a modern design with:

- **Glassmorphism**: Translucent card components with blur effects
- **Neumorphic design**: Soft, realistic 3D UI elements
- **Gradient backgrounds**: Subtle color transitions for visual interest
- **Micro-interactions**: Hover effects, animations, and transitions
- **Typography**: Montserrat for headings and Nunito for body text

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Exercise GIFs and descriptions are for demonstration purposes
- Design inspiration from modern UI/UX trends 
