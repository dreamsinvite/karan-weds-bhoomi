"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    </section>
  );
}
