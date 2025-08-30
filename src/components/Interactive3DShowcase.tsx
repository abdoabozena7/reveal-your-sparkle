import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sphere, Text, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ShowcaseItemProps {
  position: [number, number, number];
  color: string;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const ShowcaseItem = ({ position, color, title, description, isSelected, onClick }: ShowcaseItemProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Enhanced animations when selected or hovered
      const targetScale = isSelected ? 1.3 : hovered ? 1.1 : 1;
      const currentScale = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, 0.1));
      
      // Gentle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Floating animation
      const floatOffset = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.position.y = position[1] + floatOffset;
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
      {/* Main card with glassmorphism effect */}
      <RoundedBox args={[3, 4, 0.3]} radius={0.3} smoothness={4}>
        <meshPhysicalMaterial
          color={color}
          transmission={0.2}
          opacity={isSelected ? 1 : 0.8}
          transparent
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0}
          emissive={color}
          emissiveIntensity={isSelected ? 0.3 : hovered ? 0.2 : 0.1}
        />
      </RoundedBox>
      
      {/* Inner glow */}
      <RoundedBox args={[2.8, 3.8, 0.25]} radius={0.25} smoothness={4} position={[0, 0, -0.05]}>
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.5 : 0.3}
          transparent
          opacity={0.3}
        />
      </RoundedBox>
      
      {/* Title */}
      <Text
        position={[0, 1, 0.16]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={2.5}
      >
        {title}
      </Text>
      
      {/* Description */}
      <Text
        position={[0, -0.5, 0.16]}
        fontSize={0.2}
        color="rgba(255,255,255,0.8)"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-medium.woff"
        maxWidth={2.2}
      >
        {description}
      </Text>
      
      {/* Floating orbs around the card */}
      {isSelected && (
        <>
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[0.1]} position={[2, 1.5, 0.5]}>
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.7}
              />
            </Sphere>
          </Float>
          <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
            <Sphere args={[0.08]} position={[-2, -1, 0.5]}>
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.7}
              />
            </Sphere>
          </Float>
          <Float speed={2.5} rotationIntensity={1} floatIntensity={2.5}>
            <Sphere args={[0.12]} position={[1.5, -1.8, 0.3]}>
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.7}
              />
            </Sphere>
          </Float>
        </>
      )}
    </group>
  );
};

const BackgroundElements = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient floating spheres */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={1}>
          <Sphere 
            args={[0.05 + Math.random() * 0.1]} 
            position={[
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 40
            ]}
          >
            <meshPhysicalMaterial
              color={`hsl(${Math.random() * 360}, 100%, 70%)`}
              emissive={`hsl(${Math.random() * 360}, 100%, 50%)`}
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

interface Interactive3DShowcaseProps {
  items: Array<{
    id: string;
    title: string;
    description: string;
    color: string;
  }>;
  selectedId?: string;
  onSelect: (id: string) => void;
}

const Interactive3DShowcase = ({ items, selectedId, onSelect }: Interactive3DShowcaseProps) => {
  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
        <fog attach="fog" args={['#0a0a0a', 10, 40]} />
        
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#88ffdd" />
        <pointLight position={[0, 15, 5]} intensity={1} color="#ff6699" />
        <spotLight 
          position={[0, 20, 0]} 
          angle={0.4} 
          penumbra={1} 
          intensity={3} 
          color="#ffaa44"
          castShadow
        />
        
        {/* Environment */}
        <Environment preset="night" />
        
        {/* Background elements */}
        <BackgroundElements />
        
        {/* Showcase items */}
        {items.map((item, index) => {
          const angle = (index / items.length) * Math.PI * 2;
          const radius = 6;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <ShowcaseItem
              key={item.id}
              position={[x, 0, z]}
              color={item.color}
              title={item.title}
              description={item.description}
              isSelected={selectedId === item.id}
              onClick={() => onSelect(item.id)}
            />
          );
        })}
        
        {/* Contact shadows */}
        <ContactShadows 
          position={[0, -3, 0]} 
          opacity={0.3} 
          scale={30} 
          blur={2} 
          far={10} 
        />
        
        {/* Camera controls */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          autoRotate={!selectedId}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          maxDistance={20}
          minDistance={8}
        />
      </Canvas>
    </div>
  );
};

export default Interactive3DShowcase;