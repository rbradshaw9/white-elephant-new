import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Snowfall from "@/components/Snowfall";
import ElfEyes from "@/components/ElfEyes";
import CookieBannerParody from "@/components/CookieBannerParody";
import NaughtyListChecker from "@/components/NaughtyListChecker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The White Elephant Bash 2025",
  description: "Join us for an evening of gift stealing, laughter, and holiday chaos at The White Elephant Bash!",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased min-h-screen flex flex-col`}>
        <Snowfall />
        <ElfEyes />
        <CookieBannerParody />
        <NaughtyListChecker />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
