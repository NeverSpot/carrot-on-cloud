"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
