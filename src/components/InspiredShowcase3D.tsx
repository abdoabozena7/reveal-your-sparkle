import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sphere, Text, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface InspiredCardProps {
  position: [number, number, number];
  color: string;
  title: string;
  description: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

const InspiredCard = ({ position, color, title, description, icon, isSelected, onClick }: InspiredCardProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // More organic floating animation
      const time = state.clock.elapsedTime;
      const targetScale = isSelected ? 1.4 : hovered ? 1.15 : 1;
      const currentScale = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, 0.08));
      
      // Gentle organic rotation
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.1;
      
      // Natural floating animation
      const floatY = Math.sin(time * 1.5) * 0.2 + Math.cos(time * 0.8) * 0.1;
      meshRef.current.position.y = position[1] + floatY;
      
      // Breathing scale effect
      const breathe = 1 + Math.sin(time * 2) * 0.02;
      if (!isSelected && !hovered) {
        meshRef.current.scale.setScalar(breathe);
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main glassmorphism card inspired by references */}
      <RoundedBox args={[3.2, 4.5, 0.4]} radius={0.4} smoothness={8}>
        <meshPhysicalMaterial
          color={color}
          transmission={0.15}
          opacity={isSelected ? 0.95 : 0.85}
          transparent
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={color}
          emissiveIntensity={isSelected ? 0.4 : hovered ? 0.25 : 0.15}
          envMapIntensity={2}
        />
      </RoundedBox>
      
      {/* Inner glow layer for depth */}
      <RoundedBox args={[3, 4.3, 0.35]} radius={0.35} smoothness={8} position={[0, 0, -0.05]}>
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.6 : 0.3}
          transparent
          opacity={0.2}
        />
      </RoundedBox>
      
      {/* Icon with glow */}
      <Text
        position={[0, 1.2, 0.21]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {icon}
        <meshStandardMaterial 
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Text>
      
      {/* Title */}
      <Text
        position={[0, 0.2, 0.21]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={2.8}
      >
        {title}
        <meshStandardMaterial 
          emissive="white"
          emissiveIntensity={0.2}
        />
      </Text>
      
      {/* Description */}
      <Text
        position={[0, -0.6, 0.21]}
        fontSize={0.18}
        color="rgba(255,255,255,0.8)"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-medium.woff"
        maxWidth={2.5}
      >
        {description}
      </Text>
      
      {/* Floating nature elements when selected */}
      {isSelected && (
        <>
          {/* Organic floating spheres */}
          <Float speed={2.5} rotationIntensity={1} floatIntensity={3}>
            <Sphere args={[0.12]} position={[2.2, 1.8, 0.6]}>
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.7}
                transmission={0.2}
              />
            </Sphere>
          </Float>
          <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[0.08]} position={[-2.5, -1.2, 0.5]}>
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.9}
                transparent
                opacity={0.8}
              />
            </Sphere>
          </Float>
          <Float speed={3} rotationIntensity={2} floatIntensity={2.5}>
            <Sphere args={[0.15]} position={[1.8, -2, 0.4]}>
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.7}
                transparent
                opacity={0.6}
              />
            </Sphere>
          </Float>
        </>
      )}
    </group>
  );
};

const NatureBackground = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate organic particle field
  const particles = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const natureColors = [
      new THREE.Color('#00ff88'), // Emerald
      new THREE.Color('#44ff99'), // Light green
      new THREE.Color('#66ffaa'), // Mint
      new THREE.Color('#88ffdd'), // Cyan
      new THREE.Color('#aaffbb'), // Soft green
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Organic distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 15 + Math.random() * 25;
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
      
      const color = natureColors[Math.floor(Math.random() * natureColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors, count };
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slow organic rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating nature spheres */}
      {Array.from({ length: 25 }).map((_, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere 
            args={[0.03 + Math.random() * 0.08]} 
            position={[
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 50
            ]}
          >
            <meshPhysicalMaterial
              color={`hsl(${120 + Math.random() * 60}, 100%, ${50 + Math.random() * 30}%)`}
              emissive={`hsl(${120 + Math.random() * 60}, 100%, 40%)`}
              emissiveIntensity={0.4}
              transparent
              opacity={0.6}
              transmission={0.1}
            />
          </Sphere>
        </Float>
      ))}
      
      {/* Particle field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.count}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.count}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.04} 
          vertexColors 
          transparent 
          opacity={0.7}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
};

interface InspiredShowcase3DProps {
  items: Array<{
    id: string;
    title: string;
    description: string;
    color: string;
    icon: string;
  }>;
  selectedId?: string;
  onSelect: (id: string) => void;
}

const InspiredShowcase3D = ({ items, selectedId, onSelect }: InspiredShowcase3DProps) => {
  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 3, 14], fov: 50 }}>
        <fog attach="fog" args={['#0a0a0a', 12, 45]} />
        
        {/* Enhanced atmospheric lighting */}
        <ambientLight intensity={0.15} color="#ffffff" />
        <pointLight position={[12, 12, 12]} intensity={2.5} color="#00ff88" />
        <pointLight position={[-12, -12, -12]} intensity={2} color="#44ff99" />
        <pointLight position={[0, 20, 8]} intensity={1.5} color="#88ffdd" />
        <spotLight 
          position={[0, 25, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={4} 
          color="#66ffaa"
          castShadow
        />
        
        {/* Natural environment */}
        <Environment preset="forest" />
        
        {/* Nature background elements */}
        <NatureBackground />
        
        {/* Inspired floating cards in organic arrangement */}
        {items.map((item, index) => {
          const angle = (index / items.length) * Math.PI * 2;
          const radius = 7;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = Math.sin(angle * 2) * 0.5; // Organic height variation
          
          return (
            <InspiredCard
              key={item.id}
              position={[x, y, z]}
              color={item.color}
              title={item.title}
              description={item.description}
              icon={item.icon}
              isSelected={selectedId === item.id}
              onClick={() => onSelect(item.id)}
            />
          );
        })}
        
        {/* Soft contact shadows */}
        <ContactShadows 
          position={[0, -4, 0]} 
          opacity={0.2} 
          scale={40} 
          blur={3} 
          far={12} 
        />
        
        {/* Organic camera controls */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          autoRotate={!selectedId}
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          maxDistance={25}
          minDistance={10}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default InspiredShowcase3D;