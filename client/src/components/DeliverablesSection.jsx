import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileText,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Eye,
  FileSpreadsheet,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const DeliverablesSection = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState('ctd-tree');
  const [expandedModule, setExpandedModule] = useState('m3');

  const ctdModules = [
    {
      id: 'm1',
      title: 'Module 1: Regional Administrative Information',
      items: [
        '1.0 Cover Letter & Administrative Form (FDA 356h / EU Application)',
        '1.2 Comprehensive Table of Contents',
        '1.3 Product Labeling, Package Insert & SmPC Leaflet',
        '1.4 Regulatory Letters of Authorization (DMF/ASMF LOAs)',
      ],
    },
    {
      id: 'm2',
      title: 'Module 2: Common Technical Document Summaries',
      items: [
        '2.1 CTD Table of Contents & Introduction',
        '2.3 Quality Overall Summary (QOS-R / QOS-C)',
        '2.4 Non-Clinical Overview & Integrated Toxicological Review',
        '2.5 Clinical Overview (Benefit-Risk Clinical Evaluation)',
        '2.7 Clinical Summary of Efficacy and Safety',
      ],
    },
    {
      id: 'm3',
      title: 'Module 3: Quality (CMC Documentation)',
      items: [
        '3.2.S Drug Substance (Characterization, Synthesis, Impurities, Specifications)',
        '3.2.P Drug Product (Formulation, Manufacturing Process Validation, Control)',
        '3.2.P.8 Stability Data (ICH Q1A Accelerated & 25°C/60% RH Real-Time Data)',
        '3.2.A Appendices (Facilities, Adventitious Agents Safety Evaluation)',
      ],
    },
    {
      id: 'm4',
      title: 'Module 4: Non-Clinical Study Reports',
      items: [
        '4.2.1 Pharmacology (Primary/Secondary PD, Safety Pharmacology)',
        '4.2.2 Pharmacokinetics (ADME Analytics)',
        '4.2.3 Toxicology (GLP Repeat-Dose, Carcinogenicity, Mutagenicity)',
      ],
    },
    {
      id: 'm5',
      title: 'Module 5: Clinical Study Reports',
      items: [
        '5.2 Tabular Listing of All Clinical Studies',
        '5.3.1 Biopharmaceutics Reports (BA/BE Studies)',
        '5.3.5 Reports of Efficacy and Safety Studies (Phase I-III CSRs)',
        '5.4 Literature References & Investigator Sign-offs',
      ],
    },
  ];

  const gapMatrixSample = [
    {
      module: 'Module 3.2.P.8',
      finding: 'Real-time stability data at 25°C/60% RH only covers 6 months instead of minimum 12 months required for NDA.',
      severity: 'Critical (Red)',
      risk: 'High risk of Refuse-to-File (RTF) or Complete Response Letter (CRL)',
      remediation: 'Initiate expedited multi-batch stability pull and draft statistical shelf-life extrapolation brief under ICH Q1E.',
    },
    {
      module: 'Module 2.3 vs 3.2.S',
      finding: 'Impurities specification threshold in Quality Overall Summary does not align with analytical batch validation results.',
      severity: 'Major (Amber)',
      risk: 'Agency Information Request (IR) during Day 80 review cycle',
      remediation: 'Synchronize specification tables and provide toxicological qualification per ICH Q3A guidelines.',
    },
    {
      module: 'Module 1.3 Labeling',
      finding: 'Missing side-by-side comparison for innovator SmPC contraindications update.',
      severity: 'Minor (Green)',
      risk: 'Clarification query prior to approval',
      remediation: 'Provide annotated Word table with tracked deletions and insertions against latest agency reference.',
    },
  ];

  return (
    <section id="deliverables" className="py-20 bg-slate-900/60 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Document Architecture Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tangible Consultancy Work Products
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            See the exact blueprints, audit matrices, and submission dossiers our regulatory team constructs for your filing.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('ctd-tree')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ctd-tree'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Folder className="w-4 h-4" />
              <span>ICH CTD Granular Tree</span>
            </button>

            <button
              onClick={() => setActiveTab('gap-matrix')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'gap-matrix'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Regulatory Gap Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('sop-control')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'sop-control'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>GxP SOP & Control Sign-off</span>
            </button>
          </div>
        </div>

        {/* Tab 1: CTD Tree */}
        {activeTab === 'ctd-tree' && (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Folder className="w-5 h-5 text-emerald-400" />
                <span>eCTD Granular Structure Indexing</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click any CTD module below to inspect the leaf document structure we build for your electronic submission.
                All files include ISO-standard PDF/A formatting, bookmarks, and cross-module hypertext links.
              </p>

              <div className="space-y-2 pt-2">
                {ctdModules.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setExpandedModule(mod.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      expandedModule === mod.id
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{mod.title}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${expandedModule === mod.id ? 'rotate-90 text-emerald-400' : 'text-slate-500'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tree View Display */}
            <div className="lg:col-span-7 bg-slate-950 rounded-xl p-5 border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-white font-bold">dossier_root/ectd/0001/</span>
                </span>
                <span className="text-emerald-400 font-semibold">ICH XML v3.2.2 Compliant</span>
              </div>

              {ctdModules
                .filter((m) => m.id === expandedModule)
                .map((m) => (
                  <div key={m.id} className="space-y-2.5">
                    <p className="text-slate-400 font-bold mb-2 flex items-center space-x-1.5">
                      <FolderOpen className="w-4 h-4 text-emerald-400" />
                      <span>{m.title}</span>
                    </p>
                    <div className="pl-4 border-l-2 border-emerald-500/30 space-y-2">
                      {m.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 text-slate-200"
                        >
                          <span className="flex items-center space-x-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                            <span className="truncate">{it}</span>
                          </span>
                          <span className="text-[10px] text-slate-500 font-normal ml-2 flex-shrink-0">PDF/A • Bookmarked</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Output includes: `index.xml`, `us-regional.xml`, md5 checksums</span>
                <button
                  onClick={onOpenEnquiry}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1 font-sans"
                >
                  <span>Request Full Folder Index</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Gap Matrix */}
        {activeTab === 'gap-matrix' && (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>Sample Regulatory Gap Analysis Audit Matrix</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  How our senior RAC consultants audit and map risks before they reach health authority reviewers.
                </p>
              </div>
              <button
                onClick={onOpenEnquiry}
                className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500 hover:text-slate-950 transition-all self-start sm:self-auto"
              >
                Order Gap Assessment for Your Dossier
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                    <th className="pb-3 font-semibold">Dossier Section</th>
                    <th className="pb-3 font-semibold">Deficiency Finding</th>
                    <th className="pb-3 font-semibold">Severity & Risk</th>
                    <th className="pb-3 font-semibold">Consultancy Remediation Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {gapMatrixSample.map((gap, i) => (
                    <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 pr-3 font-mono font-bold text-white whitespace-nowrap">{gap.module}</td>
                      <td className="py-4 pr-3 text-slate-300 max-w-xs">{gap.finding}</td>
                      <td className="py-4 pr-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                            gap.severity.includes('Red')
                              ? 'bg-rose-950/80 text-rose-400 border-rose-800/60'
                              : gap.severity.includes('Amber')
                              ? 'bg-amber-950/80 text-amber-400 border-amber-800/60'
                              : 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60'
                          }`}
                        >
                          {gap.severity}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">{gap.risk}</p>
                      </td>
                      <td className="py-4 text-emerald-300 font-medium max-w-sm">{gap.remediation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: SOP Control */}
        {activeTab === 'sop-control' && (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Standardized SOP Hierarchy</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Level 1 Quality Policies down to Level 4 Records & Work Instructions aligned with FDA 21 CFR 211 and EU GMP Vol 4.
              </p>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                SOP-RA-001 through 045 Master Set
              </span>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Document Change Control Logs</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Impact assessment workflows tracking justification, affected filing dossiers, and health authority notification requirements.
              </p>
              <span className="text-[10px] font-mono text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/40">
                ICH Q10 Change Management
              </span>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">21 CFR Part 11 Electronic Controls</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Digital signature verification, timestamp audit trails, and secure document retention protocols for regulatory inspections.
              </p>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                Audit Trail Ready
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
