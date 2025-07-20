"use client"

import { useState } from "react"
import { HomeView } from "./home-view"
import { LibraryView } from "./library-view"
import { MusicPlayer } from "./music-player"
import { Home, Library } from "lucide-react"

export function MusicApp() {
  const [activeTab, setActiveTab] = useState<"home" | "library">("home")

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex-1 overflow-hidden">
        {activeTab === "home" && <HomeView />}
        {activeTab === "library" && <LibraryView />}
      </div>

      <MusicPlayer />

      {/* Bottom Tab Bar */}
      <div className="flex justify-around items-center py-2 border-t border-gray-800 bg-black">
        <button
          className={`flex flex-col items-center p-2 transition-colors ${
            activeTab === "home" ? "" : "text-gray-400 hover:text-gray-300"
          }`}
          style={{ color: activeTab === "home" ? "#1DB954" : undefined }}
          onClick={() => setActiveTab("home")}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
  
        <button
          className={`flex flex-col items-center p-2 transition-colors ${
            activeTab === "library" ? "" : "text-gray-400 hover:text-gray-300"
          }`}
          style={{ color: activeTab === "library" ? "#1DB954" : undefined }}
          onClick={() => setActiveTab("library")}
        >
          <Library className="h-6 w-6" />
          <span className="text-xs mt-1">Library</span>
        </button>

      </div>
    </div>
  )
}
