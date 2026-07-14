"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, MessageSquare, ArrowRight, Calendar, Mail } from 'lucide-react';
import Navbar from "@/components/Navbar";
import ComplianceWizard from "@/components/ComplianceWizard";

export default function ContactPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    sector: '',
    inquiryType: '',
    message: ''
  });

  const sectors = [
    "Government", "Energy", "Telecom", "Financial Services", 
    "Healthcare", "Technology", "NGOs", "Political Institutions", 
    "Education", "Hospitality"
  ];

  const inquiryTypes = [
    "Public Affairs", 
    "Strategic Communication", 
    "Data Protection"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate CRM piping
    console.log("Piping to CRM:", formData);
    alert("Thank you for reaching out. We will get back to you shortly.");
    setFormData({ name: '', email: '', organization: '', sector: '', inquiryType: '', message: '' });
  };

  return (
    <div className="flex flex-col w-full flex-grow">
      <Navbar onOpenWizard={() => setIsWizardOpen(true)} />

      <main className="relative bg-gradient-to-br from-slate-50/50 via-white/50 to-blue-50/30 pt-32 pb-24 overflow-hidden min-h-screen">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 ring-1 ring-inset ring-blue-600/20 mb-6 tracking-wide">
              ✦ GET IN TOUCH
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Let's navigate the complex together.
            </h1>
            <p className="text-xl leading-8 text-slate-600">
              Reach out to explore how our strategic counsel can secure your objectives across regulatory and public affairs landscapes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Sidebar Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-4 flex flex-col gap-6"
            >
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 flex flex-col gap-8">
                
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Contact Information</h3>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Headquarters</p>
                      <p className="text-slate-500 mt-1">12 Regulatory Avenue<br />Central Business District<br />Abuja, Nigeria</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">WhatsApp</p>
                      <a href="https://wa.me/2340000000000" className="text-slate-500 hover:text-green-600 transition-colors mt-1 block">
                        +234 (0) 000 000 0000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Email</p>
                      <a href="mailto:contact@rainbowstrategy.com" className="text-slate-500 hover:text-blue-600 transition-colors mt-1 block">
                        contact@rainbowstrategy.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Ready to align?</h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Skip the form and directly schedule a strategy session with our principals.
                  </p>
                  <a 
                    href="#book"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

              </div>
            </motion.div>

            {/* CRM Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-8"
            >
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Send an Inquiry</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-slate-900">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-900">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="jane@organization.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="organization" className="text-sm font-semibold text-slate-900">Organization</label>
                    <input 
                      type="text" 
                      id="organization"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Company or Government Entity"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="sector" className="text-sm font-semibold text-slate-900">Sector</label>
                      <div className="relative">
                        <select 
                          id="sector"
                          name="sector"
                          required
                          value={formData.sector}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none"
                        >
                          <option value="" disabled>Select your sector</option>
                          {sectors.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="inquiryType" className="text-sm font-semibold text-slate-900">Nature of Inquiry</label>
                      <div className="relative">
                        <select 
                          id="inquiryType"
                          name="inquiryType"
                          required
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none"
                        >
                          <option value="" disabled>Select inquiry type</option>
                          {inquiryTypes.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-900">Additional Details</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                      placeholder="How can we assist you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit Inquiry
                  </button>

                  <p className="text-xs text-slate-500 text-center mt-4">
                    By submitting this form, you agree to our processing of your data in accordance with the Nigeria Data Protection Act 2023.
                  </p>
                </form>

              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <ComplianceWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}
