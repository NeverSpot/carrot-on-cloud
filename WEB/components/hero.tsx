"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-4xl">
        {/* Headline */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mt-16"
        >
          <span className="text-foreground">Better for</span>{" "}
          <span className="bg-gradient-to-r from-cf-red via-cf-purple to-cf-blue bg-clip-text text-transparent">
            everyone
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          We offload rating-change computation so Codeforces servers can focus
          on what matters most during contests:{" "}
          <span className="text-cf-blue font-semibold">judging submissions</span>.
          Users get{" "}
          <span className="text-cf-green font-semibold">instant results</span>
          {" "}and CF infrastructure stays healthy.
        </motion.p>

        {/* Compact benefit strip */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 text-xs md:text-sm mt-4"
        >
          {[
            { text: "40,000\u00D7 fewer API calls to CF", color: "text-cf-red" },
            { text: "Sub-second results for users", color: "text-cf-cyan" },
            { text: "Zero submission queue delays", color: "text-cf-orange" },
          ].map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-2 rounded-full border border-border/30 px-4 py-1.5"
              style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.color} bg-current`} />
              <span className="text-foreground/80">{item.text}</span>
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          <a
            href="#philosophy"
            className="relative inline-flex items-center justify-center rounded-lg bg-cf-blue px-8 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 glow-cf-blue"
          >
            Why we built this
          </a>
          <Link
            href="/journey"
            className="inline-flex items-center justify-center rounded-lg border border-cf-blue/40 px-8 py-3 text-sm font-semibold text-cf-blue transition-all hover:bg-cf-blue/10 hover:border-cf-blue/60"
          >
            Read the full story
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0B0B0F, transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  )
}
