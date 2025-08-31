import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Float, 
  Environment, 
  Sparkles,
  MeshDistortMaterial,
  Sphere,
  Text3D,
  Center,
  useTexture
} from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

// Floating Crystal Component
const FloatingCrystal = ({ position, color, scale = 1 }: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number; 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.5;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial 
          color={color}
          transparent
          opacity={0.8}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Organic Mountain Range
const OrganicMountains = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const mountains = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 40,
        -5 + Math.random() * -3,
        -15 - Math.random() * 10
      ] as [number, number, number],
      scale: 3 + Math.random() * 4,
      color: `hsl(${120 + Math.random() * 60}, 60%, ${40 + Math.random() * 20}%)`,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {mountains.map((mountain) => (
        <Float key={mountain.id} speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
          <mesh position={mountain.position} scale={mountain.scale}>
            <coneGeometry args={[1.5, 3, 6]} />
            <MeshDistortMaterial 
              color={mountain.color}
              distort={0.2}
              speed={1}
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Abstract Forest
const AbstractForest = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const trees = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 30,
        -2 + Math.random() * -1,
        -8 - Math.random() * 8
      ] as [number, number, number],
      height: 2 + Math.random() * 3,
      color: `hsl(${100 + Math.random() * 40}, 70%, ${30 + Math.random() * 30}%)`,
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {trees.map((tree) => (
        <Float key={tree.id} speed={2} rotationIntensity={0.2} floatIntensity={1}>
          <group position={tree.position}>
            {/* Tree trunk */}
            <mesh position={[0, tree.height / 4, 0]}>
              <cylinderGeometry args={[0.1, 0.15, tree.height / 2, 8]} />
              <meshPhongMaterial color="#8B4513" />
            </mesh>
            
            {/* Tree crown */}
            <mesh position={[0, tree.height * 0.7, 0]}>
              <sphereGeometry args={[tree.height * 0.4, 8, 8]} />
              <MeshDistortMaterial 
                color={tree.color}
                distort={0.3}
                speed={1.5}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
};

// Floating Particles System
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial 
        color="#ffffff" 
        size={0.05} 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Cinematic Lighting Setup
const CinematicLights = () => {
  const light1Ref = useRef<THREE.DirectionalLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 10;
    }
    if (light2Ref.current) {
      light2Ref.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} color="#4a90e2" />
      <directionalLight 
        ref={light1Ref}
        position={[10, 10, 5]} 
        intensity={1.2} 
        color="#ffd700"
        castShadow
      />
      <pointLight 
        ref={light2Ref}
        position={[-10, 5, 10]} 
        intensity={1} 
        color="#ff6b6b" 
        distance={20}
      />
      <pointLight 
        position={[0, 15, -5]} 
        intensity={0.8} 
        color="#4ecdc4" 
        distance={25}
      />
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1}
        color="#ffffff"
        castShadow
      />
    </>
  );
};

// Main Scene Content
const SceneContent = () => {
  const { viewport, camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: -(event.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mousePosition.x * 2 - camera.position.x) * 0.02;
    camera.position.y += (mousePosition.y * 1 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      <CinematicLights />
      
      {/* Background Environment */}
      <Environment preset="sunset" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Mountain Range */}
      <OrganicMountains />
      
      {/* Abstract Forest */}
      <AbstractForest />
      
      {/* Floating Crystals */}
      <FloatingCrystal position={[-8, 3, -2]} color="#ff6b6b" scale={0.8} />
      <FloatingCrystal position={[6, 5, -4]} color="#4ecdc4" scale={1.2} />
      <FloatingCrystal position={[0, 8, -1]} color="#ffd700" scale={1} />
      <FloatingCrystal position={[-4, 6, 2]} color="#9b59b6" scale={0.9} />
      <FloatingCrystal position={[8, 4, 1]} color="#e74c3c" scale={1.1} />
      
      {/* Magical Sparkles */}
      <Sparkles 
        count={200} 
        scale={[20, 10, 20]} 
        size={3} 
        speed={0.5} 
        opacity={0.8}
        color="#ffffff"
      />
      
      {/* Floating Spheres with RGB Gradients */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} position={[-6, 2, 3]}>
          <MeshDistortMaterial 
            color="#ff0080"
            transparent
            opacity={0.7}
            distort={0.5}
            speed={3}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere args={[0.8, 32, 32]} position={[7, 1, 2]}>
          <MeshDistortMaterial 
            color="#00ff80"
            transparent
            opacity={0.6}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        enableRotate={false}
        autoRotate 
        autoRotateSpeed={0.2}
      />
    </>
  );
};

const CinematicScene3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 5, 15], fov: 75 }}
        shadows
        style={{ background: 'linear-gradient(to bottom, #0a0e27, #1a1a2e, #16213e)' }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default CinematicScene3D;