import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Home - SCORE Pvt Ltd, a subsidiary of FWO",
  description:
    "SCORE Pvt Ltd, a subsidiary of FWO, has delivered top-tier Motorway construction and rehabilitation services since 2015.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-white font-sans text-secondary">{children}</body>
    </html>
  );
}
