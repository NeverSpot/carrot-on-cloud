"use client"

import { motion } from "framer-motion"
import { ExternalLink, Heart } from "lucide-react"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

const cardFromLeft = {
    hidden: { opacity: 0, x: -70, rotateY: -15 },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

const cardFromRight = {
    hidden: { opacity: 0, x: 70, rotateY: 15 },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

export function Credits() {
    return (
        <section
            id="credits"
            className="relative px-6 py-24 md:py-32 overflow-hidden"
            style={{ perspective: "1200px" }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 animate-drift"
                    style={{
                        background:
                            "radial-gradient(circle, var(--cf-red), transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-20 animate-drift"
                    style={{
                        background:
                            "radial-gradient(circle, var(--cf-blue), transparent 70%)",
                        filter: "blur(60px)",
                        animationDelay: "5s",
                    }}
                />
            </div>

            <div className="relative max-w-5xl mx-auto">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <Heart
                            size={20}
                            className="text-[var(--cf-red)]"
                            style={{ animation: "neon-pulse 2s ease-in-out infinite" }}
                        />
                        <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                            Acknowledgments
                        </span>
                        <Heart
                            size={20}
                            className="text-[var(--cf-red)]"
                            style={{ animation: "neon-pulse 2s ease-in-out infinite 1s" }}
                        />
                    </motion.div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage:
                                    "linear-gradient(135deg, var(--cf-red), var(--cf-blue), var(--cf-orange))",
                                backgroundSize: "200% 200%",
                                animation: "shimmer 4s linear infinite",
                            }}
                        >
                            Standing on the Shoulders of Giants
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg">
                        Carrot on Cloud wouldn&apos;t exist without these incredible
                        projects and the communities behind them.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {/* Codeforces Card */}
                    <motion.a
                        href="https://codeforces.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={cardFromLeft}
                        whileHover={{ y: -6, rotateY: 5, transition: { duration: 0.3 } }}
                        className="group relative rounded-2xl p-[1px] overflow-hidden block"
                        style={{ animation: "glow-pulse-cyan 3s ease-in-out infinite", transformStyle: "preserve-3d" as const }}
                    >
                        {/* Animated border gradient */}
                        <div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--cf-blue), transparent, var(--cf-blue))",
                                backgroundSize: "200% 200%",
                                animation: "shimmer 5s linear infinite",
                                opacity: 0.5,
                            }}
                        />
                        {/* Card inner */}
                        <div
                            className="relative rounded-2xl px-8 py-10 h-full"
                            style={{ backgroundColor: "var(--dark-surface)" }}
                        >
                            {/* Icon area */}
                            <div className="flex items-center gap-4 mb-6">
                                <motion.div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold font-display border"
                                    style={{
                                        borderColor: "var(--cf-blue)",
                                        color: "var(--cf-blue)",
                                        background:
                                            "linear-gradient(135deg, rgba(47,116,192,0.05), rgba(47,116,192,0.15))",
                                    }}
                                    whileHover={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    CF
                                </motion.div>
                                <div>
                                    <h3 className="font-display text-xl font-bold text-foreground">
                                        Codeforces
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        by Mike Mirzayanov
                                    </p>
                                </div>
                                <ExternalLink
                                    size={16}
                                    className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </div>
                            <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                                The competitive programming platform that started it all.
                                Codeforces hosts thousands of contests and has built the largest
                                competitive programming community in the world. Its rating
                                system, created by Mike Mirzayanov, is the foundation upon which
                                Carrot on Cloud&apos;s prediction engine is built.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Platform", "Rating System", "Community", "API"].map(
                                    (tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-3 py-1 rounded-full border transition-all duration-300"
                                            style={{
                                                borderColor: "var(--cf-blue)",
                                                color: "var(--cf-blue)",
                                                opacity: 0.7,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.a>

                    {/* Original Carrot Card */}
                    <motion.a
                        href="https://github.com/meooow25/carrot"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={cardFromRight}
                        whileHover={{ y: -6, rotateY: -5, transition: { duration: 0.3 } }}
                        className="group relative rounded-2xl p-[1px] overflow-hidden block"
                        style={{ animation: "glow-pulse-border 3s ease-in-out infinite 1.5s", transformStyle: "preserve-3d" as const }}
                    >
                        {/* Animated border gradient */}
                        <div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--cf-red), transparent, var(--cf-red))",
                                backgroundSize: "200% 200%",
                                animation: "shimmer 5s linear infinite 2s",
                                opacity: 0.5,
                            }}
                        />
                        {/* Card inner */}
                        <div
                            className="relative rounded-2xl px-8 py-10 h-full"
                            style={{ backgroundColor: "var(--dark-surface)" }}
                        >
                            {/* Icon area */}
                            <div className="flex items-center gap-4 mb-6">
                                <motion.div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl border"
                                    style={{
                                        borderColor: "var(--cf-red)",
                                        background:
                                            "linear-gradient(135deg, rgba(47,116,192,0.05), rgba(47,116,192,0.15))",
                                    }}
                                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                                    transition={{ duration: 0.6 }}
                                >
                                    🥕
                                </motion.div>
                                <div>
                                    <h3 className="font-display text-xl font-bold text-foreground">
                                        Carrot Extension
                                    </h3>
                                    <p className="text-sm text-muted-foreground">by meooow25</p>
                                </div>
                                <ExternalLink
                                    size={16}
                                    className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </div>
                            <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                                The brilliant browser extension that pioneered real-time
                                Codeforces rating predictions. meooow25 reverse-engineered the
                                CF rating algorithm and made it accessible to everyone. Carrot
                                on Cloud takes this genius idea and moves the computation to the
                                cloud — compute once, serve instant.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Browser Extension", "Algorithm", "MIT License", "Inspiration"].map(
                                    (tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-3 py-1 rounded-full border transition-all duration-300"
                                            style={{
                                                borderColor: "var(--cf-red)",
                                                color: "var(--cf-red)",
                                                opacity: 0.7,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.a>
                </motion.div>

                {/* License note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center text-xs text-muted-foreground/60 mt-10"
                >
                    Rating calculation algorithm inspired by{" "}
                    <a
                        href="https://github.com/meooow25/carrot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--cf-red)] transition-colors duration-300 underline underline-offset-2"
                        style={{ color: "var(--cf-red)", opacity: 0.7 }}
                    >
                        Carrot by meooow25
                    </a>
                    . Released under the MIT License. We are deeply grateful.
                </motion.p>
            </div>
        </section>
    )
}
