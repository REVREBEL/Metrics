import type { Metadata } from "next";
// src/app/layout.tsx
import { Khand, Funnel_Sans, Public_Sans } from "next/font/google"; //
import "./globals.css";
import { cn } from "@/lib/utils";

const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'});

const khand = Khand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-khand",
});

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-funnel", //
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(khand.variable, funnelSans.variable, "font-sans", publicSans.variable)}>
      <body className="antialiased font-funnel">{children}</body>
    </html>
  );
}
