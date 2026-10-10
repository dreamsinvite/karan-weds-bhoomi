"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { LazyEventVideo } from "./LazyEventVideo";
import { type WeddingEvent, invitation } from "./data";

interface EventCardProps {
  event: WeddingEvent;
  idx: number;
}

export function EventCard({ event, idx }: EventCardProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const isDarkTheme =
    event.theme === "dark" ||
    event.id === "rings-and-rhythm" ||
    event.id === "mangal-parinay";

  const titleColor =
    event.titleColor || (isDarkTheme ? "#FFFDF5" : "#4A1D24");
  const textColor =
    event.textColor || (isDarkTheme ? "#FFFDF5" : "#4A1D24");
  const accentColor =
    event.accentColor || (isDarkTheme ? "#FCD34D" : "#8E5B61");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className={`w-full min-h-[640px] rounded-3xl border-2 shadow-[0_15px_40px_rgba(183,110,121,0.1)] overflow-hidden relative flex flex-col justify-start pt-3.5 px-4 pb-4 text-center group ${isDarkTheme ? "border-[#C5A059]/40 bg-[#250508]" : "border-[#B76E79]/30 bg-[#FFF5F5]"
        }`}
    >
      {/* Background Media — Only the event video, zero extraneous images */}
      <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden ${isDarkTheme ? "bg-[#250508]" : "bg-[#FFF5F5]"}`}>
        <LazyEventVideo
          src={event.bgVideo}
          alt={event.title}
          onLoaded={() => setIsVideoLoaded(true)}
          className="transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Top gradient strictly confined to upper ~32% (Only Ganeshji / Mandap Muhurat gets white shade; dark theme gets subtle black vignette; others have no top shade) */}
        {event.id === "mandap-muhurat" ? (
          <div className="absolute top-0 inset-x-0 h-[32%] pointer-events-none bg-gradient-to-b from-[#FFF5F5]/85 to-transparent" />
        ) : isDarkTheme ? (
          <div className="absolute top-0 inset-x-0 h-[32%] pointer-events-none bg-gradient-to-b from-black/65 via-black/20 to-transparent" />
        ) : null}
      </div>

      {/* Content Body - Event Info & Navigation */}
      <div
        className={`relative z-10 w-full flex flex-col items-center text-center ${event.topPadding || (event.id === "pithi-and-petals" ? "pt-[94px] sm:pt-[98px]" : event.id === "mangal-parinay" ? "pt-[90px] sm:pt-[105px]" : event.id === "rings-and-rhythm" ? "pt-[60px] sm:pt-[70px]" : "")
          }`}
      >
        {/* Event Title - Bold, High Contrast */}
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
          {event.title}
        </h3>

        {/* Ceremony Tagline (Right below Main Title) */}
        {event.tagline && (
          <div
            className={`text-xs sm:text-[13px] font-black leading-snug whitespace-pre-line tracking-wide my-1.5 max-w-[320px] ${isDarkTheme
              ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
              : "drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]"
              }`}
            style={{ color: textColor }}
          >
            {event.tagline.split("\n").map((line, idx) => {
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
          className={`flex flex-col items-center justify-center gap-0.5 my-1 text-xs font-bold ${isDarkTheme
            ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
            : "drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]"
            }`}
          style={{ color: textColor }}
        >
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} style={{ color: accentColor }} />
            <span className="whitespace-pre-line">{event.dateLabel}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} style={{ color: accentColor }} />
            <span className="whitespace-pre-line">{event.time}</span>
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
            📍 {event.venue}
          </p>
        </div>

        {/* Attire (Transparent & Bold) */}
        {event.attireTitle && (
          <div
            className={`mt-2 text-center max-w-[320px] mx-auto px-2 space-y-1 ${isDarkTheme
              ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
              : "drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]"
              }`}
          >
            <div
              className="text-xs font-black tracking-wide whitespace-pre-line"
              style={{ color: textColor }}
            >
              <span style={{ color: accentColor }}>Attire:</span>{" "}
              <span className="font-extrabold">{event.attireTitle}</span>
            </div>
            {event.attireDetails?.ladies && (
              <p
                className="text-[10.5px] font-bold leading-snug whitespace-pre-line"
                style={{ color: textColor }}
              >
                <span style={{ color: accentColor }} className="font-black">Ladies:</span>{" "}
                {event.attireDetails.ladies}
              </p>
            )}
            {event.attireDetails?.gents && (
              <p
                className="text-[10.5px] font-bold leading-snug whitespace-pre-line"
                style={{ color: textColor }}
              >
                <span style={{ color: accentColor }} className="font-black">Gents:</span>{" "}
                {event.attireDetails.gents}
              </p>
            )}
            {event.attireDetails?.all && (
              <p
                className="text-[10.5px] font-bold leading-snug whitespace-pre-line"
                style={{ color: textColor }}
              >
                {event.attireDetails.all}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Whole-Card Loading Overlay until video is completely buffered and ready */}
      <AnimatePresence>
        {!isVideoLoaded && (
          <motion.div
            key="card-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#FFF5F5] p-6 text-center select-none"
          >
            <div className="relative w-12 h-12 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#B76E79]/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-[#B76E79] border-r-[#B76E79] animate-spin" />
              <Sparkles className="w-4 h-4 text-[#B76E79] animate-pulse" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8E5B61] animate-pulse">
              Loading {event.title}...
            </span>
            <span className="text-[9px] font-medium tracking-widest text-[#B76E79]/70 mt-1 uppercase">
              Buffering Ceremony
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
