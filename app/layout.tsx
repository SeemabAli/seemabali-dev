import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Seemab Ali | Software Engineer & Modern Web Developer",
  description:
    "Portfolio of Seemab Ali — Modern Web Developer & Software Engineer specializing in React, Next.js, TypeScript, Tailwind CSS, full-stack architecture, and AI-powered web applications.",
  keywords: [
    "Seemab Ali",
    "Software Engineer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Tailwind CSS",
    "AI Web Applications",
    "Full-Stack Developer",
    "Pakistan",
    "Remote Developer",
  ],
  authors: [{ name: "Seemab Ali", url: "https://github.com/seemabali7335" }],
  creator: "Seemab Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seemabali.vercel.app",
    title: "Seemab Ali | Software Engineer & Modern Web Developer",
    description:
      "Building modern digital experiences with code & AI. Explore featured projects, engineering skills, and live AI assistant.",
    siteName: "Seemab Ali Portfolio",
    images: [
      {
        url: "https://seemabali.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Seemab Ali — Full-Stack Developer · AI · Next.js · TypeScript",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seemab Ali | Software Engineer & Modern Web Developer",
    description: "Building modern digital experiences with code & AI.",
    images: ["https://seemabali.vercel.app/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.jpg", type: "image/jpeg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased font-sans flex flex-col relative selection:bg-cyan-500/20 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
