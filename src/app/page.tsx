"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full bg-[#FFF5F5] flex justify-center items-center overflow-hidden selection:bg-[#B76E79]/20 selection:text-[#8E5B61]">
      {/* Delicate background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_rgba(183,110,121,0.12)_0%,_transparent_70%)]" />

      {/* Decorative gradient accents */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#B76E79]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#B76E79]/5 to-transparent pointer-events-none" />

      {/* Centered Mobile Column */}
      <main className="relative w-full max-w-[430px] min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12 text-center z-10">
        {/* Subtle decorative eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]" />
          <span className="text-xs text-[#C5A059]">✦</span>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#B76E79]">
            #BKomeOne∞
          </span>
          <span className="text-xs text-[#C5A059]">✦</span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]" />
        </motion.div>

        {/* Couple Illustrated Monogram Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex justify-center my-2"
        >
          {/* Subtle warm glow behind logo */}
          <div className="absolute inset-0 bg-[#B76E79]/10 rounded-full blur-2xl transform scale-90 pointer-events-none" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Bhoomi & Karan"
            className="relative z-10 w-[270px] sm:w-[310px] max-w-[82vw] h-auto drop-shadow-[0_12px_28px_rgba(183,110,121,0.18)]"
          />
        </motion.div>

        {/* Elegant Gold Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-2 my-6"
        >
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/60" />
          <span className="text-xs text-[#C5A059]">✦</span>
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/60" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-2"
        >
          <h1
            className="font-serif italic text-2xl sm:text-[26px] text-[#8E5B61] font-semibold leading-snug tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Please use the Link<br />
            Provided to see the<br />
            Invitation
          </h1>
        </motion.div>
      </main>
    </div>
  );
}
