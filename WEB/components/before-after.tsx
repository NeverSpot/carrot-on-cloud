"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, X, Check } from "lucide-react"

export function BeforeAfter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState<"before" | "after">("before")

  return (
    <section className="relative px-6 py-24 md:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full border border-cf-blue/30 px-4 py-1.5 text-xs font-medium text-cf-blue mb-4 uppercase tracking-widest">
            The Transformation
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Before vs. after
          </h2>
        </motion.div>

        {/* Toggle tabs (mobile-friendly) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8 md:hidden"
        >
          <div className="inline-flex rounded-lg border border-border/30 p-1" style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}>
            <button
              onClick={() => setActiveTab("before")}
              className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${activeTab === "before"
                ? "bg-red-500/20 text-red-400"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Original Carrot
            </button>
            <button
              onClick={() => setActiveTab("after")}
              className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${activeTab === "after"
                ? "bg-cf-blue/20 text-cf-blue"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Carrot on Cloud
            </button>
          </div>
        </motion.div>

        {/* Side by side (desktop) / tab switch (mobile) */}
        <div className="relative flex flex-col md:flex-row gap-8 lg:gap-24 items-stretch w-full">
          {/* BEFORE */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`flex flex-col flex-1 min-w-0 w-full rounded-xl border border-red-500/20 p-6 md:p-8 ${activeTab !== "before" ? "hidden md:flex" : "flex"
              }`}
            style={{ backgroundColor: "rgba(239, 68, 68, 0.04)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/15 shrink-0">
                <X size={16} className="text-red-400" />
              </div>
              <h3 className="font-display text-lg font-bold text-red-400">Original Carrot</h3>
            </div>

            <div className="font-mono text-xs md:text-sm text-foreground/70 rounded-lg p-4 leading-relaxed overflow-x-auto overflow-y-hidden flex-grow" style={{ backgroundColor: "rgba(11, 11, 15, 0.7)" }}>
              <div className="text-muted-foreground/50 mb-2">{'// Every single user does this:'}</div>
              <div className="whitespace-nowrap">
                <span className="text-red-400">User 1</span>
                {' \u2192 CF API '}
                <span className="text-muted-foreground/50">{'(fetch 40K records)'}</span>
                {' \u2192 Calculate locally'}
              </div>
              <div className="whitespace-nowrap">
                <span className="text-red-400">User 2</span>
                {' \u2192 CF API '}
                <span className="text-muted-foreground/50">{'(fetch 40K records)'}</span>
                {' \u2192 Calculate locally'}
              </div>
              <div className="whitespace-nowrap">
                <span className="text-red-400">User 3</span>
                {' \u2192 CF API '}
                <span className="text-muted-foreground/50">{'(fetch 40K records)'}</span>
                {' \u2192 Calculate locally'}
              </div>
              <div className="text-muted-foreground/40 my-1">{'...'}</div>
              <div className="whitespace-nowrap">
                <span className="text-red-400">User 40K</span>
                {' \u2192 CF API '}
                <span className="text-muted-foreground/50">{'(fetch 40K records)'}</span>
                {' \u2192 Calculate locally'}
              </div>
              <div className="mt-3 pt-3 border-t border-border/20 text-red-400/80 min-w-max">
                {'Result: 40,000 API calls \u00D7 40,000 records each'}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-foreground/70">
                <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                <span>Every client fetches the same 40K records</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-foreground/70">
                <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                <span>Every client runs O(n log n) FFT computation</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-foreground/70">
                <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                <span>No caching -- same data downloaded repeatedly</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-foreground/70">
                <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                <span>10-30+ second load times, frozen tabs</span>
              </div>
            </div>
          </motion.div>

          {/* Arrow (desktop only) */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
            className="hidden md:flex absolute left-[calc(50%-0.75rem)] lg:left-[calc(50%-1.25rem)] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full border border-cf-blue/40"
            style={{ backgroundColor: "var(--dark-bg, #121212)" }}
          >
            <ArrowRight size={20} className="text-cf-blue" />
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`group flex flex-col flex-1 min-w-0 w-full rounded-xl border border-cf-blue/20 bg-[rgba(47,116,192,0.03)] p-6 md:p-8 transition-colors duration-500 hover:border-cf-green/30 hover:bg-[rgba(0,128,0,0.05)] ${activeTab !== "after" ? "hidden md:flex" : "flex"
              }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cf-blue/15">
                <Check size={16} className="text-cf-blue" />
              </div>
              <h3 className="font-display text-lg font-bold text-cf-blue">Carrot on Cloud</h3>
            </div>

            <div className="font-mono text-xs md:text-sm text-foreground/70 rounded-lg p-4 leading-relaxed overflow-x-auto flex-grow" style={{ backgroundColor: "rgba(11, 11, 15, 0.7)" }}>
              <div className="text-muted-foreground/50 mb-2">{'// Backend does this once every 5 min:'}</div>
              <div className="whitespace-nowrap">
                <span className="text-cf-blue">Server</span>
                {' \u2192 CF API '}
                <span className="text-muted-foreground/50">{'(fetch 40K records ONCE)'}</span>
              </div>
              <div className="pl-6 whitespace-nowrap">
                {'\u2192 Calculate \u2192 Cache in MySQL'}
              </div>
              <div className="mt-3 text-muted-foreground/50 mb-2">{'// Users get instant results:'}</div>
              <div className="whitespace-nowrap">
                <span className="text-cf-orange">User 1</span>
                {' \u2192 Backend API \u2192 '}
                <span className="text-cf-blue">Cached Data</span>
                {' (instant)'}
              </div>
              <div className="whitespace-nowrap">
                <span className="text-cf-orange">User 2</span>
                {' \u2192 Backend API \u2192 '}
                <span className="text-cf-blue">Cached Data</span>
                {' (instant)'}
              </div>
              <div className="text-muted-foreground/40 my-1">{'...'}</div>
              <div className="whitespace-nowrap">
                <span className="text-cf-orange">User 40K</span>
                {' \u2192 Backend API \u2192 '}
                <span className="text-cf-blue">Cached Data</span>
                {' (instant)'}
              </div>
              <div className="mt-3 pt-3 border-t border-border/20 text-cf-blue/80 whitespace-nowrap">
                {'Result: 1 API call to CF, 40,000 lightweight responses'}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-foreground/70">
                <Check size={14} className="text-cf-blue shrink-0 mt-0.5" />
                <span>Single fetch from CF API every 5 minutes</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-foreground/70">
                <Check size={14} className="text-cf-blue shrink-0 mt-0.5" />
                <span>Server-side FFT computation -- done once</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-foreground/70">
                <Check size={14} className="text-cf-blue shrink-0 mt-0.5" />
                <span>Results cached in MySQL + Redis</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-foreground/70">
                <Check size={14} className="text-cf-blue shrink-0 mt-0.5" />
                <span>{'Sub-second load times, zero client computation'}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Improvement summary strip */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              label: "CF \u2192 Clients data",
              before: "1.6B records",
              after: "40K records",
              improvement: "40,000\u00D7 reduction",
            },
            {
              label: "Total network load",
              before: "Extreme",
              after: "Minimal",
              improvement: "99.9975% reduction",
            },
            {
              label: "Page load time",
              before: "10-30+ sec",
              after: "<1 sec",
              improvement: "30\u00D7 faster",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ y: 15, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="rounded-xl border border-border/30 p-5 text-center"
              style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{item.label}</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-red-400/80 line-through">{item.before}</span>
                <ArrowRight size={14} className="text-muted-foreground/50" />
                <span className="text-sm font-semibold text-cf-blue">{item.after}</span>
              </div>
              <p className="text-xs font-medium text-cf-orange">{item.improvement}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
