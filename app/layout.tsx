import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppStateProvider } from "@/lib/app-state"
import { Providers } from "./providers"
import { WallpaperProvider } from "@/lib/wallpaper-state"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stephanie Portfolio",
  description: "Stephanie Gao's Personal Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <WallpaperProvider>
            <AppStateProvider>{children}</AppStateProvider>
          </WallpaperProvider>
        </Providers>
      </body>
    </html>
  )
}
