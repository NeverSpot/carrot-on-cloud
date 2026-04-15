"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Lightbulb, Server, DollarSign, Shield } from "lucide-react"

const timeline = [
  {
    icon: Lightbulb,
    title: "Idea to Prototype",
    text: "The original Carrot extension by meooow25 had every user independently fetching 40,000 participant records from the CF API and running FFT-based rating calculations in their browser. 40K users \u00D7 40K records = 1.6 billion records transferred. Browsers froze. Load times hit 10-30+ seconds.",
    color: "#2F74C0",
    detail:
      "The FFT algorithm treats rating distributions as discrete signals and uses convolution to compute expected ranks in O(M log M) time (M \u2248 4000 rating range). It\u2019s efficient math \u2014 but running it 40,000 times in 40,000 browsers instead of once on a server was the core problem.",
  },
  {
    icon: Server,
    title: "Server-side compute",
    text: "Moved the entire rating calculation pipeline to a Node.js Express backend on AWS EC2. A worker polls CF API every 5 minutes, fetches standings once, computes rating deltas server-side using the same FFT algorithm, and caches results in Amazon RDS (MySQL). Users get pre-computed JSON instantly.",
    color: "#2F74C0",
    detail:
      "The Chrome Extension (Manifest V3) injects performance metrics into CF standings pages. Nginx handles HTTPS/SSL termination on port 443 and reverse-proxies to Express on localhost:3000, shielding the backend from direct exposure. Elastic IP provides a stable endpoint across instance restarts.",
  },
  {
    icon: DollarSign,
    title: "Scaling with student credits",
    text: "Used two AWS student accounts ($200 each) for a combined $400 in free credits. Two EC2 instances behind a load balancer, both connecting to the same central MySQL (Amazon RDS) and Redis. RDS handles automated backups, patching, and point-in-time recovery.",
    color: "#2F74C0",
    detail:
      "DNS configured with a custom subdomain mapped via A-record. The load balancer distributes traffic equally \u2014 no sticky sessions needed. Redis SETNX + TTL ensures only one worker processes each contest at a time, preventing duplicate computation across instances.",
  },
  {
    icon: Shield,
    title: "Hardening & optimization",
    text: "Batch inserts of 1,000 records at a time brought 40K record ingestion from minutes to seconds. Redis distributed locking prevents concurrent data fetches when thousands of users refresh simultaneously. Operations are idempotent: same input always produces same output, no duplicates.",
    color: "#2F74C0",
    detail:
      "Lock mechanism: redis.set(lockKey, 'processing', 'NX', 'EX', 300). If acquired, fetch + calculate + save + release. If not, poll and wait. Lock expiry acts as automatic recovery \u2014 if a job fails mid-way, the next cron run reprocesses. Graceful backoff from CF API rate limits. No Kubernetes, no microservices. Just boring systems that survive.",
  },
]

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof timeline)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8">
      {/* Vertical line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, type: "spring", bounce: 0.4 }}
          className="relative flex items-center justify-center w-12 h-12 rounded-xl border-2 shrink-0 z-10"
          style={{
            backgroundColor: `${item.color}15`,
            borderColor: `${item.color}50`,
          }}
        >
          <item.icon size={20} style={{ color: item.color }} />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-px flex-1"
            style={{ backgroundColor: `${item.color}30` }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pb-12"
      >
        <h3 className="font-display text-xl md:text-2xl font-bold mb-2" style={{ color: item.color }}>
          {item.title}
        </h3>
        <p className="text-foreground/80 leading-relaxed mb-3 text-sm md:text-base">
          {item.text}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.detail}
        </p>
      </motion.div>
    </div>
  )
}

export function JourneyTimeline() {
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
          <span className="inline-block rounded-full border border-cf-blue/30 px-4 py-1.5 text-xs font-medium text-cf-blue mb-4 uppercase tracking-widest">
            Timeline
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            The build path
          </h2>
        </motion.div>

        <div>
          {timeline.map((item, i) => (
            <TimelineItem
              key={item.title}
              item={item}
              index={i}
              isLast={i === timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
