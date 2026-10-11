"use client";

import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2 } from "lucide-react";

const MUSIC_URL = "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/RadhaNeShyam.mp3";

export interface MusicPlayerHandle {
  playMusic: () => void;
  pauseMusic: () => void;
}

interface MusicPlayerProps {
  isOpened?: boolean;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  function MusicPlayer({ isOpened = false }: MusicPlayerProps, ref) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playAttemptRef = useRef<NodeJS.Timeout | null>(null);
    const wasPlayingBeforeHide = useRef(false);
    const isPlayingRef = useRef(false);

    useEffect(() => {
      isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    const playMusic = useCallback(() => {
      if (!audioRef.current) {
        const audio = new Audio(MUSIC_URL);
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = 0.55;
        audioRef.current = audio;
      }
      const audio = audioRef.current;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsManuallyPaused(false);
        })
        .catch((err) => {
          console.warn("[MusicPlayer] Play failed:", err);
        });
    }, []);

    const pauseMusic = useCallback(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      setIsPlaying(false);
      setIsManuallyPaused(true);
    }, []);

    useImperativeHandle(ref, () => ({
      playMusic,
      pauseMusic,
    }));

    useEffect(() => {
      const handleVisibilityChange = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (document.visibilityState === "hidden") {
          wasPlayingBeforeHide.current = isPlayingRef.current;
          if (isPlayingRef.current) {
            audio.pause();
            setIsPlaying(false);
          }
        } else if (document.visibilityState === "visible") {
          if (wasPlayingBeforeHide.current && !isManuallyPaused) {
            audio
              .play()
              .then(() => setIsPlaying(true))
              .catch((e) => console.error("Resume failed:", e));
          }
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isManuallyPaused]);

    useEffect(() => {
      if (!audioRef.current) {
        const audio = new Audio(MUSIC_URL);
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = 0.55;
        audioRef.current = audio;
      }

      const audio = audioRef.current;

      const handleInteraction = () => {
        if (!audio || isPlaying || isManuallyPaused) return;

        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            cleanup();
          })
          .catch(() => {});
      };

      const cleanup = () => {
        window.removeEventListener("click", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
      };

      window.addEventListener("click", handleInteraction);
      window.addEventListener("touchstart", handleInteraction);

      return () => {
        cleanup();
        if (playAttemptRef.current) clearInterval(playAttemptRef.current);
      };
    }, [isPlaying, isManuallyPaused]);

    const toggleMusic = (e: React.MouseEvent) => {
      e.stopPropagation();
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setIsManuallyPaused(true);
      } else {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsManuallyPaused(false);
          })
          .catch((err) => console.error("Toggle play failed:", err));
      }
    };

    if (!isOpened) return null;

  return (
    <motion.button
      onClick={toggleMusic}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 right-5 z-[99] group cursor-pointer focus:outline-none select-none"
    >
      <AnimatePresence>
        {isPlaying && (
          <>
            <motion.span
              key="pulse1"
              className="absolute inset-0 rounded-full bg-[#B76E79]/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              key="pulse2"
              className="absolute inset-0 rounded-full bg-[#B76E79]/25"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
            />
          </>
        )}
      </AnimatePresence>

      <span className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#B76E79] to-[#8E5B61] text-white shadow-[0_8px_25px_rgba(142,91,97,0.35)] border border-white/20 transition-transform group-hover:scale-105">
        <AnimatePresence mode="wait" initial={false}>
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Music className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Music2 className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
});
