"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Gift, Heart, Sparkles, Navigation, Users, Shirt, ChevronDown } from "lucide-react";
import "./styles.css";

import { Hero } from "./invitation/Hero";
import { IntroVideoPlayer, type IntroVideoPlayerHandle } from "./invitation/IntroVideoPlayer";
import { EnvelopeOpener } from "./invitation/EnvelopeOpener";
import { invitation } from "./invitation/data";
import { LazyEventVideo } from "./invitation/LazyEventVideo";
import { EventCard } from "./invitation/EventCard";
import { TimelineSection } from "./invitation/TimelineSection";
import { VenueSection } from "./invitation/VenueSection";

import leaf from "@/assets/leaf.png";
import { ScratchToReveal } from "./invitation/ScratchToReveal";
import gardenBg from "@/assets/garden-bg.png";

import { Gallery } from "./invitation/Gallery";
import RSVPSection from "./RSVPSection";
import { MusicPlayer, type MusicPlayerHandle } from "./invitation/MusicPlayer";
import { RainBackground } from "./invitation/RainBackground";

const VIDEO_ASSETS = {
  introGate: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/bhoomi-weds-karan-start__1_.mp4",
  heroSection: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/karan-weds-bhoomi-hero__1_.mp4",
};

interface MainProps {
  eventIds?: string[];
  showRSVP?: boolean;
  introVideoUrl?: string;
}

