import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

export type StudioFocus = 'overview' | 'monitors' | 'ai-desk' | 'pinboard' | 'shelf'

type SceneProps = {
  isNight?: boolean
  onToggleNight?: () => void
  onSelectSection?: (sectionId: string) => void
}

const FOCUS_TARGETS: Record<
  StudioFocus,
  { lookAt: [number, number, number]; camOffset: [number, number, number]; zoomMult: number; label: string; sub: string }
> = {
  overview: {
    lookAt: [0.1, 0.72, 0],
    camOffset: [7.5, 6.1, 7.8],
    zoomMult: 1,
    label: 'Aleem’s 3D Studio',
    sub: 'Hover or click monitors, pinboard, shelf, or speaker',
  },
  monitors: {
    lookAt: [-0.35, 1.48, -0.25],
    camOffset: [5.2, 4.5, 6.2],
    zoomMult: 1.55,
    label: 'Polkasafe ($300M+) & Polkassembly',
    sub: 'Left Monitor · Multi-chain multisig & OpenGov architecture',
  },
  'ai-desk': {
    lookAt: [0.75, 1.45, -0.15],
    camOffset: [5.6, 4.5, 6.0],
    zoomMult: 1.55,
    label: 'Elvz AI — Multi-Agent System',
    sub: 'Right Monitor · 4.55/5 LLM-as-judge evals · 1/60th routing cost',
  },
  pinboard: {
    lookAt: [0.35, 2.45, -1.15],
    camOffset: [6.0, 5.3, 6.4],
    zoomMult: 1.5,
    label: 'Work Ledger — 5+ Years Experience',
    sub: 'Polka Labs · Bayzat · RocketLane · Masai',
  },
  shelf: {
    lookAt: [-1.25, 2.35, -1.15],
    camOffset: [5.8, 5.1, 6.4],
    zoomMult: 1.55,
    label: 'MSc Applied AI & Technical Toolkit',
    sub: 'Vistula University · Small Language Model Research',
  },
}

function RoundedBox({
  size,
  radius = 0.06,
  color,
  roughness = 0.75,
  metalness = 0.05,
  emissive,
  emissiveIntensity = 0,
  position,
  rotation,
  castShadow = true,
  receiveShadow = true,
}: {
  size: [number, number, number]
  radius?: number
  color: string
  roughness?: number
  metalness?: number
  emissive?: string
  emissiveIntensity?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  castShadow?: boolean
  receiveShadow?: boolean
}) {
  const geom = useMemo(() => {
    const [w, h, d] = size
    const r = Math.min(radius, w / 2.2, h / 2.2, d / 2.2)
    const shape = new THREE.Shape()
    const x = -w / 2
    const y = -h / 2
    shape.moveTo(x + r, y)
    shape.lineTo(x + w - r, y)
    shape.quadraticCurveTo(x + w, y, x + w, y + r)
    shape.lineTo(x + w, y + h - r)
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    shape.lineTo(x + r, y + h)
    shape.quadraticCurveTo(x, y + h, x, y + h - r)
    shape.lineTo(x, y + r)
    shape.quadraticCurveTo(x, y, x + r, y)

    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: d - r * 2,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: r,
      bevelThickness: r,
    })
    extrude.center()
    return extrude
  }, [size, radius])

  useEffect(() => () => geom.dispose(), [geom])

  return (
    <mesh
      geometry={geom}
      position={position}
      rotation={rotation}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive ?? '#000000'}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  )
}

/* Stylized 3D Character of Aleem at the Desk:
   Uses smooth spherical/capsule clay geometry in a natural over-the-shoulder 3/4 working pose
   at the dual monitors with his cream quarter-zip sweater, voluminous dark wavy hair,
   groomed beard contour, and studio headphones. */
