import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Text, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface FloatingCardProps {
  position: [number, number, number];
  color: string;
  title: string;
  icon: string;
  scale?: number;
  rotationSpeed?: number;
}

const FloatingCard = ({ position, color, title, icon, scale = 1, rotationSpeed = 1 }: FloatingCardProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * rotationSpeed * 0.3) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.2;
      
      // Mouse interaction - subtle attraction
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      
      meshRef.current.position.x = position[0] + x * 0.05;
      meshRef.current.position.y = position[1] + y * 0.05;
      
      // Floating scale animation
      const scaleAnimation = 1 + Math.sin(state.clock.elapsedTime * rotationSpeed * 1.5) * 0.02;
      meshRef.current.scale.setScalar(scale * scaleAnimation);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} position={position}>
        {/* Main card */}
        <RoundedBox args={[2, 2.5, 0.2]} radius={0.3} smoothness={4}>
          <meshPhysicalMaterial
            color={color}
            transmission={0.1}
            opacity={0.9}
            transparent
            roughness={0.1}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </RoundedBox>
        
        {/* Icon */}
        <Text
          position={[0, 0.3, 0.11]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {icon}
        </Text>
        
        {/* Title */}
        <Text
          position={[0, -0.5, 0.11]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-medium.woff"
          maxWidth={1.8}
        >
          {title}
        </Text>
        
        {/* Inner glow */}
        <RoundedBox args={[1.8, 2.3, 0.15]} radius={0.25} smoothness={4} position={[0, 0, -0.05]}>
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </RoundedBox>
      </group>
    </Float>
  );
};

const NatureElement = ({ position, type, color }: {
  position: [number, number, number];
  type: 'sphere' | 'leaf' | 'crystal';
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Organic floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  if (type === 'sphere') {
    return (
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef} position={position}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhysicalMaterial
            color={color}
            transmission={0.3}
            opacity={0.8}
            transparent
            roughness={0}
            metalness={0.5}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    );
  }

  if (type === 'leaf') {
    return (
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh ref={meshRef} position={position}>
          <boxGeometry args={[0.1, 1, 0.6]} />
          <meshPhysicalMaterial
            color={color}
            transmission={0.2}
            opacity={0.9}
            transparent
            roughness={0.3}
            metalness={0.1}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
    );
  }

  return (
    <Float speed={1} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.7]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.4}
          opacity={0.7}
          transparent
          roughness={0}
          metalness={1}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;
      
      // Nature-inspired colors
      const colorOptions = [
        new THREE.Color('#00ff88'), // Green
        new THREE.Color('#88ffdd'), // Cyan
        new THREE.Color('#ffaa44'), // Orange
        new THREE.Color('#ff6699'), // Pink
        new THREE.Color('#aaffaa'), // Light green
      ];
      
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
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
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

interface FloatingCards3DProps {
  showCards?: boolean;
  intensity?: number;
}

const FloatingCards3D = ({ showCards = true, intensity = 1 }: FloatingCards3DProps) => {
  const cards = [
    { position: [3, 2, 0] as [number, number, number], color: "#00ff88", title: "Web Development", icon: "🌐", scale: 1.2 },
    { position: [-3, 1, 1] as [number, number, number], color: "#88ffdd", title: "3D Design", icon: "🎨", scale: 1 },
    { position: [0, 3, -1] as [number, number, number], color: "#ff6699", title: "UI/UX", icon: "✨", scale: 1.1 },
    { position: [4, -1, 2] as [number, number, number], color: "#ffaa44", title: "Animation", icon: "🎭", scale: 0.9 },
    { position: [-4, -2, 0] as [number, number, number], color: "#aaffaa", title: "Branding", icon: "🚀", scale: 1.3 },
    { position: [1, -3, -2] as [number, number, number], color: "#ff9966", title: "Mobile Apps", icon: "📱", scale: 1 },
  ];

  const natureElements = [
    { position: [2, 4, 3] as [number, number, number], type: 'sphere' as const, color: "#44ff99" },
    { position: [-5, 2, -2] as [number, number, number], type: 'leaf' as const, color: "#66ff44" },
    { position: [5, -1, 1] as [number, number, number], type: 'crystal' as const, color: "#44ffaa" },
    { position: [-2, -4, 2] as [number, number, number], type: 'sphere' as const, color: "#99ff66" },
    { position: [0, 5, -3] as [number, number, number], type: 'crystal' as const, color: "#77ffcc" },
    { position: [-1, 0, 4] as [number, number, number], type: 'leaf' as const, color: "#55ff77" },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
      <fog attach="fog" args={['#0a0a0a', 8, 30]} />
      
      {/* Enhanced lighting */}
      <ambientLight intensity={0.2 * intensity} />
      <pointLight position={[10, 10, 10]} intensity={1.5 * intensity} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={1 * intensity} color="#88ffdd" />
      <pointLight position={[0, 15, 0]} intensity={0.8 * intensity} color="#ff6699" />
      <spotLight 
        position={[0, 10, 5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={2 * intensity} 
        color="#ffaa44"
        castShadow
      />
      
      {/* Environment and atmosphere */}
      <Environment preset="night" />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Main floating cards */}
      {showCards && cards.map((card, index) => (
        <FloatingCard
          key={index}
          position={card.position}
          color={card.color}
          title={card.title}
          icon={card.icon}
          scale={card.scale}
          rotationSpeed={1 + index * 0.1}
        />
      ))}
      
      {/* Nature elements */}
      {natureElements.map((element, index) => (
        <NatureElement
          key={index}
          position={element.position}
          type={element.type}
          color={element.color}
        />
      ))}
      
      {/* Contact shadows for depth */}
      <ContactShadows 
        position={[0, -8, 0]} 
        opacity={0.3} 
        scale={20} 
        blur={2} 
        far={8} 
      />
    </Canvas>
  );
};

export default FloatingCards3D;