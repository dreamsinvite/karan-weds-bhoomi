"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Sparkles } from "lucide-react";
import { invitation } from "./data";

export function VenueSection() {
  return (
    <section
      id="venue-section"
      className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 bg-[#FFF5F5]/95 backdrop-blur-[1px] text-center border-t border-[#B76E79]/20 overflow-hidden"
    >
      <div className="w-full max-w-2xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#B76E79]" />
            <Sparkles size={12} className="text-[#C5A059]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B76E79]">
              Destination
            </span>
            <Sparkles size={12} className="text-[#C5A059]" />
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#B76E79]" />
          </div>

          <h2
            className="font-serif italic text-3xl sm:text-4xl font-bold text-[#8E5B61] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {invitation.venue.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#7A6568] font-serif italic mt-2 max-w-md mx-auto">
            {invitation.venue.subtitle}
          </p>
        </motion.div>

        {/* Venue & Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="p-5 sm:p-8 rounded-3xl border border-[#B76E79]/25 bg-white/95 shadow-[0_12px_40px_rgba(183,110,121,0.08)] backdrop-blur-sm text-center relative overflow-hidden"
        >
          {/* MapPin Icon Badge */}
          <div className="w-12 h-12 rounded-full bg-[#8E5B61] text-white flex items-center justify-center mx-auto mb-4 shadow-[0_4px_16px_rgba(142,91,97,0.25)] border-2 border-white">
            <MapPin size={22} className="text-[#FDFBF7]" />
          </div>

          {/* Venue Name */}
          <h3
            className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1D24] mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {invitation.venue.name}
          </h3>

          {/* City / Tag */}
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] block mb-3">
            {invitation.venue.city}
          </span>

          {/* Full Address */}
          <p className="text-xs sm:text-[13px] text-[#555] max-w-md mx-auto leading-relaxed mb-5">
            {invitation.venue.address}
          </p>

          {/* Interactive Google Map Embed */}
          <div className="relative w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden border border-[#B76E79]/20 shadow-inner bg-[#F5EBEB]">
            <iframe
              src={invitation.venue.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Discover Resorts Google Map"
              className="w-full h-full"
            />
          </div>

          {/* Get Directions Button */}
          <div className="mt-6 flex justify-center">
            <a
              href={invitation.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#8E5B61] hover:bg-[#7A4C52] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_6px_20px_rgba(142,91,97,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Navigation size={14} />
              <span>Get Live Directions</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
