"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Quote, AlertCircle, Upload, FileText, Trash2 } from "lucide-react";
import gardenBg from "@/assets/garden-bg.png";

interface RSVP {
  name: string;
  phone: string;
  guests: number;
  message: string;
  aadharFiles?: string[];
  date: string;
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHX8hI9TOqhpd1GH8knWTwFvNfj-yUCHSrLzJoR8yRkZzKLdEaSRrz-vkav3Lnm87P/exec";

const INITIAL_DATA: RSVP[] = [
  {
    name: "Sundrani & Rokhana Family Relatives",
    phone: "9876543210",
    guests: 2,
    message: "Heartiest congratulations to Karan and Bhoomi! Wishing you both a lifetime of happiness.",
    date: new Date().toISOString(),
  },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current mr-2 inline-block shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.436 0 9.86-4.426 9.864-9.864.002-2.635-1.023-5.11-2.884-6.974C16.38 1.895 13.9 .871 11.267.87c-5.438 0-9.863 4.426-9.867 9.867-.001 1.764.47 3.486 1.365 5.011L1.72 20.47l4.927-1.316zM17.487 14.39c-.27-.136-1.602-.79-1.85-.88-.25-.09-.43-.136-.61.136-.18.27-.694.88-.85 1.06-.157.182-.313.203-.583.067-.27-.136-1.14-.42-2.172-1.34-.803-.717-1.346-1.603-1.502-1.874-.158-.27-.017-.417.118-.552.123-.12.27-.315.405-.47.135-.158.18-.27.27-.45.09-.18.046-.337-.02-.473-.068-.136-.61-1.47-.836-2.016-.22-.53-.44-.457-.61-.466-.156-.008-.337-.008-.517-.008-.18 0-.472.067-.72.337-.247.27-.943.923-.943 2.25s.965 2.61 1.1 2.79c.134.18 1.9 2.9 4.604 4.07.643.277 1.144.443 1.536.568.646.206 1.233.177 1.697.108.518-.077 1.602-.656 1.828-1.28.226-.623.226-1.157.157-1.267-.07-.11-.257-.145-.526-.28z" />
  </svg>
);

export default function RSVPSection({ allowAadhaar = true }: { allowAadhaar?: boolean }) {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    guests: number | string;
    message: string;
  }>({
    name: "",
    phone: "",
    guests: 1,
    message: "",
  });
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [responses, setResponses] = useState<RSVP[]>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const combined = [...attachedFiles, ...newFiles];
      const guestCount = Number(formData.guests) || 1;
      if (combined.length > guestCount) {
        setError(`You have entered ${guestCount} guest(s). Please attach exactly ${guestCount} Aadhaar card copy(ies).`);
      } else {
        setError(null);
      }
      setAttachedFiles(combined);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return false;
    }
    const guestCount = Number(formData.guests);
    if (!guestCount || guestCount < 1) {
      setError("Please enter at least 1 guest.");
      return false;
    }
    if (allowAadhaar) {
      if (attachedFiles.length !== guestCount) {
        setError(
          `Please attach copies of Aadhaar card for each guest (Required: ${guestCount}, Attached: ${attachedFiles.length}).`
        );
        return false;
      }
    }
    return true;
  };

  const readFileAsBase64 = (file: File): Promise<{ name: string; type: string; base64: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.includes(",") ? result.split(",")[1] : result;
        resolve({
          name: file.name,
          type: file.type || "application/octet-stream",
          base64: base64,
        });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let encodedFiles: { name: string; type: string; base64: string }[] = [];
      if (allowAadhaar && attachedFiles.length > 0) {
        encodedFiles = await Promise.all(attachedFiles.map(readFileAsBase64));
      }

      const guestCount = Number(formData.guests) || 1;

      if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("YOUR_GOOGLE_SCRIPT")) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            guests: guestCount,
            message: formData.message,
            side: "Groom Side (Karan)",
            inviteSide: "Groom Side (Karan)",
            source: "karanwedsbhoomi.in",
            files: encodedFiles,
            template: "karan_bhoomi",
          }),
        });
      }

      const newRSVP: RSVP = {
        name: formData.name,
        phone: formData.phone,
        guests: guestCount,
        message: formData.message,
        aadharFiles: attachedFiles.map((f) => f.name),
        date: new Date().toISOString(),
      };
      setResponses([newRSVP, ...responses]);

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", phone: "", guests: 1, message: "" });
        setAttachedFiles([]);
      }, 3500);
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      setIsSubmitting(false);
      setError("Please check your internet connection and try again.");
    }
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const fileListNote = attachedFiles.length > 0
      ? `\n*Aadhaar Copies Attached:* ${attachedFiles.length} file(s) (${attachedFiles.map(f => f.name).join(", ")})`
      : "";

    const text = `*Wedding RSVP & Confirmation for Karan & Bhoomi #BKomeOne∞*
*Side:* Groom Side (Karan)
*Guest Name:* ${formData.name}
*Contact Number:* ${formData.phone}
*Number of Guests:* ${formData.guests}${fileListNote}
*Blessing Message:* ${formData.message || "Best wishes to Karan & Bhoomi!"}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919327374893?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", phone: "", guests: 1, message: "" });
      setAttachedFiles([]);
    }, 3500);
  };

  return (
    <section
      id="rsvp-section"
      className="relative z-10 py-16 px-6 overflow-hidden text-[#4A4A4A] border-t border-[#B76E79]/20"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 245, 245, 0.96), rgba(255, 245, 245, 0.92)), url(${gardenBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative Flower Fountain (Top Right) */}
      <motion.img
        src="/templates/wedding/nitin-weds-rita/flower-fountain.png"
        alt=""
        className="absolute top-[-87px] -right-15 w-60 pointer-events-none mix-blend-multiply drop-shadow-md z-50"
        initial={{ opacity: 0, x: 30, rotate: 5 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
      />

      <div className="w-full relative z-10">
        <div className="text-center mb-12">
          <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-[#B76E79]">
            Your Presence is Our Blessing
          </span>
          <h2 className="font-serif italic text-4xl mt-2 text-[#8E5B61]">RSVP</h2>
          <p className="text-xs tracking-wider text-[#7A6568] mt-2 font-medium">
            Discover Resorts, Karjat <br /> 17th & 18th December 2026
          </p>
        </div>

        <div className="flex flex-col w-full items-stretch relative">
          {/* RSVP FORM */}
          <motion.div
            className="relative z-10 p-6 sm:p-8 rounded-3xl border border-[#B76E79]/20 bg-white/95 backdrop-blur-md shadow-[0_15px_40px_rgba(183,110,121,0.08)] w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8E5B61]">
                  Guest Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="px-4 py-3 rounded-xl border border-[#B76E79]/25 bg-[#FFF8F8] text-[#4A4A4A] text-sm focus:outline-none focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/15 transition-all placeholder:text-[#B76E79]/50"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* No of Guests & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8E5B61]">
                    No. of Guests *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    required
                    placeholder="e.g. 1"
                    className="px-4 py-3 rounded-xl border border-[#B76E79]/25 bg-[#FFF8F8] text-[#4A4A4A] text-sm focus:outline-none focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/15 transition-all font-semibold"
                    value={formData.guests}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setFormData({ ...formData, guests: "" });
                      } else {
                        const parsed = parseInt(val, 10);
                        setFormData({ ...formData, guests: isNaN(parsed) ? "" : parsed });
                      }
                    }}
                  />
                  <span className="text-[10px] text-[#7A6568]">
                    Please enter the count of guests attending
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8E5B61]">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit Mobile No."
                    className="px-4 py-3 rounded-xl border border-[#B76E79]/25 bg-[#FFF8F8] text-[#4A4A4A] text-sm focus:outline-none focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/15 transition-all placeholder:text-[#B76E79]/50"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Aadhar Scanned Copy Attachment Field */}
              {allowAadhaar && (
                <div className="flex flex-col gap-2 p-3.5 rounded-2xl border border-[#B76E79]/30 bg-[#FFF9F9]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8E5B61] flex items-center gap-1.5">
                      <Upload size={14} className="text-[#C5A059]" />
                      Attach Scanned Aadhaar Card *
                    </label>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF0F0] text-[#8E5B61] border border-[#B76E79]/20">
                      {attachedFiles.length} of {formData.guests || 0} Attached
                    </span>
                  </div>

                  <p className="text-[11px] text-[#7A6568] leading-snug">
                    To ensure room reservations for each member, please attach scanned copies/photos of Aadhaar card for all <strong>{formData.guests || 1}</strong> guest(s).
                  </p>

                  <label className="mt-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#B76E79]/35 hover:border-[#8E5B61] rounded-xl bg-white/80 cursor-pointer transition-all hover:bg-[#FFF5F5]">
                    <Upload className="w-6 h-6 text-[#8E5B61] mb-1" />
                    <span className="text-xs font-bold text-[#8E5B61]">Click to Attach Aadhaar Files</span>
                    <span className="text-[10px] text-[#7A6568] mt-0.5">JPG, PNG, PDF up to 10MB each</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* List of Attached files */}
                  {attachedFiles.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-2">
                      {attachedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-[#B76E79]/20 text-xs text-[#4A4A4A]"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <FileText size={13} className="text-[#8E5B61] shrink-0" />
                            <span className="truncate font-medium">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {attachedFiles.length !== Number(formData.guests) && (
                    <span className="text-[10px] font-semibold text-[#B76E79]">
                      ⚠ Notice: Please attach exactly {formData.guests || 0} Aadhaar document(s) matching your guest count.
                    </span>
                  )}
                </div>
              )}

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8E5B61]">
                  Wishes & Blessings Message (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Send your warm blessings to Karan & Bhoomi..."
                  className="px-4 py-3 rounded-xl border border-[#B76E79]/25 bg-[#FFF8F8] text-[#4A4A4A] text-sm focus:outline-none focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/15 transition-all resize-none placeholder:text-[#B76E79]/50"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 text-rose-800 text-xs font-semibold bg-rose-50 border border-rose-200 p-3 rounded-xl">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col gap-3 w-full mt-2">
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${isSuccess
                    ? "bg-emerald-700 text-white shadow-[0_0_15px_rgba(4,120,87,0.3)]"
                    : "bg-[#8E5B61] hover:bg-[#7A4C52] text-white active:scale-95 shadow-[0_8px_25px_rgba(142,91,97,0.25)]"
                    }`}
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? "Submitting Confirmation..." : isSuccess ? "RSVP Submitted! ✨" : "Confirm RSVP"}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Supporter Image Break (Joining Line) - Hidden */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[180px] mx-auto -my-8 top-[-60px] relative z-20 pointer-events-none"
          >
            <img
              src="/templates/wedding/nitin-weds-rita/supporter.png"
              alt=""
              className="w-full h-auto drop-shadow-md mix-blend-multiply"
            />
          </motion.div> */}

          {/* BLESSINGS CAROUSEL - Hidden */}
          {/* <motion.div
            className="top-[-105px] relative z-10 p-6 sm:p-8 rounded-2xl border border-[#ebd8c3] bg-[#fcf9f2] backdrop-blur-sm flex flex-col justify-between shadow-[0_4px_20px_rgba(139,115,85,0.04)] w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 border-b border-[#e6d6c3] pb-4 mb-6">
              <Quote className="text-[#b45309] w-5 h-5 rotate-180" />
              <h3 className="font-serif italic text-2xl text-[#6b4f2c]">Blessings & Wishes</h3>
            </div>

            <div
              className="relative overflow-hidden min-h-[140px] flex items-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center w-full gap-3 text-[#b45309]">
                  <div className="w-8 h-8 border-2 border-[#ebd8c3]/40 border-t-[#b45309] rounded-full animate-spin" />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#8a7156]">
                    Loading Blessings...
                  </span>
                </div>
              ) : responses.length === 0 ? (
                <div className="text-[#8a7156] italic text-center w-full text-sm">
                  Write a blessing for Karan & Bhoomi
                </div>
              ) : (
                <div className="w-full">
                  <motion.div
                    className="flex"
                    animate={{ x: `-${currentIndex * (100 / (responses.length || 1))}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ width: `${responses.length * 100}%` }}
                  >
                    {responses.map((rsvp, idx) => (
                      <div key={idx} style={{ width: `${100 / responses.length}%` }} className="px-2 shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-[#fef3c7] border border-[#d97706]/30 flex items-center justify-center font-serif text-lg text-[#92400e] font-bold">
                            {rsvp.name?.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#6b4f2c]">{rsvp.name}</h4>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#b45309]">
                              {rsvp.guests} Guest(s) Confirmed
                            </span>
                          </div>
                        </div>
                        <p className="text-[#5c3d1e] text-sm italic leading-relaxed pl-2 border-l-2 border-[#b45309]/30">
                          "{rsvp.message || "Wishing Karan & Bhoomi a blessed life together!"}"
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}
            </div>

            {responses.length > 1 && (
              <div className="flex items-center justify-between border-t border-[#ebd8c3] pt-5 mt-5">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? responses.length - 1 : prev - 1))}
                  className="w-8 h-8 rounded-full border border-[#ebd8c3] bg-[#fdfbf9] text-[#6b4f2c] flex items-center justify-center hover:bg-[#ebd8c3] active:scale-90 transition-all cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <div className="flex gap-1.5">
                  {responses.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${idx === currentIndex ? "bg-[#b45309] w-3" : "bg-[#e6d6c3]"}`}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % responses.length)}
                  className="w-8 h-8 rounded-full border border-[#ebd8c3] bg-[#fdfbf9] text-[#6b4f2c] flex items-center justify-center hover:bg-[#ebd8c3] active:scale-90 transition-all cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            )}
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
