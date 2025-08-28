import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
}

const MagneticButton = ({ children, className = "", onClick, variant = 'primary' }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary animate-glow-pulse",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-secondary animate-rainbow-pulse", 
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent animate-glow-pulse"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className={`
        relative px-8 py-4 font-bold rounded-xl 
        ${variants[variant]}
        neon-border magnetic-element group overflow-hidden
        transition-all duration-300 ease-out
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-30"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default MagneticButton;