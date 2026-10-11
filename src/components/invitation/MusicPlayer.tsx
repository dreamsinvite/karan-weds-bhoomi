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

    // Audio plays automatically in the background; UI toggle icon is hidden as requested
    return null;
  }
);
