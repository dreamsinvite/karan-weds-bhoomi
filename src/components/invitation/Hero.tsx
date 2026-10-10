"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero({
  introFinished = true,
  videoSrc,
  onCanPlay,
}: {
  introFinished?: boolean;
  videoSrc?: string;
  onCanPlay?: () => void;
}) {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden select-none bg-[#FFF5F5]">
      {/* Background Video */}
      <motion.div className="absolute inset-0 w-full h-full z-0">
        <video
          src={
            videoSrc ||
            "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/karan-weds-bhoomi-hero__1_.mp4"
          }
          autoPlay
          loop
          muted={true}
          playsInline={true}
          onCanPlay={() => {
            setVideoReady(true);
            if (onCanPlay) onCanPlay();
          }}
          className="w-full h-full object-cover transition-opacity duration-700 absolute inset-0"
          style={{ objectPosition: "center", opacity: videoReady ? 1 : 0 }}
        />
      </motion.div>

      {/* Subtle bottom fade to blend with the next section */}
      <div className="absolute inset-x-0 bottom-0 h-20 z-[1] pointer-events-none bg-gradient-to-t from-[#FFF5F5] via-[#FFF5F5]/20 to-transparent" />

      {/* Interactive Scroll Down Indicator (No text over video) */}
      {introFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onClick={() => {
            const nextSec = document.getElementById("couple-section");
            if (nextSec) {
              nextSec.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer active:scale-95 transition-all select-none"
          title="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-9 h-9 rounded-full bg-black/25 backdrop-blur-xs flex items-center justify-center border border-white/30 text-white shadow-md hover:bg-black/40 transition-colors"
          >
            <ChevronDown size={20} strokeWidth={2.5} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
