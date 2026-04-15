"use client"

import { motion } from "framer-motion"

export function JourneyHero() {
  return (
    <section className="relative flex items-center justify-center px-6 pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background accent */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "linear-gradient(135deg, #2F74C0, #0B0B0F)" }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block rounded-full border border-cf-red/30 px-4 py-1.5 text-xs font-medium text-cf-red mb-6 uppercase tracking-widest"
        >
          The Journey
        </motion.span>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight"
        >
          <span className="text-foreground">How I built Carrot on Cloud</span>
          <br />
          <span className="bg-gradient-to-r from-cf-red via-cf-blue to-cf-orange bg-clip-text text-transparent">
            from idea to two-server hustle
          </span>
        </motion.h1>
      </div>
    </section>
  )
}
