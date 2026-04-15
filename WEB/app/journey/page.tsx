import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JourneyHero } from "@/components/journey/journey-hero"
import { JourneyIntro } from "@/components/journey/journey-intro"
import { JourneyTimeline } from "@/components/journey/journey-timeline"
import { JourneyTechStack } from "@/components/journey/journey-tech-stack"
import { JourneyLessons } from "@/components/journey/journey-lessons"
import { JourneyClosing } from "@/components/journey/journey-closing"

export const metadata: Metadata = {
  title: "Journey — Carrot on Cloud",
  description:
    "How I built Carrot on Cloud — from idea to two-server hustle. The story of student credits, load balancing, and boring infra.",
}

export default function JourneyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <JourneyHero />
      <JourneyIntro />
      <JourneyTimeline />
      <JourneyTechStack />
      <JourneyLessons />
      <JourneyClosing />
      <Footer />
    </main>
  )
}
