import React, { useState } from 'react';
import {
  FolderTree,
  SearchCode,
  FileCheck,
  ClipboardList,
  FileEdit,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';

export const servicesData = [
  {
    id: 'ich-ctd-structure',
    title: 'ICH CTD/eCTD Dossier Structure & Document Indexing',
    subtitle: 'Modules 1 to 5 Granular Architecture & Hyperlinking Matrix',
    icon: FolderTree,
    color: 'from-emerald-500 to-teal-500',
    description:
      'Turn disparate technical reports and raw batch records into pristine, agency-compliant ICH Common Technical Document (CTD) and electronic CTD (eCTD v3.2.2 & v4.0) structures with XML DTD backbone compliance.',
    deliverables: [
      'Comprehensive Module 1-5 XML folder & leaf document taxonomy',
      'Granular PDF document bookmarks, internal hyperlinks, and TOC hierarchy',
      'eCTD file naming convention audit according to regional FDA/EMA specifications',
      'Validation report using Lorenz / FDA Electronic Submissions Gateway criteria',
    ],
    authorityStandards: ['ICH M4 Common Technical Document', 'FDA 21 CFR 314.50', 'EMA Notice to Applicants Vol 2B'],
    bestFor: 'IND, NDA, BLA, ANDA, and MAA filings needing zero-error gateway acceptance.',
  },
  {
    id: 'gap-assessment',
    title: 'Regulatory Document Gap Assessments',
    subtitle: 'Pre-Submission Deficiencies & Scientific Risk Mapping',
    icon: SearchCode,
    color: 'from-cyan-500 to-blue-500',
    description:
      'Rigorous scientific and administrative auditing of your existing CMC, Non-clinical, and Clinical dossiers to uncover missing stability profiles, analytical validations, and documentation ambiguities prior to agency submission.',
    deliverables: [
      'Red/Amber/Green Critical Deficiencies Matrix with regulatory severity scoring',
      'Actionable remediation roadmap with priority timelines and resource allocations',
      'Scientific justification gap briefs for bridging studies & analytical comparability',
      'Pre-IND / Scientific Advice briefing document preparation',
    ],
    authorityStandards: ['FDA Refuse-to-File (RTF) Guidelines', 'EMA Day-80/120 LoQ Standards', 'ICH Q1A-Q14 Quality Guidelines'],
    bestFor: 'Sponsors facing tight filing deadlines or responding to Complete Response Letters (CRL).',
  },
  {
    id: 'sop-preparation',
    title: 'SOP Preparation, Review & Document Control Support',
    subtitle: 'GxP Lifecycle Management & 21 CFR Part 11 Compliance',
    icon: FileCheck,
    color: 'from-teal-500 to-emerald-600',
    description:
      'Drafting, upgrading, and harmonizing Standard Operating Procedures (SOPs) across regulatory affairs, QA/QC, and pharmacovigilance to satisfy global regulatory expectations and inspection audits.',
    deliverables: [
      'Standardized Regulatory Affairs SOP master templates with version control matrices',
      'Document change control logs and periodic revision workflows',
      'FDA 21 CFR Part 11 & EU Annex 11 electronic signature audit procedures',
      'Internal audit checklists and training readiness verification packages',
    ],
    authorityStandards: ['cGMP 21 CFR Parts 210/211', 'EU GMP Vol 4', 'ICH Q10 Pharmaceutical Quality System'],
    bestFor: 'Biotech scale-ups transitioning from R&D to clinical trials or commercial manufacturing.',
  },
  {
    id: 'readiness-checklists',
    title: 'Regulatory Submission Readiness Checklists',
    subtitle: 'Gateway Gate-Check & Health Authority Sign-off',
    icon: ClipboardList,
    color: 'from-amber-500 to-orange-500',
    description:
      'Interactive and structured validation checklists covering administrative forms (FDA 356h, Annex 1), electronic signatures, certificate of analysis (CoA) compliance, and leaf-level document completeness.',
    deliverables: [
      'Regional Health Authority Submission Gate Sign-off Certificate',
      'Module 1 administrative completeness checklist (SmPC, PIL, labeling, LOAs)',
      'Module 3 CMC release testing and batch stability checkpoint audit',
      'eCTD technical validation pass logs (Checksum, MD5, XML schema compliance)',
    ],
    authorityStandards: ['FDA Electronic Regulatory Submissions', 'EMA eSubmission Guidelines', 'PMDA Gateway Validation'],
    bestFor: 'Regulatory directors requiring independent RAC quality sign-off before official transmission.',
  },
  {
    id: 'regulatory-writing',
    title: 'Regulatory Writing & Documentation Consistency Reviews',
    subtitle: 'Module 2 Overviews, SmPC Alignment & Technical Coherence',
    icon: FileEdit,
    color: 'from-indigo-500 to-purple-500',
    description:
      'Expert medical and regulatory writers cross-examine your Module 2 Clinical & Non-clinical Overviews against raw study reports to ensure numeric consistency, scientific integrity, and persuasive narrative presentation.',
    deliverables: [
      'Line-by-line concordance audit between Module 2 summaries and Module 4/5 study reports',
      'Module 2.3 Quality Overall Summary (QOS) drafting and technical refining',
      'Clinical Study Report (CSR) ICH E3 structural synchronization',
      'Executive Summary with benefit-risk justification for review committees',
    ],
    authorityStandards: ['ICH E3 Structure of Clinical Reports', 'ICH E6 Good Clinical Practice', 'ICH M4E Clinical Guidelines'],
    bestFor: 'Complex biologic or generic dossiers where data discrepancies could trigger delay questions.',
  },
  {
    id: 'post-approval',
    title: 'Post-Approval Change Documentation Support',
    subtitle: 'Variations, Supplements, Annual Reports & Renewals',
    icon: RefreshCw,
    color: 'from-rose-500 to-pink-500',
    description:
      'Streamline ongoing regulatory maintenance with precise variation categorization (Type IA, IB, II, or FDA CBE-0/CBE-30/PAS), manufacturing site transfer packages, and timely annual submission filings.',
    deliverables: [
      'Regulatory impact assessment matrix for proposed CMC or site changes',
      'Variation / Supplement submission package with side-by-side comparison tables',
      'Annual report compilation (FDA Annual Reports, PSUR/PBRER synchronization)',
      'Post-approval change tracking calendar and health authority notification dossier',
    ],
    authorityStandards: ['FDA 21 CFR 314.70 Supplements', 'EMA Post-Authorisation Guidance', 'ICH Q12 Lifecycle Management'],
    bestFor: 'Commercial marketing authorization holders (MAH) managing manufacturing changes or label updates.',
  },
];

export const ServiceCards = ({ onSelectService, onOpenReadiness }) => {
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);

  return (
    <section id="services" className="py-20 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Consultancy Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Regulatory Documentation Services
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            From early-stage filing architecture to post-approval lifecycle governance, our specialized RAC consultants
            deliver audited documentation that passes global health authority scrutiny.
          </p>
        </div>

        {/* 6 Core Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border border-slate-800/90 group"
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${service.color} flex items-center justify-center shadow-lg text-slate-950`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                      ICH Standard
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium mt-1 mb-3">{service.subtitle}</p>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{service.description}</p>

                  {/* Deliverables snippet */}
                  <div className="border-t border-slate-800/80 pt-3 mb-4">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                      Key Deliverables
                    </p>
                    <ul className="space-y-1.5">
                      {service.deliverables.slice(0, 2).map((deliv, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedServiceDetail(service)}
                    className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 font-medium transition-colors py-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-teal-400" />
                    <span>View Scope</span>
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 hover:border-emerald-500 text-xs font-bold transition-all"
                  >
                    <span>Enquire Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Modal Drawer */}
        {selectedServiceDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${selectedServiceDetail.color} flex items-center justify-center text-slate-950 shadow-lg`}
                >
                  {React.createElement(selectedServiceDetail.icon, { className: 'w-6 h-6 stroke-[2.2]' })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedServiceDetail.title}</h3>
                  <p className="text-xs text-emerald-400 font-medium">{selectedServiceDetail.subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">{selectedServiceDetail.description}</p>

              {/* Full Deliverables List */}
              <div className="mb-6 bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-3 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Consultancy Deliverables</span>
                </h4>
                <ul className="space-y-2">
                  {selectedServiceDetail.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Regulatory Standards */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-400 mb-2">Applicable Health Authority Frameworks:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedServiceDetail.authorityStandards.map((std, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-800/80 text-teal-300 border border-slate-700 text-xs font-mono"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal footer CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400">Typical turnaround: 2-3 weeks</span>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedServiceDetail(null);
                      onSelectService(selectedServiceDetail.title);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg"
                  >
                    Select in Quotation Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