function AleemCharacter({ hoveredPart }: { hoveredPart: string | null }) {
  const headRef = useRef<THREE.Group>(null!)
  const bodyRef = useRef<THREE.Group>(null!)

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1)
    const t = state.clock.elapsedTime
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.72 + Math.sin(t * 2.2) * 0.01
    }
    if (headRef.current) {
      const targetY = -0.35 + state.pointer.x * 0.28 + (hoveredPart ? 0.18 : 0)
      const targetX = 0.05 - state.pointer.y * 0.12
      headRef.current.rotation.y = THREE.MathUtils.damp(headRef.current.rotation.y, targetY, 5, delta)
      headRef.current.rotation.x = THREE.MathUtils.damp(headRef.current.rotation.x, targetX, 5, delta)
    }
  })

  return (
    <group position={[0.08, 0, 0.56]} rotation={[0, -2.38, 0]}>
      {/* Modern Ergonomic Studio Chair */}
      <group position={[0, 0, -0.04]}>
        <RoundedBox size={[0.56, 0.045, 0.14]} radius={0.02} color="#94a3b8" position={[0, 0.04, 0]} />
        <RoundedBox size={[0.14, 0.045, 0.56]} radius={0.02} color="#94a3b8" position={[0, 0.04, 0]} />
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.42, 16]} />
          <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Seat Cushion */}
        <RoundedBox size={[0.6, 0.09, 0.56]} radius={0.04} color="#f8f6f2" position={[0, 0.46, 0]} />
        {/* Sculpted Mid-Back Chair Rest */}
        <RoundedBox
          size={[0.52, 0.54, 0.08]}
          radius={0.04}
          color="#f8f6f2"
          position={[0, 0.76, -0.24]}
          rotation={[-0.08, 0, 0]}
        />
      </group>

      {/* Character Body & Smooth Clay Head */}
      <group ref={bodyRef} position={[0, 0.72, 0]}>
        {/* Dark Trousers / Legs sitting */}
        <RoundedBox size={[0.17, 0.14, 0.44]} radius={0.05} color="#1e1e28" position={[-0.13, -0.18, 0.16]} />
        <RoundedBox size={[0.17, 0.14, 0.44]} radius={0.05} color="#1e1e28" position={[0.13, -0.18, 0.16]} />
        <RoundedBox size={[0.15, 0.36, 0.15]} radius={0.05} color="#1e1e28" position={[-0.13, -0.38, 0.32]} />
        <RoundedBox size={[0.15, 0.36, 0.15]} radius={0.05} color="#1e1e28" position={[0.13, -0.38, 0.32]} />
        {/* Sneakers with White Soles */}
        <RoundedBox size={[0.17, 0.1, 0.26]} radius={0.04} color="#f8fafc" position={[-0.13, -0.58, 0.36]} />
        <RoundedBox size={[0.17, 0.1, 0.26]} radius={0.04} color="#f8fafc" position={[0.13, -0.58, 0.36]} />
        <RoundedBox size={[0.15, 0.07, 0.2]} radius={0.03} color="#27272a" position={[-0.13, -0.55, 0.35]} />
        <RoundedBox size={[0.15, 0.07, 0.2]} radius={0.03} color="#27272a" position={[0.13, -0.55, 0.35]} />

        {/* Cream Quarter-Zip Sweater Torso */}
        <RoundedBox size={[0.48, 0.52, 0.31]} radius={0.12} color="#f3ede2" position={[0, 0.08, 0]} />
        {/* Quarter-Zip Collar */}
        <mesh position={[0, 0.35, 0.01]} castShadow>
          <cylinderGeometry args={[0.14, 0.16, 0.12, 20]} />
          <meshStandardMaterial color="#f7f2e8" roughness={0.7} />
        </mesh>

        {/* Arms in Cream Sweater reaching toward keyboard */}
        <RoundedBox
          size={[0.14, 0.38, 0.14]}
          radius={0.06}
          color="#f3ede2"
          position={[-0.27, 0.06, 0.14]}
          rotation={[-0.75, 0.2, -0.15]}
        />
        <RoundedBox
          size={[0.14, 0.38, 0.14]}
          radius={0.06}
          color="#f3ede2"
          position={[0.27, 0.06, 0.14]}
          rotation={[-0.75, -0.2, 0.15]}
        />
        <mesh position={[-0.23, -0.04, 0.33]} castShadow>
          <sphereGeometry args={[0.062, 16, 16]} />
          <meshStandardMaterial color="#d99b72" roughness={0.65} />
        </mesh>
        <mesh position={[0.23, -0.04, 0.33]} castShadow>
          <sphereGeometry args={[0.062, 16, 16]} />
          <meshStandardMaterial color="#d99b72" roughness={0.65} />
        </mesh>

        {/* Smooth Sculpted Clay Head & Voluminous Wavy Hair */}
        <group ref={headRef} position={[0, 0.58, 0.02]}>
          {/* Smooth Spherical Clay Head */}
          <mesh castShadow receiveShadow scale={[0.95, 1.05, 0.95]}>
            <sphereGeometry args={[0.21, 28, 28]} />
            <meshStandardMaterial color="#dead84" roughness={0.6} />
          </mesh>

          {/* Groomed Beard Contour along Jawline */}
          <mesh position={[0, -0.06, 0.03]} scale={[0.97, 0.72, 0.96]} castShadow>
            <sphereGeometry args={[0.205, 24, 24]} />
            <meshStandardMaterial color="#221e1f" roughness={0.85} />
          </mesh>

          {/* Voluminous Dark Wavy Pompadour Hair */}
          <mesh position={[0, 0.08, -0.02]} scale={[1.04, 0.92, 1.05]} castShadow>
            <sphereGeometry args={[0.212, 24, 24]} />
            <meshStandardMaterial color="#1a1716" roughness={0.8} />
          </mesh>
          <RoundedBox
            size={[0.34, 0.15, 0.32]}
            radius={0.07}
            color="#221e1d"
            position={[0, 0.22, 0.04]}
            rotation={[-0.15, 0.08, 0.05]}
          />
          <RoundedBox
            size={[0.25, 0.12, 0.24]}
            radius={0.055}
            color="#2b2623"
            position={[0.04, 0.27, 0.07]}
            rotation={[-0.18, -0.1, -0.08]}
          />

          {/* Sleek Matte Violet/Slate Studio Headphones */}
          <mesh position={[-0.205, 0.01, 0.01]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.068, 0.068, 0.045, 20]} />
            <meshStandardMaterial color="#5b2bf5" roughness={0.4} metalness={0.2} />
          </mesh>
          <mesh position={[0.205, 0.01, 0.01]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.068, 0.068, 0.045, 20]} />
            <meshStandardMaterial color="#5b2bf5" roughness={0.4} metalness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

