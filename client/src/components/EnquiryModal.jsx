import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  FileCheck2,
  Upload,
  CheckCircle2,
  DollarSign,
  Clock,
  Building2,
  Mail,
  User,
  Phone,
  FileText,
  AlertCircle,
  X,
  FileCode,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const availableServices = [
  'ICH CTD/eCTD dossier structure and document indexing',
  'Regulatory document gap assessments',
  'SOP preparation, review, and document control support',
  'Regulatory submission readiness checklists',
  'Regulatory writing and documentation consistency reviews',
  'Post-approval change documentation support',
];

const availableAgencies = [
  'US FDA (CDER / CBER)',
  'EMA (European Union)',
  'Health Canada (HPFB)',
  'CDSCO (India)',
  'TGA (Australia)',
  'MHRA (United Kingdom)',
  'PMDA (Japan)',
  'WHO Prequalification',
];

export const EnquiryModal = ({ initialService, auditContext, onClose, onSuccess }) => {
  const { currentUser } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState(
    initialService ? [initialService] : [availableServices[0]]
  );
  const [targetAgencies, setTargetAgencies] = useState(['US FDA (CDER / CBER)']);
  const [dossierType, setDossierType] = useState('eCTD');
  const [therapeuticArea, setTherapeuticArea] = useState('');
  const [urgency, setUrgency] = useState('Standard (4-6 weeks)');
  const [projectScopeDetails, setProjectScopeDetails] = useState('');

  // Contact info
  const [clientName, setClientName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [companyType, setCompanyType] = useState('Pharma Enterprise');

  // File uploads
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [createdTrackingId, setCreatedTrackingId] = useState(null);

  // Live quotation preview
  const [quoteEstimate, setQuoteEstimate] = useState(null);

  // Sync initial service if changed
  useEffect(() => {
    if (initialService && !selectedServices.includes(initialService)) {
      setSelectedServices((prev) => [...prev, initialService]);
    }
  }, [initialService]);

  // If auditContext passed, preload gaps into projectScopeDetails
  useEffect(() => {
    if (auditContext?.evalResult?.flaggedGaps?.length) {
      const gapsText = `Identified Pre-Audit Deficiencies (${auditContext.targetMarket} - ${auditContext.dossierFormat}):\n- ${auditContext.evalResult.flaggedGaps.join('\n- ')}`;
      setProjectScopeDetails((prev) => (prev ? `${prev}\n\n${gapsText}` : gapsText));
    }
  }, [auditContext]);

  // Calculate live quotation estimate whenever selections change
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios.post(`${API_BASE}/enquiries/quote-preview`, {
          services: selectedServices,
          urgency,
          dossierType,
        });
        if (res.data.success) {
          setQuoteEstimate(res.data.quote);
        }
      } catch (err) {
        // Fallback local estimator
        setQuoteEstimate({
          estimatedDays: urgency.includes('Critical') ? 10 : 21,
          costBand: '$4,800 - $8,900 USD',
          complexity: 'Standard Regulatory Review',
          deliverables: [
            'ICH CTD Granular Module 1-5 XML/TOC Folder Structure',
            'Detailed Regulatory Gap Assessment Matrix',
            'Official Health Authority Readiness Validation Checklist',
          ],
        });
      }
    };
    fetchQuote();
  }, [selectedServices, urgency, dossierType]);

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const toggleAgency = (ag) => {
    if (targetAgencies.includes(ag)) {
      if (targetAgencies.length > 1) {
        setTargetAgencies(targetAgencies.filter((a) => a !== ag));
      }
    } else {
      setTargetAgencies([...targetAgencies, ag]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5)); // max 5
    }
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!clientName.trim() || !email.trim() || !company.trim()) {
      setSubmitError('Please complete your name, email, and company.');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('clientName', clientName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('company', company);
      formData.append('companyType', companyType);
      formData.append('selectedServices', JSON.stringify(selectedServices));
      formData.append('targetAgencies', JSON.stringify(targetAgencies));
      formData.append('dossierType', dossierType);
      formData.append('therapeuticArea', therapeuticArea);
      formData.append('urgency', urgency);
      formData.append('projectScopeDetails', projectScopeDetails);
      if (currentUser?.uid) {
        formData.append('firebaseUid', currentUser.uid);
      }

      files.forEach((file) => {
        formData.append('files', file);
      });

      const res = await axios.post(`${API_BASE}/enquiries`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        setCreatedTrackingId(res.data.trackingId);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.response?.data?.message || 'Error submitting enquiry. Please verify connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl my-8 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg p-1.5 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Screen */}
        {createdTrackingId ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Documentation Project Enquiry Registered!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
              Your regulatory dossier scoping request has been assigned to our senior RAC documentation team.
            </p>

            {/* Tracking ID Badge */}
            <div className="bg-slate-900 border border-emerald-500/40 rounded-xl p-4 max-w-sm mx-auto mb-6">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Your Official Tracking ID
              </p>
              <p className="text-2xl font-mono font-black text-emerald-400 tracking-wider">
                {createdTrackingId}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Keep this code to track milestone progress & reports.</p>
            </div>

            <div className="flex justify-center space-x-3">
              <button
                onClick={() => onSuccess(createdTrackingId)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs hover:from-emerald-400 transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Track Project in Live Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
                <FileCheck2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Regulatory Documentation Consultancy Enquiry
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  Instant Quotation Estimate, Deliverable Scoping & Document Upload
                </p>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-3 gap-2 mb-6 text-xs">
              <button
                onClick={() => setStep(1)}
                className={`py-2 px-3 rounded-lg border font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                  step === 1
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <span>1. Services & Scope</span>
              </button>
              <button
                onClick={() => setStep(2)}
                className={`py-2 px-3 rounded-lg border font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                  step === 2
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <span>2. Files & Urgency</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className={`py-2 px-3 rounded-lg border font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                  step === 3
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <span>3. Quote & Submit</span>
              </button>
            </div>

            {/* Step 1: Services & Agencies */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
                    Select Required Regulatory Services ({selectedServices.length} selected)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {availableServices.map((srv, idx) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleService(srv)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer flex items-start space-x-2.5 transition-all ${
                            isSelected
                              ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                              isSelected
                                ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black'
                                : 'border-slate-700 bg-slate-950'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="leading-snug">{srv}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Target Agencies */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
                    Target Health Agencies & Jurisdictions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableAgencies.map((agency, i) => {
                      const isSel = targetAgencies.includes(agency);
                      return (
                        <button
                          type="button"
                          key={i}
                          onClick={() => toggleAgency(agency)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            isSel
                              ? 'bg-teal-950/80 border-teal-500 text-teal-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {agency}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all"
                  >
                    <span>Next: Files & Urgency</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Files, Dossier Type, Urgency */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Dossier / Submission Type</label>
                    <select
                      value={dossierType}
                      onChange={(e) => setDossierType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="eCTD">eCTD (Module 1-5 Electronic Filing)</option>
                      <option value="IND / CTA">IND / Clinical Trial Application</option>
                      <option value="NDA / BLA">NDA / BLA (New Drug / Biologic License)</option>
                      <option value="ANDA / Generic MAA">ANDA / Generic MAA</option>
                      <option value="DMF / ASMF">Drug Master File (DMF / ASMF)</option>
                      <option value="Post-Approval Supplement">Post-Approval Supplement / Variation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Turnaround Urgency</label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Standard (4-6 weeks)">Standard Timeline (4-6 weeks)</option>
                      <option value="Expedited (2-3 weeks)">Expedited Review (2-3 weeks)</option>
                      <option value="Critical (< 2 weeks)">Critical Fast-Track (&lt; 2 weeks)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Therapeutic Area / Product Class (Optional)
                  </label>
                  <input
                    type="text"
                    value={therapeuticArea}
                    onChange={(e) => setTherapeuticArea(e.target.value)}
                    placeholder="e.g. Oncology mAb, Gene Therapy, Oral Solid Dosage, Biosimilar"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* File Upload Area */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
                    Upload Draft Dossier, Index or Gap Files (PDF, DOCX, XLSX, ZIP)
                  </label>
                  <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-4 text-center bg-slate-950/60 transition-colors">
                    <Upload className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-300 font-medium">Drag & drop files or click to browse</p>
                    <p className="text-[10px] text-slate-500 mt-1">Confidential & 21 CFR Part 11 protected (Up to 25MB each)</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xlsx,.xls,.zip,.csv"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload-input"
                    />
                    <label
                      htmlFor="file-upload-input"
                      className="mt-3 inline-block px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 font-semibold cursor-pointer hover:bg-slate-700"
                    >
                      Select Files
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {files.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="truncate text-slate-200">{f.name}</span>
                            <span className="text-[10px] text-slate-500">
                              ({(f.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="text-slate-400 hover:text-rose-400 ml-2"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all"
                  >
                    <span>Next: Live Estimate & Submit</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Quotation Preview & Client Details */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Live Quotation Summary Card */}
                {quoteEstimate && (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-800/40">
                      <span className="font-bold text-emerald-400 flex items-center space-x-1.5">
                        <FileCheck2 className="w-4 h-4" />
                        <span>Instant Quotation & Program Scoping</span>
                      </span>
                      <span className="font-mono font-black text-white text-sm">{quoteEstimate.costBand}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-300 mb-3">
                      <div>
                        <span className="text-slate-500">Estimated Duration:</span>{' '}
                        <strong className="text-white">{quoteEstimate.estimatedDays} Business Days</strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Scope Complexity:</span>{' '}
                        <strong className="text-white">{quoteEstimate.complexity}</strong>
                      </div>
                    </div>

                    <p className="text-[11px] font-semibold text-slate-400 mb-1">Included Work Products:</p>
                    <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-300">
                      {quoteEstimate.deliverables?.map((d, idx) => (
                        <li key={idx} className="line-clamp-1">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Dr. Jane Doe"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. j.doe@pharma.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. BioTherapeutics Corp"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Organization Type</label>
                    <select
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Pharma Enterprise">Pharma Enterprise (Commercial MAH)</option>
                      <option value="Biotech Startup">Biotech Startup (Pre-clinical / Phase I-III)</option>
                      <option value="CRO">CRO / Contract Research Partner</option>
                      <option value="Generic Manufacturer">Generic / Biosimilar Manufacturer</option>
                      <option value="API / DMF Holder">API / Drug Substance DMF Holder</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1 text-xs">
                    Project Scope Notes & Specific Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={projectScopeDetails}
                    onChange={(e) => setProjectScopeDetails(e.target.value)}
                    placeholder="Provide context regarding target submission dates, known deficiencies, or specific eCTD Module requirements..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {submitError && (
                  <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs hover:from-emerald-400 transition-all shadow-lg active:scale-95"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>{isSubmitting ? 'Registering Project...' : 'Submit Documentation Enquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
