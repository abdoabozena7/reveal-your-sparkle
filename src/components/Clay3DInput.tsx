import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const Clay3DInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("Submitted:", inputValue);
      setInputValue("");
    }
  };

  return (
    <motion.div
      className="relative max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        {/* Main input container */}
        <motion.div
          className="relative clay-depth overflow-hidden"
          animate={{
            boxShadow: isFocused 
              ? "0 25px 50px hsl(220 15% 40% / 0.2), 0 0 0 4px hsl(var(--primary) / 0.3), inset 0 2px 0 hsl(220 30% 95%)"
              : "var(--shadow-floating)",
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          {/* Glowing cursor effect */}
          {isFocused && (
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)",
                }}
                animate={{
                  x: [-100, 400],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          )}
          
          {/* Input field */}
          <div className="relative flex items-center p-2">
            <motion.input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your message to start the magic..."
              className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground px-6 py-4 clay-input"
              style={{
                fontSize: "18px",
                fontWeight: "400",
                letterSpacing: "0.02em",
              }}
            />
            
            {/* Submit button */}
            <motion.div
              animate={{
                scale: inputValue.trim() ? 1 : 0.8,
                opacity: inputValue.trim() ? 1 : 0.6,
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
                className="clay-button mr-2 px-8 py-4 text-base font-semibold nature-glow hover:shadow-nature-glow transition-all duration-300"
                style={{
                  background: inputValue.trim() 
                    ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--success)))"
                    : "var(--gradient-clay)",
                  color: inputValue.trim() ? "white" : "hsl(var(--foreground))",
                }}
              >
                Send ✨
              </Button>
            </motion.div>
          </div>
          
          {/* Animated bottom border */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"
            animate={{
              width: isFocused ? "100%" : "0%",
              opacity: isFocused ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          />
        </motion.div>
        
        {/* Floating particles on focus */}
        {isFocused && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full pointer-events-none"
                style={{
                  left: `${20 + i * 15}%`,
                  top: "50%",
                }}
                animate={{
                  y: [-20, -80, -120],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </form>
      
      {/* Helper text */}
      <motion.p
        className="text-center text-sm text-muted-foreground mt-4"
        animate={{
          opacity: isFocused ? 0.8 : 0.5,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        Press Enter or click Send to submit your message
      </motion.p>
    </motion.div>
  );
};

export default Clay3DInput;