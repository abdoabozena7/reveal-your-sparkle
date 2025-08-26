import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import EnhancedScene3D from "./EnhancedScene3D";

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 opacity-60">
        <EnhancedScene3D />
      </div>

      {/* Interactive Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="interactive-particle animate-fade-in-scale"
          style={{
            left: particle.x,
            top: particle.y,
          }}
        />
      ))}

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background/85" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
          className="space-y-6"
        >
          {/* Name with Rainbow Effect */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold leading-tight"
          >
            <span 
              className="glow-primary animate-glow-pulse"
              style={{
                background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ff0080)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'text-shimmer 3s ease-in-out infinite',
              }}
            >
              Abdelrahman
            </span>
            <br />
            <span className="text-accent glow-accent animate-rainbow-pulse">Mohamed</span>
          </motion.h1>

          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <p className="text-xl md:text-3xl font-light mb-2">
              <span className="text-secondary glow-secondary">Web Developer</span>
              <span className="text-muted-foreground mx-2">&</span>
              <span className="text-success glow-accent animate-pulse">3D Experience Creator</span>
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <span className="px-3 py-1 rounded-full glass-rainbow animate-float">React</span>
              <span className="px-3 py-1 rounded-full glass-rainbow animate-float" style={{animationDelay: '0.5s'}}>Three.js</span>
              <span className="px-3 py-1 rounded-full glass-rainbow animate-float" style={{animationDelay: '1s'}}>TypeScript</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Experienced in advanced web development with expertise in React, Node.js, and Three.js.
            Creating immersive digital experiences that push the boundaries of web technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="relative bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-bold animate-glow-pulse magnetic-element neon-border group overflow-hidden"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="relative border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 text-lg font-bold magnetic-element glass-rainbow group overflow-hidden"
            >
              <span className="relative z-10 glow-secondary">View Projects</span>
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-3">
            <span className="text-sm text-muted-foreground glow-secondary">Scroll to explore the magic</span>
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-8 h-14 border-2 border-primary rounded-full flex justify-center glass-rainbow">
                <motion.div 
                  animate={{ 
                    y: [0, 20, 0],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-4 bg-gradient-to-b from-primary to-accent rounded-full mt-2 animate-rainbow-pulse" 
                />
              </div>
              <div className="absolute inset-0 animate-pulse">
                <div className="w-8 h-14 border border-accent rounded-full opacity-50"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;