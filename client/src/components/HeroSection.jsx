import React from 'react';
import {
  ShieldCheck,
  FileText,
  FileCheck2,
  CheckCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  Award,
  Globe,
} from 'lucide-react';

export const HeroSection = ({ onOpenEnquiry, onOpenReadiness, onOpenTracker }) => {
  return (
    <div className="relative overflow-hidden pt-12 pb-20 border-b border-slate-900">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-sm shadow-emerald-500/10">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Core Service 1: Regulatory Documentation Consultancy</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-normal">ICH eCTD v3.2.2 & v4.0 Ready</span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Elite Pharmaceutical{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Regulatory Documentation
            </span>{' '}
            Consultancy
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
            Helping pharma enterprises, biotech startups, and CROs structure, audit, and accelerate flawless
            ICH CTD/eCTD dossiers, SOP controls, and post-approval lifecycle documentation with guaranteed
            agency compliance.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenEnquiry}
            className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-emerald-500/25 active:scale-95"
          >
            <FileCheck2 className="w-4 h-4 stroke-[2.4]" />
            <span>Request Documentation Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenReadiness}
            className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/40 text-slate-200 hover:text-white font-medium text-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Submission Readiness Self-Audit</span>
          </button>

          <button
            onClick={onOpenTracker}
            className="flex items-center space-x-2 px-4 py-3.5 text-slate-400 hover:text-emerald-400 text-sm font-medium transition-colors"
          >
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Track Live Project Enquiry</span>
          </button>
        </div>

        {/* Trust Metrics Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-800/80">
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-2xl font-black text-white">99.4%</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">First-Cycle Health Authority Acceptance</p>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-teal-400 mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-2xl font-black text-white">450+</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">eCTD Dossiers Structured & Audited</p>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Globe className="w-4 h-4" />
              <span className="text-2xl font-black text-white">18+</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Global Regulatory Agencies (FDA, EMA, HC, CDSCO)</p>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-brand-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-2xl font-black text-white">100%</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">21 CFR Part 11 & GxP Confidentiality</p>
          </div>
        </div>
      </div>
    </div>
  );
};
