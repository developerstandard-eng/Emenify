import { Cloud, GraduationCap, Headset, Network, Server, ShieldCheck, type LucideIcon } from 'lucide-react'

/**
 * Hero visual: dotted-map globe, tilted orbit rings with service nodes, and a glowing podium.
 * Pure SVG, no images. Uses the site's only two gradients (glow + sphere shading). See DESIGN.md §5.
 */

const CX = 280
const CY = 250
const R = 150

interface Orbit {
  rx: number
  ry: number
  rot: number // degrees
}

const ORBITS: Orbit[] = [
  { rx: 222, ry: 64, rot: -16 },
  { rx: 200, ry: 52, rot: 22 },
]

function pointOn({ rx, ry, rot }: Orbit, deg: number) {
  const t = (deg * Math.PI) / 180
  const a = (rot * Math.PI) / 180
  return {
    x: CX + rx * Math.cos(t) * Math.cos(a) - ry * Math.sin(t) * Math.sin(a),
    y: CY + rx * Math.cos(t) * Math.sin(a) + ry * Math.sin(t) * Math.cos(a),
  }
}

/** Front half of an orbit (drawn over the sphere so the ring reads as passing in front). */
function frontArc(o: Orbit) {
  const a = pointOn(o, 0)
  const b = pointOn(o, 180)
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} A${o.rx} ${o.ry} ${o.rot} 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
}

const NODES: { icon: LucideIcon; orbit: number; deg: number; label: string }[] = [
  { icon: Headset, orbit: 0, deg: 192, label: 'Support' },
  { icon: Cloud, orbit: 0, deg: 352, label: 'Cloud' },
  { icon: ShieldCheck, orbit: 0, deg: 110, label: 'Security' },
  { icon: GraduationCap, orbit: 1, deg: 158, label: 'Training' },
  { icon: Server, orbit: 1, deg: 24, label: 'Infrastructure' },
  { icon: Network, orbit: 1, deg: 72, label: 'Networks' },
]

// Stylised land masses (Europe, Africa, Middle East, Asia) for a view centred near 40°E.
const LAND = [
  'M232 150C240 132 262 124 284 128C300 131 312 140 308 152C318 158 314 172 300 176C290 184 274 180 264 186C252 190 238 182 240 172C230 166 226 158 232 150Z',
  'M262 122C268 110 284 108 294 116C288 124 278 128 270 134Z',
  'M222 198C236 188 262 190 278 196C292 198 300 208 302 220C312 230 322 236 318 250C312 268 300 282 294 300C288 320 280 340 266 350C256 356 248 348 246 336C242 316 238 298 232 286C226 274 214 266 206 254C200 244 202 230 208 220C212 210 216 202 222 198Z',
  'M306 198C318 194 332 200 340 212C348 224 346 238 334 244C324 248 316 238 312 228C308 218 302 208 306 198Z',
  'M300 150C316 132 344 118 372 122C396 126 418 138 428 156C434 172 430 190 420 200C410 212 392 214 378 208C368 218 356 224 348 216C340 206 330 196 318 192C306 188 296 176 298 164C298 158 298 154 300 150Z',
  'M352 212C362 210 372 216 374 226C374 240 366 254 360 262C354 254 348 240 346 228C346 220 348 214 352 212Z',
  'M322 298C327 294 331 299 329 309C327 317 322 319 320 311Z',
  'M390 234C398 230 410 234 412 242C406 246 396 244 390 234Z',
  'M404 254C414 250 424 254 428 260C420 266 408 264 404 254Z',
  'M140 248C150 244 162 250 166 260C170 278 164 298 156 314C150 324 142 318 140 306Z',
  'M172 140C184 128 202 130 210 140C206 150 192 156 180 152Z',
]

const HUBS = [
  { x: 338, y: 214 }, // Dubai
  { x: 252, y: 156 }, // London
  { x: 356, y: 230 }, // Mumbai
  { x: 300, y: 282 }, // Nairobi
]

