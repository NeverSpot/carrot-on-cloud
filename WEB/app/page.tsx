import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { BeforeAfter } from "@/components/before-after"
import { Features } from "@/components/features"
import { Philosophy } from "@/components/philosophy"
import { Architecture } from "@/components/architecture"
import { Metrics } from "@/components/metrics"
import { Credits } from "@/components/credits"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <BeforeAfter />
      <Features />
      <Philosophy />
      <Architecture />
      <Metrics />
      <Credits />
      <div id="demo" />
      <Footer />
    </main>
  )
}
