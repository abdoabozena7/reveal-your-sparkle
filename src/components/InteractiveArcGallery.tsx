import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface GalleryCard {
  id: number;
  title: string;
  category: string;
  gradient: string;
  icon: string;
  description: string;
}

const galleryCards: GalleryCard[] = [
  { 
    id: 1, 
    title: "React Mastery", 
    category: "Frontend", 
    gradient: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
    icon: "⚛️",
    description: "Modern React with hooks & performance optimization"
  },
  { 
    id: 2, 
    title: "3D Universe", 
    category: "Graphics", 
    gradient: "linear-gradient(135deg, #4ecdc4, #44bd87)",
    icon: "🌌",
    description: "Three.js, WebGL, and immersive experiences"
  },
  { 
    id: 3, 
    title: "AI Integration", 
    category: "Intelligence", 
    gradient: "linear-gradient(135deg, #a55eea, #8b5cf6)",
    icon: "🤖",
    description: "Machine learning and neural networks"
  },
  { 
    id: 4, 
    title: "Cloud Native", 
    category: "Infrastructure", 
    gradient: "linear-gradient(135deg, #ffd700, #ffb142)",
    icon: "☁️",
    description: "Scalable architecture and microservices"
  },
  { 
    id: 5, 
    title: "Blockchain", 
    category: "Web3", 
    gradient: "linear-gradient(135deg, #ff9ff3, #f368e0)",
    icon: "⛓️",
    description: "Decentralized applications and smart contracts"
  },
  { 
    id: 6, 
    title: "IoT Systems", 
    category: "Hardware", 
    gradient: "linear-gradient(135deg, #74b9ff, #0984e3)",
    icon: "📡",
    description: "Connected devices and sensor networks"
  },
];

const InteractiveArcGallery = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Calculate 3D arc positions
  const getArcPosition = (index: number, total: number, radius = 400) => {
    const startAngle = -Math.PI * 0.6; // Start angle
    const endAngle = Math.PI * 0.6;    // End angle
    const angle = startAngle + (endAngle - startAngle) * (index / (total - 1));
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.3; // Flatten vertically
    const z = Math.sin(angle) * 100; // Add depth
    const rotateY = (angle * 180) / Math.PI * 0.3; // Perspective rotation
    
    return { x, y, z, rotateY, angle };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 200,
      rotateX: -90,
      scale: 0.3,
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden perspective-1000"
      style={{ perspective: "1000px" }}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0">
        {galleryCards.map((card, index) => {
          const { x, y } = getArcPosition(index, galleryCards.length);
          return (
            <motion.div
              key={`glow-${card.id}`}
              className="absolute w-40 h-40 rounded-full opacity-20 blur-3xl"
              style={{
                background: card.gradient,
                left: `calc(50% + ${x}px - 80px)`,
                top: `calc(50% - ${y}px - 80px)`,
              }}
              animate={{
                scale: hoveredCard === card.id ? 2 : 1,
                opacity: hoveredCard === card.id ? 0.4 : 0.2,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          );
        })}
      </div>

      {/* Main gallery cards */}
      <motion.div
        className="relative w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {galleryCards.map((card, index) => {
          const { x, y, z, rotateY } = getArcPosition(index, galleryCards.length);
          const isHovered = hoveredCard === card.id;
          const isActive = activeCard === card.id;
          
          return (
            <motion.div
              key={card.id}
              custom={index}
              variants={cardVariants}
              className="absolute cursor-pointer group"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% - ${y}px)`,
                transformStyle: "preserve-3d",
                transform: `translateZ(${z}px) rotateY(${rotateY}deg)`,
                zIndex: isHovered ? 50 : 10 + index,
              }}
              whileHover={{ 
                scale: 1.15,
                rotateX: -5,
                rotateY: rotateY + 10,
                z: z + 50,
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Card container */}
              <div className="relative w-56 h-72 clay-card overflow-hidden">
                {/* Gradient background */}
                <div 
                  className="absolute inset-0 opacity-80"
                  style={{ background: card.gradient }}
                />
                
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  {/* Header */}
                  <div className="text-center">
                    <motion.div
                      className="text-5xl mb-4"
                      animate={{
                        rotateY: isHovered ? 360 : 0,
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      {card.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
                      {card.title}
                    </h3>
                    <p className="text-sm opacity-90 font-medium">
                      {card.category}
                    </p>
                  </div>
                  
                  {/* Description (shown on hover) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-center leading-relaxed"
                  >
                    {card.description}
                  </motion.div>
                  
                  {/* Action button */}
                  <motion.button
                    className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300"
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      opacity: isHovered ? 1 : 0.8,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Project
                  </motion.button>
                </div>
                
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-[inherit] pointer-events-none"
                  style={{
                    background: `conic-gradient(from 0deg, ${card.gradient}, transparent, ${card.gradient})`,
                    padding: "2px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "exclude",
                  }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    rotate: isHovered ? 360 : 0,
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 0.3 }
                  }}
                />
              </div>
              
              {/* Floating shadow */}
              <div 
                className="absolute inset-0 -z-10 clay-card opacity-30 blur-lg"
                style={{
                  background: card.gradient,
                  transform: "translateZ(-20px) scale(0.9)",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Center connection point */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-2 -translate-y-2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
          boxShadow: "0 0 20px rgba(255,255,255,0.5)",
        }}
        animate={{
          scale: hoveredCard ? 1.5 : 1,
          opacity: hoveredCard ? 1 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default InteractiveArcGallery;