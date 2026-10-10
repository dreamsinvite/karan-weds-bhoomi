"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail } from "lucide-react";

// ── COMPONENT: TWINKLING SPARKS ──
function TwinklingStars() {
  const [stars, setStars] = useState<{ id: number; left: string; top: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2.5}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-[#ffd97d] rounded-full animate-twinkle-hindu opacity-50"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            "--duration": star.duration,
            animationDelay: star.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ── COMPONENT: GOLDEN BUTTERFLY FOR ANIMATIONS ──
interface ButterflyProps {
  delay?: number;
  duration?: number;
  startX?: number;
  endX?: number;
  startY?: number;
  endY?: number;
  scale?: number;
  yControl?: number;
}

const Butterfly = ({
  delay = 0,
  duration = 10,
  startX = -40,
  endX = 450,
  startY = 300,
  endY = 50,
  scale = 0.7,
  yControl = 50,
}: ButterflyProps) => {
  return (
    <motion.div
      className="absolute z-[25] pointer-events-none"
      initial={{ x: startX, y: startY, opacity: 0, scale: 0 }}
      animate={{
        x: [startX, startX + (endX - startX) * 0.33, startX + (endX - startX) * 0.66, endX],
        y: [
          startY,
          startY + (endY - startY) * 0.33 + yControl,
          startY + (endY - startY) * 0.66 - yControl,
          endY,
        ],
        opacity: [0, 0.9, 0.9, 0],
        scale: [0, scale, scale, 0],
        rotate: [startX < endX ? 15 : -15, startX < endX ? -5 : 5, startX < endX ? 20 : -20, startX < endX ? 0 : 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 40 40" className="drop-shadow-[0_1.5px_3px_rgba(212,175,55,0.35)]">
        <defs>
          <linearGradient id="gold-butterfly-grad-kb-door" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff5d6" />
            <stop offset="50%" stopColor="#e5c07b" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>

        {/* Left Wing Group */}
        <motion.g
          style={{ originX: "20px", originY: "20px" }}
          animate={{ rotateY: [0, 68, 0] }}
          transition={{ duration: 0.22, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M20 20 C14 4 4 1 2 12 C1 18 5 25 15 28 C10 29 7 32 8 35 C9 38 15 36 20 31 Z"
            fill="url(#gold-butterfly-grad-kb-door)"
          />
          <path
            d="M20 20 C15 7 6 5 4 13 C3 18 7 24 16 26"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.6"
            opacity="0.45"
          />
        </motion.g>

        {/* Right Wing Group */}
        <motion.g
          style={{ originX: "20px", originY: "20px" }}
          animate={{ rotateY: [0, 68, 0] }}
          transition={{ duration: 0.22, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M20 20 C26 4 36 1 38 12 C39 18 35 25 25 28 C30 29 33 32 32 35 C31 38 25 36 20 31 Z"
            fill="url(#gold-butterfly-grad-kb-door)"
          />
          <path
            d="M20 20 C25 7 34 5 36 13 C37 18 33 24 24 26"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.6"
            opacity="0.45"
          />
        </motion.g>

        {/* Body */}
        <path d="M19.5 12 C19.5 10 20.5 10 20.5 12 L20.5 30 L19.5 30 Z" fill="#8c6b30" />
      </svg>
    </motion.div>
  );
};

const GoldenButterflies = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[22]">
      <Butterfly startX={-40} endX={440} startY={320} endY={60} scale={0.75} delay={0} duration={14} yControl={60} />
      <Butterfly startX={440} endX={-40} startY={280} endY={40} scale={0.65} delay={4} duration={12} yControl={-50} />
      <Butterfly startX={-30} endX={430} startY={180} endY={120} scale={0.55} delay={8} duration={16} yControl={40} />
    </div>
  );
};

// ── FLOATING PETALS & GOLD DUST PARTICLES ──
const DOOR_PARTICLES = Array.from({ length: 24 }).map((_, i) => {
  const isGold = i % 2 === 0;
  return {
    id: i,
    isGold,
    left: `${(i * 137.5) % 100}%`,
    delay: `${(i * 0.4) % 6}s`,
    duration: `${7 + (i % 4) * 2.5}s`,
    size: isGold ? `${3 + (i % 3) * 2}px` : `${10 + (i % 3) * 4}px`,
  };
});

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  spin: number;
}

// ── COMPONENT: ROYAL DOOR OPENER ──
interface EnvelopeOpenerProps {
  onOpen: () => void;
  onOpenStart?: () => void;
  isReady?: boolean;
  onOpenClick?: () => void;
  groomName?: string;
  brideName?: string;
  dateLabel?: string;
  isEmbedded?: boolean;
}

export function EnvelopeOpener({
  onOpen,
  onOpenStart,
  isReady = true,
  groomName = "Karan",
  brideName = "Bhoomi",
  dateLabel = "17th & 18th December 2026",
  isEmbedded = false,
}: EnvelopeOpenerProps) {
  const [unlocking, setUnlocking] = useState(false);
  const [opening, setOpening] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<StarParticle[]>([]);

  const triggerRisingStars = (width: number, height: number) => {
    const particles: StarParticle[] = [];
    const colors = ["#ffd97d", "#ffe4a0", "#ffdbe3", "#fbcfe8", "#ffffff", "#c9953a"];
    for (let i = 0; i < 150; i++) {
      const spawnX = width / 2 + (Math.random() - 0.5) * 260;
      const spawnY = height / 2 + 60 + (Math.random() - 0.5) * 50;
      particles.push({
        x: spawnX,
        y: spawnY,
        vx: (Math.random() - 0.5) * 4.5,
        vy: -2 - Math.random() * 8.5,
        size: 0.8 + Math.random() * 3.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.9 + Math.random() * 0.1,
        spin: (Math.random() - 0.5) * 0.12,
      });
    }
    particlesRef.current = particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    const render = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const remaining: StarParticle[] = [];
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.vx *= 0.985;
        p.alpha -= 0.012;

        if (p.alpha > 0.05) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          remaining.push(p);
        }
      });

      particlesRef.current = remaining;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleOpenClick = () => {
    if (unlocking || opening) return;
    setUnlocking(true);

    // 1. Immediately trigger video playback synchronously in user click handler
    if (onOpenStart) {
      onOpenStart();
    }

    if (canvasRef.current) {
      triggerRisingStars(canvasRef.current.width, canvasRef.current.height);
    }

    // 2. Rotate the central royal lock for unlock simulation, then begin parting doors
    setTimeout(() => {
      setOpening(true);
    }, 350);

    // 3. Gates part completely and trigger intro transition
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  useEffect(() => {
    if (isEmbedded) return;
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isEmbedded]);

  return (
    <motion.div
      key="royal-door-overlay"
      className="absolute inset-0 z-[130] flex items-center justify-center overflow-hidden bg-transparent select-none"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleOpenClick}
    >
      {/* Ambient background particles fade out cleanly as doors open */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <TwinklingStars />
        <GoldenButterflies />

        {/* Floating particles background across the gates */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[15]">
          {DOOR_PARTICLES.map((p) => (
            <div
              key={p.id}
              className={`absolute opacity-0 ${p.isGold
                  ? "animate-gold-dust bg-[#c9953a] rounded-full shadow-[0_0_8px_#ffd97d]"
                  : "animate-falling-petal bg-gradient-to-tr from-[#fbcfe8] to-[#ffdbe3] rounded-[50%_0_50%_50%]"
                }`}
              style={{
                left: p.left,
                top: p.isGold ? "auto" : "-10%",
                bottom: p.isGold ? "-10%" : "auto",
                width: p.size,
                height: p.size,
                "--duration": p.duration,
                animationDelay: p.delay,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </motion.div>

      {/* Celebration sparkles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[45]" />

      {/* ── SPLIT ROYAL GATES / DOORS (Left Half & Right Half in Baby Pink Envelope Theme) ── */}

      {/* 1. LEFT DOOR */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-end z-[20] shadow-[15px_0_40px_rgba(40,15,22,0.45)] overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FFF0F3 0%, #FFDBE3 45%, #F7CAD5 80%, #EDB3C2 100%)",
        }}
        initial={{ x: 0 }}
        animate={{ x: opening ? "-100%" : 0 }}
        transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
      >
        {/* Subtle royal damask / arch texture overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 100% 50%, rgba(201, 149, 58, 0.35) 0%, transparent 60%)",
          }}
        />

        {/* Left inner gold ornate border frame */}
        <div className="absolute inset-3 xs:inset-5 sm:inset-8 border-1.5 border-[#c9953a]/45 rounded-l-3xl pointer-events-none border-r-0 shadow-[inset_0_0_20px_rgba(201,149,58,0.12)]">
          {/* Ornate corner filigrees */}
          <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-[#c9953a]" />
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#ffd97d]/70" />
          <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-[#c9953a]" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#ffd97d]/70" />

          {/* Palace Arch Motif on left door */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-28 h-64 border-y border-l border-[#c9953a]/25 rounded-l-full pointer-events-none opacity-60" />
        </div>

        {/* Left Vertical Ribbon & Gold Trim Binding */}
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ffd97d]/30 via-[#c9953a] to-[#ffd97d]/30 shadow-[0_0_8px_rgba(201,149,58,0.6)] z-30" />
        <div className="absolute right-1 top-0 bottom-0 w-[1px] bg-[#ffd97d]/20 z-30" />
      </motion.div>

      {/* 2. RIGHT DOOR */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-start z-[20] shadow-[-15px_0_40px_rgba(40,15,22,0.45)] overflow-hidden"
        style={{
          background: "linear-gradient(225deg, #FFF0F3 0%, #FFDBE3 45%, #F7CAD5 80%, #EDB3C2 100%)",
        }}
        initial={{ x: 0 }}
        animate={{ x: opening ? "100%" : 0 }}
        transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
      >
        {/* Subtle royal damask / arch texture overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 0% 50%, rgba(201, 149, 58, 0.35) 0%, transparent 60%)",
          }}
        />

        {/* Right inner gold ornate border frame */}
        <div className="absolute inset-3 xs:inset-5 sm:inset-8 border-1.5 border-[#c9953a]/45 rounded-r-3xl pointer-events-none border-l-0 shadow-[inset_0_0_20px_rgba(201,149,58,0.12)]">
          {/* Ornate corner filigrees */}
          <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-[#c9953a]" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ffd97d]/70" />
          <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-[#c9953a]" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#ffd97d]/70" />

          {/* Palace Arch Motif on right door */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-28 h-64 border-y border-r border-[#c9953a]/25 rounded-r-full pointer-events-none opacity-60" />
        </div>

        {/* Right Vertical Ribbon & Gold Trim Binding */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ffd97d]/30 via-[#c9953a] to-[#ffd97d]/30 shadow-[0_0_8px_rgba(201,149,58,0.6)] z-30" />
        <div className="absolute left-1 top-0 bottom-0 w-[1px] bg-[#ffd97d]/20 z-30" />
      </motion.div>

      {/* ── CENTRAL ROYAL MEDALLION / LOCK HALVES ── */}

      {/* Left Lock Half */}
      <motion.div
        className="absolute right-1/2 top-1/2 -translate-y-1/2 z-[35] pointer-events-none"
        style={{ transformOrigin: "right center" }}
        initial={{ x: 0 }}
        animate={{
          x: opening ? "-50vw" : 0,
          rotate: unlocking ? 360 : 0,
          scale: opening ? 0.9 : 1,
        }}
        transition={{
          x: { duration: 1.3, ease: [0.77, 0, 0.175, 1] },
          rotate: { duration: 0.8, ease: "easeInOut" },
          scale: { duration: 1.3 },
        }}
      >
        <div className="translate-x-[0.5px] drop-shadow-[0_10px_25px_rgba(92,45,58,0.45)]">
          <svg width="60" height="120" viewBox="0 0 56 112" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M56 10C56 10 30 10 20 20C10 30 10 46 10 56C10 66 10 82 20 92C30 102 56 102 56 102"
              stroke="#c9953a"
              strokeWidth="3.2"
              fill="#5c2d3a"
            />
            <path
              d="M56 22C46 22 38 28 32 38C26 48 26 56 26 56C26 56 26 64 32 74C38 84 46 90 56 90"
              stroke="#ffd97d"
              strokeWidth="1.6"
              strokeDasharray="3 3"
            />
            <path d="M56 46C52 46 48 50 48 56C48 60 51 63 54 65L52 74H56" fill="#c9953a" />
            <path d="M18 42C14 46 14 50 18 54" stroke="#c9953a" strokeWidth="1.8" />
            {/* Center Initial K on Left Door */}
            <text x="34" y="60" fill="#ffd97d" fontSize="13" fontWeight="bold" fontFamily="'Playfair Display', serif" textAnchor="middle">
              {groomName.charAt(0) || "K"}
            </text>
          </svg>
        </div>
      </motion.div>

      {/* Right Lock Half */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-y-1/2 z-[35] pointer-events-none"
        style={{ transformOrigin: "left center" }}
        initial={{ x: 0 }}
        animate={{
          x: opening ? "50vw" : 0,
          rotate: unlocking ? 360 : 0,
          scale: opening ? 0.9 : 1,
        }}
        transition={{
          x: { duration: 1.3, ease: [0.77, 0, 0.175, 1] },
          rotate: { duration: 0.8, ease: "easeInOut" },
          scale: { duration: 1.3 },
        }}
      >
        <div className="-translate-x-[0.5px] drop-shadow-[0_10px_25px_rgba(92,45,58,0.45)]">
          <svg width="60" height="120" viewBox="0 0 56 112" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 10C0 10 26 10 36 20C46 30 46 46 46 56C46 66 46 82 36 92C26 102 0 102 0 102"
              stroke="#c9953a"
              strokeWidth="3.2"
              fill="#5c2d3a"
            />
            <path
              d="M0 22C10 22 18 28 24 38C30 48 30 56 30 56C30 56 30 64 24 74C18 84 10 90 0 90"
              stroke="#ffd97d"
              strokeWidth="1.6"
              strokeDasharray="3 3"
            />
            <path d="M0 46C4 46 8 50 8 56C8 60 5 63 2 65L4 74H0" fill="#c9953a" />
            <path d="M38 42C42 46 42 50 38 54" stroke="#c9953a" strokeWidth="1.8" />
            {/* Center Initial B on Right Door */}
            <text x="22" y="60" fill="#ffd97d" fontSize="13" fontWeight="bold" fontFamily="'Playfair Display', serif" textAnchor="middle">
              {brideName.charAt(0) || "B"}
            </text>
          </svg>
        </div>
      </motion.div>

      {/* ── CARD FRONT CONTENT (Positioned on the doors, matching william-weds-olivia) ── */}
      <motion.div
        className={`relative z-[30] flex flex-col items-center justify-between text-center px-6 max-w-sm sm:max-w-md h-full py-16 ${opening ? "pointer-events-none" : "pointer-events-auto cursor-pointer"
          }`}
        animate={{
          opacity: opening ? 0 : 1,
          scale: opening ? 0.92 : 1,
          y: opening ? -20 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Header Information */}
        <div className="flex flex-col items-center mt-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.45em] text-[#8E5B61] mb-2 drop-shadow-xs">
            The Wedding Invitation
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c9953a] to-transparent mb-4" />

          {/* Couple Names in Deep Rose & Royal Font */}
          <h1
            className="flex flex-col items-center text-4xl xs:text-5xl sm:text-6xl font-serif italic text-[#5c1d26] leading-tight select-none px-4 font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 2px 10px rgba(255, 255, 255, 0.8), 0 1px 3px rgba(183, 110, 121, 0.2)",
            }}
          >
            <span>{groomName}</span>
            <span className="text-2xl xs:text-3xl sm:text-4xl text-[#c9953a] font-normal my-0.5">&amp;</span>
            <span>{brideName}</span>
          </h1>

          {/* <p className="text-[11px] font-semibold text-[#8E5B61] tracking-widest uppercase mt-2">
            {dateLabel}
          </p> */}
        </div>

        {/* Space gap for the central golden lock medallion */}
        <div className="h-28 w-px pointer-events-none" />

        {/* Bottom invitation text & interactive opening button */}
        <div className="flex flex-col items-center mb-4">
          <p className="text-xs sm:text-sm leading-relaxed text-[#7A6568] max-w-xs mb-8 font-serif italic px-2">
            With hearts full of love, we warmly invite you to celebrate our union.
          </p>

          {/* Interactive Tap Hand Button (Animated Nanu-Motu Pulse) */}
          <div className="relative flex items-center justify-center">
            {/* Concentric Expanding Radar Waves */}
            <motion.div
              animate={{
                scale: [0.9, 1.5, 2.0],
                opacity: [0.75, 0.35, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute w-15 h-15 sm:w-16 sm:h-16 rounded-full border-2 border-[#ffd97d]/70 pointer-events-none"
            />
            <motion.div
              animate={{
                scale: [0.9, 1.35, 1.75],
                opacity: [0.65, 0.25, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: 0.5,
                ease: "easeOut",
              }}
              className="absolute w-15 h-15 sm:w-16 sm:h-16 rounded-full border border-[#c9953a]/50 pointer-events-none"
            />

            {/* Glowing Golden Aura pulsing in sync */}
            <motion.div
              animate={{
                scale: [0.95, 1.3, 0.95],
                opacity: [0.35, 0.8, 0.35],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[#c9953a]/40 blur-xl rounded-full pointer-events-none"
            />

            {/* Circular Medallion with Prominent Scale Animation (Nanu-Motu Pulse) */}
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenClick();
              }}
              disabled={!isReady || unlocking}
              className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-full border-2 border-[#ffd97d] hover:border-white bg-[#5c2d3a] shadow-[0_8px_30px_rgba(92,45,58,0.7),0_0_20px_rgba(201,149,58,0.4)] flex items-center justify-center cursor-pointer group active:scale-90 disabled:opacity-60"
              animate={{
                scale: [0.92, 1.15, 0.92],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-label="Tap to open invitation"
            >
              <motion.svg
                width="34"
                height="34"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-[0_2px_8px_rgba(255,217,125,0.4)] transition-transform group-hover:scale-110"
                animate={{
                  y: [0, -2.5, 0],
                  scale: [0.94, 1.08, 0.94],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Hand silhouette with crisp white outline and royal gold fill */}
                <path
                  d="M13.5 17.5V7a1.8 1.8 0 0 1 3.6 0v7M17.1 14V5a1.8 1.8 0 0 1 3.6 0v9M20.7 14.5V6.5a1.8 1.8 0 0 1 3.6 0v8.5M24.3 16V9a1.8 1.8 0 0 1 3.6 0v10c0 6-3.8 10.5-9.5 10.5s-8.5-3.8-10-8l-2-3.5a1.8 1.8 0 0 1 2.8-2.2l2.3 2.4"
                  fill="#c9953a"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Thumb crease detail */}
                <path
                  d="M13.5 17.5c-1-1.4-2.2-2.3-3.6-2.7"
                  stroke="#5c2d3a"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
