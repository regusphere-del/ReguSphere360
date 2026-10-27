import React from 'react';
import { ServiceCards } from '../components/ServiceCards';
import { DeliverablesSection } from '../components/DeliverablesSection';
import {
  FileCheck2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FolderTree,
  SearchCode,
  FileText,
  Layers,
  Award,
} from 'lucide-react';

export const RegulatoryDocumentationPage = ({
  onSelectService,
  onOpenReadiness,
  onOpenEnquiry,
}) => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-4">
            <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Service 1: Regulatory Documentation Consultancy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            ICH CTD/eCTD Dossier Assembly, Gap Audits & Document Control
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Helping pharmaceutical enterprises, regulatory professionals, and biotech startups organise, write,
            audit, and review regulatory documentation across ICH Modules 1 to 5 with guaranteed gateway compliance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenEnquiry('Regulatory Documentation Consultancy')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Request Documentation Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenReadiness}
              className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Submission Readiness Self-Audit Tool</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6 Sub-Services Grid */}
      <ServiceCards
        onSelectService={(srv) => onOpenEnquiry(srv)}
        onOpenReadiness={onOpenReadiness}
      />

      {/* Tangible Deliverables Explorer (CTD Tree, Gap Matrix, SOP Control) */}
      <DeliverablesSection onOpenEnquiry={() => onOpenEnquiry('ICH CTD/eCTD dossier structure and document indexing')} />
    </div>
  );
};
