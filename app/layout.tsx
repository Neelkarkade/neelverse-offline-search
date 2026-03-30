import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeelVerse",
  description: "AI, creativity, and code — all in one place",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-gray-900 text-white">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen max-w-7xl mx-auto px-4">
          {children}
        </main>
        <footer className="p-4 bg-gray-800 text-center text-gray-400">
          © {new Date().getFullYear()} NeelVerse. All rights reserved.
        </footer>
      </body>
    </html>
  );
}