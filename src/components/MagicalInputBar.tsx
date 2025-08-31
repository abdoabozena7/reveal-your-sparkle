import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const MagicalInputBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowControls = useAnimation();

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 150);
      return () => clearTimeout(timer);
    }
  }, [inputValue, isTyping]);

  useEffect(() => {
    if (isFocused) {
      glowControls.start({
        boxShadow: [
          "0 0 20px rgba(255, 107, 107, 0.3), 0 0 40px rgba(78, 205, 196, 0.2), 0 0 60px rgba(139, 89, 182, 0.1)",
          "0 0 30px rgba(78, 205, 196, 0.4), 0 0 50px rgba(139, 89, 182, 0.3), 0 0 70px rgba(255, 107, 107, 0.2)",
          "0 0 20px rgba(139, 89, 182, 0.3), 0 0 40px rgba(255, 107, 107, 0.2), 0 0 60px rgba(78, 205, 196, 0.1)",
        ],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      glowControls.stop();
    }
  }, [isFocused, glowControls]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(true);
    setCursorPosition(e.target.selectionStart || 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("Magic message sent:", inputValue);
      // Add sparkle animation on submit
      setInputValue("");
      setIsFocused(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.8
      }}
      className="relative max-w-4xl mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* Magical particles around the input */}
      {isFocused && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                background: `hsl(${(i * 30) % 360}, 70%, 60%)`,
                left: `${10 + (i % 4) * 20}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
              }}
              animate={{
                x: [0, Math.sin(i) * 30, 0],
                y: [0, Math.cos(i) * 30, 0],
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 2 + i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      <form onSubmit={handleSubmit} className="relative">
        {/* Main container with 3D effect */}
        <motion.div
          ref={containerRef}
          className="relative clay-depth overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            backdropFilter: "blur(20px)",
            borderRadius: "2rem",
            border: "1px solid rgba(255,255,255,0.2)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: isFocused ? -2 : 0,
            rotateY: isFocused ? 1 : 0,
            scale: isFocused ? 1.02 : 1,
          }}
          whileHover={{
            rotateX: -3,
            rotateY: 2,
            scale: 1.01,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Animated glow border */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            animate={glowControls}
            style={{
              background: "conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #9b59b6, #ffd700, #ff6b6b)",
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "exclude",
              opacity: isFocused ? 1 : 0,
            }}
          />

          {/* Typing indicator waves */}
          {isTyping && (
            <div className="absolute top-2 left-6 flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}

          {/* Input field with magical cursor */}
          <div className="relative flex items-center p-2">
            <div className="relative flex-1">
              <motion.input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Type your magical message here..."
                className="w-full bg-transparent border-none outline-none text-xl text-foreground placeholder:text-muted-foreground px-8 py-6 font-medium tracking-wide"
                style={{
                  textShadow: isFocused ? "0 0 10px rgba(255,255,255,0.3)" : "none",
                }}
              />
              
              {/* Custom animated cursor */}
              {isFocused && (
                <motion.div
                  className="absolute top-1/2 h-8 w-0.5 bg-gradient-to-b from-primary to-accent"
                  style={{
                    left: `${32 + cursorPosition * 12}px`, // Approximate character width
                    transform: "translateY(-50%)",
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scaleY: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>

            {/* Magic send button */}
            <motion.div
              animate={{
                scale: inputValue.trim() ? 1 : 0.8,
                opacity: inputValue.trim() ? 1 : 0.6,
                rotateZ: inputValue.trim() ? 0 : -5,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <Button
                type="submit"
                disabled={!inputValue.trim()}
                className="clay-button relative overflow-hidden px-8 py-6 text-lg font-bold bg-gradient-to-r from-primary to-accent text-white border-0 mr-2"
                style={{
                  background: inputValue.trim() 
                    ? "linear-gradient(135deg, #ff6b6b, #4ecdc4, #9b59b6)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-0"
                  animate={{
                    opacity: inputValue.trim() ? [0, 0.5, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Send</span>
                  <motion.span
                    animate={{
                      rotate: inputValue.trim() ? [0, 360] : 0,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ✨
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary"
            animate={{
              width: isFocused ? "100%" : "0%",
              opacity: isFocused ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Floating help text */}
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{
            opacity: isFocused ? 1 : 0.7,
            y: isFocused ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-muted-foreground text-center font-medium">
            Press Enter or click Send to cast your digital spell ✨
          </p>
        </motion.div>
      </form>

      {/* Background depth layers */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 clay-card opacity-20 blur-xl"
          style={{
            background: "linear-gradient(135deg, #ff6b6b, #4ecdc4, #9b59b6)",
            transform: "translateZ(-40px) scale(1.1) rotateX(5deg)",
          }}
        />
        <div 
          className="absolute inset-0 clay-card opacity-10 blur-2xl"
          style={{
            background: "linear-gradient(135deg, #4ecdc4, #9b59b6, #ff6b6b)",
            transform: "translateZ(-60px) scale(1.2) rotateX(8deg)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default MagicalInputBar;