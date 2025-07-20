"use client"

import { create } from "zustand"
import type { Song } from "./types"

interface MusicState {
  currentSong: Song | null
  isPlaying: boolean
  queue: Song[]
  showMusicIsland: boolean
  setCurrentSong: (song: Song | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  addToQueue: (song: Song) => void
  removeFromQueue: (songId: string) => void
  clearQueue: () => void
  playNextSong: () => void
  playPreviousSong: () => void
  toggleMusicIsland: (show: boolean) => void
}

export const useMusicStore = create<MusicState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  showMusicIsland: false,
  setCurrentSong: (song) => set({ currentSong: song }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  addToQueue: (song) => set((state) => ({ queue: [...state.queue, song] })),
  removeFromQueue: (songId) =>
    set((state) => ({
      queue: state.queue.filter((song) => song.id !== songId),
    })),
  clearQueue: () => set({ queue: [] }),
  playNextSong: () => {
    const { queue, currentSong } = get()
    if (queue.length > 0) {
      set({ currentSong: queue[0], queue: queue.slice(1) })
    }
  },
  playPreviousSong: () => {
    // Basic implementation - could be enhanced with history
    console.log("Previous song not implemented")
  },
  toggleMusicIsland: (show) => set({ showMusicIsland: show }),
}))
