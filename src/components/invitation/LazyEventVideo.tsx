"use client";

import { useEffect, useRef, useState } from "react";

interface LazyEventVideoProps {
  src?: string;
  poster?: string;
  alt?: string;
  className?: string;
  onLoaded?: () => void;
  priority?: boolean;
}

export function LazyEventVideo({
  src,
  className = "",
  onLoaded,
  priority = false,
}: LazyEventVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(priority);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          setShouldLoad(true); // Buffer video 600px ahead
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          setInView(false);
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      {
        rootMargin: "600px 0px 600px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleVideoReady = () => {
    setIsVideoLoaded(true);
    if (onLoaded) {
      onLoaded();
    }
  };

  useEffect(() => {
    if (inView && videoRef.current && isVideoLoaded) {
      videoRef.current.play().catch(() => {});
    }
  }, [inView, isVideoLoaded]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#FFF5F5]">
      {/* Strictly Lazy-Loaded Video with zero outside image fallbacks */}
      {src && shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onPlaying={handleVideoReady}
          onError={handleVideoReady}
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-opacity duration-700 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      )}
    </div>
  );
}
