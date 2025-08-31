import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CinematicScene3D from "./CinematicScene3D";
import InteractiveArcGallery from "./InteractiveArcGallery";
import MagicalInputBar from "./MagicalInputBar";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newMousePos = {
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      };
      setMousePosition(newMousePos);
      
      // Add interactive particles
      if (Math.random() > 0.95) {
        const newParticle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };
        setParticles(prev => [...prev.slice(-10), newParticle]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Remove particles after animation
    const timer = setTimeout(() => {
      setParticles(prev => prev.slice(1));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [particles]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen overflow-hidden perspective-1000"
      style={{ 
        background: "linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Immersive 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <CinematicScene3D />
      </div>

      {/* Cinematic Overlay Gradients */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>

      {/* Floating Interactive Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full pointer-events-none"
            style={{
              background: `hsl(${(i * 60) % 360}, 80%, 60%)`,
              left: `${10 + (i % 3) * 30}%`,
              top: `${20 + Math.floor(i / 3) * 40}%`,
              boxShadow: `0 0 20px hsl(${(i * 60) % 360}, 80%, 60%, 0.6)`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(i) * 30, 0],
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main Content Layer */}
      <div className="relative z-30 min-h-screen flex flex-col justify-center items-center px-6">
        
        {/* Hero Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            duration: 1.2 
          }}
          className="text-center mb-16"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main Heading */}
          <motion.h1
            className="text-7xl md:text-9xl font-black leading-none mb-8"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="electric-glow block"
              animate={{
                textShadow: [
                  "0 0 20px hsl(0 100% 71% / 0.8), 0 0 40px hsl(0 100% 71% / 0.4)",
                  "0 0 30px hsl(180 100% 60% / 0.8), 0 0 60px hsl(180 100% 60% / 0.4)",
                  "0 0 25px hsl(270 100% 75% / 0.8), 0 0 50px hsl(270 100% 75% / 0.4)",
                  "0 0 20px hsl(0 100% 71% / 0.8), 0 0 40px hsl(0 100% 71% / 0.4)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              FUTURE
            </motion.div>
            <motion.div
              className="neon-glow block"
              style={{
                background: "var(--gradient-rgb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              CRAFT
            </motion.div>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Where cutting-edge technology meets artistic vision in an immersive digital universe
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-12"
          >
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotateY: 10, 
                rotateX: -5,
                z: 50 
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="clay-button rgb-border px-12 py-6 text-xl font-bold bg-gradient-to-r from-primary to-accent text-white hover:shadow-rgb"
              >
                Enter the Universe ✨
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotateY: -10, 
                rotateX: -5,
                z: 50 
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button 
                variant="outline"
                size="lg"
                className="clay-button px-12 py-6 text-xl font-bold border-2 border-secondary text-secondary hover:bg-secondary/10 hover:shadow-neon"
              >
                Explore Gallery 🌌
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Interactive Arc Gallery */}
        <motion.section
          initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ 
            delay: 1.2, 
            duration: 1.2,
            type: "spring",
            stiffness: 80,
            damping: 20
          }}
          className="w-full max-w-7xl mb-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 electric-glow"
          >
            Interactive Technology Showcase
          </motion.h2>
          <InteractiveArcGallery />
        </motion.section>

        {/* Magical Input Section */}
        <motion.section
          initial={{ opacity: 0, y: 150, rotateX: -60 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            delay: 1.8, 
            duration: 1.5,
            type: "spring",
            stiffness: 60,
            damping: 25
          }}
          className="w-full max-w-5xl mb-16"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 neon-glow"
          >
            Start Your Digital Journey
          </motion.h2>
          <MagicalInputBar />
        </motion.section>

        {/* Floating Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            className="clay-card p-6 rgb-border"
            animate={{
              y: [0, -15, 0],
              rotateX: [0, 10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              ease: "easeInOut" 
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex flex-col items-center space-y-3">
              <span className="text-sm font-medium text-muted-foreground">
                Scroll to discover more
              </span>
              <div className="w-8 h-12 border-2 border-primary rounded-full flex justify-center relative overflow-hidden">
                <motion.div 
                  animate={{ 
                    y: [4, 20, 4],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-6 bg-gradient-to-b from-primary to-accent rounded-full mt-2" 
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-accent/20 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background depth layers for 3D effect */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: "var(--gradient-rgb)",
            transform: "translateZ(-200px) scale(1.5)",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;