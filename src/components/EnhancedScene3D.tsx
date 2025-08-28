import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Torus, Box } from "@react-three/drei";
import * as THREE from "three";

const ColorfulSphere = ({ position, color, size = 1, speed = 1 }: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * speed * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={1} floatIntensity={3}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={speed * 2}
          roughness={0}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
};

const GeometricShape = ({ position, type, color }: {
  position: [number, number, number];
  type: 'box' | 'torus';
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
      {type === 'box' ? (
        <Box ref={meshRef} args={[1, 1, 1]} position={position}>
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.1}
            metalness={0.7}
            roughness={0.2}
          />
        </Box>
      ) : (
        <Torus ref={meshRef} args={[1, 0.3, 16, 100]} position={position}>
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.1}
            metalness={0.7}
            roughness={0.2}
          />
        </Torus>
      )}
    </Float>
  );
};

const InteractiveParticleField = () => {
  const { mouse, viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 3000;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorPalette = [
      new THREE.Color('#ff00ff'), // Purple
      new THREE.Color('#00ffff'), // Cyan
      new THREE.Color('#ff0080'), // Pink
      new THREE.Color('#80ff00'), // Green
      new THREE.Color('#ffff00'), // Yellow
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions in a sphere
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Random colors
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotate particles
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      
      // Mouse interaction
      const mouseInfluence = {
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2,
      };
      
      // Apply subtle mouse attraction to particles
      if (pointsRef.current.geometry.attributes.position) {
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          
          const dx = mouseInfluence.x - x;
          const dy = mouseInfluence.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 5) {
            positions[i] += dx * 0.001;
            positions[i + 1] += dy * 0.001;
          }
        }
        
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        vertexColors 
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

interface EnhancedScene3DProps {
  cameraPosition?: [number, number, number];
  showElements?: boolean;
  intensity?: number;
}

const EnhancedScene3D = ({ 
  cameraPosition = [0, 0, 8], 
  showElements = true,
  intensity = 1
}: EnhancedScene3DProps) => {
  const shapes = [
    { position: [3, 2, 0] as [number, number, number], color: "#ff00ff", size: 0.8 },
    { position: [-3, -1, 2] as [number, number, number], color: "#00ffff", size: 1.2 },
    { position: [0, 3, -2] as [number, number, number], color: "#ff0080", size: 1 },
    { position: [2, -2, 1] as [number, number, number], color: "#80ff00", size: 0.9 },
    { position: [-2, 1, -1] as [number, number, number], color: "#ffff00", size: 1.1 },
  ];

  const geometricShapes = [
    { position: [4, 0, 1] as [number, number, number], type: 'box' as const, color: "#ff4080" },
    { position: [-4, 2, -1] as [number, number, number], type: 'torus' as const, color: "#40ff80" },
    { position: [1, -3, 2] as [number, number, number], type: 'box' as const, color: "#8040ff" },
  ];

  return (
    <Canvas camera={{ position: cameraPosition, fov: 75 }}>
      <fog attach="fog" args={['#0a0a0a', 10, 50]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3 * intensity} />
      <pointLight position={[10, 10, 10]} intensity={1 * intensity} color="#ff00ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8 * intensity} color="#00ffff" />
      <pointLight position={[5, -5, 5]} intensity={0.6 * intensity} color="#ff0080" />
      
      {/* Background stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Interactive particles */}
      <InteractiveParticleField />
      
      {/* Colorful spheres */}
      {showElements && shapes.map((shape, index) => (
        <ColorfulSphere
          key={index}
          position={shape.position}
          color={shape.color}
          size={shape.size}
          speed={1 + index * 0.2}
        />
      ))}
      
      {/* Geometric shapes */}
      {showElements && geometricShapes.map((shape, index) => (
        <GeometricShape
          key={index}
          position={shape.position}
          type={shape.type}
          color={shape.color}
        />
      ))}
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default EnhancedScene3D;