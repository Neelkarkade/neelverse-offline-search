"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // change after 20px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (path: string) =>
    `block px-3 py-2 rounded-md ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav
      className={`p-4 sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-gray-800"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-xl">NeelVerse 🚀</div>

        {/* Hamburger button (mobile only) */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Links (desktop view) */}
        <div className="hidden md:flex gap-6">
          <a href="/" className={linkClasses("/")}>🏠 Home</a>
          <a href="/ai-agent" className={linkClasses("/ai-agent")}>🤖 AI Agent</a>
          <a href="/code-lab" className={linkClasses("/code-lab")}>💻 Code Lab</a>
        </div>
      </div>

      {/* Links (mobile dropdown with animation) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <a href="/" className={linkClasses("/")}>🏠 Home</a>
          <a href="/ai-agent" className={linkClasses("/ai-agent")}>🤖 AI Agent</a>
          <a href="/code-lab" className={linkClasses("/code-lab")}>💻 Code Lab</a>
        </div>
      </div>
    </nav>
  );
}