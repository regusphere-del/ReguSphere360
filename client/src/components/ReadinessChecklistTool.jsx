import React, { useState } from 'react';
import axios from 'axios';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Send,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const auditQuestions = [
  {
    category: 'Module 1: Regional & Admin',
    items: [
      { id: 'm1_app_form', label: 'Regional application form fully completed (e.g. FDA 356h or EU Application form)?' },
      { id: 'm1_cover_letter', label: 'Formal cover letter articulating clinical context, legal basis, and expedited designations?' },
      { id: 'm1_labeling', label: 'Draft package inserts, SmPC leaflet, and container labels formatted per regional guidelines?' },
      { id: 'm1_letters_auth', label: 'Letters of Authorization (LOA) for all referenced Drug Master Files (DMFs/ASMFs)?' },
    ],
  },
  {
    category: 'Module 2: Summaries & Overviews',
    items: [
      { id: 'm2_intro', label: 'Module 2.1 general introduction to pharmacological class and therapeutic indications?' },
      { id: 'm2_cmc_summary', label: 'Module 2.3 Quality Overall Summary (QOS) summarizing critical quality attributes (CQAs)?' },
      { id: 'm2_nonclin_overview', label: 'Module 2.4/2.6 non-clinical overview with toxicology and pharmacology cross-references?' },
      { id: 'm2_clin_overview', label: 'Module 2.5 clinical overview containing balanced benefit-risk justification for review board?' },
    ],
  },
  {
    category: 'Module 3: Quality / CMC',
    items: [
      { id: 'm3_drug_substance', label: 'Module 3.2.S complete characterization, synthesis route, impurities & specifications?' },
      { id: 'm3_drug_product', label: 'Module 3.2.P finished product composition, process validation & excipient controls?' },
      { id: 'm3_stability_data', label: 'Module 3.2.P.8 minimum 12-month long-term + 6-month accelerated ICH Q1A stability data?' },
      { id: 'm3_batch_analysis', label: 'Module 3.2.P.5 representative commercial/pilot batch analytical release Certificates of Analysis?' },
    ],
  },
  {
    category: 'Module 4: Non-Clinical Study Reports',
    items: [
      { id: 'm4_pharm_reports', label: 'Primary pharmacodynamics and safety pharmacology reports signed by study directors?' },
      { id: 'm4_tox_reports', label: 'Audited repeat-dose toxicology, genotoxicity, and carcinogenicity study reports?' },
      { id: 'm4_glp_compliance', label: 'Good Laboratory Practice (GLP) compliance statements and QA audit certificates attached?' },
    ],
  },
  {
    category: 'Module 5: Clinical Study Reports',
    items: [
      { id: 'm5_protocol_compliance', label: 'Clinical trial protocols, IRB/IEC institutional approvals, and patient consent forms?' },
      { id: 'm5_gcp_docs', label: 'Good Clinical Practice (GCP) compliance declarations and investigator qualification records?' },
      { id: 'm5_csr_complete', label: 'ICH E3 compliant full Clinical Study Reports with analytical & statistical appendices?' },
      { id: 'm5_safety_updates', label: 'Integrated summary of safety (ISS) and latest Development Safety Update Reports (DSUR)?' },
    ],
  },
  {
    category: 'SOP & Document Governance',
    items: [
      { id: 'sop_change_ctrl', label: 'Document change control SOPs with formal impact assessment and approval signatures?' },
      { id: 'sop_doc_versioning', label: 'Controlled document versioning with audit trail logs and status watermarks?' },
      { id: 'sop_archive_retention', label: '21 CFR Part 11 compliant electronic archiving and lifecycle retention procedures?' },
    ],
  },
];

