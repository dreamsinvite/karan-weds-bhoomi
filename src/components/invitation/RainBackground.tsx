"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  type: "rain" | "petal" | "spark";
}

export function RainBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 50 }).map((_, i) => {
      const typeRand = Math.random();
      const type = typeRand < 0.20 ? "rain" : typeRand < 0.45 ? "spark" : "petal";
      return {
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: type === "petal" ? 8 + Math.random() * 8 : 5 + Math.random() * 7,
        size: type === "rain" ? 1 + Math.random() * 1.5 : type === "spark" ? 2 + Math.random() * 3 : 12 + Math.random() * 14,
        opacity: type === "petal" ? 0.35 + Math.random() * 0.45 : 0.15 + Math.random() * 0.4,
        type,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute inset-0 bg-[#FFF5F5]"
        style={{
          backgroundImage: "radial-gradient(circle at center, #FFF8F8 0%, #FFF0F0 100%)"
        }}
      />

      <div 
        className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full filter blur-[130px] opacity-[0.15]"
        style={{ background: "#FFD6DC" }}
      />
      <div 
        className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full filter blur-[150px] opacity-[0.12]"
        style={{ background: "#F8D7DA" }}
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(rgba(183,110,121,0.18) 1px, transparent 0)`,
          backgroundSize: "24px 24px"
        }}
      />

      {particles.map((p) => {
        if (p.type === "rain") {
          return (
            <motion.div
              key={p.id}
              className="absolute bg-gradient-to-b from-transparent via-[#B76E79]/25 to-transparent"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${50 + Math.random() * 70}px`,
                top: "-120px",
                opacity: p.opacity,
              }}
              animate={{
                y: ["0vh", "120vh"],
              }}
              transition={{
                duration: p.duration - 2.5,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        } else if (p.type === "spark") {
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: "#C5A059",
                boxShadow: "0 0 6px #C5A059",
                top: "-20px",
                opacity: p.opacity,
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [`0px`, `${(Math.random() - 0.5) * 60}px`],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        } else {
          const colors = ["#FDFBF7", "#FFF0F0", "#F8D7DA", "#B76E79", "#C5A059"];
          const petalColor = colors[p.id % colors.length];

          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size * 1.25}px`,
                top: "-40px",
                opacity: p.opacity,
                color: petalColor,
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, Math.sin(p.id) * 50 + (Math.random() - 0.5) * 30, 0],
                rotate: [0, 180 + Math.random() * 180],
                skewX: [0, 15, -15, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 24 30" fill="none" className="drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.03)]">
                <path
                  d="M12 2 C18 2, 23 8, 21 16 C19 22, 14 28, 12 28 C10 28, 5 22, 3 16 C1 8, 6 2, 12 2 Z"
                  fill="currentColor"
                />
                <path
                  d="M12 4 C15 4, 18 8, 17 14 C16 16, 14 18, 12 19"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          );
        }
      })}
    </div>
  );
}
