"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { X, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Server, Construction } from 'lucide-react';
import { SearchableDropdown } from './SearchableDropdown';

interface ComplianceWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUESTIONS = [
  // Step 1: Data Governance (10)
  { text: "Do you have a board-approved Data Protection Policy in place?", weight: 10 },
  { text: "Have you conducted a formal Data Protection Impact Assessment (DPIA) for high-risk processing?", weight: 10 },
  { text: "Do you maintain a Record of Processing Activities (ROPA) as required by NDPA?", weight: 10 },
  { text: "Have you formally designated a Data Protection Officer (DPO)?", weight: 10 },
  { text: "Is your data privacy notice clearly communicated to all data subjects?", weight: 10 },
  // Step 2: AI Ethics & Provenance (10)
  { text: "Do you maintain a documented register of all AI models in production?", weight: 10 },
  { text: "Have you performed a bias/fairness audit on your primary AI decisioning algorithms?", weight: 10 },
  { text: "Is there a 'Human-in-the-Loop' (HITL) protocol for AI-driven decisions?", weight: 10 },
  { text: "Do you document the provenance and licensing of training data sets?", weight: 10 },
  { text: "Is your AI model's logic explainable to non-technical auditors?", weight: 10 },
  // Step 3: Cross-Border Data Transfer (8)
  { text: "Are all cross-border transfers based on an adequacy decision or standard contractual clauses?", weight: 8 },
  { text: "Do you maintain a register of all third-party international data processors?", weight: 8 },
  { text: "Is data encryption mandatory for all data in transit across borders?", weight: 8 },
  { text: "Do you have a contingency plan for data localization mandates?", weight: 8 },
  { text: "Do you perform annual security due diligence on overseas vendors?", weight: 8 },
  // Step 4: Security & Incident Management (5)
  { text: "Do you have a certified Incident Response Plan (IRP) for data breaches?", weight: 5 },
  { text: "Is your security posture compliant with ISO 27001 or equivalent standards?", weight: 5 },
  { text: "Do you conduct regular, third-party penetration testing?", weight: 5 },
  { text: "Are access controls strictly enforced via Least Privilege (PoLP) principles?", weight: 5 },
  { text: "Do you provide periodic cybersecurity awareness training to all staff?", weight: 5 },
  // Step 5: Data Subject Rights (2)
  { text: "Do you have a formalized process to handle Data Subject Access Requests (DSARs)?", weight: 2 },
  { text: "Can you demonstrate the ability to permanently erase data upon request (Right to be Forgotten)?", weight: 2 },
  { text: "Is data portability enabled for your primary user base?", weight: 2 },
  { text: "Is user consent explicitly obtained and stored for non-essential processing?", weight: 2 },
  { text: "Is there a dedicated channel for public privacy complaints?", weight: 2 }
];

const STEPS = [
  "Data Governance",
  "AI Ethics & Provenance",
  "Cross-Border Data Transfer",
  "Security & Incident Management",
  "Data Subject Rights"
];

