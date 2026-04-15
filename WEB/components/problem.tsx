"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AlertTriangle, Wifi, Cpu, RefreshCw, Clock } from "lucide-react"

const crisisData = [
  {
    metric: "API Requests to CF",
    original: "40,000 requests (one per user)",
    impact: "Massive server load on Codeforces",
  },
  {
    metric: "Data Transfer",
    original: "40,000 \u00D7 40,000 = 1.6 billion records",
    impact: "Extremely high bandwidth consumption",
  },
  {
    metric: "Client Computation",
    original: "Each user runs calculations independently",
    impact: "Browser performance degradation",
  },
  {
    metric: "Refresh Cost",
    original: "Full re-download + re-calculation",
    impact: "Poor user experience",
  },
]

const consequences = [
  {
    icon: AlertTriangle,
    text: "Submission queues slow down when CF servers are overloaded by rating queries",
  },
  {
    icon: Wifi,
    text: "CF API absorbs 40,000 redundant requests for the exact same data during contests",
  },
  {
    icon: Clock,
    text: "Users wait 10-30+ seconds for results they could get in under one second",
  },
  {
    icon: Cpu,
    text: "Browser tabs freeze while running heavy FFT computation client-side",
  },
  {
    icon: RefreshCw,
    text: "Every manual refresh re-downloads 40K records and compounds the load further",
  },
]

export function Problem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="problem" className="relative px-6 py-24 md:py-32 scroll-mt-20" ref={ref} style={{ perspective: "1200px" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section heading – 3D entrance from top */}
        <motion.div
          initial={{ y: 40, opacity: 0, rotateX: 15 }}
          animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="inline-block rounded-full border border-red-500/30 px-4 py-1.5 text-xs font-medium text-red-400 mb-4 uppercase tracking-widest">
            The Problem
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Submissions shouldn{"'"}t wait for rating queries
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Codeforces already handles massive load during contests {"\u2014"} judging
            submissions, updating standings, and keeping contests fair in real time.
            Constant rating-change queries during this window add unnecessary
            pressure to the same infrastructure. When 40,000 users each
            independently fetch 40,000 participant records:
          </p>
        </motion.div>

        {/* Crisis data table – slides in from LEFT with 3D tilt */}
        <motion.div
          initial={{ x: -80, opacity: 0, rotateY: -12 }}
          animate={isInView ? { x: 0, opacity: 1, rotateY: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-xl border border-border/30 overflow-hidden mb-12"
          style={{ backgroundColor: "rgba(30, 30, 30, 0.6)", transformStyle: "preserve-3d" }}
        >
          {/* Table header */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-border/20 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <span>Metric</span>
            <span>Original Carrot</span>
            <span>Impact</span>
          </div>
          {/* Table rows */}
          {crisisData.map((row, i) => (
            <motion.div
              key={row.metric}
              initial={{ x: -40, opacity: 0, rotateY: -8 }}
              animate={isInView ? { x: 0, opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-border/10 last:border-b-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-sm font-semibold text-foreground">{row.metric}</span>
              <span className="text-sm text-red-400/90 font-mono">{row.original}</span>
              <span className="text-sm text-muted-foreground">{row.impact}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Consequences grid – cards slide in from RIGHT with 3D tilt */}
        <motion.div
          initial={{ x: 60, opacity: 0, rotateY: 8 }}
          animate={isInView ? { x: 0, opacity: 1, rotateY: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-6">
            Real-world consequences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {consequences.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ x: i % 2 === 0 ? -40 : 40, opacity: 0, rotateY: i % 2 === 0 ? -10 : 10 }}
                animate={isInView ? { x: 0, opacity: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.55 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-start gap-3 rounded-lg border border-red-500/10 p-4 hover:border-red-500/25 transition-all duration-300"
                style={{ backgroundColor: "rgba(239, 68, 68, 0.04)", transformStyle: "preserve-3d" }}
                whileHover={{ scale: 1.02, rotateY: 3 }}
              >
                <item.icon size={18} className="text-red-400/70 shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/80 leading-relaxed">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
