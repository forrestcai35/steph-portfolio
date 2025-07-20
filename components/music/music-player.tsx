"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, SkipBack, SkipForward, List } from "lucide-react"
import { useMusicStore } from "@/lib/music-state"
import { QueueView } from "./queue-view"

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [showQueue, setShowQueue] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const { currentSong, isPlaying, setIsPlaying, queue } = useMusicStore()

  // Handle play/pause
  const togglePlayback = async () => {
    if (!audioRef.current || audioError) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error("Play error:", error)
          if (error instanceof DOMException) {
            if (error.name === "NotSupportedError") {
              console.error("Format not supported")
            } else if (error.name === "NotAllowedError") {
              console.error("User interaction required")
            }
          }
          setIsPlaying(false)
          setAudioError(true)
        }
      }
    } catch (error) {
      console.error("Playback error:", error)
      setIsPlaying(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Update progress
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    audio.addEventListener("timeupdate", updateProgress)
    return () => audio.removeEventListener("timeupdate", updateProgress)
  }, [currentSong])

  // Handle song end
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleSongEnd = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio.addEventListener("ended", handleSongEnd)
    return () => audio.removeEventListener("ended", handleSongEnd)
  }, [setIsPlaying])

  // Handle new song
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    setAudioError(false)
    audio.src = currentSong.audioUrl
    audio.load()

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Auto-play failed:", error)
        setIsPlaying(false)
        setAudioError(true)
      })
    }
  }, [currentSong, isPlaying, setIsPlaying])

  if (!currentSong) {
    return (
      <div className="h-16 bg-gray-900 border-t border-gray-800 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No song selected</p>
      </div>
    )
  }

  return (
    <>
      <audio ref={audioRef} />
      <div className="bg-gray-900 border-t border-gray-800 p-3">
        {/* Progress Bar */}
        <div className="w-full bg-gray-600 rounded-full h-1 mb-3">
          <div
            className="bg-[#1DB954] h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center flex-1 min-w-0">
            <img
              src={currentSong.albumArt || "/placeholder.svg?height=40&width=40"}
              alt={currentSong.title}
              className="w-10 h-10 rounded-md mr-3 object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=40&width=40"
              }}
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-white text-sm truncate">{currentSong.title}</h3>
              <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlayback}
              disabled={isLoading || audioError}
              className="bg-[#1DB954] text-black rounded-full p-2 hover:bg-[#1ed760] transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowQueue(true)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {audioError && (
          <div className="mt-2 p-2 bg-red-900 border border-red-700 rounded text-red-200 text-xs">
            Audio playback error. The track may not be available.
          </div>
        )}
      </div>

      {/* Queue View */}
      <QueueView isOpen={showQueue} onClose={() => setShowQueue(false)} />
    </>
  )
}
