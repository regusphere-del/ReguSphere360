import React, { useState } from 'react';
import {
  FolderTree,
  Activity,
  FileCheck2,
  Globe2,
  Building2,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Search,
  ChevronRight,
  Layers,
  Clock,
  Send,
  FileText,
  Sparkles,
  ExternalLink,
  BookmarkCheck,
  BookOpen,
} from 'lucide-react';

export const HomePage = ({
  onNavigate,
  onOpenEnquiry,
  onOpenTracker,
  onOpenReadiness,
}) => {
  const [quickSearchId, setQuickSearchId] = useState('');

  const processSteps = [
    {
      num: '01',
      title: 'Submit Enquiry',
      desc: 'Submit your regulatory scope, dossier specifications, target health authorities, and confidential draft files.',
      icon: Send,
    },
    {
      num: '02',
      title: 'Initial Assessment',
      desc: 'Our Senior RAC consultants evaluate dossier completeness, gap indicators, and regulatory feasibility within 48 hours.',
      icon: Search,
    },
    {
      num: '03',
      title: 'Formal Proposal',
      desc: 'Receive a transparent statement of work (SOW), clear timeline milestones, fixed deliverables, and quotation pricing.',
      icon: FileText,
    },
    {
      num: '04',
      title: 'Engagement & Kick-off',
      desc: 'Execute mutual non-disclosure agreement (NDA), project scoping alignment, and secure encrypted workspace onboarding.',
      icon: Layers,
    },
    {
      num: '05',
      title: 'Delivery & Gateway QA',
      desc: 'Rigorous dossier publishing, eCTD hyperlinking, gap remediation, and health authority electronic validation pass.',
      icon: CheckCircle2,
    },
    {
      num: '06',
      title: 'Post-Filing Follow-up',
      desc: 'Ongoing support during review cycles, Information Request (IR) response drafting, and life-cycle variation management.',
      icon: Clock,
    },
  ];

  const handleQuickTrack = (e) => {
    e.preventDefault();
    if (quickSearchId.trim()) {
      onNavigate('services-license-tracking');
    }
  };

  return (
    <div className="bg-white">
      {/* 4. HOMEPAGE HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-b border-slate-700">
        {/* Subtle CTD & Global Network background graphic elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Pharmaceutical Regulatory Affairs Consultancy & Intelligence</span>
                <span className="text-teal-400">•</span>
                <span className="text-slate-300 font-normal">ICH CTD / eCTD v3.2.2 & v4.0</span>
              </div>

              {/* Exact User Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.14] tracking-tight">
                Your Trusted Partner in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300">
                  Pharmaceutical Regulatory Affairs
                </span>
              </h1>

              {/* Exact User Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                Navigate complex pharmaceutical regulatory requirements with confidence. ReguSphere 360 provides
                regulatory guidance, eCTD knowledge support, documentation consultancy, pharmaceutical license
                tracking, and global regulatory intelligence.
              </p>

              {/* Two Prominent Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('consultancy-services')}
                  className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/25 flex items-center space-x-2"
                >
                  <Layers className="w-4 h-4" />
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('consultation-request')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-sm"
                >
                  <FileCheck2 className="w-4 h-4 text-teal-400" />
                  <span>Request a Consultation</span>
                </button>
              </div>

              {/* Quick License & Filing Tracker Input Widget */}
              <div className="pt-4 max-w-xl">
                <form
                  onSubmit={handleQuickTrack}
                  className="p-2 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={quickSearchId}
                      onChange={(e) => setQuickSearchId(e.target.value)}
                      placeholder="Lookup License / Application ID (e.g. LIC-2026-MFG-882)..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 font-mono focus:outline-none focus:border-teal-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                  >
                    Track Status
                  </button>
                </form>
                <div className="flex items-center space-x-2 mt-2 text-[10px] text-slate-400">
                  <span>Try test ID:</span>
                  <button
                    onClick={() => {
                      setQuickSearchId('LIC-2026-MFG-882');
                      onNavigate('services-license-tracking');
                    }}
                    className="text-teal-400 underline font-mono"
                  >
                    LIC-2026-MFG-882
                  </button>
                  <span>•</span>
                  <span>CDSCO, State FDA, US FDA, EMA</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Regulatory Visual Element */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="p-6 rounded-3xl bg-slate-800/90 border border-slate-700 shadow-2xl relative space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center space-x-2">
                    <img src="/logo.jpg" alt="ReguSphere 360" className="w-8 h-8 rounded-lg object-contain bg-white p-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">ReguSphere 360 Ecosystem</span>
                      <span className="text-[10px] text-teal-400">ICH CTD • CMC • Quality Systems • GxP</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    Audit Verified
                  </span>
                </div>

                {/* Subtle CTD Tree & Gateway Spec Visualization */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 font-mono text-[11px] space-y-2 text-slate-300">
                  <div className="flex items-center justify-between text-teal-300 font-bold">
                    <span>📁 eCTD Dossier Assembly</span>
                    <span className="text-[10px] text-emerald-400">✓ DTD 3.2.2 Validated</span>
                  </div>
                  <div className="pl-3 border-l border-slate-700 space-y-1 text-slate-400 text-[10px]">
                    <div>├─ 📄 Module 1: Administrative (FDA 356h / Form 44)</div>
                    <div>├─ 📄 Module 2: QOS & Nonclinical/Clinical Overviews</div>
                    <div>├─ 📄 Module 3: Quality (3.2.S Drug Substance & 3.2.P)</div>
                    <div>├─ 📄 Module 4: Nonclinical Study Reports (OECD GLP)</div>
                    <div>└─ 📄 Module 5: Clinical Reports & BE Studies (GCP)</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                    <span className="text-base font-black text-teal-400 block">99.4%</span>
                    <span className="text-[10px] text-slate-400">First-Cycle Acceptance</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                    <span className="text-base font-black text-white block">8 Lic. Types</span>
                    <span className="text-[10px] text-slate-400">Real-Time Follow-up</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 text-center">
                  Independent technical guidance for pharmacy professionals, manufacturers, and startups.
                </p>
              </div>
            </div>
          </div>

          {/* Key Standards Ribbon */}
          <div className="mt-14 pt-8 border-t border-slate-700/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-300 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-xl font-black text-white block">ICH M4 & eCTD</span>
              <span className="text-[11px] text-slate-400">Module 1-5 XML DTD v3.2.2 & v4.0</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-xl font-black text-white block">License Tracker</span>
              <span className="text-[11px] text-slate-400">7 Statuses & 45-day Renewal Alerts</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-xl font-black text-white block">CDSCO & Global</span>
              <span className="text-[11px] text-slate-400">FDA, EMA, MHRA, PMDA & TGA</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-xl font-black text-white block">21 CFR Part 11</span>
              <span className="text-[11px] text-slate-400">Strict Mutual NDA Confidentiality</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONSULTANCY SERVICES: 6 DEDICATED CATEGORIES */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold mb-3">
              <span>Core Consultancy Verticals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Six Comprehensive Regulatory Practices
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Tailored solutions designed for pharmaceutical sponsors, generic manufacturers, biotech innovators,
              pharmacy students, and regulatory affairs departments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. eCTD & Regulatory Submission Consultancy */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <FolderTree className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                  Practice Category A
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  eCTD & Regulatory Submission Consultancy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Professional guidance on Electronic Common Technical Document (eCTD) specifications, Modules 1–5
                  dossier organization, lifecycle sequences (0000 to nnnn), and technical gateway validation.
                </p>
                <div className="space-y-1.5 mb-6 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>CTD Modules 1 to 5 granular taxonomy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>XML backbone & DTD 3.2.2 / v4.0 specs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>US FDA ESG, EMA CESP, CDSCO SUGAM</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('services-ectd')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Explore eCTD Service</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('eCTD Consultancy')}
                  className="w-full py-2 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs transition-colors"
                >
                  Request Consultation
                </button>
              </div>
            </div>

            {/* 2. Pharmaceutical License Tracking */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                  Practice Category B
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Pharmaceutical License Tracking & Follow-up
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Real-time monitoring of drug manufacturing, wholesale, loan, import, medical device, cosmetics,
                  and clinical trial licenses with deficiency tracking and 45-day pre-expiry renewal alerts.
                </p>
                <div className="space-y-1.5 mb-6 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Interactive 7-milestone status dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Statutory renewal cut-off countdowns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Authority query follow-up guidance</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('services-license-tracking')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Open Tracking Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('License Tracking')}
                  className="w-full py-2 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs transition-colors"
                >
                  Request Tracking Assistance
                </button>
              </div>
            </div>

            {/* 3. Regulatory Documentation Consultancy */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <FileCheck2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  Practice Category C
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Regulatory Documentation Consultancy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Full-scope document authoring, formatting, and gap review covering Site Master Files (SMF), MFR, BMR,
                  Standard Operating Procedures (SOPs), CAPA, APQR, and regulatory variations.
                </p>
                <div className="space-y-1.5 mb-6 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>13 Core pharmaceutical document types</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>GxP SOP & 21 CFR Part 11 document controls</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Comprehensive gap assessments & RTF mitigation</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('documentation')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Explore Documentation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('Regulatory Documentation')}
                  className="w-full py-2 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition-colors"
                >
                  Request Document Review
                </button>
              </div>
            </div>

            {/* 4. Global Regulatory Intelligence */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
                  <Globe2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                  Practice Category D
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Global Regulatory Intelligence & Guidance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Multi-jurisdictional intelligence across India (CDSCO), United States (FDA), Europe (EMA),
                  UK (MHRA), Japan (PMDA), Australia (TGA), Canada, WHO, and ICH guidelines with verified updates.
                </p>
                <div className="space-y-1.5 mb-6 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Comparative regulatory pathway roadmaps</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Continuous health authority guideline monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Post-approval change classification guidance</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('intelligence')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Explore Intelligence</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('Global Regulatory Intelligence')}
                  className="w-full py-2 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-bold text-xs transition-colors"
                >
                  Request Intelligence Brief
                </button>
              </div>
            </div>

            {/* 5. Pharmaceutical Licensing Guidance */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  Practice Category E
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Pharmaceutical Licensing & Approval Guidance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Comprehensive educational guidance on obtaining drug manufacturing licenses (Form 25/28), wholesale
                  (20B/21B), loan licenses, import certificates, medical device registrations, and new drug approvals.
                </p>
                <div className="space-y-1.5 mb-6 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Manufacturing layout & HVAC compliance checks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Medical Device Rules 2017 Class A–D pathways</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Step-by-step statutory document checklists</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('services-licensing-guidance')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Explore Licensing Guidance</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('Pharmaceutical Licensing Guidance')}
                  className="w-full py-2 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs transition-colors"
                >
                  Request Licensing Roadmap
                </button>
              </div>
            </div>

            {/* 6. Regulatory Education & Corporate Training */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-rose-500 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                  Practice Category F
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Regulatory Education & Corporate Training
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Professional development training for students, fresh regulatory executives, and corporate pharma
                  teams. Real-world eCTD publishing labs, GxP masterclasses, and certified quizzes.
                </p>
                <div className="space-y-1.5 mb-6 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>CTD/eCTD dossier preparation masterclasses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>CDSCO, FDA, EMA & GMP comparative training</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Corporate customized on-site & virtual cohorts</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('education')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Explore Training</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('Regulatory Education & Training')}
                  className="w-full py-2 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-bold text-xs transition-colors"
                >
                  Book Training Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-STEP SYSTEMATIC CONSULTANCY PROCESS */}
      <section id="process" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold mb-3">
              <span>Systematic Engagement Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 6-Step Consultancy Process
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Every client engagement follows a structured, transparent, GxP-governed pathway from initial scoping
              to post-submission health authority query resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all relative group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-teal-600 font-mono transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white text-teal-700 border border-slate-200 flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-sm font-bold">Ready to scope your regulatory timeline?</p>
              <p className="text-xs text-slate-400">
                Engage senior RAC consultants for confidential gap assessments and eCTD publishing.
              </p>
            </div>
            <button
              onClick={() => onNavigate('consultation-request')}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-md flex-shrink-0"
            >
              Start Step 1: Submit Consultation Request
            </button>
          </div>
        </div>
      </section>

      {/* EDUCATION HUB PROMO BANNER */}
      <section className="py-14 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education Hub — Now Live</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-500/30 border border-teal-400/30 font-black">NEW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                ReguSphere 360{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                  Education Hub
                </span>
              </h2>
              <p className="text-slate-300 text-base mb-2 font-medium italic">
                "Learn. Explore. Understand. Excel in Pharmaceutical Regulatory Affairs."
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Your dedicated learning destination for pharmaceutical regulatory knowledge — ICH guidelines, learning pathways for B.Pharm, M.Pharm RA, Pharm.D students and industry professionals, a full RA glossary, and a self-assessment quiz.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('education-hub')}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-teal-500/20"
                >
                  <BookOpen className="w-4 h-4" />
                  Explore Education Hub
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('education-hub')}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Take the RA Quiz
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Learning Pathways', desc: 'B.Pharm, M.Pharm RA, Pharm.D & Professional tracks', icon: GraduationCap, color: 'teal' },
                { label: 'ICH Guideline Library', desc: '20+ harmonized Q, S, E & M guidelines with direct links', icon: FileText, color: 'indigo' },
                { label: 'RA Topic Library', desc: 'Drug development, CTD writing, GxP & global agencies', icon: BookOpen, color: 'amber' },
                { label: 'RA Glossary + Quiz', desc: '22-term A–Z glossary and 10-question self-assessment', icon: Sparkles, color: 'rose' },
              ].map((card, i) => {
                const CardIcon = card.icon;
                return (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10 hover:bg-white/12 transition-colors cursor-pointer" onClick={() => onNavigate('education-hub')}>
                    <CardIcon className="w-5 h-5 text-teal-400 mb-2" />
                    <p className="text-xs font-bold text-white mb-1">{card.label}</p>
                    <p className="text-[10px] text-slate-400 leading-tight">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. TRUST, TRANSPARENCY & STATUTORY DISCLAIMER SECTION */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Trust, Transparency & Compliance Governance Statement</span>
            </div>

            {/* Exact Required Disclaimer */}
            <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 text-slate-800 leading-relaxed font-medium">
              "ReguSphere 360 provides pharmaceutical regulatory education, consultancy, documentation guidance,
              and application tracking assistance. Regulatory approvals, licensing decisions, and statutory permissions
              are issued exclusively by the competent regulatory authorities. We do not guarantee regulatory approvals
              or represent ourselves as a government authority."
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-500 pt-2">
              <p>
                <strong>Confidentiality Policy:</strong> All client data, drug master files, clinical study records,
                and proprietary formulations are safeguarded under mutual Non-Disclosure Agreements (NDAs) and 21 CFR Part 11
                electronic data integrity controls.
              </p>
              <p>
                <strong>Data Verification Standards:</strong> All license tracking information displayed on this portal
                is derived strictly from verified client-provided disclosures and authorized regulatory communiqués. No direct
                unauthorized government database integration is implied.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
