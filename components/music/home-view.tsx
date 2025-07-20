"use client"

import type React from "react"

import { useState } from "react"
import { MoreVertical, Plus, Play } from "lucide-react"
import { FEATURED_ALBUMS, SAMPLE_SONGS } from "@/lib/music-data"
import { useMusicStore } from "@/lib/music-state"

export function HomeView() {
  const { setCurrentSong, setIsPlaying, addToQueue } = useMusicStore()
  const [showOptions, setShowOptions] = useState<string | null>(null)

  const handleAlbumClick = (albumId: string) => {
    const album = FEATURED_ALBUMS.find((album) => album.id === albumId)
    if (album && album.songs.length > 0) {
      setCurrentSong(album.songs[0])
      setIsPlaying(true)
    }
  }

  const handleAddToQueue = (songId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const song = SAMPLE_SONGS.find((song) => song.id === songId)
    if (song) {
      addToQueue(song)
      setShowOptions(null)
    }
  }

  return (
    <div className="h-full overflow-auto bg-black">
      <div className="px-4 pt-14 pb-4">
        <h1 className="text-2xl font-bold text-white">Spotify</h1>
      </div>

      {/* Featured Section */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-xl p-4 text-white">
          <h2 className="text-sm font-medium mb-2">FEATURED PLAYLIST</h2>
          <div className="flex items-center">
            <img
              src={FEATURED_ALBUMS[0].artwork || "/placeholder.svg?height=80&width=80"}
              alt={FEATURED_ALBUMS[0].title}
              className="w-20 h-20 rounded-lg mr-4 object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=80&width=80"
              }}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{FEATURED_ALBUMS[0].title}</h3>
              <p className="text-white/80 text-sm">{FEATURED_ALBUMS[0].artist}</p>
              <div className="flex items-center mt-2">
                <button
                  className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
                  onClick={() => handleAlbumClick(FEATURED_ALBUMS[0].id)}
                >
                  <Play className="h-5 w-5 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Played */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 gap-3">
          {FEATURED_ALBUMS.slice(0, 6).map((album) => (
            <div
              key={album.id}
              className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => handleAlbumClick(album.id)}
            >
              <img
                src={album.artwork || "/placeholder.svg?height=60&width=60"}
                alt={album.title}
                className="w-full aspect-square rounded-lg mb-2 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=60&width=60"
                }}
              />
              <h3 className="font-medium text-white text-sm truncate">{album.title}</h3>
              <p className="text-gray-400 text-xs truncate">{album.artist}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Jump back in */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Jump back in</h2>
        <div className="space-y-3">
          {SAMPLE_SONGS.slice(0, 5).map((song) => (
            <div
              key={song.id}
              className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => {
                setCurrentSong(song)
                setIsPlaying(true)
              }}
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
                className="p-2 text-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowOptions(showOptions === song.id ? null : song.id)
                }}
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              {showOptions === song.id && (
                <div className="absolute right-4 mt-2 bg-gray-700 rounded-lg shadow-lg py-2 z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                    onClick={(e) => handleAddToQueue(song.id, e)}
                  >
                    Add to queue
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
