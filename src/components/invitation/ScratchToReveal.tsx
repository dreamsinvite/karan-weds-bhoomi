"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchToRevealProps {
  revealContent: React.ReactNode;
  width?: number;
  height?: number;
  onReveal?: () => void;
}

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  shape: "rect" | "circle" | "star";
}

const CONFETTI_COLORS = [
  "#B76E79",
  "#8E5B61",
  "#C5A059",
  "#ffffff",
  "#fbcfe8",
  "#ffd700",
  "#FFF5F5",
  "#FDFBF7",
];

function launchConfetti(canvas: HTMLCanvasElement, cx: number, cy: number) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  if (!ctx) return;

  const origins = [
    { x: cx * 0.3, y: cy * 0.5 },
    { x: cx * 1.7, y: cy * 0.5 },
  ];

  const particles: ConfettiParticle[] = [];
  origins.forEach((origin) => {
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 6;
      particles.push({
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 4 + Math.random() * 6,
        alpha: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        shape: (["rect", "circle", "star"] as const)[Math.floor(Math.random() * 3)],
      });
    }
  });

  const gravity = 0.22;
  const drag = 0.98;
  let frame = 0;

  function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const outer = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const inner = outer + Math.PI / 5;
      ctx.lineTo(x + Math.cos(outer) * r, y + Math.sin(outer) * r);
      ctx.lineTo(x + Math.cos(inner) * (r * 0.45), y + Math.sin(inner) * (r * 0.45));
    }
    ctx.closePath();
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach((p) => {
      if (p.alpha <= 0.01) return;
      alive = true;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += gravity;
      p.vx *= drag;
      p.vy *= drag;
      p.rotation += p.rotationSpeed;
      if (frame > 60) p.alpha -= 0.018;
      p.alpha = Math.max(0, p.alpha);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        drawStar(ctx, 0, 0, p.size / 2);
      }
      ctx.restore();
    });

    frame++;
    if (alive && frame < 200) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(animate);
}

export function ScratchToReveal({
  revealContent,
  width = 300,
  height = 115,
  onReveal,
}: ScratchToRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#D99B9B");
    grad.addColorStop(0.3, "#FFF5F5");
    grad.addColorStop(0.7, "#B76E79");
    grad.addColorStop(1, "#8E5B61");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    for (let i = 0; i < 45; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255, 255, 255, 0.6)" : "rgba(183, 110, 121, 0.5)";
      ctx.beginPath();
      ctx.arc(
        Math.random() * (width - 24) + 12,
        Math.random() * (height - 24) + 12,
        0.8 + Math.random() * 1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.fillStyle = "#5C1D26";
    ctx.font = "italic 600 15px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch to Reveal our Big Day!", width / 2, height / 2 - 6);

    ctx.fillStyle = "#8E5B61";
    ctx.font = "bold 8px 'sans-serif'";
    ctx.fillText("DATE & COUNTDOWN • SWIPE TO ERASE", width / 2, height / 2 + 18);
  }, [width, height]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 42, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsScratching(true);
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScratching) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparent++;
      }
    }

    const total = canvas.width * canvas.height;
    const percent = (transparent / total) * 100;

    if (percent > 45 && !isRevealed) {
      setIsRevealed(true);
      if (onReveal) onReveal();
      setTimeout(() => {
        const cc = confettiCanvasRef.current;
        if (cc) launchConfetti(cc, cc.width / 2, cc.height / 2);
      }, 100);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex items-center justify-center shadow-[0_10px_30px_rgba(183,110,121,0.08)] rounded-2xl overflow-hidden bg-white border border-[#B76E79]/20"
      style={{ width, height }}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-[#FFF5F5] z-0 select-none">
        {revealContent}
      </div>

      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-pointer touch-none z-10"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <canvas
        ref={confettiCanvasRef}
        width={width}
        height={height}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ borderRadius: "inherit" }}
      />
    </div>
  );
}
