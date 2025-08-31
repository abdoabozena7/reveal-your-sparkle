import { motion } from "framer-motion";
import { useState } from "react";

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: "React", subtitle: "Frontend", color: "hsl(var(--primary))", icon: "⚛️" },
  { id: 2, title: "Three.js", subtitle: "3D Graphics", color: "hsl(var(--secondary))", icon: "🎨" },
  { id: 3, title: "TypeScript", subtitle: "Language", color: "hsl(var(--accent))", icon: "📝" },
  { id: 4, title: "Node.js", subtitle: "Backend", color: "hsl(var(--success))", icon: "🚀" },
  { id: 5, title: "UI/UX", subtitle: "Design", color: "hsl(var(--warning))", icon: "✨" },
];

const FloatingGallery = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Calculate positions in an arc
  const getArcPosition = (index: number, total: number) => {
    const angle = (index - (total - 1) / 2) * (Math.PI / 6); // Spread across 180 degrees
    const radius = 300;
    const x = Math.sin(angle) * radius;
    const y = Math.cos(angle) * radius * 0.3; // Flatten the arc vertically
    return { x, y };
  };

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {galleryItems.map((item, index) => {
        const { x, y } = getArcPosition(index, galleryItems.length);
        const isHovered = hoveredItem === item.id;
        
        return (
          <motion.div
            key={item.id}
            className="absolute left-1/2 top-1/2 clay-card cursor-pointer"
            style={{
              width: "160px",
              height: "200px",
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            initial={{
              x: x - 80, // Center the card
              y: y - 100,
              rotateY: 0,
              rotateX: 0,
              scale: 0.8,
            }}
            animate={{
              x: x - 80,
              y: y - 100,
              rotateY: isHovered ? 10 : 0,
              rotateX: isHovered ? -5 : 0,
              scale: isHovered ? 1 : 0.8,
              z: isHovered ? 50 : 0,
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 15,
              rotateX: -10,
              z: 100,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <div className="relative w-full h-full p-6 flex flex-col items-center justify-center text-center overflow-hidden">
              {/* Floating icon */}
              <motion.div
                className="text-4xl mb-4 floating-3d"
                animate={{
                  y: isHovered ? -10 : 0,
                  rotateZ: isHovered ? 10 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
              >
                {item.icon}
              </motion.div>
              
              {/* Title */}
              <motion.h3
                className="text-lg font-bold text-foreground mb-2 nature-glow"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
              >
                {item.title}
              </motion.h3>
              
              {/* Subtitle */}
              <motion.p
                className="text-sm text-muted-foreground"
                animate={{
                  opacity: isHovered ? 1 : 0.7,
                }}
              >
                {item.subtitle}
              </motion.p>
              
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 rounded-[inherit] opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${item.color}, transparent 70%)`,
                }}
                animate={{
                  scale: isHovered ? 1.2 : 0.8,
                  opacity: isHovered ? 0.3 : 0.1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              />
              
              {/* 3D depth indicator */}
              <div 
                className="absolute -inset-2 rounded-[inherit] -z-10 opacity-50"
                style={{
                  background: "var(--gradient-depth)",
                  transform: "translateZ(-10px) scale(0.95)",
                }}
              />
            </div>
          </motion.div>
        );
      })}
      
      {/* Central connecting line */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-1 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
        style={{
          width: "600px",
          marginLeft: "-300px",
          marginTop: "-1px",
        }}
        animate={{
          opacity: hoveredItem ? 0.5 : 0.2,
        }}
      />
    </div>
  );
};

export default FloatingGallery;