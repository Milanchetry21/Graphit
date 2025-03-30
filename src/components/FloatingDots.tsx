import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FloatingDots: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const numDots = 30;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots = dotsRef.current;
    const containerRect = container.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      dots.forEach((dot) => {
        const dotRect = dot.getBoundingClientRect();
        const dotX = dotRect.left + dotRect.width / 2;
        const dotY = dotRect.top + dotRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2)
        );

        if (distance < 150) {
          const angle = Math.atan2(mouseY - dotY, mouseX - dotX);
          const force = (150 - distance) / 150;
          const moveX = Math.cos(angle) * force * 30;
          const moveY = Math.sin(angle) * force * 30;

          dot.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
          dot.style.transition = 'transform 0.3s ease-out';
        } else {
          dot.style.transform = 'translate(0, 0)';
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {Array.from({ length: numDots }).map((_, i) => (
        <motion.div
          key={i}
          ref={(el) => el && (dotsRef.current[i] = el)}
          className="absolute w-2 h-2 rounded-full bg-[#0F4C81]/10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingDots; 