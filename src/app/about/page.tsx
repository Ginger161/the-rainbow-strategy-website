"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, BarChart3, Layers, CheckCircle2, Shield, Zap, Users } from 'lucide-react';
import ComplianceWizard from "@/components/ComplianceWizard";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax for Profile
  const profileRef = useRef(null);
  const { scrollYProgress: profileScroll } = useScroll({
    target: profileRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(profileScroll, [0, 1], ["-15%", "15%"]);

  // Live Timeline for Methodology
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  return (
    <div className="flex flex-col w-full flex-grow">
      
      {/* 1. Global Navigation */}
      <Navbar onOpenWizard={() => setIsWizardOpen(true)} />

      <main className="w-full flex-grow relative overflow-hidden bg-gradient-to-br from-slate-50/50 via-white/50 to-blue-50/30">
        
        {/* Section 1: The Hero Section */}
        <section className="relative pt-20 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="flex flex-col items-center"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-sm font-semibold mb-8 shadow-sm"
            >
              ✦ THE RAINBOW STRATEGY
            </motion.div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 mb-10 leading-[1.05]"
            >
              Strategic consulting<br />for the modern era.
            </motion.h1>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="flex flex-col gap-6 max-w-2xl text-left md:text-center"
            >
              <p className="text-lg text-slate-600 leading-relaxed">
                <strong className="font-semibold text-slate-900">Our Mission:</strong> To empower organizations with strategic insights and communication excellence that drives sustainable growth and positive societal impact.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                <strong className="font-semibold text-slate-900">Our Vision:</strong> To be the most trusted partner for organizations seeking to navigate complex policy environments and build lasting stakeholder relationships across Africa.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 2: The Principal */}
        <section ref={profileRef} className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column (Image) */}
              <div className="lg:col-span-5 w-full max-w-sm mx-auto aspect-[3/4] relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-8 text-center shadow-inner">
                <motion.div style={{ y: imageY }} className="absolute inset-[-15%] w-[130%] h-[130%] flex items-center justify-center bg-slate-50">
                  <div className="border-2 border-dashed border-slate-200 p-6 flex items-center justify-center h-full w-full rounded-xl">
                    <p className="text-slate-400 font-medium tracking-wide text-sm leading-relaxed">
                      [Insert Leadership Portrait: 3:4 Ratio]
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column (Bio) */}
              <div className="lg:col-span-7 lg:pl-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6">
                    Managing Partner
                  </div>
                  <h3 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                    [First Name] [Last Name]
                  </h3>
                  
                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                    <p>
                      [Insert 2-3 paragraphs of leadership biography, focusing on expertise in regulatory affairs, public policy, and strategic communications.]
                    </p>
                    <p>
                      [Placeholder for paragraph 2: Detail specific accomplishments, previous roles, or landmark projects that established the partner's authority in the African regulatory landscape.]
                    </p>
                    <p>
                      [Placeholder for paragraph 3: Emphasize their vision for integrating compliance, public trust, and business growth.]
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Live Timeline (Our Methodology) */}
        <section className="max-w-4xl mx-auto py-24 px-8 relative">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-16 text-center">Our Methodology</h2>
          
          {/* The Track (Static) */}
          <div className="absolute left-8 md:left-1/2 top-48 bottom-24 w-1 bg-slate-100 rounded-full -translate-x-1/2 z-0">
            {/* The "Live" Animated Line */}
            <motion.div 
              className="absolute top-0 w-full bg-blue-600 origin-top rounded-full"
              style={{ scaleY: timelineProgress, height: '100%' }}
            />
          </div>

          {/* The 3D Step Cards */}
          <div ref={timelineRef} className="flex flex-col gap-12 relative z-10 pl-8 md:pl-0">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 w-full md:w-[45%] md:self-start relative"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-3">1. Audit & Assess</h3>
              <p className="text-slate-600 leading-relaxed">
                We begin with a comprehensive review of your current regulatory exposure, public positioning, and stakeholder relationships to identify critical gaps and opportunities.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 w-full md:w-[45%] md:self-end relative"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-3">2. Strategic Alignment</h3>
              <p className="text-slate-600 leading-relaxed">
                Our experts map out tailored policy engagement strategies that bridge compliance requirements with your core business objectives, ensuring seamless integration.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 w-full md:w-[45%] md:self-start relative"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-3">3. Active Advocacy</h3>
              <p className="text-slate-600 leading-relaxed">
                We execute targeted communication campaigns and stakeholder engagements, dynamically adapting to legislative shifts to protect and elevate your public trust.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 4: The Differentiators (The 3D Bento Box Grid) */}
        <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">What Sets Us Apart</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">The Rainbow Advantage</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <ShieldCheck className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Deep Policy Expertise</h4>
              <p className="text-slate-600 leading-relaxed">
                Our team brings decades of experience in policy analysis, regulatory affairs, and government relations across multiple sectors.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <BarChart3 className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Data-Driven Approach</h4>
              <p className="text-slate-600 leading-relaxed">
                We leverage advanced analytics and AI-powered tools to provide actionable insights that inform our strategic recommendations.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <Layers className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Integrated Solutions</h4>
              <p className="text-slate-600 leading-relaxed">
                We offer comprehensive services that combine public affairs, communications, and compliance into cohesive strategies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 5: The Core Values (Card Layout) */}
        <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Our Core Values</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">The Foundation of Trust</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Integrity", desc: "Highest ethical standards.", icon: Shield },
              { title: "Excellence", desc: "Unparalleled quality.", icon: CheckCircle2 },
              { title: "Innovation", desc: "Pioneering new solutions.", icon: Zap },
              { title: "Collaboration", desc: "Building powerful coalitions.", icon: Users }
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                  className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-slate-100 group-hover:border-blue-100">
                    <Icon className="w-6 h-6 text-slate-500 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* The Hook: CTA */}
        <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white border border-slate-100 rounded-3xl p-12 md:p-20 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
            
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8 relative z-10">
              Test Your Regulatory Exposure.
            </h3>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="relative z-10 group inline-flex items-center justify-center gap-3 rounded-full bg-blue-700 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-900/20 hover:bg-blue-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Run AI Compliance Diagnostic
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </section>
      </main>

      {mounted && <ComplianceWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />}
    </div>
  );
}
