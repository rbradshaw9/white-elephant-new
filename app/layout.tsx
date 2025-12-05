import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Snowfall from "@/components/Snowfall";
import CookieBannerParody from "@/components/CookieBannerParody";
import NaughtyListChecker from "@/components/NaughtyListChecker";
import MobileBottomNav from "@/components/MobileBottomNav";
import ElfChatbot from "@/components/ElfChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The White Elephant Bash",
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
        <CookieBannerParody />
        <NaughtyListChecker />
        <ElfChatbot />
        <Navbar />
        <main className="flex-grow pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
