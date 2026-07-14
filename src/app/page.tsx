"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Activity, 
  Globe, 
  Lock, 
  Database,
  Menu,
  X
} from "lucide-react";
import ComplianceWizard from "@/components/ComplianceWizard";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("Government");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const industries = [
    "Government", 
    "Energy", 
    "Telecom", 
    "Financial Services", 
    "Healthcare", 
    "Technology", 
    "NGOs"
  ];

  React.useEffect(() => {
    setMounted(true);
  }, []);


  const organizations = [
    { name: "Afton Chemical", src: "/Scrolling organisations/aftonchemicalDotCom-LOGO-homepage.png" },
    { name: "CFTA", src: "/Scrolling organisations/Frame 288.png" },
    { name: "DAI", src: "/Scrolling organisations/Updated-dai-logo.png" },
    { name: "FAAN", src: "/Scrolling organisations/Faan.logo_.png" },
    { name: "Federal Ministry of Finance", src: "/Scrolling organisations/22cceef4-9c7c-4f47-a60e-82eff0de19ae.png" },
    { name: "Federal Ministry of Industry", src: "/Scrolling organisations/auweblogo-en.png" },
    { name: "Galaxy Backbone", src: "/Scrolling organisations/GBB-LOGO-1-UPDATE-05062-1-4.png" },
    { name: "JTI", src: "/Scrolling organisations/JTI_Logo.svg.webp" },
    { name: "NCC", src: "/Scrolling organisations/logo.png" },
    { name: "NDPC", src: "/Scrolling organisations/NDPC-copped.png" },
    { name: "Nigeria Governors' Forum", src: "/Scrolling organisations/logo.webp" },
    { name: "SEDC", src: "/Scrolling organisations/qVynrWql_400x400.jpg" }
  ];

  return (
    <div className="flex flex-col w-full flex-grow">

      {/* 1. Global Header */}
      <Navbar onOpenWizard={() => setIsWizardOpen(true)} />

      {/* 2. The Asymmetric Hero Section */}
      <main className="relative flex-grow flex items-center pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        {/* Subtle grid background for enterprise tech aesthetic */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        
        <div className="mx-auto max-w-7xl px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Left Column (The Pitch) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-start w-full"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 mb-6 md:mb-8 shadow-sm backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-xs font-bold tracking-wide text-blue-800 uppercase">
                  [Emma's Eyebrow Content]
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1] md:leading-[1.05]">
                [Emma's H1 Headline Content]
              </h1>
              
              <h2 className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 max-w-xl leading-relaxed font-medium">
                [Emma's Subheadline Content]
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setIsWizardOpen(true)}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 md:px-8 py-3.5 md:py-4 text-base font-semibold text-white shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                >
                  Assess Your Risk Profile
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 md:px-8 py-3.5 md:py-4 text-base font-semibold text-slate-800 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 hover:ring-slate-400 transition-all shadow-sm w-full sm:w-auto">
                  Book Advisory Session
                </button>
              </div>
            </motion.div>

            {/* Right Column (The UI Demonstration) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative w-full"
            >
              {/* Decorative blurs */}
              <div className="absolute -top-10 -right-10 w-72 md:w-96 h-72 md:h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-72 md:w-96 h-72 md:h-96 bg-emerald-400/15 rounded-full mix-blend-multiply filter blur-3xl"></div>
              
              {/* Pulsing ambient glow behind the card */}
              <motion.div 
                animate={{ opacity: [0.3, 0.7, 0.3] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-3xl"
              />

              {/* The Glass Card */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5"
              >
                
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/50 bg-white/50">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-slate-800" />
                    <h3 className="font-bold text-slate-900 text-base md:text-lg">AI Compliance Report</h3>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 md:py-1.5 rounded-md uppercase">
                    <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-slate-500"></span>
                    </span>
                    Live Scan
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8">
                  <div className="mb-8">
                    <p className="text-xs md:text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Overall Risk Exposure</p>
                    <div className="flex items-end gap-3 md:gap-4">
                      <span className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                        64<span className="text-3xl md:text-4xl text-slate-400 font-medium">%</span>
                      </span>
                      <span className="mb-1 md:mb-2 inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1 text-xs md:text-sm font-semibold text-red-700 ring-1 ring-inset ring-red-600/20">
                        <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />
                        High Exposure
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Progress Bar 1 */}
                    <div>
                      <div className="flex justify-between text-xs md:text-sm mb-2">
                        <span className="font-semibold text-slate-700">Data Governance (NDPA)</span>
                        <span className="font-bold text-slate-900">42%</span>
                      </div>
                      <div className="w-full bg-slate-200/80 rounded-full h-2.5 md:h-3 overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "42%" }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                          className="bg-red-500 h-full rounded-full" 
                        />
                      </div>
                    </div>
                    
                    {/* Progress Bar 2 */}
                    <div>
                      <div className="flex justify-between text-xs md:text-sm mb-2">
                        <span className="font-semibold text-slate-700">Reputation Readiness</span>
                        <span className="font-bold text-slate-900">85%</span>
                      </div>
                      <div className="w-full bg-slate-200/80 rounded-full h-2.5 md:h-3 overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                          className="bg-emerald-500 h-full rounded-full" 
                        />
                      </div>
                    </div>
                    
                    {/* Progress Bar 3 */}
                    <div>
                      <div className="flex justify-between text-xs md:text-sm mb-2">
                        <span className="font-semibold text-slate-700">Regulatory & Policy Exposure</span>
                        <span className="font-bold text-slate-900">78%</span>
                      </div>
                      <div className="w-full bg-slate-200/80 rounded-full h-2.5 md:h-3 overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "78%" }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                          className="bg-yellow-500 h-full rounded-full" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Block */}
                  <div className="mt-8 md:mt-10 bg-blue-50/80 rounded-xl p-5 md:p-6 border border-blue-100 shadow-sm relative overflow-hidden">
                    <p className="text-[10px] md:text-xs font-bold tracking-wider text-blue-800 uppercase mb-2 md:mb-3 flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      Priority Recommendation
                    </p>
                    <p className="text-xs md:text-sm font-medium text-blue-900/90 leading-relaxed">
                      Executive response required regarding cross-border data transfer protocols within 30 days to avoid regulatory penalty. Address NDPA gaps immediately.
                    </p>
                  </div>

                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </main>

      {/* 3. The Trust Banner */}
      <section className="border-t border-slate-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-center text-xs md:text-sm font-bold text-slate-400 mb-8 md:mb-10 uppercase tracking-widest">
            Trusted by forward-thinking organizations across Africa
          </p>
          
          <div 
            className="relative w-full overflow-hidden"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
            }}
          >
            <motion.div 
              className="flex whitespace-nowrap items-center w-max"
              animate={{ x: [0, "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {[...organizations, ...organizations].map((org, index) => (
                <div key={index} className="px-8 md:px-12 flex items-center justify-center">
                  <Image 
                    src={org.src}
                    alt={`${org.name} Logo`}
                    width={160}
                    height={48}
                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-300 ease-in-out opacity-60 hover:opacity-100"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* 4. Regulatory Agitation Bar */}
      <section className="w-full bg-slate-900 px-6 py-8 md:py-10 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-white text-base md:text-lg font-medium leading-relaxed">
            <strong className="text-red-400 font-bold tracking-wide uppercase mr-2">Warning:</strong> 
            Non-compliance with NDPA and GAID frameworks carries severe financial and reputational penalties. <span className="text-slate-300">[Emma's Urgent Subtext Content]</span>
          </p>
        </div>
      </section>

      {/* 5. Practice Areas Bento Box */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 md:mb-6">
              Our Core Disciplines
            </h2>
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
              [Emma's Section Subtitle]
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Card 1: AI Advisory Hub (Spans 7 cols) */}
            <div 
              onClick={() => setSelectedCard("ai-hub")}
              className="cursor-pointer group lg:col-span-7 rounded-3xl bg-gradient-to-br from-blue-50 to-slate-100 p-8 md:p-12 shadow-sm border border-slate-200/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
                <ShieldCheck className="w-32 h-32 text-blue-600" />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">AI Advisory Hub</h3>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
                  [Emma's AI Hub Description Content]
                </p>
              </div>

              {/* Mock Chat Bubble UI */}
              <div className="relative z-10 mt-10 md:mt-16 w-full max-w-md bg-white rounded-2xl rounded-bl-sm p-5 shadow-md border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Database className="w-4 h-4 text-blue-700" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Policy Assistant</span>
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  "Based on the new NDPA guidelines drafted today, your biometric data storage protocols require an immediate compliance audit."
                </p>
              </div>
            </div>

            {/* Right-Side Container for remaining cards (Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Card 2: Public Affairs */}
              <div 
                onClick={() => setSelectedCard("public-affairs")}
                className="cursor-pointer group rounded-3xl bg-white p-8 shadow-sm border border-slate-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col justify-center flex-1"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">Public Affairs</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  [Emma's Public Affairs Description Content]
                </p>
              </div>

              {/* Card 3: Strategic Communication */}
              <div 
                onClick={() => setSelectedCard("strategic-comms")}
                className="cursor-pointer group rounded-3xl bg-white p-8 shadow-sm border border-slate-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col justify-center flex-1"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">Strategic Communication</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  [Emma's Comms Description Content]
                </p>
              </div>

              {/* Card 4: Data Protection */}
              <div 
                onClick={() => setSelectedCard("data-protection")}
                className="cursor-pointer group rounded-3xl bg-white p-8 shadow-sm border border-slate-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col justify-center flex-1"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">Data Protection</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  [Emma's Data Protection Description Content]
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 6. Industry Vertical Matrix */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Industries
            </h2>
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
              [Emma's Industry Matrix Subtitle]
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* Left Column: Industry List */}
            <div className="md:col-span-4 flex flex-col gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`text-left px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                    selectedIndustry === industry 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow-sm' 
                      : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 border-l-4 border-transparent'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>

            {/* Right Column: Industry Content */}
            <div className="md:col-span-8 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200/60 shadow-sm flex flex-col justify-center min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndustry}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{selectedIndustry}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    [Emma's Content: Specific compliance challenges, strategic opportunities, and advisory focus for {selectedIndustry}.]
                  </p>
                  <button className="flex items-center gap-2 text-blue-700 font-bold hover:text-blue-800 transition-colors">
                    Explore {selectedIndustry} Solutions <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Expandable Card Modal Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedCard && (
            <motion.div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 1000 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setSelectedCard(null)}
              />
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden relative flex flex-col z-10 pointer-events-auto"
              >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
                onClick={() => setSelectedCard(null)}
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Top Image Area */}
              <div className="h-64 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <span className="text-slate-400 font-medium">[Emma's Expanded Image Content]</span>
              </div>

              {/* Text Area */}
              <div className="p-8 md:p-10 flex flex-col gap-4">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {selectedCard === 'ai-hub' && 'AI Advisory Hub'}
                  {selectedCard === 'public-affairs' && 'Public Affairs'}
                  {selectedCard === 'strategic-comms' && 'Strategic Communication'}
                  {selectedCard === 'data-protection' && 'Data Protection'}
                </h3>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                  [Emma's Full Detailed Description Content]
                </p>
                
                {/* Footer CTA */}
                <button className="self-start rounded-xl bg-blue-700 px-6 py-3.5 text-sm md:text-base font-semibold text-white shadow-md shadow-blue-900/20 hover:bg-blue-800 transition-all">
                  [Emma's Specific Service CTA Content]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}

      {/* 8. Compliance Wizard */}
      <ComplianceWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />

    </div>
  );
}
