"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Music,
  Sun,
  Car,
  HeartHandshake,
  Flame,
  MapPin,
  X,
  Clock,
  Calendar,
  Sparkle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { invitation, WeddingEvent } from "./data";
import { LazyEventVideo } from "./LazyEventVideo";

import gardenBg from "@/assets/garden-bg.png";

const EVENT_ICONS = [
  Sparkles,       // Mandap Muhurat
  Music,          // Rings & Rhythm
  Sun,            // Pithi & Petals
  Car,            // Band Baaja Baarat
  HeartHandshake, // Garlands & Grace
  Flame,          // Mangal Parinay
];

const EVENT_ILLUSTRATIONS = [
  "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/siddhant-weds-anissa/carnival.png",  // Mandap Muhurat
  "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/siddhant-weds-anissa/sangeet.png",   // Rings & Rhythm
  "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/siddhant-weds-anissa/carnival.png",  // Pithi & Petals
  "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/siddhant-weds-anissa/barat.png",     // Band Baaja Baarat
  "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/Traditional.png", // Garlands & Grace
  "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/siddhant-weds-anissa/phere.png",     // Mangal Parinay
];

export function TimelineSection() {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset video loaded state when switching selected event
  useEffect(() => {
    setIsVideoLoaded(false);
  }, [selectedEventIndex]);

  // Lock body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (selectedEventIndex !== null) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedEventIndex(null);
        } else if (e.key === "ArrowRight") {
          setSelectedEventIndex((prev) =>
            prev !== null ? (prev + 1) % invitation.events.length : 0
          );
        } else if (e.key === "ArrowLeft") {
          setSelectedEventIndex((prev) =>
            prev !== null
              ? (prev - 1 + invitation.events.length) % invitation.events.length
              : 0
          );
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      };
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [selectedEventIndex]);

  const activeEvent: WeddingEvent | null =
    selectedEventIndex !== null ? invitation.events[selectedEventIndex] : null;

  const isDarkTheme =
    activeEvent?.theme === "dark" ||
    activeEvent?.id === "rings-and-rhythm" ||
    activeEvent?.id === "mangal-parinay";

  const titleColor =
    activeEvent?.titleColor || (isDarkTheme ? "#FFFDF5" : "#4A1D24");
  const textColor =
    activeEvent?.textColor || (isDarkTheme ? "#FFFDF5" : "#4A1D24");
  const accentColor =
    activeEvent?.accentColor || (isDarkTheme ? "#FCD34D" : "#8E5B61");

  return (
    <section
      id="events-section"
      className="relative z-10 py-16 px-4 sm:px-6 text-[#4A1D24] flex flex-col items-center justify-center overflow-hidden border-t border-[#B76E79]/20 select-none"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(255, 245, 245, 0.88) 0%, rgba(255, 245, 245, 0.97) 100%), url(${gardenBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center relative z-10 text-center">
        {/* ── Section Title Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-4 text-center"
        >
          {/* Royal Sacred Motif Badge */}
          {/* <div className="inline-flex items-center gap-2 mb-2 text-[#b91c1c] text-xs font-bold tracking-widest">
            <span>卐 || Shree Ganeshaya Namah || 卐</span>
          </div> */}

          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#B76E79] block">
            Auspicious Ceremonies
          </span>

          <h2
            className="font-serif italic text-3xl sm:text-4xl text-[#4A1D24] font-bold mt-1 tracking-wide"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 1px 3px rgba(255, 255, 255, 0.9)",
            }}
          >
            Wedding Celebrations
          </h2>

          {/* Elegant Gold Divider */}
          <div className="flex items-center justify-center gap-2 my-2.5">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#B76E79]/50" />
            <span className="text-xs text-[#C5A059]">✦</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#B76E79]/50" />
          </div>

          {/* <p
            className="text-xs sm:text-[13px] font-serif italic tracking-[0.18em] text-[#8E5B61] font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            17th &amp; 18th December 2026 • Discover Resorts, Karjat
          </p> */}

          {/* Interactive Tap Hint Badge */}
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#B76E79]/35 bg-white/95 shadow-[0_2px_12px_rgba(183,110,121,0.08)] text-[11px] font-bold uppercase tracking-wider text-[#8E5B61] mt-3"
          >
            <Sparkle size={11} className="text-[#B76E79] fill-[#B76E79]" />
            <span>Tap any event to view ceremony card</span>
          </motion.div>
        </motion.div>

        {/* ── Central Timeline Axis ── */}
        <div className="relative w-full py-4 my-2">
          {/* Top Diamond Terminal Node */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-10 w-2.5 h-2.5 rotate-45 bg-[#8E5B61]" />

          {/* Solid Central Axis Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-[1.5px] bg-[#B76E79]/35 z-0" />

          {/* Bottom Diamond Terminal Node */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-10 w-2.5 h-2.5 rotate-45 bg-[#8E5B61]" />

          {/* Alternating Left & Right Timeline Nodes */}
          <div className="flex flex-col gap-10 relative z-10 py-3">
            {invitation.events.map((event, idx) => {
              const isEven = idx % 2 === 0;
              const IconComponent = EVENT_ICONS[idx % EVENT_ICONS.length];
              const illustrationUrl =
                idx === 0
                  ? "/templates/wedding/karan-weds-bhoomi/ganesh-transparent.png"
                  : EVENT_ILLUSTRATIONS[idx % EVENT_ILLUSTRATIONS.length];

              // Clean day/time string
              const shortDate = event.dateLabel.includes("17th")
                ? "17th Dec"
                : "18th Dec";

              return (
                <motion.div
                  key={event.id || idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative w-full flex items-center group cursor-pointer"
                  onClick={() => setSelectedEventIndex(idx)}
                >
                  {/* Left Side Content */}
                  <div className="w-1/2 pr-3.5 text-right flex flex-col items-end">
                    {isEven ? (
                      <div className="relative flex items-center justify-end gap-2.5 transition-transform group-hover:scale-105">
                        <div className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-3.5 h-[1.5px] bg-[#B76E79]/40" />

                        <div className="flex flex-col items-end">
                          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#8E5B61]">
                            {shortDate} • {event.time.replace(" Onwards", "")}
                          </span>
                          <h4
                            className="font-serif text-xs sm:text-sm font-bold text-[#4A1D24] leading-snug mt-0.5"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {event.title}
                          </h4>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-[#B76E79] mt-0.5 opacity-90 group-hover:opacity-100 flex items-center gap-0.5">
                            Tap to view ➔
                          </span>
                        </div>

                        <div className="w-9 h-9 rounded-full border border-[#B76E79]/30 bg-white/95 flex items-center justify-center text-[#8E5B61] shrink-0 shadow-xs group-hover:bg-[#8E5B61] group-hover:text-white transition-colors overflow-hidden p-1">
                          {idx === 0 ? (
                            <img
                              src="/templates/wedding/karan-weds-bhoomi/ganesh-transparent.png"
                              alt="Lord Ganesha"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <IconComponent size={16} strokeWidth={1.75} />
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Illustration on Left for Odd indexes */
                      <div className="relative flex items-center justify-end pr-1 transition-transform group-hover:scale-110">
                        <img
                          src={illustrationUrl}
                          alt={event.title}
                          className="w-16 sm:w-22 h-auto max-h-16 object-contain mix-blend-multiply opacity-95 drop-shadow-xs"
                        />
                      </div>
                    )}
                  </div>

                  {/* Center Dot Axis Joint */}
                  <div className="relative z-10 shrink-0 w-2.5 h-2.5 rounded-full bg-[#8E5B61] border-2 border-[#FFF5F5] group-hover:scale-150 transition-transform shadow-xs" />

                  {/* Right Side Content */}
                  <div className="w-1/2 pl-3.5 text-left flex flex-col items-start">
                    {!isEven ? (
                      <div className="relative flex items-center justify-start gap-2.5 transition-transform group-hover:scale-105">
                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-3.5 h-[1.5px] bg-[#B76E79]/40" />

                        <div className="w-9 h-9 rounded-full border border-[#B76E79]/30 bg-white/95 flex items-center justify-center text-[#8E5B61] shrink-0 shadow-xs group-hover:bg-[#8E5B61] group-hover:text-white transition-colors">
                          <IconComponent size={16} strokeWidth={1.75} />
                        </div>

                        <div className="flex flex-col items-start">
                          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#8E5B61]">
                            {shortDate} • {event.time.replace(" Onwards", "")}
                          </span>
                          <h4
                            className="font-serif text-xs sm:text-sm font-bold text-[#4A1D24] leading-snug mt-0.5"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {event.title}
                          </h4>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-[#B76E79] mt-0.5 opacity-90 group-hover:opacity-100 flex items-center gap-0.5">
                            Tap to view ➔
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Illustration on Right for Even indexes */
                      <div className="relative flex items-center justify-start pl-1 transition-transform group-hover:scale-110">
                        <img
                          src={illustrationUrl}
                          alt={event.title}
                          className="w-16 sm:w-22 h-auto max-h-16 object-contain mix-blend-multiply opacity-95 drop-shadow-xs"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Royal Wedding Event Card Modal (on Click) ── */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedEventIndex !== null && activeEvent && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md select-none overflow-hidden">
              {/* Backdrop Click to Close */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedEventIndex(null)}
                className="absolute inset-0 z-0"
              />

              {/* Full Event Card in Modal */}
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, scale: 0.9, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 25 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className={`relative z-10 w-full max-w-[370px] sm:max-w-[400px] h-[90vh] max-h-[720px] rounded-3xl border-2 shadow-2xl overflow-hidden flex flex-col justify-between ${isDarkTheme ? "border-[#C5A059]/40 bg-[#250508]" : "border-[#B76E79]/35 bg-[#FFF5F5]"
                  }`}
              >
                {/* ❌ Close Button (Top Right) */}
                <button
                  onClick={() => setSelectedEventIndex(null)}
                  className={`absolute top-3.5 right-3.5 z-40 w-8 h-8 rounded-full border flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer ${isDarkTheme
                    ? "bg-black/60 border-white/30 text-white"
                    : "bg-[#8E5B61] border-white/60 text-white"
                    }`}
                  aria-label="Close event details"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>

                {/* 🎥 Background Video with Full-Card Container */}
                <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden ${isDarkTheme ? "bg-[#250508]" : "bg-[#FFF5F5]"}`}>
                  <LazyEventVideo
                    src={activeEvent.bgVideo}
                    alt={activeEvent.title}
                    priority={true}
                    onLoaded={() => setIsVideoLoaded(true)}
                  />

                  {/* Top gradient strictly confined to upper ~32% (Only Ganeshji / Mandap Muhurat gets white shade; dark theme gets subtle black vignette; others have no top shade) */}
                  {activeEvent.id === "mandap-muhurat" ? (
                    <div className="absolute top-0 inset-x-0 h-[32%] pointer-events-none bg-gradient-to-b from-[#FFF5F5]/85 to-transparent" />
                  ) : isDarkTheme ? (
                    <div className="absolute top-0 inset-x-0 h-[32%] pointer-events-none bg-gradient-to-b from-black/65 via-black/20 to-transparent" />
                  ) : null}

                  {/* Bottom subtle gradient across all cards for rich dark contrast */}
                  <div className="absolute bottom-0 inset-x-0 h-[24%] pointer-events-none bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                </div>

                {/* ── Content Body (Top & Center) ── */}
                <div
                  className={`relative z-10 w-full flex flex-col items-center text-center px-4 overflow-y-auto ${activeEvent.topPadding || (activeEvent.id === "pithi-and-petals" ? "pt-[94px] sm:pt-[98px]" : activeEvent.id === "mangal-parinay" ? "pt-[90px] sm:pt-[105px]" : activeEvent.id === "rings-and-rhythm" ? "pt-[60px] sm:pt-[70px]" : "pt-3.5")
                    }`}
                >
                  {/* Event Title */}
                  <h3
                    className="font-serif text-2xl sm:text-[28px] font-black leading-tight tracking-wide whitespace-pre-line"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: titleColor,
                      textShadow: isDarkTheme
                        ? "0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 18px rgba(0, 0, 0, 0.9)"
                        : "0 1px 3px rgba(255, 255, 255, 0.95), 0 2px 8px rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    {activeEvent.title}
                  </h3>

                  {/* Ceremony Tagline (Right below Main Title) */}
                  {activeEvent.tagline && (
                    <div
                      className={`text-xs sm:text-[13px] font-black leading-snug whitespace-pre-line tracking-wide my-1.5 max-w-[340px] ${isDarkTheme
                        ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                        : "drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]"
                        }`}
                      style={{ color: textColor }}
                    >
                      {activeEvent.tagline.split("\n").map((line, idx) => {
                        if (line.trim().startsWith("#")) {
                          return (
                            <span
                              key={idx}
                              className="inline-flex items-center justify-center mt-1.5 font-black text-xs sm:text-[13.5px] tracking-wider text-white"
                              style={{
                                color: "#FFFFFF",
                                textShadow: "0 2px 6px rgba(0,0,0,0.95)",
                              }}
                            >
                              <span>{line.replace(/Key/g, "").replace(/(∞|♾️|♾)/g, "").trim()}</span>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FF1744"
                                strokeWidth="3.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4.5 h-4.5 sm:w-5 sm:h-5 ml-1 shrink-0 drop-shadow-[0_0_8px_rgba(255,23,68,0.95)]"
                              >
                                <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
                              </svg>
                            </span>
                          );
                        }
                        return (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Date & Time (Clean Transparent Stacked Layout) */}
                  <div
                    className={`flex flex-col items-center justify-center gap-0.5 my-1.5 text-xs font-bold ${isDarkTheme
                      ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                      : "drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]"
                      }`}
                    style={{ color: textColor }}
                  >
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} style={{ color: accentColor }} />
                      <span className="whitespace-pre-line">{activeEvent.dateLabel}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} style={{ color: accentColor }} />
                      <span className="whitespace-pre-line">{activeEvent.time}</span>
                    </span>
                  </div>

                  {/* Venue (Transparent & Bold) */}
                  <div className="mt-1 max-w-[95%] mx-auto">
                    <p
                      className={`text-xs sm:text-[13px] font-black tracking-wide whitespace-pre-line ${isDarkTheme
                        ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                        : "drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]"
                        }`}
                      style={{ color: textColor }}
                    >
                      📍 {activeEvent.venue}
                    </p>
                  </div>

                  {/* Attire (Transparent & Bold) */}
                  {activeEvent.attireTitle && (
                    <div
                      className={`mt-2.5 text-center max-w-[340px] mx-auto px-2 space-y-1 ${isDarkTheme
                        ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                        : "drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]"
                        }`}
                    >
                      <div
                        className="text-xs sm:text-[13px] font-black tracking-wide whitespace-pre-line"
                        style={{ color: textColor }}
                      >
                        <span style={{ color: accentColor }}>Attire:</span>{" "}
                        <span className="font-extrabold">{activeEvent.attireTitle}</span>
                      </div>
                      {activeEvent.attireDetails?.ladies && (
                        <p
                          className="text-[11px] font-bold leading-snug whitespace-pre-line"
                          style={{ color: textColor }}
                        >
                          <span style={{ color: accentColor }} className="font-black">Ladies:</span>{" "}
                          {activeEvent.attireDetails.ladies}
                        </p>
                      )}
                      {activeEvent.attireDetails?.gents && (
                        <p
                          className="text-[11px] font-bold leading-snug whitespace-pre-line"
                          style={{ color: textColor }}
                        >
                          <span style={{ color: accentColor }} className="font-black">Gents:</span>{" "}
                          {activeEvent.attireDetails.gents}
                        </p>
                      )}
                      {activeEvent.attireDetails?.all && (
                        <p
                          className="text-[11px] font-bold leading-snug whitespace-pre-line"
                          style={{ color: textColor }}
                        >
                          {activeEvent.attireDetails.all}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Bottom Carousel Controls (Dark, Crisp & High-Contrast across all cards) ── */}
                <div className="relative z-10 w-full px-4 py-2.5 mt-auto flex items-center justify-between border-t border-white/20 bg-black/85 backdrop-blur-md shadow-[0_-4px_25px_rgba(0,0,0,0.6)]">
                  <button
                    onClick={() =>
                      setSelectedEventIndex((prev) =>
                        prev !== null
                          ? (prev - 1 + invitation.events.length) % invitation.events.length
                          : 0
                      )
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg text-[#ffd97d] hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronLeft size={14} strokeWidth={2.5} />
                    <span>Prev</span>
                  </button>

                  {/* Ceremony Counter & Dots */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#ffd97d] drop-shadow-sm">
                      Ceremony {selectedEventIndex + 1} of {invitation.events.length}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      {invitation.events.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setSelectedEventIndex(dotIdx)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            selectedEventIndex === dotIdx
                              ? "w-5 bg-[#ffd97d] shadow-[0_0_8px_rgba(255,217,125,0.8)]"
                              : "w-1.5 bg-white/40 hover:bg-white/75"
                          }`}
                          aria-label={`Go to event ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedEventIndex((prev) =>
                        prev !== null ? (prev + 1) % invitation.events.length : 0
                      )
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg text-[#ffd97d] hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight size={14} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Loading Spinner until video buffer */}
                <AnimatePresence>
                  {!isVideoLoaded && (
                    <motion.div
                      key="card-loader"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#FFF5F5] p-6 text-center select-none"
                    >
                      <div className="relative w-10 h-10 mb-2.5 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-[#B76E79]/20" />
                        <div className="absolute inset-0 rounded-full border-2 border-t-[#B76E79] border-r-[#B76E79] animate-spin" />
                        <Sparkles className="w-3.5 h-3.5 text-[#B76E79] animate-pulse" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8E5B61] animate-pulse">
                        Loading {activeEvent.title}...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
