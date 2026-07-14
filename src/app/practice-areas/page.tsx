"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, MessageSquare, Briefcase, CheckCircle2 } from 'lucide-react';
import Navbar from "@/components/Navbar";
import ComplianceWizard from "@/components/ComplianceWizard";

export default function PracticeAreasPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const pillars = [
    {
      title: "AI Advisory Hub",
      icon: Cpu,
      description: "Navigate the complex landscape of Artificial Intelligence adoption. We help organizations deploy AI ethically, securely, and in full compliance with emerging global standards.",
      deliverables: [
        "Algorithmic Impact Assessments",
        "AI Governance Framework Design",
        "Ethical AI Policy Development",
        "Vendor Risk & Compliance Audits"
      ]
    },
    {
      title: "Data Protection",
      icon: ShieldCheck,
      description: "Safeguard your most critical asset. We construct robust data protection ecosystems that transcend basic compliance, building lasting trust with your stakeholders.",
      deliverables: [
        "NDPA & GDPR Compliance Audits",
        "Data Breach Response Strategies",
        "Privacy by Design Architecture",
        "Cross-Border Data Transfer Frameworks"
      ]
    },
    {
      title: "Strategic Communication",
      icon: MessageSquare,
      description: "Shape the narrative in times of change or crisis. Our tailored communication strategies ensure your message cuts through the noise and resonates with key audiences.",
      deliverables: [
        "Crisis Management & PR",
        "Stakeholder Engagement Plans",
        "Reputation Risk Mitigation",
        "Executive Media Training"
      ]
    },
    {
      title: "Public Affairs",
      icon: Briefcase,
      description: "Proactively engage with government and regulatory bodies. We position your organization as a trusted voice in the legislative and policy-making arenas.",
      deliverables: [
        "Policy Tracking & Analysis",
        "Legislative Advocacy Campaigns",
        "Regulatory Landscape Mapping",
        "Government Relations Strategy"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-slate-900">
      
      {/* 1. Global Navigation */}
      <Navbar onOpenWizard={() => setIsWizardOpen(true)} />

      <main className="w-full flex-grow relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        
        {/* Section 1: The Hero Section */}
        <section className="relative pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-sm font-semibold mb-8 shadow-sm">
              ✦ OUR EXPERTISE
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 max-w-4xl leading-[1.1]">
              Comprehensive strategies for a complex regulatory landscape.
            </h1>
          </motion.div>
        </section>

        {/* Section 2: The Practice Area Blocks (Deep Dive) */}
        <section className="flex flex-col gap-12 max-w-5xl mx-auto px-6 md:px-8 pb-32 relative z-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-slate-100 group"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                  
                  {/* Left Side: Icon, Title, Description */}
                  <div className="md:col-span-5 flex flex-col">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                      <Icon className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{pillar.title}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Right Side: Deliverables */}
                  <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                    <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-6">Key Deliverables</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pillar.deliverables.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </section>
      </main>

      <ComplianceWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}
