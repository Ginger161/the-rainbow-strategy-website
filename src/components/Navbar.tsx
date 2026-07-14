"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar({ onOpenWizard }: { onOpenWizard: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-full transition-colors"
      : "text-slate-500 hover:text-slate-900 px-3 py-1.5 transition-colors font-semibold";
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-xl transition-colors block"
      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-xl transition-colors font-medium block";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image 
              src="/logo.JPG" 
              alt="The Rainbow Strategy Logo" 
              width={180} 
              height={60} 
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
          <Link href="/about" className={getLinkClass("/about")}>About</Link>
          <Link href="/practice-areas" className={getLinkClass("/practice-areas")}>Practice Areas</Link>
          <Link href="/insights" className={getLinkClass("/insights")}>Insights</Link>
          <Link href="/contact" className={getLinkClass("/contact")}>Contact</Link>
        </nav>

        {/* Right Area: CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenWizard}
            className="hidden md:block rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 hover:shadow-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Run AI Compliance Check
          </button>
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white shadow-xl"
          >
            <div className="flex flex-col px-4 py-6 space-y-2">
              <Link href="/about" className={getMobileLinkClass("/about")} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="/practice-areas" className={getMobileLinkClass("/practice-areas")} onClick={() => setIsMobileMenuOpen(false)}>Practice Areas</Link>
              <Link href="/insights" className={getMobileLinkClass("/insights")} onClick={() => setIsMobileMenuOpen(false)}>Insights</Link>
              <Link href="/contact" className={getMobileLinkClass("/contact")} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <div className="pt-4 mt-2 border-t border-slate-100">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenWizard();
                  }}
                  className="w-full rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-blue-800 transition-all"
                >
                  Run AI Compliance Check
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