function StudioRoom({
  focus,
  setFocus,
  isNight,
  onToggleNight,
  onSelectSection,
}: {
  focus: StudioFocus
  setFocus: (f: StudioFocus) => void
  isNight: boolean
  onToggleNight?: () => void
  onSelectSection?: (s: string) => void
}) {
  const root = useRef<THREE.Group>(null!)
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.cursor = hoveredPart ? 'pointer' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hoveredPart])

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1)
    if (!root.current) return
    const targetRotY = state.pointer.x * 0.14
    const targetRotX = -state.pointer.y * 0.06
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetRotY, 4, delta)
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, targetRotX, 4, delta)
  })

  return (
    <group ref={root} position={[0, -0.14, 0]}>
      {/* ── Layered Geometric Rug (Warm Terracotta / Gold like David Heckhoff) ── */}
      <group position={[-0.1, 0.01, 0.42]} rotation={[0, 0.08, 0]}>
        <RoundedBox
          size={[3.5, 0.03, 2.55]}
          radius={0.12}
          color={isNight ? '#312e81' : '#e0822b'}
          position={[0, 0, 0]}
        />
        <RoundedBox
          size={[2.95, 0.036, 2.05]}
          radius={0.1}
          color={isNight ? '#4338ca' : '#f4b942'}
          position={[0, 0.005, 0]}
        />
        <RoundedBox
          size={[2.35, 0.042, 1.5]}
          radius={0.08}
          color={isNight ? '#4f46e5' : '#e0822b'}
          position={[0, 0.01, 0]}
        />
        <RoundedBox
          size={[1.75, 0.048, 0.95]}
          radius={0.06}
          color={isNight ? '#6366f1' : '#f7cf65'}
          position={[0, 0.015, 0]}
        />
      </group>

      {/* ── Modern Rounded Desk & Wooden Legs ── */}
      <group position={[0.1, 0, -0.18]}>
        {/* Matte White Tabletop */}
        <RoundedBox
          size={[2.85, 0.11, 1.22]}
          radius={0.05}
          color={isNight ? '#e2e8f0' : '#ffffff'}
          roughness={0.55}
          position={[0, 0.88, 0]}
        />
        {/* 4 Tapered Oak Legs */}
        {(
          [
            [-1.22, 0.43, -0.44],
            [1.22, 0.43, -0.44],
            [-1.22, 0.43, 0.44],
            [1.22, 0.43, 0.44],
          ] as [number, number, number][]
        ).map((pos, idx) => (
          <mesh key={idx} position={pos} castShadow receiveShadow>
            <cylinderGeometry args={[0.055, 0.042, 0.86, 16]} />
            <meshStandardMaterial color="#cfa06e" roughness={0.7} />
          </mesh>
        ))}

        {/* Keyboard & Trackpad on Desk */}
        <RoundedBox size={[0.52, 0.025, 0.18]} radius={0.01} color="#cbd5e1" position={[0.02, 0.945, 0.22]} />
        <RoundedBox size={[0.16, 0.02, 0.14]} radius={0.01} color="#e2e8f0" position={[0.42, 0.945, 0.22]} />

        {/* ── Left Monitor: Polkasafe ($300M+ Multisig) & Polkassembly ── */}
        <group
          position={[-0.56, 0.94, -0.22]}
          rotation={[0, 0.18, 0]}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHoveredPart('monitors')
          }}
          onPointerOut={() => setHoveredPart(null)}
          onClick={(e) => {
            e.stopPropagation()
            setFocus(focus === 'monitors' ? 'overview' : 'monitors')
            onSelectSection?.('system-polkasafe')
          }}
        >
          {/* Stand */}
          <RoundedBox size={[0.26, 0.025, 0.2]} radius={0.01} color="#3b3645" position={[0, 0.01, 0]} />
          <RoundedBox size={[0.08, 0.22, 0.05]} radius={0.01} color="#474154" position={[0, 0.12, -0.03]} />
          {/* Monitor Bezel */}
          <RoundedBox
            size={[0.98, 0.62, 0.06]}
            radius={0.03}
            color={hoveredPart === 'monitors' ? '#6d28d9' : '#4a4458'}
            position={[0, 0.44, 0]}
          />
          {/* Dark Screen */}
          <RoundedBox
            size={[0.9, 0.54, 0.02]}
            radius={0.02}
            color="#23212c"
            roughness={0.35}
            position={[0, 0.44, 0.025]}
          />
          {/* Polkasafe UI Sidebar + $300M+ Bars */}
          <RoundedBox
            size={[0.12, 0.44, 0.01]}
            radius={0.005}
            color="#353144"
            position={[-0.34, 0.44, 0.036]}
          />
          <RoundedBox
            size={[0.28, 0.06, 0.01]}
            radius={0.005}
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.6}
            position={[-0.08, 0.58, 0.038]}
          />
          <RoundedBox
            size={[0.48, 0.035, 0.01]}
            radius={0.005}
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.45}
            position={[0.02, 0.49, 0.038]}
          />
          <RoundedBox
            size={[0.42, 0.03, 0.01]}
            radius={0.005}
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.35}
            position={[-0.01, 0.42, 0.038]}
          />
          <RoundedBox
            size={[0.52, 0.03, 0.01]}
            radius={0.005}
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            position={[0.04, 0.35, 0.038]}
          />
          <RoundedBox
            size={[0.36, 0.03, 0.01]}
            radius={0.005}
            color="#c084fc"
            emissive="#c084fc"
            emissiveIntensity={0.4}
            position={[-0.04, 0.28, 0.038]}
          />
        </group>

        {/* ── Right Monitor: Elvz AI Multi-Agent System ── */}
        <group
          position={[0.54, 0.94, -0.18]}
          rotation={[0, -0.16, 0]}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHoveredPart('ai-desk')
          }}
          onPointerOut={() => setHoveredPart(null)}
          onClick={(e) => {
            e.stopPropagation()
            setFocus(focus === 'ai-desk' ? 'overview' : 'ai-desk')
            onSelectSection?.('system-elvz-ai')
          }}
        >
          {/* Stand */}
          <RoundedBox size={[0.26, 0.025, 0.2]} radius={0.01} color="#3b3645" position={[0, 0.01, 0]} />
          <RoundedBox size={[0.08, 0.22, 0.05]} radius={0.01} color="#474154" position={[0, 0.12, -0.03]} />
          {/* Monitor Bezel */}
          <RoundedBox
            size={[0.98, 0.62, 0.06]}
            radius={0.03}
            color={hoveredPart === 'ai-desk' ? '#7c3aed' : '#4a4458'}
            position={[0, 0.44, 0]}
          />
          {/* Dark Screen */}
          <RoundedBox
            size={[0.9, 0.54, 0.02]}
            radius={0.02}
            color="#23212c"
            roughness={0.35}
            position={[0, 0.44, 0.025]}
          />
          {/* Code / Agent Graph Lines on Screen */}
          {[0.61, 0.55, 0.49, 0.43, 0.37, 0.31, 0.25].map((yVal, i) => (
            <RoundedBox
              key={i}
              size={[0.32 + ((i * 13) % 28) * 0.01, 0.026, 0.01]}
              radius={0.005}
              color={['#a855f7', '#f59e0b', '#34d399', '#60a5fa', '#f472b6'][i % 5]}
              emissive={['#a855f7', '#f59e0b', '#34d399', '#60a5fa', '#f472b6'][i % 5]}
              emissiveIntensity={0.45}
              position={[-0.18 + ((i * 7) % 10) * 0.015, yVal, 0.038]}
            />
          ))}
        </group>

        {/* ── Desk Accessories (Penguin, Pencil Cup, Rubik's Cube, Speaker / Lamp) ── */}
        {/* Cute Penguin Buddy on Left */}
        <group position={[-1.18, 0.94, 0.18]} rotation={[0, 0.4, 0]}>
          <RoundedBox size={[0.14, 0.18, 0.13]} radius={0.06} color="#18181b" position={[0, 0.09, 0]} />
          <RoundedBox size={[0.1, 0.13, 0.04]} radius={0.04} color="#ffffff" position={[0, 0.08, 0.055]} />
          <RoundedBox size={[0.04, 0.025, 0.04]} radius={0.01} color="#f59e0b" position={[0, 0.12, 0.075]} />
        </group>

        {/* Pencil Cup with Colored Pencils */}
        <group position={[-0.98, 0.94, 0.02]}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.065, 0.06, 0.16, 18]} />
            <meshStandardMaterial color="#d6c7b2" roughness={0.75} />
          </mesh>
          <mesh position={[-0.02, 0.19, 0]} rotation={[0, 0, 0.15]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.16, 10]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.6} />
          </mesh>
          <mesh position={[0.025, 0.19, 0.01]} rotation={[0.1, 0, -0.18]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.16, 10]} />
            <meshStandardMaterial color="#fb7185" roughness={0.6} />
          </mesh>
        </group>

        {/* Rubik's Cube */}
        <group position={[0.88, 0.99, 0.25]} rotation={[0, 0.45, 0]}>
          <RoundedBox size={[0.12, 0.12, 0.12]} radius={0.015} color="#3b82f6" position={[0, 0, 0]} />
        </group>

        {/* Warm Yellow Studio Speaker (Click to toggle Day / Night mood!) */}
        <group
          position={[1.14, 0.94, 0.22]}
          rotation={[0, -0.35, 0]}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHoveredPart('lamp')
          }}
          onPointerOut={() => setHoveredPart(null)}
          onClick={(e) => {
            e.stopPropagation()
            onToggleNight?.()
          }}
        >
          <RoundedBox
            size={[0.18, 0.25, 0.15]}
            radius={0.02}
            color="#f59e0b"
            emissive={isNight ? '#f59e0b' : '#000000'}
            emissiveIntensity={isNight ? 0.35 : 0}
            position={[0, 0.125, 0]}
          />
          <RoundedBox size={[0.15, 0.22, 0.02]} radius={0.01} color="#f8fafc" position={[0, 0.125, 0.072]} />
          <mesh position={[0, 0.11, 0.084]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.01, 20]} />
            <meshStandardMaterial color="#3f3f46" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ── Lush Potted Plant on Floor (Right of Desk, matching David Heckhoff) ── */}
      <group position={[1.85, 0, 0.18]}>
        {/* Ceramic Pot */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.19, 0.44, 24]} />
          <meshStandardMaterial color="#bca892" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.38, 0]} castShadow>
          <cylinderGeometry args={[0.29, 0.27, 0.12, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.65} />
        </mesh>
        {/* Sculpted Green Leaves */}
        <RoundedBox
          size={[0.16, 0.62, 0.06]}
          radius={0.03}
          color="#65c11f"
          position={[-0.08, 0.68, 0.04]}
          rotation={[0.15, 0.2, 0.28]}
        />
        <RoundedBox
          size={[0.18, 0.72, 0.06]}
          radius={0.03}
          color="#76d327"
          position={[0.04, 0.75, -0.02]}
          rotation={[-0.1, -0.1, -0.12]}
        />
        <RoundedBox
          size={[0.15, 0.56, 0.06]}
          radius={0.03}
          color="#54a815"
          position={[0.14, 0.64, 0.08]}
          rotation={[0.25, -0.3, -0.35]}
        />
      </group>

      {/* ── Wall Elements (Shelf with Books & Cactus, Cork Pinboard, Framed Picture) ── */}
      {/* Floating Shelf + Books + Cactus (Left Wall) */}
      <group
        position={[-1.25, 2.15, -1.15]}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredPart('shelf')
        }}
        onPointerOut={() => setHoveredPart(null)}
        onClick={(e) => {
          e.stopPropagation()
          setFocus(focus === 'shelf' ? 'overview' : 'shelf')
          onSelectSection?.('toolkit')
        }}
      >
        <RoundedBox
          size={[0.88, 0.07, 0.34]}
          radius={0.02}
          color={hoveredPart === 'shelf' ? '#e9d5ff' : '#e7d8c1'}
          position={[0, 0, 0]}
        />
        {/* Books */}
        <RoundedBox size={[0.11, 0.34, 0.24]} radius={0.015} color="#cbd5e1" position={[-0.28, 0.2, 0]} />
        <RoundedBox size={[0.13, 0.34, 0.24]} radius={0.015} color="#f59e0b" position={[-0.14, 0.2, 0]} />
        {/* Mini White Pot + Green Cactus */}
        <mesh position={[0.18, 0.13, 0]} castShadow>
          <sphereGeometry args={[0.12, 18, 18]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} />
        </mesh>
        <RoundedBox size={[0.08, 0.18, 0.08]} radius={0.035} color="#65c11f" position={[0.18, 0.27, 0]} />
      </group>

      {/* Cork Pinboard with Pinned Notes (Center-Right Wall) */}
      <group
        position={[0.45, 2.32, -1.18]}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredPart('pinboard')
        }}
        onPointerOut={() => setHoveredPart(null)}
        onClick={(e) => {
          e.stopPropagation()
          setFocus(focus === 'pinboard' ? 'overview' : 'pinboard')
          onSelectSection?.('work')
        }}
      >
        {/* Wooden Frame */}
        <RoundedBox
          size={[1.65, 0.98, 0.07]}
          radius={0.03}
          color={hoveredPart === 'pinboard' ? '#c084fc' : '#e7d8c1'}
          position={[0, 0, 0]}
        />
        {/* Cork Surface */}
        <RoundedBox size={[1.52, 0.85, 0.03]} radius={0.02} color="#9c8978" position={[0, 0, 0.03]} />
        {/* Pinned Blue Note ($300M+ TVL) */}
        <group position={[-0.42, 0.1, 0.055]} rotation={[0, 0, 0.05]}>
          <RoundedBox size={[0.38, 0.46, 0.015]} radius={0.005} color="#93c5fd" />
          <mesh position={[0, 0.16, 0.025]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.035, 0.04, 14]} />
            <meshStandardMaterial color="#f43f5e" roughness={0.5} />
          </mesh>
        </group>
        {/* Pinned White Note (Elvz AI 4.55/5) */}
        <group position={[0.36, -0.14, 0.055]} rotation={[0, 0, -0.08]}>
          <RoundedBox size={[0.42, 0.48, 0.015]} radius={0.005} color="#f8fafc" />
          <mesh position={[0, 0.16, 0.025]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.035, 0.04, 14]} />
            <meshStandardMaterial color="#f43f5e" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* Framed Blue Mountain Picture (Right Wall, matching David Heckhoff) */}
      <group position={[1.95, 1.55, -1.18]} rotation={[0, 0, -0.04]}>
        <RoundedBox size={[0.82, 0.62, 0.06]} radius={0.03} color="#7ea6d2" position={[0, 0, 0]} />
        <RoundedBox size={[0.68, 0.48, 0.02]} radius={0.015} color="#9abce0" position={[0, 0, 0.028]} />
        {/* Sun & Mountains */}
        <mesh position={[0.14, 0.1, 0.042]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.015, 20]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.6} />
        </mesh>
        <RoundedBox
          size={[0.26, 0.26, 0.015]}
          radius={0.02}
          color="#f8fafc"
          position={[-0.12, -0.12, 0.042]}
          rotation={[0, 0, Math.PI / 4]}
        />
      </group>

      {/* ── Aleem's 3D Stylized Character at the Desk ── */}
      <AleemCharacter hoveredPart={hoveredPart} />
    </group>
  )
}