export const ReadinessChecklistTool = ({ onClose, onProceedToEnquiry }) => {
  const [answers, setAnswers] = useState({
    m1_app_form: true,
    m1_cover_letter: true,
    m1_labeling: false,
    m1_letters_auth: true,
    m2_intro: true,
    m2_cmc_summary: false,
    m2_nonclin_overview: true,
    m2_clin_overview: false,
    m3_drug_substance: true,
    m3_drug_product: true,
    m3_stability_data: false,
    m3_batch_analysis: true,
    m4_pharm_reports: true,
    m4_tox_reports: false,
    m4_glp_compliance: true,
    m5_protocol_compliance: true,
    m5_gcp_docs: true,
    m5_csr_complete: false,
    m5_safety_updates: true,
    sop_change_ctrl: true,
    sop_doc_versioning: true,
    sop_archive_retention: false,
  });

  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [targetMarket, setTargetMarket] = useState('US FDA');
  const [dossierFormat, setDossierFormat] = useState('eCTD v3.2.2');
  const [evalResult, setEvalResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const toggleAnswer = (id) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRunAudit = async () => {
    try {
      setIsEvaluating(true);
      const res = await axios.post(`${API_BASE}/assessments/evaluate`, {
        companyName: companyName || 'Regulatory Candidate',
        contactEmail: contactEmail || 'candidate@pharma.com',
        targetMarket,
        dossierFormat,
        answers,
      });

      if (res.data.success) {
        setEvalResult(res.data.assessment);
      }
    } catch (err) {
      console.error(err);
      // Fallback local calculation
      const total = Object.values(answers).length;
      const yesCount = Object.values(answers).filter(Boolean).length;
      const score = Math.round((yesCount / total) * 100);
      setEvalResult({
        overallScore: score,
        readinessTier:
          score >= 80
            ? 'Submission Ready (Minor Polishing)'
            : score >= 50
            ? 'Moderate Readiness (Action Needed)'
            : 'High Risk (Major Gaps)',
        flaggedGaps: Object.keys(answers).filter((k) => !answers[k]),
        recommendations: [
          'Address missing Module 3 stability or Module 2 summary files immediately.',
          'Align SOP document control with 21 CFR Part 11 electronic records.',
          'Commission formal ReguSphere 360 gap analysis report.',
        ],
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const calculateQuickScore = () => {
    const total = Object.values(answers).length;
    const yesCount = Object.values(answers).filter(Boolean).length;
    return Math.round((yesCount / total) * 100);
  };

  const currentScore = calculateQuickScore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl my-8 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg p-1.5 rounded-lg hover:bg-slate-800"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
            <ClipboardCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Regulatory Submission Readiness Self-Assessment
            </h3>
            <p className="text-xs text-amber-400 font-medium">
              ICH CTD Modules 1-5 & GxP SOP Gate-Check Audit Tool
            </p>
          </div>
        </div>

        {/* Top Control Bar: Market & Format */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Target Health Agency</label>
            <select
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="US FDA">US FDA (CDER / CBER)</option>
              <option value="EMA">EMA (European Medicines Agency)</option>
              <option value="Health Canada">Health Canada (HPFB)</option>
              <option value="CDSCO">CDSCO India</option>
              <option value="TGA">TGA Australia</option>
              <option value="MHRA">MHRA United Kingdom</option>
              <option value="PMDA">PMDA Japan</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Dossier Architecture</label>
            <select
              value={dossierFormat}
              onChange={(e) => setDossierFormat(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="eCTD v3.2.2">eCTD v3.2.2 (Standard XML Backbone)</option>
              <option value="eCTD v4.0">eCTD v4.0 (Next-Gen HL7 FHIR)</option>
              <option value="NeeS">NeeS (Non-eCTD Electronic Submission)</option>
              <option value="ACTD">ASEAN CTD (ACTD)</option>
            </select>
          </div>

          <div className="flex flex-col justify-center items-center bg-slate-950 rounded-lg p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Live Readiness Score</span>
            <div className="flex items-baseline space-x-1">
              <span
                className={`text-2xl font-black ${
                  currentScore >= 80 ? 'text-emerald-400' : currentScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                }`}
              >
                {currentScore}%
              </span>
              <span className="text-xs text-slate-500">/ 100%</span>
            </div>
          </div>
        </div>

        {/* Audit Questions List */}
        <div className="max-h-[380px] overflow-y-auto space-y-6 pr-2 mb-6">
          {auditQuestions.map((cat, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/80">
              <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-3 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{cat.category}</span>
              </h4>

              <div className="space-y-2.5">
                {cat.items.map((item) => {
                  const isChecked = Boolean(answers[item.id]);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleAnswer(item.id)}
                      className={`flex items-start justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="pr-3 leading-relaxed">{item.label}</span>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border transition-colors ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black'
                            : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Evaluation Findings Panel */}
        {evalResult && (
          <div className="mb-6 p-5 rounded-xl bg-slate-900 border border-emerald-500/40 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">Regulatory Audit Evaluation Report</span>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  evalResult.overallScore >= 80
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                    : evalResult.overallScore >= 50
                    ? 'bg-amber-950 text-amber-400 border-amber-700'
                    : 'bg-rose-950 text-rose-400 border-rose-700'
                }`}
              >
                {evalResult.readinessTier}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300 mb-4">
              <p className="font-semibold text-slate-400">Consultant Recommendations:</p>
              <ul className="space-y-1 list-disc list-inside text-slate-300">
                {evalResult.recommendations?.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => onProceedToEnquiry({ answers, evalResult, targetMarket, dossierFormat })}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs hover:from-emerald-400 transition-all shadow-md"
              >
                <span>Carry Gaps into Quotation Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            {Object.values(answers).filter(Boolean).length} of {Object.values(answers).length} items confirmed compliant
          </p>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const reset = {};
                Object.keys(answers).forEach((k) => (reset[k] = false));
                setAnswers(reset);
                setEvalResult(null);
              }}
              className="px-3 py-2 rounded-lg text-slate-400 hover:text-white text-xs flex items-center space-x-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleRunAudit}
              disabled={isEvaluating}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-orange-300 transition-all shadow-lg active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluating ? 'Auditing Dossier...' : 'Generate Official Audit Report'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
