import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const SkillOrb = ({ position, skill, color }: { position: [number, number, number], skill: string, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Scale on hover
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.8} 
            emissive={color}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>
        
        {/* Skill Text */}
        <Center position={[0, -1.5, 0]}>
          <mesh>
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.8}
            />
          </mesh>
          {/* Simple text alternative - we can enhance this later with proper fonts */}
        </Center>
      </group>
    </Float>
  );
};

const SkillsScene3D = () => {
  const skills = [
    { name: "React", position: [2, 1, 0] as [number, number, number], color: "#61DAFB" },
    { name: "Node.js", position: [-2, 1, 0] as [number, number, number], color: "#339933" },
    { name: "Three.js", position: [0, 2, -1] as [number, number, number], color: "#000000" },
    { name: "TypeScript", position: [2, -1, 1] as [number, number, number], color: "#3178C6" },
    { name: "PHP", position: [-2, -1, 1] as [number, number, number], color: "#777BB4" },
    { name: "Git", position: [0, -2, 0] as [number, number, number], color: "#F05032" },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#00ffff" intensity={0.5} />
      
      {skills.map((skill, index) => (
        <SkillOrb
          key={skill.name}
          position={skill.position}
          skill={skill.name}
          color={skill.color}
        />
      ))}
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

export default SkillsScene3D;