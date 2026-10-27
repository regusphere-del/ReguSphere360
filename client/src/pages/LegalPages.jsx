import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const LegalPages = ({ initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="bg-white">
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold mb-4">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>Legal, Compliance & Disclaimers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Governance, Confidentiality & Service Terms
          </h1>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 text-xs font-bold">
          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === 'disclaimer' ? 'border-teal-600 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Regulatory Authority Disclaimers
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === 'privacy' ? 'border-teal-600 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Privacy Policy & Data Protection
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === 'terms' ? 'border-teal-600 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Terms of Service & Engagement
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === 'certificates' ? 'border-teal-600 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Course Certificate Policy
          </button>
        </div>
      </div>

      <section className="py-14 bg-slate-50 min-h-[500px]">
        <div className="max-w-4xl mx-auto px-4 text-xs text-slate-700 leading-relaxed space-y-6">
          {activeTab === 'disclaimer' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">1. Regulatory Authority Disclaimer</h2>
              <p>
                <strong>Independence Statement:</strong> ReguSphere 360 Inc. and its operating entities provide professional pharmaceutical regulatory affairs consultancy, technical documentation auditing, and training services. ReguSphere 360 is an independent commercial advisory entity and is NOT an official agency, bureau, or affiliate of the United States Food and Drug Administration (FDA), European Medicines Agency (EMA), Central Drugs Standard Control Organisation (CDSCO), UK Medicines and Healthcare products Regulatory Agency (MHRA), Pharmaceuticals and Medical Devices Agency (PMDA), or any other national or regional statutory health authority.
              </p>
              <p>
                <strong>No Guarantee of Approval:</strong> All final regulatory determinations, evaluations, clearances, marketing authorizations, and approvals belong exclusively to the sovereign statutory health authorities. While our consultancy applies certified RAC standards and verified ICH guidelines to eliminate preventable documentation errors and minimize Refuse-to-File (RTF) risks, no consultancy can guarantee that any submission will be approved by an authority.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">2. Privacy Policy & 21 CFR Part 11 Safeguards</h2>
              <p>
                <strong>Proprietary Information & NDAs:</strong> All confidential technical documentation, Drug Master Files (DMFs), pre-clinical and clinical study reports, investigator brochures, and client communications uploaded or transferred to ReguSphere 360 are protected under legally binding mutual Non-Disclosure Agreements (NDAs).
              </p>
              <p>
                <strong>Access Restrictions:</strong> Client files are encrypted both in transit (TLS 1.3) and at rest (AES-256). Access is strictly restricted to designated Senior RAC consultants and medical writers assigned to the project. Client information is never disclosed publicly, sold, or shared with third parties.
              </p>
              <p>
                <strong>Data Retention:</strong> Uploaded draft files and interim working copies are retained exclusively for the duration of the engagement and an agreed-upon audit period, after which they are permanently expunged or archived per sponsor instructions and GxP standards.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">3. Terms of Service & Consulting Engagement</h2>
              <p>
                <strong>Statements of Work:</strong> All consultancy engagements are executed under a written Master Services Agreement (MSA) and project-specific Statement of Work (SOW) defining clear deliverables, milestones, turnaround periods, and fee structures.
              </p>
              <p>
                <strong>Client Responsibilities:</strong> The sponsor remains responsible for the factual accuracy and scientific veracity of the primary experimental data, clinical study reports, and batch release records supplied to the consultancy for dossier structuring.
              </p>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">4. Course Certificate of Completion Policy</h2>
              <p>
                <strong>Clear Distinction from Accreditation:</strong> Certificates of Course Completion issued upon successful completion of ReguSphere 360 workshops, masterclasses, and corporate training programmes acknowledge hours of practical professional instruction and successful participation.
              </p>
              <p>
                <strong>Non-Degree Status:</strong> Such certificates do NOT constitute an accredited university degree, an academic diploma, an official government credential, or a statutory regulatory license (such as an RAC credential issued exclusively by the Regulatory Affairs Professionals Society - RAPS).
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
