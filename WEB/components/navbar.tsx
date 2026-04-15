"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"

function ScrollProgressBar() {
  const scaleX = useMotionValue(0)
  const smoothScaleX = useSpring(scaleX, { damping: 30, stiffness: 200 })

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable > 0) {
        scaleX.set(window.scrollY / scrollable)
      }
    }
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [scaleX])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX: smoothScaleX,
        background: "linear-gradient(90deg, #2F74C0, #2F74C0, #2F74C0)",
        backgroundSize: "200% 100%",
        animation: "shimmer 3s linear infinite",
      }}
    />
  )
}

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "/journey", label: "Journey" },
]

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string
  label: string
  active: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative text-sm text-white/60 hover:text-white transition-colors duration-300 py-1 group"
    >
      {label}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cf-blue opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-[0_0_8px_#2F74C0]" />
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
          style={{
            background: "linear-gradient(90deg, #2F74C0, #2F74C0, #2F74C0)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = ["problem"]
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const isScrolled = scrollY > 50
  const isDetached = scrollY > 120

  return (
    <>
      <ScrollProgressBar />
      <motion.nav
        ref={navRef}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-40"
        style={{ perspective: "800px" }}
      >
        <motion.div
          className="relative"
          animate={{
            marginLeft: isDetached ? "5%" : "0%",
            marginRight: isDetached ? "5%" : "0%",
            marginTop: isDetached ? "12px" : "3px",
            paddingLeft: isDetached ? "20px" : "48px",
            paddingRight: isDetached ? "20px" : "48px",
            paddingTop: isDetached ? "10px" : "12px",
            paddingBottom: isDetached ? "10px" : "12px",
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              borderRadius: isDetached ? "16px" : "0px",
              opacity: isScrolled ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              backgroundColor: "rgba(11, 11, 15, 0.15)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow: isDetached
                ? "0 8px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                : "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          />

          <motion.div
            className="absolute pointer-events-none"
            animate={{
              borderRadius: isDetached ? "16px" : "0px",
              opacity: isScrolled ? 0.35 : 0,
              inset: isDetached ? "-1px" : "auto 0 -1px 0",
              height: isDetached ? "auto" : "1px",
            }}
            transition={{ duration: 0.5 }}
            style={{
              background: isDetached
                ? "linear-gradient(135deg, rgba(47,116,192,0.3), rgba(47,116,192,0.15), rgba(47,116,192,0.3))"
                : "linear-gradient(90deg, #2F74C0, #2F74C0, #2F74C0)",
              backgroundSize: "200% 200%",
              animation: "shimmer 4s linear infinite",
            }}
          />

          <div className="relative flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.span
                className="font-display font-bold tracking-tight text-glow-magenta"
                style={{ color: "#2F74C0" }}
                animate={{
                  fontSize: isDetached ? "16px" : "20px",
                }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                Carrot on Cloud
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={activeSection === link.href.replace("#", "")}
                />
              ))}
              <a
                href="https://github.com/NeverSpot/carrot-on-cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                GitHub
              </a>

              <Link
                href="#demo"
                className="relative rounded-lg border border-cf-red/50 px-4 py-1.5 text-sm font-medium overflow-hidden group transition-all duration-300 hover:border-cf-red/80"
                style={{ color: "#2F74C0" }}
              >
                <span className="relative z-10">Explore the demo</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 bg-cf-red" />
              </Link>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10, rotateX: -15 }}
                animate={{ opacity: 1, height: "auto", y: 0, rotateX: 0 }}
                exit={{ opacity: 0, height: 0, y: -10, rotateX: -15 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mt-3 rounded-xl overflow-hidden md:hidden"
                style={{
                  backgroundColor: "rgba(11, 11, 15, 0.5)",
                  backdropFilter: "blur(28px) saturate(200%)",
                  WebkitBackdropFilter: "blur(28px) saturate(200%)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
                  transformOrigin: "top center",
                }}
              >
                <div className="px-5 py-4 flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-2.5 text-sm text-white/60 hover:text-white hover:pl-2 transition-all duration-300"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
                  >
                    <a
                      href="https://github.com/NeverSpot/carrot-on-cloud"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="block py-2.5 text-sm text-white/60 hover:text-white hover:pl-2 transition-all duration-300"
                    >
                      GitHub
                    </a>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.06, duration: 0.3 }}
                    className="pt-2"
                  >
                    <Link
                      href="#demo"
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg border border-cf-red/50 px-4 py-2 text-sm font-medium text-center transition-all duration-300 hover:border-cf-red/80 hover:bg-cf-red/5"
                      style={{ color: "#2F74C0" }}
                    >
                      Explore the demo
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    </>
  )
}