function CameraController({ focus, isNight }: { focus: StudioFocus; isNight: boolean }) {
  const camera = useThree((s) => s.camera as THREE.OrthographicCamera)
  const size = useThree((s) => s.size)
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const lookAtVec = useRef(new THREE.Vector3(0, 0.85, 0))
  const initialized = useRef(false)

  useEffect(() => {
    const cfg = FOCUS_TARGETS[focus]
    const syncAndRender = () => {
      const w = gl.domElement.clientWidth || size.width || 600
      const h = gl.domElement.clientHeight || size.height || 550
      const bZoom = Math.min(w, h) / 5.75
      if (!initialized.current) {
        camera.position.set(cfg.camOffset[0], cfg.camOffset[1], cfg.camOffset[2])
        lookAtVec.current.set(cfg.lookAt[0], cfg.lookAt[1], cfg.lookAt[2])
        initialized.current = true
      }
      camera.zoom = bZoom * cfg.zoomMult
      camera.lookAt(lookAtVec.current)
      camera.updateProjectionMatrix()
      gl.render(scene, camera)
    }
    syncAndRender()
    const ro = new ResizeObserver(() => {
      syncAndRender()
      window.setTimeout(syncAndRender, 16)
    })
    ro.observe(gl.domElement)
    const t = window.setTimeout(syncAndRender, 60)
    return () => {
      ro.disconnect()
      window.clearTimeout(t)
    }
  }, [camera, size.width, size.height, focus, isNight, gl, scene])

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1)
    const cfg = FOCUS_TARGETS[focus]
    const baseZoom = Math.min(size.width || 600, size.height || 550) / 5.75
    const targetZoom = baseZoom * cfg.zoomMult

    camera.position.x = THREE.MathUtils.damp(camera.position.x, cfg.camOffset[0], 4.5, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cfg.camOffset[1], 4.5, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cfg.camOffset[2], 4.5, delta)

    lookAtVec.current.x = THREE.MathUtils.damp(lookAtVec.current.x, cfg.lookAt[0], 5, delta)
    lookAtVec.current.y = THREE.MathUtils.damp(lookAtVec.current.y, cfg.lookAt[1], 5, delta)
    lookAtVec.current.z = THREE.MathUtils.damp(lookAtVec.current.z, cfg.lookAt[2], 5, delta)

    camera.zoom = THREE.MathUtils.damp(camera.zoom, targetZoom, 4.5, delta)
    camera.lookAt(lookAtVec.current)
    camera.updateProjectionMatrix()
  })

  return null
}