const INDUSTRIES = [
  "Government/Public Sector",
  "Energy & Utilities",
  "Telecommunications",
  "Financial Services",
  "Healthcare",
  "Technology/SaaS",
  "Manufacturing",
  "Education",
  "Non-Profit (NGO)",
  "Retail/E-commerce",
  "Other"
];

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function ComplianceWizard({ isOpen, onClose }: ComplianceWizardProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'Yes' | 'No' | 'Partial' | 'N/A'>>({});
  
  type Phase = 'wizard' | 'dashboard' | 'lead-capture' | 'pdf-report';
  const [phase, setPhase] = useState<Phase>('wizard');
  const [leadData, setLeadData] = useState<any>(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [score, setScore] = useState(0);
  const [baselineScore, setBaselineScore] = useState(0);
  const [penaltyPoints, setPenaltyPoints] = useState(0);
  const [penalizedCategories, setPenalizedCategories] = useState<string[]>([]);
  const [showScoringModal, setShowScoringModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showConstructionModal, setShowConstructionModal] = useState(false);

  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    const html2pdf = (await import('html2pdf.js')).default || require('html2pdf.js');
    
    const company = leadData?.companyName || "Organization";
    const filename = `${company}'s Data Regulation Compliance Check.pdf`;
    
    const opt = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(reportRef.current).save();
  };

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleAnswer = (qIndex: number, answer: 'Yes' | 'No' | 'Partial' | 'N/A') => {
    setAnswers(prev => ({ ...prev, [qIndex]: answer }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const calculateScore = () => {
    let earned = 0;
    let max = 0;
    
    Object.keys(answers).forEach(key => {
      const idx = parseInt(key);
      const val = answers[idx];
      const weight = QUESTIONS[idx].weight;
      
      if (val !== 'N/A') {
        max += weight;
        if (val === 'Yes') earned += weight;
        if (val === 'Partial') earned += weight * 0.5;
      }
    });
    
    const baseline = max === 0 ? 0 : Math.round((earned / max) * 100);
    setBaselineScore(baseline);

    let totalPenalty = 0;
    const penalized: string[] = [];

    for (let i = 0; i < 5; i++) {
      let hasConsecutiveNo = false;
      for (let j = 0; j < 4; j++) {
        const idx1 = i * 5 + j;
        const idx2 = i * 5 + j + 1;
        if (answers[idx1] === 'No' && answers[idx2] === 'No') {
          hasConsecutiveNo = true;
          break;
        }
      }
      if (hasConsecutiveNo) {
        totalPenalty += 15;
        penalized.push(STEPS[i]);
      }
    }
    
    setPenaltyPoints(totalPenalty);
    setPenalizedCategories(penalized);
    setScore(Math.max(0, baseline - totalPenalty));
    setPhase('dashboard');
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setPhase('wizard');
    setScore(0);
    setBaselineScore(0);
    setPenaltyPoints(0);
    setPenalizedCategories([]);
    setLeadData(null);
    onClose();
  };

  const onLeadSubmit = (data: any) => {
    setLeadData(data);
    setPhase('pdf-report');
  };

  if (!mounted || !isOpen) return null;

  const isCurrentStepComplete = () => {
    const startIdx = step * 5;
    for (let i = startIdx; i < startIdx + 5; i++) {
      if (!answers[i]) return false;
    }
    return true;
  };

  const getRiskCategory = () => {
    if (score >= 90) return { label: 'Stable', color: 'text-emerald-600', hex: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (score >= 70) return { label: 'Material', color: 'text-yellow-600', hex: '#ca8a04', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    if (score >= 50) return { label: 'High', color: 'text-orange-600', hex: '#ea580c', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { label: 'Critical', color: 'text-red-600', hex: '#dc2626', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const getPrimaryGapSection = () => {
    let maxGap = -1;
    let worstSection = STEPS[0];

    for (let i = 0; i < 5; i++) {
      let sectionEarned = 0;
      let sectionMax = 0;
      for (let j = 0; j < 5; j++) {
        const val = answers[i * 5 + j];
        const weight = QUESTIONS[i * 5 + j].weight;
        if (val && val !== 'N/A') {
          sectionMax += weight;
          if (val === 'Yes') sectionEarned += weight;
          if (val === 'Partial') sectionEarned += weight * 0.5;
        }
      }
      const gap = sectionMax - sectionEarned;
      if (gap > maxGap) {
        maxGap = gap;
        worstSection = STEPS[i];
      }
    }
    return worstSection;
  };

  const startIdx = step * 5;
  const currentQuestions = QUESTIONS.slice(startIdx, startIdx + 5);

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={reset}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl bg-slate-50 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col pointer-events-auto max-h-[90vh]"
      >
        <AnimatePresence>
          {showScoringModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative"
              >
                <button 
                  onClick={() => setShowScoringModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-slate-900 text-lg mb-4">Scoring Methodology</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Scores are calculated dynamically using a <strong>Weighted Tier System</strong> based on regulatory severity (NDPA/GAID tiers). <strong>'Not Applicable'</strong> responses are dynamically excluded.
                </p>
                <p className="text-sm text-slate-600 mb-6">
                  Systemic gaps (consecutive 'No' responses in critical areas) carry an <strong>additional compounding 15% penalty</strong>.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                    <span className="font-bold text-emerald-700">Stable</span>
                    <span className="text-emerald-600 font-semibold">90 - 100%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                    <span className="font-bold text-yellow-700">Material</span>
                    <span className="text-yellow-600 font-semibold">70 - 89%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 border border-orange-100 rounded-lg">
                    <span className="font-bold text-orange-700">High</span>
                    <span className="text-orange-600 font-semibold">50 - 69%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 border border-red-100 rounded-lg">
                    <span className="font-bold text-red-700">Critical</span>
                    <span className="text-red-600 font-semibold">0 - 49%</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showAuditModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl relative flex flex-col max-h-full"
              >
                <button 
                  onClick={() => setShowAuditModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-slate-900 text-lg mb-4">Your Diagnostic Audit Trail</h3>
                <div className="flex-1 overflow-y-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600 sticky top-0">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Question</th>
                        <th className="py-3 px-4 font-semibold w-32">Weight</th>
                        <th className="py-3 px-4 font-semibold w-24 text-right">Answer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {QUESTIONS.map((q, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="py-3 px-4 text-slate-800">{q.text}</td>
                          <td className="py-3 px-4 text-slate-500 font-medium whitespace-nowrap">
                            Weight: {q.weight}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-slate-600">
                            {answers[idx] || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showConstructionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative flex flex-col items-center text-center"
              >
                <button 
                  onClick={() => setShowConstructionModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <Construction className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-3">This module is currently being activated.</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Your Supabase instance is being linked to this environment. Full CRM automation and notification webhooks will be live shortly.
                </p>
                <button 
                  onClick={() => setShowConstructionModal(false)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
            </div>
            <h2 className="font-bold text-slate-900 text-lg">AI Compliance Diagnostic</h2>
          </div>
          <button 
            onClick={reset}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {phase === 'wizard' && (
              <motion.div 
                key="wizard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 md:p-10"
              >
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-2 gap-2">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                      Step {step + 1} of 5: <span className="text-blue-700">{STEPS[step]}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {Object.keys(answers).length} / 25 Answered
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${((step + 1) / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  {currentQuestions.map((q, idx) => {
                    const absoluteIdx = startIdx + idx;
                    return (
                      <div key={absoluteIdx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-slate-800 font-medium mb-4">{absoluteIdx + 1}. {q.text}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['Yes', 'Partial', 'No', 'N/A'].map(option => (
                            <button
                              key={option}
                              onClick={() => handleAnswer(absoluteIdx, option as any)}
                              className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all border ${
                                answers[absoluteIdx] === option 
                                  ? 'bg-blue-50 border-blue-600 text-blue-700 ring-1 ring-blue-600' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
                  <button
                    onClick={handleBack}
                    disabled={step === 0}
                    className={`px-6 py-3 md:py-4 rounded-xl font-semibold transition-all ${
                      step === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Back
                  </button>
                  {step < 4 ? (
                    <button
                      onClick={handleNext}
                      disabled={!isCurrentStepComplete()}
                      className={`px-6 py-3 md:py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                        isCurrentStepComplete() 
                          ? 'bg-blue-700 text-white hover:bg-blue-800 shadow-md' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={calculateScore}
                      disabled={!isCurrentStepComplete()}
                      className={`px-8 py-3 md:py-4 rounded-xl font-bold transition-all ${
                        isCurrentStepComplete() 
                          ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Generate Report
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {phase === 'dashboard' && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 md:p-10 bg-white"
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Diagnostic Complete</h2>
                  <p className="text-slate-600 text-lg">Your organization's AI compliance profile has been analyzed.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className={`p-8 rounded-2xl border ${getRiskCategory().bg} ${getRiskCategory().border} flex flex-col items-center justify-center text-center`}>
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Final Score</span>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className={`text-7xl font-black ${getRiskCategory().color}`}>{score}</span>
                      <span className="text-2xl font-bold text-slate-400">/ 100</span>
                    </div>
                    
                    <div className="w-full text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-lg p-3 mb-4 flex flex-col gap-1 shadow-sm">
                      <div className="flex justify-between">
                        <span>Baseline:</span>
                        <span>{baselineScore}%</span>
                      </div>
                      <div className="flex justify-between text-red-500">
                        <span>Systemic Penalty:</span>
                        <span>-{penaltyPoints}%</span>
                      </div>
                      <div className="w-full h-px bg-slate-200 my-1" />
                      <div className="flex justify-between text-slate-800 font-bold text-sm">
                        <span>Final Score:</span>
                        <span>{score}%</span>
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-white ${getRiskCategory().color} shadow-sm border ${getRiskCategory().border}`}>
                      {score >= 70 ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      Risk Profile: {getRiskCategory().label}
                    </div>

                    {penalizedCategories.length > 0 && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 text-left font-medium w-full shadow-sm">
                        <AlertTriangle className="w-4 h-4 inline-block mr-1 mb-0.5" />
                        Penalty applied for systemic gaps in {penalizedCategories.join(", ")}.
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Executive Summary</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Based on your responses, your organization exhibits a <strong className="text-slate-800">{getRiskCategory().label.toLowerCase()}</strong> exposure to regulatory and financial penalties under current NDPA and GAID frameworks. Exposure is primarily driven by <strong>{getPrimaryGapSection()}</strong> gaps.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                        Immediate audit of third-party data processors recommended.
                      </li>
                      <li className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                        Update AI model provenance documentation.
                      </li>
                      <li className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                        Implement stricter cross-border data transfer protocols.
                      </li>
                    </ul>
                    <div className="flex flex-col items-start gap-2 mt-6">
                      <button 
                        onClick={() => setShowScoringModal(true)}
                        className="text-sm font-bold text-blue-600 hover:text-blue-800 underline transition-colors"
                      >
                        View Scoring Methodology
                      </button>
                      <button 
                        onClick={() => setShowAuditModal(true)}
                        className="text-sm font-bold text-blue-600 hover:text-blue-800 underline transition-colors"
                      >
                        View Audit Trail
                      </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <button 
                        onClick={() => setPhase('lead-capture')}
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-lg print:hidden"
                      >
                        Unlock Full Audit Report
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between shadow-xl print:hidden">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 shrink-0">
                      <Server className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">System Integration: Pending</h4>
                      <p className="text-slate-400 text-sm max-w-md mt-1">
                        Supabase connection needed.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowConstructionModal(true)}
                    className="whitespace-nowrap px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-sm w-full md:w-auto"
                  >
                    Activate Integration
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 'lead-capture' && (
              <motion.div
                key="lead-capture"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 md:p-10 bg-white"
              >
                 <div className="max-w-xl mx-auto">
                   <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">Unlock Full Audit Report</h2>
                   <p className="text-slate-600 mb-8 text-center">Please provide your professional details to access your comprehensive, board-ready compliance report.</p>
                   
                   <form onSubmit={handleSubmit(onLeadSubmit)} className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                       <input {...register("fullName", { required: true })} className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:outline-none" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                       <input 
                         {...register("email", { 
                           required: "Email address is required",
                           pattern: {
                             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                             message: "Please enter a valid email address"
                           }
                         })} 
                         className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:outline-none" 
                       />
                       {errors.email && <p className="text-red-500 text-xs mt-1">{(errors.email as any).message}</p>}
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                       <input {...register("companyName", { required: true })} className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:outline-none" />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                         <SearchableDropdown
                           options={COUNTRIES}
                           value={watch('country')}
                           onChange={(val) => setValue('country', val, { shouldValidate: true })}
                           placeholder="Select Country..."
                         />
                         <input type="hidden" {...register('country', { required: true })} />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
                         <SearchableDropdown
                           options={INDUSTRIES}
                           value={watch('industry')}
                           onChange={(val) => setValue('industry', val, { shouldValidate: true })}
                           placeholder="Select Industry..."
                         />
                         <input type="hidden" {...register('industry', { required: true })} />
                       </div>
                     </div>
                     
                     <div className="pt-8 pb-32">
                       <button type="submit" className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-lg">
                         Unlock & Download Full Audit
                       </button>
                     </div>
                   </form>
                 </div>
              </motion.div>
            )}

            {phase === 'pdf-report' && (
              <motion.div
                key="pdf-report"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-8 md:p-12 w-full max-w-4xl mx-auto shadow-sm print:shadow-none print:p-0"
              >
                <div ref={reportRef} className="bg-white" style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
                  {/* PDF Report Header */}
                  <div className="border-b-4 border-slate-900 pb-6 mb-8" style={{ borderColor: '#0f172a' }}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight" style={{ color: '#0f172a' }}>AI Compliance Audit Report</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest mt-1 text-sm" style={{ color: '#64748b' }}>Private & Confidential</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900" style={{ color: '#0f172a' }}>Prepared for: {leadData?.fullName}</p>
                        <p className="text-sm text-slate-600" style={{ color: '#475569' }}>{leadData?.companyName}</p>
                        <p className="text-xs text-slate-400 mt-1" style={{ color: '#94a3b8' }}>{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* PDF Content */}
                  <div className="grid grid-cols-3 gap-8 mb-10">
                    <div className="col-span-1 bg-slate-50 p-6 rounded-xl border border-slate-200" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2" style={{ color: '#64748b' }}>Final Score</p>
                      <p className={`text-6xl font-black ${getRiskCategory().color}`} style={{ color: getRiskCategory().hex }}>{score}</p>
                      <p className="text-sm font-bold mt-2 text-slate-700" style={{ color: '#334155' }}>Risk: {getRiskCategory().label}</p>
                    </div>
                    <div className="col-span-2 space-y-2 text-sm text-slate-700 flex flex-col justify-center" style={{ color: '#334155' }}>
                       <p><strong>Baseline Score:</strong> {baselineScore}%</p>
                       <p className="text-red-600" style={{ color: '#dc2626' }}><strong>Systemic Penalty:</strong> -{penaltyPoints}%</p>
                       {penalizedCategories.length > 0 && (
                          <p className="text-xs text-slate-500 mt-2" style={{ color: '#64748b' }}>Penalties applied for structural gaps in: {penalizedCategories.join(", ")}.</p>
                       )}
                       <p className="mt-4"><strong>Primary Risk Driver:</strong> {getPrimaryGapSection()}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2" style={{ color: '#0f172a', borderColor: '#e2e8f0' }}>Detailed Findings</h3>
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-300" style={{ borderColor: '#cbd5e1' }}>
                          <th className="py-2 font-bold text-slate-700" style={{ color: '#334155' }}>Question</th>
                          <th className="py-2 font-bold text-slate-700 w-24" style={{ color: '#334155' }}>Weight</th>
                          <th className="py-2 font-bold text-slate-700 w-24 text-right" style={{ color: '#334155' }}>Answer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {QUESTIONS.map((q, idx) => (
                          <tr key={idx} style={{ borderTop: idx !== 0 ? '1px solid #f1f5f9' : 'none' }}>
                            <td className="py-3 pr-4 text-slate-800" style={{ color: '#1e293b' }}>{q.text}</td>
                            <td className="py-3 text-slate-500" style={{ color: '#64748b' }}>{q.weight}</td>
                            <td className="py-3 text-right font-semibold text-slate-900" style={{ color: '#0f172a' }}>{answers[idx] || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Print button (hidden on print) */}
                <div className="print:hidden flex justify-center mt-12">
                  <button 
                    onClick={generatePDF}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all"
                  >
                    Download Full Audit Report
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
