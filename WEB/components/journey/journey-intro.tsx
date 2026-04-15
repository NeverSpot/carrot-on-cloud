"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function JourneyIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative px-6 py-16 md:py-24" ref={ref}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div
          className="relative rounded-2xl border border-border/30 p-8 md:p-12"
          style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}
        >
          {/* Decorative quote mark */}
          <div className="absolute -top-4 left-8 font-display text-6xl text-cf-red/30 leading-none select-none" aria-hidden="true">
            {'"'}
          </div>

          <blockquote className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6">
            I built Carrot on Cloud because repeating heavy rating math on every
            client made no sense. Instead of letting browsers compute official
            Codeforces rating deltas thousands of times, we compute once, store
            results, and serve instant JSON from a tiny backend. To optimize cost
            I used two student AWS accounts (each with $200 credits). I put two
            EC2 servers {"\u2014"} one on my friend{"'"}s student account and one
            on mine {"\u2014"} behind a load balancer so traffic distributes
            across both. Both servers connect to the same central MySQL and Redis
            for caching and locking. This setup gave us effective $400 in
            credits, improved availability, and kept costs almost zero while
            serving thousands of users.
          </blockquote>

          <p className="text-sm text-muted-foreground leading-relaxed">
            The core rating calculation algorithm is reverse-engineered from the
            excellent{" "}
            <a
              href="https://github.com/meooow25/carrot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cf-blue hover:underline"
            >
              Carrot extension by meooow25
            </a>
            , which implements an efficient FFT-based approach to compute
            expected ranks. The key architectural shift: instead of each client
            running this O(M log M) computation independently, we run it{" "}
            <span className="text-cf-orange font-medium">once</span> on the
            server and serve the results to everyone.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
