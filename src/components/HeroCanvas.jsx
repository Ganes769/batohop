import { Canvas } from '@react-three/fiber'
import { Preload, useProgress } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import Experience from './Experience'

export default function HeroCanvas() {
  return (
    <div className="stage">
      <Canvas
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ position: [-0.4, 0.2, 6.8], fov: 42, near: 0.1, far: 80 }}
      >
        <Suspense fallback={null}>
          <Experience />
          <Preload all />
        </Suspense>
      </Canvas>
      <LoaderOverlay />
    </div>
  )
}

function LoaderOverlay() {
  const { active, progress } = useProgress()
  if (!active) return null

  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader-mark">Baatohop</div>
      <div className="loader-bar">
        <span style={{ width: `${Math.max(progress, 8)}%` }} />
      </div>
      <p>Preparing the hop</p>
    </div>
  )
}
