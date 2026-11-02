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
  ChevronRight,
  Layers,
  Sparkles,
  HelpCircle,
  FileText,
  Clock,
} from 'lucide-react';

export const ConsultancyServicesPage = ({ onNavigate, onOpenEnquiry }) => {
  const [filterDomain, setFilterDomain] = useState('All');

  const mainServices = [
    {
      id: 'ectd',
      category: 'Submissions',
      title: 'A. eCTD & Regulatory Submission Consultancy',
      tagline: 'ICH CTD Modules 1–5, XML Backbone, Sequence Lifecycle & Validation',
      icon: FolderTree,
      color: 'teal',
      path: 'services-ectd',
      description:
        'Professional guidance on electronic submissions (eCTD v3.2.2 & v4.0), sequence planning (0000 to nnnn), regional Module 1 specs, and technical gateway checks to eliminate Refuse-to-File (RTF) risks.',
      highlights: [
        'CTD Modules 1 to 5 granular taxonomy & document indexing',
        'eCTD lifecycle sequence planning & cumulative leaf management',
        'PDF/A formatting, bookmarks, fast web view & relative hyperlinking',
        'Gateway technical validation (US FDA ESG, EMA CESP, CDSCO)',
      ],
      deliverables: 'eCTD Folder Taxonomy, Granular TOC Matrix, Lorenz Validation Logs',
      targetClients: 'Sponsors filing IND, NDA, ANDA, BLA, or MAA dossiers globally',
    },
    {
      id: 'license-tracking',
      category: 'Licensing & Approvals',
      title: 'B. Pharmaceutical License Tracking & Regulatory Follow-up',
      tagline: 'Real-Time Monitoring of Manufacturing, Wholesale, Import & Device Licenses',
      icon: Activity,
      color: 'blue',
      path: 'services-license-tracking',
      description:
        'Dedicated tracking engine covering drug manufacturing, wholesale, loan, import, medical device, cosmetics, and clinical trial licenses. Monitored through verified sources with deadline reminders.',
      highlights: [
        'Application status monitoring across CDSCO, State FDAs & global authorities',
        '7-tier milestone tracking: Submitted, Under Review, Query Raised, Approved, Renewal Due',
        'Pending documentation deficiency lists & authority response drafting',
        'Automated 45-day statutory pre-expiry renewal alerts',
      ],
      deliverables: 'Live Tracking File, Authority Communication Timeline, Renewal Ledger',
      targetClients: 'Pharma manufacturers, importers, distribution houses, and CROs',
    },
    {
      id: 'documentation',
      category: 'Documentation',
      title: 'C. Regulatory Documentation Consultancy',
      tagline: 'SOPs, SMF, BMR, MFR, QMS, CAPA, APQR & Regulatory Variations',
      icon: FileCheck2,
      color: 'emerald',
      path: 'documentation',
      description:
        'Comprehensive technical writing, auditing, and review for pharmaceutical documentation spanning Site Master Files (SMF), Master Formula Records (MFR), Batch Records, and Quality Systems.',
      highlights: [
        'CTD & eCTD documentation review & scientific writing',
        'Site Master File (SMF), BMR, and MFR harmonization',
        'GxP SOP master templates, 21 CFR Part 11 document governance',
        'Change controls, Deviation, CAPA, and APQR audit documentation',
      ],
      deliverables: 'Compliant SOP Dossiers, Master Formula Packages, Gap Assessment Matrix',
      targetClients: 'Operating pharmaceutical plants, QA/QC departments, scale-up biotechs',
    },
    {
      id: 'intelligence',
      category: 'Intelligence',
      title: 'D. Global Regulatory Intelligence & Guidance',
      tagline: 'Regulatory Pathways Across India, USA, Europe, UK, Japan, Australia & WHO',
      icon: Globe2,
      color: 'indigo',
      path: 'intelligence',
      description:
        'Synthesizing verified notifications, health authority guidelines, and comparative regulatory pathways across CDSCO, US FDA, EMA, MHRA, PMDA, TGA, Health Canada, WHO, and ICH.',
      highlights: [
        'Country-specific approval requirements & drug registration procedures',
        'Comparative regulatory pathways (IND vs CTA, ANDA vs MAA, 505(b)(2))',
        'Regulatory intelligence notifications & guideline change impact briefs',
        'Post-approval variation classification & health authority filing roadmaps',
      ],
      deliverables: 'Jurisdiction Comparison Matrix, Regulatory Strategy Briefs',
      targetClients: 'Global regulatory affairs directors, strategy teams, emerging exporters',
    },
    {
      id: 'licensing-guidance',
      category: 'Licensing & Approvals',
      title: 'E. Pharmaceutical Licensing & Approval Guidance',
      tagline: 'Step-by-Step Procedural Guidance for Manufacturing, Sales & Approvals',
      icon: Building2,
      color: 'amber',
      path: 'services-licensing-guidance',
      description:
        'Educational and procedural guidance on obtaining manufacturing licenses (Form 25/28), wholesale authorizations (20B/21B), loan licenses, import certificates, and medical device registrations.',
      highlights: [
        'Drug manufacturing plant layout, HVAC qualification & staff credentials',
        'Wholesale & retail sales license requirements & registered pharmacist norms',
        'Medical Device Rules 2017 Class A–D registration & Notified Body audits',
        'New drug approval pathways (Form 44, SEC review) & CT applications',
      ],
      deliverables: 'Pre-filing Inspection Checklists, Application Roadmap, Statutory Challan Guides',
      targetClients: 'Startups setting up pharma units, traders, medical device innovators',
    },
    {
      id: 'education',
      category: 'Education & Training',
      title: 'F. Regulatory Education & Corporate Training',
      tagline: 'Industry-Oriented Masterclasses, GxP Workshops & Professional Upskilling',
      icon: GraduationCap,
      color: 'rose',
      path: 'education',
      description:
        'Professional training programs designed for pharmacy students, regulatory freshers, and corporate pharmaceutical teams covering CTD compilation, CDSCO regulations, GxP, and eCTD software tools.',
      highlights: [
        'Hands-on CTD/eCTD dossier compilation workshops with real-world case studies',
        'In-depth training on CDSCO SUGAM, FDA 21 CFR, and EMA directives',
        'GxP (GMP, GDP, GLP, GCP) compliance and data integrity masterclasses',
        'Corporate customized on-site modules, quizzes & Certificates of Completion',
      ],
      deliverables: 'Syllabus Master Manuals, Hands-on Exercise Datasets, Completion Certificates',
      targetClients: 'Pharmacy students, fresh RA recruits, corporate quality & regulatory teams',
    },
  ];

  const filtered =
    filterDomain === 'All'
      ? mainServices
      : mainServices.filter((s) => s.category.includes(filterDomain));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6">
            <Layers className="w-4 h-4 text-teal-400" />
            <span>ReguSphere 360 Core Capabilities</span>
            <span>•</span>
            <span>6 Dedicated Regulatory Practices</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Our Regulatory Affairs Consultancy Practices
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Structured to simplify complex pharmaceutical compliance across the entire product lifecycle—from
              initial eCTD dossier assembly and statutory licensing to global market intelligence and corporate upskilling.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenEnquiry(null)}
                className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 flex items-center space-x-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('services-license-tracking')}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Explore License Tracking Portal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Governance Banner */}
      <section className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-600 flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>
              <strong>Professional Standard:</strong> All advisory, review, and tracking engagements adhere strictly
              to ICH guidelines, GxP, and 21 CFR Part 11 integrity frameworks.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Independent Regulatory Advisory Services</span>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Dedicated Practice Areas</h2>
              <p className="text-xs text-slate-500 mt-0.5">Explore detailed individual service pages and technical scopes</p>
            </div>

            <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-sm">
              {['All', 'Submissions', 'Licensing & Approvals', 'Documentation', 'Intelligence', 'Education & Training'].map(
                (d) => (
                  <button
                    key={d}
                    onClick={() => setFilterDomain(d)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      filterDomain === d
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                )
              )}
            </div>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-500 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {srv.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-teal-700 font-semibold mb-3">{srv.tagline}</p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{srv.description}</p>

                    <div className="space-y-2 mb-6 border-t border-slate-100 pt-4 text-xs text-slate-700">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Core Capabilities:
                      </span>
                      {srv.highlights.map((h, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px]">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mb-6 space-y-1">
                      <p>
                        <span className="font-bold text-slate-800">Deliverables:</span> {srv.deliverables}
                      </p>
                      <p>
                        <span className="font-bold text-slate-800">Ideal For:</span> {srv.targetClients}
                      </p>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => onNavigate(srv.path)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <span>Explore Dedicated Service Page</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenEnquiry(srv.title)}
                      className="w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs transition-colors flex items-center justify-center"
                    >
                      <span>Request Consultation</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statutory Disclaimer Box */}
      <section className="py-12 bg-white border-t border-slate-200 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Regulatory Advisory Disclaimer</span>
            </span>
            <p className="leading-relaxed text-[11px]">
              "ReguSphere 360 provides pharmaceutical regulatory education, consultancy, documentation guidance,
              and application tracking assistance. Regulatory approvals, licensing decisions, and statutory permissions
              are issued exclusively by the competent regulatory authorities. We do not guarantee regulatory approvals
              or represent ourselves as a government authority."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
