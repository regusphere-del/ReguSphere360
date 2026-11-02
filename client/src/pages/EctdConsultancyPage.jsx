import React, { useState } from 'react';
import {
  FileCheck2,
  FolderTree,
  FileCode,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileText,
  Clock,
  Compass,
  Cpu,
  Globe2,
} from 'lucide-react';

export const EctdConsultancyPage = ({ onOpenEnquiry, onNavigate }) => {
  const [activeModule, setActiveModule] = useState(1);
  const [activeTab, setActiveTab] = useState('structure'); // 'structure' | 'lifecycle' | 'formatting' | 'validation'

  const ctdModules = [
    {
      module: 1,
      name: 'Module 1: Regional Administrative Information',
      badge: 'Regional Specification',
      tagline: 'Prescribing information, application forms & administrative legalities',
      color: 'teal',
      description:
        'Contains region-specific documents not harmonized across ICH. Varies significantly by health authority (e.g., FDA Form 356h, EMA Annex 1, CDSCO Form 44).',
      sections: [
        '1.0 Regional Administrative Forms (FDA 356h, EMA Application Form)',
        '1.2 Cover Letter & Regulatory Pathway Justification',
        '1.3 Prescribing Information, Package Leaflet (PIL) & SmPC',
        '1.4 Letters of Authorization (LoA) for DMFs & ASMFs',
        '1.5 Specific Regional Requirements (Pediatric Plans, Environmental Risk)',
      ],
      authorities: 'CDSCO (India), US FDA (USA), EMA (EU), Health Canada, TGA (Australia)',
    },
    {
      module: 2,
      name: 'Module 2: Common Technical Document Summaries',
      badge: 'ICH Harmonized',
      tagline: 'High-level scientific overviews & expert summaries',
      color: 'blue',
      description:
        'Crucial executive summaries prepared by qualified scientific experts. Reviewers rely heavily on Module 2 to evaluate benefit-risk profile before diving into raw study data.',
      sections: [
        '2.1 CTD Table of Contents',
        '2.2 CTD Introduction & Molecule Pharmacology Class',
        '2.3 Quality Overall Summary (QOS) - Drug Substance & Drug Product',
        '2.4 Nonclinical Overview (Pharmacology, PK, Toxicology)',
        '2.5 Clinical Overview (Biopharmaceutics, Clinical Efficacy & Safety)',
        '2.6 Nonclinical Written and Tabulated Summaries',
        '2.7 Clinical Summary of Efficacy and Safety',
      ],
      authorities: 'ICH M4 Harmonized (Global Standard)',
    },
    {
      module: 3,
      name: 'Module 3: Quality (Chemistry, Manufacturing & Controls - CMC)',
      badge: 'Critical CMC',
      tagline: 'Comprehensive Drug Substance (DS) & Drug Product (DP) data',
      color: 'indigo',
      description:
        'The technical cornerstone of pharmaceutical filings. Covers drug substance synthesis, characterization, excipients, manufacturing process validation, and stability profiles.',
      sections: [
        '3.2.S Drug Substance (General Info, Manufacture, Characterization, Control, Reference Standards, Container Closure, Stability)',
        '3.2.P Drug Product (Description & Composition, Pharmaceutical Development, Manufacture, Control of Excipients, Control of Drug Product, Stability)',
        '3.2.A Appendices (Facilities & Equipment, Adventitious Agents Safety Evaluation)',
        '3.2.R Regional Information (Executed Batch Records, Process Validation)',
      ],
      authorities: 'ICH Q1A-Q14 Quality Guidelines Compliant',
    },
    {
      module: 4,
      name: 'Module 4: Nonclinical Study Reports',
      badge: 'Preclinical Safety',
      tagline: 'In vitro and in vivo nonclinical animal safety studies',
      color: 'amber',
      description:
        'Provides all nonclinical study reports demonstrating pharmacological mechanism of action, pharmacokinetics, and toxicological safety profiles under GLP standards.',
      sections: [
        '4.2.1 Pharmacology (Primary & Secondary Pharmacodynamics, Safety Pharmacology)',
        '4.2.2 Pharmacokinetics (Analytical Methods, Absorption, Distribution, Metabolism, Excretion)',
        '4.2.3 Toxicology (Single-Dose, Repeat-Dose, Genotoxicity, Carcinogenicity, Reproductive Toxicity)',
      ],
      authorities: 'ICH S1-S11 Safety Guidelines & OECD GLP',
    },
    {
      module: 5,
      name: 'Module 5: Clinical Study Reports (CSR)',
      badge: 'Clinical Evidence',
      tagline: 'Human clinical trials, bioequivalence & pharmacovigilance',
      color: 'purple',
      description:
        'Contains all clinical study reports and related information, including bioavailability/bioequivalence (BA/BE) studies, Phase I-III clinical trial protocols, and safety logs.',
      sections: [
        '5.2 Tabular Listing of All Clinical Studies',
        '5.3.1 Biopharmaceutic Study Reports (Comparative BA/BE Studies)',
        '5.3.2 Studies Pertinent to PK Using Human Biomaterials',
        '5.3.3 Human Pharmacokinetic (PK) Studies',
        '5.3.4 Human Pharmacodynamic (PD) Studies',
        '5.3.5 Efficacy and Safety Studies (Controlled Phase II/III Trials)',
        '5.3.6 Reports of Postmarketing Experience & Periodic Safety (PSUR)',
      ],
      authorities: 'ICH E1-E20 Efficacy Guidelines & GCP (ICH E6 R2/R3)',
    },
  ];

  const consultationOptions = [
    {
      id: 'opt1',
      title: '1. eCTD Educational Consultation',
      audience: 'Students, Fresh Regulatory Trainees & Academic Teams',
      desc: 'One-on-one structured knowledge sessions covering CTD/eCTD fundamentals, XML DTD schemas, regional variations, and career regulatory readiness.',
      deliverable: 'Educational syllabus, module roadmaps, CTD glossary & completion certificate.',
      action: 'Book Educational Session',
    },
    {
      id: 'opt2',
      title: '2. Regulatory Dossier Preparation Guidance',
      audience: 'Pharmaceutical Manufacturers & Startup Sponsors',
      desc: 'Expert guidance on structuring raw batch records, analytical reports, and stability data into granular ICH Module 1–5 compliant formats.',
      deliverable: 'Granular document taxonomy plan, table of contents structure & hyperlinking matrix.',
      action: 'Request Dossier Guidance',
    },
    {
      id: 'opt3',
      title: '3. eCTD Documentation Review Support',
      audience: 'Regulatory Affairs Departments & Quality Heads',
      desc: 'Rigorous peer review of Module 2 summaries and Module 3 CMC dossiers to detect scientific ambiguities, formatting faults, and citation errors.',
      deliverable: 'Line-by-line deficiency audit log with Red/Amber/Green severity scores.',
      action: 'Request Review Support',
    },
    {
      id: 'opt4',
      title: '4. Regulatory Submission Process Guidance',
      audience: 'Sponsors Planning US FDA, EMA or CDSCO Filings',
      desc: 'Step-by-step guidance on gateway setup requirements, ESG transmission protocols, sequence planning (0000 to nnnn), and response to agency queries.',
      deliverable: 'Submission readiness validation checklist & regulatory timeline schedule.',
      action: 'Request Process Guidance',
    },
  ];

  const validationChecks = [
    {
      type: 'Pass / Technical Green',
      rule: 'XML Schema & DTD Conformity',
      desc: 'Valid index.xml, correct regional DTD version (e.g. US FDA v3.3, EU v3.0.4), valid checksum (MD5) for all files.',
    },
    {
      type: 'Pass / Technical Green',
      rule: 'PDF Specifications (PDF/A)',
      desc: 'PDF version 1.4 to 1.7, Fast Web View enabled, all fonts embedded, bookmarks present on documents > 4 pages.',
    },
    {
      type: 'Warning / Review Caution',
      rule: 'Hyperlink Consistency',
      desc: 'Internal links resolve properly with relative pathing; no absolute file paths pointing to sponsor local drives.',
    },
    {
      type: 'Error / Refuse-to-File (RTF)',
      rule: 'Unreferenced Leaf Files',
      desc: 'Files existing in directory structure but missing from index.xml, or broken references triggering gateway rejection.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden border-b border-slate-700">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6">
            <FolderTree className="w-4 h-4 text-teal-400" />
            <span>Consultancy Practice Category A</span>
            <span>•</span>
            <span>ICH eCTD v3.2.2 & ISO/HL7 eCTD v4.0</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                eCTD & Regulatory Submission Consultancy
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
                Comprehensive professional guidance on Electronic Common Technical Document (eCTD) specifications,
                dossier architecture across Modules 1–5, sequence planning, lifecycle management, and pre-submission
                validation for US FDA, EMA, CDSCO, and international health authorities.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenEnquiry('eCTD Consultancy')}
                  className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 flex items-center space-x-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Request eCTD Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('options-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  View 4 Consultation Options
                </button>
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-xs font-mono text-teal-400 font-bold">eCTD Dossier Tree Architecture</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    XML DTD 3.2.2
                  </span>
                </div>
                <div className="font-mono text-xs space-y-2 text-slate-300">
                  <div className="flex items-center space-x-2 text-teal-300 font-bold">
                    <span>📁 0000/</span>
                    <span className="text-[10px] text-slate-400">(Original Sequence)</span>
                  </div>
                  <div className="pl-4 space-y-1.5 border-l border-slate-700 text-[11px]">
                    <div>📄 index.xml (MD5 Checksum Verified)</div>
                    <div>📁 m1/ (Regional Administrative Info)</div>
                    <div>📁 m2/ (CTD Summaries & Overviews)</div>
                    <div>📁 m3/ (Quality / CMC - Substance & Product)</div>
                    <div>📁 m4/ (Nonclinical Study Reports)</div>
                    <div>📁 m5/ (Clinical Study Reports)</div>
                    <div>📄 index-md5.txt</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700 text-[10px] text-slate-400">
                  Validated against US FDA ESG & EMA eSubmission Gateway specifications.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distinction & Transparency Notice */}
      <section className="bg-amber-50 border-b border-amber-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start space-x-3 text-xs text-amber-900 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Educational & Review Scope Notice:</span> ReguSphere 360 provides
            specialized educational guidance, dossier preparation roadmaps, and technical review support. Official
            electronic submission accounts (such as US FDA Electronic Submissions Gateway ESG accounts, EMA CESP,
            or CDSCO SUGAM portals) are managed directly by marketing authorization applicants and sponsors. Final
            approvals and statutory permissions remain the exclusive prerogative of the respective health authorities.
          </div>
        </div>
      </section>

      {/* 4 Dedicated Consultation Options */}
      <section id="options-section" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
              Tailored Consultation Paths
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Four eCTD Consultation Service Options
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Select the engagement model that matches your organization’s submission maturity and regulatory objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consultationOptions.map((opt) => (
              <div
                key={opt.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {opt.audience}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{opt.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{opt.desc}</p>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 mb-6">
                    <span className="font-bold text-slate-900 block mb-1">Key Deliverable:</span>
                    <span>{opt.deliverable}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenEnquiry(opt.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>{opt.action}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive CTD Module 1 to 5 Deep-Dive Explorer */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
              ICH CTD Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Explore CTD Modules 1 to 5 in Granular Detail
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Click each module below to view technical structure, required documentation, and agency alignment.
            </p>
          </div>

          {/* Module Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
            {ctdModules.map((m) => (
              <button
                key={m.module}
                onClick={() => setActiveModule(m.module)}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                  activeModule === m.module
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-teal-500'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] text-teal-400 uppercase font-mono">Module 0{m.module}</span>
                <span className="truncate block mt-0.5">{m.name.split(':')[1]?.trim() || m.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Module Detail Card */}
          {(() => {
            const currentMod = ctdModules.find((m) => m.module === activeModule);
            return (
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">
                      Module {currentMod.module} Overview
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">{currentMod.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{currentMod.tagline}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold self-start">
                    {currentMod.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">{currentMod.description}</p>
                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block mb-2">
                        Target Health Authority Alignment:
                      </span>
                      <p className="text-xs text-slate-600">{currentMod.authorities}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Core Granular Sections:
                    </span>
                    <div className="space-y-2 text-xs text-slate-600">
                      {currentMod.sections.map((sec, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{sec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Technical eCTD Execution Tabs: Lifecycle, Formatting, Validation */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
              Technical Procedures
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              eCTD Lifecycle, Formatting & Technical Validation
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From sequence planning to electronic gateway pass, explore how professional regulatory submissions are executed.
            </p>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex justify-center space-x-2 mb-8">
            <button
              onClick={() => setActiveTab('structure')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'structure' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              XML Backbone & DTD 3.2.2 / v4.0
            </button>
            <button
              onClick={() => setActiveTab('lifecycle')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'lifecycle' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Lifecycle Sequences (0000 - nnnn)
            </button>
            <button
              onClick={() => setActiveTab('formatting')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'formatting' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              PDF/A Specifications & Hyperlinking
            </button>
            <button
              onClick={() => setActiveTab('validation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'validation' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Gateway Technical Validation Checks
            </button>
          </div>

          {/* Tab 1: XML & DTD */}
          {activeTab === 'structure' && (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">XML Backbone & Schema Compliance</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  An eCTD sequence is driven by an electronic backbone (<strong>index.xml</strong>) that defines
                  every leaf file, checksum, and lifecycle attribute. Regional specifications (e.g., US regional.xml
                  or EU regional.xml) manage administrative documents.
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span><strong>eCTD v3.2.2:</strong> Dominant standard for US FDA, EMA, Health Canada, TGA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span><strong>eCTD v4.0 (ISO/HL7):</strong> Next-generation standard with two-way communication</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span><strong>MD5 Checksums:</strong> Verifies complete bitwise data integrity across transmission</span>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-slate-900 text-teal-300 font-mono text-[11px] leading-relaxed overflow-x-auto">
                <p className="text-slate-500">// Sample index.xml leaf snippet</p>
                <p>&lt;ectd:ectd xmlns:ectd="http://www.ich.org/ectd"&gt;</p>
                <p className="pl-4">&lt;m3-quality&gt;</p>
                <p className="pl-8">&lt;m3-2-s-drug-substance&gt;</p>
                <p className="pl-12">&lt;leaf ID="leaf-001" operation="new"&gt;</p>
                <p className="pl-16">&lt;title&gt;General Information - Nomenclature&lt;/title&gt;</p>
                <p className="pl-16">&lt;xlink:href&gt;m3/32-body-data/32s-drug-sub/general-info.pdf&lt;/xlink:href&gt;</p>
                <p className="pl-16">&lt;checksum&gt;d41d8cd98f00b204e9800998ecf8427e&lt;/checksum&gt;</p>
                <p className="pl-12">&lt;/leaf&gt;</p>
                <p className="pl-8">&lt;/m3-2-s-drug-substance&gt;</p>
                <p className="pl-4">&lt;/m3-quality&gt;</p>
                <p>&lt;/ectd:ectd&gt;</p>
              </div>
            </div>
          )}

          {/* Tab 2: Lifecycle */}
          {activeTab === 'lifecycle' && (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">eCTD Sequence Planning & Lifecycle Management</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  eCTD is cumulative. Each subsequent sequence (0001, 0002, ...) updates previous documents using lifecycle
                  operators (New, Replace, Delete, Append) without re-submitting untouched documents.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono font-bold text-teal-700 block text-base mb-1">Seq 0000</span>
                  <span className="font-bold text-slate-900 block mb-1">Original Application</span>
                  <p className="text-slate-600 text-[11px]">
                    Complete initial baseline filing (IND, NDA, ANDA, BLA, or MAA) with all 5 modules.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono font-bold text-blue-700 block text-base mb-1">Seq 0001</span>
                  <span className="font-bold text-slate-900 block mb-1">Response to Queries (IR)</span>
                  <p className="text-slate-600 text-[11px]">
                    Answers to Information Requests with replaced analytical validation reports.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono font-bold text-indigo-700 block text-base mb-1">Seq 0002</span>
                  <span className="font-bold text-slate-900 block mb-1">Post-Approval Variation</span>
                  <p className="text-slate-600 text-[11px]">
                    Type IA/IB or Type II manufacturing site addition or shelf-life extension.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono font-bold text-amber-700 block text-base mb-1">Seq 0003</span>
                  <span className="font-bold text-slate-900 block mb-1">Annual Reports / PSUR</span>
                  <p className="text-slate-600 text-[11px]">
                    Periodic safety updates and commercial manufacturing stability commitments.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Formatting */}
          {activeTab === 'formatting' && (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Technical Document Formatting Standards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-2">PDF/A & Fast Web View</span>
                  <p className="text-slate-600 leading-relaxed">
                    All dossier documents must be rendered in Adobe PDF version 1.4 to 1.7. PDF Fast Web View must be enabled
                    so regulatory agency reviewers can view multi-hundred page documents instantly page-by-page.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-2">Font Embedding & Margins</span>
                  <p className="text-slate-600 leading-relaxed">
                    100% font embedding (Arial, Times New Roman, Courier New). Consistent page orientation, minimum
                    0.75-inch margins, and searchable text layers (OCR verified for historical scans).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-2">Bookmarks & Hyperlinks</span>
                  <p className="text-slate-600 leading-relaxed">
                    Required for documents exceeding 4 pages. Maximum bookmark nesting of 4 levels. Relative intra-dossier
                    hyperlinks (e.g. referencing Module 3 CMC from Module 2.3 QOS summary).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Validation */}
          {activeTab === 'validation' && (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">eCTD Technical Validation Rules (Pass, Warning, Error)</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                Health authority electronic gateways enforce automated validation checks using tools like Lorenz, Extedo,
                and FDA ESG criteria. An error causes immediate Refuse-to-File (RTF) rejection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {validationChecks.map((v, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-2 ${
                        v.type.includes('Pass')
                          ? 'bg-emerald-100 text-emerald-800'
                          : v.type.includes('Warning')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {v.type}
                    </span>
                    <span className="font-bold text-slate-900 block mb-1">{v.rule}</span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Global Agency Submission Guidance Grid */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
              Global Regulatory Authorities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Submission Guidance Across Key Regulatory Authorities
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Country-specific submission gateways and regional module requirements supported by our advisory practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                  US
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">US FDA (United States)</h4>
                  <p className="text-[11px] text-slate-500">Electronic Submissions Gateway (ESG)</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Mandatory eCTD for all Commercial INDs, NDAs, ANDAs, and BLAs. Form 356h, CDER/CBER validation criteria,
                SPL labeling, study data standards (CDISC SEND, SDTM, ADaM).
              </p>
              <div className="text-[11px] font-semibold text-teal-700">Supported: eCTD DTD 3.3 & v4.0 Pilot</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-xs">
                  EU
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">EMA & National Agencies (EU)</h4>
                  <p className="text-[11px] text-slate-500">eSubmission Gateway & CESP</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Mandatory for Centralised, Decentralised (DCP), and Mutual Recognition (MRP) procedures. EU M1 v3.0.4,
                SmPC, PIL, Annexes, and SPOR master data integration.
              </p>
              <div className="text-[11px] font-semibold text-teal-700">Supported: EU eSubmission Validation Rules v7.1</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                  IN
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">CDSCO (India)</h4>
                  <p className="text-[11px] text-slate-500">SUGAM Portal & CTD Transition</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Guidance on SUGAM portal filing, CTD format alignment for New Drug Approvals, Fixed Dose Combinations (FDCs),
                and Clinical Trial applications (Form CT-04) under NDCT Rules 2019.
              </p>
              <div className="text-[11px] font-semibold text-teal-700">Supported: SUGAM Filing & CDSCO Dossier Audits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Footer Call to Action */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black">
            Plan Your eCTD Submission Strategy with Certified RAC Experts
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Avoid costly gateway rejections and Refuse-to-File notices. Engage ReguSphere 360 for structured eCTD
            compilation guidance, pre-validation audits, and comprehensive documentation review.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenEnquiry('eCTD Consultancy')}
              className="px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20"
            >
              Request eCTD Scoping Consultation
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Contact Regulatory Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
