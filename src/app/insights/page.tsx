"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Mail, FileText } from 'lucide-react';
import Navbar from "@/components/Navbar";
import ComplianceWizard from "@/components/ComplianceWizard";
import dynamic from 'next/dynamic';

const DocumentReaderModal = dynamic(() => import('@/components/DocumentReaderModal'), { ssr: false });

export default function InsightsPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<{title: string, url: string} | null>(null);

  const handleOpenReader = (title: string, url: string) => {
    setSelectedDoc({ title, url });
    setIsReaderOpen(true);
  };

  const gridInsights = [
    {
      tag: "IGBO",
      badgeColor: "bg-red-600",
      title: "NIGERIA DATA PROTECTION ACT 2023 MULTILINGUAL TRANSLATION EDITION IGBO",
      excerpt: "Official Igbo language translation of the statutory frameworks mandated for data processors.",
      readTime: "Official Translation",
      fileName: "Book_NDPAct_Igbo.pdf" 
    },
    {
      tag: "HAUSA",
      badgeColor: "bg-[#808000]", // Olive green
      title: "NIGERIA DATA PROTECTION ACT 2023 MULTILINGUAL TRANSLATION EDITION HAUSA",
      excerpt: "Official Hausa language translation of the statutory frameworks mandated for data processors.",
      readTime: "Official Translation",
      fileName: "Book_NDPAct_Hausa.pdf" 
    },
    {
      tag: "YORUBA",
      badgeColor: "bg-amber-600",
      title: "NIGERIA DATA PROTECTION ACT 2023 MULTILINGUAL TRANSLATION EDITION YORUBA",
      excerpt: "Official Yoruba language translation of the statutory frameworks mandated for data processors.",
      readTime: "Official Translation",
      fileName: "Book_NDPAct_Yoruba.pdf" 
    },
    {
      tag: "STRATEGY",
      badgeColor: "bg-slate-800",
      title: "Strategic Roadmap and Action Plan (SRAP) 2023-2027",
      excerpt: "The foundational roadmap detailing NDPC's strategic goals and regulatory enforcement timeline.",
      readTime: "Policy Document",
      fileName: "Strategic Roadmap and Action Plan.pdf" 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-slate-900">
      
      {/* 1. Global Navigation */}
      <Navbar onOpenWizard={() => setIsWizardOpen(true)} />

      <main className="w-full flex-grow relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        
        {/* Action 1: Hero Section */}
        <section className="relative pt-32 pb-16 px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-sm font-semibold mb-8 shadow-sm">
              ✦ STRATEGIC INTELLIGENCE
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Insights and analysis on the intersection of AI, data, and public policy.
            </h1>
          </motion.div>
        </section>

        {/* Action 2: The Featured Insight (Hero Card) */}
        <section className="max-w-6xl mx-auto px-6 mb-16 relative z-10">
          <motion.a 
            href="https://ndpc.gov.ng/Laws"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-slate-100 flex flex-col md:flex-row gap-12 items-center cursor-pointer group block"
          >
            {/* Left: Image Placeholder */}
            <div className="w-full md:w-1/2 aspect-video bg-slate-100 rounded-3xl overflow-hidden relative flex items-center justify-center border border-slate-200 group-hover:border-slate-300 transition-colors">
              <span className="text-slate-400 font-medium tracking-widest uppercase text-sm">
                [Featured Image 16:9]
              </span>
            </div>

            {/* Right: Text Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-widest uppercase mb-6">
                Regulatory Shift
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-[1.15] group-hover:text-blue-700 transition-colors">
                The Nigeria Data Protection Act (NDPA): Official Mandates & Compliance
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Review the direct regulatory frameworks and statutory requirements mandated for data processors and controllers.
              </p>
              <div className="flex items-center gap-3 text-blue-600 font-semibold group-hover:text-blue-800 transition-colors">
                Read Briefing 
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </div>
          </motion.a>
        </section>

        {/* Action 3: The Intelligence Grid (Bento Layout) */}
        <section className="max-w-[85rem] mx-auto px-6 pb-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gridInsights.map((insight, idx) => (
              <motion.div
                key={idx}
                onClick={() => handleOpenReader(insight.title, `/Insights content/${insight.fileName}`)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 border border-slate-100 flex flex-col cursor-pointer group"
              >
                {/* Geometric Document Thumbnail */}
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative bg-white border border-slate-200 shadow-inner">
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[10px] font-extrabold tracking-widest shadow-sm z-20 ${insight.badgeColor}`}>
                    {insight.tag}
                  </div>
                  
                  {/* Geometric layout imitating official NDPC documents */}
                  <div className="absolute inset-0 flex flex-col relative z-10">
                    <div className="h-[25%] bg-white w-full border-b-4 border-yellow-500 shrink-0"></div>
                    <div className="h-[75%] bg-green-800 w-full p-6 flex flex-col items-center justify-center text-center">
                      <FileText className="w-10 h-10 text-green-700/50 absolute top-4 right-4" />
                      <span className="text-white font-extrabold text-sm leading-tight uppercase line-clamp-5 drop-shadow-md">
                        {insight.title}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3">
                  {insight.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {insight.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">
                  <FileText className="w-4 h-4" />
                  {insight.readTime}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Action 4: The Newsletter Capture (Lead Generation) */}
        <section className="max-w-4xl mx-auto px-6 pb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Glowing radial background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-900/50 flex items-center justify-center mb-8 border border-blue-800/50 shadow-inner">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              
              <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Get the Executive Briefing.
              </h3>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
                Monthly regulatory intelligence delivered directly to your inbox. Stay ahead of the curve.
              </p>
              
              <form 
                onSubmit={(e) => e.preventDefault()} 
                className="w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-3"
              >
                <input 
                  type="email" 
                  placeholder="Enter your corporate email" 
                  required
                  className="flex-grow px-6 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button 
                  type="submit"
                  className="whitespace-nowrap rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </motion.div>
        </section>

      </main>

      <ComplianceWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
      
      {/* Custom PDF Reader Modal */}
      {selectedDoc && (
        <DocumentReaderModal 
          isOpen={isReaderOpen} 
          onClose={() => setIsReaderOpen(false)} 
          documentTitle={selectedDoc.title} 
          documentUrl={selectedDoc.url} 
        />
      )}
    </div>
  );
}
