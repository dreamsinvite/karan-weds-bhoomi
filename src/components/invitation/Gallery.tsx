"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const GALLERY_IMAGES = [
  "/templates/wedding/advait-weds-ishani/couple-1.png",
  "/templates/wedding/advait-weds-ishani/couple-2.png",
  "/templates/wedding/advait-weds-ishani/couple-3.png",
  "/templates/wedding/advait-weds-ishani/couple-4.png",
  "/templates/wedding/advait-weds-ishani/couple-5.png",
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    zIndex: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
    },
  }),
};

export function Gallery() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const activeIndex = Math.abs(page % GALLERY_IMAGES.length);

  const handleNext = () => {
    setPage([page + 1, 1]);
  };

  const handlePrev = () => {
    setPage([page - 1, -1]);
  };

  const handleDotClick = (index: number) => {
    const diff = index - activeIndex;
    if (diff !== 0) {
      setPage([page + diff, diff > 0 ? 1 : -1]);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      autoPlayTimer.current = setInterval(() => {
        handleNext();
      }, 3500);
    }

    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [page, isHovered]);

  return (
    <section
      className="relative z-10 py-24 px-6 overflow-hidden border-t border-[#ebd8c3] flex flex-col items-center select-none"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(253, 250, 245, 0.90), rgba(252, 247, 239, 0.95)), url(/templates/wedding/nitin-weds-rita/story-floral-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative Ornate Floral Header Accent */}
      <div className="w-full text-center relative z-10 flex flex-col items-center">
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#c9953a]">Captured Moments</span>
        <h2 className="font-serif italic text-4xl mt-3 text-[#6b4f2c]">Our Love Gallery</h2>

        <div className="flex items-center gap-2 mt-4 mb-12">
          <div className="w-8 h-[1px] bg-[#c9953a]/30" />
          <Heart className="w-4 h-4 text-[#c9953a]/50 fill-[#c9953a]/5" />
          <div className="w-8 h-[1px] bg-[#c9953a]/30" />
        </div>
      </div>

      {/* Main Luxury Frame & Carousel Container */}
      <div
        className="relative w-full max-w-[340px] aspect-[4/5] z-10 flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Shadow glow underframe */}
        <div className="absolute inset-2 rounded-2xl bg-[#ebd8c3]/10 blur-xl z-0" />

        {/* Ornate Gold Border Frame Wrapper */}
        <div className="absolute inset-0 rounded-[20px] border border-[#c9953a]/30 p-1.5 z-10 pointer-events-none">
          <div className="w-full h-full rounded-[14px] border border-[#c9953a]/15" />
        </div>

        {/* Sliding Images Viewport */}
        <div className="relative w-[calc(100%-12px)] h-[calc(100%-12px)] overflow-hidden rounded-[14px] bg-[#faf5f0] shadow-[0_15px_35px_rgba(107,79,44,0.08)]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={GALLERY_IMAGES[activeIndex]}
              custom={direction}
              variants={slideVariants as any}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </AnimatePresence>
        </div>

        {/* Left Side Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#fdfaf5] border border-[#c9953a]/35 shadow-[0_4px_12px_rgba(107,79,44,0.12)] flex items-center justify-center text-[#6b4f2c] active:scale-95 hover:bg-[#c9953a] hover:text-white hover:border-[#c9953a] transition-all duration-300 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
        </button>

        {/* Right Side Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#fdfaf5] border border-[#c9953a]/35 shadow-[0_4px_12px_rgba(107,79,44,0.12)] flex items-center justify-center text-[#6b4f2c] active:scale-95 hover:bg-[#c9953a] hover:text-white hover:border-[#c9953a] transition-all duration-300 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 shrink-0" />
        </button>
      </div>

      {/* Ornate Gold Pagination Dots Indicator */}
      <div className="flex justify-center gap-3 mt-8 relative z-10">
        {GALLERY_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <motion.div
              animate={{
                scale: activeIndex === index ? 1.3 : 1,
                backgroundColor: activeIndex === index ? "#c9953a" : "rgba(201, 149, 58, 0.25)",
              }}
              transition={{ duration: 0.3 }}
              className="w-2.5 h-2.5 rounded-full"
            />
            {activeIndex === index && (
              <motion.div
                layoutId="active-dot"
                className="absolute inset-0 rounded-full border border-[#c9953a]/40 scale-150"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Background corner leaves accent */}
      <img
        src="/templates/wedding/nitin-weds-rita/flower-1.png"
        alt=""
        className="absolute -bottom-12 -left-12 w-48 opacity-[0.06] rotate-45 pointer-events-none select-none mix-blend-multiply z-0"
      />
      <img
        src="/templates/wedding/nitin-weds-rita/flower-2.png"
        alt=""
        className="absolute -top-12 -right-12 w-48 opacity-[0.06] -rotate-12 pointer-events-none select-none mix-blend-multiply z-0"
      />
    </section>
  );
}
