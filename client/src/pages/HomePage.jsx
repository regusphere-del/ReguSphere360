import React from 'react';
import {
  FileCheck2,
  Globe2,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Search,
  ChevronRight,
  Activity,
  Award,
  Layers,
  Clock,
  Send,
  FileText,
  HelpCircle,
} from 'lucide-react';

export const HomePage = ({
  onNavigate,
  onOpenEnquiry,
  onOpenTracker,
  onOpenReadiness,
}) => {
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

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-6">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Independent Pharmaceutical Regulatory Affairs Consultancy</span>
                <span className="text-teal-400">•</span>
                <span className="text-slate-600 font-normal">ICH CTD / eCTD v3.2.2 & v4.0</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                  Strategic Pharmaceutical{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600">
                    Regulatory Affairs
                  </span>{' '}
                  Consultancy & Intelligence
                </h1>

                <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                  Empowering pharmaceutical enterprises, biotech startups, and life science professionals with
                  flawless ICH CTD/eCTD documentation, global regulatory intelligence across India and international
                  markets, and corporate regulatory training.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:flex justify-center">
              <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-[280px]">
                <img
                  src="/logo.jpg"
                  alt="ReguSphere 360 Ecosystem"
                  className="w-full h-auto rounded-2xl object-contain hover:scale-105 transition-transform duration-300"
                />
                <div className="mt-3 text-center">
                  <span className="text-[11px] font-bold text-slate-800 block">The ReguSphere 360 Ecosystem</span>
                  <span className="text-[10px] text-teal-700 font-semibold">Pharma • CMC • Quality • Global • Compliance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three Prominent Required Calls to Action */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenEnquiry(null)}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm transition-all shadow-md active:scale-95"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Request a Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('documentation')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-sm active:scale-95"
            >
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Explore Regulatory Services</span>
            </button>

            <button
              onClick={() => onNavigate('education')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm transition-all border border-slate-300 shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>Explore Training</span>
            </button>
          </div>

          {/* Key Authority Standards Bar */}
          <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-slate-700">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-2xl font-black text-slate-900 block">99.4%</span>
              <span className="text-xs text-slate-500 font-medium">First-Cycle Electronic Gateway Acceptance</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-2xl font-black text-slate-900 block">450+</span>
              <span className="text-xs text-slate-500 font-medium">ICH CTD / eCTD Dossiers Audited</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-2xl font-black text-slate-900 block">6 Core Jurisdictions</span>
              <span className="text-xs text-slate-500 font-medium">CDSCO, FDA, EMA, MHRA, PMDA & ASEAN</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-2xl font-black text-slate-900 block">100% GxP</span>
              <span className="text-xs text-slate-500 font-medium">21 CFR Part 11 & Strict Confidentiality</span>
            </div>
          </div>
        </div>
      </section>

      {/* THREE VISUALLY DISTINCT SERVICE CARDS SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold mb-3">
              <span>Core Consultancy Verticals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three Comprehensive Regulatory Practices
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Tailored solutions designed for pharmaceutical sponsors, generic manufacturers, biotech innovators,
              and regulatory affairs professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1: Regulatory Documentation Consultancy */}
            <div className="executive-card rounded-2xl p-8 flex flex-col justify-between border-t-4 border-t-teal-600">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-6">
                  <FileCheck2 className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Practice 01</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium">ICH CTD / eCTD</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Regulatory Documentation Consultancy
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Organise, write, and audit regulatory documentation with precision. Specialized in Modules 1–5
                  dossier architecture, pre-submission gap analysis, GxP SOP governance, and electronic gateway readiness.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-4 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>ICH CTD/eCTD dossier structure & document indexing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>Pre-submission regulatory gap assessments & RTF mitigation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>SOP preparation, review & 21 CFR Part 11 document control</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>Module 2 Quality Overall Summary (QOS) regulatory writing</span>
                  </div>
                </div>
              </div>

              {/* Two Required Actions */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('documentation')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Service</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('Regulatory Documentation Consultancy')}
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>

            {/* Card 2: Global Regulatory Intelligence */}
            <div className="executive-card rounded-2xl p-8 flex flex-col justify-between border-t-4 border-t-blue-600">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
                  <Globe2 className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Practice 02</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium">Verified Agency Sources</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Global Regulatory Intelligence
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Research, guidance, and continuous guideline monitoring across India (CDSCO), United States (FDA),
                  Europe (EMA), United Kingdom (MHRA), Japan (PMDA), and ASEAN markets with verified citations.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-4 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>India: CDSCO SUGAM, Revised Schedule M cGMP & NDCT Rules</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>US FDA: 21 CFR 314/601, PDUFA/GDUFA & eCTD v5.3 specs</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Europe & UK: EMA CTR EU 536/2014 & MHRA IRP procedures</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Custom regulatory research reports & impact assessments</span>
                  </div>
                </div>
              </div>

              {/* Two Required Actions */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('intelligence')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Service</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('Global Regulatory Intelligence')}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>

            {/* Card 3: Regulatory Education & Corporate Training */}
            <div className="executive-card rounded-2xl p-8 flex flex-col justify-between border-t-4 border-t-amber-600">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6">
                  <GraduationCap className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Practice 03</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium">Industry-Oriented Education</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Regulatory Education & Training
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Professional development workshops for students, freshers, working professionals, and corporate
                  pharma teams. Hands-on eCTD publishing labs, GxP compliance, and case study masterclasses.
                </p>

                <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-4 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>CTD/eCTD dossier preparation practical masterclasses</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>CDSCO, FDA, EMA, ICH & GMP comparative training</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Corporate customized on-site & virtual programmes</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Interactive regulatory quizzes & Certificates of Completion</span>
                  </div>
                </div>
              </div>

              {/* Two Required Actions */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('education')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Service</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('Regulatory Education & Corporate Training')}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLEAR 6-STEP PROCESS SECTION */}
      <section id="process" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold mb-3">
              <span>Systematic Engagement Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 6-Step Consultancy Process
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
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
              onClick={() => onOpenEnquiry(null)}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-md flex-shrink-0"
            >
              Start Step 1: Submit Enquiry
            </button>
          </div>
        </div>
      </section>

      {/* COMPLIANCE & TRUST GOVERNANCE SECTION */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Professional Regulatory Consultancy Disclaimer & Governance Statement</span>
            </div>
            <p className="leading-relaxed">
              <strong>Scope of Consultancy:</strong> ReguSphere 360 operates as an independent technical advisory
              firm providing pharmaceutical regulatory affairs guidance, document auditing, dossier formatting,
              and training. ReguSphere 360 is not a government agency, official regulatory authority, or accredited
              degree-granting institution.
            </p>
            <p className="leading-relaxed">
              <strong>Health Authority Authority:</strong> All final regulatory decisions, marketing authorizations,
              approvals, clearances, and license grants belong exclusively to the sovereign health authorities (e.g.,
              US FDA, EMA, CDSCO, Health Canada, MHRA, PMDA). No consultancy firm can guarantee regulatory approval.
            </p>
            <p className="leading-relaxed">
              <strong>Confidentiality & Compliance:</strong> All client data, drug master files, clinical study data,
              and proprietary documentation are safeguarded under legally binding Non-Disclosure Agreements (NDAs),
              strict 21 CFR Part 11 electronic data integrity controls, and GxP standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