export default function Scene({ isNight = false, onToggleNight, onSelectSection }: SceneProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const [focus, setFocus] = useState<StudioFocus>('overview')

  const activeMeta = FOCUS_TARGETS[focus]

  return (
    <div ref={wrap} className="studio-canvas-wrap">
      <Canvas
        shadows
        orthographic
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        camera={{ position: [7.5, 6.2, 7.8], zoom: 95, near: 0.1, far: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={isNight ? 0.65 : 1.35} color={isNight ? '#c7d2fe' : '#fff8ed'} />
        <hemisphereLight
          color={isNight ? '#818cf8' : '#fffbf2'}
          groundColor={isNight ? '#1e1b4b' : '#e6d7c3'}
          intensity={isNight ? 0.55 : 0.85}
        />
        <directionalLight
          castShadow
          position={[5, 9, 6]}
          intensity={isNight ? 1.35 : 2.1}
          color={isNight ? '#a5b4fc' : '#fff5e4'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {isNight && <pointLight position={[1.2, 1.8, 0.2]} intensity={2.2} color="#f59e0b" distance={6} />}

        {/* Invisible Shadow-Catching Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]} receiveShadow>
          <planeGeometry args={[18, 18]} />
          <shadowMaterial opacity={isNight ? 0.35 : 0.14} />
        </mesh>

        <StudioRoom
          focus={focus}
          setFocus={setFocus}
          isNight={isNight}
          onToggleNight={onToggleNight}
          onSelectSection={onSelectSection}
        />
        <CameraController focus={focus} isNight={isNight} />
      </Canvas>

      {/* Floating 3D Clay Character Portrait Badge in Studio Top-Left */}
      <a
        href="#about"
        className="studio-avatar-float"
        title="View Aleem's 3D Clay Avatar & Engineering Profile"
      >
        <div className="studio-avatar-thumb-wrap">
          <img
            src="/aleem-3d.jpg"
            alt="Aleem Alam 3D Clay Character Avatar"
            className="studio-avatar-thumb"
          />
        </div>
        <div className="studio-avatar-meta">
          <span className="studio-avatar-tag">3D CHARACTER</span>
          <strong>Aleem Alam</strong>
          <span>Lead Web3 &amp; AI Engineer</span>
        </div>
      </a>

      {/* Interactive 3D Camera Station Controls */}
      <div className="studio-hud">
        <div className="studio-hud-info">
          <span className="studio-hud-badge">{focus === 'overview' ? '3D ISOMETRIC STUDIO' : 'CAMERA ZOOMED'}</span>
          <strong>{activeMeta.label}</strong>
          <span className="studio-hud-sub">{activeMeta.sub}</span>
        </div>

        <div className="studio-station-pills" role="group" aria-label="Zoom 3D camera to studio station">
          {(
            [
              { id: 'overview', label: 'Full Room' },
              { id: 'monitors', label: 'Polkasafe $300M+' },
              { id: 'ai-desk', label: 'Elvz AI Desk' },
              { id: 'pinboard', label: 'Career Pinboard' },
              { id: 'shelf', label: 'MSc AI Shelf' },
            ] as { id: StudioFocus; label: string }[]
          ).map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setFocus(st.id)}
              className={`station-pill ${focus === st.id ? 'active' : ''}`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
