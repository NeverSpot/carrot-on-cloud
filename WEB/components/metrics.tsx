"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const metrics = [
  { label: "CF API load reduction", value: "40,000", prefix: "", suffix: "x" },
  { label: "Total data transfer reduction", value: "99", prefix: "", suffix: ".9975%" },
  { label: "Page load time (was 10-30s)", value: "1", prefix: "<", suffix: "sec" },
  { label: "Records transferred (was 1.6B)", value: "40,000", prefix: "", suffix: "" },
  { label: "Client computation required", value: "Zero", prefix: "", suffix: "" },
  { label: "Combined free credits used", value: "400", prefix: "$", suffix: "" },
]

function AnimatedCounter({
  value,
  prefix,
  suffix,
  isInView,
}: {
  value: string
  prefix: string
  suffix: string
  isInView: boolean
}) {
  const [displayValue, setDisplayValue] = useState("0")
  const isNumeric = /^\d[\d,]*$/.test(value)

  useEffect(() => {
    if (!isInView) return

    if (!isNumeric) {
      setDisplayValue(value)
      return
    }

    const numericVal = parseInt(value.replace(/,/g, ""), 10)
    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * numericVal)

      setDisplayValue(current.toLocaleString())

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, isNumeric])

  return (
    <span className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
      {prefix}
      {displayValue}
      {suffix && <span className="text-cf-blue">{suffix}</span>}
    </span>
  )
}

export function Metrics() {
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
          <span className="inline-block rounded-full border border-cf-orange/30 px-4 py-1.5 text-xs font-medium text-cf-orange mb-4 uppercase tracking-widest">
            By the numbers
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Numbers that matter
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                rotateY: i % 2 === 0 ? -12 : 12,
              }}
              animate={isInView ? { x: 0, opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.04, rotateY: i % 2 === 0 ? 4 : -4, transition: { duration: 0.3 } }}
              className="relative rounded-xl border border-border/30 p-6 text-center"
              style={{ backgroundColor: "rgba(30, 30, 30, 0.6)", transformStyle: "preserve-3d" }}
            >
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                isInView={isInView}
              />
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
