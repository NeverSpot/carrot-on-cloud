"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const lessons = [
  {
    text: "Compute once, serve many",
    detail: "40,000 users were independently computing the exact same FFT-based rating calculation. Moving it server-side reduced CF API load by 40,000\u00D7 and total data transfer by 99.9975%.",
  },
  {
    text: "Infra is a constraint, not a flex",
    detail: "Two student AWS accounts with $200 each. t4g instances. Elastic IP. A-record DNS. No overprovisioning. Treat infrastructure like a competitive programming constraint: minimize state, maximize efficiency.",
  },
  {
    text: "Idempotency beats retries",
    detail: "If a Redis lock expires and two workers process the same contest, the write is safe because same input always produces same output. No duplicate records. Design operations to be safely repeatable.",
  },
  {
    text: "Boring systems survive longer",
    detail: "No Kubernetes, no microservices, no hype stack. Node.js + MySQL + Redis + Nginx. Simple, well-understood tech that runs reliably for years. The most boring infra decision is usually the best one.",
  },
  {
    text: "Batch everything at scale",
    detail: "Batch inserts of 1,000 records at a time brought 40,000-record ingestion from minutes to seconds. Reduced round-trips to RDS and improved transaction efficiency by orders of magnitude.",
  },
  {
    text: "Better for everyone",
    detail: "Users get instant results instead of 30-second loads. CF servers get 40,000\u00D7 fewer API hits during live contests. Your browser doesn\u2019t freeze. The whole ecosystem benefits when you centralize redundant computation.",
  },
]

export function JourneyLessons() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative px-6 py-16 md:py-24" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block rounded-full border border-cf-red/30 px-4 py-1.5 text-xs font-medium text-cf-red mb-4 uppercase tracking-widest">
            What I Learned
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Lessons from the trenches
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson, i) => (
            <motion.div
              key={lesson.text}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative rounded-xl border border-border/30 p-6 transition-all hover:border-cf-red/30"
              style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-display font-bold shrink-0"
                  style={{
                    backgroundColor: "rgba(47, 116, 192, 0.1)",
                    color: "#2F74C0",
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-1">
                    {lesson.text}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lesson.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
