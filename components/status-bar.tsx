import { Signal, Wifi } from "lucide-react"
import { formatTime } from "@/lib/utils"

interface StatusBarProps {
  time: Date
  dark?: boolean
}

export function StatusBar({ time, dark = false }: StatusBarProps) {
  return (
    <div
      className={`flex justify-between items-center px-6 pt-3 pb-1 text-sm font-medium select-none ${dark ? "text-white" : "text-black"}`}
    >
      <div>{formatTime(time, false)}</div>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <div className="relative">
          {/* Battery body */}
          <div className={`w-6 h-2.5 border rounded-sm ${dark ? "border-white" : "border-black"}`}>
            {/* Battery fill - showing ~80% charge */}
            <div className={`h-full w-4/5 rounded-sm ${dark ? "bg-white" : "bg-black"}`} />
          </div>
          {/* Battery tip */}
          <div className={`absolute -right-0.5 top-0.5 w-0.5 h-1.5 rounded-r-sm ${dark ? "bg-white" : "bg-black"}`} />
        </div>
      </div>
    </div>
  )
}
