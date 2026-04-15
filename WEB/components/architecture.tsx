"use client"

import { useState } from "react"
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "reactflow"
import "reactflow/dist/style.css"
import FadeIn from "@/components/FadeIn"
import { Clock, Network, Server, Database, Zap } from "lucide-react"

/* ---------- custom node ---------- */
interface NeonNodeData {
  label: string
  description: string
  color: "cyan" | "magenta" | "yellow" | "violet"
  icon: "worker" | "lb" | "server" | "db" | "redis"
}

const IconMap: Record<string, React.ElementType> = {
  worker: Clock,
  lb: Network,
  server: Server,
  db: Database,
  redis: Zap,
}

const colorStyles: Record<string, { border: string; text: string }> = {
  cyan: { border: "border-cf-blue", text: "text-cf-blue" },
  magenta: { border: "border-cf-red", text: "text-cf-red" },
  yellow: { border: "border-cf-orange", text: "text-cf-orange" },
  violet: { border: "border-cf-purple", text: "text-cf-purple" },
}

function NeonNode({ data }: NodeProps<NeonNodeData>) {
  const [hovered, setHovered] = useState(false)
  const c = colorStyles[data.color] ?? colorStyles.cyan

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <div
        className={`flex items-center justify-center gap-2.5 cursor-pointer rounded-lg border-2 bg-card px-5 py-3 transition-transform hover:scale-105 ${c.border}`}
      >
        {(() => {
          const IconComponent = IconMap[data.icon] || Server
          return <IconComponent className={`h-5 w-5 ${c.text}`} />
        })()}
        <span className={`whitespace-nowrap font-display text-sm font-bold ${c.text}`}>
          {data.label}
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />

      {hovered && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-md border border-border bg-card p-3 text-xs text-muted-foreground shadow-lg">
          {data.description}
        </div>
      )}
    </div>
  )
}

const nodeTypes = { neon: NeonNode }

/* ---------- data ---------- */
const nodes: Node<NeonNodeData>[] = [
  {
    id: "worker",
    type: "neon",
    position: { x: 0, y: 10 },
    data: {
      label: "Worker / Cron",
      description:
        "Periodically fetches contest standings, computes rating deltas, and writes results to the DB.",
      color: "violet",
      icon: "worker",
    },
  },
  {
    id: "lb",
    type: "neon",
    position: { x: 300, y: 10 },
    data: {
      label: "Load Balancer",
      description:
        "Distributes traffic equally across both EC2 servers. Round-robin \u2014 no sticky sessions needed.",
      color: "cyan",
      icon: "lb",
    },
  },
  {
    id: "ec2a",
    type: "neon",
    position: { x: 150, y: 150 },
    data: {
      label: "EC2 Server A",
      description:
        "Friend\u2019s student AWS account ($200 credits). Runs a t4g instance serving precomputed JSON.",
      color: "magenta",
      icon: "server",
    },
  },
  {
    id: "ec2b",
    type: "neon",
    position: { x: 450, y: 150 },
    data: {
      label: "EC2 Server B",
      description:
        "My student AWS account ($200 credits). Same setup \u2014 combined credits give us $400.",
      color: "magenta",
      icon: "server",
    },
  },
  {
    id: "db",
    type: "neon",
    position: { x: 180, y: 310 },
    data: {
      label: "Central MySQL",
      description:
        "Single shared database: contests, participants, computed_deltas tables.",
      color: "yellow",
      icon: "db",
    },
  },
  {
    id: "redis",
    type: "neon",
    position: { x: 450, y: 310 },
    data: {
      label: "Redis",
      description:
        "Central cache and distributed lock manager (SETNX + TTL). Prevents double-processing.",
      color: "yellow",
      icon: "redis",
    },
  },
]

const edgeColor = (color: string) => ({ style: { stroke: color, strokeWidth: 2 } })

const edges: Edge[] = [
  { id: "lb-a", source: "lb", target: "ec2a", ...edgeColor("hsl(186,100%,50%)") },
  { id: "lb-b", source: "lb", target: "ec2b", ...edgeColor("hsl(186,100%,50%)") },
  { id: "a-db", source: "ec2a", target: "db", ...edgeColor("hsl(312,100%,60%)") },
  { id: "b-db", source: "ec2b", target: "db", ...edgeColor("hsl(312,100%,60%)") },
  { id: "a-r", source: "ec2a", target: "redis", ...edgeColor("hsl(312,100%,60%)") },
  { id: "b-r", source: "ec2b", target: "redis", ...edgeColor("hsl(312,100%,60%)") },
  { id: "w-db", source: "worker", target: "db", ...edgeColor("hsl(275,100%,45%)") },
  { id: "w-r", source: "worker", target: "redis", ...edgeColor("hsl(275,100%,45%)") },
]

/* ---------- component ---------- */
export function Architecture() {
  return (
    <section id="architecture" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <span className="mb-4 inline-block rounded-full border border-cf-blue/30 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cf-blue">
            How it works
          </span>
          <h2 className="mb-4 text-center font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Architecture at a glance
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center leading-relaxed text-muted-foreground">
            Hover on any node to see details. Two servers, one DB, zero drama.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto h-[480px] max-w-3xl overflow-hidden rounded-xl border border-border bg-card/50">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.35 }}
              proOptions={{ hideAttribution: true }}
              nodesDraggable={false}
              nodesConnectable={false}
              zoomOnScroll={false}
              panOnDrag={false}
              zoomOnDoubleClick={false}
              elementsSelectable={false}
            >
              <Background color="hsl(240,5%,20%)" gap={24} size={1} />
            </ReactFlow>
          </div>
        </FadeIn>

        {/* Pipeline summary */}
        <FadeIn delay={0.4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground md:text-sm">
            {["CF API", "Worker", "Compute", "Central DB + Cache", "Browser / Client"].map(
              (step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span
                    className="rounded-md border border-border/40 px-3 py-1.5 font-medium text-foreground/80"
                    style={{ backgroundColor: "rgba(19,19,24,0.6)" }}
                  >
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-cf-red"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
              )
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
