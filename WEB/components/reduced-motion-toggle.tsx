"use client"

import { useState, useEffect } from "react"

export function ReducedMotionToggle() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
  }, [])

  useEffect(() => {
    if (reduced) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }, [reduced])

  return (
    <button
      onClick={() => setReduced(!reduced)}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border border-border/40 px-3 py-2 text-xs text-muted-foreground transition-all hover:border-cf-blue/40 hover:text-cf-blue"
      style={{ backgroundColor: "rgba(30, 30, 30, 0.9)" }}
      aria-label={reduced ? "Enable animations" : "Reduce motion"}
    >
      <svg
        viewBox="0 0 16 16"
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {reduced ? (
          <path d="M2 8h12M5 4l3 4-3 4M11 4l-3 4 3 4" />
        ) : (
          <path d="M4 8h8M8 4v8" />
        )}
      </svg>
      {reduced ? "Enable motion" : "Reduce motion"}
    </button>
  )
}
