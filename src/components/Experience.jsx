import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Globe() {
  const wire = useRef()

  useFrame((_, delta) => {
    if (wire.current) wire.current.rotation.y += delta * 0.08
  })

  return (
    <group position={[-2.4, -0.35, -2.2]} scale={0.92}>
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color="#161b22"
          roughness={0.38}
          metalness={0.62}
          emissive="#2a2114"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={wire} scale={1.012}>
        <sphereGeometry args={[1.2, 28, 18]} />
        <meshBasicMaterial color="#e0c394" wireframe transparent opacity={0.42} />
      </mesh>
      <mesh scale={1.26}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#e8c49a"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85, 0.01, 12, 128]} />
        <meshBasicMaterial color="#d4b483" transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

function CameraRig() {
  useFrame((state, delta) => {
    const x = -0.35 + state.pointer.x * 0.35
    const y = 0.2 + state.pointer.y * 0.12
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, x, 2, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, y, 2, delta)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 6.8, 2, delta)
    state.camera.lookAt(-1.2, 0, -1)
  })
  return null
}

export default function Experience() {
  return (
    <>
      <color attach="background" args={['#090b0d']} />
      <fog attach="fog" args={['#090b0d', 10, 28]} />
      <ambientLight intensity={0.55} />
      <spotLight position={[2, 8, 8]} angle={0.5} penumbra={1} intensity={40} color="#f2d6b3" />
      <Sparkles
        count={60}
        scale={[16, 8, 10]}
        size={2.4}
        speed={0.25}
        opacity={0.4}
        color="#f3e4c8"
      />
      <Globe />
      <CameraRig />
    </>
  )
}
