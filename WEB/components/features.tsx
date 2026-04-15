"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Zap, Users, Server } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Centralized data fetching",
    description:
      "Backend fetches contest data once every 5 minutes from Codeforces. CF API requests drop from 40,000 to 1 per refresh cycle -- a 40,000\u00D7 reduction.",
    color: "#2F74C0",
    glowClass: "glow-yellow",
  },
  {
    icon: Server,
    title: "Server-side FFT computation",
    description:
      "Rating calculations using the FFT-based algorithm are performed once on the server. Results are cached in MySQL and served as pre-computed JSON to all users instantly.",
    color: "#2F74C0",
    glowClass: "glow-yellow",
  },
  {
    icon: Users,
    title: "Zero client-side work",
    description:
      "No local computation, no 40K participant objects in memory. Browser stays responsive. Load time drops from 10-30+ seconds to under one second.",
    color: "#2F74C0",
    glowClass: "glow-yellow",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Alternate from left/right
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{
        x: fromLeft ? -60 : 60,
        opacity: 0,
        rotateY: fromLeft ? -15 : 15,
      }}
      animate={isInView ? { x: 0, opacity: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.03, rotateY: fromLeft ? 3 : -3, transition: { duration: 0.3 } }}
      className="group relative rounded-xl border border-border/40 p-6 md:p-8 transition-all hover:border-opacity-60"
      style={{
        backgroundColor: "rgba(30, 30, 30, 0.6)",
        borderColor: `${feature.color}20`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${feature.color}08, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-lg"
          style={{ backgroundColor: `${feature.color}15` }}
        >
          <feature.icon size={24} style={{ color: feature.color }} />
        </div>
        <h3
          className="font-display text-lg md:text-xl font-bold"
          style={{ color: feature.color }}
        >
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative px-6 py-24 md:py-32" ref={ref} style={{ perspective: "1200px" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full border border-cf-red/30 px-4 py-1.5 text-xs font-medium text-cf-red mb-4 uppercase tracking-widest">
            Why Carrot on Cloud
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            The smart way to serve ratings
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
