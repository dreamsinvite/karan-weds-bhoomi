import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.karanwedsbhoomi.in"),
  title: "Karan & Bhoomi - Wedding Invitation | #BKomeOne∞",
  description: "The Wedding Celebration of Karan Sundrani & Bhoomi Rokhana - 17th & 18th December 2026 at Discover Resorts, Karjat.",
  openGraph: {
    title: "Karan & Bhoomi - Wedding Invitation (#BKomeOne∞)",
    description: "The Wedding Celebration of Karan Sundrani & Bhoomi Rokhana - 17th & 18th December 2026 at Discover Resorts, Karjat",
    siteName: "Karan & Bhoomi Wedding Invitation",
    images: [
      {
        url: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/k-b-p.png",
        width: 1200,
        height: 630,
        alt: "Karan & Bhoomi Wedding Invitation Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan & Bhoomi - Wedding Invitation (#BKomeOne∞)",
    description: "The Wedding Celebration of Karan Sundrani & Bhoomi Rokhana - 17th & 18th December 2026 at Discover Resorts, Karjat",
    images: ["https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/k-b-p.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&family=Italiana&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
