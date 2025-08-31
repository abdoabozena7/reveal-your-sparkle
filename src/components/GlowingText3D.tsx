import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

interface GlowingTextProps {
  text: string;
  position?: [number, number, number];
  fontSize?: number;
  color?: string;
  emissiveIntensity?: number;
}

const GlowingText = ({ 
  text, 
  position = [0, 0, 0], 
  fontSize = 2, 
  color = "#00ff88",
  emissiveIntensity = 0.5 
}: GlowingTextProps) => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Gentle breathing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      textRef.current.scale.setScalar(scale);
      
      // Subtle glow pulsing
      const material = textRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        material.emissiveIntensity = emissiveIntensity + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={position}
        fontSize={fontSize}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {text}
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={0.9}
        />
      </Text>
    </Float>
  );
};

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    // Spread particles around the text
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;
    
    // Glowing colors
    const colorValue = Math.random();
    if (colorValue < 0.3) {
      // Green
      colors[i3] = 0; colors[i3 + 1] = 1; colors[i3 + 2] = 0.5;
    } else if (colorValue < 0.6) {
      // Cyan
      colors[i3] = 0.5; colors[i3 + 1] = 1; colors[i3 + 2] = 0.9;
    } else {
      // Pink
      colors[i3] = 1; colors[i3 + 1] = 0.4; colors[i3 + 2] = 0.6;
    }
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Animate particle positions
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        vertexColors 
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

interface GlowingText3DProps {
  mainText: string;
  subText?: string;
  className?: string;
}

const GlowingText3D = ({ mainText, subText, className = "" }: GlowingText3DProps) => {
  return (
    <div className={`w-full h-64 ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <fog attach="fog" args={['#0a0a0a', 5, 25]} />
        
        {/* Atmospheric lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00ff88" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#88ffdd" />
        <spotLight 
          position={[0, 8, 2]} 
          angle={0.5} 
          penumbra={1} 
          intensity={3} 
          color="#ff6699"
        />
        
        {/* Environment */}
        <Environment preset="night" />
        
        {/* Particle field background */}
        <ParticleField />
        
        {/* Main glowing text */}
        <GlowingText 
          text={mainText}
          position={[0, subText ? 0.5 : 0, 0]}
          fontSize={2.5}
          color="#00ff88"
          emissiveIntensity={0.6}
        />
        
        {/* Subtitle if provided */}
        {subText && (
          <GlowingText 
            text={subText}
            position={[0, -1.5, 0]}
            fontSize={1.2}
            color="#88ffdd"
            emissiveIntensity={0.4}
          />
        )}
      </Canvas>
    </div>
  );
};

export default GlowingText3D;