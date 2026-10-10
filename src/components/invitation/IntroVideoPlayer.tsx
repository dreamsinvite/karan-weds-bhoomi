"use client";

import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";

export interface IntroVideoPlayerHandle {
  startPlayback: () => void;
}

interface IntroVideoPlayerProps {
  onEnded: () => void;
  onSkip: () => void;
  videoSrc?: string;
  onCanPlay?: () => void;
  autoStart?: boolean;
}

export const IntroVideoPlayer = forwardRef<IntroVideoPlayerHandle, IntroVideoPlayerProps>(
  function IntroVideoPlayer(
    { onEnded, onSkip, videoSrc, onCanPlay, autoStart = false },
    ref
  ) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlayingActive, setIsPlayingActive] = useState(false);
    const safetyTimerRef = useRef<any>(null);
    const hasEndedRef = useRef(false);
    const videoDurationRef = useRef(6.0);

    const triggerEnded = useCallback(() => {
      if (hasEndedRef.current) return;
      hasEndedRef.current = true;
      console.log("[IntroVideoPlayer] Video ended — transitioning to main invitation...");
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      onEnded();
    }, [onEnded]);

    useEffect(() => {
      return () => {
        if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      };
    }, []);

    const startPlayback = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;

      // Reset video strictly to beginning 0s
      try {
        video.currentTime = 0;
      } catch (e) {
        console.warn("Could not reset currentTime:", e);
      }

      // Prime hero background video
      setTimeout(() => {
        document.querySelectorAll("video").forEach((v) => {
          if (v !== video) v.play().catch(() => {});
        });
      }, 100);

      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasStarted(true);
            setIsPlayingActive(true);
          })
          .catch((err) => {
            console.warn("[IntroVideoPlayer] Unmuted autoplay restricted, retrying muted:", err);
            video.muted = true;
            video
              .play()
              .then(() => {
                setHasStarted(true);
                setIsPlayingActive(true);
              })
              .catch((e) => {
                console.error("[IntroVideoPlayer] Video play failed:", e);
                triggerEnded();
              });
          });
      }

      // Fallback timer: only trigger AFTER full video duration + 1.2s buffer
      const dur = videoDurationRef.current || 6.0;
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(triggerEnded, (dur + 1.2) * 1000);
    }, [triggerEnded]);

    useImperativeHandle(ref, () => ({
      startPlayback,
    }));

    // Handle autoStart changes if triggered via prop
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (!autoStart) {
        return;
      }

      startPlayback();
    }, [autoStart, startPlayback]);

    return (
      <div className="absolute inset-0 z-[120] w-full h-full overflow-hidden flex items-center justify-center select-none bg-black">
        {/* Intro video — strictly plays behind opening doors with zero pink screen */}
        <video
          ref={videoRef}
          src={
            videoSrc ||
            "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/bhoomi-weds-karan-start__1_.mp4"
          }
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
          muted={false}
          playsInline={true}
          preload="auto"
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (d && isFinite(d) && d > 0) {
              videoDurationRef.current = d;
              if (safetyTimerRef.current) {
                clearTimeout(safetyTimerRef.current);
                safetyTimerRef.current = setTimeout(triggerEnded, (d + 2.0) * 1000);
              }
            }
          }}
          onCanPlay={() => {
            setIsLoaded(true);
            if (onCanPlay) onCanPlay();
            const video = videoRef.current;
            if (!video) return;

            if (autoStart && !hasStarted) {
              startPlayback();
            }
          }}
          onPlaying={() => setIsPlayingActive(true)}
          onEnded={triggerEnded}
          onError={triggerEnded}
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            if (video.currentTime > 0.05) {
              setIsPlayingActive(true);
            }
          }}
        />
      </div>
    );
  }
);
