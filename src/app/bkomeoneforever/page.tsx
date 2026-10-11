import type { Metadata } from "next";
import Main from "@/components/Main";

export const metadata: Metadata = {
  title: "Karan & Bhoomi - Wedding Invitation | #BKomeOne∞",
  description: "The Wedding Celebration of Karan Sundrani & Bhoomi Rokhana - 17th & 18th December 2026 at Discover Resorts, Karjat.",
  openGraph: {
    title: "Karan & Bhoomi - Wedding Invitation | #BKomeOne∞",
    description: "The Wedding Celebration of Karan Sundrani & Bhoomi Rokhana - 17th & 18th December 2026 at Discover Resorts, Karjat.",
    url: "https://www.karanwedsbhoomi.in/bkomeoneforever",
    siteName: "Karan & Bhoomi Wedding Invitation",
    images: [
      {
        url: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/k-b-p.png",
        width: 1200,
        height: 630,
        alt: "Karan & Bhoomi Wedding Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan & Bhoomi - Wedding Invitation | #BKomeOne∞",
    description: "The Wedding Celebration of Karan Sundrani & Bhoomi Rokhana - 17th & 18th December 2026 at Discover Resorts, Karjat.",
    images: ["https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/k-b-p.png"],
  },
};

export default function BkomeoneForeverPage() {
  return <Main />;
}
