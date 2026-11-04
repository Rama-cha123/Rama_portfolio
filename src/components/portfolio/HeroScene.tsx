import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Hero centerpiece: a chrome torus-knot sculpture, orbiting metallic rings,
 * glass prisms and a light particle field. Tuned for low-end hardware:
 * few draw calls, no shadows, capped DPR, small particle counts.
 */

const LAVENDER = "#A78BFA";
const ELECTRIC = "#60A5FA";

interface SceneProps {
  active: boolean;
  lite: boolean;
  reducedMotion: boolean;
}

function Sculpture({ lite }: { lite: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    const dt = Math.min(d, 0.05);
    if (ref.current) {
      ref.current.rotation.x += dt * 0.12;
      ref.current.rotation.y += dt * 0.18;
    }
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.34, lite ? 140 : 220, lite ? 20 : 32, 2, 3]} />
      <meshStandardMaterial color="#d9dbe3" metalness={1} roughness={0.14} envMapIntensity={1.25} />
    </mesh>
  );
}

function Ring({
  radius,
  tube,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tube: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += Math.min(d, 0.05) * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, tube, 12, 120]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.22} />
      </mesh>
    </group>
  );
}

function Prism({
  position,
  scale,
  lite,
  seed,
}: {
  position: [number, number, number];
  scale: number;
  lite: boolean;
  seed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, d) => {
    if (!ref.current) return;
    const dt = Math.min(d, 0.05);
    ref.current.rotation.x += dt * 0.3;
    ref.current.rotation.y += dt * 0.4;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + seed) * 0.15;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <cylinderGeometry args={[0.5, 0.5, 1.2, 3]} />
      {lite ? (
        <meshPhysicalMaterial
          color="#c9c3ff"
          metalness={0.2}
          roughness={0.05}
          transparent
          opacity={0.45}
          iridescence={1}
          clearcoat={1}
        />
      ) : (
        <meshPhysicalMaterial
          color="#e8e4ff"
          metalness={0}
          roughness={0.04}
          transmission={1}
          thickness={0.6}
          ior={1.45}
          iridescence={0.8}
          clearcoat={1}
        />
      )}
    </mesh>
  );
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 6;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(p) - 2;
    }
    return arr;
  }, [count]);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#cfd6ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Mouse parallax + scroll-responsive camera drift. */
function CameraRig() {
  const { camera, pointer } = useThree();
  const scroll = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1.2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useFrame((_, d) => {
    const k = 1 - Math.exp(-3 * Math.min(d, 0.05));
    const tx = pointer.x * 0.6;
    const ty = pointer.y * 0.35 + scroll.current * 1.2;
    const tz = 6.4 + scroll.current * 2.2;
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.position.z += (tz - camera.position.z) * k;
    camera.lookAt(0, scroll.current * 0.6, 0);
  });
  return null;
}

function ReadyFlag({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

export default function HeroScene({ active, lite, reducedMotion }: SceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameloop = reducedMotion ? "demand" : active ? "always" : "never";

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={frameloop}
        dpr={lite ? [1, 1.25] : [1, 1.6]}
        camera={{ position: [0, 0, 6.4], fov: 38 }}
        gl={{ antialias: !lite, powerPreference: "high-performance", alpha: true }}
      >
        <ReadyFlag onReady={() => wrapRef.current?.setAttribute("data-scene-ready", "true")} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 5, 3]} intensity={1.2} color={LAVENDER} />
        <directionalLight position={[-5, -2, 2]} intensity={0.9} color={ELECTRIC} />
        <Environment resolution={lite ? 128 : 256}>
          <Lightformer intensity={3} position={[0, 5, -2]} scale={[10, 3, 1]} />
          <Lightformer
            intensity={4}
            color={LAVENDER}
            position={[-5, 1, 1]}
            rotation-y={Math.PI / 2}
            scale={[12, 2, 1]}
          />
          <Lightformer
            intensity={4}
            color={ELECTRIC}
            position={[5, -1, 1]}
            rotation-y={-Math.PI / 2}
            scale={[12, 2, 1]}
          />
          <Lightformer intensity={1.5} position={[0, -4, 2]} scale={[8, 1, 1]} />
        </Environment>

        <group position={[lite ? 0 : 1.4, lite ? 1.25 : 0.1, 0]} scale={lite ? 0.58 : 1}>
          <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.3} floatIntensity={0.6}>
            <Sculpture lite={lite} />
          </Float>
          <Ring radius={2.1} tube={0.018} tilt={[1.2, 0.2, 0]} speed={0.25} color="#e5e7ee" />
          <Ring radius={2.55} tube={0.012} tilt={[1.4, -0.5, 0.3]} speed={-0.18} color={LAVENDER} />
          <Ring radius={3.0} tube={0.008} tilt={[0.9, 0.6, -0.2]} speed={0.12} color={ELECTRIC} />
          <Prism position={[-2.2, 1.2, 0.6]} scale={0.42} lite={lite} seed={0} />
          <Prism position={[2.3, -1.1, 0.8]} scale={0.32} lite={lite} seed={2} />
          {!lite && <Prism position={[1.6, 1.8, -0.8]} scale={0.24} lite={lite} seed={4} />}
        </group>

        <Particles count={lite ? 180 : 520} />
        {!reducedMotion && <CameraRig />}
      </Canvas>
    </div>
  );
}
