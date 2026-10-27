import React from 'react';
import { FileText, Download, ExternalLink, ShieldCheck, BookOpen, Layers } from 'lucide-react';

export const ResourcesPage = ({ onOpenEnquiry }) => {
  const downloadableTemplates = [
    {
      title: 'ICH CTD Granular Module 1-5 Checklist (PDF)',
      category: 'Dossier Assembly',
      desc: 'Complete index of all leaf document headings, regional differences between FDA/EMA/CDSCO, and PDF/A validation specifications.',
      fileType: 'PDF Document • 14 Pages',
    },
    {
      title: 'CDSCO Revised Schedule M (cGMP) Self-Audit Matrix',
      category: 'India Regulations',
      desc: 'Comprehensive spreadsheet checklist covering PQS, computerized systems, environmental monitoring, and WHO-TRS alignment.',
      fileType: 'Excel Checklist • 120 Checkpoints',
    },
    {
      title: 'Pre-IND / Scientific Advice Briefing Document Outline',
      category: 'Agency Meetings',
      desc: 'Structured Word template for framing CMC, non-clinical, and clinical questions for FDA Type B and EMA Scientific Advice meetings.',
      fileType: 'Word Document Template',
    },
    {
      title: '21 CFR Part 11 Electronic Signature Compliance Protocol',
      category: 'GxP Document Control',
      desc: 'Standard SOP guidance protocol for validating electronic record systems, audit trails, and hybrid document workflows.',
      fileType: 'SOP Template • Version 2.2',
    },
  ];

  const officialPortals = [
    { name: 'US FDA Electronic Submissions Gateway (ESG)', url: 'https://www.fda.gov/industry/electronic-submissions-gateway' },
    { name: 'European Medicines Agency (EMA) eSubmission', url: 'https://esubmission.ema.europa.eu/' },
    { name: 'CDSCO SUGAM Online Licensing Portal (India)', url: 'https://cdsco.gov.in' },
    { name: 'UK MHRA Submissions Portal', url: 'https://www.gov.uk/mhra' },
    { name: 'Japan PMDA Electronic Gateway', url: 'https://www.pmda.go.jp/english/' },
    { name: 'ICH Official Guideline Library', url: 'https://www.ich.org/page/ich-guidelines' },
  ];

  return (
    <div className="bg-white">
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Open Regulatory Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Regulatory Guidelines & Resource Library
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Free sample templates, audit checklists, and direct portals to official global health authorities to
            assist pharmaceutical professionals and biotech innovators.
          </p>
        </div>
      </section>

      {/* Downloadable Templates Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Sample Templates & Validation Checklists
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloadableTemplates.map((t, idx) => (
              <div
                key={idx}
                className="executive-card rounded-2xl p-6 bg-white border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {t.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{t.fileType}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{t.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{t.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Available to clients & learners</span>
                  <button
                    onClick={() => onOpenEnquiry(`Request template: ${t.title}`)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-teal-600" />
                    <span>Request Template</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Portals Directory */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Official Agency Gateways</h2>
          <p className="text-xs text-slate-600 mb-6">Direct access to official government regulatory portals</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {officialPortals.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs text-slate-800 font-semibold"
              >
                <span>{p.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
