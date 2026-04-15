"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const techSections = [
  {
    title: "Full Tech Stack",
    items: [
      "Backend: Node.js Express server on AWS EC2",
      "Frontend: Chrome Extension (Manifest V3) injecting metrics into CF standings",
      "Database: Amazon RDS (MySQL) \u2014 automated backups, point-in-time recovery, auto-patching",
      "Cache & Locking: Redis for distributed locks and concurrency control",
      "Reverse Proxy: Nginx \u2014 HTTPS on port 443, SSL termination, forwards to Express on localhost:3000",
      "Networking: Elastic IP for static IPv4, custom subdomain via A-record",
    ],
  },
  {
    title: "FFT Rating Algorithm",
    items: [
      "Expected_Rank[i] = 0.5 + \u03A3(P(rating[i] beats rating[j])) for all j \u2260 i",
      "Rating distribution treated as a discrete signal for convolution",
      "FFT transforms problem from time domain to frequency domain",
      "Convolution computed in O(M log M) time where M \u2248 4000 (rating range)",
      "Algorithm reverse-engineered from original Carrot extension by meooow25",
      "Key difference: original runs FFT per-client; Carrot on Cloud runs it once server-side",
    ],
  },
  {
    title: "Processing Pipeline",
    items: [
      "Worker polls CF API every 5 minutes during live contests",
      "Fetches complete standings (40K participant records) in a single request",
      "Computes seed & rating deltas using FFT-based algorithm server-side",
      "Batch inserts: groups records into batches of 1,000 for minimal DB round-trips",
      "Writes results to MySQL and Redis cache",
      "Marks contest as processed \u2014 fully idempotent (same input \u2192 same output)",
    ],
  },
  {
    title: "DB Schema Highlights",
    items: [
      "contests \u2014 contest metadata, processing status, timestamps",
      "participants \u2014 user standings per contest with handle and rating",
      "computed_deltas \u2014 precomputed rating changes served to clients as JSON",
    ],
  },
  {
    title: "Operational Notes",
    items: [
      "Cron frequency: configurable, default 5 min intervals during active contests",
      "Lock mechanism: Redis SETNX with 300s TTL \u2014 only one worker processes each contest",
      "Recovery: lock expiry acts as auto-retry; next cron run reprocesses on failure",
      "40K record ingestion completes in seconds thanks to batch processing",
      "CF API rate limit backoff: graceful exponential delay on 429 responses",
    ],
  },
]

function CollapsibleSection({ section, index }: { section: (typeof techSections)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-xl border border-border/30 overflow-hidden"
      style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-dark-elevated/50 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="font-display text-base md:text-lg font-semibold text-cf-blue">
          {section.title}
        </h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-muted-foreground" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5">
          <ul className="flex flex-col gap-2">
            {section.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cf-red shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function JourneyTechStack() {
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
          <span className="inline-block rounded-full border border-cf-orange/30 px-4 py-1.5 text-xs font-medium text-cf-orange mb-4 uppercase tracking-widest">
            Deep Dive
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Technical details
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {techSections.map((section, i) => (
            <CollapsibleSection key={section.title} section={section} index={i} />
          ))}
        </div>

        {/* Code snippet callout */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 rounded-xl border border-cf-purple/30 p-6"
          style={{ backgroundColor: "rgba(75, 0, 130, 0.1)" }}
        >
          <h4 className="font-display text-sm font-semibold text-cf-red mb-3">
            Redis Distributed Lock (from README)
          </h4>
          <pre className="text-xs md:text-sm text-foreground/70 font-mono leading-relaxed overflow-x-auto">
            <code>{`async function getContestResults(contestId) {
  const lockKey = \`lock:contest:\${contestId}\`;

  // Try to acquire lock (NX = only if not exists, EX = 300s TTL)
  const lockAcquired = await redis.set(
    lockKey, 'processing', 'NX', 'EX', 300
  );

  if (lockAcquired) {
    // First request - do the heavy work
    await fetchFromCodeforces(contestId);
    await calculateRatings();     // FFT-based O(M log M)
    await saveToDatabase();       // Batch insert 1K/batch
    await redis.del(lockKey);
  } else {
    // Subsequent requests - wait and poll
    while (await redis.exists(lockKey)) {
      await sleep(500);
    }
  }

  // All requests served from cached DB
  return await database.getContestResults(contestId);
}`}</code>
          </pre>
          <p className="mt-3 text-xs text-muted-foreground">
            Only one fetch from Codeforces API regardless of concurrent users.
            Even if a lock expires and two workers process the same contest, the
            write is idempotent {"\u2014"} same input always produces same output. No duplicates.
            Reduces CPU, memory, and network usage by orders of magnitude.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
