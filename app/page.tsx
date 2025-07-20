"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HomeScreen } from "@/components/home-screen"
import { AppView } from "@/components/app-view"
import { useAppState } from "@/lib/app-state"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { IPhoneFrame } from "@/components/iphone-frame"
import { ControlCenter } from "@/components/control-center/control-center"
import { SwipeDetector } from "@/components/swipe-detector"

export default function IPhoneInterface() {
  const { currentApp, openControlCenter } = useAppState()
  const [time, setTime] = useState(new Date())
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center justify-center min-h-screen p-4 transition-all duration-500 select-none bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900 dark:via-indigo-950 dark:to-purple-900">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="!rounded-full"
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Portfolio name */}
      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <h1
          className="text-7xl font-bold text-gray-800 dark:text-gray-200 tracking-wide"
          style={{ fontFamily: "Brush Script MT, cursive" }}
        >
          Stephanie Gao
        </h1>

      </div>

      {/* iPhone frame */}
      <IPhoneFrame>
        <SwipeDetector>
          <div className="relative h-full pt-12 overflow-hidden">
            <AnimatePresence mode="wait">
              {currentApp ? (
                <motion.div
                  key={`app-${currentApp}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 rounded-[26px]"
                >
                  <AppView appId={currentApp} />
                </motion.div>
              ) : (
                <motion.div
                  key="home-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-[26px]"
                  style={{
                    backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Azure-9Ax4tYYD2NK3Y9BWyohSWE63jMX9eo.webp)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <HomeScreen time={time} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Control Center */}
            <ControlCenter />
          </div>
        </SwipeDetector>
      </IPhoneFrame>
    </div>
  )
}
