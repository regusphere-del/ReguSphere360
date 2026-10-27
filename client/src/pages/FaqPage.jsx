import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const FaqPage = ({ onOpenEnquiry }) => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Does ReguSphere 360 guarantee regulatory approval from health authorities?',
      a: 'No consultancy can or should guarantee approval. Final regulatory decisions, marketing authorizations, and approvals belong exclusively to sovereign regulatory authorities (such as US FDA, EMA, CDSCO). Our role is to ensure your dossiers strictly satisfy ICH granularity, guideline conformance, scientific narrative coherence, and validation standards to eliminate avoidable Refuse-to-File (RTF) risks.',
    },
    {
      q: 'How does ReguSphere 360 handle client confidentiality and intellectual property?',
      a: 'Confidentiality is our highest priority. All engagements commence with a mutual Non-Disclosure Agreement (NDA). All documents, Drug Master Files, and proprietary data are processed in encrypted, 21 CFR Part 11-compliant environments with restricted role-based access. We never expose client information or project files publicly.',
    },
    {
      q: 'What is the typical turnaround timeline for a comprehensive eCTD Gap Assessment?',
      a: 'A standard regulatory gap assessment across Modules 1 to 5 typically takes 2 to 3 weeks depending on dossier volume. For urgent filings or Complete Response Letter (CRL) response deadlines, we offer an expedited fast-track review completed in 7 to 10 business days.',
    },
    {
      q: 'Are your course completion certificates accredited university degrees?',
      a: 'No. Our certificates are Certificates of Course Completion issued by ReguSphere 360 to document hours of practical training, practical dossier lab completion, and continuing professional education. They are not accredited university degrees, government licenses, or statutory regulatory credentials.',
    },
    {
      q: 'Can you help with post-approval variations and manufacturing site transfers?',
      a: 'Yes. Our Post-Approval Change Documentation service supports classification (Type IA, IB, II in the EU; PAS, CBE-0, CBE-30 in the US; Form 40/44 updates with CDSCO), comparability protocols, annual reports, and submission assembly.',
    },
    {
      q: 'How are consulting fees structured?',
      a: 'We provide transparent, fixed-deliverable statements of work (SOW) based on project scope, number of modules, and urgency. Live instant cost estimates can be viewed using our interactive quotation tool before formal scoping.',
    },
  ];

  return (
    <div className="bg-white">
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Consultancy, Compliance & Scope FAQs
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Transparent answers regarding our regulatory services, pricing models, confidentiality safeguards,
            and health authority boundaries.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between text-sm font-bold text-slate-900 hover:text-teal-700"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-teal-600 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-8 text-center">
            <p className="text-xs text-slate-600 mb-3">Have a specific regulatory question not covered here?</p>
            <button
              onClick={() => onOpenEnquiry(null)}
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-sm"
            >
              Contact a Senior RAC Consultant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
