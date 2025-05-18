import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Nunito } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Define fonts
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap", 
})

export const metadata: Metadata = {
  title: "Daily Stretch - Personalized Stretch Routines",
  description: "Create personalized stretch routines to improve your flexibility and wellness",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${nunito.variable}`}>
      <body className={`font-nunito`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
