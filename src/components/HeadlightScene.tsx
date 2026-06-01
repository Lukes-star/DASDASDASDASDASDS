import { useRef, Suspense, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function HeadlightModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.28;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.04;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.35}>
      <group ref={groupRef}>
        <mesh castShadow>
          <boxGeometry args={[2.5, 0.95, 0.65]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.88} roughness={0.12} />
        </mesh>
        <mesh position={[0, 0, 0.34]}>
          <boxGeometry args={[2.52, 0.97, 0.02]} />
          <meshStandardMaterial color="#999999" metalness={0.98} roughness={0.02} />
        </mesh>
        <mesh position={[-0.52, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.27, 0.04, 0.32, 32, 1, true]} />
          <meshStandardMaterial color="#888888" metalness={0.95} roughness={0.04} side={THREE.BackSide} />
        </mesh>
        <mesh position={[-0.52, 0, 0.29]}>
          <circleGeometry args={[0.26, 32]} />
          <meshPhysicalMaterial color="#99bbff" transparent opacity={0.35} roughness={0.05} metalness={0} />
        </mesh>
        <mesh position={[0.42, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.19, 0.03, 0.26, 32, 1, true]} />
          <meshStandardMaterial color="#777777" metalness={0.95} roughness={0.04} side={THREE.BackSide} />
        </mesh>
        <mesh position={[0.42, 0, 0.29]}>
          <circleGeometry args={[0.18, 32]} />
          <meshPhysicalMaterial color="#bbccff" transparent opacity={0.28} roughness={0.05} metalness={0} />
        </mesh>
        <mesh position={[0.05, 0.42, 0.29]}>
          <boxGeometry args={[2.1, 0.065, 0.07]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff2200" emissiveIntensity={6} />
        </mesh>
        <mesh position={[-1.08, 0.1, 0.27]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.38, 0.05, 0.06]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff3300" emissiveIntensity={4} />
        </mesh>
        <mesh position={[0.1, -0.37, 0.28]}>
          <boxGeometry args={[1.7, 0.048, 0.06]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff4400" emissiveIntensity={3.5} />
        </mesh>
        <mesh position={[0, 0, 0.33]}>
          <boxGeometry args={[2.48, 0.93, 0.01]} />
          <meshPhysicalMaterial color="#aabbdd" transparent opacity={0.09} roughness={0.04} metalness={0} />
        </mesh>
        <pointLight position={[-0.52, 0, 0.55]} intensity={1.8} color="#ffffff" distance={1.8} />
        <pointLight position={[0, 0.42, 0.55]} intensity={1.2} color="#ff2200" distance={1.4} />
      </group>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return pos;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
    ref.current.rotation.x = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.035} color="#ff4400" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function SmallOrbs() {
  const orbsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!orbsRef.current) return;
    orbsRef.current.rotation.z = state.clock.elapsedTime * 0.12;
  });

  const positions: [number, number, number][] = [
    [2.8, 0.3, -0.5], [-2.8, -0.4, -0.5],
    [2.0, -1.2, -1], [-2.0, 1.2, -1],
    [0.6, 1.6, -0.8], [-0.6, -1.6, -0.8],
  ];

  return (
    <group ref={orbsRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ff3300" emissive="#ff2200" emissiveIntensity={4} />
        </mesh>
      ))}
    </group>
  );
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function CSSHeadlightFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ position: "relative" }}>
      <style>{`
        @keyframes headlight-float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes headlight-glow-pulse {
          0%, 100% { opacity: 0.7; filter: blur(18px); }
          50% { opacity: 1; filter: blur(28px); }
        }
        @keyframes drl-glow {
          0%, 100% { box-shadow: 0 0 8px 2px #ff2200, 0 0 20px 4px #ff330055; }
          50% { box-shadow: 0 0 16px 4px #ff2200, 0 0 40px 8px #ff330088; }
        }
        @keyframes orb-orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes orb-orbit-2 {
          from { transform: rotate(120deg) translateX(100px) rotate(-120deg); }
          to { transform: rotate(480deg) translateX(100px) rotate(-480deg); }
        }
        @keyframes orb-orbit-3 {
          from { transform: rotate(240deg) translateX(90px) rotate(-240deg); }
          to { transform: rotate(600deg) translateX(90px) rotate(-600deg); }
        }
        .headlight-body {
          animation: headlight-float 3.5s ease-in-out infinite;
        }
        .glow-bg {
          animation: headlight-glow-pulse 2.5s ease-in-out infinite;
        }
        .drl-top { animation: drl-glow 2s ease-in-out infinite; }
        .drl-bot { animation: drl-glow 2s ease-in-out infinite 0.3s; }
        .orb-1 { animation: orb-orbit 6s linear infinite; }
        .orb-2 { animation: orb-orbit-2 8s linear infinite; }
        .orb-3 { animation: orb-orbit-3 7s linear infinite; }
      `}</style>

      {/* Ambient glow */}
      <div className="glow-bg" style={{
        position: "absolute",
        width: "320px",
        height: "200px",
        background: "radial-gradient(ellipse, #ff220055 0%, transparent 70%)",
        borderRadius: "50%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      {/* Orbiting particles */}
      <div style={{ position: "absolute", width: "1px", height: "1px", top: "50%", left: "50%" }}>
        {[".orb-1", ".orb-2", ".orb-3"].map((cls, i) => (
          <div key={i} className={cls.slice(1)} style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "#ff3300",
            borderRadius: "50%",
            boxShadow: "0 0 8px 2px #ff220088",
            marginTop: "-4px",
            marginLeft: "-4px",
          }} />
        ))}
      </div>

      {/* Headlight body */}
      <div className="headlight-body" style={{
        width: "280px",
        height: "105px",
        background: "linear-gradient(135deg, #141414, #0a0a0a)",
        borderRadius: "14px 24px 14px 14px",
        position: "relative",
        boxShadow: "0 8px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
        border: "1px solid rgba(120,120,120,0.3)",
      }}>
        {/* Chrome frame top edge */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #888, #aaa, #888, transparent)",
          borderRadius: "14px 24px 0 0",
        }} />

        {/* Main projector bowl left */}
        <div style={{
          position: "absolute",
          left: "28px", top: "50%",
          width: "52px", height: "52px",
          transform: "translateY(-50%)",
          background: "radial-gradient(circle at 60% 40%, #777, #333, #111)",
          borderRadius: "50%",
          border: "1px solid rgba(150,150,150,0.4)",
          boxShadow: "inset 0 0 12px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            right: "-4px", top: "-4px", bottom: "-4px",
            width: "50%",
            background: "rgba(150,200,255,0.15)",
            borderRadius: "50%",
          }} />
        </div>

        {/* Secondary projector right */}
        <div style={{
          position: "absolute",
          left: "108px", top: "50%",
          width: "36px", height: "36px",
          transform: "translateY(-50%)",
          background: "radial-gradient(circle at 60% 40%, #666, #2a2a2a, #0d0d0d)",
          borderRadius: "50%",
          border: "1px solid rgba(120,120,120,0.35)",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)",
        }} />

        {/* DRL strip top */}
        <div className="drl-top" style={{
          position: "absolute",
          top: "10px",
          left: "14px",
          right: "14px",
          height: "7px",
          background: "linear-gradient(90deg, #ff1a00, #ff4400, #ff2200, #ff5500, #ff2200)",
          borderRadius: "4px",
        }} />

        {/* DRL strip bottom */}
        <div className="drl-bot" style={{
          position: "absolute",
          bottom: "12px",
          left: "24px",
          right: "32px",
          height: "5px",
          background: "linear-gradient(90deg, #ff2200, #ff4400, #ff3300)",
          borderRadius: "3px",
          opacity: 0.85,
        }} />

        {/* Glass overlay */}
        <div style={{
          position: "absolute",
          inset: "1px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
          borderRadius: "13px 23px 13px 13px",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function HeadlightScene() {
  const webglSupported = isWebGLAvailable();

  if (!webglSupported) {
    return <CSSHeadlightFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<CSSHeadlightFallback />}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[-4, 3, 4]} intensity={3} color="#ff2200" />
        <pointLight position={[4, -2, 3]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, -4, 2]} intensity={0.8} color="#ff3300" />
        <Suspense fallback={null}>
          <HeadlightModel />
          <Particles />
          <SmallOrbs />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
