import React, { useState } from 'react';
import {
  FileCheck2,
  FolderTree,
  SearchCode,
  FileText,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileEdit,
  ClipboardList,
  RefreshCw,
  Award,
} from 'lucide-react';
import { DeliverablesSection } from '../components/DeliverablesSection';

export const RegulatoryDocumentationPage = ({
  onSelectService,
  onOpenReadiness,
  onOpenEnquiry,
}) => {
  const [activeDocCategory, setActiveDocCategory] = useState('all');

  const docTypes = [
    {
      id: 'ctd-ectd',
      category: 'Dossiers',
      title: '1. CTD & eCTD Documentation',
      desc: 'Modules 1 through 5 granular documentation assembly, XML leaf hyperlinking, and index.xml verification.',
      focus: 'Pre-submission validation, RTF avoidance, and regional Module 1 administrative packaging.',
    },
    {
      id: 'submission-docs',
      category: 'Dossiers',
      title: '2. Regulatory Submission Documents',
      desc: 'Cover letters, regulatory strategy briefing books, clinical study overviews, and administrative declarations.',
      focus: 'Pre-IND, Type B/C meeting briefings, Scientific Advice submissions, and agency rejoinders.',
    },
    {
      id: 'sops',
      category: 'Quality & Governance',
      title: '3. Standard Operating Procedures (SOPs)',
      desc: 'GxP compliant SOP drafting, lifecycle version control, and 21 CFR Part 11 electronic signature procedures.',
      focus: 'RA operations, document change control, deviation management, and pharmacovigilance.',
    },
    {
      id: 'smf',
      category: 'Plant & Manufacturing',
      title: '4. Site Master File (SMF)',
      desc: 'Comprehensive manufacturing site descriptions adhering to PIC/S and Schedule M cGMP requirements.',
      focus: 'Facility layout, HVAC air flow classifications, water system validation, and QC testing capacity.',
    },
    {
      id: 'bmr',
      category: 'Plant & Manufacturing',
      title: '5. Batch Manufacturing Records (BMR)',
      desc: 'Executed and master batch records review for process validation, yield reconciliation, and IPC controls.',
      focus: 'In-process controls, critical process parameters (CPPs), and critical quality attributes (CQAs).',
    },
    {
      id: 'mfr',
      category: 'Plant & Manufacturing',
      title: '6. Master Formula Records (MFR)',
      desc: 'Standardized formula records defining raw material dispensing, batch sizing, and step-by-step procedures.',
      focus: 'Formula scale-up justification, overages rationales, and equipment operating parameters.',
    },
    {
      id: 'product-dossiers',
      category: 'Dossiers',
      title: '7. Product Dossiers',
      desc: 'Finished product dossiers for domestic state FDA approvals and international export market registrations.',
      focus: 'ASEAN Common Technical Dossier (ACTD), WHO prequalification dossiers, and national CTDs.',
    },
    {
      id: 'compliance-docs',
      category: 'Quality & Governance',
      title: '8. Regulatory Compliance Documents',
      desc: 'Audit response packages, warning letter remediations, and compliance verification dossiers.',
      focus: 'Corrective action verification, agency audit response letters, and inspection readiness.',
    },
    {
      id: 'qms',
      category: 'Quality & Governance',
      title: '9. Quality Management System (QMS) Documentation',
      desc: 'Quality manuals, risk management files per ICH Q9, and pharmaceutical quality system per ICH Q10.',
      focus: 'Management review procedures, supplier qualification, and continuous quality improvement.',
    },
    {
      id: 'change-control',
      category: 'Lifecycle & Control',
      title: '10. Change Control Documentation',
      desc: 'Systematic technical evaluation of manufacturing, formulation, packaging, and testing changes.',
      focus: 'Regulatory impact assessment (Major vs Minor vs Notification), stability protocols, and comparability.',
    },
    {
      id: 'deviation-capa',
      category: 'Lifecycle & Control',
      title: '11. Deviation & CAPA Documentation',
      desc: 'Root cause analysis (RCA) investigations, out-of-specification (OOS) investigations, and preventive plans.',
      focus: '5-Why analysis, Fishbone methodology, effectiveness checks, and regulatory disclosure reports.',
    },
    {
      id: 'apqr',
      category: 'Lifecycle & Control',
      title: '12. Annual Product Quality Review (APQR / PQR)',
      desc: 'Retrospective annual reviews of commercial batches, trends, stability data, and regulatory variations.',
      focus: 'Statistical process capability (Cpk/Ppk), complaint trends, recall audits, and regulatory conformance.',
    },
    {
      id: 'variations',
      category: 'Lifecycle & Control',
      title: '13. Regulatory Variation Documentation',
      desc: 'Classification dossiers for post-approval changes: Type IA (minor), Type IB, Type II (major), and Prior Approval Supplements.',
      focus: 'Comparability protocols, shelf-life extensions, manufacturing site transfers, and agency filings.',
    },
  ];

  const filteredDocs =
    activeDocCategory === 'all'
      ? docTypes
      : docTypes.filter((d) => d.category.toLowerCase().includes(activeDocCategory.toLowerCase()));

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6">
            <FileCheck2 className="w-4 h-4 text-teal-400" />
            <span>Consultancy Practice Category C</span>
            <span>•</span>
            <span>Pharmaceutical Regulatory Documentation</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Regulatory Documentation Consultancy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Organise, write, format, and audit pharmaceutical regulatory documentation across 13 core disciplines—from
              CTD/eCTD dossiers and GxP SOPs to Site Master Files, MFRs, Deviation/CAPA, and Annual Product Quality Reviews.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenEnquiry('Regulatory Documentation Consultancy')}
                className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 flex items-center space-x-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Request Documentation Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenReadiness}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Launch Readiness Self-Audit Tool</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Governance Notice */}
      <section className="bg-amber-50 border-b border-amber-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start space-x-3 text-xs text-amber-900 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Technical Review & Gap Assessment Governance:</span> ReguSphere 360 conducts
            independent regulatory gap assessments, scientific drafting, and compliance reviews under strict mutual
            Non-Disclosure Agreements (NDAs). Final statutory permissions are issued exclusively by competent health authorities.
          </div>
        </div>
      </section>

      {/* 4 Core Regulatory Review Services */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
              Our Documentation Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Four Core Document Advisory Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-sm">
                01
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Document Review</h3>
              <p className="text-slate-600 leading-relaxed">
                Line-by-line concordance audits, cross-referencing between summaries and raw data, and scientific accuracy checks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                02
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Formatting & Technical Checks</h3>
              <p className="text-slate-600 leading-relaxed">
                PDF/A rendering, bookmark tree hierarchy, relative hyperlinking, and fast web view for electronic gateway conformance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-sm">
                03
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Preparation Guidance</h3>
              <p className="text-slate-600 leading-relaxed">
                Authoring templates, SOP models, Master Formula structure, and Site Master File drafting aligned with WHO and PIC/S.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-sm">
                04
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Compliance Gap Assessment</h3>
              <p className="text-slate-600 leading-relaxed">
                Pre-submission audit against FDA, EMA, or CDSCO requirements with Red/Amber/Green deficiency scoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 13 Comprehensive Document Types Explorer */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
                Regulatory Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                13 Key Pharmaceutical Document Disciplines Supported
              </h2>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs">
              {['all', 'dossiers', 'plant', 'quality', 'control'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveDocCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                    activeDocCategory === cat
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'plant' ? 'Plant & MFR' : cat === 'control' ? 'Change & CAPA' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 inline-block mb-3">
                    {doc.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{doc.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{doc.desc}</p>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mb-6">
                    <span className="font-bold text-slate-800 block mb-0.5">Audit & Review Focus:</span>
                    <span>{doc.focus}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenEnquiry(`Documentation Consultancy: ${doc.title}`)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Request Review Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tangible Deliverables Explorer */}
      <DeliverablesSection onOpenEnquiry={() => onOpenEnquiry('Regulatory Documentation Consultancy')} />
    </div>
  );
};
