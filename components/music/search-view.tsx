"use client"

import type React from "react"

import { useState } from "react"
import { Search, Play, Plus } from "lucide-react"
import { SAMPLE_SONGS, FEATURED_ALBUMS } from "@/lib/music-data"
import { useMusicStore } from "@/lib/music-state"

export function SearchView() {
  const [searchTerm, setSearchTerm] = useState("")
  const { setCurrentSong, setIsPlaying, addToQueue } = useMusicStore()

  const filteredSongs = SAMPLE_SONGS.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAlbums = FEATURED_ALBUMS.filter(
    (album) =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSongClick = (song: any) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const handleAddToQueue = (song: any, e: React.MouseEvent) => {
    e.stopPropagation()
    addToQueue(song)
  }

  return (
    <div className="h-full overflow-auto bg-black">
      <div className="px-4 pt-14 pb-4">
        <h1 className="text-2xl font-bold text-white mb-4">Search</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1DB954] placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {!searchTerm ? (
        // Browse categories when no search term
        <div className="px-4">
          <h2 className="text-xl font-bold text-white mb-4">Browse all</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Made for you", color: "bg-purple-600" },
              { name: "Recently played", color: "bg-green-600" },
              { name: "Liked songs", color: "bg-blue-600" },
              { name: "Albums", color: "bg-red-600" },
              { name: "Artists", color: "bg-orange-600" },
              { name: "Podcasts", color: "bg-teal-600" },
            ].map((category) => (
              <div
                key={category.name}
                className={`${category.color} rounded-lg p-4 h-24 relative overflow-hidden cursor-pointer hover:brightness-110 transition-all`}
              >
                <h3 className="font-bold text-white text-sm">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Search results
        <div className="px-4">
          {/* Songs */}
          {filteredSongs.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
              <div className="space-y-2">
                {filteredSongs.map((song) => (
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
          )}

          {/* Albums */}
          {filteredAlbums.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Albums</h2>
              <div className="grid grid-cols-2 gap-3">
                {filteredAlbums.map((album) => (
                  <div
                    key={album.id}
                    className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={album.artwork || "/placeholder.svg?height=120&width=120"}
                      alt={album.title}
                      className="w-full aspect-square rounded-lg mb-2 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=120&width=120"
                      }}
                    />
                    <h3 className="font-medium text-white text-sm truncate">{album.title}</h3>
                    <p className="text-gray-400 text-xs truncate">{album.artist}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {filteredSongs.length === 0 && filteredAlbums.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No results found</p>
              <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
