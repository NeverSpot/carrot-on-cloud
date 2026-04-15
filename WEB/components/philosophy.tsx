"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const benefits = [
  {
    num: "01",
    color: "text-cf-green",
    bg: "bg-cf-green/10",
    borderHover: "hover:border-cf-green/30",
    shadowColor: "rgba(0,128,0,0.04)",
    title: "Faster results for users",
    text: "No more waiting 10-30 seconds. Rating predictions load in under one second with zero client-side computation.",
  },
  {
    num: "02",
    color: "text-cf-cyan",
    bg: "bg-cf-cyan/10",
    borderHover: "hover:border-cf-cyan/30",
    shadowColor: "rgba(3,168,158,0.04)",
    title: "Zero extra load on Codeforces",
    text: "During live contests, CF servers handle judging, standings, and fairness. We make sure rating queries never add to that burden.",
  },
  {
    num: "03",
    color: "text-cf-blue",
    bg: "bg-cf-blue/10",
    borderHover: "hover:border-cf-blue/30",
    shadowColor: "rgba(47,116,192,0.04)",
    title: "Fewer submission queue delays",
    text: "When the CF infrastructure is under less stress, submissions get judged faster. That matters more than any rating delta.",
  },
  {
    num: "04",
    color: "text-cf-purple",
    bg: "bg-cf-purple/10",
    borderHover: "hover:border-cf-purple/30",
    shadowColor: "rgba(170,0,170,0.04)",
    title: "Healthier ecosystem for everyone",
    text: "Codeforces gives the competitive programming community world-class infrastructure for free. This is a small way of giving something back.",
  },
]
const faqs = [
  {
    q: "Why not just query Codeforces directly?",
    a: "Because during contests, Codeforces servers are already under peak stress. Rating prediction is not time-critical submissions are. We move non-critical computation off shared infrastructure so the things that actually matter don\u2019t get delayed.",
  },
  {
    q: "Does this replace the original Carrot extension?",
    a: "It builds on the same FFT-based algorithm from meooow25's Carrot, but runs it once on a server instead of independently in every browser. Same math, radically different architecture 40,000+ fewer API requests to CF.",
  },
  {
    q: "Is this an official Codeforces project?",
    a: "No. This is a community-built, open source project. It exists because we respect Codeforces infrastructure and want to reduce unnecessary load, not because anything is broken.",
  },
]

export function Philosophy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="philosophy"
      className="relative px-6 py-24 md:py-32 scroll-mt-20"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="inline-block rounded-full border border-cf-blue/30 px-4 py-1.5 text-xs font-medium text-cf-blue mb-4 uppercase tracking-widest">
            Our philosophy
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Built to respect Codeforces
          </h2>
        </motion.div>

        {/* Core statement */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Codeforces already handles massive load during contests {"\u2014"}{" "}
            judging submissions, updating standings, and keeping contests fair in
            real time. Constant rating-change queries during this window add
            unnecessary pressure to the same infrastructure. This tool exists for
            one reason:{" "}
            <span className="text-foreground font-medium">
              to move non-critical computation off Codeforces servers, so
              submissions don{"'"}t get stuck in queues just because someone wants
              to refresh their rating delta.
            </span>
          </p>
        </motion.div>

        {/* Banner callout */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative max-w-3xl mx-auto mb-16 rounded-xl border border-cf-blue/20 border-l-4 border-l-cf-blue p-6 md:p-8"
          style={{ backgroundColor: "rgba(47, 116, 192, 0.03)" }}
        >
          <div
            className="absolute inset-0 rounded-xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(47,116,192,0.06), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div>
              <p className="font-display text-lg md:text-xl font-bold text-foreground mb-1">
                Respect shared infrastructure
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Codeforces gives the competitive programming community
                world-class infrastructure for free. Thousands of contests,
                millions of submissions, all at zero cost to participants. This
                project is a small way of giving something back {"\u2014"}{" "}
                reducing unnecessary load so the platform can keep doing what it
                does best.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ y: 25, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 md:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all hover:bg-white/15 ${benefit.borderHover}`}
            >
              {/* Mirror glass reflection highlight */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${benefit.shadowColor}, transparent 70%)`,
                }}
              />
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className={`font-display text-base md:text-lg font-bold ${benefit.color}`}>
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ callouts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display font-bold text-cf-orange text-xl">FAQ</span>
            <h3 className="font-display text-lg md:text-xl font-bold text-foreground">
              Common questions
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ y: 15, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 md:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all hover:bg-white/15"
              >
                {/* Mirror glass reflection highlight */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  aria-hidden="true"
                />
                
                <p className="font-display text-sm md:text-base font-semibold text-foreground mb-3">
                  {faq.q}
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Distilled message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="font-display text-lg md:text-2xl font-bold text-foreground/90 text-balance leading-relaxed">
            Respect the platform.
            <br />
            Reduce unnecessary load.
            <br />
            <span className="text-cf-blue">
              Keep contests smooth for everyone.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
