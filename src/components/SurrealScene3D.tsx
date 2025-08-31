import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Float, Environment, Cloud, Sky } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Mountain shape component
const Mountain = ({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(1, 2, 8);
    // Add some randomness to vertices for organic look
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      positions.setX(i, x + (Math.random() - 0.5) * 0.1);
      positions.setZ(i, z + (Math.random() - 0.5) * 0.1);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshPhongMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
};

// Floating abstract shape
const FloatingShape = ({ position, type }: { position: [number, number, number]; type: 'sphere' | 'torus' | 'box' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    switch (type) {
      case 'sphere':
        return new THREE.SphereGeometry(0.5, 16, 16);
      case 'torus':
        return new THREE.TorusGeometry(0.3, 0.15, 8, 16);
      case 'box':
        return new THREE.BoxGeometry(0.6, 0.6, 0.6);
      default:
        return new THREE.SphereGeometry(0.5, 16, 16);
    }
  }, [type]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  const colors = ['#8FBC8F', '#87CEEB', '#F5DEB3', '#98FB98', '#DDA0DD'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshPhongMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
};

// Tree-like organic shape
const OrganicTree = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Trunk */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 1.5, 8]} />
        <meshPhongMaterial color="#8B4513" />
      </mesh>
      
      {/* Leaves/Crown */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.8, 12, 12]} />
          <meshPhongMaterial color="#228B22" transparent opacity={0.9} />
        </mesh>
      </Float>
      
      {/* Smaller leaf clusters */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[0.4, 0.8, 0.2]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshPhongMaterial color="#32CD32" transparent opacity={0.8} />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[-0.3, 1.2, -0.1]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshPhongMaterial color="#90EE90" transparent opacity={0.8} />
        </mesh>
      </Float>
    </group>
  );
};

// Main scene component
const SceneContent = () => {
  const { viewport } = useThree();
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#87CEEB" />
      <pointLight position={[10, -10, 10]} intensity={0.3} color="#F5DEB3" />
      
      {/* Environment */}
      <Sky 
        distance={450000} 
        sunPosition={[5, 1, 8]} 
        inclination={0} 
        azimuth={0.25} 
      />
      
      {/* Background mountains */}
      <Mountain position={[-8, -2, -10]} scale={2} color="#8FBC8F" />
      <Mountain position={[6, -1.5, -8]} scale={1.8} color="#9ACD32" />
      <Mountain position={[-3, -2.5, -12]} scale={2.5} color="#6B8E23" />
      <Mountain position={[10, -2, -15]} scale={2.2} color="#8FBC8F" />
      
      {/* Organic trees */}
      <OrganicTree position={[-5, -1, -3]} />
      <OrganicTree position={[4, -1.2, -2]} />
      <OrganicTree position={[0, -1.5, -5]} />
      
      {/* Floating abstract shapes */}
      <FloatingShape position={[-3, 2, 2]} type="sphere" />
      <FloatingShape position={[4, 3, -1]} type="torus" />
      <FloatingShape position={[0, 4, 3]} type="box" />
      <FloatingShape position={[2, 1, 4]} type="sphere" />
      <FloatingShape position={[-2, 3, -2]} type="torus" />
      
      {/* Clouds */}
      <Cloud opacity={0.3} speed={0.4} bounds={[10, 2, 2]} segments={20} />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial color="#F5F5DC" transparent opacity={0.8} />
      </mesh>
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        enableRotate={true}
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
};

const SurrealScene3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        shadows
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default SurrealScene3D;