export function Globe({ className }: { className?: string }) {
  const [hub, ...spokes] = HUBS
  return (
    <svg
      viewBox="0 0 560 540"
      className={className}
      role="img"
      aria-label="Illustration of a globe with orbiting icons for support, cloud, security, training, infrastructure and networks"
    >
      <defs>
        <radialGradient id="g-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4F82CF" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#4F82CF" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#4F82CF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g-sphere" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#EAF2FC" />
          <stop offset="100%" stopColor="#D6E5F8" />
        </radialGradient>
        <pattern id="g-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.35" fill="#1E5BB8" />
        </pattern>
        <clipPath id="g-clip-sphere">
          <circle cx={CX} cy={CY} r={R - 1} />
        </clipPath>
        <clipPath id="g-clip-land">
          {LAND.map((d) => (
            <path key={d} d={d} />
          ))}
        </clipPath>
        <filter id="g-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#0A1F4D" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* Glow behind globe and podium */}
      <ellipse cx={CX} cy={CY + 40} rx={260} ry={240} fill="url(#g-glow)" />

      {/* Podium */}
      <g>
        <ellipse cx={CX} cy={470} rx={214} ry={40} fill="#F5F9FE" stroke="#E2E8F0" />
        <path d={`M${CX - 168} 446 v18 a168 30 0 0 0 336 0 v-18`} fill="#EAF2FC" stroke="#D6E5F8" />
        <ellipse cx={CX} cy={446} rx={168} ry={30} fill="#FFFFFF" stroke="#D6E5F8" />
        <ellipse cx={CX} cy={446} rx={128} ry={20} fill="url(#g-glow)" />
        <ellipse cx={CX} cy={446} rx={150} ry={26} fill="none" stroke="#F28C1B" strokeOpacity="0.55" strokeWidth="1.25" />
        {/* Contact shadow under the sphere */}
        <ellipse cx={CX} cy={444} rx={70} ry={7} fill="#0A1F4D" fillOpacity="0.05" />
      </g>

      {/* Outer ring, slow rotation */}
      <g className="motion-safe:animate-spin-slow" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <circle cx={CX} cy={CY} r={236} fill="none" stroke="#1E5BB8" strokeOpacity="0.18" strokeDasharray="2 7" />
        <circle cx={CX} cy={CY - 236} r={3.5} fill="#F28C1B" />
        <circle cx={CX - 236} cy={CY} r={2.5} fill="#1E5BB8" fillOpacity="0.5" />
      </g>

      {/* Back halves of the orbits (behind the sphere) */}
      {ORBITS.map((o, i) => (
        <ellipse
          key={i}
          cx={CX}
          cy={CY}
          rx={o.rx}
          ry={o.ry}
          transform={`rotate(${o.rot} ${CX} ${CY})`}
          fill="none"
          stroke="#1E5BB8"
          strokeOpacity="0.22"
          strokeDasharray="3 6"
          className="motion-safe:animate-dash-flow"
        />
      ))}

      {/* Sphere */}
      <circle cx={CX} cy={CY} r={R} fill="url(#g-sphere)" stroke="#1E5BB8" strokeOpacity="0.16" />
      <g clipPath="url(#g-clip-sphere)">
        {/* Graticule */}
        <g fill="none" stroke="#1E5BB8" strokeOpacity="0.1">
          {[150, 112, 70, 26].map((rx) => (
            <ellipse key={rx} cx={CX} cy={CY} rx={rx} ry={R} />
          ))}
          {[-100, -50, 0, 50, 100].map((dy) => {
            const rx = Math.sqrt(R * R - dy * dy)
            return <ellipse key={dy} cx={CX} cy={CY + dy} rx={rx} ry={rx * 0.16} />
          })}
        </g>
        {/* Dotted land */}
        <rect x={CX - R} y={CY - R} width={R * 2} height={R * 2} fill="url(#g-dots)" opacity="0.5" clipPath="url(#g-clip-land)" />
        {/* Route arcs from the main hub */}
        <g fill="none" stroke="#F28C1B" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.85">
          {spokes.map((s) => {
            const mx = (hub.x + s.x) / 2
            const my = Math.min(hub.y, s.y) - 28
            return <path key={`${s.x}-${s.y}`} d={`M${hub.x} ${hub.y} Q${mx} ${my} ${s.x} ${s.y}`} />
          })}
        </g>
        {HUBS.map((h, i) => (
          <g key={i}>
            <circle cx={h.x} cy={h.y} r={i === 0 ? 7 : 5} fill="#F28C1B" fillOpacity="0.2" />
            <circle cx={h.x} cy={h.y} r={i === 0 ? 3.5 : 2.5} fill="#F28C1B" />
          </g>
        ))}
      </g>

      {/* Front halves of the orbits */}
      {ORBITS.map((o, i) => (
        <path
          key={i}
          d={frontArc(o)}
          fill="none"
          stroke="#1E5BB8"
          strokeOpacity="0.4"
          strokeDasharray="3 6"
          className="motion-safe:animate-dash-flow"
        />
      ))}

      {/* Nodes */}
      {NODES.map(({ icon: Icon, orbit, deg, label }) => {
        const p = pointOn(ORBITS[orbit], deg)
        return (
          <g key={label} filter="url(#g-node-shadow)">
            <circle cx={p.x} cy={p.y} r={24} fill="#FFFFFF" stroke="#E2E8F0" />
            <Icon x={p.x - 10} y={p.y - 10} width={20} height={20} color="#0A1F4D" strokeWidth={1.5} aria-hidden />
          </g>
        )
      })}
    </svg>
  )
}
