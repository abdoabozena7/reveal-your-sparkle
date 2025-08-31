import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SurrealScene3D from "./SurrealScene3D";
import FloatingGallery from "./FloatingGallery";
import Clay3DInput from "./Clay3DInput";

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
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Surreal 3D Background */}
      <div className="absolute inset-0 opacity-80">
        <SurrealScene3D />
      </div>

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60" />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 text-center space-y-16">
        
        {/* Hero Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-9xl font-black leading-tight tracking-tight"
          >
            <motion.span 
              className="nature-glow block"
              animate={{
                textShadow: [
                  "0 0 20px hsl(var(--primary) / 0.6)",
                  "0 0 40px hsl(var(--primary) / 0.8)",
                  "0 0 20px hsl(var(--primary) / 0.6)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Digital
            </motion.span>
            <motion.span 
              className="text-foreground block"
              style={{
                background: 'var(--gradient-nature)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Artisan
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl font-medium text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Crafting immersive digital experiences where technology meets nature's organic beauty
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="clay-button px-10 py-6 text-lg font-bold nature-glow bg-primary text-primary-foreground hover:shadow-nature-glow"
              >
                Start Your Journey ✨
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, rotateY: -5 }}
              whileTap={{ scale: 0.98 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button 
                variant="outline"
                size="lg"
                className="clay-button px-10 py-6 text-lg font-bold border-2 border-primary/50 text-foreground hover:bg-primary/10"
              >
                Explore Gallery 🎨
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-8 nature-glow"
          >
            Skills & Expertise
          </motion.h2>
          <FloatingGallery />
        </motion.div>

        {/* Interactive Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="relative"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-8 nature-glow"
          >
            Let's Create Something Amazing
          </motion.h2>
          <Clay3DInput />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="clay-card p-4"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-muted-foreground">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
                <motion.div 
                  animate={{ 
                    y: [0, 16, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="w-1 h-3 bg-primary rounded-full mt-2" 
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;