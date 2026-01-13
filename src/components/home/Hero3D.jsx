import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Icosahedron, Octahedron, Box, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/**
 * MOUSE INTERACTION RIG
 */
function Rig({ children }) {
  const ref = useRef();
  
  useFrame((state) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.5, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.5, 0.05);
  });

  return <group ref={ref}>{children}</group>;
}

/**
 * NEW: Saturn-like Rings Component
 */
function Rings() {
  const ref = useRef();

  useFrame((state, delta) => {
    // Slowly spin the texture/mesh of the rings
    ref.current.rotation.z -= delta * 0.05; 
  });

  return (
    // Tilted group to give the "Saturn angle"
    <group rotation={[-Math.PI / 2.2, 0.3, 0]}> 
      <group ref={ref}>
        {/* 1. Main Wide Band (Translucent/Matte) */}
        <mesh receiveShadow castShadow>
          {/* args: [innerRadius, outerRadius, thetaSegments] */}
          <ringGeometry args={[2.4, 4.2, 64]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            opacity={0.6} 
            transparent 
            side={THREE.DoubleSide} 
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>

        {/* 2. Thin Inner Accent Line */}
        <mesh position={[0, 0, 0.01]}> 
          <ringGeometry args={[2.7, 2.75, 64]} />
          <meshBasicMaterial color="#666" opacity={0.5} transparent side={THREE.DoubleSide} />
        </mesh>

        {/* 3. Thin Outer Accent Line */}
        <mesh position={[0, 0, 0.01]}> 
          <ringGeometry args={[3.8, 3.85, 64]} />
          <meshBasicMaterial color="#666" opacity={0.3} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * The central complex object
 */
function CentralGeo() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Solid Inner Core */}
      <Icosahedron args={[1.8, 1]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.3} 
          metalness={0.05} 
        />
      </Icosahedron>
      
      {/* Outer Cage */}
      <Icosahedron args={[1.85, 1]} scale={1.02}>
        <meshStandardMaterial 
          color="#444" 
          wireframe={true} 
          roughness={0.8}
          transparent
          opacity={0.3}
        />
      </Icosahedron>
    </group>
  );
}

/**
 * A single orbiting satellite component.
 */
function Satellite({ radius, speed, offset, type, color }) {
  const ref = useRef();
  const [randomAxis] = useState(() => new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize());

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.2 + offset) * (radius * 0.4);
    
    ref.current.rotateOnAxis(randomAxis, 0.01);
  });

  const material = <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />;
  const scale = 0.2 + Math.random() * 0.25; 

  switch (type) {
    case 'box': return <Box ref={ref} scale={scale}>{material}</Box>;
    case 'octahedron': return <Octahedron ref={ref} scale={scale}>{material}</Octahedron>;
    default: return <Icosahedron ref={ref} scale={scale} args={[1, 1]}>{material}</Icosahedron>;
  }
}

/**
 * Generates the array of satellites.
 */
function OrbitalSystem({ count = 25 }) {
  const satellites = useMemo(() => {
    const items = [];
    const types = ['box', 'octahedron']; 
    const colors = ['#222222', '#666666', '#999999', '#52525b']; 

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        // Increased radius slightly so they don't clip through the new rings constantly
        radius: 4.5 + Math.random() * 4, 
        speed: (Math.random() - 0.001) * 1.0, 
        offset: Math.random() * Math.PI * 2,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return items;
  }, [count]);

  return (
    <group>
      {satellites.map((data) => (
        <Satellite key={data.id} {...data} />
      ))}
    </group>
  );
}


export default function Hero3D() {
  return (
    <div className="relative h-[85vh] w-full bg-[#050505] overflow-hidden flex items-center justify-center">
      
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: true, alpha: false }}>
          <color attach="background" args={['#050505']} />
          
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
          
          <Environment preset="studio" />

          <Rig>
            <Float 
              speed={1.5} 
              rotationIntensity={0.5} 
              floatIntensity={0.5} 
              floatingRange={[-0.5, 0.5]}
            >
              <CentralGeo />
              {/* Added the Rings Component here */}
              <Rings />
              <OrbitalSystem count={30} />
            </Float>
          </Rig>

          <ContactShadows 
            position={[0, -4.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />
          
        </Canvas>
      </div>

      <div className="relative z-10 text-center pointer-events-none select-none mix-blend-difference text-white">
        <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-4">
          KENNY
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase opacity-70">
          Photography Portfolio
        </p>
      </div>
    </div>
  );
}