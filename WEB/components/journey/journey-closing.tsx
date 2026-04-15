"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export function JourneyClosing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative px-6 py-24 md:py-32" ref={ref}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div
          className="relative rounded-2xl border border-border/30 p-8 md:p-12"
          style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}
        >
          {/* Decorative glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(47,116,192,0.08), transparent 70%)",
            }}
            aria-hidden="true"
          />

          <p className="relative z-10 font-display text-xl md:text-2xl font-bold text-foreground mb-6 text-balance leading-relaxed">
            Carrot on Cloud transforms a client-heavy architecture into an
            efficient cloud-native solution.
          </p>

          <div className="relative z-10 flex flex-col gap-2 text-left max-w-lg mx-auto mb-8">
            {[
              "40,000\u00D7 reduction in Codeforces API requests during live contests",
              "99.997% reduction in total data transfer",
              "Instant loading for end users (no client-side computation)",
              "Scalable infrastructure that handles peak contest loads",
              "Better for everyone \u2014 users get faster results, CF servers stay healthy",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cf-blue shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <p className="relative z-10 text-muted-foreground mb-8 text-sm md:text-base">
            Open source. MIT License. PRs welcome.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/NeverSpot/carrot-on-cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-cf-red px-8 py-3 text-sm font-semibold text-dark-bg transition-all hover:brightness-110 glow-magenta"
            >
              View on GitHub
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-cf-blue/40 px-8 py-3 text-sm font-semibold text-cf-blue transition-all hover:bg-cf-blue/10 hover:border-cf-blue/60"
            >
              Back to home
            </Link>
          </div>

          <p className="relative z-10 mt-8 text-xs text-muted-foreground/60">
            Rating calculation algorithm reverse-engineered from{" "}
            <a
              href="https://github.com/meooow25/carrot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cf-red/60 hover:text-cf-red transition-colors underline"
            >
              Carrot by meooow25
            </a>
            {" "}{"\u2014"}{" "}
            for the brilliant FFT-based approach that makes this possible.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
