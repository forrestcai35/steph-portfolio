"use client"

import type React from "react"

import { useState } from "react"
import { Grid, List, Plus, Play, Download, ArrowUpDown } from "lucide-react"
import { SAMPLE_SONGS, FEATURED_ALBUMS } from "@/lib/music-data"
import { useMusicStore } from "@/lib/music-state"

export function LibraryView() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "playlists" | "albums" | "artists">("all")
  const { setCurrentSong, setIsPlaying, addToQueue } = useMusicStore()

  const handleSongClick = (song: any) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const handleAddToQueue = (song: any, e: React.MouseEvent) => {
    e.stopPropagation()
    addToQueue(song)
  }

  const filters = [
    { id: "all", label: "All" },
    { id: "playlists", label: "Playlists" },
    { id: "albums", label: "Albums" },
    { id: "artists", label: "Artists" },
  ] as const

  return (
    <div className="h-full overflow-auto bg-black">
      <div className="px-4 pt-14 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Your Library</h1>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Plus className="h-6 w-6" />
            </button>
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {viewMode === "grid" ? <List className="h-6 w-6" /> : <Grid className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === filter.id
                  ? "bg-[#1DB954] text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort Button */}
        <div className="flex items-center gap-2 mb-4">
          <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <ArrowUpDown className="h-4 w-4" />
            <span className="text-sm">Recently added</span>
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="px-4 mb-6">
        <div className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
            <Download className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-white text-sm">Downloaded</h3>
            <p className="text-gray-400 text-xs">5 songs</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg mr-3 flex items-center justify-center">
            <Play className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-white text-sm">Liked Songs</h3>
            <p className="text-gray-400 text-xs">{SAMPLE_SONGS.length} songs</p>
          </div>
        </div>
      </div>

      {/* Albums/Playlists */}
      <div className="px-4">
        <div className="space-y-3">
          {FEATURED_ALBUMS.map((album) => (
            <div
              key={album.id}
              className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <img
                src={album.artwork || "/placeholder.svg?height=50&width=50"}
                alt={album.title}
                className="w-12 h-12 rounded-lg mr-3 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=50&width=50"
                }}
              />
              <div className="flex-1">
                <h3 className="font-medium text-white text-sm">{album.title}</h3>
                <p className="text-gray-400 text-xs">Album • {album.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Added Songs */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold text-white mb-4">Recently Added</h2>
        <div className="space-y-2">
          {SAMPLE_SONGS.slice(0, 10).map((song) => (
            <div
              key={song.id}
              className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => handleSongClick(song)}
            >
              <img
                src={song.albumArt || "/placeholder.svg?height=50&width=50"}
                alt={song.title}
                className="w-12 h-12 rounded-lg mr-3 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=50&width=50"
                }}
              />
              <div className="flex-1">
                <h3 className="font-medium text-white text-sm">{song.title}</h3>
                <p className="text-gray-400 text-xs">{song.artist}</p>
              </div>
              <button
                className="p-2 text-gray-400 hover:text-[#1DB954] transition-colors"
                onClick={(e) => handleAddToQueue(song, e)}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
