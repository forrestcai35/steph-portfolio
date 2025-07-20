"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type AppState = {
  currentApp: string | null
  controlCenterOpen: boolean
  openApp: (appId: string) => void
  closeApp: () => void
  openControlCenter: () => void
  closeControlCenter: () => void
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [currentApp, setCurrentApp] = useState<string | null>(null)
  const [controlCenterOpen, setControlCenterOpen] = useState(false)

  const openApp = (appId: string) => {
    setCurrentApp(appId)
  }

  const closeApp = () => {
    setCurrentApp(null)
  }

  const openControlCenter = () => {
    setControlCenterOpen(true)
  }

  const closeControlCenter = () => {
    setControlCenterOpen(false)
  }

  return (
    <AppStateContext.Provider
      value={{
        currentApp,
        controlCenterOpen,
        openApp,
        closeApp,
        openControlCenter,
        closeControlCenter,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider")
  }
  return context
}