export default function Main({
  eventIds,
  showRSVP = true,
  introVideoUrl: customIntroVideoUrl,
}: MainProps = {}) {
  const [mounted, setMounted] = useState(false);
  const [cardOpened, setCardOpened] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [introVideoUrl, setIntroVideoUrl] = useState<string>(
    customIntroVideoUrl || VIDEO_ASSETS.introGate
  );
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>(VIDEO_ASSETS.heroSection);

  const introReadyRef = useRef(false);
  const heroReadyRef = useRef(false);
  const [isIntroVideoReady, setIsIntroVideoReady] = useState(false);
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);

  const introContainerRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<IntroVideoPlayerHandle>(null);
  const musicPlayerRef = useRef<MusicPlayerHandle | null>(null);

  const [showScrollDown, setShowScrollDown] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!introFinished) {
      setShowScrollDown(false);
      return;
    }

    setShowScrollDown(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide scroll down icon when footer comes into view
        setShowScrollDown(!entry.isIntersecting);
      },
      { threshold: 0.08 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [introFinished]);

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  const handleIntroCanPlay = () => {
    if (!introReadyRef.current) {
      introReadyRef.current = true;
      setIsIntroVideoReady(true);
      setIsPreloading(false);
      console.log("[Main] Intro video DOM element ready!");
    }
  };

  const handleHeroCanPlay = () => {
    if (!heroReadyRef.current) {
      heroReadyRef.current = true;
      setIsHeroVideoReady(true);
      console.log("[Main] Hero video DOM element ready!");
    }
  };

  useEffect(() => {
    setMounted(true);
    const img = new globalThis.Image();
    img.src = leaf.src;
    img.onload = img.onerror = () => setImagesLoaded(true);

    let heroPreloadEl: HTMLVideoElement | null = null;

    try {
      heroPreloadEl = document.createElement("video");
      heroPreloadEl.src = VIDEO_ASSETS.heroSection;
      heroPreloadEl.preload = "auto";
      heroPreloadEl.muted = true;
      heroPreloadEl.playsInline = true;
      heroPreloadEl.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none";
      document.body.appendChild(heroPreloadEl);

      const onHeroReady = () => {
        heroReadyRef.current = true;
        setIsHeroVideoReady(true);
        console.log("[Preloader] Hero Video buffered & ready via hidden element!");
      };
      heroPreloadEl.addEventListener("canplaythrough", onHeroReady, { once: true });
      heroPreloadEl.addEventListener("canplay", onHeroReady, { once: true });

      heroPreloadEl.load();
      heroPreloadEl.play().then(() => heroPreloadEl?.pause()).catch(() => { });
    } catch (e) {
      console.warn("[Preloader] Hero preload element failed:", e);
      heroReadyRef.current = true;
      setIsHeroVideoReady(true);
    }

    const safetyTimer = setTimeout(() => {
      introReadyRef.current = true;
      setIsPreloading(false);
    }, 1500);

    return () => {
      clearTimeout(safetyTimer);
      if (heroPreloadEl && document.body.contains(heroPreloadEl)) {
        document.body.removeChild(heroPreloadEl);
      }
    };
  }, []);

  const handleIntroEnd = useCallback(() => {
    const el = introContainerRef.current;
    if (el) {
      el.style.transition = "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";

      setTimeout(() => {
        el.style.display = "none";
        setIntroFinished(true);
      }, 800);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!introFinished) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mounted, introFinished]);

  return (
    <div className="relative min-h-screen w-full bg-[#FFF5F5] flex justify-center selection:bg-[#B76E79]/20 selection:text-[#8E5B61]">
      <style dangerouslySetInnerHTML={{
        __html: `
        html, body {
          scroll-behavior: smooth !important;
        }
      `}} />

      {/* Desktop background raining animation */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden sm:block">
        <RainBackground />
      </div>

      {/* Centered Mobile Viewport Column */}
      <main
        className={`relative w-full max-w-[430px] ${!introFinished ? "h-screen h-[100dvh] overflow-hidden" : "min-h-screen"
          } bg-[#FFF5F5] text-[#4A4A4A] shadow-[0_0_50px_rgba(183,110,121,0.06)] sm:border-x sm:border-[#B76E79]/20 overflow-x-hidden z-10 flex flex-col`}
      >

        {/* Stage 0: Royal Door Opener */}
        {mounted && (
          <AnimatePresence>
            {!cardOpened && (
              <EnvelopeOpener
                groomName={invitation.groom.short}
                brideName={invitation.bride.short}
                dateLabel={invitation.couple.dateRange}
                onOpen={() => setCardOpened(true)}
                onOpenStart={() => {
                  introVideoRef.current?.startPlayback();
                  musicPlayerRef.current?.playMusic();
                }}
                isReady={true}
              />
            )}
          </AnimatePresence>
        )}

        {/* Stage 1: Intro Cinematic — mounts directly behind royal doors with zero pink screen */}
        {mounted && (
          <div
            ref={introContainerRef}
            className="absolute inset-0 w-full h-full z-[120]"
            style={{
              display: introFinished ? "none" : undefined,
            }}
          >
            <IntroVideoPlayer
              ref={introVideoRef}
              key="intro-cinematic"
              videoSrc={introVideoUrl}
              onEnded={handleIntroEnd}
              onSkip={handleIntroEnd}
              onCanPlay={handleIntroCanPlay}
              autoStart={false}
            />
          </div>
        )}

        {/* Stage 2: The Main Scrolling Invitation sections */}
        {mounted && (
          <div
            className={`relative z-10 w-full ${!introFinished ? "h-[100vh] overflow-hidden pointer-events-none" : ""}`}
          >
            {/* Background Music Player */}
            <MusicPlayer ref={musicPlayerRef} isOpened={introFinished} />

            {/* Sticky Scroll Down Indicator until Footer */}
            <AnimatePresence>
              {introFinished && showScrollDown && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleScrollDown}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer active:scale-90 transition-transform select-none"
                  title="Scroll down"
                  aria-label="Scroll down"
                >
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center border border-white/40 text-white shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:bg-black/60 transition-colors"
                  >
                    <ChevronDown size={22} strokeWidth={2.5} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ambient mobile background particle rain */}
            {introFinished && (
              <div className="fixed inset-y-0 w-full max-w-[430px] pointer-events-none z-0 left-1/2 -translate-x-1/2">
                <RainBackground />
              </div>
            )}

            {/* 1. Hero */}
            <div className="w-full relative">
              <Hero introFinished={introFinished} videoSrc={heroVideoUrl} onCanPlay={handleHeroCanPlay} />
            </div>

            {/* 2. Couple Section (Meet the Couple - nitin-weds-rita design) */}


            {/* 3. Story Section (How We Met - Hidden) */}
            {/* <section
              className="relative z-10 py-20 px-6 bg-[#fdfaf5]/85 backdrop-blur-[1px] overflow-hidden border-t border-b border-[#ebd8c3]/40"
              style={{
                backgroundImage: `linear-gradient(rgba(253, 250, 245, 0.88), rgba(253, 250, 245, 0.92)), url(/templates/wedding/nitin-weds-rita/story-floral-bg.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full relative z-10">
                <div className="text-center mb-12">
                  <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#b45309]">
                    Our Journey
                  </span>
                  <h2 className="font-serif italic text-4xl mt-2 text-[#6b4f2c]">How We Met</h2>
                </div>

                <div className="flex flex-col gap-4 py-2">
                  {(invitation.story || []).map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="relative w-full"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.12 }}
                    >
                      <div className="w-full p-5 rounded-2xl border border-[#ebd8c3]/90 bg-[#fdfbf9]/95 shadow-[0_6px_20px_rgba(139,115,85,0.05)] backdrop-blur-md relative overflow-hidden group hover:border-[#b45309]/40 transition-colors">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#b45309] to-transparent" />
                        <span className="block font-serif italic text-2xl text-[#b45309] font-medium tracking-wide mb-1">
                          {item.year}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#6b4f2c] mb-1">{item.title}</h4>
                        <p className="text-xs text-[#5c3d1e] leading-relaxed font-light">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section> */}

            {/* 4. Countdown Timer */}
            <section
              className="relative z-10 py-20 px-6 text-center border-t border-b border-[#B76E79]/20 overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 245, 245, 0.92), rgba(255, 245, 245, 0.96)), url(${gardenBg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="max-w-2xl mx-auto relative z-10">
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#B76E79]">
                  Join The Celebration
                </span>
                <h3 className="font-serif italic text-3xl mt-2 mb-8 text-[#8E5B61]">Counting Down The Moments</h3>

                <div className="mb-4 flex justify-center w-full">
                  <ScratchToReveal
                    width={320}
                    height={230}
                    revealContent={
                      <div className="flex flex-col items-center justify-center w-full h-full p-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B76E79] mb-1">
                          Auspicious Wedding Day
                        </span>
                        <h4 className="font-serif italic text-2xl text-[#8E5B61] font-bold leading-tight mb-1">
                          {invitation.weddingDateLabel}
                        </h4>
                        <span className="text-[9px] font-bold text-[#7A6568] tracking-widest uppercase mb-4">
                          Discover Resorts, Karjat
                        </span>

                        <div className="w-full border-t border-[#B76E79]/20 pt-3 flex justify-center">
                          <CountdownTimer date={invitation.weddingDate} />
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </section>

            {/* 5. Wedding Functions & Schedule (The fun unfolds as follows - Interactive Timeline) */}
            <TimelineSection eventIds={eventIds} />

            {/* 6. Wedding Venue & Interactive Location Map */}
            <VenueSection />

            {/* 7. With Best Compliments From */}
            <section
              className="relative z-10 py-16 px-6 bg-[#FFF5F5]/95 backdrop-blur-[1px] text-center border-t border-[#B76E79]/20 overflow-hidden"
            >
              <div className="w-full relative z-10">
                <h3 className="font-serif italic text-3xl mb-6 text-[#8E5B61]">
                  {invitation.groom.compliments.from ? "With Best Compliments from" : "With Best Compliments"}
                </h3>

                <div className="p-6 sm:p-8 rounded-3xl border border-[#B76E79]/20 bg-white/95 shadow-[0_10px_30px_rgba(183,110,121,0.06)] text-center max-w-[390px] mx-auto">
                  {/* From Family Names (if provided) */}
                  {invitation.groom.compliments.from && (
                    <>
                      <div className="font-serif italic text-[14px] sm:text-[15.5px] font-bold text-[#8E5B61] leading-snug space-y-1">
                        {invitation.groom.compliments.from.split("\n").map((line, i) => {
                          const trimmed = line.trim();
                          if (trimmed === "&") {
                            return (
                              <p key={i} className="text-sm sm:text-base text-[#C5A059] font-serif font-bold my-0.5">
                                &amp;
                              </p>
                            );
                          }
                          return (
                            <p key={i} className="whitespace-nowrap">
                              {trimmed}
                            </p>
                          );
                        })}
                      </div>

                      <div className="w-16 h-[1px] bg-[#C5A059]/40 mx-auto my-4" />
                    </>
                  )}

                  <p className="text-xs sm:text-sm text-[#8E5B61]/90 font-serif italic leading-relaxed px-2 whitespace-pre-line">
                    &ldquo;{invitation.groom.compliments.note}&rdquo;
                  </p>

                  {invitation.groom.compliments.closing && (
                    <p className="text-xs sm:text-sm text-[#8E5B61] font-semibold mt-4">
                      {invitation.groom.compliments.closing}
                    </p>
                  )}

                  {"withLove" in invitation.groom.compliments && invitation.groom.compliments.withLove && (
                    <div className="mt-4 space-y-1">
                      {invitation.groom.compliments.withLove.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className={`font-serif italic ${i === 0
                              ? "text-sm sm:text-base text-[#8E5B61] font-semibold"
                              : "text-base sm:text-lg text-[#8E5B61] font-bold"
                            }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  )}

                  {invitation.groom.compliments.noteBlessings && (
                    <div className="mt-5 inline-block px-5 py-1.5 rounded-full bg-[#FFF0F0] border border-[#B76E79]/30 text-xs font-bold uppercase tracking-widest text-[#8E5B61] shadow-2xs">
                      {invitation.groom.compliments.noteBlessings}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Photo Gallery Section (Our Love Gallery) */}
            {/* <Gallery /> */}

            {/* Dynamic Guest RSVP Section */}
            {showRSVP && <RSVPSection allowAadhaar={true} />}

            {/* 7. Gift & Wishing Well Section (Hidden) */}
            {/* <section
              className="relative z-10 py-20 px-6 bg-[#fcf7ef]/85 backdrop-blur-[1px] text-center border-t border-[#ebd8c3] overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(253, 250, 245, 0.85), rgba(253, 250, 245, 0.90)), url(/templates/wedding/nitin-weds-rita/registry-floral-bg.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full relative z-10 pt-4">
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#b45309]">Wishing Well</span>
                <h2 className="font-serif italic text-3xl sm:text-4xl mt-2 mb-4 text-[#6b4f2c] font-medium">Registry &amp; Gifts</h2>
                <p className="text-sm text-[#5c3d1e] leading-relaxed font-light px-4 mb-8">
                  Your blessings and presence on our special day are the greatest gift of all. Should you wish to bless us, a contribution towards our beginning together would be warmly appreciated.
                </p>

                <AnimatePresence mode="wait">
                  {!isGiftOpened ? (
                    <motion.div
                      key="gift-closed"
                      className="flex flex-col w-full justify-center items-center cursor-pointer group"
                      onClick={() => setIsGiftOpened(true)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.img
                        src="/templates/wedding/nitin-weds-rita/gift-box.png"
                        alt="Gift Box"
                        className="w-48 h-48 sm:w-56 sm:h-56 object-contain mix-blend-multiply drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <p className="text-xs uppercase tracking-[0.3em] text-[#b45309] mt-4 font-bold animate-pulse">
                        Tap to Open
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gift-opened"
                      className="p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgba(107,79,44,0.15)] flex flex-col gap-2 w-full mx-auto relative overflow-hidden border border-[#c9953a]/30 bg-[#8a6528]"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    >
                      <img
                        src="/templates/wedding/nitin-weds-rita/gift-bg.png"
                        alt=""
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145%] h-[145%] max-w-none object-cover z-0 pointer-events-none opacity-90"
                      />

                      <div className="absolute inset-0 bg-[#2b180d]/40 z-0 pointer-events-none" />

                      <div className="relative z-10 flex flex-col gap-1.5 items-center text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ebd8c3]">Digital Wishes Box</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#fdfaf5] mt-1">Bank Account Transfer</span>
                        <p className="text-xl font-serif italic mt-3 text-white drop-shadow-sm">
                          Karan Sundrani &amp; Bhoomi Rokhana
                        </p>
                        <p className="text-sm font-semibold text-white/95 tracking-wide mt-1">Account No: 1098 7654 3210</p>
                        <p className="text-[11px] tracking-widest text-[#ebd8c3] uppercase font-bold mt-1">IFSC: HDFC0000109</p>

                        <button
                          onClick={(e) => { e.stopPropagation(); setIsGiftOpened(false); }}
                          className="mt-6 px-5 py-2.5 rounded-lg border border-white/30 text-[10px] uppercase tracking-widest text-white hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer"
                        >
                          Close Box
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section> */}

            {/* 8. Elegant Footer / Closing */}
            <section
              ref={footerRef}
              className="relative z-10 w-full min-h-[680px] sm:min-h-[720px] flex flex-col justify-between text-center overflow-hidden border-t border-[#B76E79]/20"
              style={{
                backgroundImage: `url("https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/footer.png")`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Top Text Content (Centered in the open sunset sky) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[340px] mx-auto pt-28 sm:pt-40 px-4 flex flex-col items-center"
              >
                {/* Sacred Mantra */}
                <div className="text-[#b91c1c] text-xs sm:text-sm font-bold tracking-widest mb-3 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center gap-2">
                  <SwastikIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5 shrink-0" />
                  <span>|| Shree Ganeshaya Namah ||</span>
                  <SwastikIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5 shrink-0" />
                </div>

                <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#8E5B61] block drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                  With Gratitude &amp; Love
                </span>

                <h2
                  className="mt-1 font-display italic text-3xl sm:text-4xl text-[#5C1D26] drop-shadow-[0_2px_6px_rgba(255,255,255,0.9)]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Thank You
                </h2>

                <div className="w-20 h-[1.5px] bg-[#C5A059]/50 mx-auto my-3" />

                <p className="text-[#4A2027] font-serif italic text-xs sm:text-[13px] leading-relaxed drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                  It is our greatest honor to welcome you to our wedding celebrations at Discover Resorts, Karjat. We look forward to celebrating each moment with your blessings and love!
                </p>

                <div
                  className="flex flex-col items-center font-serif italic text-2xl sm:text-3xl text-[#5C1D26] font-bold mt-4 drop-shadow-[0_2px_6px_rgba(255,255,255,0.9)]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span>Karan</span>
                  <span className="text-lg sm:text-xl text-[#C5A059] font-normal my-0.5">&amp;</span>
                  <span>Bhoomi</span>
                </div>

                <div className="mt-1 text-[11px] font-bold tracking-widest text-[#8E5B61] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                  #BKomeOne∞
                </div>
              </motion.div>

              {/* Bottom Details Pill */}
              <div className="relative z-10 w-full px-4 pb-4 pt-6 mt-auto">
                <div className="bg-white/75 backdrop-blur-xs border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-2xl py-2.5 px-3 max-w-[340px] mx-auto flex flex-col items-center">
                  {/* <p className="text-[#5C1D26] text-[11px] tracking-wider font-medium mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                    Discover Resorts, Karjat • 17th &amp; 18th December 2026
                  </p> */}
                  <p className="text-[#8E5B61] text-[9px] uppercase tracking-[0.25em] font-bold">
                    Made with ❤️ by Dreams Invite
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function CountdownTimer({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(date).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Object.entries(timeLeft).map(([label, val]) => (
        <div key={label} className="flex flex-col items-center bg-[#FFF0F0] rounded-xl px-2.5 py-1.5 min-w-[58px] sm:min-w-[65px] border border-[#B76E79]/25 shadow-xs">
          <span className="font-serif text-lg sm:text-2xl text-[#8E5B61] font-bold leading-none">{val}</span>
          <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-[#B76E79] mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function SwastikIcon({ className = "w-4.5 h-4.5 inline-block shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      aria-hidden="true"
    >
      {/* 4 Connected Arms of the Swastika */}
      <path
        d="M 14 14 L 14 50 L 86 50 L 86 86"
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 14 86 L 50 86 L 50 14 L 86 14"
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 4 Sacred Dots (Bindus) in each quadrant */}
      <circle cx="31" cy="31" r="5.5" stroke="none" />
      <circle cx="69" cy="31" r="5.5" stroke="none" />
      <circle cx="31" cy="69" r="5.5" stroke="none" />
      <circle cx="69" cy="69" r="5.5" stroke="none" />
    </svg>
  );
}

