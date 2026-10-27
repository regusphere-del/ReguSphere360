import React from 'react';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const ExpertisePage = ({ onOpenEnquiry }) => {
  const domains = [
    {
      title: 'Small Molecules & Generics',
      desc: 'Complete ANDA, generic MAA, and CDSCO Form 44/40 filings with BA/BE study protocols, dissolution profiling (F2), and impurity qualification per ICH Q3A/B.',
    },
    {
      title: 'Biologics & Biosimilars (BLA / MAA)',
      desc: 'Extensive characterization, comparability testing, immunogenicity evaluation, and Module 3 CMC dossiers for monoclonal antibodies, recombinant proteins, and biosimilars.',
    },
    {
      title: 'Medical Devices & In-Vitro Diagnostics (IVDs)',
      desc: 'India Medical Device Rules (MDR 2017) Form MD-14 licensing, EU MDR 2017/745 / IVDR 2017/746 technical documentation, and FDA 510(k) / De Novo submissions.',
    },
    {
      title: 'Drug Master Files (DMF & ASMF)',
      desc: 'Type II API DMFs for US FDA and Active Substance Master Files (ASMF) for Europe, including open and closed parts, synthetic routes, and elemental impurity assessments (ICH Q3D).',
    },
    {
      title: 'Clinical Trial Applications (IND / CTA)',
      desc: 'Investigational New Drug (IND) 30-day reviews, EMA Clinical Trials Information System (CTIS) Part I/II dossiers, and CDSCO Subject Expert Committee (SEC) presentations.',
    },
    {
      title: 'Post-Approval Lifecycle & Variations',
      desc: 'Global variation management (Type IA, IB, II / FDA PAS, CBE-0, CBE-30), manufacturing site transfer comparability, annual reporting, and renewal submissions.',
    },
  ];

  return (
    <div className="bg-white">
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-4">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>Therapeutic & Regulatory Dossier Domains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Specialized Regulatory Affairs Expertise
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            From novel biological therapeutics to high-volume generic oral solids and advanced medical devices,
            our consultancy covers the complete lifecycle across global health authorities.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((dom, i) => (
              <div key={i} className="executive-card rounded-2xl p-6 bg-white border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{dom.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{dom.desc}</p>
                <button
                  onClick={() => onOpenEnquiry(`Consultation for ${dom.title}`)}
                  className="text-xs text-teal-700 font-bold flex items-center space-x-1 hover:underline"
                >
                  <span>Request Specific Scoping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
