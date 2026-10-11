import type { Metadata } from "next";
import Main from "@/components/Main";

export const metadata: Metadata = {
  title: "Karan & Bhoomi - Wedding Ceremony | #BKomeOne∞",
  description: "Wedding Ceremony of Karan Sundrani & Bhoomi Rokhana - Friday, 18th December 2026 at Discover Resorts, Karjat.",
  openGraph: {
    title: "Karan & Bhoomi - Wedding Ceremony | #BKomeOne∞",
    description: "Wedding Ceremony of Karan Sundrani & Bhoomi Rokhana - Friday, 18th December 2026 at Discover Resorts, Karjat.",
    url: "https://www.karanwedsbhoomi.in/wedding",
    siteName: "Karan & Bhoomi Wedding Invitation",
    images: [
      {
        url: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/k-b-p.png",
        width: 1200,
        height: 630,
        alt: "Karan & Bhoomi Wedding Ceremony",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan & Bhoomi - Wedding Ceremony | #BKomeOne∞",
    description: "Wedding Ceremony of Karan Sundrani & Bhoomi Rokhana - Friday, 18th December 2026 at Discover Resorts, Karjat.",
    images: ["https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/k-b-p.png"],
  },
};

const WEDDING_EVENTS = [
  "band-baaja-baarat",
  "garlands-and-grace",
  "mangal-parinay",
];

const WEDDING_INTRO_VIDEO =
  "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/18-Bhoomi.mp4";

export default function WeddingPage() {
  return (
    <Main
      eventIds={WEDDING_EVENTS}
      showRSVP={false}
      introVideoUrl={WEDDING_INTRO_VIDEO}
    />
  );
}
