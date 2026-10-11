"use client";

import Main from "@/components/Main";

const WEDDING_EVENTS = [
  "band-baaja-baarat",
  "garlands-and-grace",
  "mangal-parinay",
];

export default function WeddingPage() {
  return <Main eventIds={WEDDING_EVENTS} showRSVP={false} />;
}
