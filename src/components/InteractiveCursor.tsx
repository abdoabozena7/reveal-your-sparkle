import { useEffect, useState } from "react";

const InteractiveCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let trailId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Add trail particle
      const newTrail = { id: trailId++, x: e.clientX, y: e.clientY };
      setTrails(prev => [...prev, newTrail]);

      // Remove trail after animation
      setTimeout(() => {
        setTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
      }, 500);

      // Check if hovering over interactive elements
      const element = e.target as HTMLElement;
      const isInteractive = !!(element.tagName === 'BUTTON' || 
                           element.tagName === 'A' || 
                           element.classList.contains('magnetic-element') ||
                           element.closest('button') ||
                           element.closest('a'));
      
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -100, y: -100 });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'scale-150' : 'scale-100'}`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      
      {/* Trail particles */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 2,
            top: trail.y - 2,
          }}
        />
      ))}
    </>
  );
};

export default InteractiveCursor;