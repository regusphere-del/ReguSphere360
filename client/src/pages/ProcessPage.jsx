import React from 'react';
import {
  Send,
  Search,
  FileText,
  Layers,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';

export const ProcessPage = ({ onOpenEnquiry }) => {
  const steps = [
    {
      step: '01',
      title: 'Submit Enquiry & Project Brief',
      subtitle: 'Secure Information Intake',
      description:
        'Sponsors provide their intended product class (NCE, generic, biologic, medical device), target regulatory agencies (US FDA, EMA, CDSCO, etc.), filing timeline, and confidential raw documents under mutual NDA protection.',
      deliverables: ['Confidentiality Agreement (NDA)', 'Intake Questionnaire', 'Document Inventory Checklist'],
    },
    {
      step: '02',
      title: 'Initial Assessment & Feasibility Scoping',
      subtitle: 'Technical Review within 48 Hours',
      description:
        'Senior RAC-certified consultants audit dossier granularity, identify preliminary deficiency red flags, verify applicable health authority guidelines, and determine eCTD technical viability.',
      deliverables: ['Feasibility Brief', 'Preliminary Gap Flagging', 'Resource Allocation Estimate'],
    },
    {
      step: '03',
      title: 'Transparent Proposal & Statement of Work',
      subtitle: 'Clear Milestone Deliverables & Fixed Quotation',
      description:
        'We dispatch a comprehensive proposal detailing explicit project phases, timeline milestones, deliverable specifications (e.g. Module 2 QOS, Lorenz XML validation reports), and fixed pricing.',
      deliverables: ['Formal Master Services Agreement (MSA)', 'Statement of Work (SOW)', 'Quotation Schedule'],
    },
    {
      step: '04',
      title: 'Engagement & Project Kick-off',
      subtitle: 'Dedicated Lead RAC Consultant Assignment',
      description:
        'Kick-off alignment call between sponsor scientists and our regulatory leads. Setup of secure encrypted document workspace with role-based access and 21 CFR Part 11 audit trails.',
      deliverables: ['Project Governance Plan', 'Bi-weekly Milestone Tracker', 'Dedicated Lead Consultant'],
    },
    {
      step: '05',
      title: 'Execution, Technical Assembly & Delivery',
      subtitle: 'Precision eCTD Formatting & Gap Remediation',
      description:
        'Execution of regulatory medical writing, leaf document PDF/A conversion, hyperlinking, cross-referencing audit, and electronic gateway validation pass (checksum & XML verification).',
      deliverables: ['Ready-to-Transmit eCTD Dossier', 'Validation Pass Certificate', 'SOP Control Sign-off'],
    },
    {
      step: '06',
      title: 'Post-Submission Follow-up & Agency Query Support',
      subtitle: 'Information Request (IR) Resolution',
      description:
        'Our consultants remain engaged throughout the health authority review cycle, assisting sponsors with rapid response drafting to agency Information Requests (IR), Complete Response Letters (CRL), or deficiency letters.',
      deliverables: ['IR Response Strategy Brief', 'Life-Cycle Variation Guidance', 'Close-out Review'],
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-4">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>Consultancy Engagement Methodology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our 6-Step Consultancy Engagement Process
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            From initial scoping intake to post-submission health authority query resolution, our systematic
            GxP methodology guarantees absolute transparency, confidentiality, and electronic gateway validation.
          </p>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="executive-card rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex-shrink-0">
                <span className="text-4xl font-black font-mono text-teal-600 bg-teal-50 px-4 py-2 rounded-xl border border-teal-200 block text-center">
                  {st.step}
                </span>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">{st.subtitle}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{st.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.description}</p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Key Deliverables:</span>
                  <div className="flex flex-wrap gap-2">
                    {st.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        ✓ {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA Box */}
          <div className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4">
            <h3 className="text-xl font-bold">Start Step 1 with a Confidential Initial Brief</h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Our Senior RAC consultants evaluate your requirements under legally binding NDA protection within 48 hours.
            </p>
            <button
              onClick={() => onOpenEnquiry(null)}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
            >
              Submit Project Enquiry Form
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
